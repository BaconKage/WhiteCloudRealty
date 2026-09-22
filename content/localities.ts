/**
 * The North Bengaluru airport corridor — the ground White Cloud Realty
 * actually covers, and the spine of the site.
 *
 * `x` / `y` are percentages inside the CorridorMap SVG viewBox, ordered from
 * the city end (bottom-left) out to the airport (top-right). Descriptions
 * stick to established infrastructure facts; no price or growth figures are
 * claimed here, because none are published on the current site.
 */

export type Locality = {
  id: string;
  name: string;
  /** Short infrastructure descriptor, shown above the name. */
  tag: string;
  blurb: string;
  /** What draws buyers and investors here. Keep to verifiable infrastructure. */
  anchors: string[];
  x: number;
  y: number;
};

export const localities: Locality[] = [
  {
    id: "hebbal-yelahanka",
    name: "Hebbal & Yelahanka",
    tag: "Bellary Road · Manyata Tech Park",
    blurb:
      "Where the airport corridor meets the city that was already here. Lakes, schools that have been around a while, and the shortest run into Bengaluru’s northern business districts.",
    anchors: ["Manyata Tech Park", "Hebbal flyover and the ORR", "Schools and hospitals already in place"],
    x: 12,
    y: 78,
  },
  {
    id: "hennur-thanisandra",
    name: "Hennur & Thanisandra",
    tag: "Outer Ring Road · New Airport Road",
    blurb:
      "A dense residential belt with the ORR tech corridor on one side and the airport road on the other. That is most of the reason so much premium apartment supply has landed here.",
    anchors: ["The ORR tech corridor", "Thanisandra Main Road"],
    x: 30,
    y: 64,
  },
  {
    id: "kiadb-bagalur",
    name: "KIADB Aerospace Park & Bagalur",
    tag: "KIADB Aerospace SEZ · Bagalur Road",
    blurb:
      "Bengaluru’s aerospace and hardware manufacturing cluster, on the road that runs up to the airport.",
    anchors: ["KIADB Aerospace Park SEZ", "Bagalur Road to the terminals", "A planned industrial employment base"],
    x: 50,
    y: 50,
  },
  {
    id: "airport-corridor",
    name: "Airport Corridor",
    tag: "NH-44 · Shettigere",
    blurb:
      "The stretch of NH-44 between the city and the terminals. Hotels and convention space sit here alongside the residential launches.",
    anchors: ["NH-44 expressway access", "Hospitality and convention clusters"],
    x: 68,
    y: 36,
  },
  {
    id: "devanahalli-sadahalli",
    name: "Devanahalli & Sadahalli",
    tag: "KIA Terminals 1 & 2 · IVC Road",
    blurb:
      "The far end of the corridor, and the busiest. Township-scale masterplans, airport employment and the Bengaluru Airport City build-out all sit within a few kilometres of each other, which is not something you can say about many pockets of the city.",
    anchors: [
      "Kempegowda International Airport",
      "IVC Road",
      "Township-scale masterplans",
      "Bengaluru Airport City",
    ],
    x: 87,
    y: 20,
  },
  {
    id: "north-bengaluru",
    name: "Wider North Bengaluru",
    tag: "Managed farmland · Estate living",
    blurb:
      "Past the built-up corridor the parcels get bigger. Farmland and villa estates, for buyers who want the space and don’t want to leave the airport’s catchment to get it.",
    anchors: ["Larger land parcels", "Managed farmland estates"],
    x: 66,
    y: 76,
  },
];

export function getLocality(id: string): Locality | undefined {
  return localities.find((l) => l.id === id);
}

/** The main spine, city end to airport — excludes the off-corridor catch-all. */
export const corridorSpine = localities.filter((l) => l.id !== "north-bengaluru");
