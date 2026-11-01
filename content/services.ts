/**
 * Services, capabilities and the buyer journey.
 *
 * All copy is lifted from whitecloudrealty.in (home + about) and the firm's
 * own printed collateral. Nothing here describes a service the firm has not
 * already claimed publicly.
 */

export type Service = {
  id: string;
  /** Short verb phrase used on cards and in nav. */
  label: string;
  title: string;
  lede: string;
  body: string[];
  listTitle: string;
  list: string[];
  closer: string;
  cta: string;
};

/** The intent-led paths: buy, sell, rent, invest and commercial. */
export const services: Service[] = [
  {
    id: "buy",
    label: "Buy a home",
    title: "Finding your dream home",
    lede:
      "Finding your dream home is more than a transaction — it’s a journey toward the life you’ve always imagined.",
    body: [
      "Whether you’re looking for your first home, a spacious upgrade, or a smart investment, the right property should reflect your lifestyle, priorities, and aspirations.",
      "At every step, we make the process simple, transparent, and tailored to you. From understanding your needs and shortlisting the right options to site visits, negotiations, and final paperwork, we guide you with expert insight and genuine care.",
    ],
    listTitle: "Why your search should start with us",
    list: [
      "Curated listings that match your budget, location, and preferences",
      "Local market expertise to help you make informed decisions",
      "Personalized assistance from search to possession",
      "Trusted support for legal, financial, and documentation needs",
    ],
    closer:
      "Your dream home isn’t just about walls and windows — it’s about comfort, connection, and a future you can build with confidence.",
    cta: "Start your home search",
  },
  {
    id: "invest",
    label: "Invest for returns",
    title: "The right asset, in the right location, at the right time",
    lede:
      "Real estate investing is not just about buying property — it’s about choosing the right asset, in the right location, at the right time, to create long-term value.",
    body: [
      "Whether your goal is steady rental income, capital appreciation, or portfolio diversification, we help you identify opportunities that align with your financial objectives and risk appetite.",
      "Our approach combines market insight, location intelligence, and data-backed evaluation to help you invest with clarity and confidence — from residential and commercial assets to pre-launch and ready-to-move opportunities.",
    ],
    listTitle: "How we help you invest smarter",
    list: [
      "Goal-based property matching tailored to your return expectations",
      "High-potential micro-market analysis focused on growth corridors",
      "Rental yield and appreciation assessment for informed decision-making",
      "Due diligence support across legal, technical, and financial checks",
      "End-to-end advisory from selection to closure and beyond",
    ],
    closer:
      "Build a stronger portfolio with real estate investments chosen for returns, not guesswork.",
    cta: "Discuss an investment",
  },
  {
    id: "sell",
    label: "Sell & diversify",
    title: "Sell smart. Diversify better.",
    lede:
      "Your existing assets hold value — but the right strategy unlocks their full potential.",
    body: [
      "Whether you’re planning to exit a property, rebalance your portfolio, or move capital into higher-growth opportunities, we help you do it with clarity and confidence.",
      "Selling is not just about listing; it’s about positioning your asset for maximum value. Diversification is not just about spreading risk; it’s about building a stronger, more resilient portfolio aligned to your goals.",
    ],
    listTitle: "How we help you optimise your assets",
    list: [
      "Strategic asset evaluation to identify what to hold, sell, or reinvest",
      "Market-aligned pricing and positioning for stronger buyer interest",
      "Targeted buyer outreach to improve speed and value of closure",
      "Capital redeployment guidance into high-potential opportunities",
      "End-to-end transaction support across negotiation, documentation, and closure",
    ],
    closer:
      "Unlock value from what you own today and diversify for what you want tomorrow.",
    cta: "Request a valuation",
  },
  {
    id: "rent",
    label: "Rent",
    title: "Renting, on either side of the lease",
    lede:
      "Whether you need a place to live or a tenant for one you own, renting deserves the same care as buying.",
    body: [
      "We start with what the property has to do for you: the commute, the budget and how long you plan to stay, or the income you want it to bring in.",
    ],
    listTitle: "How we help you rent",
    list: [
      "Homes shortlisted against your budget, location and timeline",
      "Rental pricing and positioning if you are letting out",
      "Support with agreements and documentation",
    ],
    closer: "A clear brief, sensible terms and paperwork handled properly.",
    cta: "Talk about renting",
  },
  {
    id: "commercial",
    label: "Commercial",
    title: "Commercial property, judged on the numbers",
    lede:
      "Office, retail and leased assets, assessed on yield, tenant quality and where the micro-market around them is heading.",
    body: [
      "Whether you are buying an income-generating asset, leasing space for your business or selling a holding, we bring market intelligence to the decision.",
    ],
    listTitle: "How we help with commercial property",
    list: [
      "Office, retail and leased-asset opportunities across Bengaluru",
      "Rental yield and appreciation assessment",
      "Due diligence across legal, technical and financial checks",
    ],
    closer: "A strategic commercial investment should still make sense years from now.",
    cta: "Discuss a commercial brief",
  },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

/** The three asset classes the firm covers. */
export const verticals = [
  {
    title: "Residential",
    body: "Homes to live in and homes to let. Apartments, villas, villaments, row houses, townships and plots, across Bengaluru.",
  },
  {
    title: "Commercial",
    body: "Office, retail and leased assets, judged on the yield, the quality of the tenant, and whether the micro-market around it is going anywhere.",
  },
  {
    title: "Land",
    body: "Land acquisition and managed farmland. Title and approvals get checked, and so does the infrastructure timeline, because that is usually what a parcel is really worth.",
  },
];

/** "What Sets Us Apart", verbatim from the about page. */
export const pillars = [
  {
    title: "End-to-end real estate advisory",
    body: "From property discovery and evaluation to negotiation and closure, we manage the entire journey seamlessly.",
  },
  {
    title: "Documentation & legal assistance",
    body: "We support clients through documentation, compliance, and legal advisory, ensuring secure and hassle-free transactions.",
  },
  {
    title: "Financial structuring & loan support",
    body: "Our team assists with financial planning and loan structuring, helping clients make informed and optimized funding decisions.",
  },
  {
    title: "One-stop-shop experience",
    body: "Through partnerships with leading interior design firms, we extend our services beyond transactions — helping clients transform properties into functional, beautiful spaces.",
  },
];

/** Capability list from the firm's own collateral. */
export const capabilities = [
  "Strategic real estate advisory",
  "Residential property consulting",
  "Commercial property advisory",
  "Land acquisition & investment advisory",
  "Buy · Sell · Rent solutions",
  "Investor-focused property strategy",
  "End-to-end transaction support",
  "Market intelligence & location analytics",
  "Transparent, client-first advisory",
  "Portfolio growth & asset optimisation",
];

/**
 * The engagement, drawn from how the firm describes it: "From understanding your
 * needs and shortlisting the right options to site visits, negotiations, and
 * final paperwork", through to possession.
 */
export const journey = [
  { title: "Your brief", note: "Budget, location, timing, and what the place has to do for you." },
  { title: "Shortlist", note: "Options measured against that brief." },
  { title: "Site visits", note: "The trade-offs of each, said out loud." },
  { title: "Negotiation", note: "Terms worked out on your behalf." },
  { title: "Paperwork", note: "Documentation, legal and loan support." },
  { title: "Keys", note: "Right through to possession." },
];
