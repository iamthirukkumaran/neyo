# NEYO Marketing & Legal Website

> **New people. Near you.**  
> A hyperlocal social app to discover people, places, communities and memories around you.

This directory contains the production-ready marketing website and required app store legal compliance pages for **NEYO**.

---

## 📁 Directory Structure

```text
/Users/apple/Desktop/neyo/
├── index.html                   # Home landing page with interactive phone mockup & radius slider
├── features/index.html          # Comprehensive feature catalog
├── safety/index.html            # Trust, security, moderation & location safety
├── download/index.html          # Store download links + live camera QR code
├── c/index.html                 # Community invite landing ("Open in NEYO" deep link)
├── trip/index.html              # Trip invite landing ("Open Trip in NEYO" deep link)
├── privacy/index.html           # Google Play & App Store compliant Privacy Policy
├── terms/index.html             # Terms of Service & Community Guidelines
├── delete-account/index.html    # Step-by-step account deletion instructions (Google Play requirement)
├── child-safety/index.html      # Child safety standards & CSAM zero-tolerance statement
├── contact/index.html           # Contact form, direct support & trust desks
├── .well-known/
│   ├── assetlinks.json          # Android App Links configuration (com.neyoApp.neyo)
│   └── apple-app-site-association # iOS Universal Links configuration (com.neyoapp.neyo)
├── assets/
│   ├── css/
│   │   └── main.css             # Vanilla CSS design system (Sora + Inter, dark/light modes)
│   ├── js/
│   │   └── main.js              # Theme switcher, interactive mockup, QR generator, deep linking
│   └── images/
│       ├── logo.svg & .png      # Primary purple wordmark with gradient map pin
│       ├── logo_white.svg & .png# White wordmark for dark backgrounds
│       ├── app_icon.svg & .png  # 512x512 app icon with glowing pin
│       ├── favicon.svg & .png   # Scalable vector & PNG favicons
│       ├── og_image.png         # 1200x630 OpenGraph social preview banner
│       ├── onb1.jpg             # Hero / People near you photography
│       ├── onb2.jpg             # Local communities photography
│       ├── onb3.jpg             # Stories & posts photography
│       ├── onb4.jpg             # Ooty lake / shared trip memory photography
│       └── splash.jpg           # Sunset city skyline photography
└── package.json                 # Dev server and build scripts
```

---

## 🚀 Running Locally

1. Open your terminal in this directory:
   ```bash
   cd ~/Desktop/neyo
   ```
2. Start the local web server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Production

This is a static site with no backend dependencies, ensuring **Lighthouse ≥ 95** speed, zero maintenance, and instant CDN caching.

- **Vercel**: Run `npx vercel deploy`
- **Netlify**: Drag and drop the `neyo` folder to the Netlify dashboard or run `netlify deploy --prod`
- **Firebase Hosting**:
  ```bash
  firebase init hosting
  firebase deploy --only hosting
  ```
- **Cloudflare Pages / GitHub Pages**: Deploy directly from git repository.

---

## 🔗 Deep Links Configuration

- **Android App Links:** Hosted at `/.well-known/assetlinks.json` configured for package `com.neyoApp.neyo`. Replace the SHA-256 fingerprint with your release keystore before publishing.
- **iOS Universal Links:** Hosted at `/.well-known/apple-app-site-association` configured for `com.neyoapp.neyo`. Replace `TEAMID` with your Apple Developer Team ID.

---

## 🎨 Brand Design Tokens

- **Primary Purple:** `#5B2A86`
- **Deep Purple:** `#3A1760`
- **Light Purple:** `#A77BEA` / gradient `#C9A2FF → #9B6BF2`
- **Accent Orange:** `#F0703A`
- **Online Green:** `#22B573`
- **Headings Font:** `Sora` (600, 700)
- **Body Font:** `Inter` (400, 500, 600)
