/**
 * The brand / character layer: SIMPLE, Little Karmayogis, Shastri Sanskaar,
 * Sankalp Calendar.
 *
 * Copy is transcribed from The Lal Bahadur Shastri Way Page Content
 * specification (D11), section by section. Em dashes in the source are set as
 * commas or colons here; no wording is changed.
 *
 * Standing constraint from Project Decisions Log S8, reproduced here because it
 * governs how all of this may be described publicly:
 *   "SIMPLE, Little Karmayogis, Shastri Sanskaar, and Sankalp Calendar are
 *    branding/communication devices only - explicitly not a curriculum,
 *    lesson plan, teacher-training manual, or formal assessment framework."
 *
 * Nothing on this site may therefore present them as a taught syllabus.
 *
 * SECOND STANDING CONSTRAINT, and a newer one. The Honesty Shop is NOT part of
 * this build: "Will be introduced once a campus is operating and a physical
 * space exists, do not build or reference it for now."
 * Source: LBS Way Page Content S8. It was one of five Shastri Sanskaar habit
 * areas here and has been removed outright rather than hidden behind a flag,
 * because a flag is a thing somebody flips by accident.
 */

/** Section 1 — Hero / Intro. */
export const lbsWayIntro = {
  eyebrow: 'The Lal Bahadur Shastri Way',
  headline: 'The Lal Bahadur Shastri Way',
  subheading: 'Where a nation’s values become a child’s daily habits.',
  body:
    'Shastri Ji’s life was a lesson in living values, not just believing in them. At LBS KidZ, we turn that same lesson into something every child can actually practice, whatever their age: from a two-year-old’s first small habits, to a six-year-old’s growing sense of right and wrong.',
  /**
   * `body`, set out for the page's intro band: the first sentence as the lead,
   * the second as the paragraph, and the age range it ends on as two steps.
   * Same words, same claims; nothing here says more than `body` does.
   */
  lead: 'Shastri Ji’s life was a lesson in living values, not just believing in them.',
  /** The phrase in `lead` that carries the accent. Must occur in `lead`. */
  leadEmphasis: 'living values',
  practice:
    'At LBS KidZ, we turn that same lesson into something every child can actually practice, whatever their age:',
  ageRange: [
    { years: 2, text: 'A two-year-old’s first small habits' },
    { years: 6, text: 'A six-year-old’s growing sense of right and wrong' },
  ],
}

export type SimplePillar = {
  letter: string
  name: string
  /** Editorial one-line framing of the value. No curriculum claim is made. */
  summary: string
  /** "How it's practiced", from the specification's own table. */
  practice: string
  /** Only populated where a source document explicitly makes the link. */
  ncertAnchor?: { goals: string[]; note: string }
}

/**
 * Source: LBS Way Page Content S3; Project Decisions Log S1 (Values framework).
 *
 * Every value is written to work across the full 2 to 6 age range: concrete
 * enough for a two-year-old, still meaningful for a six-year-old.
 */
export const simplePillars: SimplePillar[] = [
  {
    letter: 'S',
    name: 'Simplicity',
    summary:
      'Living without excess, and finding that enough is genuinely enough. The quality Shastri Ji is remembered for above all others.',
    practice:
      'Gratitude for small things, no show-off culture, celebrating honest effort over show.',
  },
  {
    letter: 'I',
    name: 'Integrity',
    summary:
      'Doing the right thing when nobody is checking. Introduced to children as a question they ask themselves, never as a rule recited at them.',
    practice: 'Telling the truth, owning up to mistakes, keeping small promises.',
    ncertAnchor: {
      goals: [],
      note: 'NCF-FS recommends framing ethical reasoning as simple questions a child can ask before acting: "Will this hurt somebody?" and "Is this a good thing to do?" Reasoning, not moralising, is how Integrity is meant to be taught. Source: NCERT Curriculum Summary S6.',
    },
  },
  {
    letter: 'M',
    name: 'Mindfulness',
    summary: 'Noticing what is happening, in yourself and around you, before reacting to it.',
    practice:
      'Noticing and appreciating: food on the plate, time with friends, the people who help them.',
  },
  {
    letter: 'P',
    name: 'Patriotism',
    summary:
      'Belonging to a country, and understanding that belonging as a responsibility rather than a slogan.',
    practice:
      'Respecting what belongs to everyone: the national flag, our national animal and flower, keeping shared and public places clean and cared for, whether that is the classroom, a park or a train. A first, concrete step toward respecting those who serve the country, as children grow older.',
  },
  {
    letter: 'L',
    name: 'Leadership',
    summary:
      'Going first when something needs doing, and taking others along rather than ahead of them.',
    practice: 'The courage to speak up, try first, and take on small responsibilities.',
  },
  {
    letter: 'E',
    name: 'Empathy',
    summary:
      'Recognising what another person, or another living thing, is feeling, and then acting on it.',
    practice:
      'Noticing a friend and doing something about it: sharing a toy, helping someone who has fallen, comforting a friend who is crying.',
    ncertAnchor: {
      goals: ['CG-5', 'CG-6'],
      note: 'CG-5 (a positive attitude towards productive work and service, or Seva) and CG-6 (positive regard for the natural environment) are national curricular goals in NCF-FS. Empathy is not only a brand value here, it maps directly onto them. Source: NCERT Curriculum Summary S1.',
    },
  },
]

/**
 * Section 3's heading and intro line.
 *
 * The dots are not decoration and may not be dropped: "S.I.M.P.L.E must always
 * be shown dot-separated with the six words spelled out at least once in this
 * section, never displayed as a plain word."
 * Source: Home Page Content S3, Section 4; LBS Way Page Content S3.
 */
export const simpleIntro = {
  headline: 'S · I · M · P · L · E: Six Values, Lived Daily',
  intro:
    'Six timeless values. Six habits that grow with every child, from their first day at two, to their last day at six.',
}

/**
 * Source: LBS Way Page Content S3, Section 2; Project Decisions Log S1;
 * Global & Indian Preschool Research S5. Precedent: The Diaspark School's
 * "Sparkians".
 */
export const littleKarmayogis = {
  name: 'Little Karmayogis',
  headline: 'Every Child, A Little Karmayogi',
  role: 'Student and family identity name',
  body:
    'In Indian thought, a Karmayogi is someone who does what is right simply because it is right, without waiting for praise or reward. At LBS KidZ, every child is welcomed as a Little Karmayogi: encouraged to act with honesty, kindness and responsibility, one small step at a time.',
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

/** Section 4 — Shastri Sanskaar. */
export const sanskaarIntro = {
  headline: 'Shastri Sanskaar: Everyday Respect, Practised',
  body:
    'Small manners, practised daily until they become second nature: a Namaste to begin the day, “thank you” and “sorry” said without being asked, listening when elders speak, caring for shared spaces. These aren’t lessons from a book. They’re simply how a day unfolds at LBS KidZ.',
}

/**
 * The habit areas.
 *
 * The four the LBS Way specification names in its own sentence, plus the two
 * from Process Guidelines S2 Step 2 that it does not contradict. Delivery
 * points from Website-Curriculum-ERP Alignment Map S2: "Daily etiquette moments
 * woven into Welcome Circle, mealtime, and free-play (per NCERT daily
 * schedule)."
 *
 * The Honesty Shop was a fifth entry and is deliberately gone. See the note at
 * the head of this file.
 */
export const sanskaarHabits: SanskaarHabit[] = [
  {
    slug: 'greetings',
    name: 'A Namaste to begin the day',
    dayMoment: 'Welcome Circle',
    summary: 'How a child greets a teacher, a friend and a visitor at the start of the day.',
  },
  {
    slug: 'thank-you-and-sorry',
    name: '“Thank you” and “sorry”',
    dayMoment: 'Through the day',
    summary: 'Both said without being asked, which is the whole point of them.',
  },
  {
    slug: 'listening-to-elders',
    name: 'Listening when elders speak',
    dayMoment: 'Welcome Circle and free-play',
    summary: 'Small, repeated courtesies towards the adults in a child’s day.',
  },
  {
    slug: 'shared-spaces',
    name: 'Caring for shared spaces',
    dayMoment: 'Free-play and tidy-up',
    summary:
      'A room, a toy shelf and a play area belong to everyone in the class, and are left as they were found.',
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
]

/**
 * Sankalp Calendar.
 *
 * Source: LBS Way Page Content S3, Section 5, plus the documented operating
 * facts already on record:
 *  - It is the daily/weekly delivery rhythm for the SIMPLE pillars.
 *    Source: Project Decisions Log S1.
 *  - Its week runs Monday to Saturday, with one SIMPLE pillar assigned per day.
 *    Source: Process Guidelines S2, Step 3.
 *  - The daily value moment sits at the Goodbye Circle / Reflection Time slot of
 *    NCERT's suggested daily schedule. Source: NCERT Curriculum Summary S4.
 *
 * DELIBERATELY NOT STATED: which weekday carries which pillar. Process
 * Guidelines S2 Step 3 points to "the sample structure already outlined in the
 * Website Reference Document (Section 3.4)", but no Section 3.4 exists in the
 * supplied Website Reference Document. See docs/decisions-and-todos.md item
 * C-01. No day-to-pillar mapping is invented here.
 */
export const sankalpCalendar = {
  name: 'Sankalp Calendar',
  headline: 'Sankalp Calendar: Values, One Day at a Time',
  body:
    'Every week at LBS KidZ carries its own quiet Sankalp, a commitment, gently woven into stories, activities and everyday moments. By the end of the year, values aren’t something a child was taught. They’re something a child has lived.',
  cadence: 'Monday to Saturday, one SIMPLE pillar a day',
  daySlot: 'Goodbye Circle / Reflection Time',
  daySlotSource:
    "NCERT's own suggested daily schedule for a preschool, so the value moment sits inside a recognised classroom rhythm rather than competing for time as an add-on.",
  takeHome:
    'The same small action goes home with the child, so a value practised at school gets one more repetition at home.',
  proofFormats: ['Oral response', 'Colouring', 'Drawing', 'Craft'],
  /**
   * Illustrative only. "Final calendar content to be provided separately."
   * Source: LBS Way Page Content S8.
   */
  examples: ['Food Respect Week', 'Farmer Gratitude Day', 'Soldier Thank-You Card'],
  examplesNote:
    'Examples only. The full year’s calendar is being drafted in the curriculum workstream and piloted with one class before any wider rollout.',
  status:
    'Day-by-day actions are being drafted in the curriculum workstream, then piloted with one class for two to four weeks before any wider rollout.',
}

/** Section 6 — Living the Legacy. */
export const livingTheLegacy = {
  headline: 'Living the Legacy',
  body:
    'This is more than a philosophy. It’s a living connection, carried forward by the family of Shastri Ji himself, into every classroom, every single day.',
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
