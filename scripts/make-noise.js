const sharp = require('sharp');
const path = require('path');

// Create a 200x200 subtle film grain / noise PNG
const width = 256;
const height = 256;
const channels = 4;
const buffer = Buffer.alloc(width * height * channels);

for (let i = 0; i < width * height; i++) {
  const noise = Math.floor(Math.random() * 255);
  buffer[i * 4 + 0] = noise; // R
  buffer[i * 4 + 1] = noise; // G
  buffer[i * 4 + 2] = noise; // B
  buffer[i * 4 + 3] = 18;    // Alpha (subtle 7% opacity grain)
}

sharp(buffer, { raw: { width, height, channels } })
  .png()
  .toFile(path.join(__dirname, '../assets/images/noise.png'))
  .then(() => console.log('Noise texture generated successfully!'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
