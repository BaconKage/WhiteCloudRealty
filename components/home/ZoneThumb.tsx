import { cityMap } from "@/content/cityMap";

const VIEW = `0 0 ${cityMap.width} ${cityMap.height}`;

/**
 * The zone shapes, once per page. Every thumbnail reuses them, so a row of seven
 * little maps does not repeat seven copies of every outline in the HTML.
 */
export function ZoneThumbDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        {cityMap.zones.map((zone) => (
          <path key={zone.id} id={`zone-shape-${zone.id}`} d={zone.mini} />
        ))}
      </defs>
    </svg>
  );
}

/** A small city silhouette with one zone lit, so a zone reads at a glance. */
export function ZoneThumb({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox={VIEW} aria-hidden="true" className={className}>
      {cityMap.zones.map((zone) => (
        <use
          key={zone.id}
          href={`#zone-shape-${zone.id}`}
          className={zone.id === id ? "fill-brand" : "fill-fg/15"}
          stroke="var(--color-bg, #0b1119)"
          strokeWidth="14"
        />
      ))}
    </svg>
  );
}
