/**
 * The seven parts of Bengaluru White Cloud Realty works across, and the spine
 * of the Choose your location section.
 *
 * Zone names and micro-markets come from the firm's own city map. Blurbs and
 * anchors stick to established infrastructure facts; no price or growth figures
 * are claimed here.
 *
 * `from` / `to` are compass bearings (0 = north, clockwise) that place the
 * zone's wedge on the LocationFinder map. Central has none: it is the hub.
 */

export type Locality = {
  id: string;
  name: string;
  /** The zone on its own, for labels on the map. */
  shortName: string;
  /** Short descriptor, shown above the name. */
  tag: string;
  blurb: string;
  /** Prominent micro-markets in this zone. */
  markets: string[];
  /** What holds the zone up. Keep to verifiable infrastructure. */
  anchors: string[];
  from?: number;
  to?: number;
};

export const localities: Locality[] = [
  {
    id: "north",
    name: "North Bangalore",
    shortName: "North",
    tag: "Hebbal · Airport Road · Yelahanka",
    blurb:
      "The airport side of the city. Bellary Road and NH-44 run from Hebbal out to the terminals, with established neighbourhoods at the city end and township-scale projects further out.",
    markets: ["Yelahanka", "Hebbal", "Thanisandra", "Jakkur", "Hennur", "Nagavara", "Sahakaranagar", "RT Nagar"],
    anchors: ["Kempegowda International Airport", "Manyata Tech Park", "Bellary Road and NH-44"],
    from: 322,
    to: 32,
  },
  {
    id: "north-east",
    name: "North East Bangalore",
    shortName: "North East",
    tag: "Kalyan Nagar · Old Madras Road",
    blurb:
      "Settled residential layouts between the Outer Ring Road and Old Madras Road, with quick links across to both the northern and eastern job centres.",
    markets: ["HRBR Layout", "Kalyan Nagar", "Banaswadi", "Horamavu", "KR Puram", "Ramamurthy Nagar"],
    anchors: ["Outer Ring Road", "Old Madras Road", "Purple Line at KR Puram"],
    from: 32,
    to: 76,
  },
  {
    id: "east",
    name: "East Bangalore",
    shortName: "East",
    tag: "Whitefield · Old Airport Road",
    blurb:
      "From Indiranagar and Old Airport Road out to Whitefield. Technology parks shaped this side of the city, and the Purple Line now ties it back to the centre.",
    markets: ["Indiranagar", "HAL", "Kodihalli", "Old Airport Road", "Whitefield", "Marathahalli", "Varthur"],
    anchors: ["ITPL and the Whitefield tech parks", "Purple Line metro", "Old Airport Road"],
    from: 76,
    to: 128,
  },
  {
    id: "south-east",
    name: "South East Bangalore",
    shortName: "South East",
    tag: "Koramangala · Sarjapur Road",
    blurb:
      "Koramangala, HSR and the Outer Ring Road tech corridor, running on to Sarjapur Road and Electronic City. A strong rental market and a lot of commercial demand.",
    markets: ["Koramangala", "HSR Layout", "BTM Layout", "Bellandur", "Sarjapur Road", "Electronic City"],
    anchors: ["Outer Ring Road tech corridor", "Electronic City", "Yellow Line metro"],
    from: 128,
    to: 170,
  },
  {
    id: "south",
    name: "South Bangalore",
    shortName: "South",
    tag: "Jayanagar · Bannerghatta Road",
    blurb:
      "The city's most settled residential belt. Long-established layouts close in, with newer homes along Bannerghatta Road and Kanakapura Road further out.",
    markets: ["Jayanagar", "JP Nagar", "Banashankari", "Uttarahalli", "Hulimavu", "Bannerghatta Road"],
    anchors: ["Green Line along Kanakapura Road", "Bannerghatta Road", "Lalbagh and Bannerghatta National Park"],
    from: 170,
    to: 236,
  },
  {
    id: "west",
    name: "West Bangalore",
    shortName: "West",
    tag: "Rajajinagar · Mysore Road",
    blurb:
      "Older family neighbourhoods like Rajajinagar and Vijayanagar, with Magadi Road and Mysore Road carrying the city out towards Kengeri.",
    markets: ["Rajajinagar", "Vijayanagar", "Basaveshwaranagar", "Magadi Road", "Nagarbhavi", "Kengeri", "Mysore Road"],
    anchors: ["Purple and Green Line metro", "Bengaluru–Mysuru highway", "Peenya industrial area"],
    from: 236,
    to: 322,
  },
  {
    id: "central",
    name: "Central Bangalore",
    shortName: "Central",
    tag: "MG Road · Lavelle Road",
    blurb:
      "The original business district. Scarce residential supply, premium addresses and the city's core office and retail streets.",
    markets: ["MG Road", "Brigade Road", "Residency Road", "Cubbon Park", "Commercial Street", "Lavelle Road"],
    anchors: ["MG Road and Brigade Road", "Cubbon Park", "Purple Line metro"],
  },
];

/** Growth corridors that cut across the zones above. */
export const developingCorridors = [
  "Sarjapur Road",
  "Kanakapura Road",
  "Hennur Road",
  "Airport Road",
  "Old Madras Road",
  "NICE Corridor",
];

export function getLocality(id: string): Locality | undefined {
  return localities.find((l) => l.id === id);
}
