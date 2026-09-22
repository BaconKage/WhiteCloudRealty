/**
 * Developer partners, as shown on the current site's "Our Partners" row.
 * Logos were downloaded from that site by scripts/fetch-assets.mjs.
 *
 * Each logo is the property of its respective developer and is shown to
 * indicate the firms White Cloud Realty transacts with.
 */

export type Partner = {
  name: string;
  logo: string;
  /** Logos vary wildly in aspect ratio; this keeps the row optically even. */
  width: number;
  height: number;
  /** True for logos that are dark-on-transparent and need inverting on ink. */
  invertOnDark?: boolean;
};

export const partners: Partner[] = [
  { name: "Prestige Group", logo: "/images/partners/prestige.svg", width: 150, height: 56 },
  { name: "Brigade Group", logo: "/images/partners/brigade.svg", width: 150, height: 56 },
  { name: "Godrej Properties", logo: "/images/partners/godrej.svg", width: 150, height: 56 },
  { name: "Sobha", logo: "/images/partners/sobha.jpg", width: 86, height: 56 },
  { name: "Puravankara", logo: "/images/partners/puravankara.png", width: 160, height: 26 },
  { name: "Lodha", logo: "/images/partners/lodha.png", width: 160, height: 22 },
  { name: "Tata Housing", logo: "/images/partners/tata-housing.jpg", width: 64, height: 64 },
  { name: "TVS Emerald", logo: "/images/partners/tvs-emerald.png", width: 64, height: 64 },
  { name: "Embassy Group", logo: "/images/partners/embassy.jpg", width: 120, height: 63 },
  { name: "Avillion", logo: "/images/partners/avillion.jpg", width: 140, height: 79 },
];
