/**
 * Writes a static HTML file per route with the correct <head> already in it.
 *
 * Why this exists: the site is a client-rendered React app, so a crawler that
 * does not execute JavaScript would otherwise see one generic title for every
 * URL. This step copies dist/index.html for each route and injects that route's
 * title, description, canonical, robots, Open Graph, Twitter and JSON-LD tags,
 * plus a plain-text summary inside <noscript>.
 *
 * The result: title, description, canonical and structured data, including the
 * FAQPage blocks the AEO strategy asks for, are present in the raw HTML for
 * every page. The React app then hydrates and takes over normally.
 *
 * Everything is read from src/data/seo.ts, the same module the app renders
 * from, so the two cannot disagree.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { pageSeo, seoDefaults } = await import('../src/data/seo.ts')
const { SITE_PHASE } = await import('../src/data/site.ts')
const { faqs } = await import('../src/data/admissions.ts')

const shell = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const ld = (obj) => JSON.stringify(obj).split('<').join('\\u003c')

const abs = (path) => `${seoDefaults.origin}${path === '/' ? '' : path}`

/* ---- Shared structured data, mirroring src/lib/schema.ts ---- */

const organization = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  additionalType: 'https://schema.org/Preschool',
  '@id': `${seoDefaults.origin}/#organization`,
  name: 'LBS KidZ',
  alternateName: 'LBS KidZ Preschool',
  url: seoDefaults.origin,
  description:
    'A preschool brand under LBSKidZ Group Indore, developed in partnership between School Excellence Program Pvt. Ltd. and the Lal Bahadur Shastri Educational Society, carrying the legacy of Shri Lal Bahadur Shastri.',
  areaServed: [{ '@type': 'City', name: 'Indore' }],
  knowsLanguage: ['hi-IN', 'en-IN'],
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs
    .filter((f) => f.schema)
    .map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
}

const breadcrumbFor = (page) => {
  if (!page.breadcrumb?.length) return null
  const items = [{ label: 'Home', href: '/' }, ...page.breadcrumb]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: abs(item.href ?? (i === items.length - 1 ? page.path : '/')),
    })),
  }
}

/** Pages that carry FAQPage markup, per Keyword & AEO Strategy S6. */
const faqRoutes = new Set(['/curriculum-nep-2020-activity-based-learning', '/preschool-admission-indore', '/faqs', '/'])

/* ---- Emit ---- */

let written = 0

for (const [key, page] of Object.entries(pageSeo)) {
  if (key === 'notFound') continue

  const canonical = `${seoDefaults.origin}${page.path === '/' ? '/' : page.path}`
  const ogImage = `${seoDefaults.origin}${seoDefaults.ogImage}`
  const robots =
    page.noindex || (page.phase ?? 1) > SITE_PHASE
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large'

  const schemas = [organization]
  const crumbs = breadcrumbFor(page)
  if (crumbs) schemas.push(crumbs)
  if (faqRoutes.has(page.path)) schemas.push(faqPage)

  const head = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:type" content="${page.path === '/' ? 'website' : 'article'}" />`,
    `<meta property="og:site_name" content="${esc(seoDefaults.siteName)}" />`,
    `<meta property="og:locale" content="${seoDefaults.locale}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="${seoDefaults.twitterCard}" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    ...schemas.map((s) => `<script type="application/ld+json">${ld(s)}</script>`),
  ].join('\n    ')

  // A readable fallback for anything that does not run JavaScript at all.
  const noscript = `<noscript><h1>${esc(page.title.split(' | ')[0])}</h1><p>${esc(
    page.description,
  )}</p><p><a href="${seoDefaults.origin}/">LBS KidZ home</a></p></noscript>`

  const html = shell
    .replace('<title>LBS KidZ</title>', head)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript}`)

  const outDir = page.path === '/' ? dist : join(dist, page.path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
  written += 1
}

console.log(`prerendered <head> for ${written} routes`)
