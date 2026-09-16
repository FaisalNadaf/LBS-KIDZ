/**
 * Per-route SEO metadata.
 *
 * Keyword targets are taken from Keyword & AEO Strategy S3 (Page-by-Page
 * Keyword Mapping). The tier discipline in that document is enforced here:
 *
 *  - Tier B/C policy and pedagogy keywords appear ONLY on the Curriculum &
 *    Learning Approach page. "This is the only page that should carry Tier B/C
 *    policy keywords."
 *  - The Lal Bahadur Shastri Way page must not force Tier A/B keywords.
 *  - Parenting Tips & Resources is "intentionally not a vehicle for NEP 2020/
 *    policy keywords".
 *  - The Home title is "functional and local"; the brand tagline sits below
 *    the fold.
 *
 * This file is imported both by the React app and by scripts/prerender-head.mjs
 * at build time, so it must stay free of JSX and of non-erasable TypeScript.
 */

export type PageSeo = {
  path: string
  title: string
  description: string
  /** Primary keyword target, for reference and reporting. */
  primaryKeyword?: string
  secondaryKeywords?: string[]
  /** Excluded from sitemap.xml and marked noindex. */
  noindex?: boolean
  /** Phase at which this route becomes publicly linked. */
  phase?: 1 | 2
  /** Rendered as BreadcrumbList structured data. */
  breadcrumb?: { label: string; href?: string }[]
}

export const pageSeo: Record<string, PageSeo> = {
  home: {
    path: '/',
    title: 'Best Preschool in Indore | LBS KidZ: Modern Learning, Timeless Values',
    description:
      'LBS KidZ is a values-based preschool opening in Indore for Academic Session 2027-28, led by the family of Shri Lal Bahadur Shastri Ji. Activity-based learning, NEP 2020 aligned. Register your interest today.',
    primaryKeyword: 'best preschool in Indore',
    secondaryKeywords: ['play school near me', 'LBS KidZ Indore'],
    phase: 1,
  },

  curriculum: {
    path: '/curriculum-nep-2020-activity-based-learning',
    title: 'Activity-Based Learning & NEP 2020 Preschool in Indore | LBS KidZ',
    description:
      'How LBS KidZ teaches: play-based, NEP 2020 and NCF-FS aligned, mother-tongue foundation, and no formal exams. See how your child learns and grows here.',
    primaryKeyword: 'activity based learning preschool, NEP 2020 preschool',
    secondaryKeywords: [
      'no examination policy preschool',
      'foundational literacy and numeracy (FLN)',
      'mother tongue medium preschool',
      'NCF foundational stage',
    ],
    phase: 1,
    breadcrumb: [{ label: 'Curriculum & Learning Approach' }],
  },

  legacy: {
    path: '/lal-bahadur-shastri-legacy',
    title: 'LBS Legacy: The Life of Shri Lal Bahadur Shastri Ji | LBS KidZ',
    description:
      'The story of Shri Lal Bahadur Shastri Ji, India’s second Prime Minister, remembered for simplicity, honesty and quiet courage. The legacy LBS KidZ, a preschool in Indore, carries forward.',
    primaryKeyword: 'Lal Bahadur Shastri preschool',
    secondaryKeywords: ['value based preschool India'],
    phase: 1,
    breadcrumb: [{ label: 'Shastri Ji Legacy' }, { label: 'LBS Legacy' }],
  },

  lbsWay: {
    path: '/the-lal-bahadur-shastri-way',
    title: 'The Lal Bahadur Shastri Way: SIMPLE Values for Little Learners | LBS KidZ',
    description:
      'Discover how LBS KidZ turns Shastri Ji’s values into daily habits, through SIMPLE, Little Karmayogis, Shastri Sanskaar and the Sankalp Calendar.',
    primaryKeyword: 'Little Karmayogis, SIMPLE',
    secondaryKeywords: ['value based preschool', 'character building preschool'],
    phase: 1,
    breadcrumb: [
      { label: 'Shastri Ji Legacy' },
      { label: 'The Lal Bahadur Shastri Way' },
    ],
  },

  familyMessage: {
    path: '/message-from-the-lal-bahadur-shastri-family',
    title: 'A Message from the Lal Bahadur Shastri Family | LBS KidZ',
    description:
      'A personal message from Shri Anil Shastri Ji and family, on carrying forward the legacy of Shri Lal Bahadur Shastri Ji into LBS KidZ.',
    phase: 1,
    breadcrumb: [
      { label: 'Shastri Ji Legacy' },
      { label: 'A Message from the Lal Bahadur Shastri Family' },
    ],
  },

  /** Source: Founder's Note Page Content S7. Brand tier only, not a discovery page. */
  foundersNote: {
    path: '/founders-note',
    title: 'Founder’s Note: Adarsh Shastri | LBS KidZ',
    description:
      'A personal note from Adarsh Shastri, grandson of Shri Lal Bahadur Shastri Ji, on why LBS KidZ was built and what it means for your child’s first school.',
    primaryKeyword: 'Adarsh Shastri, LBS KidZ founder',
    phase: 1,
    breadcrumb: [{ label: 'Shastri Ji Legacy' }, { label: 'Founder’s Note' }],
  },

  /** Source: Value Stories Page Content S7. */
  valueStories: {
    path: '/value-stories',
    title: 'Value Stories: Where Our Values Come From | LBS KidZ',
    description:
      'Real stories behind LBS KidZ’s SIMPLE values, from Shastri Ji’s own life, told simply enough for a parent to read in a minute.',
    primaryKeyword: 'value based preschool India, character building preschool',
    secondaryKeywords: ['Lal Bahadur Shastri preschool'],
    phase: 1,
    breadcrumb: [{ label: 'For Parents' }, { label: 'Value Stories' }],
  },

  /**
   * Source: Parenting Tips & Resources Page Content S7.
   *
   * The keywords here are parenting keywords and nothing else. This page stays
   * free of NEP 2020 and policy terms by instruction, so none appears in its
   * title, description or targets.
   */
  parenting: {
    path: '/parenting-tips-and-resources',
    title: 'Parenting Tips & Early-Years Resources | LBS KidZ',
    description:
      'Practical parenting tips for the early years: play, language, readiness, and everyday values conversations. Useful whether or not you join LBS KidZ.',
    primaryKeyword: 'early years parenting tips',
    secondaryKeywords: ['preschool readiness tips', 'mother tongue vs English preschool'],
    phase: 1,
    breadcrumb: [{ label: 'For Parents' }, { label: 'Parenting Tips & Resources' }],
  },

  campuses: {
    path: '/preschool-in-indore-campuses',
    title: 'Preschool Near Me in Indore | LBS KidZ Campuses',
    description:
      'The Indore zones LBS KidZ is opening in, including Rau, Kanadia Road, Annapurna, Nipania and Vijay Nagar, and the safety standards every campus is built to.',
    primaryKeyword: 'preschool near me, play school near me',
    secondaryKeywords: ['best preschool in Indore'],
    phase: 1,
    breadcrumb: [{ label: 'Campuses' }],
  },

  admissions: {
    path: '/preschool-admission-indore',
    title: 'Preschool Admission in Indore | LBS KidZ',
    description:
      'Admissions at LBS KidZ: our Playgroup, Nursery, LKG and UKG classes, a no-hidden-charges fee commitment, and answers to the questions parents actually ask.',
    primaryKeyword: 'preschool admission Indore, nursery admission Indore',
    secondaryKeywords: ['LKG UKG admission age'],
    phase: 1,
    breadcrumb: [{ label: 'Admissions' }],
  },

  programs: {
    path: '/programs-and-classes',
    title: 'Playgroup to UKG: Preschool Programs & Classes in Indore | LBS KidZ',
    description:
      'From Playgroup (age 2) to UKG (age 6), see what each year at LBS KidZ actually looks like, class by class.',
    primaryKeyword: 'nursery admission Indore, LKG admission Indore, UKG admission Indore',
    secondaryKeywords: ['best playgroup for toddlers Indore'],
    phase: 1,
    breadcrumb: [{ label: 'Admissions' }, { label: 'Programs & Classes' }],
  },

  /**
   * Source: Fees & Admissions Page Content S7.
   *
   * S7 proposes `/fees-and-admissions`. The slug here is the one named verbatim
   * in Full Website Sitemap S3, it already carries the page's primary keyword,
   * and it is live in sitemap.xml and in the canonical tag, so it stays. Same
   * reasoning as the Curriculum slug, which its own document left open for
   * exactly this decision.
   */
  fees: {
    path: '/preschool-fees-indore',
    title: 'Preschool Fees in Indore: No Hidden Charges | LBS KidZ',
    description:
      'What is included in the LBS KidZ fee: books, bag, uniform, lunch box, water bottle, and how to get the exact figure for your child’s class and zone.',
    primaryKeyword: 'preschool fees Indore',
    secondaryKeywords: ['playgroup fees Indore', 'no hidden charges preschool'],
    phase: 1,
    breadcrumb: [{ label: 'Admissions' }, { label: 'Fees & Admissions' }],
  },

  /** Source: FAQs Page Content S7. The site's strongest FAQPage schema slot. */
  faqs: {
    path: '/faqs',
    title: 'Frequently Asked Questions | LBS KidZ Preschool Indore',
    description:
      'Straight answers on exams, fees, admissions, campuses, and safety at LBS KidZ: the questions parents actually ask, all in one place.',
    primaryKeyword: 'LBS KidZ FAQ',
    secondaryKeywords: ['preschool admission questions Indore'],
    phase: 1,
    breadcrumb: [{ label: 'Admissions' }, { label: 'FAQs' }],
  },

  /** Source: Contact Us Page Content S7. Brand tier only, not a discovery page. */
  contact: {
    path: '/contact-us',
    title: 'Contact LBS KidZ: Preschool Enquiries, Indore',
    description:
      'Get in touch with LBS KidZ: ask about classes, fees, or campus zones, and a real person will get back to you.',
    primaryKeyword: 'preschool Indore contact, preschool enquiry Indore',
    phase: 1,
    breadcrumb: [{ label: 'Contact Us' }],
  },

  registerInterest: {
    path: '/register-interest',
    title: 'Register Interest | LBS KidZ Preschool Indore',
    description:
      'Tell us about your child and we will get in touch with class options, fees and the campus nearest to you.',
    phase: 1,
    breadcrumb: [{ label: 'Register Interest' }],
  },

  sitemap: {
    path: '/sitemap',
    title: 'Sitemap | LBS KidZ',
    description: 'Every page on the LBS KidZ website, in one list.',
    phase: 1,
    breadcrumb: [{ label: 'Sitemap' }],
  },

  privacy: {
    path: '/privacy-policy',
    title: 'Privacy Policy | LBS KidZ',
    description: 'How LBS KidZ collects, uses and protects the information you share with us.',
    phase: 1,
    breadcrumb: [{ label: 'Privacy Policy' }],
  },
  terms: {
    path: '/terms-and-conditions',
    title: 'Terms & Conditions | LBS KidZ',
    description: 'The terms that govern your use of the LBS KidZ website.',
    phase: 1,
    breadcrumb: [{ label: 'Terms & Conditions' }],
  },
  refund: {
    path: '/refund-and-cancellation-policy',
    title: 'Refund & Cancellation Policy | LBS KidZ',
    description: 'Our registration and admission fee terms, including refunds and cancellations.',
    phase: 1,
    breadcrumb: [{ label: 'Refund & Cancellation Policy' }],
  },
  childProtection: {
    path: '/child-protection-policy',
    title: 'Child Protection Policy | LBS KidZ',
    description:
      'A plain-language statement of the safeguarding commitments LBS KidZ makes to every child in its care.',
    phase: 1,
    breadcrumb: [{ label: 'Child Protection Policy' }],
  },
  mandatoryDisclosure: {
    path: '/mandatory-public-disclosure',
    title: 'Mandatory Public Disclosure | LBS KidZ',
    description:
      'The reserved page for CBSE mandatory public disclosure. It becomes active if and when the group’s school affiliates with CBSE.',
    noindex: true,
    phase: 2,
    breadcrumb: [{ label: 'Mandatory Public Disclosure' }],
  },

  // ---- Phase 2 routes. Reserved now so no structural change is needed later.
  gallery: {
    path: '/school-life/gallery',
    title: 'Gallery | School Life at LBS KidZ',
    description: 'Photographs from our classrooms and campuses.',
    noindex: true,
    phase: 2,
    breadcrumb: [{ label: 'School Life' }, { label: 'Gallery' }],
  },
  educators: {
    path: '/school-life/our-educators',
    title: 'Our Educators | LBS KidZ',
    description: 'The teachers at LBS KidZ, and the training and selection standards behind them.',
    noindex: true,
    phase: 2,
    breadcrumb: [{ label: 'School Life' }, { label: 'Our Educators' }],
  },
  events: {
    path: '/school-life/events-and-news',
    title: 'Events & News | LBS KidZ',
    description: 'What is happening across LBS KidZ campuses.',
    noindex: true,
    phase: 2,
    breadcrumb: [{ label: 'School Life' }, { label: 'Events & News' }],
  },
  testimonials: {
    path: '/school-life/testimonials',
    title: 'Testimonials | LBS KidZ Parents',
    description: 'What families at LBS KidZ say, in their own words.',
    noindex: true,
    phase: 2,
    breadcrumb: [{ label: 'School Life' }, { label: 'Testimonials' }],
  },
  admissionProcess: {
    path: '/admission-process',
    title: 'Admission Process | LBS KidZ Indore',
    description: 'The steps, the dates and the brochure for admission to LBS KidZ.',
    noindex: true,
    phase: 2,
    breadcrumb: [{ label: 'Admissions' }, { label: 'Admission Process' }],
  },
  careers: {
    path: '/careers',
    title: 'Careers | LBS KidZ',
    description: 'Open roles across LBS KidZ campuses.',
    noindex: true,
    phase: 2,
    breadcrumb: [{ label: 'Careers' }],
  },
  downloads: {
    path: '/downloads',
    title: 'Downloads | LBS KidZ',
    description: 'Our brochure, academic calendar and the printable Sankalp Calendar.',
    noindex: true,
    phase: 2,
    breadcrumb: [{ label: 'Downloads' }],
  },

  notFound: {
    path: '/404',
    title: 'Page not found | LBS KidZ',
    description: 'The page you were looking for is not here.',
    noindex: true,
  },
}

export const seoDefaults = {
  siteName: 'LBS KidZ',
  origin: 'https://lbskidz.com',
  locale: 'en_IN',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
}
