# Quick Deployment Guide

## Ready to Deploy

Your PWA is ready! Follow the fastest path for your preferred platform.

## Deploy to Vercel (Fastest, Recommended)

1. **Create GitHub account** (if needed): https://github.com/signup
2. **Push this project to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Checklist PWA"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/checklist-tracker
   git push -u origin main
   ```

3. **Go to Vercel**: https://vercel.com/new
4. **Import your GitHub repo**
5. **Click "Deploy"** (settings auto-detected)
6. **Get your URL**: Copy the URL from Vercel dashboard (e.g., `https://checklist-tracker.vercel.app`)

## Install on iPhone

1. **Open your Vercel URL in Safari** (must be Safari)
2. **Tap Share** (bottom center, arrow icon)
3. **Tap "Add to Home Screen"**
4. **Tap "Add"** in top right
5. **App appears on home screen** 🎉

## Verify It Works Offline

1. **Open the app** (tap the home screen icon)
2. **Activate Airplane Mode** (Settings > toggle on)
3. **Use the app** — should work perfectly offline

## Other Hosting Options

### Deploy to Netlify
```bash
# Connect repo at https://netlify.com/new
# Select GitHub repo
# Build command: npm run build
# Publish directory: dist
# Click Deploy
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Deploy to Cloudflare Pages
```bash
# Create account: https://pages.cloudflare.com
# Select GitHub repo
# Build command: npm run build
# Build output directory: dist
```

## Testing During Development

```bash
npm run dev        # Start local dev server at http://localhost:5173
npm run build      # Create production build
npm run preview    # Preview production build locally
```

## What Gets Deployed

- **dist/** — Optimized production build (automatically created by `npm run build`)
- **index.html** — Entry point
- **All CSS, JS, and assets** — Bundled and cached for offline

## Environment Variables

Currently, this app doesn't need any environment variables (no backend, no API keys).

If you add backend features later, create a `.env.local` file:
```
VITE_API_URL=https://api.example.com
VITE_SOME_KEY=value
```

Access in code:
```ts
const apiUrl = import.meta.env.VITE_API_URL;
```

## Troubleshooting Deployment

### Build fails
```bash
npm ci                    # Clean install
npm run build 2>&1        # See full error
```

### App doesn't install on iPhone
- ✓ Using **HTTPS** (not http://)
- ✓ iOS **15.1+**
- ✓ Using **Safari** (not Chrome)
- ✓ Check service worker: Settings → Safari → Advanced → Experimental Features → Service Workers

### Changes don't show on iPhone
- Force refresh: Hard refresh in Safari (Cmd+Shift+R or Settings → Safari → Clear History)
- Uninstall and reinstall the app

## Domain Customization

Once deployed, you can add a custom domain in Vercel/Netlify settings for a cleaner URL:
- `checklist.example.com` instead of `checklist-tracker.vercel.app`

## Monitoring

Your PWA automatically updates:
- Service worker checks for updates every time the app loads
- Updates happen in background; user is prompted on next visit
- No manual action needed

---

**You're all set!** 🚀 Your checklist app is ready to install on any iPhone, iPad, or Android phone.
