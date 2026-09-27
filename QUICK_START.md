# Quick Start Guide

## 1-Minute Setup

```bash
cd C:\Users\fuog5\ClaudeLearning2026

# Already installed, but if needed:
npm install

# Start developing
npm run dev
```

Open browser to **http://localhost:5173** ✅

## 5-Minute Deploy

### On Vercel (Fastest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial: Checklist PWA"
   git remote add origin https://github.com/YOUR_USERNAME/checklist-tracker
   git push -u origin main
   ```

2. **Go to https://vercel.com/new**
   - Click "Import"
   - Select your GitHub repo
   - Click "Deploy"

3. **Copy the URL** (e.g., `https://checklist-tracker.vercel.app`)

### On iPhone
1. Open URL in **Safari**
2. Tap **Share** (⬆️ icon)
3. Tap **"Add to Home Screen"**
4. Tap **"Add"**

Done! 🎉

## Common Commands

```bash
npm run dev      # Development server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Folder Structure

```
src/
├── components/     # React components
│   ├── HomeScreen.tsx           # Main screen
│   ├── ListDetailScreen.tsx     # View/edit list
│   └── AddEditListScreen.tsx    # Create/edit settings
├── hooks/          # Custom React hooks
│   └── useChecklists.ts         # State management
└── App.tsx         # Main app

public/
├── icons/          # App icons (PNG/SVG)
└── apple-touch-icon.svg
```

## Customization

### Change Colors
In `src/App.tsx` and components, replace:
```tsx
bg-blue-600  →  bg-green-600   (any Tailwind color)
```

### Add Categories
In `src/components/AddEditListScreen.tsx`:
```ts
const categories = ['Morning', 'Work', 'Evening', 'Errands', 'Health', 'Hobbies', 'Other'];
```

### Change App Name
In `vite.config.ts` and `index.html`:
```json
"name": "My Custom App Name",
```

## Testing

### Offline Testing
```bash
npm run build      # Create production build
npm run preview    # Start preview server

# Then in browser DevTools:
# Application > Service Workers > Toggle "Offline"
# App should still work
```

### On iPhone After Install
1. Open app from home screen
2. Swipe down and enable Airplane Mode
3. App should work perfectly offline ✅

## Deploy to Other Platforms

### Netlify
```bash
# Visit https://netlify.com/new
# Connect GitHub repo
# Build: npm run build
# Directory: dist
```

### Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### GitHub Pages
Edit `vite.config.ts`:
```ts
export default defineConfig({
  base: '/repo-name/',  // Add this
  // ...
});
```

Then push to GitHub and enable Pages in repo settings.

## File Changes Before Deploy

### Update App Name
- `index.html` → `<title>Your App Name</title>`
- `vite.config.ts` → `name: "Your App Name"`

### Update App Icon
Replace files in `public/icons/`:
- Edit the SVG files with your design
- Or replace with PNG icons

### Update Description
- `vite.config.ts` → `description: "Your description"`
- `index.html` → `<meta name="description" content="...">`

## Common Questions

**Q: Can I use this on Android?**  
A: Yes! Works on Chrome/Firefox on Android 6.0+

**Q: Where is my data stored?**  
A: In your device's browser storage (localStorage). Never sent to servers.

**Q: Can I sync across devices?**  
A: Not yet. Data is device-only by design. Add cloud sync in future.

**Q: Is it really free?**  
A: Yes! Vercel, Netlify, and GitHub Pages all have free tiers.

**Q: Can I add more features?**  
A: Yes! Edit components, hooks, and add more screens as needed.

## Deployment Checklist

- [ ] App works locally with `npm run dev`
- [ ] All features tested (create list, add items, check off, reset)
- [ ] Build succeeds with `npm run build`
- [ ] Preview works with `npm run preview`
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel/Netlify
- [ ] URL works in Safari on iPhone
- [ ] Installed successfully on home screen
- [ ] Works offline (Airplane Mode test)

## Need Help?

- **README.md** — Full feature documentation
- **PROJECT_SUMMARY.md** — Technical details and structure
- **DEPLOYMENT.md** — Detailed deployment instructions
- **Source code** — All files have comments explaining logic

## What's Next?

1. ✅ Develop locally with `npm run dev`
2. ✅ Deploy to Vercel (easiest)
3. ✅ Install on iPhone
4. ✅ Start using the app!

---

**Happy organizing!** 📱✅
