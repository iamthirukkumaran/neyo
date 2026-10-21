const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../assets/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Logo SVG (Dark / Primary Purple text + Gradient Map Pin O)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80" fill="none">
  <defs>
    <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9B6BF2" />
      <stop offset="45%" stop-color="#5B2A86" />
      <stop offset="100%" stop-color="#F0703A" />
    </linearGradient>
  </defs>

  <!-- Letter N -->
  <path d="M 22 66 V 14 H 38 L 64 50 V 14 H 78 V 66 H 62 L 36 30 V 66 Z" fill="#1C1626" />

  <!-- Letter E -->
  <path d="M 96 66 V 14 H 146 V 26 H 112 V 34 H 140 V 46 H 112 V 54 H 146 V 66 Z" fill="#1C1626" />

  <!-- Letter Y -->
  <path d="M 160 14 H 178 L 195 42 L 212 14 H 230 L 204 51 V 66 H 186 V 51 Z" fill="#1C1626" />

  <!-- Letter O as Map Pin -->
  <g transform="translate(244, 8)">
    <path d="M 32 0 C 14.33 0 0 14.33 0 32 C 0 50.5 24 68.5 30.5 73.2 C 31.4 73.8 32.6 73.8 33.5 73.2 C 40 68.5 64 50.5 64 32 C 64 14.33 49.67 0 32 0 Z" fill="url(#pinGrad)" />
    <circle cx="32" cy="28" r="11" fill="#FFFFFF" />
  </g>
</svg>`;

// 2. Logo White SVG (White text for dark backgrounds + luminous Gradient Pin)
const logoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80" fill="none">
  <defs>
    <linearGradient id="pinGradWhite" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C9A2FF" />
      <stop offset="50%" stop-color="#9B6BF2" />
      <stop offset="100%" stop-color="#F0703A" />
    </linearGradient>
  </defs>

  <!-- Letter N -->
  <path d="M 22 66 V 14 H 38 L 64 50 V 14 H 78 V 66 H 62 L 36 30 V 66 Z" fill="#FFFFFF" />

  <!-- Letter E -->
  <path d="M 96 66 V 14 H 146 V 26 H 112 V 34 H 140 V 46 H 112 V 54 H 146 V 66 Z" fill="#FFFFFF" />

  <!-- Letter Y -->
  <path d="M 160 14 H 178 L 195 42 L 212 14 H 230 L 204 51 V 66 H 186 V 51 Z" fill="#FFFFFF" />

  <!-- Letter O as Map Pin -->
  <g transform="translate(244, 8)">
    <path d="M 32 0 C 14.33 0 0 14.33 0 32 C 0 50.5 24 68.5 30.5 73.2 C 31.4 73.8 32.6 73.8 33.5 73.2 C 40 68.5 64 50.5 64 32 C 64 14.33 49.67 0 32 0 Z" fill="url(#pinGradWhite)" />
    <circle cx="32" cy="28" r="11" fill="#120B19" />
  </g>
</svg>`;

// 3. App Icon SVG (512x512)
const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#210D3A" />
      <stop offset="50%" stop-color="#140824" />
      <stop offset="100%" stop-color="#0B0514" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A77BEA" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#5B2A86" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#F0703A" stop-opacity="0.5" />
    </linearGradient>
    <linearGradient id="pinIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C9A2FF" />
      <stop offset="45%" stop-color="#8348CC" />
      <stop offset="100%" stop-color="#F0703A" />
    </linearGradient>
    <radialGradient id="beaconGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#9B6BF2" stop-opacity="0.4" />
      <stop offset="60%" stop-color="#F0703A" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#5B2A86" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Squircle Base -->
  <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#bgGrad)" />
  <rect x="16" y="16" width="480" height="480" rx="112" stroke="url(#borderGrad)" stroke-width="3" />

  <!-- Ambient Radar Glow Rings -->
  <circle cx="256" cy="220" r="190" fill="url(#beaconGlow)" />
  <circle cx="256" cy="220" r="160" stroke="#A77BEA" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="8 8" />
  <circle cx="256" cy="220" r="120" stroke="#F0703A" stroke-opacity="0.2" stroke-width="1.5" />

  <!-- Glowing Map Pin with N inside -->
  <g>
    <path d="M 256 90 C 185.3 90 128 147.3 128 218 C 128 288.4 224 372 250 393 C 253.6 396 258.4 396 262 393 C 288 372 384 288.4 384 218 C 384 147.3 326.7 90 256 90 Z" fill="url(#pinIconGrad)" />
    <!-- Center core -->
    <circle cx="256" cy="210" r="54" fill="#140824" />
    <!-- Monogram N inside pin -->
    <path d="M 236 242 V 178 H 248 L 268 216 V 178 H 278 V 242 H 266 L 246 204 V 242 Z" fill="#FFFFFF" />
  </g>
</svg>`;

// 4. Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <linearGradient id="favPin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C9A2FF" />
      <stop offset="50%" stop-color="#9B6BF2" />
      <stop offset="100%" stop-color="#F0703A" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#120B19" />
  <path d="M 32 8 C 20.95 8 12 16.95 12 28 C 12 39 27 51 31 54.2 C 31.6 54.7 32.4 54.7 33 54.2 C 37 51 52 39 52 28 C 52 16.95 43.05 8 32 8 Z" fill="url(#favPin)" />
  <circle cx="32" cy="26" r="7" fill="#120B19" />
</svg>`;

async function build() {
  console.log('Writing SVGs...');
  fs.writeFileSync(path.join(outDir, 'logo.svg'), logoSvg);
  fs.writeFileSync(path.join(outDir, 'logo_white.svg'), logoWhiteSvg);
  fs.writeFileSync(path.join(outDir, 'app_icon.svg'), appIconSvg);
  fs.writeFileSync(path.join(outDir, 'favicon.svg'), faviconSvg);

  console.log('Generating PNGs with sharp...');
  await sharp(Buffer.from(logoSvg)).png().toFile(path.join(outDir, 'logo.png'));
  await sharp(Buffer.from(logoWhiteSvg)).png().toFile(path.join(outDir, 'logo_white.png'));
  await sharp(Buffer.from(appIconSvg)).resize(512, 512).png().toFile(path.join(outDir, 'app_icon.png'));
  await sharp(Buffer.from(appIconSvg)).resize(192, 192).png().toFile(path.join(outDir, 'app_icon_192.png'));
  await sharp(Buffer.from(faviconSvg)).resize(64, 64).png().toFile(path.join(outDir, 'favicon.png'));
  await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(path.join(outDir, 'favicon-32x32.png'));

  // Generate 1200x630 OpenGraph Banner
  console.log('Generating OpenGraph banner...');
  const splashPath = path.join(outDir, 'splash.jpg');
  if (fs.existsSync(splashPath)) {
    const ogOverlaySvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ogShade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#120B19" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#120B19" stop-opacity="0.65" />
          <stop offset="100%" stop-color="#120B19" stop-opacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#ogShade)" />

      <!-- Sub-headline badge -->
      <rect x="100" y="80" width="220" height="40" rx="20" fill="rgba(255,255,255,0.08)" stroke="rgba(167,123,234,0.4)" stroke-width="1.5" />
      <text x="120" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#C9A2FF" letter-spacing="1">HYPERLOCAL SOCIAL</text>

      <!-- Logo & Tagline -->
      <g transform="translate(100, 150) scale(1.6)">
        <path d="M 22 66 V 14 H 38 L 64 50 V 14 H 78 V 66 H 62 L 36 30 V 66 Z" fill="#FFFFFF" />
        <path d="M 96 66 V 14 H 146 V 26 H 112 V 34 H 140 V 46 H 112 V 54 H 146 V 66 Z" fill="#FFFFFF" />
        <path d="M 160 14 H 178 L 195 42 L 212 14 H 230 L 204 51 V 66 H 186 V 51 Z" fill="#FFFFFF" />
        <g transform="translate(244, 8)">
          <path d="M 32 0 C 14.33 0 0 14.33 0 32 C 0 50.5 24 68.5 30.5 73.2 C 31.4 73.8 32.6 73.8 33.5 73.2 C 40 68.5 64 50.5 64 32 C 64 14.33 49.67 0 32 0 Z" fill="#F0703A" />
          <circle cx="32" cy="28" r="11" fill="#120B19" />
        </g>
      </g>

      <text x="100" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="#FFFFFF">New people. Near you.</text>
      <text x="100" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="400" fill="#A77BEA">Discover people, places, communities and memories around you.</text>

      <!-- Feature tags -->
      <g transform="translate(100, 480)">
        <rect x="0" y="0" width="160" height="48" rx="24" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
        <text x="80" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF">📍 Hyperlocal 5km</text>

        <rect x="180" y="0" width="180" height="48" rx="24" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
        <text x="270" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF">👥 Local Groups</text>

        <rect x="380" y="0" width="170" height="48" rx="24" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
        <text x="465" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF">⛰️ Trip Memories</text>
      </g>
    </svg>`;

    await sharp(splashPath)
      .resize(1200, 630, { fit: 'cover' })
      .composite([{ input: Buffer.from(ogOverlaySvg), blend: 'over' }])
      .png()
      .toFile(path.join(outDir, 'og_image.png'));
  }

  console.log('Asset generation complete!');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
