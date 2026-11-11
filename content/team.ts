/**
 * The White Cloud Realty team, for the Meet the team page.
 *
 * Names, photos and numbers as the client sent them on 5 November 2026, in the
 * order she asked for. Photos are cropped to head and shoulders, as she asked.
 *
 * TODO: job titles have not been supplied yet; a null `role` is not shown.
 * Surnames for Manoj, Francis, Rajkumar and Rachan are still to come.
 */

export type TeamMember = {
  name: string;
  role: string | null;
  photo: string | null;
  phone: string | null;
  email?: string;
  linkedin?: string;
  /** A sentence for the home page. */
  intro?: string;
  /** The fuller introduction on Meet the team. */
  bio?: string;
};

/** Side by side at the top of the page and in the home page's founder section. */
export const founders: TeamMember[] = [
  {
    name: "Sayanti Majumdar",
    role: "Founder",
    photo: "/images/founder-portrait.jpg",
    phone: "+91 96869 87757",
    email: "sayanti@whitecloudrealty.in",
    linkedin: "https://www.linkedin.com/in/sayantimajumdar/",
    intro: "Sayanti founded White Cloud Realty with the belief that property decisions should feel confident, not confusing, and curates options that match each client’s brief with honesty and precision.",
    bio: "Sayanti founded White Cloud Realty with the belief that property decisions should feel confident, not confusing. She works closely with clients to understand what they are truly optimising for (home, lifestyle, returns, timing), then curates options that match the brief with honesty and precision, blending research, on-ground insight and a strong service mindset.",
  },
  {
    name: "Mahesh Sham Wadhwa",
    role: "Co-Founder & Managing Director",
    photo: "/images/team/mahesh-sham-wadhwa.jpg",
    phone: "+91 98868 98882",
    email: "msw@whitecloudrealty.in",
    linkedin: "https://www.linkedin.com/in/maheshswadhwa/",
    intro: "Mahesh brings the developer’s side of the table: years building Cityscape Consulting, working with developers on exclusive mandates, project positioning and sales.",
    bio: "A real estate entrepreneur and the founder of Cityscape Consulting, Mahesh has worked closely with developers on exclusive mandates, project positioning, go-to-market strategy, sales execution and revenue growth. At White Cloud Realty he is building a sharper, more informed advisory platform across residential real estate, curated investment opportunities, strategic developer partnerships and end-to-end client advisory.",
  },
];

export const team: TeamMember[] = [
  { name: "Manoj", role: null, photo: "/images/team/manoj.jpg", phone: "+91 93802 18123" },
  { name: "Urvashi", role: null, photo: "/images/team/urvashi-choudhury.jpg", phone: "+91 70263 54041" },
  { name: "Francis", role: null, photo: "/images/team/francis.jpg", phone: "+91 83102 47436" },
  { name: "Suraj", role: null, photo: "/images/team/suraj-c-j.jpg", phone: "+91 70191 43040" },
  { name: "Nandita", role: null, photo: "/images/team/nandita-sengupta.jpg", phone: "+91 84203 60233" },
  { name: "Rajkumar", role: null, photo: "/images/team/rajkumar.jpg", phone: "+91 78297 81138" },
  { name: "Akash", role: null, photo: "/images/team/akash-kolkur.jpg", phone: "+91 63611 93703" },
  { name: "Rachan", role: null, photo: "/images/team/rachan.jpg", phone: "+91 91485 71033" },
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
