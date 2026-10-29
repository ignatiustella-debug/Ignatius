import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    // CRC calculation
    let crc = 0xffffffff;
    const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    for (let i = 0; i < typeAndData.length; i++) {
      let byte = typeAndData[i];
      crc = crc ^ byte;
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320);
      }
    }
    crc = (crc ^ 0xffffffff) >>> 0;
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data with scanline filters (filter byte 0 per line)
  const lineLength = 1 + width * 3;
  const rawData = Buffer.alloc(lineLength * height);

  for (let y = 0; y < height; y++) {
    const offset = y * lineLength;
    rawData[offset] = 0; // filter None
    for (let x = 0; x < width; x++) {
      // Create a nice warm gradient with an inner emblem area
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      let pxR = r;
      let pxG = g;
      let pxB = b;

      if (dist < 0.65) {
        // Inner golden emblem
        pxR = Math.min(255, Math.floor(r * 1.3));
        pxG = Math.min(255, Math.floor(g * 1.25));
        pxB = Math.min(255, Math.floor(b * 0.9));
      } else if (dist < 0.72) {
        // Ring
        pxR = 245;
        pxG = 158;
        pxB = 11;
      }

      const pixelOffset = offset + 1 + x * 3;
      rawData[pixelOffset] = pxR;
      rawData[pixelOffset + 1] = pxG;
      rawData[pixelOffset + 2] = pxB;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Educare brand colors: Warm amber / slate
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, 180, 83, 9));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, 180, 83, 9));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, 217, 119, 6));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, 180, 83, 9));

// Also write public/icon.svg
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect width="512" height="512" rx="128" fill="#1c1917"/>
  <rect x="24" y="24" width="464" height="464" rx="104" stroke="#f59e0b" stroke-width="8" stroke-dasharray="16 12"/>
  <circle cx="256" cy="256" r="160" fill="url(#grad)" />
  <path d="M256 140 L340 190 L256 240 L172 190 Z" fill="#ffffff" />
  <path d="M196 220 V280 C196 312 256 340 256 340 C256 340 316 312 316 280 V220" stroke="#ffffff" stroke-width="16" stroke-linecap="round" fill="none"/>
  <path d="M340 190 V290" stroke="#fef3c7" stroke-width="12" stroke-linecap="round"/>
  <circle cx="340" cy="300" r="10" fill="#f59e0b"/>
  <defs>
    <linearGradient id="grad" x1="120" y1="120" x2="380" y2="380" gradientUnits="userSpaceOnUse">
      <stop stop-color="#f59e0b"/>
      <stop offset="1" stop-color="#b45309"/>
    </linearGradient>
  </defs>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svg);
console.log('Successfully generated PWA icon assets in public/');
