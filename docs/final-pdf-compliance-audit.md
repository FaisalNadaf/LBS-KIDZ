# Final PDF Compliance Audit

Every meaningful requirement across the eight source documents, with where it is implemented and
what, if anything, could not be done.

**Status key:** ✅ implemented · ⏸️ reserved for Phase 2 (built, gated) · ⚠️ blocked on missing input ·
❌ deliberately not implemented (with reason)

Source codes: **D1** Sitemap · **D2** Reference Document · **D3** Keyword & AEO · **D4** NCERT Summary ·
**D5** Global & Indian Research · **D6** Decisions Log · **D7** Alignment Map · **D8** Process Guidelines

---

## 1. Sitemap and navigation (D1)

| Requirement | Source | Status | Location | Notes |
|---|---|---|---|---|
| Phase 1 navbar, exact order | D1 §1.1 | ✅ | `src/data/navigation.ts` | Home · Shastri Ji Legacy ▾ · Curriculum · For Parents ▾ · Campuses · Admissions ▾ · Contact Us · CTA |
| Shastri Ji Legacy dropdown, 4 children | D1 §1.1 | ✅ | `navigation.ts`, `src/pages/` | All four pages built |
| Curriculum kept flat, never nested | D1 §1.1 | ✅ | `navigation.ts` | Standalone top-level item |
| For Parents dropdown, 2 children | D1 §1.1 | ✅ | `navigation.ts` | |
| Campuses standalone in Phase 1 | D1 §1.1 | ✅ | `CampusesPage.tsx` | Becomes a dropdown at Phase 2 |
| Admissions dropdown, 3 children | D1 §1.1 | ✅ | `navigation.ts` | Parent is also a page — see C-06 |
| Register Interest: colour-filled, right-aligned, persistent, outside the dropdowns | D1 §1.1 | ✅ | `Navbar.tsx`, `AdmissionCta.tsx` | Terracotta fill, right-aligned, on every page |
| Phase 2 adds School Life only; no nav restructure | D1 §1.2 | ⏸️ | `navigation.ts` | Gated on `SITE_PHASE`; inserted in the exact slot |
| Admission Process added inside Admissions in Phase 2 | D1 §1.2 | ⏸️ | `navigation.ts` | |
| CTA relabels to "Enquire Now" | D1 §1.2 | ⏸️ | `src/data/site.ts` → `primaryCta` | Same URL and treatment |
| Careers footer-only, never in navbar | D1 §1.2 | ⏸️ | `navigation.ts` → `footerUtilityLinks` | |
| No nav item changes position or URL between phases | D1 §1.2 | ✅ | `src/data/routes.ts` | All Phase 2 URLs reserved now |
| Page-to-phase table honoured | D1 §1.3 | ✅ | `SitemapPage.tsx`, `seo.ts` → `phase` | |
| Footer §2.1 school information block | D1 §2.1 | ⚠️ | `Footer.tsx` | Structure built; address/phone/WhatsApp/email/Maps **blocked on T-01** |
| Footer §2.2 quick links, 6 items | D1 §2.2 | ✅ | `navigation.ts` | Exact list including Sitemap |
| Footer §2.3 legal, 5 items | D1 §2.3 | ✅ | `PolicyPage.tsx` | All five pages exist |
| Child Protection Policy as plain-language safeguarding statement | D1 §2.3 | ✅ | `PolicyPage.tsx` | POCSO-era governance framing; committee composition pending (T-06) |
| Mandatory Public Disclosure URL and footer slot reserved, page inactive | D1 §2.3, §4 | ✅ | `/mandatory-public-disclosure` | Live URL, `noindex`, explains it activates on CBSE affiliation |
| Footer §2.4 utility | D1 §2.4 | ✅ / ⏸️ | `navigation.ts` | FAQs now; Careers and Downloads at Phase 2 |
| Footer §2.5 copyright line | D1 §2.5 | ✅ | `site.ts` → `copyrightLine` | Verbatim |
| "Explore" keyword-linking block, separate from Quick Links, keyword phrases as link text | D1 §3 | ✅ | `navigation.ts` → `footerExploreLinks` | All six phrases verbatim; deep-linked to anchors |
| Zone entries added to Explore in Phase 2 | D1 §3 | ⏸️ | same | Kanadia Road, Rau, Bicholi Mardana |
| Keyword-bearing URL slugs as a fixed requirement | D1 §3 | ✅ | `routes.ts` | See C-07, C-08 |
| Plain HTML sitemap page, linked in footer | D1 §4 | ✅ | `/sitemap` | Distinct from `sitemap.xml`; lists Phase 2 pages as labelled |
| XML sitemap for search engines | D1 §4 | ✅ | `dist/sitemap.xml` | Generated from the same route data |

---

## 2. Strategy, positioning and parity (D2)

| Requirement | Source | Status | Location | Notes |
|---|---|---|---|---|
| Legacy as the emotional centre | D2 §3, D6 §6 | ✅ | Home §Differentiator, `/lal-bahadur-shastri-legacy` | |
| Discoverable by a parent who has never heard of the brand | D2 §1, §3 | ✅ | Home + Curriculum titles, H1s, footer Explore | Functional/local language leads |
| Mother-tongue-first language positioning, not English-first | D2 §3 | ✅ | Curriculum §Language, Home, FAQs | Four supporting reasons reproduced |
| No formal examinations at any stage | D2 §3 | ✅ | Curriculum `#no-examinations`, Home, FAQs | |
| Beginner / Progressive / Proficient, not marks or grades | D2 §3 | ✅ | Curriculum, Programs | |
| Safety in specific concrete terms, not generic reassurance | D2 §3 | ✅ | `/preschool-in-indore-campuses#safety` | 11 items verbatim from D4 §7 |
| **Parity layer, all 9 categories present** | D2 §4 | ✅ | Home §ParitySection + linked pages | Phase 2 rows labelled, not faked |
| Named pedagogy / curriculum credibility | D2 §4 | ✅ | Curriculum page | |
| Teacher quality and training | D2 §4 | ⏸️ | `/school-life/our-educators` | Blocked: team not appointed |
| Parent communication | D2 §4 | ✅ | Curriculum `#what-you-see` | Parent-facing benefit, ERP internals withheld |
| Accreditation transparency | D2 §4 | ⏸️ | Mandatory Public Disclosure | "Once available" |
| Testimonials with real specificity | D2 §4 | ⏸️ | `/school-life/testimonials` | Blocked: no enrolled families |
| FAQ addressing practical worries, from Phase 1 | D2 §4 | ✅ | `/faqs`, Admissions, Curriculum, Home | |
| Extracurricular breadth: art, music, movement, outdoor play | D2 §4 | ✅ | Curriculum `#the-day` | In the daily schedule |
| Fee: fee-on-demand + no hidden charges (5 items) | D2 §4 | ✅ | `/preschool-fees-indore` | No figure published anywhere |
| Admissions present from Phase 1 | D2 §5.1 | ✅ | Admissions group, 3 pages | |
| Campuses zone-level in Phase 1, same URL throughout | D2 §5.1 | ✅ | `/preschool-in-indore-campuses` | |
| Internal progress tracking never public | D2 §5.3, D6 §2 | ✅ | — | No such page exists |
| Family incorporation: 3-tier structure | D2 §6 | ✅ | Three pages | Roles correct per person |
| Family Message reverent/historical; Founder's Note practical/forward-looking | D2 §6 | ✅ | `legacy.ts` → `familyPageTone` | Tone differentiated |
| Real photos + 3–4 line messages required before go-live | D2 §6 | ⚠️ | `legacy.ts` | **T-03.** Nothing fabricated |
| Warm story-book illustration; khadi white, terracotta, deep blue | D2 §7 | ✅ | `styles/index.css`, `components/art/` | |
| Recurring subtle motif (lantern or wheat stalk), used quietly | D2 §7 | ✅ | `WheatStalk`, `Lantern` | Wheat stalk is the primary motif |
| Real photography only once available; illustration in the interim | D2 §7 | ✅ | `components/art/` | See C-04 |
| Short-form emotional copy over long paragraphs | D2 §7 | ✅ | throughout | |
| Node.js + Express | D2 §8 | ✅ | `server.mjs` | Admin panel out of scope — T-07 |
| Domain `lbskidz.com` | D2 §8 | ✅ | `site.ts`, canonicals, schema | |

---

## 3. Keyword and AEO strategy (D3)

| Requirement | Source | Status | Location | Notes |
|---|---|---|---|---|
| Tier A local keywords on Home, Campuses, Admissions | D3 §2, §3 | ✅ | `src/data/seo.ts` | |
| **Tier B/C only on the Curriculum page** | D3 §3, §4 | ✅ | `seo.ts` | Enforced; no other page carries them |
| Home title/H1 functional and local; tagline below the fold | D3 §3 | ✅ | `seo.ts`, `Hero.tsx` | H1 opens "A preschool in Indore"; tagline in the footer |
| LBS Legacy: Tier E + light Tier D only | D3 §3 | ✅ | `seo.ts` | |
| **The LBS Way: do not force Tier A/B/C keywords** | D3 §3 | ✅ | `seo.ts` | Brand terms only |
| Value Stories: Tier D primary | D3 §3 | ✅ | `seo.ts` | |
| **Parenting Tips: not a vehicle for policy keywords** | D3 §3, §5 | ✅ | `seo.ts`, `ParentingPage.tsx` | `primaryKeyword: undefined`; no policy framing on the page |
| Campuses: per-zone local targeting | D3 §3, §8 | ✅ | `campuses.ts` → `zones[].keyword` | Per-campus pages at Phase 2 |
| Programs: class-level sections for age-specific capture | D3 §3 | ✅ | `ProgramsPage.tsx` | Anchored section + own H2 per class |
| Fees: lead with no-hidden-charges, not a fee table | D3 §3 | ✅ | `FeesPage.tsx` | |
| Policy content strictly as factual statements about LBS KidZ's own practice, citing NCERT | D3 §4 | ✅ | `CurriculumPage.tsx` | Stated explicitly on the page |
| **No separate NEP 2020 explainer articles** | D3 §4 | ✅ | — | None created |
| FAQ schema on the Curriculum page using Tier C questions | D3 §6 | ✅ | `lib/schema.ts`, prerendered HTML | |
| Questions asked about LBS KidZ's own practice | D3 §6 | ✅ | `admissions.ts` → `faqs` | "Is there any exam in preschool at LBS KidZ?" |
| Six-question starter set | D3 §6 | ✅ | `faqs` | All six present |
| "What age can my child join?" left unfinalised | D3 §6 | ⚠️ | `faqs` | `pending: true`, excluded from schema — **T-02** |
| Tier A vs Tier B/C tracked separately | D3 §7, §8 | ✅ | `seo.ts` → `primaryKeyword` / `secondaryKeywords` | Per-page fields available for reporting |
| Google Business Profile, Ads geo-targeting, local SEO | D3 §7 | ❌ | — | Outside a website build; Sarvesh's separate scope |

---

## 4. NCERT curriculum (D4)

| Requirement | Source | Status | Location | Notes |
|---|---|---|---|---|
| Panchakosha → modern domain mapping | D4 §1 | ✅ | Curriculum `#curricular-goals` | Devanagari + transliteration + gloss |
| 13 Curricular Goals across 6 domains | D4 §1 | ✅ | `curriculum.ts` → `curricularDomains` | CG-1 … CG-13, all present |
| **CG-5 and CG-6 cited explicitly for Empathy / food-respect** | D4 §10 | ✅ | LBS Way §SIMPLE, Legacy §motif | Named as chips and in the source note |
| 10 guiding principles, treated as non-negotiable | D4 §2 | ✅ | Curriculum `#principles` | Verbatim, all ten |
| Mother-tongue policy with all four reasons | D4 §3 | ✅ | Curriculum `#mother-tongue` | |
| "Emphatic, not a mild suggestion" framing | D4 §3 | ✅ | `languagePosition.sourceNote` | |
| Daily schedule, 8 blocks | D4 §4 | ✅ | Curriculum `#the-day` | Horizontal scroll scene on desktop |
| Method-of-conduct labels | D4 §4 | ⚠️ | `dailySchedule[].conduct` | Only where unambiguous — **C-02** |
| 4 hours/day; Mon–Fri; Saturday for teacher planning | D4 §4 | ✅ | Curriculum `#the-day` | |
| Sankalp value moment at Goodbye Circle / Reflection Time | D4 §4, D6 §8, D7 §2 | ✅ | Curriculum, LBS Way, Home | Marked on the schedule itself |
| 4 programme-planning principles | D4 §4 | ✅ | Curriculum `#the-day` | |
| Assessment: continuous, comprehensive, non-competitive | D4 §5 | ✅ | Curriculum `#no-examinations` | All five principles |
| Beginner / Progressive / Proficient with definitions | D4 §5 | ✅ | Curriculum, Programs | Verbatim definitions |
| Neutral icon system rather than numeric scores | D4 §5 | ✅ | `assessmentDisplayNote` | |
| Cumulative learning outcomes | D4 §5 | ✅ | Curriculum, Programs | |
| Ethics as reasoning questions, not rules | D4 §6 | ✅ | Curriculum `#ethics` | Both questions quoted |
| Safety list, Chapter 6, as real website content | D4 §7 | ✅ | Campuses `#safety` | All 11 items |
| PTR note, never met by hiring under-trained staff | D4 §7 | ✅ | Campuses `#safety` | |
| Class structure and NCERT age-band mapping clarified for parents | D4 §8 | ✅ | `/programs-and-classes` | Preschool I/II/III mapping shown as NCERT's |
| Playgroup as standard practice beyond NCERT's scope | D4 §8 | ✅ | Programs | Stated plainly |
| Family involvement as a core contributor | D4 §9 | ✅ | Curriculum `#what-you-see` | Three practices listed |
| Practical takeaways checklist, all 8 items | D4 §10 | ✅ | across Curriculum, Campuses, LBS Way | Each traced in `content-map.md` |

---

## 5. Competitor research (D5)

| Requirement | Source | Status | Location | Notes |
|---|---|---|---|---|
| Named, branded values framework and sub-programs | D5 §5 | ✅ | LBS Way | SIMPLE, Shastri Sanskaar, Sankalp Calendar |
| Distinct student identity name | D5 §5 | ✅ | LBS Way, Home | Little Karmayogis |
| Explicit, specific safety and credential content | D5 §5 | ✅ | Campuses `#safety` | |
| Classroom environment as part of the teaching philosophy | D5 §5 | ✅ | Campuses `#environment`, Home | EtonHouse framing |
| Documenting the child's process (Value Stories) | D5 §5 | ✅ | `/value-stories` | Reggio Emilia framing |
| Dedicated, dignified founder/family message page | D5 §5 | ✅ | Two pages | Precedent noted on-page |
| **Avoid franchise/business messaging on parent pages** | D5 §6 | ✅ | — | None anywhere |
| **Avoid generic claims without specific backing** | D5 §6 | ✅ | throughout | Every claim carries a source note |
| **Avoid marketing English as the premium differentiator** | D5 §6 | ✅ | Curriculum | The opposite is stated |
| **Avoid overclaiming infrastructure before it is real** | D5 §6 | ✅ | Campuses, Phase 2 pages | Drives C-04 and the illustration decision |
| Uniquely ownable origin story used as the differentiator | D5 §7 | ✅ | Home §Differentiator, Legacy | |

---

## 6. Decisions log (D6)

| Requirement | Source | Status | Location | Notes |
|---|---|---|---|---|
| SIMPLE = Simplicity, Integrity, Mindfulness, Patriotism, Leadership, Empathy | D6 §1 | ✅ | `brand-framework.ts` | Exact six |
| Little Karmayogis | D6 §1 | ✅ | LBS Way, Home | |
| Shastri Sanskaar | D6 §1 | ✅ | LBS Way | |
| Sankalp Calendar | D6 §1 | ✅ | LBS Way, Admissions | |
| Page title "The Lal Bahadur Shastri Way" | D6 §1 | ✅ | Nav, H1 | "The LBS Way" used only as the page's own H1 |
| **Excluded names ("Shastri Habits", "The LBS Way" as the framework name)** | D6 §1 | ✅ | — | Never used as a framework name |
| "Our Journey" excluded from the public site | D6 §2 | ✅ | — | Does not exist |
| Phase 1: story/legacy-led, no real campus/staff/students | D6 §4 | ✅ | site-wide | |
| Phase 1 leads carry into Phase 2 with no data loss | D6 §4 | ✅ | `server.mjs`, Register Interest page | Stated to the parent |
| Positioning decisions (language, assessment, discoverability, fees) | D6 §6 | ✅ | Home, Curriculum, Fees | |
| Design language: earthy tones, avoid cluttered primary-colour look | D6 §7 | ✅ | `styles/index.css` | |
| Brand devices are **not** a curriculum, lesson plan or assessment framework | D6 §8 | ✅ | LBS Way closing note | Stated on the page itself |
| Proof of action for ERP, not written tests, not graded | D6 §8 | ✅ | LBS Way, Curriculum | |
| Legal pages + reserved disclosure slot | D6 §9 | ✅ | 5 policy pages | Wording pending — T-06 |
| Keyword-linking footer block | D6 §9 | ✅ | Footer | |
| Trademark filing deferred | D6 §1, §10 | ✅ | — | No ™ or ® used anywhere |

---

## 7. Website–Curriculum–ERP alignment (D7)

| Requirement | Source | Status | Location | Notes |
|---|---|---|---|---|
| Website (promise) → Curriculum (delivery) → ERP (proof) | D7 §1 | ✅ | Curriculum `#what-you-see` | Communicated as a parent-facing promise |
| SIMPLE shown on the LBS Way page | D7 §2 | ✅ | LBS Way | |
| Little Karmayogis on Home, Legacy, LBS Way, parent comms | D7 §2 | ✅ | Home, LBS Way | |
| Shastri Sanskaar on the LBS Way page | D7 §2 | ✅ | LBS Way | With day-moments |
| Sankalp Calendar on LBS Way + downloadable on Admissions | D7 §2 | ✅ / ⏸️ | LBS Way, Admissions | Download gated — T-09 |
| Value Stories: legacy stories in Phase 1 | D7 §2 | ✅ | `/value-stories` | Phase noted on-page |
| Assessment philosophy on the Curriculum page + FAQ | D7 §2 | ✅ | Curriculum, FAQs | |
| Language positioning on the Curriculum page | D7 §2 | ✅ | Curriculum | |
| Proof-of-action formats (oral / colouring / drawing / craft) | D7 §2 | ✅ | LBS Way, Curriculum | |
| Attainment-level field on every activity record | D7 §2 | ✅ | Curriculum `#what-you-see` | Described as what a parent sees |
| **Honesty bar: every Curriculum claim must be true of practice and visible in ERP** | D7 §3 | ✅ | `CurriculumPage.tsx` header comment; no unverifiable claim on the page | The governing constraint of that page |
| ERP internals not exposed publicly | brief + D7 | ✅ | Curriculum | Parent-facing benefit only; no field names, no screenshots |
| Change-control across all three workstreams | D7 §3 | ✅ | `content-map.md`, `decisions-and-todos.md` | Documented for whoever edits next |
| Real activity names and ERP field mappings | D7 §4 | ❌ | — | The document itself says these do not exist yet |

---

## 8. Shastri Sanskaar & Sankalp Calendar process (D8)

| Requirement | Source | Status | Location | Notes |
|---|---|---|---|---|
| Five habit areas, exactly as named | D8 §2 Step 2 | ✅ | `brand-framework.ts` → `sanskaarHabits` | greetings · respect for elders · table manners · food gratitude · Honesty Shop |
| Sankalp week Monday–Saturday, one pillar a day | D8 §2 Step 3 | ✅ | LBS Way | |
| **Day-to-pillar assignment** | D8 §2 Step 3 | ⚠️ | — | Referenced source section does not exist — **C-01**. Not invented |
| Four proof-of-action formats | D8 §2 Step 4, §1 | ✅ | LBS Way | |
| No lesson plans, no training manuals, no pedagogy manual | D8 §1 | ✅ | LBS Way closing note | Stated publicly |
| Every activity fully self-run | D8 §1 | ✅ | LBS Way `#how-it-is-built` | |
| Never a written test | D8 §1 | ✅ | LBS Way, Curriculum | |
| Scales by age band, same underlying value | D8 §1 | ✅ | LBS Way, Programs | |
| Placeable in NCERT's daily schedule | D8 §1 | ✅ | Curriculum `#the-day` | Slot marked |
| Values framed as reasoning questions | D8 §1, D4 §6 | ✅ | Curriculum `#ethics`, Value Stories | |
| Pilot 2–4 weeks with one class before scaling | D8 §2 Step 6 | ✅ | LBS Way `#how-it-is-built` | Published as a credibility signal |
| Collect informal parent feedback after the pilot | D8 §2 Step 7 | ✅ | LBS Way | "Listen" step |
| Lock, then produce parent and teacher versions | D8 §2 Step 8 | ✅ | LBS Way | "Lock" step |
| ERP field set (8 fields) | D8 §2 Step 5 | ❌ | — | Internal tagging taxonomy; the brief instructs not to expose ERP internals publicly. Recorded in `requirements-audit.md` §N for the ERP team |
| Activity card template (7 fields) | D8 §4 | ❌ | — | Same reason: an internal drafting template, not website content |
| Trademark timing after 1–2 stable terms | D8 §2 Step 9 | ✅ | — | No trademark symbols used |
| Roles and responsibilities | D8 §3 | ✅ | `decisions-and-todos.md` | Owners assigned per open item |
| Actual day-by-day activities | D8 (whole) | ❌ | — | The document is a *method for producing* them; D6 §10 records the workstream as deferred and not started |

---

## 9. Cross-cutting engineering requirements

| Requirement | Status | Location | Notes |
|---|---|---|---|
| Semantic HTML, one `<h1>` per page | ✅ | verified | QA sweep across 29 routes × 5 viewports |
| Heading hierarchy | ✅ | `SectionHeader`, `Accordion` | h1 → h2 → h3, no skips |
| Canonical URLs | ✅ | `Seo.tsx`, prerendered HTML | |
| Open Graph + Twitter cards | ✅ | same | 1200×630 PNG |
| Organization / EducationalOrganization schema | ✅ | `lib/schema.ts` | No fabricated address, rating or award |
| BreadcrumbList schema + visible breadcrumb | ✅ | `Seo.tsx`, `Breadcrumb` | Matched pairs |
| FAQPage schema | ✅ | Home, Curriculum, Admissions, FAQs | Pending answer excluded |
| Course/ItemList schema for classes | ✅ | Programs, Admissions | No price, no rating |
| `robots.txt` + `sitemap.xml` | ✅ | generated at build | AI crawlers explicitly allowed |
| Prerendered `<head>` per route | ✅ | `scripts/prerender-head.mjs` | 28 routes; `<noscript>` fallback |
| Reduced-motion support | ✅ | CSS + every hook | Distances collapse to 0; GSAP never loads |
| Keyboard navigation, focus rings, skip link | ✅ | `styles/index.css`, `Navbar.tsx` | Branded 2px focus ring |
| Focus moved to `<main>` on route change | ✅ | `SiteLayout.tsx` | |
| 44px minimum touch targets | ✅ | `Button.tsx`, nav, form | |
| Form labels, `aria-invalid`, `aria-describedby`, live errors | ✅ | `EnquiryForm.tsx` | |
| Meaningful alt text / `role="img"` labels on illustrations | ✅ | `components/art/` | Decorative art is `aria-hidden` |
| Colour contrast, WCAG AA | ✅ | `styles/index.css`, `Button.tsx` | All text pairs ≥ 4.5:1. Filled buttons use terracotta-600 (5.75:1), not the 500 accent (4.24:1) |
| Skip link is the first tab stop | ✅ | `Navbar.tsx`, `SiteLayout.tsx` | Focus is moved to `<main>` on navigation only, never on first load |
| No horizontal overflow at 320–1920 | ✅ | verified | QA sweep, 5 viewports |
| No console errors or failed requests | ✅ | verified | QA sweep |
| No broken internal links | ✅ | verified | 28 links resolved |
| Code splitting | ✅ | `vite.config.ts`, `App.tsx` | Per-route chunks |
| GSAP loaded lazily | ✅ | `animations/gsap.ts` | 114 kB kept off first paint |
| Horizontal scene pinned by CSS, not GSAP | ✅ | `animations/gsap.ts`, `CurriculumPage.tsx` | See C-11. ScrollTrigger never restructures React-owned DOM |
| Route-level error boundary | ✅ | `pages/ErrorPage.tsx`, `App.tsx` | Replaces React Router's developer screen; nav and footer survive |
| Client-side navigation / teardown pass in QA | ✅ | `scripts/qa.mjs` | Walks 9 route changes in one page, scrolling into each scroll-driven scene before leaving |
| Self-hosted fonts | ✅ | `@fontsource` | No third-party font request |
| No placeholder lorem ipsum | ✅ | — | |
| No fabricated school information | ✅ | — | See `content-map.md` final table |

---

## 10. Not implemented, with reasons

| Item | Source | Why |
|---|---|---|
| ERP field set and activity-card template as public content | D8 §2 Step 5, §4 | Internal tooling. The brief instructs that internal ERP functionality is not exposed publicly; parent-facing benefit is communicated instead. Both are recorded in `requirements-audit.md` §N for the ERP team |
| Real activity names and ERP field mappings | D7 §4 | The Alignment Map itself states these do not exist yet: "it defines the structure to be filled in, not final content" |
| Sankalp day-by-day activities | D8 | The curriculum workstream is recorded as deferred and not yet started (D6 §10) |
| Google Business Profile, Google Ads geo-targeting, local SEO execution | D3 §7 | Campaign operations, not a website deliverable. Separately scoped to Sarvesh |
| Backend upload facility and admin panel | D2 §8, D6 §5 | Application scope beyond a website build. `server.mjs` covers lead capture so nothing is lost meanwhile — T-07 |
| `/best-preschool-indore` locality landing page | D1 §3 | Offered as an alternative to putting Home on that slug, not as an additional page. Home keeps `/` — C-08 |
| Photographs of children, classrooms or campuses | D2 §7, D6 §7, D5 §6 | Phase 1 is illustration-only by explicit instruction; photographing a school that is not open would be the overclaim the documents forbid — C-04 |

---

## 11. Blocked on missing input

Everything below is built and rendering an honest state. None of it is faked.

| Item | Register ID | Owner |
|---|---|---|
| Public phone, WhatsApp, email, address, Maps link | T-01 | SEP / Sarvesh |
| Admission ages per class | T-02 | SEP |
| Family and founder messages and photographs | T-03 | Adarsh Shastri |
| LBS Legacy narrative approval | T-04 | Adarsh Shastri / SEP |
| Logo artwork | T-05 | Source Advertising |
| Legal page wording | T-06 | SEP + counsel |
| ERP intake endpoint and admin panel | T-07 | Sarvesh |
| Social profile URLs | T-08 | Source Advertising |
| Brochure, academic calendar, printable Sankalp Calendar | T-09 | SEP / Source Advertising |
| Sankalp day-to-pillar mapping | C-01 | SEP |
| NCERT schedule conduct-column pairing | C-02 | SEP |
