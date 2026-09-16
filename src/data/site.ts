/**
 * Single source of truth for brand-level facts.
 * Every value here traces to a source PDF. Anything not present in the
 * source documents is marked PENDING and rendered as an honest
 * "to be confirmed" state rather than being invented.
 */

/**
 * Phase 1 = soft launch: story/legacy-led, no real campus/staff/students shown.
 * Phase 2 = post-operational: real campuses, staff, students, testimonials.
 * Source: Project Decisions Log S4 (Phasing Strategy).
 *
 * Flipping this to 2 turns on the School Life nav group, the Admission Process
 * page, Careers, Downloads, real campus addresses, and relabels the primary CTA.
 * No navigation item changes position or URL between phases.
 * Source: Full Website Sitemap S1.2.
 */
export const SITE_PHASE: 1 | 2 = 1

const OPERATOR = 'School Excellence Program Pvt. Ltd.'

/**
 * The copyright sentence, in the two pieces that sit either side of the
 * operator's name.
 *
 * It is split because the footer links that name and a link cannot be put
 * inside a finished string. It is split into constants rather than retyped
 * because the whole sentence is verbatim from Full Website Sitemap S2.5 and is
 * audited as verbatim — see docs/final-pdf-compliance-audit.md — so
 * `copyrightLine` below is now assembled from these rather than written out a
 * second time. There is no second copy to drift.
 */
const COPYRIGHT_BEFORE = '© 2026 LBS KidZ, powered by '
const COPYRIGHT_AFTER = ' All rights reserved.'

export const site = {
  name: 'LBS KidZ',
  /** Source: Website Reference Document, header. */
  domain: 'https://lbskidz.com',
  locale: 'en-IN',
  /** Source: Website Reference Document S1. */
  parentGroup: 'LBSKidZ Group Indore',
  operator: OPERATOR,
  /** SEP's own site, linked wherever the operating partner is named. */
  operatorUrl: 'https://theschoolexcel.com',
  partner: 'Lal Bahadur Shastri Educational Society (LBS Group)',
  city: 'Indore',
  state: 'Madhya Pradesh',
  country: 'IN',
  /** Source: Full Website Sitemap S2.5. */
  copyrightLine: `${COPYRIGHT_BEFORE}${OPERATOR}${COPYRIGHT_AFTER}`,
  /** The same sentence, for the footer, which links the operator's name. */
  copyright: { before: COPYRIGHT_BEFORE, after: COPYRIGHT_AFTER },
  /** Who built the site. Shown once, in the footer. */
  credit: {
    prefix: 'Designed and Developed by ',
    name: 'Cubiccode',
    url: 'https://cubiccode.in/',
  },
} as const

/**
 * PENDING — no public school contact details appear in any source document.
 * The phone numbers in the PDFs are the signature block of the SEP founder on
 * internal letterhead, not a published school contact line, so they are not
 * used here. Replace the placeholders below before go-live.
 * See docs/decisions-and-todos.md, item T-01.
 */
export const contact = {
  phone: { value: '', display: '', pending: true },
  whatsapp: { value: '', display: '', pending: true },
  email: { value: '', display: '', pending: true },
  /** Source: Project Decisions Log S4 — Phase 1 shows zone level only. */
  address: { lines: [] as string[], mapsUrl: '', pending: true },
  social: {
    instagram: { url: '', pending: true },
    facebook: { url: '', pending: true },
    youtube: { url: '', pending: true },
  },
} as const

/** Source: Full Website Sitemap S1.1 / S1.2 — the CTA label evolves by phase. */
export const primaryCta = {
  label: SITE_PHASE === 1 ? 'Register Interest' : 'Enquire Now',
  href: '/register-interest',
} as const

/**
 * The primary CTA in Phase 2 shifts to "Admissions"/"Book a Visit".
 * Source: Project Decisions Log S4.
 */
export const ctaSupportLabel = SITE_PHASE === 1 ? 'Book a Callback' : 'Book a Visit'
