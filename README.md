# LBS KidZ

The website for LBS KidZ, a preschool brand under LBSKidZ Group Indore, built in partnership between
School Excellence Program Pvt. Ltd. and the Lal Bahadur Shastri Educational Society.

**Domain:** https://lbskidz.com

---

## Read these first

| File | What it is |
|---|---|
| [`docs/requirements-audit.md`](docs/requirements-audit.md) | Every requirement extracted from the eight source PDFs, with citations |
| [`docs/content-map.md`](docs/content-map.md) | Every piece of site content traced to its originating PDF, with provenance |
| [`docs/decisions-and-todos.md`](docs/decisions-and-todos.md) | Conflicts resolved (C-xx) and blocking open items (T-xx) |
| [`docs/final-pdf-compliance-audit.md`](docs/final-pdf-compliance-audit.md) | Requirement-by-requirement compliance table |

**The source PDFs are authoritative,** except where the client has explicitly overruled them. Every
such call is recorded as a numbered decision. The most consequential is
[C-04](docs/decisions-and-todos.md#c-04--illustration-versus-photography-revised-4-sep-2026-client-override):
the site now uses **real photography of early-years learning in India**, with a plain statement — in
the footer, on the homepage and on the sitemap — that none of it shows an LBS KidZ campus, child or
educator. Illustration stays, and now does only what it is better at than a camera: objects, motifs
and marks. People are photographed.

---

## Running it

```bash
npm install
npm run dev          # Vite dev server, http://localhost:5173
```

```bash
npm run build        # typecheck, bundle, generate sitemap.xml + robots.txt, prerender per-route <head>
npm run serve        # Express server over dist/, http://localhost:3000
```

`npm run serve` is the closest thing to production: it serves the prerendered per-route HTML and
handles the Register Interest endpoint. `npm run preview` serves the bundle without either.

**QA sweep** (needs a server already running):

```bash
node scripts/qa.mjs http://localhost:3000
```

Loads all 29 routes at 320, 390, 768, 1280 and 1920 px and reports console errors, page exceptions,
failed requests, horizontal overflow, `<h1>` count, missing titles and broken internal links. It then
runs a client-side navigation pass through the same routes in one long-lived page, scrolling into each
scroll-driven scene before leaving it, because loading routes fresh never exercises unmount, which is
where teardown bugs live.

**Zoom and layout audit** (needs a server already running):

```bash
node scripts/zoom-audit.mjs http://localhost:3000
```

Loads 18 routes at ten viewport/zoom combinations — 1440, 1280, 1024, 834, 768,
430, 390 and 375 px, at 100%, 110% and 125% browser zoom — and reports
horizontal overflow, content colliding with the fixed navbar, text clipped by a
non-scrolling ancestor, and controls under the 44px touch minimum. It also
reports the spread in page-header height, which should stay near 0.40vh.

Zoom is simulated the way Chrome does it: the CSS viewport shrinks while the
device pixel ratio rises. A CSS `transform: scale()` would pass while the real
thing broke, because media queries and `vh` units would not move.

**Zoom and layout audit** (needs a server already running):

```bash
node scripts/zoom-audit.mjs http://localhost:3000
```

Loads 18 routes at ten viewport/zoom combinations — 1440, 1280, 1024, 834, 768,
430, 390 and 375 px, at 100%, 110% and 125% browser zoom — and reports
horizontal overflow, content colliding with the fixed navbar, text clipped by a
non-scrolling ancestor, and controls under the 44px touch minimum. It also
reports the spread in page-header height, which should stay near 0.40vh.

Zoom is simulated the way Chrome does it: the CSS viewport shrinks while the
device pixel ratio rises. A CSS `transform: scale()` would pass while the real
thing broke, because media queries and `vh` units would not move.

**Contrast audit** (needs a server already running):

```bash
node scripts/contrast-audit.mjs http://localhost:3000
```

Measures every visible text node against the background actually painted behind it and fails on
anything under WCAG AA. Colours are recovered by compositing each sample over white and over black
rather than by parsing the computed string, because Tailwind v4 compiles opacity modifiers to
`color-mix()` and returns them as `oklab(...)`. Two cases it cannot resolve — the fixed navbar over a
hero, and text on a photograph's scrim — are reported separately for a human to check.

**Font metrics** (only when a typeface changes):

```bash
node scripts/font-metrics.mjs
```

Derives the `size-adjust` percentages for the metric-matched fallback faces at
the top of `src/styles/index.css`. Both webfaces load with `font-display: swap`,
so text paints in a system font and swaps; without a matched fallback that swap
reflowed the line and moved everything beside it, which was the largest layout
shift on the site.

**Photograph manifest** (after changing anything in `public/images/`):

```bash
node scripts/build-image-manifest.mjs
```

Regenerates [`src/data/media.ts`](src/data/media.ts) from what is on disk plus `image-credits.json`:
intrinsic dimensions, available widths, and each image's average colour, which `<Photo>` paints as the
loading ground so nothing flashes white. Never edit that file by hand.

---

## The phase switch

`SITE_PHASE` in [`src/data/site.ts`](src/data/site.ts) is the single switch between the two phases the
source documents define. It is currently `1`.

Setting it to `2` adds the School Life dropdown, the Admission Process page, Careers and Downloads,
relabels the CTA from "Register Interest" to "Enquire Now", switches Campuses from zone-level to
per-campus, adds zone links to the footer Explore block, and puts the Phase 2 routes into `sitemap.xml`.

No route, nav position or URL changes between phases — that is a requirement, not a convenience.
Every Phase 2 URL already exists and resolves today.

Before flipping it, close T-01, T-03 and the campus, educator, testimonial and gallery content items
in [`docs/decisions-and-todos.md`](docs/decisions-and-todos.md).

---

## Architecture

```
src/
├── animations/     GSAP hooks (reveal, parallax, float, scrub) and the components over them
├── components/
│   ├── art/        Illustration: motifs (primitives) and object drawings (objects)
│   ├── media/      Photo, ShapedPhoto, PhotoOnColour, PhotoFigure, ReservedPortrait
│   ├── forms/      Register Interest / enquiry form
│   └── ui/         Layout, Button, Card family (PhotoCard, ColourPanel, PersonCard,
│                   FeatureChip, StatTile, QuoteCard), Accordion, PageHeader,
│                   ContentImageSection, Notice
├── data/           Content and configuration. Every file cites its source PDF
├── hooks/          Reduced motion, media query, scroll state, scroll lock, dismissable
├── layouts/        SiteLayout, Navbar, Footer, Logo, nav tone context
├── lib/            Seo component, JSON-LD builders, cn
├── pages/          One file per route
├── sections/       Page sections, grouped by page
└── styles/         The design system, as Tailwind v4 @theme tokens
```

**`src/data/` is where content lives.** Editing copy should almost never mean editing a component.
Each data file carries the citation for the facts it holds, and marks anything the documents leave
pending rather than filling it in.

### Stack

React 19 · TypeScript · Vite 7 · Tailwind v4 · GSAP + ScrollTrigger ·
React Router 7 · lucide-react · Express 5

**One animation system.** GSAP owns everything tied to scroll position or a
timeline: the reveal engine, parallax and image scale, the horizontal
preschool-day scene, the drawn legacy timeline, the hero's opening sequence and
the ambient floats. Discrete UI state — a dropdown opening, an accordion panel —
is CSS, because `grid-template-rows: 0fr → 1fr` animates to a natural height
without measuring it and without a library. Framer Motion was removed once
nothing needed it, which took 135kB (45kB gzipped) out of every page.

Fonts are self-hosted via `@fontsource`: Fraunces (display), Plus Jakarta Sans (body),
Tiro Devanagari Hindi (Devanagari).

---

## SEO and AEO

Built to the Keyword & AEO Strategy, including its negative rules — Tier B/C policy keywords appear
**only** on the Curriculum page, Parenting Tips carries no policy keywords, and The LBS Way carries no
Tier A/B/C keywords at all.

- Per-route metadata lives in [`src/data/seo.ts`](src/data/seo.ts), read by both the app and the build.
- `scripts/prerender-head.mjs` writes a static HTML file per route with the real title, description,
  canonical, robots, Open Graph, Twitter and JSON-LD already in the markup, plus a `<noscript>`
  summary. Crawlers and AI answer engines get correct metadata without executing JavaScript.
- `scripts/generate-sitemap.mjs` writes `sitemap.xml` and `robots.txt` from the same data.
- FAQPage structured data uses the exact Tier C question set, phrased about LBS KidZ's own practice.
  The one question the strategy leaves unfinalised is excluded from the markup until it is answered.

Nothing unverifiable is emitted in structured data: no address, no rating, no award, no accreditation,
no price.

---

## Animation

- **Motion** handles entrances, hovers, dropdowns, the accordion and the hero sequence.
- **GSAP + ScrollTrigger** handles scroll-driven work only: parallax layers, the horizontal
  preschool-day scene, and the timeline path draw.
- GSAP is **dynamically imported**, so its ~114 kB stays off the first paint. Every scene it drives is
  below the fold, and on a narrow screen or under reduced motion it is never fetched at all.
- **GSAP never restructures the DOM.** The horizontal scene is pinned with CSS `position: sticky`, and
  GSAP only animates a transform on a node React owns. ScrollTrigger's `pin: true` would wrap the
  section in a `.pin-spacer` div, which changes a React node's parent and makes unmounting that
  subtree throw `removeChild`. See C-11.
- `prefers-reduced-motion` is honoured everywhere. Distances collapse to zero rather than elements
  disappearing, so the layout is identical in both modes, and the horizontal scene falls back to a
  normal grid with the same DOM.

---

## Editing content

| To change | Edit |
|---|---|
| Contact details, phase, brand facts | `src/data/site.ts` |
| Navigation, footer, Explore keyword links | `src/data/navigation.ts` |
| URLs | `src/data/routes.ts` (and `permanentRedirects` in `server.mjs`) |
| Page titles, descriptions, keyword targets | `src/data/seo.ts` |
| SIMPLE, Little Karmayogis, Shastri Sanskaar, Sankalp Calendar | `src/data/brand-framework.ts` |
| Curricular goals, principles, daily schedule, assessment, language | `src/data/curriculum.ts` |
| Classes, fees, FAQs | `src/data/admissions.ts` |
| Zones, safety standards, classroom environment | `src/data/campuses.ts` |
| Legacy, family members, founder | `src/data/legacy.ts` |
| Value stories, parenting resources | `src/data/parents.ts` |
| Positioning, parity layer, hero copy | `src/data/positioning.ts` |
| Legal page wording | `src/pages/PolicyPage.tsx` |
| Logo | `src/layouts/Logo.tsx`, `public/favicon.svg`, `public/og-image.svg` |

After editing `public/og-image.svg`, re-render the PNG that social platforms actually read:

```bash
node -e "require('sharp')('public/og-image.svg',{density:144}).resize(1200,630,{fit:'fill'}).png().toFile('public/og-image.png')"
```

---

## Register Interest endpoint

`POST /api/register-interest`, implemented in [`server.mjs`](server.mjs). Validates the name and an
Indian mobile number, stores only known fields, length-capped, and appends to
`data/register-interest.jsonl`.

This is deliberately the simplest thing that satisfies the documents' requirement that Phase 1 leads
carry forward into Phase 2's funnel with no data loss and no restart. It is meant to be replaced by
the real SEP ERP intake — see T-07.

`data/` is generated at runtime and should not be committed.

---

## What is deliberately absent

Photographs of children or campuses · testimonials · educator profiles · fee figures · campus
addresses · admission ages · accreditation numbers · the Sankalp day-by-day activities · any statistic
about LBS KidZ.

None of these exist in the source documents. Every one is either reserved for Phase 2 or listed as a
blocking open item, and each renders an honest state rather than a placeholder or an invention.
The full list, with reasons, is at the end of
[`docs/content-map.md`](docs/content-map.md).
