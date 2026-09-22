/**
 * Articles for /insights.
 *
 * TODO: empty by design. The current site publishes no articles, so rather
 * than seeding the section with copy the firm never wrote, /insights ships
 * as a corridor guide built from content/localities.ts, and this list drives
 * an "Articles" block that only appears once there is something real in it.
 *
 * To publish: add an entry here, then create the matching MDX/TSX page under
 * app/insights/. Keep `date` as an ISO string — it is used for sorting and
 * for the dateline.
 */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  tag: string;
};

export const articles: Article[] = [];

export const hasArticles = articles.length > 0;
