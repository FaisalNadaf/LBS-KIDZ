/**
 * The "For Parents" group: Value Stories and Parenting Tips & Resources.
 *
 * Value Stories, Phase 1 scope:
 *   "Sourced from real classroom moments once operational (Phase 2);
 *    general/legacy stories in Phase 1."  Source: Alignment Map S2.
 *   Tone: "show how a value is learned, not just state that it is taught",
 *   following the Reggio Emilia practice of documenting a child's process of
 *   thinking rather than only outcomes. Source: Global & Indian Research S3.
 *
 * Parenting Tips & Resources, scope and hard exclusion:
 *   "age-appropriate activity ideas, preschool-readiness guidance, common
 *    early-years concerns" and it is "intentionally not a vehicle for NEP 2020
 *    /policy keywords". Source: Full Website Sitemap S1.1;
 *   Keyword & AEO Strategy S5.
 */

export const valueStoriesIntro = {
  eyebrow: 'Value Stories',
  headline: 'How a value is actually learned',
  standfirst:
    'Anyone can list values on a website. These are stories about how a value gets into a child, which is slower, smaller and more interesting than a list.',
  phase1Note:
    'In this first phase these are stories from the Shastri legacy itself. Once our classrooms are running, stories from real classroom moments will sit alongside them, with families’ permission.',
}

export type ValueStory = {
  slug: string
  pillar: string
  title: string
  kicker: string
  body: string[]
  question: string
  sourceNote: string
}

/**
 * Phase 1 stories, drawn from the legacy material the source documents point
 * to rather than from any classroom that does not yet exist.
 * Each story ends with the ethical-reasoning question format NCF-FS
 * recommends. Source: NCERT Curriculum Summary S6.
 */
export const valueStories: ValueStory[] = [
  {
    slug: 'one-meal',
    pillar: 'Empathy',
    title: 'The meal that was not eaten',
    kicker: 'Where food gratitude comes from',
    body: [
      'In 1965 India was short of food and at war at the same time. The Prime Minister asked the country to skip one meal a week so that what there was would go further.',
      'Before he asked anyone else, he tried it in his own house, to see whether his family could manage it.',
      'A child does not need the history to feel the point of this. They need to know that the food on their plate was grown by somebody, and that somebody worked for it.',
    ],
    question: 'Who grew what is on my plate today?',
    sourceNote:
      'This is the story our food-gratitude habit sits on. It maps onto CG-5, a positive attitude towards productive work and service, in NCF-FS.',
  },
  {
    slug: 'jai-jawan-jai-kisan',
    pillar: 'Patriotism',
    title: 'Two people on the same line',
    kicker: 'What belonging actually asks of you',
    body: [
      'Jai Jawan Jai Kisan put the soldier and the farmer in the same sentence, at a moment when the country badly needed both.',
      'What makes it useful for a four-year-old is not the slogan. It is the idea that a country is made of people doing ordinary work, and that respecting that work is what belonging looks like.',
    ],
    question: 'Whose work helped me today?',
    sourceNote:
      'Patriotism is framed here as responsibility rather than as a slogan, in keeping with the brand direction that the legacy motif is used quietly and never politically.',
  },
  {
    slug: 'the-honesty-shop',
    pillar: 'Integrity',
    title: 'A shop with nobody behind the counter',
    kicker: 'Integrity practised, not explained',
    body: [
      'The Honesty Shop is one of our five Shastri Sanskaar habits. A small set of things, a price, and no adult watching.',
      'The point is not to catch a child out. It is to give them a real, small, safe moment where honesty costs something, so that the word stops being abstract.',
      'The teacher does not lecture afterwards. They ask a question instead.',
    ],
    question: 'Is this a good thing to do?',
    sourceNote:
      'NCF-FS recommends exactly this: ethical reasoning framed as simple questions a child asks themselves, rather than rules recited at them.',
  },
]

/* ---------------------------------------------------------------------- */

export const parentingIntro = {
  eyebrow: 'Parenting Tips & Resources',
  headline: 'Useful whether or not your child ever joins us',
  standfirst:
    'This section is deliberately not about our school, our brand or education policy. It is age-appropriate activity ideas, preschool-readiness guidance and the concerns that come up in every early-years household.',
}

export type ParentingResource = {
  slug: string
  category: 'Activity ideas' | 'Preschool readiness' | 'Early-years concerns'
  title: string
  summary: string
  points: string[]
  /** Where the underlying principle comes from, when it comes from the docs. */
  grounding?: string
}

/**
 * Content here is built from the NCERT-derived principles already established
 * in this project, applied practically for a home setting. No developmental
 * claim is made that is not present in those principles.
 */
export const parentingResources: ParentingResource[] = [
  {
    slug: 'play-at-home',
    category: 'Activity ideas',
    title: 'Play is not a break from learning',
    summary:
      'The simplest thing you can do at home costs nothing and needs no equipment.',
    points: [
      'Let the material be local and ordinary: pulses, bangles, old cloth, bottle caps, newspaper. Indigenous and local material genuinely widens what a child can do with it.',
      'Sort, count, pour, stack, thread. Quantity, shape and measure are all in a kitchen already.',
      'Follow their interest when it appears. A plan you abandon because your child got interested in something else is a plan that worked.',
    ],
    grounding:
      'From the guiding principles for preschool curriculum: play and activity are the primary context of learning, and use of indigenous and local material enhances learning opportunities.',
  },
  {
    slug: 'home-language-first',
    category: 'Early-years concerns',
    title: 'Should we speak English at home?',
    summary:
      'The most common worry we hear, and the one where the evidence is clearest.',
    points: [
      'Speak to your child in the language you are most fluent and most expressive in. Your comfort in the language is what your child is actually learning from.',
      'A child arriving at preschool at three already has three years of competence in their home language. Everything new gets built on that.',
      'What a child learns in their home language transfers. It does not have to be taught again in another language later.',
      'English will come, through songs, stories and play. It does not need to arrive first to arrive well.',
    ],
    grounding:
      'Summarised from the language guidance in NCF-FS and the NCERT Guidelines for Preschool Education.',
  },
  {
    slug: 'ready-for-preschool',
    category: 'Preschool readiness',
    title: 'What preschool readiness actually means',
    summary:
      'It is much less academic than most parents fear, and much more about the day’s shape.',
    points: [
      'Being able to separate from you for a few hours matters far more than knowing letters.',
      'A predictable rhythm at home helps: waking, eating and sleeping around the same times.',
      'Practise the small independences: washing hands, carrying a bag, opening a lunch box, saying when something is wrong.',
      'Do not drill the alphabet. Nothing in the foundational years is assessed as a test, and starting that habit early does not help.',
    ],
    grounding:
      'Consistent with the non-competitive, observation-based assessment approach recommended for the Foundational Stage.',
  },
  {
    slug: 'every-child-own-pace',
    category: 'Early-years concerns',
    title: 'My child is behind their cousin',
    summary: 'Almost always the wrong comparison to be making.',
    points: [
      'Each child is different and develops at their own pace. This is a design principle of the national framework, not a consolation.',
      'Learning is continuous and cumulative. A skill a child shows at one stage is assumed to carry forward, not re-tested from scratch.',
      'What is worth watching is the direction of travel for your own child, not the gap between two children.',
    ],
    grounding:
      'From the guiding principles for preschool curriculum, and from the cumulative treatment of learning outcomes in the Holistic Progress Card guidance.',
  },
  {
    slug: 'talking-about-right-and-wrong',
    category: 'Activity ideas',
    title: 'Talking to a small child about right and wrong',
    summary: 'Two questions do more work than any amount of explaining.',
    points: [
      'Ask "Will this hurt somebody?" and "Is this a good thing to do?" Then wait, and let them answer.',
      'Resist finishing the thought for them. The reasoning is the point, not the conclusion.',
      'Small real choices teach this better than big hypothetical ones.',
    ],
    grounding:
      'This is the exact framing NCF-FS recommends for early ethical reasoning.',
  },
  {
    slug: 'reading-together',
    category: 'Activity ideas',
    title: 'Reading together before a child can read',
    summary: 'Storytelling, rhymes and role-play do the heavy lifting here.',
    points: [
      'Tell the story rather than only reading it. Local folk tales and family stories count, and often land better.',
      'Let them retell it back to you, wrongly. The retelling is where the language is being built.',
      'Rhymes and songs carry sound patterns that written practice cannot replace at this age.',
    ],
    grounding:
      'Mirrors the language and early-literacy block in NCERT’s suggested preschool day: storytelling, rhymes and role-play.',
  },
]
