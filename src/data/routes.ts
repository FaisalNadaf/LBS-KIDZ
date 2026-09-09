/**
 * Canonical URL map.
 *
 * Slug principle is a fixed build requirement, not a preference:
 * "descriptive, keyword-bearing URLs over /page1, /about-2".
 * Source: Full Website Sitemap S3 (URL Structure Recommendation).
 *
 * Where the sitemap PDF named an exact slug it is used verbatim.
 * Where it did not, the slug carries that page's primary keyword from the
 * Keyword & AEO Strategy S3 mapping table.
 */
export const routes = {
  home: '/',

  // Shastri Ji Legacy group (menu only, no group landing page: the Keyword
  // strategy assigns keywords to the four child pages, not to the group).
  legacy: '/lal-bahadur-shastri-legacy',
  lbsWay: '/the-lal-bahadur-shastri-way',
  familyMessage: '/message-from-the-lal-bahadur-shastri-family',
  foundersNote: '/founders-note',

  // Named verbatim in Full Website Sitemap S3.
  curriculum: '/curriculum-nep-2020-activity-based-learning',
  curriculumShort: '/curriculum',

  // For Parents group (menu only).
  valueStories: '/value-stories',
  parenting: '/parenting-tips-and-resources',

  campuses: '/preschool-in-indore-campuses',

  // Named verbatim in Full Website Sitemap S3.
  admissions: '/preschool-admission-indore',
  programs: '/programs-and-classes',
  fees: '/preschool-fees-indore',
  faqs: '/faqs',
  admissionProcess: '/admission-process',

  contact: '/contact-us',
  registerInterest: '/register-interest',

  // School Life group — Phase 2.
  gallery: '/school-life/gallery',
  educators: '/school-life/our-educators',
  events: '/school-life/events-and-news',
  testimonials: '/school-life/testimonials',

  // Footer.
  careers: '/careers',
  downloads: '/downloads',
  sitemap: '/sitemap',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  refund: '/refund-and-cancellation-policy',
  childProtection: '/child-protection-policy',
  mandatoryDisclosure: '/mandatory-public-disclosure',
} as const

export type RouteKey = keyof typeof routes

export const absoluteUrl = (path: string) =>
  `https://lbskidz.com${path === '/' ? '' : path}`
