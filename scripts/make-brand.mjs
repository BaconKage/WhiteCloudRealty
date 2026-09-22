/**
 * Generates the favicon set and the default Open Graph card.
 *
 * The favicon is drawn as pure SVG shapes (a cloud, from the brand name) so it
 * stays legible at 16px and needs no font to be installed. The OG card
 * composites the original White Cloud Realty wordmark over a project render
 * with an ink scrim.
 *
 *   npm run make-brand
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INK = "#0b1119";
const GOLD = "#d9b441";

/** A cloud, centred in a 64-unit square. */
const CLOUD_PATH =
  "M19.5 45q-7.5 0-7.5-7.6 0-6.3 5.8-7.4.6-7.4 6.4-11.6 5.8-4.2 13.1-2.6 7.3 1.6 10.4 8.2 5.6-.6 9 3.2 3.3 3.9 2.3 9-1 5.1-5.7 7.2-2 .9-4.3.6z";

// Mirrors the real wordmark: a white cloud on ink, with a gold rule under it.
const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${INK}"/>
  <path d="${CLOUD_PATH}" fill="#faf9f6"/>
  <rect x="17" y="50" width="30" height="3.4" rx="1.7" fill="${GOLD}"/>
</svg>`;

await mkdir(join(ROOT, "public", "images", "brand"), { recursive: true });

// 1. Scalable favicon, picked up by Next's app/icon.svg file convention.
await writeFile(join(ROOT, "app", "icon.svg"), iconSvg(64));

// 2. Raster fallbacks.
for (const [file, size] of [
  [join(ROOT, "app", "apple-icon.png"), 180],
  [join(ROOT, "public", "images", "brand", "mark-512.png"), 512],
]) {
  await sharp(Buffer.from(iconSvg(size))).png().toFile(file);
}

// 3. The wordmark for dark surfaces, prepared by scripts/prep-brand-logo.mjs.
const wordmark = await readFile(join(ROOT, "public", "images", "brand", "wordmark-on-dark.png"));

// 4. Open Graph card: project render, ink scrim, wordmark.
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
      <rect x="84" y="214" width="96" height="3" fill="${GOLD}"/>
    </svg>`,
  );

  const logo = await sharp(wordmark).resize({ width: 520 }).toBuffer();

  await sharp(photo)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: logo, top: 262, left: 76 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(ROOT, "public", "images", "og-default.jpg"));
}

console.log("brand assets written: app/icon.svg, app/apple-icon.png, wordmark.png, og-default.jpg");
