/**
 * Single source of truth for brand, contact and navigation.
 *
 * Everything here was taken from the existing whitecloudrealty.in site or its
 * marketing collateral. Anything still unknown is marked `null` and the UI
 * hides that element rather than inventing a value - see TODO notes below.
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
    // As the client asked: the number shown wherever the site displays one, and
    // a separate number behind every WhatsApp button (which never shows it).
    phoneDisplay: "+91 98868 98699",
    phoneHref: "tel:+919886898699",
    whatsapp: "919686987757",
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
    hours: "10 am – 7 pm, all days" as string | null,
  },

  /** The firm's own pages. The founder's profile lives on `founder` above. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/white-cloud-realty/" },
    { label: "Instagram", href: "https://www.instagram.com/whitecloudrealty.in/" },
    { label: "Facebook", href: "https://www.facebook.com/share/1TXdFjcGAt/" },
    { label: "YouTube", href: "https://www.youtube.com/@whitecloudrealty" },
  ],

  /** The firm's Karnataka RERA agent registration. Project numbers to follow. */
  agentRera: "PRM/KA/RERA/1251/309/AG/260122/006759" as string | null,
  gstin: "29AFBPM2301Q1ZB" as string | null,

  disclaimer:
    "White Cloud Realty is a real estate advisory and brokerage firm. Project information, pricing and imagery are provided by the respective developers and are indicative only; they do not constitute an offer or contract. Please verify all details, approvals and RERA registrations with the developer before making any commitment.",
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Meet the team", href: "/team" },
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
