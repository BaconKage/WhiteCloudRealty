/**
 * The project portfolio.
 *
 * Every `description` is the copy as published on whitecloudrealty.in/projects.
 * Structured fields (price, configurations, area, possession) are only filled
 * where the source material actually stated them — the rest are `null`, and
 * the UI omits those rows rather than showing a placeholder. Fill them in and
 * the cards, filters and comparison table pick them up with no code changes.
 */

export type ProjectCategory =
  | "apartments"
  | "villas"
  | "plots"
  | "township"
  | "farmland"
  | "hospitality";

export type ProjectStatus = "pre-launch" | "new-launch" | "under-construction" | "ready";

export type Project = {
  slug: string;
  name: string;
  developer: string;
  /** Matches an `id` in content/localities.ts, or null if not yet placed. */
  localityId: string | null;
  /** Human-readable location exactly as the source copy describes it. */
  locationLabel: string;
  category: ProjectCategory;
  status: ProjectStatus | null;
  /** Starting price in rupees. TODO across the board — see README. */
  priceFrom: number | null;
  /** e.g. ["3 BHK", "4 BHK"] */
  configurations: string[];
  /** [min, max] saleable area in sq ft. */
  areaSqft: [number, number] | null;
  /** Free text, e.g. "Dec 2029". */
  possession: string | null;
  /** Total development footprint, e.g. "225 acres". */
  landArea: string | null;
  /** TODO: Karnataka RERA registration number for the project. */
  rera: string | null;
  image: string;
  imageAlt: string;
  /** One line for cards and meta descriptions. */
  summary: string;
  /** Full copy, one string per paragraph. */
  description: string[];
  highlights: string[];
  featured: boolean;
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  apartments: "Apartments",
  villas: "Villas",
  plots: "Plots",
  township: "Township",
  farmland: "Managed farmland",
  hospitality: "Hospitality",
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  "pre-launch": "Pre-launch",
  "new-launch": "New launch",
  "under-construction": "Under construction",
  ready: "Ready to move",
};

export const projects: Project[] = [
  {
    slug: "white-lotus-amanvana",
    name: "White Lotus Amanvana",
    developer: "White Lotus Group",
    localityId: null, // TODO: the source copy does not state a location.
    locationLabel: "Bengaluru",
    category: "apartments",
    status: null,
    priceFrom: null,
    configurations: [],
    areaSqft: null,
    possession: null,
    landArea: null,
    rera: null,
    image: "/images/projects/white-lotus-amanvana-4k.webp",
    imageAlt:
      "Architectural render of the White Lotus Amanvana clubhouse, brick arches wrapped in planting",
    summary:
      "A philosophy of experience rather than a checklist of amenities — homes cradled with care, walks that unfold like a story.",
    description: [
      "Amanvana isn’t a checklist of amenities, but a philosophy of experience. Every home is cradled with care, every walk unfolds like a story, and each day makes space for who you are and who you’re becoming.",
    ],
    highlights: [
      "Experience-led masterplan rather than an amenity count",
      "Landscaped walks threaded through the community",
      "Homes designed around how a day actually unfolds",
    ],
    featured: true,
  },
  {
    slug: "avillion-farm-villas",
    name: "Avillion — Luxury Farm Villas",
    developer: "Avillion Infrastructure",
    localityId: "north-bengaluru",
    locationLabel: "North Bengaluru",
    category: "farmland",
    status: null,
    priceFrom: null,
    configurations: [],
    areaSqft: null,
    possession: null,
    landArea: "225 acres",
    rera: null,
    image: "/images/projects/avillion-farm-villas-4k.webp",
    imageAlt: "A-frame farm villa with a tiled roof set among palms and stone landscaping",
    summary:
      "Managed farmland across 225 acres of verdant North Bangalore landscape, built around luxury, comfort and the future of living.",
    description: [
      "Avillion Farms is a managed farmland associated with Avillion Infrastructure. Nestled across 225 acres of picturesque, verdant landscape in North Bangalore.",
      "Avillion Farms goes above and beyond in providing unparalleled luxury, sophistication, functionality, comfort and style that come together in perfect harmony in a home that inspires the Future of Living.",
    ],
    highlights: [
      "225 acres of managed farmland",
      "Verdant North Bangalore setting",
      "Villa living with estate management handled for you",
    ],
    featured: true,
  },
  {
    slug: "leela-bhartiya-city",
    name: "The Leela Bhartiya City",
    developer: "Bhartiya City · The Leela",
    localityId: "airport-corridor",
    locationLabel: "Near Kempegowda International Airport",
    category: "hospitality",
    status: null,
    priceFrom: null,
    configurations: [],
    areaSqft: null,
    possession: null,
    landArea: null,
    rera: null,
    image: "/images/projects/leela-bhartiya-city-4k.webp",
    imageAlt:
      "The Leela Bhartiya City at dusk, a lit tower above flowering trees and landscaped grounds",
    summary:
      "Five-star grandeur minutes from Kempegowda International Airport, with seamless access to the IT corridor and Financial District.",
    description: [
      "The Leela Bhartiya City Bengaluru stands as a beacon of refined elegance and 5-star grandeur. Strategically located near Kempegowda International Airport, this luxury hotel near Bangalore Airport offers seamless access to the city’s vibrant IT corridor and Financial District, bringing together sophistication and comfort.",
    ],
    highlights: [
      "Minutes from Kempegowda International Airport",
      "Direct access to the IT corridor and Financial District",
      "Five-star hospitality anchoring a mixed-use city",
    ],
    featured: false,
  },
  {
    slug: "bm-solcrest",
    name: "Brick & Milestones — Solcrest",
    developer: "B&M Group",
    localityId: "hennur-thanisandra",
    locationLabel: "Hennur, Bengaluru",
    category: "apartments",
    status: null,
    priceFrom: null,
    configurations: [],
    areaSqft: null,
    possession: null,
    landArea: null,
    rera: null,
    image: "/images/projects/bm-solcrest-4k.webp",
    imageAlt:
      "Sweeping cantilevered entrance canopy at B&M Solcrest with residential towers rising behind",
    summary:
      "An upscale residential address in the centre of Hennur, built around family life and reconnection with the community.",
    description: [
      "Enter a realm where peace harmonizes with contemporary living at B&M Solcrest, an upscale residential development by B&M Group situated in the center of Hennur, Bangalore.",
      "Crafted with family dynamics in mind, this remarkable residence offers a sanctuary where you can savor the benefits of modern living while reestablishing connections with the vibrant community surrounding you.",
    ],
    highlights: [
      "Central Hennur location",
      "Planned around family living",
      "Contemporary design with a community core",
    ],
    featured: true,
  },
  {
    slug: "purva-flow-kiadb",
    name: "Purva Codename Flow",
    developer: "Puravankara Group",
    localityId: "kiadb-bagalur",
    locationLabel: "KIADB Aerospace Tech Park, Bagalur",
    category: "apartments",
    status: null,
    priceFrom: null,
    configurations: [],
    areaSqft: null,
    possession: null,
    landArea: "25 acres",
    rera: null,
    image: "/images/projects/purva-flow-kiadb-4k.webp",
    imageAlt:
      "Render of the Purva Codename Flow towers above the KIADB Aerospace Tech Park skyline at sunset",
    summary:
      "A 25-acre high-rise gated community in the KIADB Aerospace Tech Park, built for comfort, connectivity and a future-ready lifestyle.",
    description: [
      "Purva Codename Flow, an extraordinary residential address crafted by the renowned Puravankara Group. Spread across 25 sprawling acres, this high-rise gated community in Bagalur’s KIADB Aerospace Tech Park is designed for those who value comfort, connectivity, and a future-ready lifestyle.",
      "With world-class amenities, premium homes, and seamless access to Bengaluru’s growth hubs, Purva Codename Flow is set to redefine modern living in North Bangalore.",
    ],
    highlights: [
      "25-acre high-rise gated community",
      "Inside the KIADB Aerospace Tech Park",
      "Seamless access to Bengaluru’s growth hubs",
    ],
    featured: true,
  },
  {
    slug: "nikoo-garden-estate",
    name: "Nikoo Garden Estate",
    developer: "Bhartiya Urban",
    localityId: "devanahalli-sadahalli",
    locationLabel: "Sadahalli, Bengaluru",
    category: "township",
    status: null,
    priceFrom: null,
    configurations: ["Studio", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK"],
    areaSqft: null,
    possession: null,
    landArea: null,
    rera: null,
    image: "/images/projects/nikoo-garden-estate-4k.webp",
    imageAlt: "Render of the Nikoo Garden Estate towers and landscaped township in Sadahalli",
    summary:
      "An integrated township in Sadahalli — 180 row houses and townhouses, apartments, retail and a school in one masterplan.",
    description: [
      "Nikoo Garden Estate presents lavish row houses, townhouses, retail, and one educational building in Sadahalli, Bangalore.",
      "There are 2.5 BHK, 3 BHK, 3.5 & 4 BHK apartments and studio apartments available. There are a total of 180 townhouses/ row houses, 1 retail building, and 1 school in this integrated township project. Immerse in the lap of nature and some of the most engaging amenities.",
    ],
    highlights: [
      "180 townhouses and row houses",
      "Retail and a school inside the township",
      "Studio through 4 BHK apartments",
    ],
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectsInLocality(localityId: string): Project[] {
  return projects.filter((p) => p.localityId === localityId);
}

/** Categories actually present in the portfolio, for the filter chips. */
export const activeCategories: ProjectCategory[] = [...new Set(projects.map((p) => p.category))];
