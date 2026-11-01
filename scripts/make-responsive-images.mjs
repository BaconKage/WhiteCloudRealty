/**
 * Generates the resized project images that lib/imageLoader.ts points at.
 *
 * The site is a static export, so nothing resizes images on request. Without
 * these, a 400px project card would download and decode a 4K file. Run this
 * after adding or replacing a project's "-4k.webp" image.
 *
 *   npm run make-images
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "public", "images", "projects");
const OUT = join(SOURCE, "responsive");

/** Keep in step with `deviceSizes` in next.config.ts. */
const WIDTHS = [480, 828, 1200, 1920, 2880];

await mkdir(OUT, { recursive: true });

const files = (await readdir(SOURCE)).filter((f) => f.endsWith("-4k.webp"));
let total = 0;

for (const file of files) {
  const name = file.replace(/-4k\.webp$/, "");
  for (const width of WIDTHS) {
    const target = join(OUT, `${name}-${width}.webp`);
    await sharp(join(SOURCE, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width >= 1920 ? 68 : 72, effort: 6 })
      .toFile(target);
    total += (await stat(target)).size;
  }
}

console.log(`${files.length} images x ${WIDTHS.length} widths, ${(total / 1e6).toFixed(1)} MB in total`);
