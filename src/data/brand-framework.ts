/**
 * The brand / character layer: SIMPLE, Little Karmayogis, Shastri Sanskaar,
 * Sankalp Calendar.
 *
 * Standing constraint from Project Decisions Log S8, reproduced here because it
 * governs how all of this may be described publicly:
 *   "SIMPLE, Little Karmayogis, Shastri Sanskaar, and Sankalp Calendar are
 *    branding/communication devices only - explicitly not a curriculum,
 *    lesson plan, teacher-training manual, or formal assessment framework."
 *
 * Nothing on this site may therefore present them as a taught syllabus.
 */

export type SimplePillar = {
  letter: string
  name: string
  /** Editorial one-line framing of the value. No curriculum claim is made. */
  summary: string
  /** Only populated where a source document explicitly makes the link. */
  ncertAnchor?: { goals: string[]; note: string }
}

/** Source: Project Decisions Log S1 (Values framework). */
export const simplePillars: SimplePillar[] = [
  {
    letter: 'S',
    name: 'Simplicity',
    summary:
      'Living without excess, and finding that enough is genuinely enough. The quality Shastri ji is remembered for above all others.',
  },
  {
    letter: 'I',
    name: 'Integrity',
    summary:
      'Doing the right thing when nobody is checking. Introduced to children as a question they ask themselves, never as a rule recited at them.',
    ncertAnchor: {
      goals: [],
      note: 'NCF-FS recommends framing ethical reasoning as simple questions a child can ask before acting: "Will this hurt somebody?" and "Is this a good thing to do?" Reasoning, not moralising, is how Integrity is meant to be taught. Source: NCERT Curriculum Summary S6.',
    },
  },
  {
    letter: 'M',
    name: 'Mindfulness',
    summary: 'Noticing what is happening, in yourself and around you, before reacting to it.',
  },
  {
    letter: 'P',
    name: 'Patriotism',
    summary:
      'Belonging to a country, and understanding that belonging as a responsibility rather than a slogan.',
  },
  {
    letter: 'L',
    name: 'Leadership',
    summary:
      'Going first when something needs doing, and taking others along rather than ahead of them.',
  },
  {
    letter: 'E',
    name: 'Empathy',
    summary:
      'Recognising what another person, or another living thing, is feeling, and then acting on it.',
    ncertAnchor: {
      goals: ['CG-5', 'CG-6'],
      note: 'CG-5 (a positive attitude towards productive work and service, or Seva) and CG-6 (positive regard for the natural environment) are national curricular goals in NCF-FS. Empathy is not only a brand value here, it maps directly onto them. Source: NCERT Curriculum Summary S1.',
    },
  },
]

/**
 * Source: Project Decisions Log S1; Global & Indian Preschool Research S5.
 * Precedent: The Diaspark School's "Sparkians".
 */
export const littleKarmayogis = {
  name: 'Little Karmayogis',
  role: 'Student and family identity name',
  usedWhere:
    'The everyday name for children at LBS KidZ, in the classroom and in every parent communication.',
  why: 'Across every Indian and global preschool brand studied for this project, very few give students a distinct identity of their own. That is a missed opportunity we are deliberately not repeating.',
}

export type SanskaarHabit = {
  slug: string
  name: string
  /** Where in the day it lives. Source: Alignment Map S2. */
  dayMoment: string
  summary: string
}

/**
 * The five habit areas, named exactly as in Process Guidelines S2, Step 2.
 * Delivery points from Website-Curriculum-ERP Alignment Map S2:
 * "Daily etiquette moments woven into Welcome Circle, mealtime, and free-play
 *  (per NCERT daily schedule)."
 */
export const sanskaarHabits: SanskaarHabit[] = [
  {
    slug: 'greetings',
    name: 'Greetings',
    dayMoment: 'Welcome Circle',
    summary: 'How a child greets a teacher, a friend and a visitor at the start of the day.',
  },
  {
    slug: 'respect-for-elders',
    name: 'Respect for elders',
    dayMoment: 'Welcome Circle and free-play',
    summary: 'Small, repeated courtesies towards the adults in a child’s day.',
  },
  {
    slug: 'table-manners',
    name: 'Table manners',
    dayMoment: 'Mealtime',
    summary: 'Sitting, sharing, waiting and clearing up at break time.',
  },
  {
    slug: 'food-gratitude',
    name: 'Food gratitude',
    dayMoment: 'Mealtime',
    summary:
      'Where food comes from, and who grew it. The habit closest to the legacy this school carries.',
  },
  {
    slug: 'honesty-shop',
    name: 'Honesty Shop',
    dayMoment: 'Free-play',
    summary:
      'A small real choice, made without an adult watching. Integrity practised rather than explained.',
  },
]

/**
 * Sankalp Calendar.
 *
 * Documented facts only:
 *  - It is the daily/weekly delivery rhythm for the SIMPLE pillars.
 *    Source: Project Decisions Log S1.
 *  - Its week runs Monday to Saturday, with one SIMPLE pillar assigned per day.
 *    Source: Process Guidelines S2, Step 3.
 *  - The daily value moment sits at the Goodbye Circle / Reflection Time slot of
 *    NCERT's suggested daily schedule. Source: NCERT Curriculum Summary S4;
 *    Project Decisions Log S8; Alignment Map S2.
 *  - It is also a parent take-home tool and a downloadable lead magnet on the
 *    Admissions page. Source: Alignment Map S2; NCERT Curriculum Summary S9.
 *  - Each day produces one ERP activity record tagged with that day's SIMPLE
 *    pillar. Source: Alignment Map S2.
 *
 * DELIBERATELY NOT STATED: which weekday carries which pillar. Process
 * Guidelines S2 Step 3 points to "the sample structure already outlined in the
 * Website Reference Document (Section 3.4)", but no Section 3.4 exists in the
 * supplied Website Reference Document. See docs/decisions-and-todos.md item
 * C-01. No day-to-pillar mapping is invented here.
 */
export const sankalpCalendar = {
  name: 'Sankalp Calendar',
  cadence: 'Monday to Saturday, one SIMPLE pillar a day',
  daySlot: 'Goodbye Circle / Reflection Time',
  daySlotSource:
    "NCERT's own suggested daily schedule for a preschool, so the value moment sits inside a recognised classroom rhythm rather than competing for time as an add-on.",
  takeHome:
    'The same small action goes home with the child, so a value practised at school gets one more repetition at home.',
  proofFormats: ['Oral response', 'Colouring', 'Drawing', 'Craft'],
  status:
    'Day-by-day actions are being drafted in the curriculum workstream, then piloted with one class for two to four weeks before any wider rollout.',
}

/** Source: Process Guidelines S1 (Guiding Constraints, non-negotiable). */
export const sankalpConstraints = [
  'Every activity is fully self-run. A teacher reads it and does it the same day, with no prior training needed.',
  'Every activity produces a simple proof of action suited to preschool age: an oral response, colouring, drawing or craft. Never a written test.',
  'The same value runs across Playgroup, Nursery, LKG and UKG. Only the complexity and the expected independence change.',
  'Values are framed as questions a child can ask themselves, not as rules recited at them.',
]

/**
 * Source: Process Guidelines S2, Steps 6-8.
 * Shown publicly because it is a credibility signal in itself: the rhythm gets
 * piloted before it reaches a parent's child.
 */
export const sankalpProcess = [
  {
    step: 'Draft',
    detail:
      'One small action per age band for each pillar and each habit area, kept short enough to fit inside a normal classroom moment.',
  },
  {
    step: 'Pilot',
    detail:
      'Run the drafted week with a single class for two to four weeks. Timing problems, material problems and wrong-age activities surface here, not in front of every class.',
  },
  {
    step: 'Listen',
    detail:
      'Ask parents directly whether the take-home version got used, whether it was clear, and whether their child engaged with it at home.',
  },
  {
    step: 'Lock',
    detail:
      'Only then finalise the parent-facing calendar and the teacher-facing activity card. The teacher card stays one action and its proof of action, never a lesson plan.',
  },
]
