/**
 * Downloads the site's real imagery from the existing GoDaddy CDN into
 * public/images/ so nothing in this repo hotlinks to img1.wsimg.com.
 *
 * Run once:  npm run fetch-assets
 * The files are committed; you should not need to run this again unless the
 * source imagery changes. Re-running overwrites in place.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images");

// The `/:/` suffix asks iStream for the unresized original.
const CDN = "https://img1.wsimg.com/isteam/ip/37c1fa2e-099e-49ae-9b06-a0ea264414fd";
const orig = (name) => `${CDN}/${encodeURIComponent(name)}/:/`;

/** @type {{ to: string, from: string }[]} */
const MANIFEST = [
  // Brand
  { to: "brand/logo.png", from: orig("blob.png") },

  // Photography
  { to: "hero.jpg", from: orig("WhatsApp Image 2026-03-14 at 6.07.37 PM.jpeg") },
  { to: "founder.jpg", from: orig("WhatsApp Image 2026-03-14 at 6.13.31 PM.jpeg") },

  // Projects (slug-matched to content/projects.ts)
  { to: "projects/white-lotus-amanvana.png", from: orig("blob-2351ba7.png") },
  { to: "projects/avillion-farm-villas.jpeg", from: orig("Avilion Farm Villas.jpeg") },
  { to: "projects/leela-bhartiya-city.png", from: orig("Leela.png") },
  { to: "projects/bm-solcrest.jpg", from: orig("LANDSCAPE IMAGES-10 - Copy.jpg") },
  { to: "projects/purva-flow-kiadb.png", from: orig("Purva flow.png") },
  { to: "projects/nikoo-garden-estate.png", from: orig("Nikoo.png") },

  // Developer partner logos
  { to: "partners/prestige.svg", from: orig("Prestige_Group.svg") },
  { to: "partners/brigade.svg", from: orig("Brigade_Group.svg") },
  { to: "partners/godrej.svg", from: orig("Godrej_Properties.svg") },
  { to: "partners/sobha.jpeg", from: orig("Sobha Logo.jpeg") },
  { to: "partners/tvs-emerald.png", from: orig("tvs-emerald-logo-png_seeklogo-338788.png") },
  { to: "partners/avillion.webp", from: orig("cropped-Avillion-gold-logo-with-black-bg-scal.webp") },
  { to: "partners/embassy.png", from: orig("Embassy.png") },
  { to: "partners/partner-08.png", from: orig("images.png") },
  { to: "partners/partner-09.png", from: orig("blob-fadcf11.png") },
  { to: "partners/partner-10.png", from: orig("blob-0809d4c.png") },
];

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function fetchOne({ to, from }) {
  const dest = join(OUT, to);
  await mkdir(dirname(dest), { recursive: true });

  const res = await fetch(from, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.byteLength === 0) throw new Error("empty body");
  await writeFile(dest, buf);

  return { to, bytes: buf.byteLength, type: res.headers.get("content-type") };
}

const results = await Promise.allSettled(MANIFEST.map(fetchOne));

let failed = 0;
results.forEach((r, i) => {
  if (r.status === "fulfilled") {
    console.log(`  ok   ${r.value.to.padEnd(40)} ${kb(r.value.bytes).padStart(8)}  ${r.value.type}`);
  } else {
    failed += 1;
    console.error(`  FAIL ${MANIFEST[i].to.padEnd(40)} ${r.reason.message}`);
  }
});

console.log(`\n${results.length - failed}/${results.length} assets written to public/images/`);
if (failed) process.exitCode = 1;
