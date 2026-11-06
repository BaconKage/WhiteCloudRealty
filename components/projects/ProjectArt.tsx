import { cityMap } from "@/content/cityMap";
import type { ProjectCategory, ProjectSummary } from "@/content/projects";
import { cx } from "@/lib/format";

const ICONS: Record<ProjectCategory, string> = {
  apartments:
    "M6 20V4.5h12V20M3.5 20h17M9.5 8h1.5M13 8h1.5M9.5 11.5h1.5M13 11.5h1.5M10.5 20v-4.5h3V20",
  villas: "M4 11.5 12 5l8 6.5M6.5 10v9.5h11V10M10 19.5v-5h4v5",
  plots: "M4 18.5 8 6.5h8l4 12H4ZM6.7 12.5h10.6M12 6.5v12",
  farmhouses:
    "M3.5 20h17M4.5 20v-7l5-4 5 4v7M8 20v-4h3v4M18.5 20v-5.5M18.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  commercial:
    "M5 20V6.5l8-2V20M13 9.5l6 1.5v9M3.5 20h17M8 9h2M8 12.5h2M8 16h2M16 14h.01M16 17h.01",
  investment: "M4 19.5h16M5.5 15l4.5-4.5 3.5 3L19 7.5M15 7.5h4v4",
};

/**
 * Stands in for a project photo until the developer's imagery arrives: the
 * property type and where it sits in the city, in the site’s own colours
 * rather than a grey placeholder.
 */
export function ProjectArt({
  project,
  compact = false,
  className,
}: {
  project: Pick<ProjectSummary, "category" | "localityId" | "locationLabel">;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "on-ink absolute inset-0 overflow-hidden bg-[#0b1119] text-white",
        "bg-[radial-gradient(90%_80%_at_100%_0%,rgb(255_118_30/0.32),transparent_60%),radial-gradient(70%_60%_at_0%_100%,rgb(255_118_30/0.12),transparent_70%)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.07]"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M${i * 50} 0V300M0 ${i * 50}H400`}
            stroke="#fff"
            strokeWidth="1"
          />
        ))}
      </svg>

      {project.localityId && (
        <svg
          viewBox={`0 0 ${cityMap.width} ${cityMap.height}`}
          className={cx(
            "absolute",
            compact ? "right-3 bottom-3 h-12" : "right-5 bottom-5 h-[46%]",
          )}
        >
          {cityMap.zones.map((zone) => (
            <path
              key={zone.id}
              d={zone.mini}
              fill={
                zone.id === project.localityId
                  ? "#ff761e"
                  : "rgb(255 255 255 / 0.14)"
              }
              stroke="#0b1119"
              strokeWidth="14"
            />
          ))}
        </svg>
      )}

      <div
        className={cx(
          "absolute",
          compact ? "bottom-3 left-3" : "bottom-5 left-5 max-w-[55%]",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cx("text-brand", compact ? "h-7 w-7" : "h-11 w-11")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={ICONS[project.category]} />
        </svg>
        {!compact && (
          <p className="font-display mt-3 text-base leading-snug text-white/90">
            {project.locationLabel}
          </p>
        )}
      </div>
    </div>
  );
}
