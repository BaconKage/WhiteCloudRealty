/**
 * Generates the favicon set and the default Open Graph card from the official
 * logo (see scripts/prep-brand-logo.mjs, which must run first).
 *
 * The full wordmark is illegible at 16px, so the icon keeps only the logo's
 * device: the white disc with the "R" of "Realty." knocked out of it, on ink.
 * The "R" is cropped from the supplied artwork rather than re-typeset, so it
 * is the logo's own letterform.
 *
 *   npm run make-brand
 */
import { mkdir, readFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BRAND = join(ROOT, "public", "images", "brand");
const INK = "#0b1119";

/**
 * The "R" glyph of "Realty.", dark on transparent. Its leg kerns under the
 * "e", so a column crop would catch part of that letter too; instead this
 * flood-fills from the leftmost inked pixel and keeps only what is connected.
 */
async function extractR() {
  const layer = join(BRAND, "intro-realty.png");
  const { data, info } = await sharp(layer).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const alpha = (x, y) => data[(y * width + x) * 4 + 3];

  let seed = -1;
  for (let x = 0; x < width && seed < 0; x++) {
    for (let y = 0; y < height; y++) {
      if (alpha(x, y) > 128) {
        seed = y * width + x;
        break;
      }
    }
  }

  const inGlyph = new Uint8Array(width * height);
  const stack = [seed];
  inGlyph[seed] = 1;
  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p - x) / width;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const n = ny * width + nx;
        if (!inGlyph[n] && alpha(nx, ny) > 90) {
          inGlyph[n] = 1;
          stack.push(n);
        }
      }
    }
  }

  // Grow the core by a pixel to take back its anti-aliased edge, then crop.
  const out = Buffer.alloc(data.length);
  let [left, top, right, bottom] = [width, height, 0, 0];
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let near = false;
      for (let dy = -1; dy <= 1 && !near; dy++) {
        for (let dx = -1; dx <= 1 && !near; dx++) near = inGlyph[(y + dy) * width + x + dx] === 1;
      }
      if (!near) continue;
      const i = (y * width + x) * 4;
      data.copy(out, i, i, i + 4);
      [left, top, right, bottom] = [Math.min(left, x), Math.min(top, y), Math.max(right, x), Math.max(bottom, y)];
    }
  }

  return sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
    .png()
    .toBuffer();
}

const glyph = await extractR();

async function icon(size, { rounded = true } = {}) {
  const radius = rounded ? size * 0.22 : 0;
  const discR = size * 0.36;
  const tile = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${radius}" fill="${INK}"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${discR}" fill="#fcfcfd"/>
  </svg>`);

  const r = await sharp(glyph).resize({ height: Math.round(discR * 1.02) }).toBuffer();
  const meta = await sharp(r).metadata();

  return sharp(tile)
    .composite([
      {
        input: r,
        // Optically centred: a touch right of true centre, since the R's bowl
        // carries more weight than its stem side.
        left: Math.round(size / 2 - meta.width / 2 + size * 0.012),
        top: Math.round(size / 2 - meta.height / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await mkdir(BRAND, { recursive: true });

// 1. Favicons. Next picks up app/icon.png and app/apple-icon.png by convention.
await rm(join(ROOT, "app", "icon.svg"), { force: true });
await sharp(await icon(192)).toFile(join(ROOT, "app", "icon.png"));
await sharp(await icon(180, { rounded: false })).toFile(join(ROOT, "app", "apple-icon.png"));
await sharp(await icon(512)).toFile(join(BRAND, "mark-512.png"));

// 2. Open Graph card: project render, ink scrim, the logo as supplied.
{
  const W = 1200;
  const H = 630;
  const photo = await sharp(await readFile(join(ROOT, "public", "images", "projects", "bm-solcrest.jpg")))
    .resize(W, H, { fit: "cover", position: "attention" })
    .toBuffer();

  const scrim = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="g" x1="0" y1="0.9" x2="0.75" y2="0.1">
          <stop offset="0" stop-color="${INK}" stop-opacity="0.98"/>
          <stop offset="0.55" stop-color="${INK}" stop-opacity="0.9"/>
          <stop offset="1" stop-color="${INK}" stop-opacity="0.62"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
    </svg>`,
  );

  const logo = await sharp(await readFile(join(BRAND, "wordmark-on-dark.png")))
    .resize({ width: 600 })
    .toBuffer();
  const { height: logoH } = await sharp(logo).metadata();

  await sharp(photo)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: logo, top: Math.round((H - logoH) / 2), left: 84 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(ROOT, "public", "images", "og-default.jpg"));
}

console.log("brand assets written: app/icon.png, app/apple-icon.png, mark-512.png, og-default.jpg");
