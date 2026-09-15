/**
 * Content audit: the rendered pages against the six page specifications.
 *
 * The six documents (D09-D14) are the source of truth for what these pages say,
 * and the copy is spread across data files, section components and page
 * components. Grepping the source proves nothing about what a reader sees: a
 * string can be present in `src/` and still be behind a flag, inside a section
 * commented out of the tree, or clipped by a fold. So this loads each page in a
 * real browser, scrolls it so scroll-revealed content mounts, and reads the
 * text out of the DOM.
 *
 * It checks three things per page:
 *
 *   1. Every phrase the specification requires is present.
 *   2. Nothing the specification forbids is present. Currently one rule: the
 *      Honesty Shop is out of this build by instruction (D11 S8), and this is
 *      what stops it creeping back in.
 *   3. No em dash appears in visible text, in metadata, or in an accessible
 *      name. That is a standing rule for published copy on this site.
 *
 * Run against a running server, dev or preview:
 *   node scripts/content-audit.mjs http://localhost:5178
 *
 * Exits non-zero on any failure, so it can gate a deploy.
 */

import { chromium } from 'playwright'

const origin = process.argv[2] ?? 'http://localhost:5177'

/** Phrases lifted from the specifications, normalised the way the site sets them. */
const PAGES = [
  {
    route: '/',
    doc: '09 Home',
    must: [
      'A Living Legacy for',
      'Little Learners',
      'Modern Learning, Timeless Values',
      'Where tiny children learn big values.',
      'A Legacy We Carry Forward',
      'Read Our Legacy',
      'A Foundation Strong Enough to Last a Lifetime',
      'A Family-Led Legacy',
      'Values, Practised Daily',
      'Safety by Design',
      'Joyful, Modern Learning',
      'Mother Tongue First, English with Confidence',
      'Growth Without Grades',
      'Every Child, A Little Karmayogi',
      'S · I · M · P · L · E',
      'Simplicity, Integrity, Mindfulness, Patriotism, Leadership and Empathy',
      'Shastri Sanskaar',
      'Explore The LBS Way',
      'Learning Built Around the Wonder of Being Little',
      'Four Stages, One Journey',
      'Playgroup',
      '2 to 3 years',
      'View Programs & Classes',
      'LBS KidZ Opens in Indore, Academic Session 2027-28',
      'Rau / CAT Road',
      'Kanadia Road',
      'Annapurna / Sudama Nagar',
      'Mahalaxmi Nagar / Nipania',
      'Vijay Nagar',
      'Register Your Interest',
      'A Note from Adarsh Shastri',
      'very first learning journey',
      'Everything You Want for Your Child',
      'A Safe, Secure Campus',
      'Trained, Caring Teachers',
      'Daily Parent Updates',
      'A Warm Settling-In Experience',
      'See Full FAQs',
      'Give Them a Beginning Worth Remembering',
    ],
  },
  {
    route: '/lal-bahadur-shastri-legacy',
    doc: '10 Legacy',
    must: [
      'The Man Behind the Name',
      'A Humble Beginning',
      'Mughalsarai',
      'Kashi Vidyapeeth',
      'A Life Given to Service',
      'Responsibility Above Position',
      'Jai Jawan, Jai Kisan',
      'Hail the Soldier, Hail the Farmer',
      'A Legacy That Endures',
      'Tashkent',
      'From History to Home',
      'Explore The LBS Way',
      'A Message from the Family',
    ],
  },
  {
    route: '/the-lal-bahadur-shastri-way',
    doc: '11 LBS Way',
    must: [
      'The Lal Bahadur Shastri Way',
      'Where a nation’s values become a child’s daily habits.',
      'Every Child, A Little Karmayogi',
      'Karmayogi is someone who does what is right',
      'S · I · M · P · L · E',
      'Six Values, Lived Daily',
      'Gratitude for small things',
      'Telling the truth, owning up to mistakes',
      'food on the plate',
      'the national flag',
      'The courage to speak up',
      'comforting a friend who is crying',
      'Shastri Sanskaar',
      'Namaste',
      'Sankalp Calendar',
      'Food Respect Week',
      'Farmer Gratitude Day',
      'Soldier Thank-You Card',
      'Living the Legacy',
    ],
    mustNot: ['Honesty Shop'],
  },
  {
    route: '/message-from-the-lal-bahadur-shastri-family',
    doc: '12 Family Message',
    must: [
      'A Message from Our Family',
      'In the words of Shri Anil Shastri Ji',
      'I was still a child when I first understood',
      'Shastri Sewa Niketan',
      'In Memory of Shrimati Lalita Shastri Ji',
      'I did not grow up in this family. I joined it.',
      'It is the dinner table itself',
      'Lagan Shastri & Mudit Shastri',
      'Our Family’s Blessing',
      'Read the Founder’s Note',
      'See Our Curriculum & Learning Approach',
    ],
  },
  {
    route: '/curriculum-nep-2020-activity-based-learning',
    doc: '13 Curriculum',
    must: [
      'Learning Through Play: The NEP 2020 Way',
      'Activity-based, joyful, and built for how young children actually learn.',
      'Five Ways Your Child Grows Here',
      'Moving & Doing',
      'Feeling & Relating',
      'Thinking & Solving',
      'Talking & Understanding',
      'Creating & Belonging',
      'Play-Based Learning, Aligned with NEP 2020',
      'A Strong Foundation in Their Mother Tongue, First',
      'No Exams. Just Honest, Everyday Observation',
      'Beginner',
      'Progressive',
      'Proficient',
      'Learning, With Values Woven Through',
      'Explore The LBS Way',
      'Common Questions',
      'Is there any exam in preschool at LBS KidZ?',
      'What is activity-based learning?',
      'Is LBS KidZ aligned with NEP 2020?',
      'What language is used for teaching?',
      'What age can my child join?',
    ],
  },
  {
    route: '/programs-and-classes',
    doc: '14 Programs',
    must: [
      'From Their First Day at Two, to Their Next Big Step at Six',
      'Playgroup to UKG',
      'Settling In, Safely',
      '2 to 3 years',
      'Finding Their Voice',
      '3 to 4 years',
      'Getting Curious',
      '4 to 5 years',
      'Ready for What’s Next',
      '5 to 6 years',
      'Sensory play, sorting, and simple stacking games',
      'Growing Shastri Sanskaar habits',
      'A Rhythm Children Can Count On',
      'See If LBS KidZ Is Right for Your Child',
      'See Our Curriculum & Learning Approach',
    ],
  },

  /* ----------------------------------------------------------------------
   * The second wave of page specifications, D11 and D16-D20. Same rules: a
   * phrase listed here is one the document supplies and a reader must be able
   * to find on the rendered page.
   * ------------------------------------------------------------------- */

  {
    route: '/founders-note',
    doc: '11 Founder’s Note',
    must: [
      'A Note from Our Founder',
      'Adarsh Shastri, grandson of Shri Lal Bahadur Shastri Ji',
      'Dear Parents,',
      'never asked to be remembered',
      'simply, honestly, and always in service of something larger than himself',
      'I didn’t grow up being taught his values as lessons',
      'actually lived our family’s values',
      'karmbhoomi of my father, Shri Anil Shastri Ji',
      'birthplace of my brothers',
      'simplicity, honesty, and quiet courage',
      'confidence and character',
      'consider being part of it with us',
      'With warmth,',
      'Founder, LBSKidZ',
      'See Our Curriculum & Learning Approach',
    ],
  },
  {
    route: '/value-stories',
    doc: '16 Value Stories',
    must: [
      'Where a Value Actually Begins',
      'Every school can name its values',
      // One story per SIMPLE pillar, each with its title and its question.
      'Enough, and Nothing More',
      'Do I really need this, or do I just want it?',
      'He Answered for It Himself',
      'Did I own my part today, even the part that went wrong?',
      'Listening, When Everyone Wanted Him to React',
      'Did I pause before I reacted today?',
      'The Soldier and the Farmer, in One Breath',
      'Whose work made my day possible?',
      'Stepping Forward, Before Being Asked',
      'Did I step up, or wait to be told?',
      'He Tried It at Home First',
      'Who grew the food on my plate today?',
      'The question a child is asked',
      'Explore The LBS Way',
    ],
    // D16 S8 keeps the Honesty Shop out of this build, as D11 S8 does site-wide.
    mustNot: ['Honesty Shop'],
  },
  {
    route: '/parenting-tips-and-resources',
    doc: '17 Parenting Tips',
    must: [
      'Helpful Whether or Not You Ever Enrol With Us',
      'Play Is the Work, Not the Break From It',
      'Do We Need to Speak English at Home?',
      'Actually Means',
      'When Your Child Seems Behind Their Cousin',
      'Talking to a Small Child About Right and Wrong',
      'Reading Together, Before They Can Read',
      'Screen Time in the Early Years',
      'The First Week Away From You',
      'Toilet Training and Starting School',
      'Turning Mealtime Into Learning Time',
      'Should I Worry About Tantrums?',
      'Playgroup Now, or Wait a Year?',
      'Activity Ideas',
      'Early-Years Concerns',
      'Preschool Readiness',
    ],
    /**
     * The page's hard exclusion, and the reason it is worth a machine check:
     * this content is about early-years parenting and nothing else, and policy
     * language has an easy time drifting in from the rest of the site.
     * Source: Keyword & AEO Strategy S5; D17 S1.
     */
    mustNot: ['NEP 2020', 'NCF-FS', 'NCERT'],
  },
  {
    route: '/preschool-fees-indore',
    doc: '18 Fees & Admissions',
    must: [
      'One Fee. Nothing Added Later.',
      'not billed on top of it',
      'What’s Already Inside Your Fee',
      'All learning material for the year.',
      'A school bag, included from day one.',
      'The full uniform set.',
      'One that goes home with your child, not just to school.',
      'Included, not an add-on.',
      'Why You Won’t See a Fee Table on This Page',
      'in writing, the same day you ask',
      'Ask Us for the Fee',
      'What Happens After You Ask',
      'We call you back on the number you give us.',
    ],
    /**
     * D18 S1 forbids framing this page against other schools, and S8 forbids a
     * fee figure "even as an example". The heading that used to run here read
     * "Five things other schools bill you for separately".
     */
    mustNot: ['other schools', '₹'],
  },
  {
    route: '/faqs',
    doc: '19 FAQs',
    must: [
      'Questions Parents Actually Ask',
      'Curriculum & Learning',
      'Admissions & Fees',
      'Campuses',
      'General',
      'Is there an exam at LBS KidZ?',
      'How is my child’s progress tracked without exams?',
      'What age can my child join, and in which class?',
      'Are there any hidden charges?',
      'Why isn’t the fee listed on this website?',
      'What happens after I register my interest?',
      'Does my child need to be toilet trained before joining?',
      'Where is LBS KidZ opening in Indore?',
      'When will a campus open near me?',
      'What safety standards does a campus have to meet?',
      'Can I talk to someone directly instead of filling a form?',
      'Still have a question?',
    ],
  },
  {
    route: '/contact-us',
    doc: '20 Contact Us',
    must: [
      'Get in Touch',
      'A real person on our team will get back to you.',
      'Send Us a Message',
      'Where We Are',
      'Rau / CAT Road',
      'Vijay Nagar',
      'See All Five Zones',
      'Reaching Us Directly',
      'being set up alongside our first campus',
    ],
  },
]

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const page = await ctx.newPage()

let failures = 0

for (const spec of PAGES) {
  await page.goto(origin + spec.route, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForSelector('.lbs-load', { state: 'detached', timeout: 20000 }).catch(() => {})
  // Ride the page so scroll-revealed content is mounted before reading text.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
  })

  // `textContent`, not `innerText`: `innerText` returns the CSS-transformed
  // string, so an eyebrow set in `uppercase` reads back shouting and never
  // matches the sentence-case phrase the specification actually asks for.
  const text = await page.evaluate(() =>
    (document.body.textContent ?? '').replace(/\s+/g, ' '),
  )

  /**
   * The same read, scoped to <main>.
   *
   * `mustNot` rules are about what a page says, and two things outside <main>
   * say something on every route: the footer's keyword-linking block, which the
   * sitemap requires site-wide and which necessarily names policy phrases, and
   * the <noscript> copy of the home page's metadata. Checking exclusions
   * against the whole body therefore failed Parenting Tips for a footer link
   * that its own exclusion was never about. Required phrases still read from
   * the whole body, since a phrase may legitimately sit in the header or the
   * persistent CTA band.
   */
  const mainText = await page.evaluate(() =>
    (document.querySelector('main')?.textContent ?? '').replace(/\s+/g, ' '),
  )
  // Em dashes are checked in what a reader can see plus what a search engine
  // reads, and nowhere else. Checking the whole document flagged the CSS
  // comments the dev server injects verbatim, which the build strips and no
  // reader ever meets.
  const html = await page.evaluate(() => {
    const metas = [...document.querySelectorAll('meta[content], title')]
      .map((el) => el.getAttribute('content') ?? el.textContent ?? '')
      .join(' | ')
    const alts = [...document.querySelectorAll('[alt], [aria-label], [title]')]
      .map((el) => `${el.getAttribute('alt') ?? ''} ${el.getAttribute('aria-label') ?? ''} ${el.getAttribute('title') ?? ''}`)
      .join(' | ')
    return `${metas} | ${alts}`
  })

  const missing = spec.must.filter((phrase) => !text.includes(phrase.replace(/\s+/g, ' ')))
  const present = (spec.mustNot ?? []).filter((phrase) => mainText.includes(phrase))
  const emDashes = [...text.matchAll(/.{0,40}—.{0,40}/g)].map((m) => m[0])
  const emDashInHtml = html.includes('—')

  const ok = !missing.length && !present.length && !emDashes.length && !emDashInHtml
  console.log(`\n${ok ? 'PASS' : 'FAIL'}  ${spec.doc}  ${spec.route}`)
  if (missing.length) {
    failures += missing.length
    console.log('  MISSING from page:')
    missing.forEach((m) => console.log(`    - ${m}`))
  }
  if (present.length) {
    failures += present.length
    console.log('  MUST NOT APPEAR but does:')
    present.forEach((m) => console.log(`    - ${m}`))
  }
  if (emDashes.length) {
    failures += emDashes.length
    console.log('  EM DASH in visible text:')
    emDashes.slice(0, 8).forEach((m) => console.log(`    ... ${m} ...`))
  } else if (emDashInHtml) {
    failures += 1
    console.log('  EM DASH in metadata or an accessible name')
  }
}

console.log(`\n${failures === 0 ? 'All content checks pass.' : `${failures} content check(s) failed.`}`)
await browser.close()
process.exit(failures === 0 ? 0 : 1)
