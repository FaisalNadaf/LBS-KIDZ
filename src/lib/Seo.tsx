import { useLocation } from 'react-router-dom'
import { pageSeo, seoDefaults, type PageSeo } from '@/data/seo'
import { breadcrumbSchema } from './schema'

/**
 * Document head for a route.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree into
 * <head>, so no helmet dependency is needed. The build step additionally writes
 * a static copy of these tags into each route's index.html
 * (scripts/prerender-head.mjs) so crawlers and AI answer engines get correct
 * metadata without executing JavaScript.
 */

/**
 * JSON-LD is authored in this repo and never contains user input, but every
 * "<" is still escaped so no future string can terminate the script element
 * early.
 */
const ld = (schema: object) => JSON.stringify(schema).split('<').join('\\u003c')

type Props = {
  page: PageSeo
  /** Extra JSON-LD blocks for this route. */
  schemas?: object[]
}

export function Seo({ page, schemas = [] }: Props) {
  const { pathname } = useLocation()
  const canonical = `${seoDefaults.origin}${page.path === '/' ? '/' : page.path}`

  const blocks = [...schemas]
  if (page.breadcrumb?.length) {
    blocks.unshift(breadcrumbSchema(page.breadcrumb, page.path))
  }

  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={canonical} />
      {page.noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      <meta property="og:type" content={page.path === '/' ? 'website' : 'article'} />
      <meta property="og:site_name" content={seoDefaults.siteName} />
      <meta property="og:locale" content={seoDefaults.locale} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${seoDefaults.origin}${seoDefaults.ogImage}`} />
      <meta name="twitter:card" content={seoDefaults.twitterCard} />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={`${seoDefaults.origin}${seoDefaults.ogImage}`} />

      {blocks.map((schema, i) => (
        <script
          key={`${pathname}-ld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld(schema) }}
        />
      ))}
    </>
  )
}

export { pageSeo }
