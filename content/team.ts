/**
 * The White Cloud Realty team, for the Meet the team page.
 *
 * Names are the people the firm lists and tags as its team on its LinkedIn
 * company page (linkedin.com/company/white-cloud-realty). Only the founder's
 * title is published anywhere, so:
 *
 * TODO: confirm the roster and each person's title with the client, then fill
 * `role`. A null role is simply not shown.
 *
 * TODO: team photos are to follow. Drop each one in public/images/team/ (a
 * 4:5 portrait crop, ~900px wide, .jpg or .webp) and set `photo` to its path.
 * Until then the card shows the person's initials in the logo's disc.
 */

export type TeamMember = {
  name: string;
  role: string | null;
  photo: string | null;
  /** Optional one- or two-line introduction, supplied by the person. */
  bio?: string;
};

export const founder: TeamMember = {
  name: "Sayanti Majumdar",
  role: "Founder",
  photo: "/images/founder-portrait.jpg",
  bio: "Sayanti built White Cloud Realty on two principles: meaningful connections and value that lasts. Years across sales, marketing, business development and strategic growth now shape how every client brief is handled.",
};

export const team: TeamMember[] = [
  { name: "Urvashi Choudhury", role: null, photo: null },
  { name: "Nandita Sengupta", role: null, photo: null },
  { name: "Rahul Gowda YS", role: null, photo: null },
  { name: "Suraj C J", role: null, photo: null },
  { name: "Akash Kolkur", role: null, photo: null },
];

/** "Urvashi Choudhury" → "UC"; "Suraj C J" → "SC". */
export function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[1][0] : "";
  return (first + second).toUpperCase();
}
