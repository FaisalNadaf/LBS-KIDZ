/**
 * The "For Parents" group: Value Stories and Parenting Tips & Resources.
 *
 * Both pages are now written from their own page specifications, and those are
 * the source of truth for every string below:
 *
 *   D16  Value Stories Page Content
 *   D17  Parenting Tips & Resources Page Content
 *
 * Two standing constraints from the wider project survive them, and are noted
 * where they bite:
 *
 *   - Parenting Tips is "intentionally not a vehicle for NEP 2020/policy
 *     keywords", and D17 restates it: the page "can stand entirely on its own
 *     early-years parenting merit", independent of the Legacy/values storyline.
 *     Source: Keyword & AEO Strategy S5; Full Website Sitemap S1.1; D17 S1.
 *   - The Honesty Shop stays out of this build until a campus exists. D16 S8
 *     names it a deliberate exclusion, which is why the Integrity story below
 *     is the railway resignation rather than the shop.
 *
 * No em dash appears in any published string on this site, so the sources'
 * em-dash sentence breaks are set as commas, colons or full stops.
 */

export const valueStoriesIntro = {
  eyebrow: 'Value Stories',
  /** D16 S3, Section 1. */
  headline: 'Where a Value Actually Begins',
  standfirst: 'Every school can name its values. These are the real moments ours started from.',
  /**
   * D16 S4 asks for a jump-to-pillar quick nav near the hero, "so a parent can
   * skip to the value they are most curious about". Six full stories is a long
   * scroll, and this is the page's only interaction beyond scrolling.
   */
  quickNavLabel: 'Jump to a value',
}

export type ValueStory = {
  slug: string
  /** The SIMPLE letter this story belongs to. Rendered as a coloured tag. */
  pillar: string
  /** D16's "category label": a small-caps kicker above the title. */
  kicker: string
  title: string
  body: string[]
  /** The everyday question a child is asked, in the highlighted callout. */
  question: string
  /** Kept for provenance where the wider documents ground the story. */
  sourceNote?: string
}

/**
 * Six stories, one per SIMPLE pillar, in the order D16 sets them out.
 *
 * The page's job, in its own words, is to show "where each value actually comes
 * from, a real moment in Shastri Ji's life", ending "in the same everyday
 * question a child is asked to practice it". That question format is the one
 * NCF-FS recommends for early ethical reasoning: something a child asks
 * themselves, rather than a rule recited at them.
 * Source: D16 S1, S3; NCERT Curriculum Summary S6.
 */
export const valueStories: ValueStory[] = [
  {
    slug: 'simplicity',
    pillar: 'Simplicity',
    kicker: 'What Simplicity Actually Looks Like',
    title: 'Enough, and Nothing More',
    body: [
      'Shastri Ji held the highest office in the country, and left almost nothing behind that marked it: no grand house, no personal fortune, none of the things people usually collect along the way.',
      'It wasn’t a rule he followed. It was simply how much he needed.',
    ],
    question: 'Do I really need this, or do I just want it?',
  },
  {
    slug: 'integrity',
    pillar: 'Integrity',
    kicker: 'Owning It, Before Anyone Asks You To',
    title: 'He Answered for It Himself',
    body: [
      'After a string of railway accidents in 1956, nobody called for Shastri Ji’s resignation as Railway Minister. He offered it anyway, because he believed the person responsible has to answer for what happens on their watch, whether or not anyone is checking.',
      'A child doesn’t need to know what a railway ministry is to feel the shape of this: owning your part, even the part that went wrong.',
    ],
    question: 'Did I own my part today, even the part that went wrong?',
  },
  {
    slug: 'mindfulness',
    pillar: 'Mindfulness',
    kicker: 'Noticing, Before Responding',
    title: 'Listening, When Everyone Wanted Him to React',
    body: [
      'In the final days of the 1965 war, during the Tashkent talks, the pressure on Shastri Ji was to move fast and speak strong. He chose instead to listen carefully and weigh every side, negotiating patiently until peace was actually signed, the night before he passed away.',
      'A child doesn’t need to understand a peace treaty to feel the shape of this: pausing to notice, before reacting.',
    ],
    question: 'Did I pause before I reacted today?',
  },
  {
    slug: 'patriotism',
    pillar: 'Patriotism',
    kicker: 'What Belonging Really Means',
    title: 'The Soldier and the Farmer, in One Breath',
    body: [
      'Jai Jawan Jai Kisan named two kinds of ordinary work in the same sentence, at a moment the country depended on both.',
      'Not a slogan about power. A reminder that a nation is built from people doing their work well, and that respecting that work is what belonging looks like.',
    ],
    question: 'Whose work made my day possible?',
    sourceNote:
      'Patriotism is framed here as responsibility rather than as a slogan, in keeping with the brand direction that the legacy motif is used quietly and never politically.',
  },
  {
    slug: 'leadership',
    pillar: 'Leadership',
    kicker: 'What Leading Actually Looks Like',
    title: 'Stepping Forward, Before Being Asked',
    body: [
      'Long before he held any office, while still a very young man, Shastri Ji joined India’s freedom movement, at real personal cost, with no one asking him to.',
      'He simply went first.',
    ],
    question: 'Did I step up, or wait to be told?',
  },
  {
    slug: 'empathy',
    pillar: 'Empathy',
    kicker: 'Where Gratitude for Food Comes From',
    title: 'He Tried It at Home First',
    body: [
      'During the 1965 food shortage, Shastri Ji asked the nation to skip one meal a week. Before asking anyone else, he tested it in his own household first, so he’d know, not guess, what he was asking of people.',
      'A child doesn’t need the history to feel the point: the food on their plate was grown by somebody, who worked for it.',
    ],
    question: 'Who grew the food on my plate today?',
    sourceNote:
      'This is the story our food-gratitude habit sits on. It maps onto CG-5, a positive attitude towards productive work and service, in NCF-FS.',
  },
]

/** D16 S5: a closing route out, for a parent who now wants the full framework. */
export const valueStoriesOutro = {
  headline: 'The Framework These Sit Inside',
  body: 'Six stories, six values. The LBS Way is where they stop being a page to read and become a daily practice.',
  linkLabel: 'Explore The LBS Way',
}

/* ---------------------------------------------------------------------- */

export const parentingIntro = {
  eyebrow: 'Parenting Tips & Resources',
  /** D17 S3, Section 1. */
  headline: 'Helpful Whether or Not You Ever Enrol With Us',
  standfirst:
    'Practical ideas and honest answers to the questions every early-years parent runs into.',
}

/**
 * Three recurring tags, "each can carry its own subtle accent color for quick
 * visual scanning". Source: D17 S4.
 */
export type ParentingCategory = 'Activity Ideas' | 'Early-Years Concerns' | 'Preschool Readiness'

export type ParentingResource = {
  slug: string
  category: ParentingCategory
  title: string
  /** D17's "intro": one line under the title, before the bullets. */
  summary: string
  points: string[]
}

/**
 * Twelve cards, in D17's own order.
 *
 * "12 cards to start, this page is designed to keep growing over time as more
 * topics come up." The list is a plain array for exactly that reason: a new
 * topic is a new entry here and nothing else. Source: D17 S8.
 *
 * Tone instruction, and the reason no card carries a CTA: the page "should feel
 * like advice from a knowledgeable friend, not marketing copy".
 * Source: D17 S4, S5.
 */
export const parentingResources: ParentingResource[] = [
  {
    slug: 'play-is-the-work',
    category: 'Activity Ideas',
    title: 'Play Is the Work, Not the Break From It',
    summary:
      'Parents sometimes worry that free play is time spent between the “real” learning. At this age, it is usually the opposite: play is where most of the real learning actually happens.',
    points: [
      'Ordinary household objects, spoons, boxes, old cloth, bottle caps, teach as much as expensive toys. A child learns by handling what is real and familiar.',
      'Counting, sorting, and comparing sizes happen naturally during play. No flashcards required.',
      'Follow what catches their attention that day. A plan abandoned because your child got interested in something else is still a plan that worked.',
    ],
  },
  {
    slug: 'english-at-home',
    category: 'Early-Years Concerns',
    title: 'Do We Need to Speak English at Home?',
    summary:
      'This is the question we hear most often, and the one the evidence answers most clearly.',
    points: [
      'Speak to your child in whichever language you are most comfortable and expressive in. That comfort is what they are actually learning from.',
      'By age three, a child already carries years of fluency in their home language. Everything new gets built on that foundation.',
      'English arrives naturally through songs, stories, and play. It does not need to arrive first to arrive well.',
    ],
  },
  {
    slug: 'ready-for-school',
    category: 'Preschool Readiness',
    title: 'What “Ready for School” Actually Means',
    summary:
      'It is a smaller, more practical idea than most parents expect, and it has very little to do with the alphabet.',
    points: [
      'Being comfortable away from a parent for a few hours matters more than knowing letters.',
      'A steady rhythm at home, regular wake, meal, and sleep times, makes school routines much easier to settle into.',
      'Small independence goes a long way: washing hands, carrying a bag, opening a lunch box, saying when something is wrong.',
    ],
  },
  {
    slug: 'behind-their-cousin',
    category: 'Early-Years Concerns',
    title: 'When Your Child Seems Behind Their Cousin',
    summary:
      'It is one of the most natural comparisons a parent makes, and almost always the wrong one to dwell on.',
    points: [
      'Every child develops at their own pace. That is not just a comforting phrase, it is an actual design principle behind how early-years curricula are built.',
      'What matters is your own child’s progress over time, not the gap between two different children.',
      'A skill that looks “behind” at three often closes on its own by five, without anyone forcing it.',
    ],
  },
  {
    slug: 'right-and-wrong',
    category: 'Activity Ideas',
    title: 'Talking to a Small Child About Right and Wrong',
    summary: 'You do not need a lecture. Two simple questions do most of the work.',
    points: [
      'Ask “would this be okay if it happened to you?” and “is this a good thing to do?”, then wait for their answer instead of supplying it yourself.',
      'The reasoning is the point, not the correct conclusion. Let them work through it, even slowly.',
      'Real, small choices teach this better than made-up hypothetical ones.',
    ],
  },
  {
    slug: 'reading-together',
    category: 'Activity Ideas',
    title: 'Reading Together, Before They Can Read',
    summary:
      'A child does not need to recognise a single letter to get everything that matters out of a book.',
    points: [
      'Tell the story as much as you read it. Point at pictures, ask questions, let them guess what happens next.',
      'Local stories and family tales count just as much as picture books, and often land better.',
      'Let them retell it back to you, even if they get it wrong. That is where language is actually being built.',
    ],
  },
  {
    slug: 'screen-time',
    category: 'Activity Ideas',
    title: 'Screen Time in the Early Years',
    summary:
      'Most parents do not want a hard rule here. They want a sane way to think about it.',
    points: [
      'Co-watching turns a screen into a shared activity instead of a solo one. Talk about what is happening as you watch together.',
      'Short, chosen sessions work better than long, unplanned ones. A child benefits more from twenty focused minutes than two distracted hours.',
      'Screens work best as one option among many, not the default one reached for when nothing else is happening.',
    ],
  },
  {
    slug: 'first-week-away',
    category: 'Early-Years Concerns',
    title: 'The First Week Away From You',
    summary:
      'Almost every child struggles with the first few days of separation, and almost every child settles faster than parents expect.',
    points: [
      'A short, consistent goodbye works better than a long one. Lingering usually makes the moment harder for both of you.',
      'A small, familiar object from home can help bridge the gap for the first week or two.',
      'Trust that a teacher’s version of the day (“she cried for five minutes, then played happily”) is usually the full picture, not the edited one.',
    ],
  },
  {
    slug: 'toilet-training',
    category: 'Preschool Readiness',
    title: 'Toilet Training and Starting School',
    summary:
      'This is a genuinely practical concern, not a minor one, and it is worth being honest about timing.',
    points: [
      'Most preschools work with children still in the process, not just those fully trained. Ask directly about a school’s actual approach rather than assuming.',
      'Starting the habit at home a few months before joining, rather than right before, gives a child time to adjust without added pressure.',
      'Setbacks during the settling-in period are common and temporary, not a sign anything has gone wrong.',
    ],
  },
  {
    slug: 'mealtime-learning',
    category: 'Activity Ideas',
    title: 'Turning Mealtime Into Learning Time',
    summary:
      'Some of the richest early learning happens at the table, without ever feeling like a lesson.',
    points: [
      'Naming colours, counting pieces, and describing textures out loud turns an ordinary meal into vocabulary practice.',
      'Letting a child serve themselves small portions builds independence and a basic sense of quantity.',
      'Talking about where food comes from, the farmer, the market, the kitchen, builds the same gratitude habit we encourage at school.',
    ],
  },
  {
    slug: 'tantrums',
    category: 'Early-Years Concerns',
    title: 'Should I Worry About Tantrums?',
    summary:
      'Almost never about the toy itself. Usually about a feeling too big for the words a small child has.',
    points: [
      'Naming the feeling (“you are upset because we have to leave”) often works better than trying to reason the tantrum away.',
      'Consistency matters more than the specific rule. Children settle faster when they know what to expect, even if they do not like it.',
      'A tantrum is not a discipline failure on your part. It is a normal, age-appropriate way of processing big emotions.',
    ],
  },
  {
    slug: 'playgroup-now-or-wait',
    category: 'Preschool Readiness',
    title: 'Playgroup Now, or Wait a Year?',
    summary:
      'There is no single right answer here, but there are real questions worth asking yourself first.',
    points: [
      'Consider your child’s comfort with brief separations more than their age in months.',
      'A short trial period or visit can tell you more than any age guideline can.',
      'Starting a little later rarely causes lasting disadvantage. Starting before a child is ready more often does.',
    ],
  },
]

/**
 * D17 S5: "a light closing prompt beneath the grid inviting parents to explore
 * Curriculum & Learning Approach." Light is the operative word. This is not a
 * conversion ask and must not become one.
 */
export const parentingOutro = {
  headline: 'How We Do This at School',
  body: 'The same thinking runs through our classrooms: play first, mother tongue first, and no child measured against another.',
  linkLabel: 'See Our Curriculum & Learning Approach',
}
