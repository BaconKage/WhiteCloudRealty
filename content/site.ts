/**
 * Single source of truth for brand, contact and navigation.
 *
 * Everything here was taken from the existing whitecloudrealty.in site or its
 * marketing collateral. Anything still unknown is marked `null` and the UI
 * hides that element rather than inventing a value — see TODO notes below.
 */

export const site = {
  name: "White Cloud Realty",
  shortName: "White Cloud",
  legalName: "White Cloud Realty",
  tagline: "Your search. Our expertise.",
  description:
    "Strategic real estate advisory across Bengaluru. Residential, commercial and land, for buying, selling and renting, guided by market intelligence and client-first thinking.",
  url: "https://www.whitecloudrealty.in",
  locale: "en-IN",
  region: "All of Bengaluru, Karnataka, India",

  founder: {
    name: "Sayanti Majumdar",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/sayantimajumdar/",
    portrait: "/images/founder-portrait.jpg" as string | null,
  },

  coFounder: {
    name: "Mahesh Sham Wadhwa",
    role: "Co-Founder & Managing Director",
    linkedin: "https://www.linkedin.com/in/maheshswadhwa/",
    portrait: "/images/team/mahesh-sham-wadhwa.jpg",
  },

  contact: {
    // The website's call to action, as requested by the client. Their office
    // line (+91 90356 81633) is on the business card but deliberately not here.
    phoneDisplay: "+91 98868 98882",
    phoneHref: "tel:+919886898882",
    whatsapp: "919886898882",
    email: "connect@whitecloudrealty.in",
    // From the business card. Drives the footer, the contact page and the
    // `address` field of the RealEstateAgent structured data.
    address: {
      street: "#6, 3rd Main Road, Venkategowda Layout",
      locality: "Kempapura, Hebbal",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560024",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("#6, 3rd Main Road, Venkategowda Layout, Kempapura, Hebbal, Bengaluru 560024"),
    },
    // TODO: opening hours are not published anywhere on the current site.
    // Fill this in and the footer and contact page show it; left null they
    // both omit the row rather than guess.
    hours: null as string | null,
  },

  /** The firm's own pages. The founder's profile lives on `founder` above. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/white-cloud-realty/" },
    { label: "Instagram", href: "https://www.instagram.com/whitecloudrealty.in/" },
  ],

  /**
   * TODO: RERA registration. Indian property listings are expected to carry
   * the agent's RERA number, and each project its own. Fill `agentRera` here
   * and `rera` on each project in content/projects.ts. Until then the footer
   * shows the advisory disclaimer only.
   */
  agentRera: null as string | null,

  disclaimer:
    "White Cloud Realty is a real estate advisory and brokerage firm. Project information, pricing and imagery are provided by the respective developers and are indicative only; they do not constitute an offer or contract. Please verify all details, approvals and RERA registrations with the developer before making any commitment.",
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Meet the team", href: "/team" },
      { label: "Founder's desk", href: "/about#founders-desk" },
      { label: "Our partners", href: "/about#partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "All projects", href: "/projects" },
      { label: "Choose your location", href: "/#locations" },
      { label: "Insights", href: "/insights" },
      { label: "How we work", href: "/#how-we-work" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Buy a home", href: "/#buy" },
      { label: "Sell & diversify", href: "/#sell" },
      { label: "Rent", href: "/#rent" },
      { label: "Invest for returns", href: "/#invest" },
      { label: "Commercial", href: "/#commercial" },
      { label: "Yield calculator", href: "/contact#calculator" },
    ],
  },
];

/** Prefilled WhatsApp deep link. */
export function whatsappLink(message?: string): string {
  const text = message ?? `Hi ${site.name}, I'd like to know more about your services.`;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
