/**
 * The White Cloud Realty team, for the Meet the team page.
 *
 * The founders' details come from the firm's LinkedIn posts and Mahesh's
 * business card. Advisory team names are the people the firm tags as its team
 * on LinkedIn; only the founders' titles are published anywhere.
 *
 * TODO: the client is sending advisory team photos and contact numbers, and
 * should confirm each title. For a photo, drop a 4:5 portrait (~900px wide) in
 * public/images/team/ and set `photo`. Until then the card shows the person's
 * initials in the logo's disc. A null `role` is not shown, and a null `phone`
 * falls back to the firm's main number, so every card can still be called.
 */

export type TeamMember = {
  name: string;
  role: string | null;
  photo: string | null;
  phone: string | null;
  email?: string;
  linkedin?: string;
  /** Optional introduction. */
  bio?: string;
};

/** Side by side at the top of the page and in the home page's founder section. */
export const founders: TeamMember[] = [
  {
    name: "Sayanti Majumdar",
    role: "Founder",
    photo: "/images/founder-portrait.jpg",
    phone: null,
    email: "connect@whitecloudrealty.in",
    linkedin: "https://www.linkedin.com/in/sayantimajumdar/",
    bio: "Sayanti founded White Cloud Realty around a simple idea: property decisions should be led by clarity and context, never pressure. Years across sales, marketing, business development and strategic growth shape how every client brief is handled.",
  },
  {
    name: "Mahesh Sham Wadhwa",
    role: "Co-Founder & Managing Director",
    photo: "/images/team/mahesh-sham-wadhwa.jpg",
    phone: "+91 98868 98882",
    email: "msw@whitecloudrealty.in",
    linkedin: "https://www.linkedin.com/in/maheshswadhwa/",
    bio: "An entrepreneur with deep experience across Bengaluru’s real estate ecosystem, Mahesh spent years building Cityscape and working closely with developers across projects, mandates, strategy and sales. That developer-side perspective now sits alongside the firm’s client-first advisory.",
  },
];

export const team: TeamMember[] = [
  { name: "Urvashi Choudhury", role: null, photo: null, phone: null },
  { name: "Nandita Sengupta", role: null, photo: null, phone: null },
  { name: "Rahul Gowda YS", role: null, photo: null, phone: null },
  { name: "Suraj C J", role: null, photo: null, phone: null },
  { name: "Akash Kolkur", role: null, photo: null, phone: null },
];

/** "Urvashi Choudhury" → "UC"; "Suraj C J" → "SC". */
export function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[1][0] : "";
  return (first + second).toUpperCase();
}

/** "+91 98868 98882" → "tel:+919886898882". */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
