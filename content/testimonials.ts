/**
 * Client testimonials.
 *
 * The previous site published these as flat screenshots of LinkedIn
 * recommendations (WCR 1–6.PNG), which meant no search engine could read
 * them, no screen reader could announce them, and they could not reflow on a
 * phone. They are transcribed here verbatim instead.
 *
 * `relationship` is how LinkedIn describes the connection and is worth
 * keeping — "was Sayanti's client" carries more weight than an unlabelled
 * quote. `date` is the recommendation date as shown on LinkedIn.
 */

export type Testimonial = {
  name: string;
  role: string;
  company?: string;
  /** e.g. "Client", "Managed Sayanti directly". */
  relationship: string;
  date: string;
  /** One string per paragraph. */
  quote: string[];
  /** Pulled out as the headline of the card. Must appear inside `quote`. */
  highlight?: string;
  /** Set to true for the long-form recommendation given the featured slot. */
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Maria Rajesh",
    role: "Chief Human Resources Officer",
    company: "Embassy Developments Limited",
    relationship: "Client",
    date: "2026-03-11",
    highlight:
      "She approaches business not merely as transactions, but as relationships built on trust, insight, and long-term value.",
    quote: [
      "I have had the opportunity to know and interact with Sayanti Majumdar firsthand, and what stands out immediately is her natural ability to put people at ease while building meaningful, lasting connections.",
      "Sayanti brings with her a blend of commercial sharpness and genuine relationship-building. Over the years, she has built an impressive career across hospitality, banking, and real estate consistently taking on roles that demand strategic thinking, business development expertise, and strong people leadership. What truly differentiates her is that she approaches business not merely as transactions, but as relationships built on trust, insight, and long-term value.",
      "She has a natural flair for understanding people, reading situations, and bringing clarity to conversations. Whether engaging with clients, partners, or teams, Sayanti’s style is thoughtful, confident, and authentic. It is this quality that enables her to move beyond traditional business interactions and create partnerships that are both productive and enduring.",
      "Her entrepreneurial venture, White Cloud Realty, feels like a natural extension of these strengths combining her market understanding with a service-driven approach to real estate advisory.",
      "I have always admired Sayanti’s ability to combine warmth with professionalism and strategy with intuition. Anyone who works with her will quickly recognize that she brings not just business capability, but also a strong human connection that makes collaboration both easy and impactful.",
      "I wish her continued success as she builds and grows White Cloud Realty.",
    ],
    featured: true,
  },
  {
    name: "Zafar Baig",
    role: "Engineer | Entrepreneur",
    relationship: "Client",
    date: "2026-02-11",
    highlight: "She remains my go-to person for real estate in Bangalore.",
    quote: [
      "I had the pleasure of being Sayanti’s client at Bhartiya City, and working with her was a truly remarkable experience. She played a key role in ensuring my residence met the international standards expected of a luxury brand, bringing a strong investor-minded approach throughout.",
      "Her friendly, people-centric style, attention to detail, strategic know-how, and deep understanding of the luxury real estate segment uniquely set her apart. In any real estate transaction, trust and genuine care matter most—and Sayanti brings both in abundance. She remains my go-to person for real estate in Bangalore.",
    ],
  },
  {
    name: "Avi A.",
    role: "Researcher → Product Creator | 3 Successful Exits",
    relationship: "Client",
    date: "2026-02-05",
    highlight:
      "Not once did I feel I was being “sold” something. Every step was a conscious choice I could exercise or not.",
    quote: [
      "In a sector known for unscrupulous operators and low trust intermediaries; Sayanti stands out as an extremely trustworthy, courteous and responsive problem solver for real estate requirements. Sayanti helped me identify properties for my budget, provided alternatives and truly took the time and paid attention to listen to me. Not once did I feel I was being “sold” something. Every step was a conscious choice I could exercise or not.",
      "She went over and above helping me with post purchase support. With her impeccable service and attentive detail to my requirements, I felt like I hired a therapist, not a real estate consultant. I would highly recommend her to anybody looking for a soup to nuts 5-star service for real estate decisions.",
    ],
  },
  {
    name: "Jaideep Singh",
    role: "President & Head of Hospitality",
    company: "Bhartiya Urban Pvt. Ltd.",
    relationship: "Managed Sayanti directly",
    date: "2026-02-03",
    highlight:
      "Always making clients feel heard and valued, even in high-stakes negotiations.",
    quote: [
      "Sayanti worked with me during her tenure with Leela Residences, Bhartiya City, where she excelled as a Senior Sales Professional.",
      "What truly set her apart was her warm, friendly, and empathetic approach—always making clients feel heard and valued, even in high-stakes negotiations.",
      "She balanced genuine relationship-building with professional solution-oriented strategies, guiding clients to seamless sales. Even during uncertain economic downturns, her ability to anticipate needs and deliver tailored solutions kept our pipeline strong.",
    ],
  },
  {
    name: "Diwakar Goel",
    role: "Global Head of Data | CDO",
    company: "BlackRock",
    relationship: "Client",
    date: "2026-02-02",
    highlight:
      "The right balance of sales mixed with setting the right expectations to ensure long term client satisfaction.",
    quote: [
      "Sayanti has always been very professional and has the right balance of sales mixed with setting the right expectations to ensure long term client satisfaction and relationship. She is very responsive and always finds creative solutions to problems.",
    ],
  },
  {
    name: "Rajesh Pillai",
    role: "Founder & CEO",
    company: "Mama Home Pvt. Ltd.",
    relationship: "Client",
    date: "2026-02-01",
    highlight:
      "Her timely communication and commitment to quality made the engagement smooth and reliable.",
    quote: [
      "As a client, I had a very good experience working with Sayanti. She is professional, responsive, and clearly understands client requirements. Her timely communication and commitment to quality made the engagement smooth and reliable. I would confidently recommend her.",
    ],
  },
];

export const hasTestimonials = testimonials.length > 0;

export const featuredTestimonial = testimonials.find((t) => t.featured);
export const shortTestimonials = testimonials.filter((t) => !t.featured);

/** Initials for the avatar placeholder — no client headshots are published. */
export function initials(name: string): string {
  return name
    .replace(/[^A-Za-z\s.]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
