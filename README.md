# 🗺️ Scratch The World | Interactive Travel Map

A luxury scratch-off travel map web application designed as a meaningful gift for friends living or moving abroad. Hostable 100% free and statically on **GitHub Pages**, mobile-first, and desktop-friendly without distortion.

![Scratch Map Banner](https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Key Features

- 🌟 **Authentic Scratch-Off Experience**: Unscratched territories feature a rich gold foil metallic sheen. Rub or click to reveal vibrant custom illustration colors underneath with metallic particle flakes and procedural scratch sound effects!
- 📍 **Granular City vs Country/State Scratching**: Scratching a city reveals **only** that specific city's pinpoint gem badge and landmark without scratching the entire surrounding country or state.
- 🔍 **Fast Search & Filter Hub**: Search across countries, cities, or US states with instant autocomplete, flag previews, and auto-zoom.
- 📖 **Interactive Sub-Menu & Travel Journal**: Click any country or city to view local greetings, currencies, capitals, trivia, and record your visit date, star rating, memories, companion notes, and travel photos.
- ↩️ **Full Undo / Redo & Local Persistence**: Never lose your journey! Progress auto-saves to `localStorage`, with an undo stack and JSON export/import backup options.
- 🏆 **World Explorer Stats & Badges**: Tracks % of world explored, continent breakdown, and unlocks travel achievement badges.
- 📜 **Personalized Shareable Poster Generator**: Export a high-resolution, certificate-style travel poster image to share on Instagram, WhatsApp, or print!
- 🎨 **5 Aesthetic Themes**: Gold Foil Classic, Midnight & Gold, Vintage Parchment, Emerald Jade, and Cyber Hologram.
- 📱 **Mobile-First & Touch Optimized**: Pinch-to-zoom, swipeable drawers, and native touch support with zero stretching on wide screens.

---

## 🚀 How to Host on Your GitHub Pages (Free & Easy)

### Method 1: Automatic GitHub Actions (Recommended)

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `scratch-map` or `travel-map`).
2. Push this folder to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Scratch Travel Map"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```
3. Go to your repository settings on GitHub:
   - Click **Settings** > **Pages** (on the left menu).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` workflow will automatically build and publish your site at:
   `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle for static hosting
npm run build

# 4. Preview the static production build locally
npm run preview
```

---

## 💡 Personalizing For Your Friend

- You can edit your friend's name directly in the app via the **Settings (⚙️)** menu in the top bar (e.g. *"Sarah's World Map"*).
- The name is dynamically displayed across the header and in the downloadable travel poster!
