/**
 * Programs, fees and FAQs.
 *
 * Hard constraints that shape everything below:
 *  - Fee-on-demand. Figures are shared on enquiry, never published.
 *    Source: Project Decisions Log S6; Keyword & AEO Strategy S3.
 *  - The "no hidden charges" commitment covers books, bag, uniform, lunch box
 *    and water bottle, with nothing added later.
 *    Source: Website Reference Document S4; Project Decisions Log S6.
 *  - Exact admission ages are NOT finalised in any source document. The AEO
 *    strategy leaves the answer as "[To be finalized alongside class
 *    structure/age-band content.]" so no age is asserted as LBS KidZ policy.
 *    Source: Keyword & AEO Strategy S6. See docs/decisions-and-todos.md T-02.
 */

export type Program = {
  slug: string
  name: string
  /** NCERT's own reference model, cited as NCERT's, not as LBS KidZ policy. */
  ncertBand: string | null
  ncertAge: string | null
  blurb: string
  focus: string[]
}

/**
 * Class structure. Source: NCERT Curriculum Summary S8; Project Decisions Log S2.
 * "NCERT's preschool model covers 3 years before Class I, for ages 3-6:
 *  Preschool I, Preschool II, Preschool III. LBS KidZ's 4-class structure
 *  (Playgroup, Nursery, LKG, UKG) extends one year earlier via Playgroup
 *  (typically ages 1.5-3), which is standard industry practice beyond NCERT's
 *  specific scope - no conflict, just worth clarifying in parent-facing content
 *  how LBS KidZ's classes map to recognized age bands."
 */
export const programs: Program[] = [
  {
    slug: 'playgroup',
    name: 'Playgroup',
    ncertBand: null,
    ncertAge: 'Typically 1.5 to 3 years',
    blurb:
      'The first year, and the one that sits a step earlier than NCERT’s three-year preschool model. Standard practice across Indian preschools, and where separating from a parent for a few hours is itself the work.',
    focus: [
      'Settling in, and separating comfortably',
      'Free play in activity areas',
      'Rhymes, songs and first words',
      'Sensorial play',
    ],
  },
  {
    slug: 'nursery',
    name: 'Nursery',
    ncertBand: 'Preschool I',
    ncertAge: '3 to 4 years in NCERT’s reference model',
    blurb:
      'The first of the three years NCERT’s model covers. A child arrives already fluent in their home language, and the day is built on that.',
    focus: [
      'Welcome Circle and daily rhythm',
      'Storytelling and role-play',
      'Art, music and movement',
      'Outdoor play',
    ],
  },
  {
    slug: 'lkg',
    name: 'LKG',
    ncertBand: 'Preschool II',
    ncertAge: '4 to 5 years in NCERT’s reference model',
    blurb:
      'Foundational literacy and numeracy woven into activities rather than workbooks, at the pace the child sets.',
    focus: [
      'Environmental and mathematical concepts',
      'Early literacy in Language 1',
      'First joyful exposure to English',
      'Small-group work',
    ],
  },
  {
    slug: 'ukg',
    name: 'UKG',
    ncertBand: 'Preschool III',
    ncertAge: '5 to 6 years in NCERT’s reference model',
    blurb:
      'The year that builds the habits of learning a child carries into formal school. Still no examinations.',
    focus: [
      'Fluency in reading and writing in Language 1',
      'Beginning reading and writing in Language 2',
      'Observation and logical thinking',
      'Positive learning habits',
    ],
  },
]

export const programsAgeNote =
  'The age bands above are NCERT’s reference model for the Foundational Stage, shown so you can see how our classes map onto a recognised national structure. Our own admission age for each class is confirmed with you directly when you enquire.'

/** Source: Website Reference Document S4; Project Decisions Log S6. */
export const feeCommitment = {
  headline: 'No hidden charges',
  covered: ['Books', 'Bag', 'Uniform', 'Lunch box', 'Water bottle'],
  promise:
    'The fee we quote you is inclusive of books, bag, uniform, lunch box and water bottle. Nothing is added later.',
  disclosure:
    'Exact fees are shared with you directly when you enquire, rather than published on this page. This is standard practice across Indian preschools, and it lets us give you the full picture for the class and campus you are actually asking about.',
}

export type Faq = {
  q: string
  a: string
  /** Included in FAQPage structured data only when true. */
  schema: boolean
  pending?: boolean
}

/**
 * FAQ set.
 * Source: Keyword & AEO Strategy S6 (AEO / FAQ Schema Recommendations). The
 * six questions and answers below are the "suggested starter set" from that
 * document, rephrased only for readability with no change of meaning.
 *
 * The strategy is explicit that questions must be asked about LBS KidZ's own
 * practice ("Is there an exam at LBS KidZ?") rather than as generic policy
 * questions, so that is how they are worded here.
 */
export const faqs: Faq[] = [
  {
    q: 'Is there any exam in preschool at LBS KidZ?',
    a: 'No. Assessment happens through daily activities such as oral response, colouring, drawing and craft, following NCERT’s own recommended approach for the Foundational Stage. There are no formal examinations at any point in the preschool years.',
    schema: true,
  },
  {
    q: 'What is activity-based learning?',
    a: 'Children learn through play, hands-on activity and real experiences rather than worksheets or memorisation. This is the approach recommended by India’s National Curriculum Framework for the Foundational Stage.',
    schema: true,
  },
  {
    q: 'Is LBS KidZ aligned with NEP 2020?',
    a: 'Yes. Our approach follows NEP 2020 and NCF-FS recommendations on play-based learning, a mother-tongue foundation, and non-competitive, observation-based assessment.',
    schema: true,
  },
  {
    q: 'What language is used for teaching?',
    a: 'A strong foundation in Hindi or the child’s home language, with natural, joyful exposure to English through songs, stories and simple vocabulary. This is in line with national curriculum guidance for the early years.',
    schema: true,
  },
  {
    q: 'Are there any hidden charges at LBS KidZ?',
    a: 'No. The fee quoted covers books, bag, uniform, lunch box and water bottle, with nothing added later. Exact fees are shared directly on enquiry.',
    schema: true,
  },
  {
    q: 'What age can my child join?',
    a: 'Our class-wise admission ages are being confirmed alongside our age-band content, and our team will give you the exact answer for your child when you register your interest. For reference, NCERT’s preschool model covers the three years before Class I, for ages three to six, and our Playgroup year sits one step earlier than that.',
    schema: false,
    pending: true,
  },
]

/**
 * How assessment reaches a parent. Source: Alignment Map S2; Website Reference
 * Document S4 (Parity Layer, Parent communication row).
 * Deliberately parent-facing benefit, not ERP implementation detail, per the
 * project brief's instruction not to expose internal ERP functionality.
 */
export const parentUpdates = {
  headline: 'What you actually see',
  points: [
    'Every activity a child does is recorded, with its proof of action: what they said, what they coloured, drew or made.',
    'Each record carries an attainment level of Beginner, Progressive or Proficient. Never a mark, never a grade, never a rank.',
    'Simple, regular updates reach you with photos and activities as the term goes on, growing into a fuller in-app experience as the school matures.',
  ],
  sourceNote:
    'Records are kept in the SEP ERP system that runs behind the school. What matters to you is that the promise on this website, the activity in the classroom and the record in the system are the same thing.',
}
