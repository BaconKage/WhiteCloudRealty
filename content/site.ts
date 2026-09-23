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
    "Strategic real estate advisory for North Bengaluru. Residential, commercial and land, for buying, selling and renting, guided by market intelligence and client-first thinking.",
  url: "https://www.whitecloudrealty.in",
  locale: "en-IN",
  region: "North Bengaluru, Karnataka, India",

  founder: {
    name: "Sayanti Majumdar",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/sayantimajumdar/",
    portrait: "/images/founder-portrait.jpg" as string | null,
  },

  contact: {
    phoneDisplay: "+91 90356 81633",
    phoneHref: "tel:+919035681633",
    whatsapp: "919035681633",
    email: "connect@whitecloudrealty.in",
    // TODO: no office address is published anywhere on the current site.
    // Add it here and the footer + contact page will render it, along with
    // the `address` field of the RealEstateAgent structured data.
    address: null as null | {
      street: string;
      locality: string;
      city: string;
      state: string;
      postalCode: string;
      mapUrl: string;
    },
    // TODO: opening hours are not published anywhere on the current site.
    // Fill this in and the footer and contact page show it; left null they
    // both omit the row rather than guess.
    hours: null as string | null,
  },

  /** The firm's own pages. The founder's profile lives on `founder` above. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/white-cloud-realty/" },
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
      { label: "North Bengaluru corridor", href: "/#corridor" },
      { label: "Insights", href: "/insights" },
      { label: "How we work", href: "/#how-we-work" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Buy a home", href: "/#buy" },
      { label: "Invest for returns", href: "/#invest" },
      { label: "Sell & diversify", href: "/#sell" },
      { label: "Yield calculator", href: "/contact#calculator" },
    ],
  },
];

/** Prefilled WhatsApp deep link. */
export function whatsappLink(message?: string): string {
  const text = message ?? `Hi ${site.name}, I'd like to know more about your services.`;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
