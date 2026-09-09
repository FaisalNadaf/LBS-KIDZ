/**
 * Legacy and family content.
 *
 * IMPORTANT SOURCING NOTE
 * The source documents define the STRUCTURE of these pages and the ROLE of each
 * family member, but the actual legacy narrative copy and every personal
 * message are open items:
 *   - "Real photographs and personal messages from Anil Shastri, Manju Shastri,
 *      Lagan Shastri, Mudit Shastri" - Pending, owner Adarsh Shastri to
 *      coordinate. Source: Project Decisions Log S10; Website Reference
 *      Document S10.
 *   - "This page cannot be finalized until this is received."
 *      Source: Project Decisions Log S3.
 *   - "Page-wise website content drafting - To be scheduled, starting with Home
 *      and LBS Legacy". Source: Website Reference Document S10.
 *
 * Therefore: no personal quote is fabricated for any family member. The
 * biography section below is limited to widely documented public history about
 * Shri Lal Bahadur Shastri, and is marked for approval before go-live.
 * See docs/decisions-and-todos.md items T-03 and T-04.
 */

export const legacyIntro = {
  eyebrow: 'LBS Legacy',
  headline: 'A name that was earned, not bought',
  standfirst:
    'LBS KidZ carries the name of Shri Lal Bahadur Shastri, India’s second Prime Minister. Not as decoration, and not as a marketing line, but as the reason this school defines its values the way it does.',
}

/**
 * Public-history summary. Restricted to facts about a public figure that are
 * documented in the public record, kept brief, and flagged for approval by
 * Mr. Adarsh Shastri before publication, per the source documents' requirement
 * that legacy authenticity and tone are reviewed by him.
 * Source: Process Guidelines S3 (Roles & Responsibilities).
 */
export const legacyMoments = [
  {
    year: '1904',
    title: 'Born in Mughalsarai',
    body: 'Born on 2 October 1904, into a family of no wealth and no connections. He later dropped his caste surname, and took the name Shastri after his degree.',
  },
  {
    year: '1964',
    title: 'Prime Minister of India',
    body: 'He became India’s second Prime Minister, following Jawaharlal Nehru, and served until 1966.',
  },
  {
    year: '1965',
    title: 'Jai Jawan Jai Kisan',
    body: 'He faced a war and a food shortage at the same time. He gave the country a slogan that put the soldier and the farmer on the same line, and asked citizens to skip one meal a week so that food would go further. He asked it of his own household first.',
  },
  {
    year: 'Always',
    title: 'Simplicity, in practice',
    body: 'He is remembered less for any single policy than for how little he took for himself while holding the highest office in the country.',
  },
]

export const legacyToValues = {
  headline: 'Why a preschool takes this seriously',
  body:
    'Most preschools describe their values in words any school could use. Ours come from a documented life: what one man actually did, in situations that are on the public record. That is a harder standard, and a more useful one for children, because every value can be shown as a story rather than stated as a rule.',
}

/**
 * The food-respect and farmer-gratitude motif, which the design direction ties
 * a recurring visual symbol to.
 * Source: Website Reference Document S7; Project Decisions Log S7;
 * NCERT Curriculum Summary S10 ("Cite CG-5 (Seva) and CG-6 (environment)
 * explicitly when describing Empathy/food-respect content").
 */
export const wheatMotif = {
  headline: 'The wheat stalk',
  body:
    'A quiet line-drawn wheat stalk runs through this site. It stands for food respect and gratitude to the farmer, which is where the Shastri legacy and our Empathy pillar meet. It is used quietly, and never literally or politically.',
  ncertNote:
    'CG-5, a positive attitude towards productive work and service, and CG-6, positive regard for the natural environment, are national curricular goals in NCF-FS. Our food-gratitude content sits directly on them.',
}

/* -------------------------------------------------------------------------
 * The family. Roles are documented; personal messages are pending.
 * Source: Website Reference Document S6; Project Decisions Log S3.
 * ---------------------------------------------------------------------- */

export type FamilyMember = {
  name: string
  relation: string
  role: string
  /** Null until the real message is received via Mr. Adarsh Shastri. */
  message: string | null
  /** Null until real photographs are received. */
  photo: string | null
  tier: 'blessing' | 'continuity'
}

export const familyMembers: FamilyMember[] = [
  {
    name: 'Mr. Anil Shastri',
    relation: 'Son of Shri Lal Bahadur Shastri',
    role: 'Carries the primary blessing and moral-authority message',
    message: null,
    photo: null,
    tier: 'blessing',
  },
  {
    name: 'Mrs. Manju Shastri',
    relation: 'Daughter-in-law of Shri Lal Bahadur Shastri',
    role: 'Carries the primary blessing and moral-authority message',
    message: null,
    photo: null,
    tier: 'blessing',
  },
  {
    name: 'Mr. Lagan Shastri',
    relation: 'Grandson of Shri Lal Bahadur Shastri',
    role: 'Family presence, the legacy carried into a new generation',
    message: null,
    photo: null,
    tier: 'continuity',
  },
  {
    name: 'Mr. Mudit Shastri',
    relation: 'Grandson of Shri Lal Bahadur Shastri',
    role: 'Family presence, the legacy carried into a new generation',
    message: null,
    photo: null,
    tier: 'continuity',
  },
]

/** Source: Website Reference Document S6; Project Decisions Log S3. */
export const founder = {
  name: 'Mr. Adarsh Shastri',
  relation: 'Grandson of Shri Lal Bahadur Shastri',
  role: 'Authorized Representative',
  voice: 'The operational, present-day voice of LBS KidZ',
  message: null as string | null,
  photo: null as string | null,
}

/**
 * The three-page structure and the tonal difference between them, stated in the
 * source document and reproduced as page-level guidance.
 * Source: Website Reference Document S6.
 */
export const familyPageTone = {
  familyMessage:
    'The Family Message page is reverent and historical in tone.',
  foundersNote: 'The Founder’s Note is practical and forward-looking.',
  precedent:
    'A distinct founder or family message, separate from operational messaging, is an established convention among Indian schools named after real individuals. It is a dignified convention, not an invented device.',
}

/**
 * Shown in place of an unreceived message so the page is honest rather than
 * padded with invented words.
 */
export const pendingMessageCopy = {
  title: 'This message is being written by the family',
  body:
    'Personal messages and photographs from the Shastri family are being coordinated through Mr. Adarsh Shastri, and will appear here in their own words. We would rather leave this space open than fill it with ours.',
}
