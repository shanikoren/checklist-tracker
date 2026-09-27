# Checklist & Routine Tracker PWA

A Progressive Web App (PWA) for managing checklists and daily routines. Install directly on your iPhone via Safari or any mobile device. All data is stored locally on your device — no servers, no accounts required.

## Features

- **Multiple Lists**: Create and organize checklists by category (Morning, Work, Evening, Errands, etc.)
- **Three List Types**:
  - **Instant Reset**: Automatically clears when all items are checked
  - **Interval Reset**: Resets automatically every N hours or N days
  - **One-Time**: Never resets automatically
- **Offline Support**: Works completely offline via service worker
- **Local Storage**: All data stays on your device — never synced
- **Mobile-Optimized**: Clean, fast UI designed for phones and tablets

## Tech Stack

- **Vite 8** — Fast build tool
- **React 19** + **TypeScript** — Component framework
- **Tailwind CSS v4** — Mobile-first styling
- **vite-plugin-pwa** — Offline support and PWA capabilities
- **Lucide React** — Icons

## Getting Started

### Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

This generates a production-optimized build in the `dist/` folder.

## Installation on iPhone

PWAs require **HTTPS** (or localhost) for the service worker to function. Follow these steps to install:

### Option 1: Deploy to Vercel (Recommended)

1. **Create a Vercel account** at https://vercel.com (free)
2. **Connect your GitHub repo** or push this code to GitHub
3. **Import the project** into Vercel — it auto-detects Vite
4. **Deploy** — Vercel provides HTTPS automatically
5. **Open on iPhone**:
   - Copy the Vercel URL (e.g., `https://checklist-tracker.vercel.app`)
   - Open it in Safari
   - Tap the Share button (⬆)
   - Tap "Add to Home Screen"
   - Tap "Add"
6. **Test offline**: Turn on airplane mode and verify the app still works

### Option 2: Deploy to Netlify

1. **Create a Netlify account** at https://netlify.com (free)
2. **Connect your GitHub repo**
3. **Set build command**: `npm run build`
4. **Set publish directory**: `dist`
5. **Deploy**
6. Follow steps 5–6 from Option 1 using your Netlify URL

### Option 3: Deploy to GitHub Pages

1. Update `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: '/repo-name/',  // Replace with your repo name
     // ... rest of config
   });
   ```

2. **Push to GitHub** and enable GitHub Pages in repo settings
3. **Follow steps 5–6** from Option 1 using your GitHub Pages URL

## How to Use

### Home Screen
- See all your checklists grouped by category
- Progress shown as "X/Y done"
- Tap a list to open it
- Delete lists with the trash icon

### List Detail Screen
- Check off items with the checkbox
- Add new items using the input field
- Delete individual items with the trash icon
- **Instant-reset lists**: Automatically clear when all items are checked (brief confirmation shown)
- **Interval-reset lists**: Show time remaining until next auto-reset
- Tap the settings icon to edit the list
- Use the "Reset Now" button to manually reset any time

### Create/Edit List
- **Name**: Required; identifies the checklist
- **Category**: Choose from preset categories or create your own
- **Type**: Select instant-reset, interval-reset, or one-time
  - For interval-reset: specify the number and unit (hours or days)

## Data Storage

All data is stored in **localStorage** on your device:
- Checklists, items, and completion state
- List creation and reset times
- No cloud sync, no exports — data is private and local only

To **clear all data**: Open browser DevTools (F12) → Application → Local Storage → Clear

## Offline Support

The app uses a **service worker** to work offline:
- First visit caches the app shell and assets
- Subsequent visits load from cache
- Changes sync to cache automatically
- No internet needed after first load

## Customization

### Change App Icons
Replace files in `public/icons/` with your own designs:
- `icon-192x192.svg` — small icon
- `icon-512x512.svg` — large icon
- `icon-*-maskable.svg` — adaptive icons for modern app launchers
- Update the colors or design in each SVG

### Change App Colors
Edit `src/App.tsx` and components to change the blue theme:
- `bg-blue-600` → any Tailwind color class
- `accent-blue-600` → any Tailwind color

Or update `vite.config.ts` PWA manifest:
```ts
theme_color: '#3b82f6',  // Header color
background_color: '#ffffff',  // Loading screen
```

### Add More Categories
Edit `src/components/AddEditListScreen.tsx`:
```ts
const categories = ['Morning', 'Work', 'Evening', 'Errands', 'Health', 'Hobbies', 'Other'];
```

## Browser Support

- **iOS Safari 15.1+** (required for PWA)
- **Android Chrome 90+**
- **Desktop browsers**: Chrome, Edge, Firefox, Safari

## Troubleshooting

### App won't install on iPhone
- ✓ Using HTTPS (not `http://`)
- ✓ iOS 15.1 or later
- ✓ Opened in Safari (not Chrome or Firefox)
- ✓ Service worker registered (check Safari DevTools → Sources → Service Workers)

### Changes not showing after update
- Clear browser cache: Settings → Safari → Advanced → Website Data → Delete

### Data not syncing between devices
- **By design**: Data is local-only. Use export/import if needed (manual feature to add)

## Future Ideas

- Export/import data as JSON
- Share checklists via URL
- Cloud sync (optional)
- Dark mode
- Custom notifications for interval resets
- Recurring templates

## License

ISC

---

**Built with Vite + React + TypeScript**

Enjoy organized routines! 🎯
