# LBS KidZ Website — Requirements Audit

Derived from a full read of all eight source PDFs. Every requirement below cites its source.
Source shorthand used throughout:

| Code | Document |
|------|----------|
| **D1** | 01. LBS_KidZ_Full_Website_Sitemap.pdf |
| **D2** | 02. LBS_KidZ_Website_Reference_Document.pdf |
| **D3** | 03. LBS_KidZ_Keyword_AEO_Strategy.pdf |
| **D4** | 04. NCERT_Curriculum_Summary_Takeaways.pdf |
| **D5** | 05. Global_Indian_Preschool_Research_Summary.pdf |
| **D6** | 06. LBS_KidZ_Project_Decisions_Log.pdf |
| **D7** | 07. Website_Curriculum_ERP_Alignment_Map.pdf |
| **D8** | 08. Process_Guidelines_Shastri_Sanskaar_Sankalp_Calendar.pdf |

A note on scope: the documents define **two phases**. Phase 1 is explicitly the current state
("Phase 1 (soft launch, current)", D6 §4). This build ships Phase 1 live, with every Phase 2 route,
nav slot and URL reserved and switchable by a single flag. See §V.

---

## A. Complete sitemap

Source: D1 §1.1–1.3, D2 §5, D6 §2.

### Primary navigation — Phase 1

```
[Logo]  Home  |  Shastri Ji Legacy ▾  |  Curriculum & Learning Approach  |  For Parents ▾
        |  Campuses  |  Admissions ▾  |  Contact Us  |  [ Register Interest ]
```

| Nav slot | Type | Children |
|---|---|---|
| Home | standalone | — |
| Shastri Ji Legacy | dropdown | LBS Legacy · The Lal Bahadur Shastri Way · A Message from the Lal Bahadur Shastri Family · Founder's Note |
| Curriculum & Learning Approach | standalone, **never nested** | — |
| For Parents | dropdown | Value Stories · Parenting Tips & Resources |
| Campuses | standalone in Phase 1 → dropdown in Phase 2 | per-campus pages (Phase 2) |
| Admissions | dropdown | Programs & Classes · Fees & Admissions · FAQs · *Admission Process (Phase 2)* |
| School Life | **dropdown, Phase 2 only** | Gallery · Our Educators · Events & News · Testimonials |
| Contact Us | standalone | — |
| Register Interest | **CTA button, not a nav item** | relabels to "Enquire Now" in Phase 2 |

D1 §1.2 is explicit: "Phase 2 does not restructure the navbar… No nav item changes position or URL
between phases." Careers is footer-only in both phases, never in the navbar.

### Page-to-phase table (D1 §1.3, reproduced)

| Page | Phase |
|---|---|
| Home | 1 |
| LBS Legacy | 1 |
| The Lal Bahadur Shastri Way | 1 |
| A Message from the Lal Bahadur Shastri Family | 1 |
| Founder's Note | 1 |
| Curriculum & Learning Approach | 1 |
| Value Stories | 1 |
| Parenting Tips & Resources | 1 |
| Campuses (zone-level → real addresses) | 1→2 |
| Programs & Classes | 1 |
| Fees & Admissions | 1 |
| FAQs | 1 |
| Admission Process | 2 |
| Register Interest → Enquire Now | 1→2 |
| Gallery | 2 |
| Our Educators | 2 |
| Events & News | 2 |
| Testimonials | 2 |
| Contact Us | 1 |
| Careers (optional, footer only) | 2 |

### Explicitly excluded from the public site

- **"Our Journey" / internal project or progress tracking** — admin-only, never public-facing (D6 §2, D2 §5.3).

### Footer (D1 §2)

1. **School Information** — logo, short tagline, address, phone, WhatsApp click-to-chat, email, Google Maps "Get Directions", social icons (Instagram, Facebook, YouTube).
2. **Quick Links** — Home · Curriculum & Learning Approach · LBS Legacy · Admissions · Contact Us · Sitemap.
3. **Legal & Compliance** — Privacy Policy · Terms & Conditions · Refund & Cancellation Policy · Child Protection Policy · Mandatory Public Disclosure (reserved, inactive until CBSE affiliation).
4. **Utility** — Careers (once relevant) · FAQs · Downloads (once available).
5. **Copyright** — "© [2026] LBS KidZ, powered by School Excellence Program Pvt. Ltd. All rights reserved."
6. **"Explore" keyword-linking block** — separate from Quick Links, using full keyword phrases as the link text (D1 §3). Treated as a living element, extended per zone in Phase 2.

### URL structure (D1 §3)

Fixed build requirement: "descriptive, keyword-bearing URLs over /page1, /about-2". Named examples:
`/curriculum-nep-2020-activity-based-learning` (or shorter `/curriculum`), `/best-preschool-indore`,
`/preschool-admission-indore`, `/blog/nep-2020-preschool-guide`.

Also required: a **plain HTML sitemap page**, distinct from the XML sitemap, linked in the footer (D1 §4).

---

## B. Every required page

Twenty pages plus the reserved disclosure slot. Fifteen are Phase 1 and live; seven are Phase 2 and reserved.

**Phase 1 (live):** Home · LBS Legacy · The Lal Bahadur Shastri Way · A Message from the Lal Bahadur Shastri Family · Founder's Note · Curriculum & Learning Approach · Value Stories · Parenting Tips & Resources · Campuses · Admissions · Programs & Classes · Fees & Admissions · FAQs · Contact Us · Register Interest · Sitemap (HTML) · Privacy Policy · Terms & Conditions · Refund & Cancellation Policy · Child Protection Policy

**Reserved (Phase 2):** Admission Process · Gallery · Our Educators · Events & News · Testimonials · Careers · Downloads · Mandatory Public Disclosure

---

## C. Every required section

### Home
Entry point, "brief of the whole brand" (D2 §5.1). H1 and meta must be **functional and local**;
the brand tagline sits **below the fold** (D3 §3).

### Curriculum & Learning Approach — the primary AEO anchor
Required content (D2 §5.1, D3 §4, D4):
- A section stating LBS KidZ's alignment with NEP 2020 / NCF-FS **in plain language, with specific examples of daily practice, not an abstract policy summary**
- Activity-based and play-based learning
- No formal examinations; Beginner / Progressive / Proficient
- Foundational literacy and numeracy
- Mother-tongue foundation with English exposure
- Safety standards
- FAQ schema block using Tier C questions, **each answered from LBS KidZ's own practice**
- **No separate "explainer" blog articles** for this keyword tier (D3 §4)

### The Lal Bahadur Shastri Way
Houses SIMPLE, Little Karmayogis, Shastri Sanskaar, Sankalp Calendar (D1 §1.1).

### Campuses
Zone-level in Phase 1 ("Launching Soon in Indore"); real addresses, photos, maps in Phase 2.
Dedicated **Safety & Well-being** section (D2 §4).

### Admissions group
Class structure and a fee-on-demand commitment with "no hidden charges", present from Phase 1
"so a parent knows what they are registering interest in" (D2 §5.1). Genuine FAQ block from Phase 1 (D2 §4).

### Family / Founder pages
Three-tier structure with distinct tone: LBS Legacy (story) → Family Message (reverent, historical)
→ Founder's Note (practical, forward-looking) (D2 §6).

---

## D. Every CTA

| CTA | Where | Source |
|---|---|---|
| **Register Interest** | Persistent on every page. Colour-filled, visually distinct, right-aligned, outside the dropdown structure | D1 §1.1 |
| **Enquire Now** | Same button, relabelled in Phase 2 | D1 §1.2, D6 §4 |
| Admissions / Book a Visit | Primary CTA shifts here in Phase 2 | D6 §4 |
| Google Maps "Get Directions" | Footer | D1 §2.1 |
| WhatsApp click-to-chat | Footer | D1 §2.1 |
| Brochure / academic calendar download | Phase 2 | D1 §2.4 |
| Sankalp Calendar download | Lead magnet on the Admissions page | D7 §2 |

---

## E. Every content block

- Positioning: legacy differentiator + full parity layer (D2 §3, §4)
- Language: mother-tongue-first, **not** English-medium-first (D2 §3, D4 §3, D6 §6)
- Assessment: no formal exams at any stage (D2 §3, D4 §5, D6 §6)
- Safety: specific concrete terms, not generic reassurance (D2 §3, D4 §7)
- Fee: fee-on-demand + "no hidden charges" covering books, bag, uniform, lunch box, water bottle (D2 §4, D6 §6)
- SIMPLE: Simplicity, Integrity, Mindfulness, Patriotism, Leadership, Empathy (D6 §1)
- Little Karmayogis: student/family identity name (D6 §1)
- Shastri Sanskaar: five habit areas — greetings, respect for elders, table manners, food gratitude, Honesty Shop (D8 §2 Step 2)
- Sankalp Calendar: daily/weekly rhythm, Monday–Saturday, one pillar a day, at Goodbye Circle / Reflection Time (D6 §1, D8 §2 Step 3, D4 §4)
- 13 Curricular Goals across 6 domains; Panchakosha mapping (D4 §1)
- 10 guiding principles (D4 §2)
- Daily schedule, 8 blocks; 4 hrs/day; Mon–Fri (D4 §4)
- Ethical reasoning questions: "Will this hurt somebody?" / "Is this a good thing to do?" (D4 §6)
- Family involvement practices (D4 §9)
- Classroom environment as "the third educator" (D5 §3)

---

## F. Curriculum requirements

Governed by D4 and D7.

- **Framing rule (non-negotiable):** LBS KidZ states its own practice and cites NCERT as the source. It does **not** interpret or explain government policy on its own authority (D1 §1.1, D2 §5.1, D3 §4, D6 §6).
- Panchakosha → modern domains mapping (D4 §1)
- CG-1 … CG-13 across Physical, Socio-Emotional and Ethical, Cognitive, Language and Literacy, Aesthetic and Cultural, Positive Learning Habits
- **CG-5 (Seva) and CG-6 (environment) must be cited explicitly** when describing Empathy / food-respect content (D4 §10)
- Ten guiding principles, treated as non-negotiable design principles (D4 §2)
- Language policy exactly as in D4 §3, including the four supporting reasons
- Daily schedule and programme duration (D4 §4); Sankalp moment placed at Goodbye Circle / Reflection Time
- Assessment philosophy and attainment levels (D4 §5); neutral icon system rather than numeric scores
- Ethics framed as reasoning questions, not rules recited (D4 §6)
- Safety list, Chapter 6, usable directly as website content (D4 §7)
- Class structure: Playgroup, Nursery, LKG, UKG; NCERT's model is 3 years, ages 3–6; Playgroup extends one year earlier, typically 1.5–3, which is standard industry practice beyond NCERT's scope. Worth clarifying in parent-facing content how classes map to recognised age bands (D4 §8)
- PTR matters more in early years, but never achieved by hiring underqualified staff (D4 §7)

---

## G. Parent-facing requirements

Trust, clarity, curriculum, safety, philosophy, admissions basics, location, FAQs, proof.
Specifically required: fee transparency framing, no-exam policy, language positioning,
parent communication via simple regular updates with photos/activities growing into a fuller in-app
experience (D2 §4), family involvement (D4 §9), and the Sankalp Calendar as a take-home tool (D7 §2).

---

## H. Child-facing requirements

The documents do **not** specify child-facing interactive features. What they do specify is the
design language: warm, story-book illustration; soft earthy tones; a recurring subtle motif; short-form
emotional copy (D2 §7, D6 §7). Child-facing joy is therefore delivered through illustration and
micro-interaction, not through games or characters the documents never mention.

---

## I. School-facing requirements

- Parent-facing and business-facing content kept **fully separate**; no franchise or business-opportunity messaging on parent pages (D5 §1, §6)
- Internal progress tracking never public (D6 §2)
- Registration/affiliation numbers displayed once available (D2 §4)
- Careers footer-only (D1 §1.2)

---

## J. SEO requirements

From D3 and D1 §3.

- **Tier A** local transactional (Indore) — Home, Campuses, Admissions
- **Tier B** policy/pedagogy (PAN-India) — **Curriculum page only**
- **Tier C** long-tail question keywords — FAQ schema
- **Tier D** value-based bridge — Value Stories, LBS Legacy, The LBS Way
- **Tier E** brand — legacy and brand pages only
- Page-by-page keyword map (D3 §3) must be honoured, including the negative rules:
  - The LBS Way: "do not force Tier A/B or Tier B/C keywords here"
  - Parenting Tips: "not a vehicle for NEP 2020/policy keywords"
  - Home: functional/local title and H1; tagline below the fold
- Keyword-bearing URL slugs (D1 §3)
- Keyword-linking footer block (D1 §3)
- Per-zone/per-campus local keyword targeting (D3 §8)
- Track Tier A and Tier B/C separately in reporting (D3 §8)

---

## K. AEO requirements

From D3 §6.

- FAQ schema on the Curriculum & Learning Approach page using Tier C questions with concise, direct answers
- Questions phrased about **LBS KidZ's own practice** ("Is there an exam at LBS KidZ?"), not as generic policy questions
- Starter set of six questions, one of which ("What age can my child join?") is explicitly **unfinalised**
- Structure content so search and AI systems can understand what LBS KidZ is, who it serves, programs, curriculum, philosophy, location, admissions, FAQs

---

## L. NCERT-related requirements

See §F. Additionally: cite NCF-FS / NEP 2020 alignment explicitly on the Curriculum page as LBS KidZ's
own factual practice, citing NCERT as the source (D4 §10).

---

## M. ERP-related requirements

From D7.

- The alignment principle: **WEBSITE (the promise) → CURRICULUM (the daily delivery) → SEP ERP (the record/proof)**
- Any change to SIMPLE, Little Karmayogis, Shastri Sanskaar or Sankalp Calendar must be updated in all three before it is complete (D7 §1, §3)
- Cross-reference table: where each element is shown, how it is delivered, what ERP records, and the proof-of-action format
- **Honesty bar (D7 §3):** because the Curriculum page exists to rank for policy/pedagogy terms, any claim it makes must be verifiably true of actual classroom practice and visible in ERP activity records. "Search-driven content carries a higher honesty bar than brand storytelling."
- Assessment: attainment-level field on every activity record; never marks or grades
- The brief instructs that internal ERP functionality is not exposed publicly; parent-facing benefit is communicated instead

---

## N. Calendar / process requirements

From D8.

**Guiding constraints (non-negotiable, D8 §1):**
1. No lesson plans, teacher-training documents, or formal pedagogy manual
2. Every activity fully self-run — a teacher reads it and does it the same day, no prior training
3. Every activity produces a proof of action: oral response, colouring, drawing, or craft. **Never a written test**
4. Activities scale by age band (Playgroup, Nursery, LKG, UKG) keeping the same underlying value
5. Every activity placeable in NCERT's daily schedule; the Sankalp value moment belongs at Goodbye Circle / Reflection Time
6. Values framed as simple reasoning questions, not rules recited at children
7. Beginner/Progressive/Proficient optional per activity but must exist as an ERP field

**Nine-step process (D8 §2):** confirm SIMPLE pillar content per age band → draft Shastri Sanskaar
activities → draft the Sankalp week → define proof-of-action format → map to ERP fields → pilot for
2–4 weeks with one class/age band → collect informal parent feedback → lock and produce parent and
teacher versions → trademark timing after 1–2 stable terms.

**ERP field set (D8 §2 Step 5):** Activity Name · SIMPLE Pillar · Sub-Program · Age Band ·
Proof-of-Action Type · Attainment Level · Teacher Note · Upload.

**Activity card template (D8 §4):** Day/Occasion · SIMPLE Pillar · Age Band · Small Action ·
Materials Needed · Proof-of-Action Type · Sample ERP Tag.

**Roles (D8 §3):** Soumitra/consultant drafts · Adarsh Shastri reviews for legacy authenticity and tone ·
assigned teacher pilots · SEP ERP team builds the tagging structure.

---

## O. Animation requirements

The source documents specify **no** animation requirements. Animation direction comes from the project
brief: GSAP for complex scroll-driven experiences, Framer Motion for entrances/hover/transitions,
60fps, transform and opacity only, `prefers-reduced-motion` respected, mobile optimised, and animation
must never make the site feel slow.

The one constraint the documents do impose is tonal: "Short-form emotional copy over long paragraphs"
and a motif "used quietly, never literally or politically" (D2 §7, D6 §7).

---

## P. Image requirements

**This is the most consequential visual constraint in the documents, and it overrides the brief's
request for photography.**

- "Real photography once available (**Phase 2**); tasteful custom illustration in the interim (**Phase 1**)" (D2 §7, D6 §7)
- "Warm, story-book illustration style; soft earthy tones with a signature accent (khadi white, warm terracotta, deep blue)" (D2 §7)
- "A recurring, subtle visual motif tied to the legacy story (e.g., a lantern or wheat-stalk line-icon, tied to food-respect/farmer-gratitude), used quietly, never literally or politically" (D2 §7, D6 §7)
- Avoid "the cluttered primary-color look common to preschool websites" (D6 §7)
- **"Overclaiming infrastructure or campus experience before it is real"** is on the explicit avoid list (D5 §6)
- Real photographs of the Shastri family are a pending dependency (D2 §10, D6 §10)

Consequence: Phase 1 ships an original illustration system and **no** photographs of children,
classrooms or campuses. See §U-1.

---

## Q. Technical requirements

- Domain: `https://lbskidz.com` (D2 header, §8)
- Vendor scope names **Node.js + Express, backend upload facility, admin panel** (D2 §8, D6 §5)
- XML sitemap for search engines **and** a plain HTML sitemap page (D1 §4)
- Reserve the Mandatory Public Disclosure URL and footer slot now, so no structural change is needed later (D1 §4)
- Phase 1 leads carry forward into Phase 2's funnel — no data loss, no restart (D6 §4)
- Google Business Profile, Google Ads geo-targeting and local SEO are Sarvesh's separate scope (D3 §7)

---

## R. Responsive requirements

Not specified in the documents. From the brief: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920,
with intentional layout redesign rather than shrinking, and particular attention to navbar, hero,
typography, image crops, cards, grids, animations, horizontal scrolling, sticky elements, CTAs, footer.

---

## S. Accessibility requirements

Not specified in the documents. From the brief: semantic HTML, keyboard navigation, focus states,
accessible buttons and forms, meaningful alt text, contrast, reduced-motion support, screen-reader
friendly navigation, and never relying on colour alone.

---

## T. Items that must NOT be invented

Explicitly forbidden or unavailable:

1. **Fee figures.** Fee-on-demand; never published (D6 §6, D3 §3).
2. **Testimonials.** Collected only once families are enrolled (D2 §4).
3. **Staff / educator details.** Phase 2, once appointed (D2 §4).
4. **Campus photographs, addresses, maps.** Phase 2 (D6 §4).
5. **Accreditation, affiliation, UDISE or registration numbers.** Displayed "once available" (D2 §4).
6. **Awards or recognition.** Never mentioned as existing for LBS KidZ.
7. **Personal messages from Anil Shastri, Manju Shastri, Lagan Shastri, Mudit Shastri or Adarsh Shastri.** Pending, coordinated through Adarsh Shastri; "this page cannot be finalized until this is received" (D2 §6, D6 §3, §10).
8. **Family photographs.** Same dependency.
9. **Sankalp Calendar day-by-day activities.** The curriculum workstream is "deferred, not yet started" (D6 §10).
10. **Which weekday carries which SIMPLE pillar.** See §U-2.
11. **Exact admission ages per class.** Explicitly left "[To be finalized]" (D3 §6).
12. **Interpretations of NEP 2020 / NCF-FS as policy authority.** Hard framing rule (D3 §4).
13. **CBSE affiliation.** The disclosure page is inactive until affiliation happens (D1 §2.3).
14. **Public school phone, email, WhatsApp or address.** See §U-3.
15. **SIMPLE / Sankalp / Sanskaar presented as a curriculum, lesson plan, training manual or assessment framework.** They are "branding/communication devices only" (D6 §8).
16. **Gallery, Events, Admission Process content.** Phase 2.
17. **Statistics of any kind** about LBS KidZ. None appear in any document.

---

## U. Ambiguities, conflicts and gaps requiring attention

These are carried into `docs/decisions-and-todos.md` with IDs and are surfaced in code comments at
the point of use.

**U-1 — Illustration versus photography (brief vs documents).**
The project brief asks for authentic Indian photography of children, parents, teachers and classrooms.
D2 §7 and D6 §7 require illustration in Phase 1 with photography only "once available", and D5 §6 lists
overclaiming campus experience as something to avoid deliberately. **Resolved in favour of the documents**,
per the brief's own rule that the PDFs win any conflict. Phase 1 uses an original illustration system;
the image layer is structured so photography drops in at Phase 2. Flagged as decision **C-04**.

**U-2 — Sankalp Calendar day-to-pillar mapping is unresolvable from the documents.**
D8 §2 Step 3 says to write one action "for each day (Monday–Saturday) and its assigned SIMPLE pillar,
following the sample structure already outlined in the Website Reference Document (Section 3.4)".
**The supplied Website Reference Document has no Section 3.4** — its Section 3 is "Positioning" and has
no subsections. The only concrete day-to-pillar data point anywhere is the ERP example "Honesty Shop —
Tuesday" with pillar Integrity, and that row is tagged sub-program *Shastri Sanskaar*, not Sankalp
Calendar. **No mapping has been invented.** The site presents the six pillars as the week's rhythm and
states that the day-by-day assignment is being fixed in the curriculum workstream. Flagged as **C-01**.

**U-3 — No public contact details exist in any document.**
The footer specification (D1 §2.1) requires address, phone, WhatsApp, email and a Google Maps link.
None of these appear anywhere in the eight documents. The mobile numbers that do appear
(9893766740, 9919533366) are the signature block of the SEP founder on internal letterhead, not a
published school contact line, so using them as the school's public number would be a fabrication.
All contact fields are centralised in `src/data/site.ts` with `pending: true`, and the UI renders an
honest state instead of a placeholder. Flagged as **T-01**.

**U-4 — Saturday conflict between the Sankalp week and the NCERT school week.**
D8 §2 Step 3 defines the Sankalp week as Monday–Saturday. D4 §4 states the programme runs a five-day
week, Monday–Friday, with Saturday reserved for teacher planning and *not* an attendance day for
children. Both facts are stated on the site separately and accurately; the reconciliation (most likely
that Saturday is the take-home/family day, since Sankalp is also a parent take-home tool) is **not**
asserted because no document says so. Flagged as **C-05**.

**U-5 — Safety section phase placement.**
D4 §7 says the concrete safety list is "usable directly as real website content (Phase 2 Safety &
Well-being section)", while D2 §3 treats specific, concrete safety statements as core Phase 1
positioning. Resolved by publishing the full list in Phase 1 on the Campuses page, framed as the
standards every campus **is built to** — a commitment about future campuses rather than a claim about a
building a parent could visit today. Flagged as **C-03**.

**U-6 — "Admissions" is a dropdown in D1 but a keyworded page in D3.**
D1 §1.1 shows Admissions as a dropdown with three children. D3 §3 assigns "Admissions" its own primary
keyword ("preschool admission Indore, nursery admission Indore") and its own FAQ requirement, which
implies a page. Resolved by making the group parent a real, clickable landing page at
`/preschool-admission-indore` while keeping all three children. The rule applied consistently: a nav
group is a page only where the keyword strategy assigns it keywords, which is why *Shastri Ji Legacy*
and *For Parents* remain menu-only. Flagged as **C-06**.

**U-7 — Curriculum slug: two sanctioned options.**
D1 §3 offers `/curriculum-nep-2020-activity-based-learning` "or a shorter variant, e.g. `/curriculum`",
and says final slugs should be confirmed with Sarvesh. The long, keyword-bearing form is canonical here
because D1 makes keyword-bearing URLs "a fixed build requirement"; `/curriculum` is a real server-side
301 into it, so both work and only one is indexable. Flagged as **C-07**.

**U-8 — Home page slug.**
D1 §3 suggests `/best-preschool-indore` "for Home or a locality landing page". Home is kept at `/`,
which is standard and avoids a redirect chain on the most-linked URL; the keyword is carried in the
title, H1 and the footer Explore block instead. Flagged as **C-08**.

**U-9 — Legal page content does not exist.**
D1 §2.3 and D6 §9 require five legal pages but supply no text for any of them. Written content states
only what is factually true of this website and of decisions actually recorded in the documents, and
every page carries a visible note that final wording needs legal review. Flagged as **T-06**.

**U-10 — LBS Legacy narrative copy is an open item.**
D2 §10 lists "Page-wise website content drafting" as "To be scheduled, starting with Home and LBS
Legacy". The legacy page therefore uses only widely documented public history about a public figure,
kept brief, and is marked for review by Adarsh Shastri, who D8 §3 names as the reviewer for legacy
authenticity and tone. Flagged as **T-04**.

**U-11 — D7 is dated 00/00/2026.**
The Alignment Map carries an unfilled date field. Content is unaffected; noted for document hygiene.

**U-12 — D7 §4 states the map is structure, not final content.**
"This map will need to be populated with real activity names and ERP field mappings once the curriculum
workstream actually produces the Shastri Sanskaar and Sankalp Calendar activity sets. At present, it
defines the structure to be filled in, not final content." The website therefore describes the ERP
relationship as a promise-delivery-proof principle, never as a live feature list.

---

## V. Phase decision

**Phase 1 is built and live. Phase 2 is reserved and switchable.**

`SITE_PHASE` in `src/data/site.ts` is the single switch. Setting it to `2`:

- adds the School Life dropdown in its exact sitemap slot
- adds Admission Process inside the Admissions group
- adds Careers and Downloads to the footer utility block
- relabels Register Interest → Enquire Now everywhere
- turns Campuses from zone-level to per-campus
- adds the three zone keyword links to the footer Explore block
- includes the Phase 2 routes in `sitemap.xml` and removes their `noindex`

No route, nav position or URL changes between phases, exactly as D1 §1.2 requires.
