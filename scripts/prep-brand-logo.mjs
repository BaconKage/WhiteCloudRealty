/**
 * Prepares the supplied White Cloud Realty wordmark for both surfaces.
 *
 * The artwork is pale gold "White Cloud" + black "Realty." on a white cloud.
 * That is beautiful on brand ink but the pale gold all but vanishes on the
 * cream page background, so this emits a second copy with only the gold
 * deepened to the brand's darker gold. The cloud and the black lettering are
 * untouched — the mark stays the mark.
 *
 *   node scripts/prep-brand-logo.mjs <source-image>
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images", "brand");
const SOURCE = process.argv[2];
if (!SOURCE) throw new Error("usage: node scripts/prep-brand-logo.mjs <source-image>");

/** Pale gold in the source artwork, and the deeper gold used on light pages. */
const FROM = { r: 246, g: 227, b: 168 };
const TO = { r: 168, g: 129, b: 26 };

await mkdir(OUT, { recursive: true });

const trimmed = await sharp(await readFile(SOURCE)).trim({ threshold: 6 }).toBuffer();

// 1. As-supplied, for ink panels — the header over the hero, and the footer.
const onDark = await sharp(trimmed).resize({ width: 900 }).png({ compressionLevel: 9 }).toBuffer();
await writeFile(join(OUT, "wordmark-on-dark.png"), onDark);

// 2. Gold-deepened, for the cream page background.
{
  const { data, info } = await sharp(trimmed)
    .resize({ width: 900 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a === 0) continue;

    // Gold runs warm: red clearly ahead of blue. White (r≈g≈b) and the black
    // lettering both fail this test and pass through untouched.
    const isGold = r - b > 35 && r > 120;
    if (!isGold) continue;

    data[i] = Math.min(255, Math.round((r / FROM.r) * TO.r));
    data[i + 1] = Math.min(255, Math.round((g / FROM.g) * TO.g));
    data[i + 2] = Math.min(255, Math.round((b / FROM.b) * TO.b));
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, "wordmark-on-light.png"));
}

const meta = await sharp(onDark).metadata();
console.log(`wordmark-on-dark.png and wordmark-on-light.png written at ${meta.width}x${meta.height}`);
