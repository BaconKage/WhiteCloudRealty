/**
 * Articles for /insights, rendered by app/insights/[slug]/page.tsx.
 *
 * To publish: add an entry here. Keep `date` as an ISO string; it is used for
 * sorting and for the dateline. Stick to facts that can be checked, and leave
 * out prices, which go stale and which published sources disagree on.
 */

export type ArticleSection = {
  heading: string;
  /** A diagram to show after the text. */
  visual?: "metro";
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleMarket = {
  name: string;
  character: string;
  suits: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  tag: string;
  /** The zone on the location map this article covers. */
  localityId?: string;
  sections: ArticleSection[];
  marketsHeading?: string;
  markets?: ArticleMarket[];
  closing?: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "south-bangalore",
    title: "South Bangalore, explained",
    excerpt:
      "The city's most settled residential belt: what it covers, how it connects, where each micro-market fits, and what to check before you buy, sell or rent here.",
    date: "2026-10-31",
    readingMinutes: 5,
    tag: "Location guide",
    localityId: "south",
    sections: [
      {
        heading: "What we mean by South Bangalore",
        paragraphs: [
          "There is no official boundary, so here is how we draw it. South Bangalore runs from Jayanagar and JP Nagar down through Banashankari, Uttarahalli and Hulimavu, with Bannerghatta Road and Kanakapura Road carrying the city further south.",
          "Koramangala, HSR Layout and Electronic City often get included too. We treat those as South East, because buyers tend to weigh them against Sarjapur Road and the Outer Ring Road rather than against Jayanagar.",
        ],
      },
      {
        heading: "Why people choose it",
        paragraphs: [
          "Mostly because so much is already in place. Jayanagar, whose foundation was laid in 1948, was one of the first planned neighbourhoods in the city, and the layouts around it have had decades to fill in with schools, hospitals, parks and shopping streets. You are buying into a neighbourhood that already works, not one that is promised.",
          "It is also greener than people expect. Lalbagh sits at the northern edge, and Turahalli forest and Bannerghatta National Park lie further out.",
          "The trade-off is land. The established layouts have very little of it left, so what you find there is mostly resale and redevelopment. Most new apartment supply has moved outwards, onto Bannerghatta Road and Kanakapura Road.",
        ],
      },
      {
        heading: "How it connects",
        visual: "metro",
        paragraphs: [
          "South Bangalore's position has improved a lot with the metro, though the roads still decide many daily commutes.",
        ],
        bullets: [
          "Green Line: runs through Jayanagar, JP Nagar and Banashankari, then along Kanakapura Road to Silk Institute, and north through the city centre.",
          "Yellow Line: opened in August 2025 from RV Road through Jayadeva Hospital, BTM Layout and Silk Board to Electronic City and Bommasandra.",
          "Pink Line: being built from Kalena Agrahara on Bannerghatta Road north to Nagawara, and opening in phases. Check the current status before you rely on it.",
          "NICE Road: the peripheral road links Hosur Road, Bannerghatta Road, Kanakapura Road and Mysuru Road, which helps when you are crossing the south without going through the city.",
        ],
      },
    ],
    marketsHeading: "The micro-markets",
    markets: [
      {
        name: "Jayanagar",
        character: "Planned, tree-lined and long established. Mostly resale and redevelopment.",
        suits: "End users who want a settled neighbourhood",
      },
      {
        name: "JP Nagar",
        character: "A large phased layout between Bannerghatta Road and Kanakapura Road, with Green Line access.",
        suits: "Families who want metro access and established schools",
      },
      {
        name: "Banashankari",
        character: "One of the city's largest localities, stretching from Mysuru Road to Kanakapura Road, on the Green Line.",
        suits: "Buyers comparing a wide range of older and newer homes",
      },
      {
        name: "Uttarahalli",
        character: "Further out and quieter, between Kanakapura Road and Mysuru Road, with independent homes and apartments.",
        suits: "Buyers trading a little distance for more space",
      },
      {
        name: "Hulimavu & Bannerghatta Road",
        character: "Apartment-led, with hospitals and offices along the road and the Pink Line being built alongside it.",
        suits: "Professionals working along the road, and rental investors",
      },
      {
        name: "Kanakapura Road",
        character: "A developing corridor with newer apartments and townships along the Green Line, getting greener as it goes south.",
        suits: "Buyers who want a newer home close to the metro",
      },
    ],
    closing: [
      {
        heading: "Buying, selling or renting here",
        paragraphs: [],
        bullets: [
          "Buying: decide early between resale in an established layout and a newer project further out. They answer different briefs, and comparing them only on price misses the point.",
          "Selling: location and condition carry older homes, so positioning matters more than a headline number. We help you work out who the right buyer is before you list.",
          "Renting: distance to a metro station and to the workplace usually drives demand, so check both on a map before you settle on a rent or a building.",
          "Commercial and land: high-street retail, leased assets and land parcels each need their own checks. Title and approvals come first, whatever the asset.",
        ],
      },
      {
        heading: "What to check before you commit",
        paragraphs: [],
        bullets: [
          "The khata. Know whether the property has an A or a B khata and what that means for loans and resale.",
          "RERA registration for new projects, on the Karnataka RERA portal.",
          "Water supply. Ask whether the building relies on Cauvery water, borewells or tankers.",
          "The commute at peak hours. Do the drive yourself, especially around Silk Board and along Bannerghatta Road.",
          "The real walk to the metro, not the straight-line distance in the brochure.",
        ],
      },
    ],
  },
];

export const hasArticles = articles.length > 0;

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
