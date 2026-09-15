/**
 * Home page copy, and the positioning it carries.
 *
 * Every string in this file is the wording of the Home Page Content &amp; Design
 * Specification (D09), section by section. Where that document uses an em dash
 * as a sentence break the punctuation is changed and nothing else is: the house
 * rule for this site is that no em dash appears in any published copy.
 *
 * Source: LBS KidZ Home Page Content S3 (Final Written Content), with the
 * Website Reference Document S3/S4 and the Project Decisions Log S6 behind the
 * two sections the Home spec does not itself script.
 */

/* -------------------------------------------------------------------------
 * Section 1 — Hero
 * ---------------------------------------------------------------------- */

export const heroCopy = {
  /**
   * "A Living Legacy for Little Learners", split across the hero's two lines.
   * The second is the one the drawn underline sits beneath, so the split falls
   * where the emphasis belongs rather than at the middle of the phrase.
   */
  h1Lead: 'A Living Legacy for',
  h1Emphasis: 'Little Learners',
  /** Sits directly under the H1, smaller, per the spec's own layout note. */
  tagline: 'Modern Learning, Timeless Values',
  supporting: 'Where tiny children learn big values.',
  standfirst:
    'A preschool built on the family legacy of Shri Lal Bahadur Shastri Ji, combining joyful, activity-based early learning with honesty, discipline and character, practised every single day.',
  /**
   * The functional search phrasing the Keyword &amp; AEO Strategy asks to be
   * present once in body copy rather than shouted in the headline. It sits in
   * the meta title (see `data/seo.ts`) and here, in the hero's quiet line.
   */
  searchLine: 'A new preschool in Indore, opening for Academic Session 2027-28.',
}

/* -------------------------------------------------------------------------
 * Section 3 — Why LBS KidZ
 * ---------------------------------------------------------------------- */

export const whyLbsKidz = {
  eyebrow: 'Why LBS KidZ',
  headline: 'A Foundation Strong Enough to Last a Lifetime',
  standfirst:
    'Six things that shape every day here, from a child’s first morning at two to their last at six.',
}

export type PositioningPillar = {
  slug: string
  /** Short title, as printed on the card and in the Register Interest list. */
  label: string
  body: string
  /** Names an icon in `sections.tsx`; see `whyIcons` there. */
  icon: string
}

/**
 * The six cards of Section 3, verbatim but for two things: the spec's
 * "Practiced" is set as "Practised", matching the same document's own
 * "practised every single day" and the site's en-IN locale; and the em dash
 * separating each title from its description is the card's layout here rather
 * than a character in the copy.
 *
 * These replaced three longer "locked decision" pillars. Nothing they said is
 * lost: no-exams is now Growth Without Grades, mother tongue is card five, and
 * the fee commitment moved to where the spec puts it, as the note under the
 * Programs snapshot and on the Fees page.
 */
export const positioningPillars: PositioningPillar[] = [
  {
    slug: 'family-led-legacy',
    label: 'A Family-Led Legacy',
    body: 'Guided by the family of Shri Lal Bahadur Shastri Ji himself, carried forward with pride and authenticity.',
    icon: 'legacy',
  },
  {
    slug: 'values-practised-daily',
    label: 'Values, Practised Daily',
    body: 'Honesty, respect and discipline built into everyday moments, not just lessons.',
    icon: 'values',
  },
  {
    slug: 'safety-by-design',
    label: 'Safety by Design',
    body: 'Secure, child-first campuses, planned with care from the ground up.',
    icon: 'safety',
  },
  {
    slug: 'joyful-modern-learning',
    label: 'Joyful, Modern Learning',
    body: 'Play-based, activity-first learning aligned with NEP 2020.',
    icon: 'learning',
  },
  {
    slug: 'mother-tongue-first',
    label: 'Mother Tongue First, English with Confidence',
    body: 'A strong foundation in their own language, with natural English exposure.',
    icon: 'language',
  },
  {
    slug: 'growth-without-grades',
    label: 'Growth Without Grades',
    body: 'Every child’s progress observed and nurtured, never marked or measured.',
    icon: 'growth',
  },
]

/* -------------------------------------------------------------------------
 * The differentiator band.
 *
 * Not one of the Home spec's eleven sections. It is kept because it makes the
 * argument the rest of the page rests on, and because every line of it is
 * sourced: Global &amp; Indian Preschool Research S7 records that "no brand
 * researched, Indian or global, has an authentic, ownable origin story", and
 * names it the single most significant gap identified.
 *
 * Its eyebrow used to be "Why LBS KidZ", which is now the heading of Section 3
 * above; two sections cannot carry the same name.
 * ---------------------------------------------------------------------- */

export const differentiator = {
  eyebrow: 'What sets this apart',
  headline: 'Most schools describe their values. Ours are somebody’s biography.',
  body:
    'Trust, excellence, child-centric: every preschool says these, which is exactly why they no longer mean much. Our values are not adjectives we chose. They are the documented character of one man, which makes each of them a story a four-year-old can actually follow.',
}

/* -------------------------------------------------------------------------
 * Section 4 — The LBS Way preview
 * ---------------------------------------------------------------------- */

export const brandLayerIntro = {
  eyebrow: 'The Lal Bahadur Shastri Way',
  headline: 'Every Child, A Little Karmayogi',
  /**
   * S.I.M.P.L.E is dot-separated and the six words are spelled out, because the
   * spec requires both in this section: "must always be shown dot-separated
   * with the six words spelled out at least once in this section, never
   * displayed as a plain word."
   */
  body:
    'Guided by S · I · M · P · L · E, which stands for Simplicity, Integrity, Mindfulness, Patriotism, Leadership and Empathy, and by Shastri Sanskaar, our everyday practice of manners and respect. Six values. One confident child.',
  linkLabel: 'Explore The LBS Way',
}

/* -------------------------------------------------------------------------
 * Section 5 — Curriculum preview
 * ---------------------------------------------------------------------- */

export const curriculumPreview = {
  eyebrow: 'Curriculum & learning approach',
  headline: 'Learning Built Around the Wonder of Being Little',
  body:
    'Play-based, activity-first learning aligned with NEP 2020 and the National Curriculum Framework for the Foundational Stage, designed around how young children truly grow, discover and remember.',
  linkLabel: 'See Our Curriculum & Learning Approach',
}

/* -------------------------------------------------------------------------
 * Section 6 — Programs snapshot
 * ---------------------------------------------------------------------- */

export const programsSnapshot = {
  eyebrow: 'Programs & classes',
  headline: 'Four Stages, One Journey',
  standfirst:
    'The same values run through every class. Only the complexity and the expected independence change.',
  linkLabel: 'View Programs & Classes',
  /**
   * The spec's note under this table, reproduced because it is the one place
   * the Home page is allowed to touch money: "no fee information on this page.
   * Fees are shared directly with parents on enquiry, with a clear no hidden
   * charges line elsewhere on the site (books, bag, uniform, lunch box, water
   * bottle included)."
   */
  feeNote:
    'No fees are published here. The figure is shared with you directly when you enquire, and it has no hidden charges: books, bag, uniform, lunch box and water bottle are all included.',
}

/* -------------------------------------------------------------------------
 * Section 8 — Founder's Note teaser
 * ---------------------------------------------------------------------- */

export const foundersNoteTeaser = {
  eyebrow: 'Founder’s note',
  headline: 'Carrying the Legacy Forward: A Note from Adarsh Shastri',
  /**
   * PLACEHOLDER, and flagged as one by the source document itself: "placeholder
   * quote, to be replaced with the actual message once received. See Section 8,
   * Dependencies / Open Items." It is published because it is the client's own
   * supplied wording, not because it was invented here.
   * See docs/decisions-and-todos.md item T-04.
   */
  quote:
    'LBS KidZ is our family’s way of bringing my grandfather’s values into a child’s very first learning journey.',
  attribution: 'Adarsh Shastri',
  attributionRole: 'Grandson of Shri Lal Bahadur Shastri Ji',
  isPlaceholder: true,
  linkLabel: 'Read the Founder’s Note',
}

/* -------------------------------------------------------------------------
 * Section 9 — Reassurance strip
 * ---------------------------------------------------------------------- */

export const reassurance = {
  eyebrow: 'Parent confidence',
  headline: 'Everything You Want for Your Child’s First School',
  standfirst:
    'Set against the things a parent actually compares. Where something is not ready yet, it says so.',
  linkLabel: 'See Full FAQs',
}

/**
 * The parity layer. Every standard trust signal a premium competitor offers is
 * present, so the site never reads as lacking something a parent expects.
 * Source: Website Reference Document S4 (table reproduced faithfully), extended
 * with the four items the Home spec names for its reassurance strip.
 */
export type ParityItem = {
  category: string
  claim: string
  href: string
  phase: 1 | 2
}

export const parityLayer: ParityItem[] = [
  {
    category: 'A Safe, Secure Campus',
    claim:
      'Specific standards drawn from NCERT’s own guidelines, listed item by item rather than promised in general.',
    href: '/preschool-in-indore-campuses#safety',
    phase: 1,
  },
  {
    category: 'Trained, Caring Teachers',
    claim: 'Training and selection standards stated plainly, once our educators are appointed.',
    href: '/school-life/our-educators',
    phase: 2,
  },
  {
    category: 'Daily Parent Updates',
    claim:
      'Simple, regular updates with photos and activities, growing into a fuller in-app experience as the school matures.',
    href: '/curriculum-nep-2020-activity-based-learning#what-you-see',
    phase: 1,
  },
  {
    /** Named by Home Page Content S3, Section 9, and new to this list. */
    category: 'A Warm Settling-In Experience',
    claim:
      'Playgroup is built around it: comfort, trust and gentle first steps away from home, before anything academic is asked of a child.',
    href: '/programs-and-classes#playgroup',
    phase: 1,
  },
  {
    category: 'Curriculum credibility',
    claim:
      'Play-based, activity-based and age-appropriate, explicitly aligned with NEP 2020 and NCF-FS.',
    href: '/curriculum-nep-2020-activity-based-learning',
    phase: 1,
  },
  {
    category: 'Practical questions answered',
    claim: 'A genuine FAQ that answers what parents actually worry about.',
    href: '/faqs',
    phase: 1,
  },
  {
    category: 'Holistic development',
    claim: 'The full activity mix: art, music, movement and outdoor play.',
    href: '/curriculum-nep-2020-activity-based-learning#the-day',
    phase: 1,
  },
  {
    category: 'Fee structure',
    claim:
      'No hidden charges. Books, bag, uniform, lunch box and water bottle are included in the fee quoted.',
    href: '/preschool-fees-indore',
    phase: 1,
  },
  {
    category: 'Registration transparency',
    claim: 'Registration numbers displayed here as soon as they are issued.',
    href: '/mandatory-public-disclosure',
    phase: 2,
  },
  {
    category: 'Testimonials',
    claim: 'Collected from real families once children are enrolled. Not before.',
    href: '/school-life/testimonials',
    phase: 2,
  },
]

/* -------------------------------------------------------------------------
 * Section 10 — Final CTA
 * ---------------------------------------------------------------------- */

export const finalCta = {
  headline: 'Give Them a Beginning Worth Remembering',
  body: 'Register your interest and be among the first families to welcome LBS KidZ to Indore.',
}

/**
 * What LBS KidZ deliberately avoids. Publishing this is itself a differentiator,
 * and every line is a decision recorded in the source documents.
 * Source: Global & Indian Preschool Research S6.
 */
export const deliberateChoices = [
  {
    avoided: 'Marketing English as the premium feature',
    instead: 'A mother-tongue foundation, because that is what the evidence supports.',
  },
  {
    /**
     * Restated when photography was introduced. The commitment is unchanged:
     * what is forbidden is a picture that implies a campus, a class or a child
     * we do not have. Photographs of early-years learning, labelled as exactly
     * that, break no promise. See docs/decisions-and-todos.md item C-04.
     */
    avoided: 'Pictures passed off as our campus, our classrooms or our children',
    instead:
      'Photographs of early-years learning, said plainly to be exactly that, and the Indore zones we are actually opening in.',
  },
  {
    avoided: 'Testimonials before there are families to give them',
    instead: 'An empty space, until there is something true to put in it.',
  },
  {
    avoided: 'Business and franchise messaging mixed into parent pages',
    instead: 'Parent-facing and business-facing kept completely separate.',
  },
]
