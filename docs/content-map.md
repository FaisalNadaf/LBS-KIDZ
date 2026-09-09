# Content Map

Every piece of website content traced to its originating PDF. Source codes are as in
`requirements-audit.md` (D1–D8).

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

| Content | Source | Provenance |
|---|---|---|
| Adarsh Shastri, grandson, Authorized Representative | D2 §6, D6 §3 | Verbatim |
| Practical and forward-looking tone | D2 §6 | Verbatim requirement |
| SEP and LBS Group described | D2 §1 | Faithful |
| **His personal message and photograph** | D2 §6, D6 §10 | **Pending** |

---

## Value Stories — `/value-stories`

| Content | Source | Provenance |
|---|---|---|
| Purpose: show how a value is learned, not state that it is taught | D5 §3, §5 (Reggio Emilia) | Verbatim requirement |
| Phase 1 = general/legacy stories; classroom moments in Phase 2 | D7 §2 | Verbatim |
| "The meal that was not eaten" (Empathy) | Public record + D4 §10 CG-5 | Public record + Editorial framing |
| "Two people on the same line" (Patriotism) | Public record | Public record + Editorial framing |
| "A shop with nobody behind the counter" (Integrity) | D8 §2 Step 2 (Honesty Shop), D4 §6 | Faithful + Editorial framing |
| Each story closes on a reasoning question | D4 §6 | Verbatim requirement |
| Tier D primary keywords | D3 §3 | Structural |

---

## Parenting Tips & Resources — `/parenting-tips-and-resources`

| Content | Source | Provenance |
|---|---|---|
| Scope: activity ideas, preschool readiness, common early-years concerns | D1 §1.1, D3 §5 | Verbatim |
| **No NEP 2020 / policy keywords** | D3 §5 | Verbatim exclusion |
| "Play is not a break from learning" | D4 §2 (play primary; indigenous/local material) | Faithful |
| "Should we speak English at home?" | D4 §3 | Faithful |
| "What preschool readiness actually means" | D4 §5 | Faithful |
| "My child is behind their cousin" | D4 §2, §5 | Faithful |
| "Talking to a small child about right and wrong" | D4 §6 | Faithful |
| "Reading together before a child can read" | D4 §4 (language block) | Faithful |

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

### `/preschool-fees-indore`

| Content | Source | Provenance |
|---|---|---|
| "No hidden charges" leads the page, not a fee table | D3 §3, D6 §6 | Verbatim requirement |
| Books, bag, uniform, lunch box, water bottle included | D2 §4, D6 §6 | Verbatim |
| Fee-on-demand rationale | D6 §6, D2 §2.1 | Faithful |
| "None publish exact fee figures publicly; shared in writing on enquiry/campus visit" | D2 §2.1 | Faithful |
| **Any fee figure** | — | **Never published** |

### `/faqs`

| Content | Source | Provenance |
|---|---|---|
| Six questions and answers | D3 §6 | Faithful |
| "What age can my child join?" answered as pending | D3 §6 (`[To be finalized]`) | Pending |
| FAQPage JSON-LD, excluding the pending answer | D3 §6 | Structural |

---

## Contact Us — `/contact-us`

| Content | Source | Provenance |
|---|---|---|
| Enquiry form | D6 §4 (leads carry forward) | Structural |
| Zones served | D1 §3 | Verbatim |
| **Phone, WhatsApp, email, address, Maps link** | D1 §2.1 requires them; **no document supplies them** | **Pending — see T-01** |

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
