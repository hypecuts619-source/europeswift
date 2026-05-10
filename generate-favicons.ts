import fs from 'fs';
import sharp from 'sharp';

const svgBuffer = fs.readFileSync('public/favicon.svg');

async function generateFavicons() {
  await sharp(svgBuffer)
    .resize(48, 48)
    .toFile('public/favicon-48x48.png');

  await sharp(svgBuffer)
    .resize(96, 96)
    .toFile('public/favicon-96x96.png');

  await sharp(svgBuffer)
    .resize(180, 180)
    .toFile('public/apple-touch-icon.png');

  // Also create a 144x144 and 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .toFile('public/favicon-192x192.png');

  console.log('Favicons generated successfully.');
}

generateFavicons().catch(console.error);
