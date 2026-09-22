/**
 * FAQs, written only from what the firm already states publicly about its
 * services. Nothing here asserts a fee, a response time, a geography or a
 * service that is not already claimed on the site or in the firm's own
 * collateral — add those once confirmed.
 */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Which areas do you cover?",
    answer:
      "North Bengaluru, mainly. Hebbal and Yelahanka, Hennur and Thanisandra, the KIADB Aerospace Park and Bagalur, the NH-44 airport stretch, Devanahalli and Sadahalli. It's the corridor we know street by street.",
  },
  {
    question: "What kinds of property do you advise on?",
    answer:
      "Residential, commercial and land. That covers apartments, villas, row houses and townships; office, retail and leased commercial assets; and land acquisition, including managed farmland.",
  },
  {
    question: "Do you only handle purchases?",
    answer:
      "No. Buy, sell and rent. On the sell side that means valuing the asset, pricing it against the market, taking it to the right buyers, and then talking through what to do with the money afterwards.",
  },
  {
    question: "What happens after I get in touch?",
    answer:
      "We start with your brief. Budget, location, timeline, and what the property actually has to do for you. Then a shortlist, then site visits, with the trade-offs of each laid out plainly. Once you've chosen, we handle the negotiation, the documentation and the closing.",
  },
  {
    question: "Can you help with documentation and home loans?",
    answer:
      "Yes. We support clients through documentation, compliance and legal advisory, and we assist with financial planning and loan structuring so funding decisions get made with the full picture in view.",
  },
  {
    question: "How do I reach you?",
    answer:
      "WhatsApp is quickest. Email works too, and the number on this page is a real one.",
  },
];
