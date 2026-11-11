/**
 * The founder's letter, as it stands on Sayanti's LinkedIn profile, with light
 * punctuation and grammar fixes. It now speaks for all of Bengaluru.
 */

export const founderLetter = {
  eyebrow: "From the founder’s desk",
  greeting: "Welcome!",
  /** Used as the large pull-quote in the spread. */
  pullQuote: "Not just transactions, but informed decisions.",
  paragraphs: [
    "I’m Sayanti Majumdar, and it’s both an honour and a thrill to share the vision behind what we’re building at White Cloud Realty - a real estate advisory services firm rooted in conviction, clarity, and a deep belief in the transformative potential of Bengaluru’s real estate ecosystem.",
    "My professional journey has been defined by two guiding principles: building meaningful connections and creating value that lasts. Working across sales, marketing, business development and strategic growth initiatives has taught me that at the heart of every strong decision lies purposeful insight and unshakable trust. This same mindset now drives our real estate advisory practice.",
    "At White Cloud Realty, we are dedicated to delivering not just transactions, but informed decisions. We partner with our clients, listen to their aspirations, and guide them with curated investment options and clarity - driven by data, grounded in real-world insights, and shaped by integrity.",
    "Thank you for being part of this journey. We look forward to helping you discover spaces that are meaningful, rewarding, and future-focused.",
  ],
  signOff: "Warm regards,",
  name: "Sayanti Majumdar",
  role: "Founder, White Cloud Realty",
};

/** About-page intro, verbatim from whitecloudrealty.in/about-us. */
export const aboutIntro = {
  lede:
    "We are a Strategic Real Estate Advisory firm committed to helping individuals, families, and businesses navigate the property landscape with clarity, confidence, and long-term value.",
  paragraphs: [
    "At White Cloud Realty, we specialize in Residential, Commercial, and Land Real Estate, offering end-to-end support for Buy · Sell · Rent requirements. Whether it’s a dream home, an income-generating asset, or a strategic commercial investment, we deliver solutions rooted in market intelligence, transparency, and client-first thinking.",
    "Our purpose is simple: to simplify real estate decisions and create value at every stage of the property life cycle. We don’t just close deals - we build trust, deliver insight, and create lasting relationships.",
  ],
  openTo: "Open to collaborations, partnerships, and new opportunities.",
};

/** The firm's own introduction, from its "Welcome to White Cloud Realty" slide. */
export const welcome = {
  eyebrow: "Welcome to White Cloud Realty",
  closer:
    "Whether it’s a dream home, an income-generating asset, or a strategic commercial investment, we deliver solutions rooted in market intelligence, transparency, and client-first thinking.",
  verticals: ["Residential Real Estate", "Commercial Real Estate", "Land Advisory"],
  intents: ["Buy", "Sell", "Rent"],
};

/**
 * White Cloud Realty 2.0, in the firm's own words: the lines come from its
 * October 2026 LinkedIn and Instagram announcements.
 */
export const ethos = {
  eyebrow: "White Cloud Realty 2.0",
  title: "Two perspectives. One shared vision.",
  lede: "White Cloud Realty was built by Sayanti Majumdar from the client’s side of the table, with homebuyers and investors at the centre of every decision. Mahesh Wadhwa spent years on the developer’s side, building Cityscape. Now those two worlds come together, in an advisory that understands both sides of the market.",
  pairs: [
    { from: "Developer insight", to: "client-first advisory" },
    { from: "Market intelligence", to: "execution" },
    { from: "Relationships", to: "opportunity" },
  ],
  people: "White Cloud has always been about people.",
  /** Client first: it sits above Sayanti, the developer's side above Mahesh. */
  sides: [
    { title: "The client’s side", points: ["Homebuyers and investors", "The right opportunities", "Beyond the transaction"] },
    { title: "The developer’s side", points: ["Projects and mandates", "Market insight", "Developer relationships"] },
  ],
  /** Each founder in their own words, from their LinkedIn posts and profile. */
  voices: [
    {
      quote:
        "Mahesh and I come from different sides of real estate. We think differently, challenge each other, and bring very different strengths to the table.",
      name: "Sayanti Majumdar",
    },
    {
      quote:
        "Cityscape shaped my understanding of the developer side of real estate. White Cloud Realty allows me to bring that perspective closer to the client.",
      name: "Mahesh Sham Wadhwa",
    },
  ],
};
