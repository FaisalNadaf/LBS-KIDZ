/**
 * Programs, fees and FAQs.
 *
 * Hard constraints that shape everything below:
 *  - Fee-on-demand. Figures are shared on enquiry, never published.
 *    Source: Project Decisions Log S6; Keyword & AEO Strategy S3.
 *  - The "no hidden charges" commitment covers books, bag, uniform, lunch box
 *    and water bottle, with nothing added later.
 *    Source: Website Reference Document S4; Project Decisions Log S6.
 *  - Admission ages ARE now settled, and this file states them as LBS KidZ
 *    policy. They were an open item for most of this project ("[To be finalized
 *    alongside class structure/age-band content]", Keyword & AEO Strategy S6);
 *    the Programs & Classes specification closes it with an age band per class,
 *    and resolves the one disagreement between documents by naming Playgroup as
 *    2 to 3 years and instructing that the Home page snapshot be corrected to
 *    match. Source: Programs & Classes Content S1 and S3.
 */

export type Program = {
  slug: string
  name: string
  /**
   * LBS KidZ's own age band for the class.
   *
   * Previously no age was asserted as LBS KidZ policy, because the source
   * documents left it open. The Programs & Classes specification closes it, and
   * it also settles the one place the two documents disagreed: it states
   * Playgroup as 2 to 3 years and instructs, in as many words, that the Home
   * page's snapshot be updated from 1.5 to 3 so both read the same. There is
   * now one age per class on this site and it comes from here.
   */
  ageRange: string
  /** The class in three or four words, per the specification's own taglines. */
  tagline: string
  /** "What this year is about". One short paragraph. */
  about: string
  /** "What your child does". Four items. */
  focus: string[]
  /** NCERT's own reference model, cited as NCERT's, not as LBS KidZ policy. */
  ncertBand: string | null
  ncertAge: string | null
}

/**
 * The four classes.
 * Source: Programs & Classes Content S3, Section 2 (The Four Classes), with the
 * NCERT mapping retained from NCERT Curriculum Summary S8 and Project Decisions
 * Log S2: "NCERT's preschool model covers 3 years before Class I, for ages 3-6:
 * Preschool I, Preschool II, Preschool III. LBS KidZ's 4-class structure
 * extends one year earlier via Playgroup, which is standard industry practice
 * beyond NCERT's specific scope, no conflict, just worth clarifying in
 * parent-facing content how LBS KidZ's classes map to recognized age bands."
 */
export const programs: Program[] = [
  {
    slug: 'playgroup',
    name: 'Playgroup',
    ageRange: '2 to 3 years',
    tagline: 'Settling In, Safely',
    about:
      'For most children, this is their first time away from home. The focus isn’t academics, it’s comfort, trust, and gentle first steps into a world beyond family.',
    focus: [
      'Sensory play, sorting, and simple stacking games',
      'First rhymes, sounds, and stories',
      'Short, familiar routines: welcome time, snack time, free play',
      'Building comfort with teachers and new faces',
    ],
    ncertBand: null,
    ncertAge: 'A year earlier than NCERT’s three-year preschool model begins',
  },
  {
    slug: 'nursery',
    name: 'Nursery',
    ageRange: '3 to 4 years',
    tagline: 'Finding Their Voice',
    about:
      'Language grows quickly at this age, and so does curiosity. Children start playing with others, not just alongside them.',
    focus: [
      'More words, more questions, more stories',
      'Early shapes, colours, and counting, through play',
      'First experiences of sharing, waiting turns, and group activities',
      'Simple art, craft, and movement activities',
    ],
    ncertBand: 'Preschool I',
    ncertAge: '3 to 4 years in NCERT’s reference model',
  },
  {
    slug: 'lkg',
    name: 'LKG',
    ageRange: '4 to 5 years',
    tagline: 'Getting Curious',
    about:
      'Children start connecting letters to sounds, numbers to quantities, and questions to real answers, all still through play, never through worksheets.',
    focus: [
      'Early letter-sound awareness',
      'Simple counting, patterns, and early math concepts',
      'More independent group activities and small classroom responsibilities',
      'Growing Shastri Sanskaar habits: greetings, gratitude, small daily duties',
    ],
    ncertBand: 'Preschool II',
    ncertAge: '4 to 5 years in NCERT’s reference model',
  },
  {
    slug: 'ukg',
    name: 'UKG',
    ageRange: '5 to 6 years',
    tagline: 'Ready for What’s Next',
    about:
      'The final preschool year builds real confidence: speaking up, trying first, and feeling ready for the classroom that comes next.',
    focus: [
      'Stronger foundational literacy and numeracy',
      'Chances to speak, present, and lead small activities',
      'All six SIMPLE values becoming daily habit, not a lesson',
      'A confident, secure step toward primary school',
    ],
    ncertBand: 'Preschool III',
    ncertAge: '5 to 6 years in NCERT’s reference model',
  },
]

export const programsAgeNote =
  'The age band beside each class is ours. The NCERT line under it is that body’s own reference model for the Foundational Stage, shown so you can see how our classes map onto a recognised national structure.'

/**
 * Section 3 of the Programs & Classes specification: A Day at LBS KidZ.
 *
 * Deliberately general. "Exact daily timetable: not finalized yet, Section 3 is
 * deliberately general and should be revisited once the real timetable is
 * locked." Source: Programs & Classes Content S8.
 */
export const dailyRhythm = {
  headline: 'A Rhythm Children Can Count On',
  body:
    'Every day at LBS KidZ follows a gentle, familiar rhythm: a welcoming start, blocks of play and activity, rest and mealtimes, and a quiet close to the day for reflection. The rhythm stays the same across the week; only the activities change, so each day feels new without ever feeling unpredictable.',
  /**
   * Presented as a flow of moments rather than a clock, because the timetable
   * is not locked and a time against each block would be an invention.
   */
  moments: [
    { name: 'Arrival', detail: 'A welcoming start, and a familiar face at the door.' },
    { name: 'Play and activity', detail: 'The blocks where most of the learning happens.' },
    { name: 'Meal and rest', detail: 'Eating together, and the habits that go with it.' },
    { name: 'Reflection', detail: 'A quiet close, where the day’s value gets said out loud.' },
    { name: 'Goodbye', detail: 'Sent home with the same small action to try again.' },
  ],
}

/**
 * The fee commitment.
 *
 * Source: Fees & Admissions Content (D18) S3, which supersedes the earlier
 * summary in Website Reference Document S4 and Project Decisions Log S6 by
 * giving each inclusion its own line and rewriting the page's opening promise.
 *
 * D18's framing instruction is load-bearing and easy to lose in an edit: the
 * page is "framed entirely in positive terms, what LBS KidZ includes and
 * promises, never as a comparison to what other schools charge or don't". So
 * nothing here mentions another school, and the headline states the commitment
 * rather than denying an accusation.
 */
export const feeCommitment = {
  headline: 'One Fee. Nothing Added Later.',
  promise:
    'Books, bag, uniform, lunch box, and water bottle, all inside the number we give you, not billed on top of it.',
  /** D18 S3, Section 2. Each item carries its own one-line description. */
  intro:
    'When we quote a fee, this is what is already covered. Nothing shows up as a surprise later.',
  covered: [
    { name: 'Books', detail: 'All learning material for the year.' },
    { name: 'Bag', detail: 'A school bag, included from day one.' },
    { name: 'Uniform', detail: 'The full uniform set.' },
    { name: 'Lunch box', detail: 'One that goes home with your child, not just to school.' },
    { name: 'Water bottle', detail: 'Included, not an add-on.' },
  ],
  /** D18 S3, Section 3. */
  disclosure:
    'The exact fee depends on the class and the campus zone you are asking about, so we share it with you directly once we know both, rather than posting one generic number that might not actually match your situation. You will get the specific figure, in writing, the same day you ask.',
  willTell: [
    'The fee for the class you are asking about.',
    'Exactly what that number includes.',
    'Anything that sits outside it. Today, that answer is nothing.',
  ],
}

/**
 * D18 S3, Section 5: what happens after a parent asks.
 *
 * D18 S4 is explicit that this reuses the numbered flow already on Register
 * Interest rather than introducing a second pattern for the same idea, which is
 * why both pages now render `StepList` from this one array's sibling.
 */
export const feeEnquirySteps = [
  'We call you back on the number you give us.',
  'We share the class fee, what it includes, and your nearest campus zone.',
  'If it feels right, we take it forward once admissions open in your zone.',
]

export type Faq = {
  q: string
  a: string
  /** Included in FAQPage structured data only when true. */
  schema: boolean
  pending?: boolean
}

export type FaqCategory = {
  name: string
  /** Why this group exists, for the reader scanning the four headings. */
  blurb: string
  items: Faq[]
}

/**
 * The site's full FAQ set: fourteen questions in four groups.
 *
 * Source: FAQs Page Content (D19) S3, verbatim but for the em-dash rule. This
 * supersedes the six-question starter set from Keyword & AEO Strategy S6, which
 * D19 expands rather than contradicts: every one of the original six survives
 * here, four of them reworded by D19 itself.
 *
 * D19 S1 sets the page's purpose as consolidation, "pulling together facts
 * already established across Curriculum, Programs & Classes, Fees & Admissions,
 * and Campuses into one scannable page". That makes this the one place on the
 * site where repeating another page's fact is the point rather than a fault,
 * and it is why the answers here are short and route onward rather than
 * restating those pages at length.
 *
 * D19 S4 requires the category headers to stay visible while every answer is
 * collapsed, so a parent can jump to the group they care about. The grouping
 * therefore lives in the data, not in the page's layout.
 */
export const faqCategories: FaqCategory[] = [
  {
    name: 'Curriculum & Learning',
    blurb: 'How we teach, and how your child is assessed without a single exam.',
    items: [
      {
        q: 'Is there an exam at LBS KidZ?',
        a: 'At every stage, we follow NEP 2020’s own recommended approach: a child’s growth is observed through daily activities, oral response, colouring, drawing, craft, rather than measured with a written exam.',
        schema: true,
      },
      {
        q: 'What is activity-based learning?',
        a: 'Children learn through play, hands-on activity, and real experience, rather than worksheets or memorisation. This is the approach recommended by NCERT’s National Curriculum Framework for the Foundational Stage.',
        schema: true,
      },
      {
        q: 'Is LBS KidZ aligned with NEP 2020?',
        a: 'Yes. Our daily practice follows NEP 2020 and NCF-FS guidance on play-based learning, a mother-tongue foundation, and observation-based assessment.',
        schema: true,
      },
      {
        q: 'What language is used for teaching?',
        a: 'A strong foundation in your child’s mother tongue, with natural, joyful exposure to English, never the other way around.',
        schema: true,
      },
      {
        q: 'How is my child’s progress tracked without exams?',
        a: 'Every activity is recorded and marked as Beginner, Progressive, or Proficient, never a mark, a grade, or a rank against other children.',
        schema: true,
      },
    ],
  },
  {
    name: 'Admissions & Fees',
    blurb: 'Ages, what the fee covers, and what happens once you get in touch.',
    items: [
      {
        q: 'What age can my child join, and in which class?',
        a: 'Playgroup (2 to 3 years), Nursery (3 to 4 years), LKG (4 to 5 years), or UKG (5 to 6 years). See Programs & Classes for what each year focuses on.',
        schema: true,
      },
      {
        q: 'Are there any hidden charges?',
        a: 'The fee we quote you is complete. It already includes books, bag, uniform, lunch box, and water bottle, with nothing added later.',
        schema: true,
      },
      {
        q: 'Why isn’t the fee listed on this website?',
        a: 'The exact figure depends on the class and the zone you are asking about, so we share it directly once you tell us both, rather than posting a number that might not match your situation.',
        schema: true,
      },
      {
        q: 'What happens after I register my interest?',
        a: 'We call you back on the number you give, share the class fee and your nearest campus zone, and take it forward with you once admissions open there.',
        schema: true,
      },
      {
        q: 'Does my child need to be toilet trained before joining?',
        a: 'Every mother is already working on this at home, in her own way and time. We simply continue that same gentle training at school, wherever your child happens to be in the process when they join.',
        schema: true,
      },
    ],
  },
  {
    name: 'Campuses',
    blurb: 'Where we are opening, when, and what every campus is built to.',
    items: [
      {
        q: 'Where is LBS KidZ opening in Indore?',
        a: 'Five zones to start: Rau / CAT Road, Kanadia Road, Annapurna / Sudama Nagar, Mahalaxmi Nagar / Nipania, and Vijay Nagar. See Campuses for details.',
        schema: true,
      },
      {
        q: 'When will a campus open near me?',
        a: 'LBS KidZ is targeting Academic Session 2027-28. Register your interest and we will reach out the moment admissions open in your zone.',
        schema: true,
      },
      {
        q: 'What safety standards does a campus have to meet?',
        a: 'A specific checklist taken from NCERT’s Guidelines for Preschool Education, covering the classroom, the building, ongoing safety checks, and emergency readiness. See Campuses for the full list.',
        schema: true,
      },
    ],
  },
  {
    name: 'General',
    blurb: 'Reaching a person rather than a form.',
    items: [
      {
        q: 'Can I talk to someone directly instead of filling a form?',
        a: 'Yes. Our published phone line, WhatsApp number, and email are being set up alongside our first campus. Until then, the enquiry form reaches our team directly, and we will call you back on the number you give.',
        schema: true,
      },
    ],
  },
]

/**
 * The same fourteen, flattened.
 *
 * The FAQ page renders the groups; the Home shortlist and the FAQPage schema
 * want a plain list. Deriving it here rather than maintaining a second array is
 * what stops the two drifting apart the next time a question is added.
 */
export const faqs: Faq[] = faqCategories.flatMap((category) => category.items)

/**
 * The Curriculum page's own five questions.
 *
 * Kept separate from the set above on purpose. Curriculum Page Content (D14)
 * S12 supplies five questions with its own wording and instructs that its
 * FAQPage schema use "the 5 Q&A pairs in Section 12 verbatim"; D19 S7 makes the
 * same demand of its own fourteen. Four of the five overlap in substance but
 * not in words, and the fifth ("What age can my child join?") is shorter than
 * D19's version of it. Pointing both pages at one array would have meant one of
 * the two documents losing, so each page carries what its own document says.
 */
export const curriculumFaqs: Faq[] = [
  {
    q: 'Is there any exam in preschool at LBS KidZ?',
    a: 'No. Assessment is through daily activities (oral response, colouring, drawing, craft), following NCERT’s own recommended approach for the Foundational Stage.',
    schema: true,
  },
  {
    q: 'What is activity-based learning?',
    a: 'Children learn through play, hands-on activity and real experience, the approach recommended by India’s National Curriculum Framework for the Foundational Stage.',
    schema: true,
  },
  {
    q: 'Is LBS KidZ aligned with NEP 2020?',
    a: 'Yes. Our approach follows NEP 2020 and NCF-FS’s guidance on play-based learning, a mother-tongue foundation, and observation-based assessment.',
    schema: true,
  },
  {
    q: 'What language is used for teaching?',
    a: 'A strong foundation in your child’s mother tongue, with natural, joyful exposure to English, in line with NEP 2020 and NCF-FS guidance.',
    schema: true,
  },
  {
    q: 'What age can my child join?',
    a: 'Playgroup (2 to 3 years) through UKG (5 to 6 years). See Programs & Classes for details.',
    schema: true,
  },
]

/** D19 S5: a closing prompt under the last category, routing to Contact Us. */
export const faqsOutro = {
  headline: 'Still have a question?',
  body: 'If your question is not here, ask it directly. A real person on our team will get back to you.',
  linkLabel: 'Talk to us',
}

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
