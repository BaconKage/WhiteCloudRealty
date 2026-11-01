const LINES = [
  {
    name: "Green Line",
    colour: "#2fbf71",
    status: "Open",
    stops: ["Jayanagar", "Banashankari", "JP Nagar", "Yelachenahalli", "Silk Institute"],
  },
  {
    name: "Yellow Line",
    colour: "#d9b02b",
    status: "Open",
    stops: ["RV Road", "Jayadeva Hospital", "BTM Layout", "Silk Board", "Electronic City", "Bommasandra"],
  },
  {
    name: "Pink Line",
    colour: "#e0569b",
    status: "Being built",
    planned: true,
    stops: ["Kalena Agrahara", "JP Nagar 4th Phase", "Jayadeva Hospital", "Tavarekere"],
  },
];

/**
 * South Bangalore's metro lines as a schematic. Each line is named beside its
 * colour, and the line still being built is dashed, so colour is never the only
 * signal. Selected stations, in order along the line.
 */
export function MetroDiagram() {
  return (
    <div className="border-line bg-surface mt-6 space-y-6 rounded-(--radius-card) border p-5 sm:p-6">
      {LINES.map((line) => (
        <div key={line.name}>
          <p className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-fg font-semibold">{line.name}</span>
            <span className="text-faint text-xs">{line.status}</span>
          </p>
          <div className="scrollbar-none -mx-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6">
            <ol
              className="relative mt-3 flex min-w-max justify-between gap-5 sm:min-w-0"
              style={{ "--line": line.colour } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-2 top-[5px] border-t-[3px] border-(--line)"
                style={{ borderTopStyle: line.planned ? "dashed" : "solid" }}
              />
              {line.stops.map((stop) => (
                <li key={stop} className="relative flex w-16 shrink-0 flex-col items-start first:items-start last:items-end sm:w-auto sm:flex-1 sm:items-center sm:first:items-start sm:last:items-end">
                  <span aria-hidden="true" className="bg-surface block h-[13px] w-[13px] rounded-full border-[3px] border-(--line)" />
                  <span className="text-muted mt-2 block text-xs leading-snug last:text-right sm:text-center">{stop}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
      <p className="text-faint text-xs">Selected stations. Please check current opening dates.</p>
    </div>
  );
}
