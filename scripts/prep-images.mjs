/**
 * One-time normalisation of the assets pulled by fetch-assets.mjs.
 *
 * The source imagery came off a website builder in mixed shapes: a project
 * render padded with white, a 2560px-wide partner logo, PNGs holding
 * photographs. This trims, resizes and re-encodes them so the site ships
 * sensible files. Safe to re-run — it skips anything already in good shape.
 *
 *   npm run prep-images
 */
import { readdir, readFile, stat, unlink, writeFile, access } from "node:fs/promises";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const IMAGES = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const exists = (p) => access(p).then(() => true, () => false);

/**
 * Reads through a buffer rather than letting sharp open the path itself:
 * on Windows sharp holds the source handle open, which blocks replacing a
 * file in place.
 */
async function open(path) {
  return sharp(await readFile(path));
}

async function write(from, to, pipeline) {
  const before = (await stat(from)).size;
  const buf = await pipeline.toBuffer();
  if (from !== to) await unlink(from);
  await writeFile(to, buf);
  console.log(`  ${basename(to).padEnd(34)} ${kb(before).padStart(8)} -> ${kb(buf.byteLength).padStart(8)}`);
}

// 1. Project render padded with a white border — trim it, then cap the width.
{
  const src = join(IMAGES, "projects", "white-lotus-amanvana.png");
  if (await exists(src)) {
    await write(
      src,
      join(IMAGES, "projects", "white-lotus-amanvana.jpg"),
      (await open(src)).trim({ threshold: 12 }).resize({ width: 1400, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }),
    );
  }
}

// 2. Partner logo shipped at 2560px wide. Logos never need more than ~600px.
{
  const src = join(IMAGES, "partners", "avillion.jpg");
  const { width } = await sharp(await readFile(src)).metadata();
  if (width > 600) {
    await write(src, src, (await open(src)).resize({ width: 600 }).jpeg({ quality: 86, mozjpeg: true }));
  }
}

// 3. Cap every project photo at 1600px and re-encode as progressive JPEG.
{
  const dir = join(IMAGES, "projects");
  for (const file of await readdir(dir)) {
    if (extname(file) !== ".jpg") continue;
    const src = join(dir, file);
    const { width } = await sharp(await readFile(src)).metadata();
    if (width <= 1600 && (await stat(src)).size < 180 * 1024) continue;
    await write(src, src, (await open(src)).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true, progressive: true }));
  }
}

console.log("\nimages prepared");
