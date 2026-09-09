/**
 * JSON-LD builders.
 *
 * Source: Keyword & AEO Strategy S6 requires FAQ schema on the Curriculum &
 * Learning Approach page using the Tier C question set, "with concise, direct
 * answers (this is what AI-powered search results and voice assistants
 * extract)".
 *
 * Nothing here asserts a fact the site does not already state on the page.
 * In particular no aggregateRating, no award, no accreditation and no address
 * is emitted, because none of those exist in the source documents yet.
 */

import { site } from '@/data/site'
import { seoDefaults } from '@/data/seo'
import { zones } from '@/data/campuses'

const abs = (path: string) => `${seoDefaults.origin}${path === '/' ? '' : path}`

/**
 * EducationalOrganization is the correct type for a school. Preschool is a
 * recognised subtype, so it is used as an additionalType hint.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    additionalType: 'https://schema.org/Preschool',
    '@id': `${seoDefaults.origin}/#organization`,
    name: site.name,
    alternateName: 'LBS KidZ Preschool',
    url: seoDefaults.origin,
    description:
      'A preschool brand under LBSKidZ Group Indore, developed in partnership between School Excellence Program Pvt. Ltd. and the Lal Bahadur Shastri Educational Society, carrying the legacy of Shri Lal Bahadur Shastri.',
    parentOrganization: [
      { '@type': 'Organization', name: site.operator },
      { '@type': 'Organization', name: site.partner },
    ],
    areaServed: [
      { '@type': 'City', name: site.city },
      ...zones.map((z) => ({ '@type': 'Place', name: `${z.name}, ${site.city}` })),
    ],
    // Address is intentionally omitted: no campus address exists in Phase 1 and
    // publishing a placeholder would be a false local-business signal.
    knowsLanguage: ['hi-IN', 'en-IN'],
  }
}

/** Used on the homepage so site-name and search behaviour are unambiguous. */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoDefaults.origin}/#website`,
    url: seoDefaults.origin,
    name: site.name,
    inLanguage: 'en-IN',
    publisher: { '@id': `${seoDefaults.origin}/#organization` },
  }
}

export function breadcrumbSchema(trail: { label: string; href?: string }[], currentPath: string) {
  const items = [{ label: 'Home', href: '/' }, ...trail]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: abs(item.href ?? (i === items.length - 1 ? currentPath : '/')),
    })),
  }
}

export function faqSchema(entries: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.q,
      acceptedAnswer: { '@type': 'Answer', text: e.a },
    })),
  }
}

/**
 * Course-like description of a class. Kept minimal: no price, no provider
 * rating, no schedule, because fees are deliberately not published and the
 * academic calendar does not exist yet.
 */
export function programSchema(programs: { name: string; blurb: string; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Classes at LBS KidZ',
    itemListElement: programs.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: p.name,
        description: p.blurb,
        provider: { '@id': `${seoDefaults.origin}/#organization` },
        educationalLevel: 'Preschool',
        inLanguage: ['hi-IN', 'en-IN'],
      },
    })),
  }
}

export function articleSchema(input: {
  headline: string
  description: string
  path: string
  section: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    articleSection: input.section,
    mainEntityOfPage: abs(input.path),
    inLanguage: 'en-IN',
    publisher: { '@id': `${seoDefaults.origin}/#organization` },
  }
}
