/**
 * Builds the Bengaluru map behind the Choose your location section from real
 * OpenStreetMap data.
 *
 * It produces two things:
 *   public/images/map/bengaluru.webp  the base map: roads, lakes, parks, metro
 *   content/cityMap.ts                zones and labels, as light vector shapes
 *
 * Zone shapes are not official boundaries. Each spot of the map belongs to the
 * zone of its nearest neighbourhood (scripts/data/city-map-places.json), which
 * gives shapes that follow where those neighbourhoods really are.
 *
 * OSM responses are cached in node_modules/.cache/wcr-map. Map data is
 * © OpenStreetMap contributors (ODbL), so the attribution under the map stays.
 *
 *   npm run make-map
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { contours } from "d3-contour";
import { blur2 } from "d3-array";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, "node_modules", ".cache", "wcr-map");

const LAT_MAX = 13.225;
const LAT_MIN = 12.805;
const LON_MIN = 77.435;
const LON_MAX = 77.815;
const COS_LAT = Math.cos((13 * Math.PI) / 180);
const W = 1000;
const K = W / ((LON_MAX - LON_MIN) * COS_LAT);
const H = Math.round((LAT_MAX - LAT_MIN) * K);
const KM = K / 111.2; // map units per kilometre

const project = ([lat, lon]) => [(lon - LON_MIN) * COS_LAT * K, (LAT_MAX - lat) * K];
const round = (n) => Math.round(n * 10) / 10;

const BBOX = "12.76,77.40,13.28,77.84";
const ENDPOINTS = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
const QUERIES = {
  roads: `[out:json][timeout:170][bbox:${BBOX}];way[highway~"^(motorway|trunk|primary|secondary|tertiary)$"];out geom;`,
  nature: `[out:json][timeout:170][bbox:${BBOX}];(way[natural=water];relation[natural=water];way[landuse=reservoir];way[leisure=park];relation[leisure=park];way[landuse=forest];relation[landuse=forest];way[natural=wood];relation[boundary=national_park];way[boundary=national_park];);out geom;`,
  transit: `[out:json][timeout:170][bbox:${BBOX}];(way[railway=rail];way[aeroway=aerodrome];relation[aeroway=aerodrome];way[aeroway=runway];);out geom;`,
  metro: `[out:json][timeout:170][bbox:${BBOX}];relation[route=subway];out geom;`,
};

async function osm(name) {
  const file = join(CACHE, `${name}.json`);
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    // Not cached yet.
  }
  for (const url of [...ENDPOINTS, ...ENDPOINTS]) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "white-cloud-realty-map-build/1.0" },
        body: "data=" + encodeURIComponent(QUERIES[name]),
        signal: AbortSignal.timeout(180000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      await mkdir(CACHE, { recursive: true });
      await writeFile(file, text);
      return JSON.parse(text);
    } catch (e) {
      console.log(name, "failed on", url, e.message);
      await new Promise((r) => setTimeout(r, 20000));
    }
  }
  throw new Error(`could not fetch ${name}`);
}

/** Douglas-Peucker, iterative. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  // A closed ring starts and ends at the same point, so every point would
  // measure as on the line between them. Simplify it as two open halves.
  const [fx, fy] = points[0];
  const [lx, ly] = points[points.length - 1];
  if (Math.hypot(fx - lx, fy - ly) < 0.01 && points.length > 4) {
    const mid = points.length >> 1;
    return [...simplify(points.slice(0, mid + 1), tolerance), ...simplify(points.slice(mid), tolerance).slice(1)];
  }
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let best = 0;
    let index = -1;
    const [ax, ay] = points[a];
    const [bx, by] = points[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * points[i][0] - dx * points[i][1] + bx * ay - by * ax) / len;
      if (d > best) {
        best = d;
        index = i;
      }
    }
    if (best > tolerance) {
      keep[index] = 1;
      stack.push([a, index], [index, b]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

const toPoints = (geometry) => geometry.map((p) => project([p.lat, p.lon]));
const inView = (pts) => pts.some(([x, y]) => x > -40 && x < W + 40 && y > -40 && y < H + 40);
const pathOf = (pts, close = false) =>
  `M${pts.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}${close ? "Z" : ""}`;

function area(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a / 2);
}

/** Joins a relation's outer ways, which OSM may split, into closed rings. */
function rings(element) {
  if (element.type === "way") return element.geometry ? [toPoints(element.geometry)] : [];
  const open = (element.members ?? []).filter((m) => m.geometry && m.role === "outer").map((m) => toPoints(m.geometry));
  const out = [];
  while (open.length) {
    let ring = open.shift();
    let grew = true;
    while (grew) {
      grew = false;
      for (let i = 0; i < open.length; i++) {
        const piece = open[i];
        const [ex, ey] = ring[ring.length - 1];
        const same = (p) => Math.hypot(p[0] - ex, p[1] - ey) < 0.01;
        if (same(piece[0])) ring = ring.concat(piece.slice(1));
        else if (same(piece[piece.length - 1])) ring = ring.concat(piece.slice(0, -1).reverse());
        else continue;
        open.splice(i, 1);
        grew = true;
        break;
      }
    }
    out.push(ring);
  }
  return out;
}

function areas(data, match, minKm2) {
  const min = minKm2 * KM * KM;
  const out = [];
  for (const el of data.elements) {
    if (!match(el.tags ?? {})) continue;
    for (const ring of rings(el)) {
      if (ring.length < 4 || !inView(ring) || area(ring) < min) continue;
      out.push(pathOf(simplify(ring, 0.5), true));
    }
  }
  return out.join("");
}

// --- Base map -------------------------------------------------------------

// One at a time: Overpass rate-limits parallel requests.
const roads = await osm("roads");
const nature = await osm("nature");
const transit = await osm("transit");
const metro = await osm("metro");

const lines = (filter, tolerance) => {
  const out = [];
  for (const el of roads.elements) {
    if (!filter(el.tags) || !el.geometry) continue;
    const pts = toPoints(el.geometry);
    if (inView(pts)) out.push(pathOf(simplify(pts, tolerance)));
  }
  return out.join("");
};

const RING = /outer ring road/i;
const CLASS = (cls) => (t) => t.highway === cls && !RING.test(t.name ?? "");

// Open lines only: Pink and Blue are still being built at the time of writing.
const METRO = { purple: "#b76be8", green: "#2fbf71", yellow: "#efca3e" };
const metroLayers = Object.entries(METRO)
  .map(([line, colour]) => {
    const parts = [];
    for (const el of metro.elements) {
      const name = `${el.tags?.name ?? ""} ${el.tags?.colour ?? ""}`.toLowerCase();
      if (!name.includes(line)) continue;
      for (const m of el.members ?? []) {
        if (m.geometry && m.role !== "stop" && m.role !== "platform") {
          const pts = toPoints(m.geometry);
          if (inView(pts)) parts.push(pathOf(simplify(pts, 0.5)));
        }
      }
    }
    console.log("metro", line, parts.length, "segments");
    return `<path d="${parts.join("")}" stroke="${colour}" stroke-width="3" stroke-opacity="0.9"/>`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * 2}" height="${H * 2}">
<rect width="${W}" height="${H}" fill="#0c131c"/>
<path d="${areas(nature, (t) => t.leisure === "park" || t.landuse === "forest" || t.natural === "wood" || t.boundary === "national_park", 0.02)}" fill="#163426" fill-rule="evenodd"/>
<path d="${areas(transit, (t) => t.aeroway === "aerodrome", 0.1)}" fill="#172130"/>
<path d="${areas(nature, (t) => t.natural === "water" || t.landuse === "reservoir", 0.004)}" fill="#1f5475" fill-rule="evenodd"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="${lines(CLASS("tertiary"), 0.4)}" stroke="#263444" stroke-width="1"/>
<path d="${lines(CLASS("secondary"), 0.4)}" stroke="#324254" stroke-width="1.4"/>
<path d="${lines(CLASS("primary"), 0.4)}" stroke="#44576d" stroke-width="2.1"/>
<path d="${lines(CLASS("trunk"), 0.4)}" stroke="#4d6078" stroke-width="2.8"/>
<path d="${lines(CLASS("motorway"), 0.4)}" stroke="#5c7088" stroke-width="3.2"/>
<path d="${lines((t) => RING.test(t.name ?? ""), 0.4)}" stroke="#6c8099" stroke-width="3.2"/>
<path d="${transit.elements.filter((e) => e.tags?.aeroway === "runway" && e.geometry).map((e) => pathOf(toPoints(e.geometry))).join("")}" stroke="#3a4a5e" stroke-width="4"/>
${metroLayers}
</g>
</svg>`;

await mkdir(join(ROOT, "public", "images", "map"), { recursive: true });
await sharp(Buffer.from(svg), { limitInputPixels: false, unlimited: true })
  .resize({ width: 1600 })
  .webp({ quality: 74, effort: 6 })
  .toFile(join(ROOT, "public", "images", "map", "bengaluru.webp"));

// --- Zones ----------------------------------------------------------------

const places = JSON.parse(await readFile(join(ROOT, "scripts", "data", "city-map-places.json"), "utf8"));
const seeds = places.seeds.map((s) => ({ ...s, xy: project(s.at) }));
const zoneIds = [...new Set(seeds.map((s) => s.zone))];

const CELL = 5;
const cols = Math.ceil(W / CELL);
const rows = Math.ceil(H / CELL);
const REACH = 4.6 * KM; // how far a neighbourhood's zone extends past it

const fields = Object.fromEntries(zoneIds.map((z) => [z, new Float64Array(cols * rows)]));
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const x = c * CELL;
    const y = r * CELL;
    let best = Infinity;
    let zone = null;
    for (const s of seeds) {
      const d = Math.hypot(s.xy[0] - x, s.xy[1] - y);
      if (d < best) {
        best = d;
        zone = s.zone;
      }
    }
    if (best <= REACH) fields[zone][r * cols + c] = 1;
  }
}

const zones = zoneIds.map((id) => {
  blur2({ data: fields[id], width: cols, height: rows }, 2.2);
  const [shape] = contours().size([cols, rows]).thresholds([0.5])(fields[id]);
  const polys = shape.coordinates
    .map((poly) => poly[0].map(([x, y]) => [x * CELL, y * CELL]))
    .filter((ring) => area(ring) > 6 * KM * KM);
  const d = polys.map((ring) => pathOf(simplify(ring, 0.9), true)).join("");
  const [lx, ly] = project(places.zoneLabels[id]);
  const xs = polys.flat().map((p) => p[0]);
  const ys = polys.flat().map((p) => p[1]);
  const bbox = [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)].map(Math.round);
  // A much coarser outline for the small locator thumbnails.
  const mini = polys.map((ring) => pathOf(simplify(ring, 7).map(([x, y]) => [Math.round(x), Math.round(y)]), true)).join("");
  return { id, d, mini, bbox, label: { left: +((lx / W) * 100).toFixed(1), top: +((ly / H) * 100).toFixed(1) } };
});

// --- Labels ---------------------------------------------------------------

const FONT = 19;
const hit = (a, b) => a.left < b.right + 3 && b.left < a.right + 3 && a.top < b.bottom + 1 && b.top < a.bottom + 1;

// Labels never sit on top of each other: each market tries four spots.
const markets = {};
for (const id of zoneIds) {
  const placed = [];
  const out = [];
  for (const s of seeds.filter((p) => p.zone === id && !p.hidden)) {
    const [x, y] = s.xy;
    const spots = [
      { anchor: "start", lx: x + 11, ly: y + 6 },
      { anchor: "end", lx: x - 11, ly: y + 6 },
      { anchor: "middle", lx: x, ly: y - 12 },
      { anchor: "middle", lx: x, ly: y + 25 },
    ];
    let chosen = null;
    for (const spot of spots) {
      const w = s.name.length * FONT * 0.54;
      const left = spot.anchor === "start" ? spot.lx : spot.anchor === "end" ? spot.lx - w : spot.lx - w / 2;
      const box = { left, right: left + w, top: spot.ly - FONT, bottom: spot.ly + 4 };
      const dot = { left: x - 6, right: x + 6, top: y - 6, bottom: y + 6 };
      const offMap = box.left < 6 || box.right > W - 6 || box.top < 6 || box.bottom > H - 6;
      if (offMap || placed.some((b) => hit(box, b)) || hit(box, dot)) continue;
      chosen = { ...spot, box };
      break;
    }
    placed.push({ left: x - 6, right: x + 6, top: y - 6, bottom: y + 6 });
    if (chosen) placed.push(chosen.box);
    out.push({
      name: s.name,
      x: round(x),
      y: round(y),
      ...(chosen ? { lx: round(chosen.lx), ly: round(chosen.ly), anchor: chosen.anchor } : {}),
    });
  }
  markets[id] = out;
}

const landmarks = places.landmarks.map((l) => {
  const [x, y] = project(l.at);
  return { name: l.name, kind: l.kind, x: round(x), y: round(y), ...(l.anchor ? { anchor: l.anchor } : {}) };
});
const [ax, ay] = project(places.airport);

const moduleText = `/**
 * Generated by scripts/make-city-map.mjs from OpenStreetMap data. Do not edit by
 * hand: change scripts/data/city-map-places.json and run \`npm run make-map\`.
 */

type Anchor = "start" | "middle" | "end";

export type CityMap = {
  width: number;
  height: number;
  airport: { x: number; y: number };
  zones: { id: string; d: string; mini: string; bbox: number[]; label: { left: number; top: number } }[];
  markets: Record<string, { name: string; x: number; y: number; lx?: number; ly?: number; anchor?: Anchor }[]>;
  landmarks: { name: string; kind: string; x: number; y: number; anchor?: Anchor }[];
};

export const cityMap: CityMap = ${JSON.stringify({ width: W, height: H, airport: { x: round(ax), y: round(ay) }, zones, markets, landmarks }, null, 2)};
`;
await writeFile(join(ROOT, "content", "cityMap.ts"), moduleText);

const { size } = await stat(join(ROOT, "public", "images", "map", "bengaluru.webp"));
console.log(`map ${W}x${H}, base image ${(size / 1024).toFixed(0)} KB, zones module ${(moduleText.length / 1024).toFixed(1)} KB`);
for (const id of zoneIds) console.log(id, markets[id].map((m) => m.name + (m.lx === undefined ? " (no label)" : "")).join(", "));
