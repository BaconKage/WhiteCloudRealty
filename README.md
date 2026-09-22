# White Cloud Realty

A rebuild of [whitecloudrealty.in](https://www.whitecloudrealty.in) — a strategic real estate
advisory firm working the North Bengaluru airport corridor.

The previous site ran on GoDaddy Website Builder. All of its copy is carried over here; what
changed is the structure: projects are now comparable inventory rather than paragraphs, the
North Bengaluru corridor is the spine of the brand, and the founder's letter has room to breathe.

- **Stack** — Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · static export
- **Content** — typed modules in `content/`, no CMS
- **Forms** — Web3Forms, no backend

---

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Static export into `out/` |
| `npm run serve` | Serve the built `out/` locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next's linter |
| `npm run fetch-assets` | Re-download imagery from the old site's CDN (already done) |
| `npm run prep-images` | Trim/resize/re-encode those downloads (already done) |
| `npm run prep-logo <file>` | Rebuild the two wordmark colourways from a source logo |
| `npm run make-brand` | Regenerate the favicon set and the Open Graph card |

> Stop `npm run dev` before running `npm run build` — both write to `.next`, and running them
> at once leaves the dev server serving a half-replaced bundle.

---

## Editing content

Everything the site says lives in `content/`. No component changes are needed to update any of it.

| File | Holds |
| --- | --- |
| `site.ts` | Name, phone, email, WhatsApp, navigation, footer, legal disclaimer |
| `projects.ts` | The project portfolio |
| `localities.ts` | The North Bengaluru corridor and its map coordinates |
| `services.ts` | Buy / Invest / Sell, the capability list, the three-step journey |
| `founder.ts` | The founder's letter and the About intro |
| `partners.ts` | Developer logos |
| `testimonials.ts` | Client recommendations, transcribed from LinkedIn |
| `faqs.ts` | Contact-page FAQs |
| `insights.ts` | Articles — **currently empty** |

### Adding a project

Add an object to the `projects` array in `content/projects.ts` and drop its image in
`public/images/projects/`. The type tells you what each field is for; anything you do not have
yet stays `null` and that row simply does not render. A new entry automatically appears in the
grid, the filters, the comparison table, the sitemap, and gets its own page at
`/projects/<slug>`.

---

## Things that still need real information

These are marked `TODO` in the content files. Nothing is invented to fill them — sections that
have no data hide themselves rather than showing placeholder text.

| What | Where | Why it matters |
| --- | --- | --- |
| **Price, BHK config, area, possession** for all six projects | `content/projects.ts` | The card and comparison layouts are built around these. Without them a card falls back to name and blurb, which is what the old site did. |
| **Office address** | `site.contact.address` | Not published anywhere currently. Adding it fills the footer, the contact page and the `address` field of the structured data. |
| **RERA numbers** | `site.agentRera`, `project.rera` | Indian property listings are expected to carry the agent's registration and each project's. The advisory disclaimer ships regardless. |
| **Higher-resolution project images** | `public/images/projects/` | Several came off the old site small (Avillion is 300px wide). They upscale acceptably in cards but will look soft on a detail page. |

### The wordmark

Two files ship, both generated from the supplied artwork by `scripts/prep-brand-logo.mjs`:

- `wordmark-on-dark.png` — the artwork as supplied, for ink panels
- `wordmark-on-light.png` — the same mark with only the gold deepened, for the cream page
  background, where the original pale gold all but disappears

`components/layout/Logo.tsx` renders both and CSS picks between them from `.on-ink` and the
active theme, so there is no swap flicker and no JavaScript involved. To regenerate after a
brand refresh:

```bash
npm run prep-logo path/to/new-logo.png
npm run make-brand
```

### Testimonials

The old site published its recommendations as flat screenshots (`WCR 1–6.PNG`) — unreadable to
search engines and screen readers, and unable to reflow on a phone. All six are transcribed
verbatim into `content/testimonials.ts`, with each recommender's role, the LinkedIn relationship
("was Sayanti's client") and the date. The longest runs as a featured quote; the rest are cards
whose full text sits behind a disclosure.

### A note on imagery

Project renders and developer logos were downloaded from the old site and are the property of
the respective developers. That is normal for an authorised channel partner, but worth replacing
with licensed or own photography where you can. The two marketing flyers from the old site are
kept in `design/legacy-collateral/` for reference — they are not shipped with the site.

---

## Enquiry forms

Forms post to [Web3Forms](https://web3forms.com), which needs no backend of its own.

1. Enter the inbox address at web3forms.com; they email you an access key.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. Restart the dev server.

**Without a key the forms do not silently fail.** They render a WhatsApp and email block
instead, so an enquiry always has somewhere to go. That is the current state of this repo.

---

## Deploying

The build is a plain static export — `out/` contains everything, no Node runtime required.

```bash
npm run build
```

**Vercel** — import the repo, framework preset "Next.js", add `NEXT_PUBLIC_WEB3FORMS_KEY` and
`NEXT_PUBLIC_SITE_URL` as environment variables. `vercel.json` already carries the redirects
from the old URLs.

**Netlify / Cloudflare Pages** — build command `npm run build`, publish directory `out`.
`public/_redirects` carries the same redirects.

**Any static host** — upload the contents of `out/`, then configure these redirects yourself:

| Old URL | New URL |
| --- | --- |
| `/about-us` | `/about` |
| `/connect` | `/contact` |
| `/testimonials` | `/about#testimonials` |

### DNS cutover

GoDaddy Website Builder cannot host custom code, so going live means moving hosting:

1. Deploy and check the preview URL end to end.
2. Add `whitecloudrealty.in` and `www.whitecloudrealty.in` as custom domains on the new host.
3. Update the DNS records at GoDaddy to the values that host gives you.
4. Leave the builder site published until DNS has propagated — it stays live and untouched
   until the records change, so there is no window where the domain serves nothing.
5. Confirm HTTPS, then submit `https://www.whitecloudrealty.in/sitemap.xml` in Search Console.

---

## Conventions worth knowing

- **Theming.** Colours are semantic CSS custom properties (`--color-fg`, `--color-surface`, …)
  re-declared per theme in `app/globals.css`. They are *re-declared*, never aliased through a
  second variable — `var()` resolves where a property is declared, so an alias would freeze to
  the `:root` value and break the dark theme and the `.on-ink` panels.
- **`.on-ink`.** Put this on any panel painted brand-ink and everything inside it flips to the
  dark-surface palette automatically, in either theme. Every page's hero uses it, which is also
  what lets the sticky header sit transparently over the top of the page.
- **Motion.** Reveal-on-scroll is CSS plus a small IntersectionObserver hook (`lib/useReveal.ts`).
  Elements are visible by default and only hidden inside a `prefers-reduced-motion: no-preference`
  block, so reduced-motion users and anyone without JavaScript see the finished layout immediately.
- **Formatting.** Prices are written in crore and lakh via `lib/format.ts`, not `Intl` currency —
  `₹2.45 Cr`, not `₹24,500,000`.
- **State, not DOM writes.** `Reveal` and the other scroll-driven pieces return React state
  rather than setting attributes on the node from an effect. React renders `data-reveal`, so
  mutating it directly makes the DOM disagree with React's tree and throws a hydration mismatch
  on the next render — worth remembering if you add more scroll effects.

## Motion

Interaction is CSS-first — hover states, the marquee and the disclosures are pure CSS, and the
only JavaScript is four small hooks (`useReveal`, `useInView`, `useCountUp`, and the hero's
parallax). Roughly what moves:

| Where | What |
| --- | --- |
| Hero | Backdrop parallax, headline rising out of a mask, staggered entrance |
| Header | Nav underlines growing from the centre, transparent-to-solid transition |
| Stats | Figures counting up on first view — every number counted from the content files |
| Corridor map | Route drawing itself on first view, pulsing marker on the selected locality |
| Cards | Lift, image push-in, a gold rule sweeping the top edge |
| Partners | Logo marquee, pausing on hover, colour restoring per logo |
| Testimonials | Expand and collapse via a grid-rows transition, so nothing is clipped at any width |

All of it sits behind `prefers-reduced-motion`. Under `reduce` the hooks skip to their end
state, parallax never attaches, and `globals.css` collapses every animation and transition.

## Accessibility

Checked during the build, worth re-checking after content changes: WCAG AA contrast in both
themes, one `h1` per page with no heading-level jumps, visible focus rings, ≥24px tap targets,
keyboard-operable filters, comparison drawer and mobile menu (Escape closes), labelled form
controls with errors tied via `aria-describedby`, and no horizontal scroll from 360px up.
