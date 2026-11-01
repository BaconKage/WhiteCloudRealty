/**
 * Prepares the official White Cloud Realty logo for the site.
 *
 * The brand logo is white "White Cloud" beside a white disc holding a black
 * "Realty.", on a flat orange tile. The supplied artwork
 * (design/official-logo/wcr-logo-official.png) is that logo with a transparent
 * background, so the orange comes from --color-brand in globals.css and the
 * same file sits on the tile on every surface. Nothing is redrawn; every file
 * here is derived from the supplied pixels.
 *
 * Outputs, all in public/images/brand/:
 *   wordmark.png           the logo, for the orange tile (components/layout/Logo.tsx)
 *   intro-words.png        "White Cloud" alone      ┐ same canvas, stacked by
 *   intro-disc.png         the disc alone           │ SiteIntro so each part
 *   intro-realty.png       "Realty." alone          ┘ can animate on its own
 *   logo-geometry.json     disc centre and radius, as fractions of the canvas
 *
 *   node scripts/prep-brand-logo.mjs [source-image]
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images", "brand");
const SOURCE = process.argv[2] ?? join(ROOT, "design", "official-logo", "wcr-logo-official.png");

/** The tile logo only ever renders ~44px tall (~115px wide); 3x that is plenty. */
const WORDMARK_WIDTH = 360;
/** The intro draws the logo up to ~26rem wide on a 2x screen. */
const INTRO_WIDTH = 960;

await mkdir(OUT, { recursive: true });

const trimmed = await sharp(await readFile(SOURCE)).trim({ threshold: 1 }).png().toBuffer();

async function rawAt(width) {
  return sharp(trimmed)
    .resize({ width })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

const writePng = (data, info, file) =>
  sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(join(OUT, file));

/**
 * Finds the disc from the pixels: it is the only shape touching the top,
 * bottom and right edges of the trimmed canvas, so its rightmost opaque
 * pixel per row traces the circle.
 */
function findDisc(data, width, height) {
  let top = height;
  let bottom = 0;
  let right = 0;
  for (let y = 0; y < height; y++) {
    for (let x = width - 1; x > width * 0.5; x--) {
      if (data[(y * width + x) * 4 + 3] > 128) {
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
        break;
      }
    }
  }
  const r = (bottom - top) / 2;
  return { cx: right - r, cy: (top + bottom) / 2, r };
}

const luminance = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

// 1. As supplied, for the orange tile.
await sharp(trimmed)
  .resize({ width: WORDMARK_WIDTH })
  .png({ compressionLevel: 9 })
  .toFile(join(OUT, "wordmark.png"));

// 2. Intro layers, split along the disc edge.
{
  const { data, info } = await rawAt(INTRO_WIDTH);
  const { width, height } = info;
  const disc = findDisc(data, width, height);

  const words = Buffer.alloc(data.length);
  const discLayer = Buffer.alloc(data.length);
  const realty = Buffer.alloc(data.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const a = data[i + 3];
      if (a === 0) continue;

      // Everything left of the disc is "White Cloud".
      if (Math.hypot(x - disc.cx, y - disc.cy) > disc.r + 1.5) {
        words.set([255, 255, 255, a], i);
        continue;
      }

      // Inside, the disc is white and the lettering dark. Lettering alpha
      // comes from how dark the pixel is, so its edges stay smooth.
      const ink = 1 - luminance(data[i], data[i + 1], data[i + 2]) / 255;
      discLayer.set([252, 252, 253, a], i);
      if (ink > 0.02) realty.set([2, 2, 2, Math.round(a * Math.min(1, ink * 1.04))], i);
    }
  }

  await writePng(words, info, "intro-words.png");
  await writePng(discLayer, info, "intro-disc.png");
  await writePng(realty, info, "intro-realty.png");

  const geometry = {
    aspect: +(width / height).toFixed(4),
    discCenterX: +(disc.cx / width).toFixed(4),
    discCenterY: +(disc.cy / height).toFixed(4),
    discRadiusOfWidth: +(disc.r / width).toFixed(4),
    discLeftEdgeX: +((disc.cx - disc.r) / width).toFixed(4),
  };
  await writeFile(join(OUT, "logo-geometry.json"), JSON.stringify(geometry, null, 2) + "\n");
  console.log("disc geometry", geometry);
}

const meta = await sharp(join(OUT, "wordmark.png")).metadata();
console.log(`wordmarks written at ${meta.width}x${meta.height}; intro layers at ${INTRO_WIDTH}px wide`);
