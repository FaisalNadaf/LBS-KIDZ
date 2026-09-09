# Decisions, Conflicts and Open Items

Referenced by ID from code comments throughout `src/`. Two registers:

- **C-xx — Decisions and conflicts.** A source-document ambiguity or a conflict between the brief and
  the documents, resolved here with reasoning. Reopen if you disagree with the resolution.
- **T-xx — Blocking open items.** Content or data that does not exist in any source document and must
  be supplied before go-live. Each names the exact file to change.

---

## C — Decisions and conflicts

### C-01 — Sankalp Calendar day-to-pillar mapping is not derivable *(unresolved by design)*

**The conflict.** Process Guidelines §2 Step 3 instructs: write one small action "for each day
(Monday–Saturday) and its assigned SIMPLE pillar, following the sample structure already outlined in
the Website Reference Document (Section 3.4)."

**The problem.** The supplied Website Reference Document has no Section 3.4. Its Section 3 is
"Positioning" and carries no subsections. The referenced sample structure is not in any of the eight
documents.

**Only adjacent data point.** Process Guidelines §2 Step 5 gives an ERP example row:
`Activity Name: "Honesty Shop — Tuesday" · SIMPLE Pillar: Integrity · Sub-Program: Shastri Sanskaar`.
That is tagged *Shastri Sanskaar*, not *Sankalp Calendar*, so it cannot be read as establishing
"Tuesday = Integrity" for the Sankalp week.

**Decision.** No mapping invented. The site presents the six pillars as the week's rhythm and states
that day-by-day assignment is being fixed in the curriculum workstream — which is literally true, since
that workstream is recorded as deferred and not yet started (Decisions Log §10).

**To close:** supply the missing Section 3.4 sample structure, or confirm the intended day-to-pillar
map. Then populate `sankalpCalendar` in `src/data/brand-framework.ts` and surface the week grid on
`/the-lal-bahadur-shastri-way`.

---

### C-02 — NCERT daily-schedule "Method of Conduct" column is misaligned in the source

The table in NCERT Curriculum Summary §4 has its Activity Block and Method of Conduct columns offset
in the PDF's text layer: eight activity blocks are listed, then seven conduct labels in a separate run,
so pairing them one-to-one is unreliable.

**Decision.** The eight activity blocks are reproduced in source order, which is the load-bearing
content. A conduct label is shown only where it is unambiguous (Welcome Circle and Goodbye Circle,
both "Teacher-initiated, large group"). The remainder are omitted rather than guessed.

**To close:** confirm the block-to-conduct pairing from the original NCERT table, then complete
`dailySchedule` in `src/data/curriculum.ts`.

---

### C-03 — Safety section: Phase 1 or Phase 2?

NCERT Curriculum Summary §7 says the concrete safety list is "usable directly as real website content
(Phase 2 Safety & Well-being section)". The parity-layer table (Website Reference Document §4) also
places it on the Campuses page in Phase 2. But Website Reference Document §3 treats specific, concrete
safety statements as core **positioning**, which applies from Phase 1.

**Decision.** Publish the full list in Phase 1, on the Campuses page at `#safety`, framed as the
standards every campus **is built to** — a forward commitment, not a claim about a building a parent
could visit today. This satisfies the positioning requirement without triggering the "do not overclaim
infrastructure before it is real" rule (Global & Indian Research §6).

**Reopen if:** you would rather hold the entire section until a campus opens.

---

### C-04 — Illustration versus photography *(revised 4 Sep 2026; client override)*

**The conflict.** The project brief asks for authentic Indian photography — children, parents,
teachers, classrooms. The documents said the opposite for this phase:

> "Real photography once available (Phase 2); tasteful custom illustration in the interim (Phase 1)."
> — Website Reference Document §7, Decisions Log §7

and list "overclaiming infrastructure or campus experience before it is real" as something LBS KidZ
deliberately avoids (Global & Indian Research §6).

**Original decision (superseded).** The documents win, per the brief's rule that the PDFs are
authoritative. Phase 1 shipped an original illustration system and no photographs.

**Current decision.** The client was shown this conflict and chose *real photographs, honestly
framed*. On re-reading, the rule the documents actually protect is narrower than "no photographs":
it forbids **pictures that imply an LBS KidZ campus, class, child, parent or educator exists**. A
photograph of early-years learning in India, stated to be exactly that, breaks no promise — and the
brief's own objection to drawn children as the primary depiction of people is a fair one.

So photography is used, and the overclaim is prevented directly:

| Guard | Where |
|---|---|
| No image is captioned, framed or implied as ours | Every `<Photo>` call site |
| Nothing in the copy claims an image as ours | Every `<Photo>` call site (see also C-10, which removed the on-page notice) |
| Full provenance published | `/sitemap#image-credits`, generated from `image-credits.json` |
| Campuses, Gallery, Educators, Testimonials keep their "not yet" states | unchanged |
| The Campuses page uses a photograph of *materials*, never of a classroom | `CampusesPage` |
| The two Shastri-family pages take no stock photography at all | `FamilyMessagePage`, `FoundersNotePage` — T-03 still blocks them |

`deliberateChoices` in `src/data/positioning.ts` was restated to match: the avoided thing is now
"pictures passed off as our campus, our classrooms or our children", which is what was ever meant.

**What changed in the code.**

- 17 photographs sourced from Unsplash and Pexels, optimised to AVIF/WebP/JPEG at three or four
  widths each in `public/images/`, with licences recorded in `image-credits.json`.
- `src/data/media.ts` is **generated** — run `node scripts/build-image-manifest.mjs` after any
  change to `public/images/`.
- `src/components/media/Photo.tsx` renders every image: `<picture>` with AVIF → WebP → JPEG,
  intrinsic dimensions, the image's own average colour as the loading ground, and shaped variants
  (`ShapedPhoto`, `PhotoOnColour`, `PhotoFigure`).
- The five drawn scenes containing children (`HeroScene`, `CircleTimeScene`, `ActivityCornerScene`,
  `ReflectionScene`, `AtWorkScene`) and `art/people.tsx` were **deleted**. Drawing a child next to a
  photograph of one reads as two different products.
- The illustration language remains, and is now doing what it is better at than a camera: objects,
  motifs and marks — `art/primitives.tsx` and the new `art/objects.tsx`.

**Reopen if:** the Shastri family or the client would rather the site carry no photograph of a child
who is not enrolled. Reverting is a `<Photo>`-level change plus restoring the deleted scenes from
git history.

---

### C-12 — The photography disclosure was removed from the page *(4 Sep 2026)*

**What changed.** A line reading "Photographs on this site show early-years
learning in India. They are not photographs of an LBS KidZ campus…" ran in the
footer of every page, under the homepage hero, and above a photograph-credits
list on the sitemap. All of it is gone, at the client's instruction: it is an
internal design rationale, and a parent reading a school website should not be
handed the team's notes about its own image sourcing.

**What still protects the same promise.** The disclosure was never the guard —
it only described one. What actually prevents the overclaim is unchanged and is
structural rather than textual:

- No photograph is captioned, framed or referred to as ours. Nothing on the
  site says "our classroom", "our children" or "our team" beside an image.
- The Campuses page illustrates *materials*, never a room with children in it.
- Campuses, Gallery, Our Educators and Testimonials keep their explicit "this
  arrives with our first campus" states, which is where a reader is actually
  told what does not exist yet — in the place where they would look for it.
- The two Shastri family pages take no stock photography at all; they hold
  `ReservedPortrait` slots until the real portraits arrive (T-03).

**Provenance.** `image-credits.json` still records author, licence and source
URL for all 40 photographs. It is a licence ledger for the team, not a page.
Neither Unsplash nor Pexels requires visible attribution.

**Reopen if:** counsel wants attribution shown, or the family asks for a public
note about the imagery.

---

### C-13 — One animation system *(4 Sep 2026)*

The site ran Motion and GSAP side by side: Motion for entrances, hovers and the
accordion, GSAP for scrub-linked scenes. That is 250kB of animation library for
one small site, and two different easing implementations to keep in step.

GSAP now owns everything tied to scroll or a timeline, and CSS owns discrete UI
state. The reveal system is the substantive change: roughly eighty Motion
components, each with its own IntersectionObserver and tween, became one
batched `ScrollTrigger.batch` per route reading `[data-reveal]` attributes.

The hidden state lives in CSS so nothing is painted and then snapped back, which
introduces one real risk — if the library never loads, the page stays blank. A
1.2s failsafe puts `.reveal-ready` on `<html>` and reveals everything, and the
route-change cleanup does the same. Content is never left depending on an
animation succeeding.

Net: Motion removed, 135kB (45kB gzipped) off every page.

**Reopen if:** a future feature genuinely needs layout animation or gesture
handling, which is the one thing Motion did better.

---

### C-14 — The navbar shows a short label *(4 Sep 2026)*

The primary navigation only appeared from 1280px, so a desktop user at 125%
browser zoom — a 1440px screen gives a 1152px CSS viewport — lost the entire
navigation to a hamburger menu on what is obviously a desktop.

The width was driven by one item: "Curriculum & Learning Approach" is 29
characters and took roughly a quarter of the bar. That phrase is
keyword-bearing and is required by the sitemap document, so it has not been
changed — `NavItem` now carries an optional `short`, used **only** by the
navbar. The full label still appears verbatim in the page title, the H1, the
breadcrumb, the footer keyword block and the sitemap page, and it is set as the
link's `aria-label` so assistive technology reads the full name.

With `short` in place the row fits at 1024px, and the breakpoint moved from
`xl` to `lg`.

---

### C-15 — Photographs sit in a mat, not behind an offset block *(4 Sep 2026)*

`PhotoOnColour` used to place a copy of the photograph's own shape behind it and
slide it a few pixels diagonally. On a rectangle that reads as a deliberate
offset. On the arch used in the hero it leaves a crescent of colour down one
side, and the result reads as printing misregistration — the photograph looks
slipped rather than framed. It was the weakest thing on the homepage.

Replaced with an even mat of colour on all four sides plus a soft blurred glow
of the same hue behind it. A symmetrical mat cannot look misaligned because
there is no alignment to get wrong, and the glow does the job the offset was
attempting — depth, and lifting the object off the page — without an edge that
has to line up with anything.

---

### C-16 — The reference design language, in this palette *(4 Sep 2026)*

The client supplied reference screenshots from a brightly coloured preschool
brand and asked for its component designs "everywhere". Adopted, with one
deliberate separation: **the shapes are taken, the colours are not.**

The source documents fix the palette — "soft earthy tones with a signature
accent (khadi white, warm terracotta, deep blue)", explicitly "avoiding the
cluttered primary-color look common to preschool websites" (D2 §7). The
reference is pink, lavender, sky blue and lime. Copying its palette would break
a locked brand decision; copying its *geometry* breaks nothing, and the geometry
is what makes it distinctive.

**Taken:**

| Reference device | Where it lives now |
|---|---|
| Three corners rounded, one held tight | `corner-cut` — every button on the site |
| Bold colour panel, photo, large serif line over the foot | `ColourPanel` — the Value Stories band |
| Dashed frame around a portrait on a colour blob | `PersonCard` — the Shastri family and founder pages |
| Pill with a circular icon and a short label | `FeatureChip` — the language position |
| Scalloped seam between bands | `ScallopEdge` — the seam into the CTA band |
| Soft organic silhouettes | `shape-blob`, `-alt`, `-soft` |

**Not taken, and why:**

- *The candy palette.* See above.
- *A cartoon giraffe and toy-car decorations.* The illustration language here is
  objects and motifs drawn in one weight; a character mascot is a different
  brand.
- *Deep cloud seams between every section.* The bumps are shallow and used once.
  A tall row of bubbles at every transition reads as a nursery poster, which is
  the wrong register for a school with this name over the door — and a signature
  repeated at every seam stops being a signature.
- *Blobs on the hero portraits.* A percentage border-radius on a 3:4 box
  resolves to a plain ellipse, so the blob loses the asymmetry that makes it
  one. The reference's blobs sit on near-square shapes. Blobs are used where the
  box is square (`PersonCard`); the hero keeps the arch.
- *Arrows between the homepage facts.* The reference links figures floating in
  open space. That strip already separates its three facts with rules, so the
  arrows said the same thing twice.

**Reopen if:** the client wants the reference palette as well as its shapes,
which would be a change to D2 §7 rather than a design tweak.

---

### C-05 — Saturday: Sankalp week versus NCERT school week

Process Guidelines §2 Step 3 defines the Sankalp week as **Monday–Saturday**.
NCERT Curriculum Summary §4 states a **five-day week, Monday–Friday**, with Saturday reserved for
teacher planning, material preparation, parent contact and record-keeping, and explicitly *not* an
attendance day for children.

**Decision.** Both facts are stated separately and accurately on the site. The likely reconciliation —
that Saturday is the family take-home day, since the Sankalp Calendar is also a parent take-home tool —
is **not** asserted, because no document says it.

**To close:** confirm whether the Saturday Sankalp action is a home action, and if so say so on
`/the-lal-bahadur-shastri-way`.

---

### C-06 — "Admissions" as both a dropdown and a page

The sitemap shows Admissions as a dropdown with three children. The Keyword & AEO Strategy §3 assigns
"Admissions" its own primary keyword ("preschool admission Indore, nursery admission Indore") and its
own FAQ requirement, which implies a landing page.

**Decision.** The group parent is a real, clickable page at `/preschool-admission-indore`, keeping all
three children beneath it. The rule applied consistently across the site: **a nav group is a page only
where the keyword strategy assigns it keywords.** That is why *Shastri Ji Legacy* and *For Parents*
remain menu-only — the strategy gives keywords to their child pages, not to the groups.

---

### C-07 — Curriculum slug

The sitemap sanctions both `/curriculum-nep-2020-activity-based-learning` and "a shorter variant, e.g.
`/curriculum`", and says final slugs should be confirmed with Sarvesh.

**Decision.** The long, keyword-bearing form is canonical, because the sitemap makes keyword-bearing
URLs "a fixed build requirement". `/curriculum` is a real server-side **301** into it (`server.mjs`),
so both work and exactly one URL is indexable.

**To change:** swap `routes.curriculum` and `routes.curriculumShort` in `src/data/routes.ts` and the
`permanentRedirects` map in `server.mjs`.

---

### C-08 — Home page slug

The sitemap suggests `/best-preschool-indore` "for Home **or a locality landing page**".

**Decision.** Home stays at `/`. Putting the homepage on a slug adds a redirect on the most-linked URL
of the site and is not standard practice. The keyword is carried in the page title, the H1's opening
phrase, and the footer Explore block, which is where the sitemap's own keyword-linking layer puts it.

**Alternative not taken:** a separate `/best-preschool-indore` locality landing page. That would be a
new page the sitemap does not list, so it was not created. Add it later if the SEO scope calls for it.

---

### C-09 — Tech stack: React SPA versus the documented Node/Express scope

The vendor scope names "Node.js + Express, backend upload facility, admin panel". The brief specifies
React, TypeScript, Tailwind, GSAP and Framer Motion.

**Decision.** Both are honoured. The front end is React + TypeScript + Vite; `server.mjs` is a real
Express server that serves the build and implements the Register Interest endpoint, storing every lead
so Phase 1 leads carry forward as Decisions Log §4 requires.

**Not built:** the admin panel and the backend upload facility named in the vendor scope. These are
application scope beyond a website build. See **T-07**.

---

### C-10 — SEO without server-side rendering

A client-rendered SPA would give crawlers one identical `<head>` for every URL.

**Decision.** `scripts/prerender-head.mjs` writes a static HTML file per route at build time with that
route's real title, description, canonical, robots, Open Graph, Twitter and JSON-LD already in the
markup, plus a `<noscript>` summary. Both the app and the script read the same `src/data/seo.ts`, so
they cannot drift. Body copy is still client-rendered.

**If full SSR is wanted later:** the route table in `src/App.tsx` and the metadata in `src/data/seo.ts`
are already the single sources needed to move to a framework-level SSG.

---

---

### C-11 — GSAP must never restructure the DOM *(architectural rule, learned the hard way)*

**The bug.** Navigating away from the Curriculum page after the horizontal preschool-day scene had
activated crashed the app with:

> NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of
> this node.

**The cause.** ScrollTrigger's `pin: true` wraps the pinned element in a `.pin-spacer` div. That
changes the parent of a node React rendered. React still holds the original parent, so when the route
change unmounts that subtree, `removeChild` is called against the wrong parent and throws. Confirmed
directly: with the pin active, `#the-day`'s `parentElement.className` was `pin-spacer` rather than
`<main>`.

**The fix.** Pinning is now done by CSS `position: sticky`:

- the section is a spacer whose height is `calc(100dvh + distance)`, measured from the track width
- an inner wrapper holds itself in place with `sticky top-0 h-dvh`
- GSAP scrubs only a `transform` on the track, and `pin` is not used anywhere

The browser does the pinning, so the DOM stays exactly as React rendered it. `useHorizontalScene` was
replaced by `useHorizontalTrack`, which also returns the measured distance so the caller sizes its own
spacer.

**The rule going forward**, stated at the top of `src/animations/gsap.ts`: GSAP may animate transforms
on nodes React owns, and may not insert, remove or re-parent anything. If a future effect needs
pinning, use `position: sticky`.

**Also added, because the router asked for it:** a route-level `errorElement`
(`src/pages/ErrorPage.tsx`). Without one, React Router shows its own developer screen and a raw stack
trace to whoever is on the page. The boundary sits inside the layout, so a failing page keeps the
navigation and footer.

**And the QA gap that let it through:** `scripts/qa.mjs` loaded every route in a fresh page, so it
never exercised unmount. It now also walks nine client-side navigations in one long-lived page,
scrolling into each scroll-driven scene before leaving it, and asserts that no `.pin-spacer` exists
anywhere.

## T — Blocking open items

### T-01 — Public contact details do not exist *(blocks the footer and Contact page)*

The footer specification requires address, phone, WhatsApp click-to-chat, email and a Google Maps
"Get Directions" link. **None of these appear in any of the eight documents.**

The mobile numbers that do appear (9893766740, 9919533366) are the signature block of the SEP founder
on internal letterhead. Publishing them as the school's public contact line would be a fabrication, so
they are not used.

**Fix in one place:** `src/data/site.ts` → `contact`. Fill each value and set `pending: false`.
The footer and Contact page reveal the relevant blocks automatically.

Owner: SEP / Sarvesh.

---

### T-02 — Admission ages per class are unfinalised

Keyword & AEO Strategy §6 leaves the answer as `[To be finalized alongside class structure/age-band
content.]`

Currently the site shows NCERT's reference age bands, attributed to NCERT, and says LBS KidZ's own
admission age is confirmed on enquiry.

**Fix:** `src/data/admissions.ts` → each `programs[].ncertAge`, plus the `pending: true` FAQ entry.
Once set, flip that FAQ's `schema` to `true` so it joins the FAQPage markup.

Owner: SEP.

---

### T-03 — Family and founder messages and photographs *(blocks two Phase 1 pages)*

> "Both require real photographs and a short personal message (3–4 lines is sufficient) from each
> family member, coordinated through Mr. Adarsh Shastri, before the page can go live."
> — Website Reference Document §6

Needed from: Mr. Anil Shastri, Mrs. Manju Shastri, Mr. Lagan Shastri, Mr. Mudit Shastri
(A Message from the Lal Bahadur Shastri Family), and Mr. Adarsh Shastri (Founder's Note).

Both pages are built and render an honest "their words will appear here" state. **No message has been
written on anyone's behalf.**

**Fix:** `src/data/legacy.ts` → `familyMembers[].message` / `.photo`, and `founder.message` / `.photo`.

Owner: Adarsh Shastri to coordinate (as recorded in Decisions Log §10).

---

### T-04 — LBS Legacy narrative copy needs family approval

Decisions Log §10 lists page-wise content drafting as pending, "starting with Home and LBS Legacy".
Process Guidelines §3 names Adarsh Shastri as the reviewer for legacy authenticity and tone.

The four legacy moments currently on the page are limited to widely documented public history about a
public figure, kept deliberately brief. They are marked on-page as under family review.

**Fix:** `src/data/legacy.ts` → `legacyMoments`, `legacyIntro`, `legacyToValues`.

Owner: Adarsh Shastri / SEP.

---

### T-05 — No logo artwork was supplied

No logo file accompanies the documents. The current wordmark is built from type plus the wheat-stalk
motif the design direction names.

**Fix:** `src/layouts/Logo.tsx` (one component), `public/favicon.svg`, `public/og-image.svg`
(re-render the PNG with `sharp` after editing — see README).

Owner: Source Advertising (creative design scope).

---

### T-06 — Legal page wording needs legal review

Five legal pages are required by the sitemap; no document supplies text for any of them.

What is published states only what is factually true of this website and of decisions actually recorded
in the documents. Every page carries a visible "working draft" notice.

Specifically still needed:
- Refund and cancellation terms, once a registration fee is actually collected
- Child Protection Committee composition and the concern-raising process
- Data retention periods for the Privacy Policy

**Fix:** `src/pages/PolicyPage.tsx` → the `bodies` record. Remove `draftNotice` per page once cleared.

Owner: SEP, with legal counsel.

---

### T-07 — Backend upload facility and admin panel not built

The vendor scope names them; they are application scope beyond a website build.

`server.mjs` currently persists Register Interest submissions to `data/register-interest.jsonl`.
That is deliberately the simplest thing that satisfies "no data loss, no restart" and is meant to be
replaced by the real SEP ERP intake.

**Fix:** point `POST /api/register-interest` at the ERP, and build the admin panel separately.

Owner: Sarvesh.

---

### T-08 — Social profile URLs not supplied

The footer specification requires Instagram, Facebook and YouTube icons. No handles appear in any
document.

**Fix:** `src/data/site.ts` → `contact.social`. Icons render once `pending` is `false`.

Owner: Source Advertising (social content scope).

---

### T-09 — Downloads have no files yet

The footer utility block calls for a brochure and academic calendar "once available", and the Alignment
Map makes the Sankalp Calendar a downloadable lead magnet on the Admissions page. None exist:
the curriculum workstream is deferred and the academic calendar follows the first campus.

**Fix:** add files to `public/downloads/`, then flip `SITE_PHASE` to `2` (or unhook the Downloads link
from the phase flag if the brochure lands earlier).

Owner: SEP / Source Advertising.

---

## Phase switch

`SITE_PHASE` in `src/data/site.ts` is the single switch from 1 to 2. Setting it to `2`:

- shows the School Life dropdown in its exact sitemap slot
- shows Admission Process inside the Admissions group
- shows Careers and Downloads in the footer utility block
- relabels Register Interest → Enquire Now everywhere
- switches Campuses from zone-level to per-campus
- adds the three zone keyword links to the footer Explore block
- includes Phase 2 routes in `sitemap.xml` and drops their `noindex`

No route, nav position or URL changes between phases, as the sitemap requires.

**Still needed before flipping it:** T-01, T-03, real campus data, real educator profiles, real
testimonials, and gallery photographs.
