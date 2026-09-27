# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # Production build (output: dist/)
npm run preview  # Preview production build locally
```

**Note**: No test suite or linter configured. TypeScript provides type checking via `tsc`.

## Architecture Overview

### State Management & Persistence

All app state lives in the **`useChecklists` hook** (`src/hooks/useChecklists.ts`):
- Single source of truth for all checklists and items
- Automatically persists to `localStorage['checklists']` on every change
- Loads from localStorage on app startup
- Handles auto-reset logic for interval-reset lists
- Watches app focus/visibility to trigger interval resets when app regains focus

**Data Shape**:
```typescript
ChecklistItem {
  id: string                    // Timestamp-based ID
  name: string                  // User-provided name
  category: string              // One of predefined categories
  type: ListType                // 'instant-reset' | 'interval-reset' | 'one-time'
  items: ListItem[]             // Array of { id, text, completed }
  lastResetTime: number         // Timestamp of last reset
  intervalHours?: number        // For interval-reset lists (null for others)
  createdAt: number
  updatedAt: number
}
```

### Component Architecture

**Three main screens** (switched via `currentScreen` state in `App.tsx`):

1. **HomeScreen** (`src/components/HomeScreen.tsx`)
   - Displays all lists grouped by category
   - Shows progress (X/Y done)
   - For interval-reset lists: displays time until next reset via `getTimeUntilReset()`
   - Tap list to navigate to detail screen
   - Delete button for each list

2. **ListDetailScreen** (`src/components/ListDetailScreen.tsx`)
   - Displays items as checkboxes
   - Add new items via input field
   - Delete individual items
   - **Instant-reset behavior**: When all items checked, immediately clears and resets `lastResetTime`
   - **Reset Now button**: Manual reset available for all types
   - Settings button navigates to edit screen

3. **AddEditListScreen** (`src/components/AddEditListScreen.tsx`)
   - Create new or edit existing list
   - Name input (required, validated)
   - Category picker (grid of presets, or custom)
   - Type selector with conditional UI:
     - Instant Reset: No extra fields
     - Interval Reset: Number input + unit selector (hours/days)
     - One-Time: No extra fields
   - Converts interval value to hours internally (days × 24)

### App.tsx: Navigation & Coordination

- **Central router** for the three screens
- Calls `useChecklists` hook for all state operations
- Handles list selection for detail/edit screens
- Triggers `autoResetIntervalLists()` on app focus/visibility change (key for PWA offline behavior)

## Key Implementation Details

### List Type Behaviors

**Instant Reset** (`type: 'instant-reset'`)
- No `intervalHours` value
- When all items checked: `ListDetailScreen` calls `toggleItem()`, hook detects all-complete, automatically clears items and updates `lastResetTime`
- User sees brief UI indication

**Interval Reset** (`type: 'interval-reset'`)
- Has `intervalHours` value (stored as hours, regardless of user input unit)
- `checkIntervalReset()` compares `(Date.now() - lastResetTime) / (1000 * 60 * 60)` against `intervalHours`
- Auto-reset triggered only when:
  - App opens (mounted in effect)
  - App regains focus (visibilitychange, window focus events)
- User can manually reset via "Reset Now" button anytime
- `getTimeUntilReset()` calculates and displays remaining time in UI

**One-Time** (`type: 'one-time'`)
- No `intervalHours` value
- Never auto-resets
- Only resets via "Reset Now" button

### PWA Configuration

**Vite Plugin PWA** (`vite.config.ts`):
- Generates service worker automatically
- Precaches app shell + manifest on build
- Icons referenced in manifest (SVG format in this project)
- Web app manifest sets theme colors, display mode (standalone), start URL

**Service Worker Behavior**:
- Auto-updates on app load (no manual version checking needed)
- Workbox handles caching strategy (cache-first for assets, network-first for API if added later)
- All app data stays in localStorage, not affected by service worker

**Important for offline**: After first load, service worker caches entire app. Subsequent visits load from cache. Changes to app code won't show until service worker updates and user's browser loads new version.

### Tailwind CSS v4 Setup

- Uses new `@tailwindcss/postcss` package (not standard `tailwindcss`)
- PostCSS config references `@tailwindcss/postcss` plugin
- Tailwind v4 config is minimal (only `content` field needed)
- Safe area insets handled in `index.css` for iPhone notch/home indicator compatibility

## Common Development Tasks

### Add a New List Type

1. Add to `type ListType` in `src/types.ts`
2. Add case in `AddEditListScreen.tsx` radio buttons
3. Update `useChecklists.ts` to handle logic in `toggleItem()` and auto-reset checks
4. Update `HomeScreen.tsx` to display type badge if needed

### Change App Colors

- Tailwind classes used throughout: `bg-blue-600`, `text-white`, `hover:bg-blue-700`, etc.
- Replace `blue-600` with any Tailwind color in components
- Update theme color in `vite.config.ts`: `theme_color: '#hex'` for browser UI

### Add More Categories

- Edit array in `AddEditListScreen.tsx`: `const categories = [...]`
- Category is just a string property, no special handling needed

### Modify List Item Structure

- Change `ListItem` interface in `types.ts`
- Update `useChecklists.ts` to match (add/remove fields in `addItem()`, etc.)
- Update components to display new fields

### Test Offline Behavior

1. `npm run build && npm run preview`
2. Open in browser DevTools → Application → Service Workers
3. Toggle "Offline" checkbox
4. App should remain fully functional
5. Try adding items, checking off, resetting — all changes stored in localStorage

## Deployment

**Target**: Vercel (auto-detects Vite, provides HTTPS required for PWA)

**Environment**: No API keys or environment variables needed currently. If adding backend:
- Create `.env.local` file (git-ignored via `.gitignore`)
- Access via `import.meta.env.VITE_*` variables in code

**Build output**: `npm run build` creates `dist/` folder
- Includes service worker (`sw.js`) and manifest (`manifest.webmanifest`)
- All assets bundled and cache-busted with hashes
- PWA plugin generates preload list automatically

## Testing Guide

No automated test suite. Manual testing checklist:

- [ ] Create list in each type (instant, interval, one-time)
- [ ] Add/remove items
- [ ] Check off items; verify instant-reset clears automatically
- [ ] Verify interval-reset countdown updates correctly
- [ ] Manual reset works
- [ ] Offline: DevTools offline toggle, app still works
- [ ] PWA install: Safari "Add to Home Screen", icon appears, app launches
- [ ] Data persists across closes/reopens
- [ ] Delete list removes it from storage

## Notes for Future Development

- **No backend**: All data localStorage-only. To add cloud sync, you'd need a backend + authentication.
- **No tests**: Add Vitest if test coverage becomes important
- **No linting**: Add ESLint if code style consistency matters
- **Icons**: SVG format used; can swap for PNG if needed (update manifest references)
- **Performance**: Bundle is ~240KB (gzipped ~74KB), well within PWA limits
- **Browser support**: iOS 15.1+ required (service worker support), Android 6.0+ (Chrome 90+)
