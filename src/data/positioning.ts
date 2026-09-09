/**
 * Positioning and the parity layer.
 * Source: Website Reference Document S3 and S4; Project Decisions Log S6;
 * Global & Indian Preschool Research S5, S6 and S7.
 */

export const heroCopy = {
  /**
   * Meta title / H1 direction from Keyword & AEO Strategy S3:
   * "Meta title/H1 should be functional and local; brand tagline sits below
   *  the fold". The H1 therefore leads with the search term a parent uses.
   */
  h1Lead: 'A preschool in Indore',
  h1Emphasis: 'built on a life worth copying',
  standfirst:
    'LBS KidZ carries the name and the values of Shri Lal Bahadur Shastri, India’s second Prime Minister. Play-based days, a strong Hindi foundation, and no examinations at any stage.',
  /** Brand tagline, kept below the fold per the AEO instruction. */
  tagline: 'Little Karmayogis in the making',
}

/**
 * The differentiator, stated plainly.
 * Source: Website Reference Document S3; Global & Indian Research S7:
 * "No brand researched - Indian or global - has an authentic, ownable origin
 *  story. This is the single most significant gap identified."
 */
export const differentiator = {
  eyebrow: 'Why LBS KidZ',
  headline: 'Most schools describe their values. Ours are somebody’s biography.',
  body:
    'Trust, excellence, child-centric: every preschool says these, which is exactly why they no longer mean much. Our values are not adjectives we chose. They are the documented character of one man, which makes each of them a story a four-year-old can actually follow.',
}

/**
 * The parity layer. Every standard trust signal a premium competitor offers is
 * present, so the site never reads as lacking something a parent expects.
 * Source: Website Reference Document S4 (table reproduced faithfully).
 */
export type ParityItem = {
  category: string
  claim: string
  href: string
  phase: 1 | 2
}

export const parityLayer: ParityItem[] = [
  {
    category: 'Curriculum credibility',
    claim:
      'Play-based, activity-based and age-appropriate, explicitly aligned with NEP 2020 and NCF-FS.',
    href: '/curriculum-nep-2020-activity-based-learning',
    phase: 1,
  },
  {
    category: 'Safety and infrastructure',
    claim:
      'Specific standards drawn from NCERT’s own guidelines, listed item by item rather than promised in general.',
    href: '/preschool-in-indore-campuses#safety',
    phase: 1,
  },
  {
    category: 'Teacher quality and training',
    claim: 'Training and selection standards stated plainly, once our educators are appointed.',
    href: '/school-life/our-educators',
    phase: 2,
  },
  {
    category: 'Parent communication',
    claim:
      'Simple, regular updates with photos and activities, growing into a fuller in-app experience as the school matures.',
    href: '/curriculum-nep-2020-activity-based-learning#what-you-see',
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
]

/**
 * The three positioning statements most likely to decide a parent, each of
 * which is a locked project decision rather than a marketing line.
 * Source: Project Decisions Log S6.
 */
export const positioningPillars = [
  {
    slug: 'no-exams',
    label: 'No examinations',
    headline: 'No exams. At any stage.',
    body:
      'Assessment happens through the activity itself: an oral answer, a colouring sheet, a drawing, a piece of craft. Each one is recorded as Beginner, Progressive or Proficient. Never a mark, never a rank.',
    proof: 'This is NCERT’s own recommended approach for the Foundational Stage.',
  },
  {
    slug: 'mother-tongue',
    label: 'Mother tongue first',
    headline: 'Hindi first, English joyfully.',
    body:
      'Your child arrives already fluent in the language spoken at home. We build on that rather than around it, and let English arrive through songs, stories and play.',
    proof:
      'NCF-FS is emphatic, not tentative, that home language should be the medium of instruction in the Foundational Stage.',
  },
  {
    slug: 'no-hidden-charges',
    label: 'No hidden charges',
    headline: 'One fee, and nothing added later.',
    body:
      'Books, bag, uniform, lunch box and water bottle are all inside the fee we quote you. The figure itself is shared with you directly when you enquire.',
    proof: 'A commitment we make in writing at the point of admission.',
  },
]

/**
 * What LBS KidZ deliberately avoids. Publishing this is itself a differentiator,
 * and every line is a decision recorded in the source documents.
 * Source: Global & Indian Preschool Research S6.
 */
export const deliberateChoices = [
  {
    avoided: 'Marketing English as the premium feature',
    instead: 'A Hindi and home-language foundation, because that is what the evidence supports.',
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

/**
 * How the brand layer is introduced on the homepage. The keyword strategy is
 * explicit that brand terms have zero search volume and are the deeper story a
 * parent discovers after arriving, not the discovery mechanism.
 * Source: Keyword & AEO Strategy S1; Project Decisions Log S6.
 */
export const brandLayerIntro = {
  eyebrow: 'The Lal Bahadur Shastri Way',
  headline: 'What your child will be called here',
  body:
    'Children at LBS KidZ are Little Karmayogis. Their values come from SIMPLE, their manners from Shastri Sanskaar, and their week from the Sankalp Calendar. None of these are words a parent searches for. They are what you find once you are here.',
}
