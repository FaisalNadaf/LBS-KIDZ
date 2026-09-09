import { SITE_PHASE } from './site'
import { routes } from './routes'

export type NavLink = { label: string; href: string; description?: string }
export type NavItem =
  | { kind: 'link'; label: string; href: string; short?: string }
  | { kind: 'group'; label: string; href?: string; short?: string; children: NavLink[] }

/**
 * Primary navigation.
 * Source: Full Website Sitemap S1.1 (Phase 1) and S1.2 (Phase 2).
 *
 * "Phase 2 does not restructure the navbar - it enriches the same slots with
 *  real content and adds one dropdown (School Life)... No nav item changes
 *  position or URL between phases."
 */
export const primaryNav: NavItem[] = [
  { kind: 'link', label: 'Home', href: routes.home },
  {
    kind: 'group',
    label: 'Shastri Ji Legacy',
    short: 'Legacy',
    children: [
      {
        label: 'LBS Legacy',
        href: routes.legacy,
        description: 'The life, values and incidents of Shri Lal Bahadur Shastri',
      },
      {
        label: 'The Lal Bahadur Shastri Way',
        href: routes.lbsWay,
        description: 'SIMPLE, Little Karmayogis, Shastri Sanskaar and the Sankalp Calendar',
      },
      {
        label: 'A Message from the Lal Bahadur Shastri Family',
        href: routes.familyMessage,
        description: 'The family blessing carried into a new generation',
      },
      {
        label: "Founder's Note",
        href: routes.foundersNote,
        description: 'Mr. Adarsh Shastri, Authorized Representative',
      },
    ],
  },
  {
    kind: 'link',
    label: 'Curriculum & Learning Approach',
    /**
     * The navbar shows `short`; everything else keeps the full phrase.
     *
     * At 29 characters the full label took roughly a quarter of the bar, which
     * is why the primary nav could not be shown below 1280px — so a desktop
     * user at 125% zoom lost the whole navigation. The keyword-bearing phrase
     * still appears verbatim in the page title, the breadcrumb, the footer
     * keyword block and the H1, so nothing is lost by shortening it here.
     */
    short: 'Curriculum',
    href: routes.curriculum,
  },
  {
    kind: 'group',
    label: 'For Parents',
    children: [
      {
        label: 'Value Stories',
        href: routes.valueStories,
        description: 'How a value is actually learned, not just taught',
      },
      {
        label: 'Parenting Tips & Resources',
        href: routes.parenting,
        description: 'Activity ideas, preschool readiness and early-years concerns',
      },
    ],
  },
  { kind: 'link', label: 'Campuses', href: routes.campuses },
  {
    kind: 'group',
    label: 'Admissions',
    href: routes.admissions,
    children: [
      {
        label: 'Programs & Classes',
        href: routes.programs,
        description: 'Playgroup, Nursery, LKG and UKG',
      },
      {
        label: 'Fees & Admissions',
        href: routes.fees,
        description: 'No hidden charges, fees shared on enquiry',
      },
      { label: 'FAQs', href: routes.faqs, description: 'The questions parents actually ask' },
      ...(SITE_PHASE >= 2
        ? [
            {
              label: 'Admission Process',
              href: routes.admissionProcess,
              description: 'Steps, dates and brochure download',
            },
          ]
        : []),
    ],
  },
  // School Life is a Phase 2 addition only, inserted in this exact slot.
  ...(SITE_PHASE >= 2
    ? ([
        {
          kind: 'group',
          label: 'School Life',
          children: [
            { label: 'Gallery', href: routes.gallery },
            { label: 'Our Educators', href: routes.educators },
            { label: 'Events & News', href: routes.events },
            { label: 'Testimonials', href: routes.testimonials },
          ],
        },
      ] as NavItem[])
    : []),
  { kind: 'link', label: 'Contact Us', short: 'Contact', href: routes.contact },
]

/** Source: Full Website Sitemap S2.2 */
export const footerQuickLinks: NavLink[] = [
  { label: 'Home', href: routes.home },
  { label: 'Curriculum & Learning Approach', href: routes.curriculum },
  { label: 'LBS Legacy', href: routes.legacy },
  { label: 'Admissions', href: routes.admissions },
  { label: 'Contact Us', href: routes.contact },
  { label: 'Sitemap', href: routes.sitemap },
]

/** Source: Full Website Sitemap S2.3 */
export const footerLegalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: routes.privacy },
  { label: 'Terms & Conditions', href: routes.terms },
  { label: 'Refund & Cancellation Policy', href: routes.refund },
  { label: 'Child Protection Policy', href: routes.childProtection },
  { label: 'Mandatory Public Disclosure', href: routes.mandatoryDisclosure },
]

/**
 * Source: Full Website Sitemap S2.4.
 * Careers appears "once relevant" and Downloads "once available" - both Phase 2.
 */
export const footerUtilityLinks: NavLink[] = [
  { label: 'FAQs', href: routes.faqs },
  ...(SITE_PHASE >= 2
    ? [
        { label: 'Careers', href: routes.careers },
        { label: 'Downloads', href: routes.downloads },
      ]
    : []),
]

/**
 * The keyword-linking layer. A dedicated footer block, separate from Quick
 * Links, that uses full keyword phrases as the link text itself.
 * Source: Full Website Sitemap S3 (Keyword-Linking Layer).
 *
 * Treated as a living element: new entries get added here as they go live.
 */
export const footerExploreLinks: NavLink[] = [
  { label: 'Best Preschool in Indore', href: routes.home },
  { label: 'NEP 2020 Preschool Guide', href: `${routes.curriculum}#nep-2020-alignment` },
  {
    label: 'Activity-Based Learning for Preschoolers',
    href: `${routes.curriculum}#activity-based-learning`,
  },
  { label: 'No Examination Policy in Preschool', href: `${routes.curriculum}#no-examinations` },
  { label: 'Preschool Admission in Indore', href: routes.admissions },
  { label: 'Value-Based Preschool Education', href: routes.valueStories },
  // Phase 2 adds one keyword-linked entry per locked location zone.
  ...(SITE_PHASE >= 2
    ? [
        { label: 'Preschool in Kanadia Road', href: `${routes.campuses}/kanadia-road` },
        { label: 'Preschool in Rau', href: `${routes.campuses}/rau` },
        { label: 'Preschool in Bicholi Mardana', href: `${routes.campuses}/bicholi-mardana` },
      ]
    : []),
]
