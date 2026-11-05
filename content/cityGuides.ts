import type { Article, ArticleSection } from "./insights";

/**
 * Guides for the rest of Bengaluru, alongside the South Bangalore guide in
 * content/insights.ts. Same rules: infrastructure facts that can be checked,
 * no prices, and metro lines still being built are described as such.
 */

const DATE = "2026-11-05";

/** The practical checks apply anywhere in the city. */
const checks: ArticleSection = {
  heading: "What to check before you commit",
  paragraphs: [],
  bullets: [
    "The khata. Know whether the property has an A or a B khata and what that means for loans and resale.",
    "RERA registration for new projects, on the Karnataka RERA portal.",
    "Water supply. Ask whether the building relies on Cauvery water, borewells or tankers.",
    "The commute at peak hours. Do the drive yourself rather than trusting a map at midnight.",
    "The real walk to the metro, not the straight-line distance in the brochure.",
  ],
};

function guide(
  zone: { id: string; name: string },
  excerpt: string,
  sections: ArticleSection[],
  markets: Article["markets"],
  buySellRent: string[],
): Article {
  return {
    slug: `${zone.id}-bangalore`,
    title: `${zone.name}, explained`,
    excerpt,
    date: DATE,
    readingMinutes: 4,
    tag: "Location guide",
    localityId: zone.id,
    sections,
    marketsHeading: "The micro-markets",
    markets,
    closing: [{ heading: "Buying, selling or renting here", paragraphs: [], bullets: buySellRent }, checks],
  };
}

export const cityGuides: Article[] = [
  guide(
    { id: "north", name: "North Bangalore" },
    "The airport side of the city: what it covers, how it connects, where each micro-market fits, and what to weigh before you buy, sell or rent here.",
    [
      {
        heading: "What we mean by North Bangalore",
        paragraphs: [
          "Everything from RT Nagar and Hebbal out along Bellary Road towards the airport: Sahakaranagar, Jakkur, Yelahanka, and across to Nagavara, Thanisandra and Hennur.",
          "Kempegowda International Airport sits at the far end. Much of the area’s growth has followed the road out to it.",
        ],
      },
      {
        heading: "Why people choose it",
        paragraphs: [
          "Two big pulls: the airport and Manyata Tech Park near Nagavara, one of the city’s largest office campuses. Both bring jobs, and with them steady demand for homes.",
          "Closer to the city, RT Nagar, Sahakaranagar and Hebbal are long settled. Further out, Thanisandra, Hennur and Yelahanka have more new apartments and larger plots, and the land gets more open beyond them.",
        ],
      },
      {
        heading: "How it connects",
        paragraphs: ["The north is organised around a few big roads, so where a home sits relative to them matters."],
        bullets: [
          "Bellary Road and NH-44: the main run from Hebbal to the airport, elevated for much of the way.",
          "Hebbal junction: where Bellary Road meets the Outer Ring Road. It links the north to the east and west of the city, and gets very busy at peak hours.",
          "Metro: the airport line is being built through Hebbal, and the Pink Line is being built to Nagawara. Check the current status before you rely on either.",
          "Yelahanka railway station serves the north directly.",
        ],
      },
    ],
    [
      { name: "Yelahanka", character: "An established satellite town with its own centre, close to the airport road.", suits: "Families who want space and an airport commute" },
      { name: "Hebbal", character: "Where Bellary Road meets the Outer Ring Road, around Hebbal Lake.", suits: "Commuters heading both into the city and out to the airport" },
      { name: "Thanisandra", character: "Fast-growing apartment area close to Manyata Tech Park.", suits: "Professionals working at Manyata" },
      { name: "Jakkur", character: "Between Hebbal and Yelahanka, near Jakkur Lake, with newer apartments.", suits: "Buyers who want greenery close to Bellary Road" },
      { name: "Hennur", character: "Residential growth along Hennur Road, heading out towards Bagalur.", suits: "Buyers looking at newer projects with room to grow" },
      { name: "Nagavara", character: "Around Manyata Tech Park, with the Pink Line being built to it.", suits: "Rental investors and Manyata employees" },
      { name: "Sahakaranagar", character: "An established, quieter layout just off Bellary Road.", suits: "End users who want a settled neighbourhood" },
      { name: "RT Nagar", character: "An older neighbourhood between the city centre and Hebbal.", suits: "Buyers who want to stay close to the centre" },
    ],
    [
      "Buying: decide how much the airport and Manyata matter to you. They pull in different directions, and the right micro-market follows from that.",
      "Selling: newer supply further out competes with resale, so positioning matters. We help you show what an established address offers.",
      "Renting: demand around Manyata Tech Park is steady, so commute time to the campus usually drives rents.",
      "Commercial and land: larger parcels further out need title, conversion and approvals checked first.",
    ],
  ),

  guide(
    { id: "north-east", name: "North East Bangalore" },
    "Settled layouts between the Outer Ring Road and Old Madras Road: what the area covers, how it connects, and what to weigh before you buy, sell or rent.",
    [
      {
        heading: "What we mean by North East Bangalore",
        paragraphs: [
          "The belt from HRBR Layout and Kalyan Nagar through Banaswadi and Horamavu to Ramamurthy Nagar and KR Puram, between the Outer Ring Road and Old Madras Road.",
        ],
      },
      {
        heading: "Why people choose it",
        paragraphs: [
          "It sits between two job centres: Manyata Tech Park to the north and the eastern tech corridor towards Whitefield. Many households here split their commutes both ways.",
          "Kalyan Nagar and HRBR Layout are well established, with a strong high-street and restaurant scene. Horamavu and Ramamurthy Nagar have more newer apartments.",
        ],
      },
      {
        heading: "How it connects",
        paragraphs: [],
        bullets: [
          "Outer Ring Road: runs through Kalyan Nagar towards Hebbal in one direction and KR Puram in the other.",
          "Old Madras Road: the main road east from the city.",
          "Purple Line: has a station at KR Puram, on the way between the city centre and Whitefield.",
          "Airport line: being built along the Outer Ring Road from KR Puram. Check the current status before you rely on it.",
          "KR Puram railway station is a major stop for trains heading east.",
        ],
      },
    ],
    [
      { name: "HRBR Layout", character: "Planned, established and central to the area’s high streets.", suits: "End users who want an established address" },
      { name: "Kalyan Nagar", character: "Busy, well-served neighbourhood right on the Outer Ring Road.", suits: "Families and professionals who like a lively area" },
      { name: "Banaswadi", character: "Older neighbourhood with good links towards the city centre.", suits: "Buyers who want to stay close to the centre" },
      { name: "Horamavu", character: "Apartment growth between the Outer Ring Road and the eastern suburbs.", suits: "Buyers looking for newer projects" },
      { name: "KR Puram", character: "A transport hub, with the metro, a railway station and Old Madras Road.", suits: "Commuters and rental investors" },
      { name: "Ramamurthy Nagar", character: "Residential area off Old Madras Road with mixed housing.", suits: "Buyers trading a little distance for value" },
    ],
    [
      "Buying: weigh which job centre matters most. The area works best for people who commute towards Manyata or Whitefield.",
      "Selling: established layouts here carry their own demand. We help you position the address and the condition of the home.",
      "Renting: transport links drive demand, so distance to the Outer Ring Road and KR Puram usually matters most.",
      "Commercial: high-street retail in Kalyan Nagar and HRBR Layout is its own market, and leases there need careful checks.",
    ],
  ),

  guide(
    { id: "east", name: "East Bangalore" },
    "From Indiranagar to Whitefield: what the east covers, how the Purple Line ties it together, and what to weigh before you buy, sell or rent here.",
    [
      {
        heading: "What we mean by East Bangalore",
        paragraphs: [
          "Indiranagar, Kodihalli and Old Airport Road close to the city, running out past HAL to Marathahalli, Whitefield and Varthur.",
        ],
      },
      {
        heading: "Why people choose it",
        paragraphs: [
          "Technology parks shaped this side of the city, with ITPL in Whitefield the best known. Employers brought homes, schools and malls with them.",
          "Indiranagar is one of the city’s most sought-after addresses. Whitefield and Varthur have far more new supply, from apartments to villas.",
        ],
      },
      {
        heading: "How it connects",
        paragraphs: [],
        bullets: [
          "Purple Line: runs from MG Road through Indiranagar and KR Puram to Whitefield (Kadugodi), connecting the east to the city centre.",
          "Old Airport Road: the main road from the centre past HAL towards Marathahalli.",
          "Outer Ring Road: crosses the area at Marathahalli, towards Bellandur and Sarjapur Road in the south.",
          "Whitefield railway station serves the far east.",
        ],
      },
    ],
    [
      { name: "Indiranagar", character: "Established, central and well served, with busy high streets.", suits: "End users who want a premium central address" },
      { name: "HAL", character: "Around HAL and Old Airport Road, with older layouts and defence housing.", suits: "Buyers who want space close to the centre" },
      { name: "Kodihalli", character: "Quiet, established pocket between Indiranagar and Old Airport Road.", suits: "Families who want a settled neighbourhood" },
      { name: "Old Airport Road", character: "A busy corridor with apartments and commercial space along it.", suits: "Professionals commuting east or into the city" },
      { name: "Whitefield", character: "A technology hub with ITPL, malls, schools and lots of apartment supply.", suits: "People working in Whitefield, and rental investors" },
      { name: "Marathahalli", character: "On the Outer Ring Road, close to several tech parks.", suits: "Tenants and investors near the office belt" },
      { name: "Varthur", character: "Growing area around Varthur Lake, with newer apartments and villas.", suits: "Buyers wanting newer homes at a little more distance" },
    ],
    [
      "Buying: in Whitefield and Varthur, compare projects carefully. There is a lot of choice, and builder track record matters.",
      "Selling: proximity to the Purple Line and the tech parks is what buyers ask about first, so we lead with it.",
      "Renting: demand follows the offices, so the commute to the right tech park sets the rent.",
      "Commercial: office and retail space near the tech parks is judged on tenants and occupancy.",
    ],
  ),

  guide(
    { id: "south-east", name: "South East Bangalore" },
    "Koramangala to Electronic City: what the south east covers, how it connects, and what to weigh before you buy, sell or rent in the city’s busiest office belt.",
    [
      {
        heading: "What we mean by South East Bangalore",
        paragraphs: [
          "Koramangala, BTM Layout and HSR Layout near the city, then Bellandur and Sarjapur Road along the Outer Ring Road, and Electronic City further down Hosur Road.",
        ],
      },
      {
        heading: "Why people choose it",
        paragraphs: [
          "It holds a large share of the city’s technology jobs, from the Outer Ring Road office parks around Bellandur to Electronic City. Koramangala and HSR Layout are known for start-ups.",
          "That makes it a strong rental market, and a lot of the demand for commercial space comes from here.",
        ],
      },
      {
        heading: "How it connects",
        paragraphs: [],
        bullets: [
          "Outer Ring Road: the office corridor through Bellandur and towards Marathahalli.",
          "Yellow Line: opened in August 2025 from RV Road through BTM Layout and Silk Board to Electronic City and Bommasandra.",
          "Hosur Road: the main road south to Electronic City.",
          "Silk Board junction: where Hosur Road meets the Outer Ring Road, and one of the city’s busiest junctions at peak hours.",
        ],
      },
    ],
    [
      { name: "Koramangala", character: "Established and central, known for start-ups, cafés and high streets.", suits: "Professionals who want to live close to work" },
      { name: "HSR Layout", character: "Planned layout with wide roads, popular with tech professionals.", suits: "Families and young professionals" },
      { name: "BTM Layout", character: "Dense, well-connected area on the Yellow Line.", suits: "Tenants and rental investors" },
      { name: "Bellandur", character: "Right on the Outer Ring Road office corridor.", suits: "People working along the Outer Ring Road" },
      { name: "Sarjapur Road", character: "A developing corridor with large apartment projects and schools.", suits: "Families wanting newer, larger homes" },
      { name: "Electronic City", character: "A major technology hub on Hosur Road, now on the Yellow Line.", suits: "People working in Electronic City, and investors" },
    ],
    [
      "Buying: check the commute at peak hours, especially around Silk Board and the Outer Ring Road.",
      "Selling: rental demand supports prices here, so a home that rents well is easier to position.",
      "Renting: one of the city’s strongest rental markets, driven by the office corridor.",
      "Commercial: office and retail demand is high, so yield and tenant quality decide the deal.",
    ],
  ),

  guide(
    { id: "west", name: "West Bangalore" },
    "From Rajajinagar to Kengeri: what the west covers, how the Purple and Green lines serve it, and what to weigh before you buy, sell or rent here.",
    [
      {
        heading: "What we mean by West Bangalore",
        paragraphs: [
          "Rajajinagar, Basaveshwaranagar and Vijayanagar near the city, out along Magadi Road and Mysore Road to Nagarbhavi and Kengeri.",
        ],
      },
      {
        heading: "Why people choose it",
        paragraphs: [
          "The west is home to some of the city’s older family neighbourhoods, with established schools, markets and temples. Many buyers here are moving within the area.",
          "Further out, Kengeri and the stretch along Mysore Road have more new apartments, with the Bengaluru–Mysuru highway beyond.",
        ],
      },
      {
        heading: "How it connects",
        paragraphs: [],
        bullets: [
          "Green Line: runs through Rajajinagar and Yeshwanthpur, and north-west towards Madavara.",
          "Purple Line: runs west along Mysore Road through Vijayanagar to Kengeri and Challaghatta.",
          "Mysore Road and the Bengaluru–Mysuru highway (NH 275): the main route south-west out of the city.",
          "NICE Road: links Mysore Road with Kanakapura Road and Hosur Road in the south, and with Tumakuru Road in the north.",
          "Peenya industrial area lies to the north-west, a major employment base.",
        ],
      },
    ],
    [
      { name: "Rajajinagar", character: "Planned, established and well connected, on the Green Line.", suits: "End users who want a settled neighbourhood" },
      { name: "Vijayanagar", character: "Busy residential area on the Purple Line.", suits: "Families who want metro access" },
      { name: "Basaveshwaranagar", character: "Quiet, established layout with independent homes.", suits: "Buyers looking for independent houses" },
      { name: "Magadi Road", character: "A corridor heading west, with mixed housing along it.", suits: "Buyers wanting value close to the centre" },
      { name: "Nagarbhavi", character: "Leafy residential area with larger plots.", suits: "Buyers wanting space and quieter streets" },
      { name: "Kengeri", character: "Growing area at the end of the Purple Line, near the Mysuru highway.", suits: "Buyers wanting newer homes and highway access" },
      { name: "Mysore Road", character: "A developing corridor with new apartment projects.", suits: "Buyers looking at newer projects" },
    ],
    [
      "Buying: decide between an established neighbourhood close in and newer supply further out along Mysore Road.",
      "Selling: older homes in established layouts often attract redevelopment interest as well as end users.",
      "Renting: metro access drives demand, so distance to a Purple or Green Line station matters.",
      "Land: plots further out need title and approvals checked before anything else.",
    ],
  ),

  guide(
    { id: "central", name: "Central Bangalore" },
    "The original business district: what Central Bangalore covers, why addresses here are scarce, and what to weigh before you buy, sell or rent.",
    [
      {
        heading: "What we mean by Central Bangalore",
        paragraphs: [
          "MG Road, Brigade Road, Residency Road, Commercial Street and Lavelle Road, around Cubbon Park at the heart of the city.",
        ],
      },
      {
        heading: "Why people choose it",
        paragraphs: [
          "Location. It is the city’s original business and shopping district, with Cubbon Park on its doorstep and everything else a short trip away.",
          "There is very little new residential supply, so homes here are scarce and premium. Much of the property is commercial: offices, retail and hospitality.",
        ],
      },
      {
        heading: "How it connects",
        paragraphs: [],
        bullets: [
          "Purple Line: runs along MG Road, east to Whitefield and west to Challaghatta.",
          "Majestic (Nadaprabhu Kempegowda station): the interchange with the Green Line, a short ride away.",
          "Central roads lead out to every part of the city, though traffic in the centre can be slow at peak hours.",
        ],
      },
    ],
    [
      { name: "MG Road", character: "The city’s best-known commercial street, on the Purple Line.", suits: "Commercial buyers and investors" },
      { name: "Brigade Road", character: "Busy retail and dining street off MG Road.", suits: "Retail investors" },
      { name: "Residency Road", character: "Offices, hotels and premium apartments.", suits: "Commercial and premium residential buyers" },
      { name: "Cubbon Park", character: "Premium homes near the city’s central park.", suits: "Buyers wanting a rare central address" },
      { name: "Commercial Street", character: "A long-established shopping street.", suits: "Retail investors" },
      { name: "Lavelle Road", character: "One of the city’s most premium residential addresses.", suits: "Luxury buyers" },
    ],
    [
      "Buying: supply is limited, so options come up rarely. We help you move quickly and check the paperwork when they do.",
      "Selling: scarcity works in your favour, and positioning to the right buyer matters more than a wide search.",
      "Renting: premium apartments and serviced homes here attract senior professionals and businesses.",
      "Commercial: office and retail space is the main market, judged on location, tenant and lease terms.",
    ],
  ),
];
