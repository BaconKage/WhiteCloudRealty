import { cityMap } from "@/content/cityMap";
import { getLocality } from "@/content/localities";

/**
 * A zone on the real map, cropped to fit: its outline and its neighbourhoods
 * where they actually are. It reuses the home page's map image, so it costs no
 * extra download for anyone who has seen that.
 */
export function ZoneCloseUp({ id }: { id: string }) {
  const zone = cityMap.zones.find((z) => z.id === id);
  if (!zone) return null;

  const [x, y, w, h] = zone.bbox;
  const pad = Math.max(w, h) * 0.08;
  // Kept inside the image, so the crop never shows past the edge of the map.
  const viewW = Math.min(w + pad * 2, cityMap.width);
  const viewH = Math.min(h + pad * 2, cityMap.height);
  const viewX = Math.max(0, Math.min(x - pad, cityMap.width - viewW));
  const viewY = Math.max(0, Math.min(y - pad, cityMap.height - viewH));
  const view = [viewX, viewY, viewW, viewH];
  // Text and dots scale with the crop, so they read the same at any zoom.
  const unit = viewW / 1000;
  const name = getLocality(id)?.name ?? "";
  const markets = cityMap.markets[id] ?? [];

  // A label runs to the right of its dot unless that would hit another dot or
  // the edge of the crop.
  const flips = (m: (typeof markets)[number]) => {
    const width = m.name.length * 31 * unit * 0.56 + 20 * unit;
    const hitsEdge = m.x + width > viewX + viewW;
    const hitsDot = markets.some(
      (o) => o !== m && o.x > m.x && o.x < m.x + width && Math.abs(o.y - m.y) < 42 * unit,
    );
    return hitsEdge || hitsDot;
  };

  return (
    <figure>
      <div className="border-line overflow-hidden rounded-(--radius-card) border">
        <svg viewBox={view.join(" ")} role="img" aria-label={`Map of ${name} and its neighbourhoods`} className="block h-auto w-full">
          <image href="/images/map/bengaluru.webp" width={cityMap.width} height={cityMap.height} />
          <path d={zone.d} fill="rgb(255 118 30 / 0.26)" stroke="#ff761e" strokeWidth={4 * unit} />
          {markets.map((m) => (
            <g key={m.name}>
              <circle cx={m.x} cy={m.y} r={11 * unit} fill="#fff" stroke="#0a1018" strokeWidth={4 * unit} />
              <text
                x={m.x + (flips(m) ? -20 : 20) * unit}
                y={m.y + 11 * unit}
                textAnchor={flips(m) ? "end" : "start"}
                fontSize={31 * unit}
                fontWeight="500"
                fill="#fff"
                style={{ paintOrder: "stroke", stroke: "#0a1018", strokeWidth: 8 * unit, strokeLinejoin: "round" }}
              >
                {m.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="text-faint mt-2 text-xs">
        Boundary is indicative. Map data &copy;{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          OpenStreetMap contributors
        </a>
        .
      </figcaption>
    </figure>
  );
}
