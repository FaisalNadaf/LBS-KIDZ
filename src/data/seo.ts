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
    title: 'Best Preschool in Indore | LBS KidZ Play School',
    description:
      'LBS KidZ is a preschool in Indore carrying the legacy of Shri Lal Bahadur Shastri. Play-based learning, a Hindi and mother-tongue foundation, and no examinations at any stage.',
    primaryKeyword: 'best preschool in Indore',
    secondaryKeywords: ['play school near me', 'LBS KidZ Indore'],
    phase: 1,
  },

  curriculum: {
    path: '/curriculum-nep-2020-activity-based-learning',
    title: 'Activity Based Learning & NEP 2020 Preschool Curriculum | LBS KidZ',
    description:
      'How we teach at LBS KidZ: activity-based and play-based learning, foundational literacy and numeracy, a mother-tongue foundation with joyful English, and no formal examinations. Our practice, with NCERT cited as the source.',
    primaryKeyword: 'activity based learning preschool, NEP 2020 preschool',
    secondaryKeywords: [
      'no examination policy preschool',
      'foundational literacy and numeracy',
      'mother tongue medium preschool',
      'NCF foundational stage',
    ],
    phase: 1,
    breadcrumb: [{ label: 'Curriculum & Learning Approach' }],
  },

  legacy: {
    path: '/lal-bahadur-shastri-legacy',
    title: 'The Lal Bahadur Shastri Legacy | LBS KidZ Preschool',
    description:
      'The life, values and incidents of Shri Lal Bahadur Shastri, India’s second Prime Minister, and why a preschool built on that name defines its values the way it does.',
    primaryKeyword: 'Lal Bahadur Shastri preschool',
    secondaryKeywords: ['value based preschool India'],
    phase: 1,
    breadcrumb: [{ label: 'Shastri Ji Legacy' }, { label: 'LBS Legacy' }],
  },

  lbsWay: {
    path: '/the-lal-bahadur-shastri-way',
    title: 'The Lal Bahadur Shastri Way | SIMPLE, Little Karmayogis & Sankalp Calendar',
    description:
      'Our character layer: the six SIMPLE pillars, the five Shastri Sanskaar habits, the Sankalp Calendar week, and why children here are called Little Karmayogis.',
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
      'The Shastri family on the school that carries their name: Mr. Anil Shastri, Mrs. Manju Shastri, Mr. Lagan Shastri and Mr. Mudit Shastri.',
    phase: 1,
    breadcrumb: [
      { label: 'Shastri Ji Legacy' },
      { label: 'A Message from the Lal Bahadur Shastri Family' },
    ],
  },

  foundersNote: {
    path: '/founders-note',
    title: 'Founder’s Note | Mr. Adarsh Shastri, LBS KidZ',
    description:
      'A note from Mr. Adarsh Shastri, grandson of Shri Lal Bahadur Shastri and Authorized Representative for LBS KidZ.',
    phase: 1,
    breadcrumb: [{ label: 'Shastri Ji Legacy' }, { label: 'Founder’s Note' }],
  },

  valueStories: {
    path: '/value-stories',
    title: 'Value Based Preschool Education | Value Stories | LBS KidZ',
    description:
      'Stories about how a value is actually learned by a small child, drawn from the Shastri legacy and, in time, from our own classrooms.',
    primaryKeyword: 'value based preschool India, character building preschool',
    secondaryKeywords: ['Lal Bahadur Shastri preschool'],
    phase: 1,
    breadcrumb: [{ label: 'For Parents' }, { label: 'Value Stories' }],
  },

  parenting: {
    path: '/parenting-tips-and-resources',
    title: 'Parenting Tips & Early Years Resources | LBS KidZ',
    description:
      'Activity ideas, preschool-readiness guidance and the concerns that come up in every early-years household. Useful whether or not your child ever joins us.',
    primaryKeyword: undefined,
    secondaryKeywords: ['preschool readiness', 'early years parenting tips'],
    phase: 1,
    breadcrumb: [{ label: 'For Parents' }, { label: 'Parenting Tips & Resources' }],
  },

  campuses: {
    path: '/preschool-in-indore-campuses',
    title: 'Preschool Near Me in Indore | LBS KidZ Campuses',
    description:
      'The Indore zones LBS KidZ is opening in, including Kanadia Road, Rau and Bicholi Mardana, and the safety standards every campus is built to.',
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
    title: 'Nursery, LKG & UKG Admission in Indore | Programs & Classes | LBS KidZ',
    description:
      'Playgroup, Nursery, LKG and UKG at LBS KidZ, and how each class maps onto NCERT’s recognised age bands for the Foundational Stage.',
    primaryKeyword: 'nursery admission Indore, LKG admission Indore, UKG admission Indore',
    secondaryKeywords: ['best playgroup for toddlers Indore'],
    phase: 1,
    breadcrumb: [{ label: 'Admissions' }, { label: 'Programs & Classes' }],
  },

  fees: {
    path: '/preschool-fees-indore',
    title: 'Preschool Fees in Indore | No Hidden Charges | LBS KidZ',
    description:
      'Our fee commitment: books, bag, uniform, lunch box and water bottle are included, with nothing added later. Exact figures are shared with you on enquiry.',
    primaryKeyword: 'preschool fees Indore',
    secondaryKeywords: ['play school fee structure', 'no hidden charges preschool'],
    phase: 1,
    breadcrumb: [{ label: 'Admissions' }, { label: 'Fees & Admissions' }],
  },

  faqs: {
    path: '/faqs',
    title: 'Preschool Admission FAQs | LBS KidZ Indore',
    description:
      'Is there an exam in preschool? What language is used for teaching? Are there hidden charges? The questions parents ask us, answered directly.',
    primaryKeyword: 'preschool admission Indore',
    phase: 1,
    breadcrumb: [{ label: 'Admissions' }, { label: 'FAQs' }],
  },

  contact: {
    path: '/contact-us',
    title: 'Contact LBS KidZ | Preschool Enquiry in Indore',
    description:
      'Get in touch with LBS KidZ about preschool admission in Indore, our classes, or a callback from our team.',
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
