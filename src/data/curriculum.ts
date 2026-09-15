/**
 * Curriculum data.
 *
 * Every item here is transcribed from NCERT Curriculum Documents - Summary &
 * Takeaways (Doc 04), which is itself a summary of NCF-FS 2022, the NCERT
 * Guidelines for Preschool Education, The Preschool Curriculum, and the
 * Holistic Progress Card Teacher Guide.
 *
 * Framing rule that governs every string in this file, from Keyword & AEO
 * Strategy S4 and the Sitemap S1.1:
 *   LBS KidZ states its OWN practice and cites NCERT as the source. It does not
 *   interpret or explain government policy on its own authority.
 *
 * The page-facing copy at the head of this file is from the Curriculum &
 * Learning Approach Page Content specification (D13). That document is written
 * for "a parent who has never heard of LBS KidZ and is simply searching for
 * activity-based learning preschool", so its language is plain and
 * parent-searchable where the NCERT transcriptions below it are technical. Both
 * belong on the page: the first is what a parent reads, the second is what it
 * rests on.
 */

/* -------------------------------------------------------------------------
 * Page-facing copy. Source: Curriculum Page Content S3, Sections 1 to 6.
 * ---------------------------------------------------------------------- */

/** Section 1 — Hero. */
export const curriculumIntro = {
  eyebrow: 'Curriculum & learning approach',
  headline: 'Learning Through Play: The NEP 2020 Way',
  standfirst: 'Activity-based, joyful, and built for how young children actually learn.',
}

/**
 * Section 2 — Five Ways Your Child Grows.
 *
 * The five NCF-FS developmental domains, translated into plain parent language.
 * The domains themselves, with their thirteen curricular goals, are set out
 * further down this file exactly as NCERT words them; these are the same five
 * things said the way a parent would say them, which is what this page is for.
 */
export const growthWays = [
  {
    slug: 'moving-and-doing',
    title: 'Moving & Doing',
    body: 'Running, jumping, drawing, building: strong little bodies and steady little hands.',
    /** Names an icon on the page; see `GROWTH_ICONS` in CurriculumPage. */
    icon: 'moving',
    /** The NCF-FS domain this plain-language card corresponds to. */
    domain: 'Physical Development',
  },
  {
    slug: 'feeling-and-relating',
    title: 'Feeling & Relating',
    body: 'Sharing, waiting their turn, understanding feelings: their own, and other people’s.',
    icon: 'feeling',
    domain: 'Socio-Emotional and Ethical Development',
  },
  {
    slug: 'thinking-and-solving',
    title: 'Thinking & Solving',
    body: 'Puzzles, patterns, early counting, and a lot of curious questions.',
    icon: 'thinking',
    domain: 'Cognitive Development',
  },
  {
    slug: 'talking-and-understanding',
    title: 'Talking & Understanding',
    body: 'Stories, rhymes, new words, and the first steps toward reading.',
    icon: 'talking',
    domain: 'Language and Literacy Development',
  },
  {
    slug: 'creating-and-belonging',
    title: 'Creating & Belonging',
    body: 'Art, music, movement, and a growing sense of who they are.',
    icon: 'creating',
    domain: 'Aesthetic and Cultural Development',
  },
]

export const growthWaysIntro = {
  eyebrow: 'How your child grows',
  headline: 'Five Ways Your Child Grows Here',
  standfirst:
    'The five areas of development the National Curriculum Framework for the Foundational Stage is built around, in the words a parent would use.',
}

/** Section 3 — How We Teach. */
export const howWeTeach = {
  eyebrow: 'How we teach',
  headline: 'Play-Based Learning, Aligned with NEP 2020',
  body:
    'Our daily activities follow the National Curriculum Framework for the Foundational Stage (NCF-FS), the framework developed under NEP 2020 for children aged 3 to 8. That means learning happens through play, hands-on activity, and real experience. Not worksheets, and not rote memorisation.',
}

/** Section 4 — Language at LBS KidZ. */
export const languageAtLbsKidz = {
  eyebrow: 'Language',
  headline: 'A Strong Foundation in Their Mother Tongue, First',
  body:
    'Children learn best in the language they already feel at home in. At LBS KidZ, that means a strong foundation in your child’s mother tongue, with English introduced naturally, through songs, stories, and everyday words. Not forced early. Never held back either.',
}

/** Section 5 — How We Track Growth. */
export const trackingGrowth = {
  eyebrow: 'Assessment',
  headline: 'No Exams. Just Honest, Everyday Observation',
  body:
    'There are no formal examinations at LBS KidZ, at any point in the preschool years. Instead, every child’s growth is observed through daily activities, whether that is an oral response, colouring, drawing or a simple task, and marked as Beginner, Progressive, or Proficient. Never as a score. It’s a system built to encourage a child, not compare them to another.',
}

/** Section 6 — A Deeper Story. */
export const deeperStory = {
  eyebrow: 'The deeper story',
  headline: 'Learning, With Values Woven Through',
  body:
    'Every activity at LBS KidZ also carries something more: a small, daily thread of honesty, simplicity and respect, carried forward from the family legacy of Shastri Ji.',
  linkLabel: 'Explore The LBS Way',
}

/** Section 7 — FAQs. The heading only; the questions live in `data/admissions`. */
export const curriculumFaqIntro = {
  eyebrow: 'Straight answers',
  headline: 'Common Questions',
  standfirst:
    'The five a parent researching a preschool asks first. The full set, including the awkward ones, is on the FAQ page.',
}

/* -------------------------------------------------------------------------
 * Panchakosha mapping. Source: NCERT Curriculum Summary S1.
 * ---------------------------------------------------------------------- */

export type KoshaMap = {
  kosha: string
  transliteration: string
  gloss: string
  domain: string
}

export const panchakosha: KoshaMap[] = [
  {
    kosha: 'अन्नमय + प्राणमय',
    transliteration: 'Annamaya + Pranamaya',
    gloss: 'physical, life-energy',
    domain: 'Physical Development',
  },
  {
    kosha: 'मनोमय',
    transliteration: 'Manomaya',
    gloss: 'mind',
    domain: 'Socio-Emotional and Ethical Development',
  },
  {
    kosha: 'विज्ञानमय',
    transliteration: 'Vijnanamaya',
    gloss: 'intellect',
    domain: 'Cognitive Development',
  },
  {
    kosha: 'आनन्दमय',
    transliteration: 'Anandamaya',
    gloss: 'inner self, transcendence',
    domain: 'Aesthetic and Cultural Development',
  },
]

export const panchakoshaNote =
  'NCF-FS bases its framework on the Panchakosha concept from the Taittiriya Upanishad, the five layers of human development, mapped onto modern developmental science. Language and Literacy Development, and Positive Learning Habits, are carried as further domains alongside these. Source: NCERT Curriculum Summary, Section 1.'

/* -------------------------------------------------------------------------
 * The 13 Curricular Goals. Source: NCERT Curriculum Summary S1.
 * Wording follows the source document closely; only sentence case and light
 * readability edits are applied, with no change of meaning.
 * ---------------------------------------------------------------------- */

export type CurricularDomain = {
  slug: string
  domain: string
  accent: 'sky' | 'brand' | 'orange' | 'green'
  goals: { id: string; text: string }[]
}

export const curricularDomains: CurricularDomain[] = [
  {
    slug: 'physical-development',
    domain: 'Physical Development',
    accent: 'sky',
    goals: [
      { id: 'CG-1', text: 'Habits that keep children healthy and safe.' },
      { id: 'CG-2', text: 'Sharpness in sensorial perceptions.' },
      { id: 'CG-3', text: 'A fit and flexible body.' },
    ],
  },
  {
    slug: 'socio-emotional-and-ethical-development',
    domain: 'Socio-Emotional and Ethical Development',
    accent: 'orange',
    goals: [
      {
        id: 'CG-4',
        text: 'Emotional intelligence: understanding and managing emotions, and responding positively to social norms.',
      },
      {
        id: 'CG-5',
        text: 'A positive attitude towards productive work and service, or Seva.',
      },
      { id: 'CG-6', text: 'Positive regard for the natural environment.' },
    ],
  },
  {
    slug: 'cognitive-development',
    domain: 'Cognitive Development',
    accent: 'brand',
    goals: [
      {
        id: 'CG-7',
        text: 'Making sense of the world through observation and logical thinking.',
      },
      {
        id: 'CG-8',
        text: 'Mathematical understanding of quantities, shapes and measures.',
      },
    ],
  },
  {
    slug: 'language-and-literacy-development',
    domain: 'Language and Literacy Development',
    accent: 'sky',
    goals: [
      { id: 'CG-9', text: 'Effective communication in two languages.' },
      { id: 'CG-10', text: 'Fluency in reading and writing in Language 1.' },
      { id: 'CG-11', text: 'Begins reading and writing in Language 2.' },
    ],
  },
  {
    slug: 'aesthetic-and-cultural-development',
    domain: 'Aesthetic and Cultural Development',
    accent: 'green',
    goals: [
      {
        id: 'CG-12',
        text: 'Abilities and sensibilities in the visual and performing arts, and expressing emotions through art.',
      },
    ],
  },
  {
    slug: 'positive-learning-habits',
    domain: 'Positive Learning Habits',
    accent: 'brand',
    goals: [
      {
        id: 'CG-13',
        text: 'Habits of learning that allow active engagement in formal learning environments.',
      },
    ],
  },
]

/* -------------------------------------------------------------------------
 * Guiding principles. Source: NCERT Curriculum Summary S2, transcribed in full.
 * "treat this list as non-negotiable design principles"
 * ---------------------------------------------------------------------- */

export const guidingPrinciples: string[] = [
  'Learning is continuous and cumulative.',
  'Each child is different and develops at their own pace.',
  'Play and activity are the primary context of learning and development.',
  'Responsive, supportive adult interactions are essential.',
  'Children learn through experiential engagement with their environment.',
  'Interactive teaching enhances learning.',
  'Use of indigenous and local material enhances learning opportunities.',
  'Responsiveness to context and appreciation of diversity supports learning.',
  'Mother tongue or home language should be the medium of instruction.',
  'Family involvement contributes to learning.',
]

/* -------------------------------------------------------------------------
 * The preschool day. Source: NCERT Curriculum Summary S4.
 * The "Method of Conduct" column in the source PDF is misaligned by the table
 * extraction; the blocks below preserve the source order of the activity
 * blocks, which is the load-bearing content. See docs/decisions-and-todos.md
 * item C-02 before publishing the method labels as authoritative.
 * ---------------------------------------------------------------------- */

export type DayBlock = {
  name: string
  detail: string
  /** Marked where the source is unambiguous; otherwise left undefined. */
  conduct?: string
  isSankalpMoment?: boolean
}

export const dailySchedule: DayBlock[] = [
  {
    name: 'Welcome Circle',
    detail:
      'Health check, attendance, weather, the date and day, conversation and rhymes.',
    conduct: 'Teacher-initiated, large group',
  },
  {
    name: 'Environmental and Mathematical Concepts',
    detail: 'Quantities, shapes, measures and making sense of the world nearby.',
  },
  {
    name: 'Indoor free-play in activity areas',
    detail: 'Children choose the corner and the material.',
  },
  { name: 'Break Time', detail: 'Eating together, and the habits that go with it.' },
  {
    name: 'Language and early literacy',
    detail: 'Storytelling, rhymes and role-play.',
  },
  { name: 'Creative Activity: Art and Music', detail: 'Making, singing and moving.' },
  { name: 'Outdoor Play', detail: 'A fit and flexible body, out in the open.' },
  {
    name: 'Goodbye Circle / Reflection Time',
    detail:
      'Where the day settles. This is the slot the Sankalp Calendar value moment sits in, by design.',
    conduct: 'Teacher-initiated, large group',
    isSankalpMoment: true,
  },
]

/** Source: NCERT Curriculum Summary S4. */
export const programmeDuration = {
  hoursPerDay: '4 hours a day',
  hoursNote: 'Described as essential in the source guidance.',
  week: 'A five-day week, Monday to Friday',
  saturday:
    'Saturday is reserved for teacher planning, material preparation, parent contact and record-keeping. It is not an attendance day for children.',
}

/** Source: NCERT Curriculum Summary S4 (Principles of Programme Planning). */
export const planningPrinciples: string[] = [
  'Balance indoor and outdoor, quiet and active, small group, large group and individual, child-initiated and teacher-initiated.',
  'Keep a reasonable pace through the day, and avoid sit-down work when children are tired.',
  'Move from simple to complex, familiar to unfamiliar, concrete to abstract.',
  'Stay flexible. A genuine interest in the moment beats a rigid plan.',
]

/* -------------------------------------------------------------------------
 * Assessment. Source: NCERT Curriculum Summary S5; HPC Teacher Guide.
 * ---------------------------------------------------------------------- */

export const attainmentLevels = [
  {
    level: 'Beginner',
    definition: 'Tries to achieve the competency with a lot of teacher support.',
  },
  { level: 'Progressive', definition: 'Achieves it with occasional or some support.' },
  { level: 'Proficient', definition: 'Achieves it independently.' },
]

export const assessmentPrinciples: string[] = [
  'Assessment is continuous, comprehensive and non-competitive.',
  'It is based on observing and documenting health and nutrition status, participation in day-to-day experiences, artwork and other things a child makes, and behaviour.',
  'Its purpose is to recognise and encourage strengths, identify where a child needs support, and address developmental gaps. It is not there to rank or grade children against each other.',
  'The tools are anecdotal records, checklists, portfolios and interactions with other children.',
  'Learning outcomes are cumulative. A skill noted at one age is assumed to continue at the next age band, not re-tested from scratch.',
]

export const assessmentDisplayNote =
  'Attainment can be shown with a neutral icon such as a flower, a tree or a smiley, rather than a numeric score. Source: NCERT Curriculum Summary, Section 5.'

/* -------------------------------------------------------------------------
 * Language. Source: NCERT Curriculum Summary S3; Project Decisions Log S6.
 * ---------------------------------------------------------------------- */

export const languagePosition = {
  headline: 'A strong Hindi and home-language foundation, with joyful English exposure',
  practice:
    'Daily instruction is predominantly in Hindi or the child’s home language. English arrives through songs, stories and simple vocabulary, as natural exposure rather than as the instructional medium.',
  reasons: [
    'A child arriving at preschool at three already carries three years of competence in their home language. Comprehension, expression, social interaction and early concept formation are all built on that base.',
    'Research in India and elsewhere shows that children taught in their home language do better, even in subjects like mathematics and science. Children taught in an unfamiliar language do not keep up.',
    'Skills and concepts learned in the home language transfer. They do not have to be taught again when a new language is introduced.',
    'Home language is tied to a child’s personal, social and cultural identity. Imposing an unfamiliar language early undermines self-confidence and secure identity formation.',
  ],
  sourceNote:
    'NCF-FS and the NCERT Guidelines for Preschool Education are emphatic, not tentative, that mother tongue or home language should be the primary medium of instruction through the Foundational Stage. Source: NCERT Curriculum Summary, Section 3.',
}

/* -------------------------------------------------------------------------
 * Ethics teaching. Source: NCERT Curriculum Summary S6.
 * ---------------------------------------------------------------------- */

export const ethicsQuestions = ['Will this hurt somebody?', 'Is this a good thing to do?']

export const ethicsNote =
  'NCF-FS recommends introducing ethical reasoning early and throughout schooling, framed as simple questions a child can ask themselves before acting. Reasoning, not moralising and not lecturing, is the recommended method for early character education. Source: NCERT Curriculum Summary, Section 6.'

/* -------------------------------------------------------------------------
 * Family involvement. Source: NCERT Curriculum Summary S9.
 * ---------------------------------------------------------------------- */

export const familyInvolvement = {
  principle:
    'Family involvement is treated as a core contributor to learning, not an optional extra.',
  practices: [
    'Inviting parents to share local folk tales, songs and traditions.',
    'Encouraging simple, developmentally appropriate activities at home.',
    'Parent membership in School Management Committees.',
  ],
  sourceNote: 'Source: NCERT Curriculum Summary, Section 9.',
}
