# Content Map

Every piece of website content traced to its originating PDF. Source codes are as in
`requirements-audit.md` (D1–D8).

> **Superseded in places, 10–11 September 2026.** Twelve page-level content specifications arrived
> after this map was written, and where they speak they are the source of truth:
>
> | Doc | Page | Route |
> | --- | --- | --- |
> | D09 | Home | `/` |
> | D10 | LBS Legacy | `/lal-bahadur-shastri-legacy` |
> | D11 | The Lal Bahadur Shastri Way | `/the-lal-bahadur-shastri-way` |
> | D12 | A Message from the Family | `/message-from-the-lal-bahadur-shastri-family` |
> | D13 | Curriculum & Learning Approach | `/curriculum-nep-2020-activity-based-learning` |
> | D14 | Programs & Classes | `/programs-and-classes` |
> | D11b | Founder's Note | `/founders-note` |
> | D16 | Value Stories | `/value-stories` |
> | D17 | Parenting Tips & Resources | `/parenting-tips-and-resources` |
> | D18 | Fees & Admissions | `/preschool-fees-indore` |
> | D19 | FAQs | `/faqs` |
> | D20 | Contact Us | `/contact-us` |
>
> **A note on the numbering.** The second batch renumbers the series: its `11` is the Founder's
> Note, not The LBS Way, and its `14` and `15` are Curriculum and Programs, which the first batch
> numbered `13` and `14`. The D-codes above follow each document's own filename, so "D11" is
> ambiguous on its own and is written **D11b** wherever the Founder's Note is meant.
>
> **Slugs are not taken from these documents.** Several propose shorter URLs (`/lbs-legacy`,
> `/curriculum`, `/fees-and-admissions`). The live slugs are the keyword-bearing ones named in Full
> Website Sitemap §3, they are in `sitemap.xml` and in every canonical tag, and D14 §8 itself leaves
> the final slug to be confirmed rather than asserting one. Changing them would cost the indexed URL
> for no gain, so they stand.
>
> The copy on all twelve pages is now transcribed from those documents, so their rows below are
> historical. Four things they changed that ripple past their own pages, and that the rows below
> still record the old version of:
>
> - **Zones are five, not three.** Rau / CAT Road, Kanadia Road, Annapurna / Sudama Nagar,
>   Mahalaxmi Nagar / Nipania, Vijay Nagar. Bicholi Mardana is not among them. (D09 §3.7)
> - **Playgroup is 2 to 3 years**, and D14 §1 instructs the Home snapshot to be corrected to match.
>   Admission ages are LBS KidZ's own now rather than NCERT's reference model. (D14 §3)
> - **The Honesty Shop is out of this build** entirely, by instruction, until a campus exists.
>   (D11 §8, restated D16 §8)
> - **The FAQ set is fourteen questions in four groups**, not the six-question starter set from
>   Keyword & AEO Strategy §6. All six originals survive inside it, four of them reworded. The
>   Curriculum page keeps its own five, because D14 §12 and D19 §7 each demand their own wording
>   verbatim and the two sets differ. (D19 §3)
>
> Everything the twelve documents supply is **Verbatim** but for punctuation: no em dash appears in
> published copy on this site, so em-dash sentence breaks in the sources are set as commas, colons
> or full stops. `scripts/content-audit.mjs` loads all twelve pages in a real browser and fails if
> any of them loses a required phrase, gains a forbidden one, or gains an em dash.

A fourth column marks provenance:

- **Verbatim** — transcribed from the source, wording preserved
- **Faithful** — source facts, rephrased for readability with no change of meaning
- **Editorial** — written for this site, making no factual claim beyond what the source supports
- **Public record** — widely documented public history about a public figure, not a school claim
- **Pending** — deliberately left empty; the source names it as an open dependency

---

## Global

| Content | Where | Source | Provenance |
|---|---|---|---|
| Brand name "LBS KidZ" | everywhere | D2 header | Verbatim |
| Domain `https://lbskidz.com` | canonical URLs, schema, sitemap.xml | D2 header, §8 | Verbatim |
| "A preschool brand under LBSKidZ Group Indore… partnership between School Excellence Program Pvt. Ltd. and Lal Bahadur Shastri Educational Society" | Footer, Founder's Note, Contact, Organization schema | D2 §1 | Faithful |
| Copyright line | Footer | D1 §2.5 | Verbatim |
| Nav structure and order | `src/data/navigation.ts` | D1 §1.1, §1.2 | Verbatim |
| Footer blocks 2.1–2.5 | Footer | D1 §2 | Verbatim structure |
| "Explore" keyword links (6 phrases, + 3 zones in Phase 2) | Footer | D1 §3 | Verbatim |
| Register Interest → Enquire Now label switch | CTA everywhere | D1 §1.1/§1.2, D6 §4 | Verbatim |
| Wheat-stalk motif, "used quietly, never literally or politically" | Site-wide illustration | D2 §7, D6 §7 | Faithful |
| Palette: khadi white, warm terracotta, deep blue, soft earthy tones | `src/styles/index.css` | D2 §7, D6 §7 | Faithful |
| "Short-form emotional copy over long paragraphs" | Copy length throughout | D2 §7 | Faithful |

---

## Home — `/`

| Content | Source | Provenance |
|---|---|---|
| Functional, local H1 and title; tagline below the fold | D3 §3 (Home row) | Faithful |
| "Little Karmayogis in the making" tagline | D6 §1 (identity name) | Editorial |
| Three positioning pillars: no examinations / mother tongue first / no hidden charges | D6 §6, D2 §3 | Faithful |
| "Most schools describe their values. Ours are somebody's biography." | D5 §4, §7 — no researched brand has an authentic ownable origin story; "trust/values/excellence/child-centric" carry little weight | Editorial |
| Deliberate-choices list (avoided vs instead) | D5 §6 | Faithful |
| Legacy moments (4 cards) | D2 §6; biography facts | Public record |
| Language positioning section | D4 §3, D6 §6 | Faithful |
| Daily schedule, 8 blocks with the Sankalp moment marked | D4 §4 | Verbatim |
| Programs: Playgroup, Nursery, LKG, UKG | D6 §2, D4 §8 | Verbatim |
| SIMPLE six pillars | D6 §1 (names), summaries Editorial | Verbatim + Editorial |
| Little Karmayogis card | D6 §1, D5 §5 | Faithful |
| Sankalp Calendar card | D6 §1, D8 §2, D4 §4 | Faithful |
| Value Stories preview | D7 §2, D5 §3 | Editorial on documented material |
| Parity layer grid (9 rows) | D2 §4 table | Verbatim |
| Campus zones | D1 §3, D3 §8 | Verbatim |
| Reflection close | D4 §4, D6 §8 | Faithful |
| FAQ shortlist (4) | D3 §6 | Faithful |

---

## Curriculum & Learning Approach — `/curriculum-nep-2020-activity-based-learning`

| Content | Source | Provenance |
|---|---|---|
| Page purpose as primary AEO anchor; only page carrying Tier B/C | D3 §3, §4 | Structural |
| "We describe our own practice and name NCERT as the source" framing | D3 §4, D1 §1.1 | Faithful |
| Four reference documents named | D4 header | Verbatim |
| Four alignment claims (play-based, mother tongue, no exams, FLN) | D4 §2, §3, §5; D2 §5.1 | Faithful |
| Activity-based learning description | D3 §6 Q2, D4 §2 | Faithful |
| Daily schedule, 8 blocks, method-of-conduct labels where unambiguous | D4 §4 | Verbatim |
| 4 hours/day, Mon–Fri, Saturday for teacher planning | D4 §4 | Verbatim |
| Four programme-planning principles | D4 §4 | Verbatim |
| Beginner / Progressive / Proficient with definitions | D4 §5 (HPC Teacher Guide) | Verbatim |
| Five assessment principles | D4 §5 | Verbatim |
| "What you will never see": mark, grade, rank, written test | D4 §5, D6 §6, D8 §1 | Faithful |
| Neutral icon system rather than numeric scores | D4 §5 | Verbatim |
| Language headline, practice and four supporting reasons | D4 §3 | Verbatim (all four reasons) |
| "NCF-FS and the Guidelines are emphatic (not a mild suggestion)" | D4 §3 | Faithful |
| 13 Curricular Goals, six domains | D4 §1 | Verbatim |
| Panchakosha table with Devanagari and transliteration | D4 §1 | Verbatim + Devanagari added |
| Ten guiding principles | D4 §2 | Verbatim |
| Two ethical-reasoning questions | D4 §6 | Verbatim |
| Ethics note: reasoning, not moralising or lecturing | D4 §6 | Faithful |
| "What reaches you" parent updates | D2 §4, D7 §2 | Faithful, ERP internals withheld |
| Family involvement principle and three practices | D4 §9 | Verbatim |
| FAQ block, 6 questions | D3 §6 | Faithful |
| FAQPage JSON-LD | D3 §6 | Structural |

---

## LBS Legacy — `/lal-bahadur-shastri-legacy`

| Content | Source | Provenance |
|---|---|---|
| Page purpose: "the story of Shri Lal Bahadur Shastri himself" | D2 §6, D6 §3 | Structural |
| Born 2 October 1904, Mughalsarai; dropped caste surname; took "Shastri" after his degree | Public record | Public record |
| Second Prime Minister of India, 1964–1966 | Public record | Public record |
| "Jai Jawan Jai Kisan"; the 1965 appeal to skip one meal a week, tried in his own household first | Public record; motif basis in D2 §7 | Public record |
| Personal simplicity | Public record; D6 §1 (Simplicity pillar) | Public record |
| Six SIMPLE pillars restated | D6 §1 | Verbatim names |
| Wheat-stalk motif explanation, tied to food respect and farmer gratitude | D2 §7, D6 §7 | Faithful |
| CG-5 and CG-6 cited explicitly for food-gratitude content | D4 §10 | Verbatim requirement |
| Notice that the page is under family review | D8 §3 (Adarsh Shastri reviews legacy authenticity and tone), D2 §10 | Pending |
| Light Tier D keyword presence only, no Tier A/B | D3 §3 | Structural |

---

## The Lal Bahadur Shastri Way — `/the-lal-bahadur-shastri-way`

| Content | Source | Provenance |
|---|---|---|
| Page houses SIMPLE, Little Karmayogis, Shastri Sanskaar, Sankalp Calendar | D1 §1.1 | Structural |
| No Tier A/B/C keywords forced here | D3 §3 | Structural |
| SIMPLE = Simplicity, Integrity, Mindfulness, Patriotism, Leadership, Empathy | D6 §1 | Verbatim |
| Pillar one-line summaries | — | Editorial, no factual claim |
| Integrity delivered via reasoning questions, not rules | D4 §6 | Verbatim requirement |
| Empathy mapped to CG-5 (Seva) and CG-6 (environment) | D4 §1, §10 | Verbatim |
| Little Karmayogis: identity name, used in classroom and parent communication | D6 §1, D7 §2 | Verbatim |
| "Very few give students a distinct identity" rationale | D5 §1, §5 | Faithful |
| Shastri Sanskaar: five habit areas — greetings, respect for elders, table manners, food gratitude, Honesty Shop | D8 §2 Step 2 | Verbatim |
| Habit day-moments: Welcome Circle, mealtime, free-play | D7 §2 | Verbatim |
| Sankalp Calendar: Monday–Saturday, one pillar a day | D8 §2 Step 3 | Verbatim |
| Value moment at Goodbye Circle / Reflection Time | D4 §4, D6 §8, D7 §2 | Verbatim |
| Take-home tool | D7 §2, D4 §9 | Verbatim |
| Four proof-of-action formats | D8 §1, Step 4 | Verbatim |
| Which weekday carries which pillar | **Not stated** | Pending — see C-01 |
| Four non-negotiable constraints | D8 §1 | Verbatim |
| Four-stage process: Draft, Pilot, Listen, Lock | D8 §2 Steps 6–8 | Faithful |
| Closing note that these are communication devices, not a curriculum | D6 §8 | Verbatim requirement |

---

## A Message from the Lal Bahadur Shastri Family — `/message-from-the-lal-bahadur-shastri-family`

| Content | Source | Provenance |
|---|---|---|
| Anil Shastri (son), Manju Shastri (daughter-in-law) — blessing / moral authority | D2 §6, D6 §3 | Verbatim |
| Lagan Shastri, Mudit Shastri (grandsons) — family presence, continuity | D2 §6, D6 §3 | Verbatim |
| Reverent, historical tone | D2 §6 | Verbatim requirement |
| Precedent note (Indian schools named after real individuals carry a distinct message) | D5 §2 | Faithful |
| **Every personal message** | D2 §6, D6 §3, §10 | **Pending** |
| **Every photograph** | D2 §6, D6 §10 | **Pending** |

---

## Founder's Note — `/founders-note`

Rewritten from D11b. Rows marked *superseded* record what stood here before it arrived.

| Content | Source | Provenance |
|---|---|---|
| "A Note from Our Founder" / "Adarsh Shastri, grandson of Shri Lal Bahadur Shastri Ji" | D11b §3 S1 | Verbatim |
| The letter, six paragraphs | D11b §3 S2 | Verbatim |
| Seven bold phrases, as weight not colour | D11b §3, §4 | Verbatim, bold runs read from the source file |
| Signature: "With warmth, / Adarsh Shastri / Founder, LBSKidZ" | D11b §3 S3 | Verbatim |
| Closing link to Curriculum | D11b §3 S4 | Verbatim |
| Letter is a draft pending his review | D11b header, §8 | Recorded in T-03, not shown to readers |
| SEP and LBS Group described | D2 §1 | Faithful |
| *Superseded:* "Authorized Representative" as his title | D2 §6 | Replaced by his own sign-off |
| *Superseded:* the "this note is being written" state | D2 §6 | Closed by D11b |
| **His photograph** | D11b §4, §8 | **Pending — reserved frame drawn at full size** |

---

## Value Stories — `/value-stories`

Rewritten from D16. Three stories became six, one per SIMPLE pillar.

| Content | Source | Provenance |
|---|---|---|
| "Where a Value Actually Begins" and its subheading | D16 §3 S1 | Verbatim |
| Six stories: pillar tag, kicker, title, two paragraphs, question | D16 §3 S2–S7 | Verbatim |
| Alternating image/text sides, question as a tinted callout | D16 §4 | Verbatim requirement |
| Jump-to-pillar quick nav, six anchors | D16 §4 | Verbatim requirement |
| Closing link to The LBS Way | D16 §5 | Faithful |
| Brand-tier keywords only, no conversion CTA | D16 §1, §7 | Verbatim requirement |
| **Honesty Shop story** | D16 §8 | **Deliberately excluded; audit enforces it** |
| *Superseded:* the three Phase 1 stories, incl. the Honesty Shop | D7 §2, D8 §2 | Replaced by D16's six |

---

## Parenting Tips & Resources — `/parenting-tips-and-resources`

Rewritten from D17. Six cards became twelve.

| Content | Source | Provenance |
|---|---|---|
| "Helpful Whether or Not You Ever Enrol With Us" and its subheading | D17 §3 S1 | Verbatim |
| Twelve tip cards: category tag, title, intro, bullets | D17 §3 S2–S13 | Verbatim |
| Three categories, each with its own accent tint | D17 §4 | Verbatim requirement |
| Light closing prompt to Curriculum, no CTA inside any card | D17 §5 | Verbatim requirement |
| **No NEP 2020 / policy language anywhere in the page body** | D3 §5, D17 §1 | **Verbatim exclusion; audit enforces it** |

---

## Campuses — `/preschool-in-indore-campuses`

| Content | Source | Provenance |
|---|---|---|
| "Launching Soon in Indore", zone-level only in Phase 1 | D2 §5.1, D6 §4 | Verbatim |
| Zones: Kanadia Road, Rau, Bicholi Mardana | D1 §3, D3 §8 | Verbatim |
| Zone keyword phrases | D1 §3 | Verbatim |
| Safety standards, 11 items in 3 groups | D4 §7 (NCERT Guidelines Ch. 6) | Verbatim |
| PTR note | D4 §7 | Faithful |
| Classroom environment as the third educator; themed learning walls, activity corners | D5 §3 | Verbatim |
| Phase note explaining the absence of addresses and photographs | D5 §6, D6 §4 | Editorial |

---

## Admissions group

### `/preschool-admission-indore`

| Content | Source | Provenance |
|---|---|---|
| Present from Phase 1 so a parent knows what they are registering interest in | D2 §5.1 | Structural |
| Class structure summary | D4 §8, D6 §2 | Verbatim |
| Fee commitment summary | D2 §4, D6 §6 | Verbatim |
| Sankalp Calendar as downloadable lead magnet | D7 §2 | Verbatim (download gated to Phase 2) |
| Genuine FAQ block, Tier C questions | D2 §4, D3 §3 | Faithful |

### `/programs-and-classes`

| Content | Source | Provenance |
|---|---|---|
| Playgroup, Nursery, LKG, UKG | D6 §2 | Verbatim |
| NCERT model: 3 years before Class I, ages 3–6, Preschool I/II/III | D4 §8 | Verbatim |
| Playgroup typically 1.5–3, standard industry practice beyond NCERT's scope | D4 §8 | Verbatim |
| Class-level sections for age-specific search capture | D3 §3 | Structural |
| Per-class focus lists | D4 §1, §4 | Faithful |
| **LBS KidZ's own admission ages** | D3 §6 | **Pending — see T-02** |
| Attainment levels for progression | D4 §5 | Verbatim |

### `/preschool-fees-indore` — Fees & Admissions

Rewritten from D18, which adds a fifth section the page did not have.

| Content | Source | Provenance |
|---|---|---|
| "One Fee. Nothing Added Later." and its subheading | D18 §3 S1 | Verbatim |
| Five inclusions, each with its own one-line description | D18 §3 S2 | Verbatim |
| "Why You Won't See a Fee Table on This Page", incl. "in writing, the same day you ask" | D18 §3 S3 | Verbatim |
| "What we'll tell you", three lines | D18 §3 S3 | Verbatim |
| "Ask Us for the Fee" enquiry form | D18 §3 S4 | Verbatim |
| **NEW SECTION:** "What Happens After You Ask", three steps | D18 §3 S5 | Verbatim |
| Steps reuse the Register Interest component, not a second pattern | D18 §4 | Verbatim requirement |
| Fee-on-demand rationale | D6 §6, D2 §2.1 | Faithful |
| **Framing against other schools** | D18 §1 | **Forbidden; audit enforces it** |
| **Any fee figure, "even as an example"** | D18 §8 | **Never published; audit enforces it** |
| *Superseded:* "Five things other schools bill you for separately" | — | Removed: D18 §1 forbids the comparison |

### `/faqs`

Rewritten from D19. Six questions became fourteen, in four groups.

| Content | Source | Provenance |
|---|---|---|
| "Questions Parents Actually Ask" and its subheading | D19 §3 S1 | Verbatim |
| Curriculum & Learning, five questions | D19 §3 S2 | Verbatim |
| Admissions & Fees, five questions | D19 §3 S3 | Verbatim |
| Campuses, three questions | D19 §3 S4 | Verbatim |
| General, one question | D19 §3 S5 | Verbatim |
| Category headers stay visible while answers are collapsed | D19 §4 | Verbatim requirement |
| Every Q and A in the HTML even when collapsed | D19 §4 | Verbatim requirement |
| FAQPage JSON-LD over all fourteen | D19 §7 | Verbatim requirement |
| Closing prompt to Contact Us | D19 §5 | Faithful |
| **"Who runs LBS KidZ?"** | D19 §8 | **Excluded pending a confirmed legal-structure line** |
| *Superseded:* "What age can my child join?" as a pending answer | D3 §6 | Answered outright since D14 set the ages |

---

## Contact Us — `/contact-us`

Rewritten from D20.

| Content | Source | Provenance |
|---|---|---|
| "Get in Touch" and its subheading | D20 §3 S1 | Verbatim |
| "Send Us a Message" enquiry form | D20 §3 S2 | Verbatim |
| "Where We Are", five zones, "See All Five Zones" | D20 §3 S3 | Verbatim |
| "Reaching Us Directly", stated as a note rather than an apology | D20 §3 S4, §4 | Verbatim |
| Form one side, two supporting panels the other | D20 §4 | Verbatim requirement |
| "Who runs LBS KidZ" panel | D2 §1 | Faithful; kept, not in D20's layout |
| **Phone, WhatsApp, email, address, Maps link** | D1 §2.1 requires them; D20 §8 confirms not yet live | **Pending — see T-01** |

---

## Register Interest — `/register-interest`

| Content | Source | Provenance |
|---|---|---|
| Persistent Phase 1 conversion action | D1 §1.1, D6 §4 | Verbatim |
| "No data loss, no restart" promise to the parent | D6 §4 | Faithful |
| Form fields (class, zone) drawn from documented class and zone lists | D6 §2, D1 §3 | Structural |

---

## Legal pages

| Page | Source requiring it | Content provenance |
|---|---|---|
| Privacy Policy | D1 §2.3, D6 §9 | Editorial, describes only what this site actually does; flagged for legal review |
| Terms & Conditions | D1 §2.3, D6 §9 | Editorial; the "not an authority on government policy" clause restates D3 §4 |
| Refund & Cancellation Policy | D1 §2.3 ("registration/admission fee terms") | Editorial; states plainly that no fee is currently collected |
| Child Protection Policy | D1 §2.3 — "a plain-language statement of safeguarding commitments… POCSO-related governance… a trust signal" | Faithful to D4 §7 safety list; committee composition marked pending |
| Mandatory Public Disclosure | D1 §2.3, D6 §9 | Verbatim rationale; page is inactive and `noindex` until CBSE affiliation |

---

## Phase 2 reserved pages

Gallery, Our Educators, Events & News, Testimonials, Admission Process, Careers, Downloads.

Each states plainly why it is empty. Sources: D6 §4 (phasing), D5 §6 (do not overclaim before it is
real), D2 §4 (testimonials collected once families are enrolled; educators once appointed).
All are `noindex` and excluded from `sitemap.xml` at Phase 1.

---

## Content deliberately NOT written

| Would have been | Why not | Source |
|---|---|---|
| Family and founder messages | Pending from the family via Adarsh Shastri | D2 §6, D6 §3, §10 |
| Any testimonial | No enrolled families exist | D2 §4 |
| Educator names, photos, credentials | Team not yet appointed | D2 §4 |
| Campus addresses, photos, maps, virtual tours | Phase 2 | D6 §4, D5 §6 |
| Fee figures | Fee-on-demand | D6 §6 |
| Admission ages per class | Explicitly unfinalised | D3 §6 |
| Sankalp day-to-pillar map | Referenced section absent from source | D8 §2 Step 3 → see C-01 |
| Sankalp day-by-day activities | Curriculum workstream deferred, not started | D6 §10 |
| NEP 2020 explainer articles | "No separate explainer blog articles are needed for this keyword tier" | D3 §4 |
| Accreditation, UDISE, affiliation numbers | Displayed "once available" | D2 §4 |
| Awards, statistics, achievements | Never claimed in any document | — |
| "Our Journey" progress page | Admin-only, never public | D6 §2 |
