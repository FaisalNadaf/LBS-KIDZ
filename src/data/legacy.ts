/**
 * Legacy and family content.
 *
 * SOURCING. The narrative on this page and the family's messages were open
 * items for most of this project's life, and nothing was invented while they
 * were. They are open no longer: the LBS Legacy Page Content specification
 * (D10) scripts the biography section by section, and the Family Message Page
 * Content specification (D12) carries the messages themselves, in the family's
 * own words. Everything below is transcribed from those two documents.
 *
 * The only edits are punctuation. The source documents use an em dash as a
 * sentence break; no em dash appears in published copy on this site, so those
 * breaks are set as commas, colons or full stops according to what the sentence
 * is doing. No wording is changed and no meaning is altered.
 */

/* -------------------------------------------------------------------------
 * Home page, Section 2 — the Legacy strip.
 * Source: Home Page Content S3, Section 2.
 * ---------------------------------------------------------------------- */

export const legacyStrip = {
  eyebrow: 'LBS Legacy',
  headline: 'A Legacy We Carry Forward',
  body:
    'LBS KidZ is led by the family of Shri Lal Bahadur Shastri Ji himself, carrying his values of simplicity, honesty and courage into a child’s very first school. Not a story we tell. A legacy we live, every single day.',
  linkLabel: 'Read Our Legacy',
}

/* -------------------------------------------------------------------------
 * The Legacy page.
 * Source: LBS Legacy Page Content S3, Sections 1 to 7.
 * ---------------------------------------------------------------------- */

/** Section 1 — Hero / Intro. */
export const legacyIntro = {
  eyebrow: 'LBS Legacy',
  headline: 'The Man Behind the Name',
  standfirst:
    'Shri Lal Bahadur Shastri Ji, India’s second Prime Minister, and the legacy LBS KidZ carries forward.',
}

/**
 * Sections 2 to 6, as the page's narrative spine.
 *
 * THE PERIOD LABELS ARE NOT ALL YEARS, and that is deliberate. The
 * specification runs the life-of-service section, which closes in 1964, before
 * the railway resignation of 1956, because the first is an arc and the second
 * is a single act inside it. Printing "1964" and then "1956" beneath it would
 * read as a mistake in a component that looks like a timeline, so the arc
 * carries a period label instead and the dated moments keep their years. The
 * order is the specification's, unchanged.
 */
export const legacyMoments = [
  {
    year: '1904',
    title: 'A Humble Beginning',
    body:
      'Born on 2 October 1904 in Mughalsarai, Uttar Pradesh, Lal Bahadur Shastri Ji lost his father when he was barely two years old. He grew up in his grandfather’s home, known simply as “Nanhe”, the little one. There was little comfort in his early years, but there was no shortage of resolve. He later chose to drop his family surname in quiet protest against caste distinctions, and earned the title “Shastri”, meaning scholar, through his own effort at Kashi Vidyapeeth.',
  },
  {
    year: 'A life’s work',
    title: 'A Life Given to Service',
    body:
      'Inspired early by India’s freedom movement, Shastri Ji devoted his life to public service, rising over decades from state government roles to the highest office in the country. He served as India’s Railway Minister and Home Minister before becoming its second Prime Minister in 1964, all while remaining known, even among his peers, for his simplicity and integrity.',
  },
  {
    year: '1956',
    title: 'Responsibility Above Position',
    body:
      'In 1956, after a series of railway accidents, Shastri Ji resigned as Railway Minister, not because he was asked to, but because he believed the person in charge must answer for what happens under their watch. It remains one of the earliest and most respected instances of a public leader accepting moral responsibility for a tragedy, without being forced to. It is remembered not as a political act, but as a personal one: a life lived by principle, not position.',
  },
  {
    year: '1965',
    title: 'Jai Jawan, Jai Kisan',
    body:
      'During a time of war and hardship in 1965, Shastri Ji gave India words that still echo today, Jai Jawan, Jai Kisan, “Hail the Soldier, Hail the Farmer.” It was his way of reminding a nation that its strength lies not in power, but in the quiet contribution of those who serve and those who feed it. He himself chose to skip a meal a week during a period of food shortage, asking nothing of citizens that he wasn’t willing to do first.',
  },
  {
    year: '1966',
    title: 'A Legacy That Endures',
    body:
      'Shastri Ji passed away in Tashkent in January 1966, shortly after signing a declaration that brought peace after the 1965 war. He led India for less than two years, yet more than half a century later he remains one of the country’s most quietly respected leaders: remembered not for grand gestures, but for simplicity, honesty, and quiet courage, lived out every single day.',
  },
]

/** Section 7 — From History to Home. */
export const legacyToValues = {
  headline: 'From History to Home',
  body:
    'This is the legacy LBS KidZ was built to carry forward, not as a history lesson, but as something a child can live and practice, every day.',
}

/**
 * The food-respect and farmer-gratitude motif, which the design direction ties
 * a recurring visual symbol to.
 * Source: Website Reference Document S7; Project Decisions Log S7;
 * NCERT Curriculum Summary S10 ("Cite CG-5 (Seva) and CG-6 (environment)
 * explicitly when describing Empathy/food-respect content").
 *
 * The Legacy page specification asks for this motif "once, subtly, near Section
 * 5 or Section 6", which is where the section carrying it sits.
 */
export const wheatMotif = {
  headline: 'The wheat stalk',
  body:
    'A quiet line-drawn wheat stalk runs through this site. It stands for food respect and gratitude to the farmer, which is where the Shastri legacy and our Empathy pillar meet. It is used quietly, and never literally or politically.',
  ncertNote:
    'CG-5, a positive attitude towards productive work and service, and CG-6, positive regard for the natural environment, are national curricular goals in NCF-FS. Our food-gratitude content sits directly on them.',
}

/* -------------------------------------------------------------------------
 * The family, and their messages.
 * Source: Family Message Page Content S3, Sections 1 to 6.
 * ---------------------------------------------------------------------- */

/** Section 1 — Hero / Intro. */
export const familyMessageIntro = {
  eyebrow: 'A message from our family',
  headline: 'A Message from Our Family',
  standfirst: 'In the words of Shri Anil Shastri Ji, son of Shri Lal Bahadur Shastri Ji',
}

export type FamilyMember = {
  slug: string
  name: string
  relation: string
  /** What this voice carries on the page. */
  role: string
  /** The message, in their own words. Paragraphs, in order. */
  message: string[] | null
  /** How the letter is signed off, above the name. */
  valediction: string | null
  /**
   * Null until real photographs are received. The specification lists five
   * outstanding: a family group photo for the hero, plus portraits of Anil
   * Shastri Ji, Manju Shastri Ji, Lagan and Mudit Shastri, and an archival
   * photograph of Shrimati Lalita Shastri Ji.
   * See docs/decisions-and-todos.md item T-03.
   */
  photo: string | null
  tier: 'blessing' | 'continuity'
}

export const familyMembers: FamilyMember[] = [
  {
    slug: 'anil-shastri',
    name: 'Anil Shastri',
    relation: 'Son of Shri Lal Bahadur Shastri Ji',
    role: 'The primary letter: legacy, memory, and what it means for parents today',
    message: [
      'I was still a child when I first understood that our home was different from most.',
      'My father, Shri Lal Bahadur Shastri, was away from us more than he was present: first in the freedom struggle, later in the service of the nation. It was my mother, Shrimati Lalita Shastri, who held our family together through those years, raising six children largely on her own, with quiet strength and without complaint.',
      'After my father’s passing, she did not simply carry his memory. She continued his work in her own right, founding the Shastri Sewa Niketan so that his idea of service would keep living, not just be remembered.',
      'I did not grow up watching my father give speeches. I grew up watching my mother’s discipline, her patience, and her refusal to let hardship become an excuse. If my father gave our family its values, it was my mother who made sure those values survived, in six children, and in the generations after us.',
      'That is the part of our story I want today’s parents to understand. Legacy is not something a family simply inherits. It has to be carried, deliberately, one generation at a time, often by the people who never sought recognition for doing it.',
      'When my son Adarsh and I began thinking about LBS KidZ, this was very much on my mind. We did not want to build a school that only used our family’s name respectfully. We wanted to build a place that does, in some small way, what my mother did for us: hold on to what matters, and pass it on, patiently, to the next generation.',
      'To every parent who is beginning that same work with their own child, we understand you, because our family has lived it too. We hope LBS KidZ can stand beside you in it, from your child’s very first years.',
    ],
    valediction: 'With our family’s blessings,',
    photo: null,
    tier: 'blessing',
  },
  {
    slug: 'manju-shastri',
    name: 'Manju Shastri',
    relation: 'Daughter-in-law of Shri Lal Bahadur Shastri Ji',
    role: 'Family voice: joining, and continuing, the family’s values',
    message: [
      'I did not grow up in this family. I joined it. And what struck me most, from the very first years, was how little our home spoke about greatness, and how much it simply practised it: in small habits, in how guests were treated, in how food was never wasted, in how every child was taught to say thank you and mean it.',
      'When you marry into a family like ours, you learn quickly that legacy is not a story told at the dinner table. It is the dinner table itself: how it is set, who is served first, what is expected of every child sitting at it.',
      'That is what I hope LBS KidZ can offer every family who joins it. Not a lesson children are taught once, but a home-like place where these small, daily habits are simply how things are done, until they no longer feel like lessons at all.',
    ],
    valediction: 'With warmth,',
    photo: null,
    tier: 'blessing',
  },
  {
    slug: 'lagan-and-mudit-shastri',
    name: 'Lagan Shastri & Mudit Shastri',
    relation: 'Grandsons of Shri Lal Bahadur Shastri Ji',
    role: 'Family presence, the legacy carried into a new generation',
    message: [
      'We belong to a generation that knows our grandfather mostly through the stories our family tells, and through the way our own father and grandmother chose to live afterward. What we’ve learned is that a legacy only survives if each generation makes the effort to carry it forward in their own way, not just repeat what came before.',
      'We’re glad LBS KidZ exists to offer that same chance to other families: a place where children can begin building their own version of these values, from their very first years of school.',
    ],
    valediction: null,
    photo: null,
    tier: 'continuity',
  },
]

/**
 * Section 3 — In Memory of Shrimati Lalita Shastri Ji.
 *
 * The specification asks for this to be set apart visually so it reads as its
 * own dedicated tribute rather than as another paragraph, which is why it is a
 * field of its own rather than a fourth entry in `familyMembers`.
 */
export const lalitaShastriTribute = {
  headline: 'In Memory of Shrimati Lalita Shastri Ji',
  body:
    'Behind every value our family carries forward stood a woman rarely spoken of alongside her husband: Shrimati Lalita Shastri, who raised six children through years of hardship and long absences, and who later continued her husband’s work in her own right, founding an institution in his memory rather than simply mourning him. Her quiet strength is as much a part of this legacy as her husband’s public one.',
  photo: null as string | null,
}

/** Section 6 — Our Family's Blessing. */
export const familyBlessing = {
  headline: 'Our Family’s Blessing',
  body:
    'We do not offer this school as a business bearing our name. We offer it as an extension of something our family has always tried to live: simplicity, honesty, and service, carried forward quietly, one generation to the next. We welcome every child who walks through LBS KidZ’s doors as part of that continuing story.',
}

/** Source: Website Reference Document S6; Project Decisions Log S3. */
/**
 * One run of the letter. `em` marks the phrases the source sets in bold.
 *
 * D11 S3 is specific about how those render: "true bold weight on the live page
 * (not a color change), so a parent skimming still catches the key value and
 * emotional beats without reading every word", and S4 repeats it, "not a color
 * or size change, keep the emphasis subtle". They are therefore modelled as
 * data rather than left to a rich-text blob, so the page cannot quietly turn
 * them into a highlight.
 *
 * The seven emphasised phrases are taken from the bold runs in the source file
 * itself, not inferred from the prose.
 */
export type LetterRun = { text: string; em?: true }

export const founder = {
  name: 'Adarsh Shastri',
  relation: 'Grandson of Shri Lal Bahadur Shastri Ji',
  /** How he signs the letter. Source: D11 S3, Section 3. */
  role: 'Founder, LBSKidZ',
  voice: 'The present-day, personal voice of LBS KidZ',
  /**
   * The Home page's Founder's Note teaser quote. Source: Home Page Content S3,
   * Section 8, where it is flagged as a placeholder pending his actual words.
   * The letter below now supplies those, so this line's only remaining job is
   * the teaser on Home.
   */
  quote:
    'LBS KidZ is our family’s way of bringing my grandfather’s values into a child’s very first learning journey.',
  photo: null as string | null,
}

/**
 * The Founder's Note itself.
 *
 * Source: Founder's Note Page Content (D11) S3, Section 2, transcribed run for
 * run. This closes what was the longest-standing open item on this site: for
 * most of the project no words of his existed in any document, so the page
 * published one line and said plainly that the rest was being written rather
 * than composing a letter on his behalf.
 *
 * ONE THING TO KNOW BEFORE EDITING. D11's own header calls this text "a draft
 * written in his voice, based on the brand's established positioning", not yet
 * reviewed by Adarsh Shastri, and S8 requires it to be "reviewed, edited, or
 * replaced with Adarsh Shastri's actual words before this page goes live". It
 * is published here because the client supplied it as the page's final written
 * content, and it is recorded as an open item in docs/decisions-and-todos.md
 * (T-04) so the review is not lost. Do not extend, trim or "improve" it in the
 * meantime: the next edit to this letter should be his.
 *
 * Em dashes in the source are set as commas or colons, per the site-wide rule.
 */
export const foundersLetter = {
  heading: 'A Note from Our Founder',
  subheading: 'Adarsh Shastri, grandson of Shri Lal Bahadur Shastri Ji',
  salutation: 'Dear Parents,',
  paragraphs: [
    [
      { text: 'My grandfather, Shri Lal Bahadur Shastri, never asked to be remembered. He simply lived the way he believed was right: ' },
      { text: 'simply, honestly, and always in service of something larger than himself', em: true },
      { text: '. That is not something I read about in a history book. It is something that has shaped every generation of our family since, including my own.' },
    ],
    [
      { text: 'I didn’t grow up being taught his values as lessons. I grew up watching the people around me live them, in small, everyday ways, long before I understood why they mattered.' },
    ],
    [
      { text: 'When we began thinking about what LBS KidZ should be, one thing was clear to me: this could not be a school that simply carried our family’s name. A name is easy to use and easy to forget. What we wanted to build was a school that ' },
      { text: 'actually lived our family’s values', em: true },
      { text: ', the same way I was taught to live them, quietly and every day, not as something written on a wall.' },
    ],
    [
      { text: 'We are beginning this journey from Indore, a city that holds real meaning for our family. It is the ' },
      { text: 'karmbhoomi of my father, Shri Anil Shastri Ji', em: true },
      { text: ': the place where his own life’s work found its roots. It is also the ' },
      { text: 'birthplace of my brothers', em: true },
      { text: ', and the very city where we, as brothers, took our own first steps into school, in playschools here, in our early years. Starting LBS KidZ here does not feel like a business decision to us. It feels like continuing something that already belongs to this city, and to our family’s connection with it.' },
    ],
    [
      { text: 'What we are building is simple to describe, even if it will take years to fully realise: a place where your child’s first years are shaped not only by good teaching, but by ' },
      { text: 'simplicity, honesty, and quiet courage', em: true },
      { text: ', practiced daily, not just spoken about. A place where ' },
      { text: 'confidence and character', em: true },
      { text: ' are allowed to grow side by side, right from the very beginning.' },
    ],
    [
      { text: 'We are at the very start of this journey, and I will not pretend otherwise: there is a great deal still ahead of us. But I hope you will ' },
      { text: 'consider being part of it with us', em: true },
      { text: ', from these first days, and grow with LBS KidZ as we build something we deeply believe in.' },
    ],
  ] as LetterRun[][],
  signOff: 'With warmth,',
  /** D11 S3, Section 4. One soft, optional next step. Not a conversion ask. */
  outro: {
    body: 'Curious how these values shape a day at LBS KidZ?',
    linkLabel: 'See Our Curriculum & Learning Approach',
  },
}

/**
 * The three-page structure and the tonal difference between them, stated in the
 * source document and reproduced as page-level guidance.
 * Source: Website Reference Document S6; Family Message Page Content S4.
 */
export const familyPageTone = {
  /** Reader-facing, and used as the sentence that introduces the link. */
  familyMessage:
    'The family have written to the parents who will join this school, in their own words.',
  foundersNote: 'The Founder’s Note is practical and forward-looking.',
  precedent:
    'A distinct founder or family message, separate from operational messaging, is an established convention among Indian schools named after real individuals. It is a dignified convention, not an invented device.',
}

/**
 * Shown in place of a message that has not been received, so a page is honest
 * rather than padded with invented words.
 *
 * Nothing renders this any more: the family's messages arrived first, and the
 * Founder's Note now has its own letter above. It is kept because the pattern
 * it encodes is the one this project falls back on whenever a person's words
 * are outstanding, and the next such gap should reuse it rather than reinvent
 * a house style for saying "not yet".
 */
export const pendingMessageCopy = {
  title: 'This note is being written',
  body:
    'The Founder’s Note from Mr. Adarsh Shastri is being finalised and will appear here in his own words. We would rather leave this space open than fill it with ours.',
}
