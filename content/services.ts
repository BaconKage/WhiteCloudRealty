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

/** The three intent-led paths, from the three home-page sections. */
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
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

/** The three asset classes the firm covers. */
export const verticals = [
  {
    title: "Residential",
    body: "Homes to live in and homes to let. Apartments, villas, row houses, townships, across the North Bengaluru corridor.",
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
 * The engagement, drawn from how the home-page copy already describes it:
 * "From understanding your needs and shortlisting the right options to site
 * visits, negotiations, and final paperwork."
 */
export const buyerRoute = [
  {
    step: "01",
    title: "Understand",
    body: "We start with your brief. Budget, location, when you need it by, and what the place actually has to do for you.",
  },
  {
    step: "02",
    title: "Shortlist & visit",
    body: "A short list measured against that brief, then site visits. You hear the trade-offs on each one, including the ones that count against it.",
  },
  {
    step: "03",
    title: "Negotiate & close",
    body: "Negotiation, documentation, legal and loan support, right through to the final paperwork and possession.",
  },
];
