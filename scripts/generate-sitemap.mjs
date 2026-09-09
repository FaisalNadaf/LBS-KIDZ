/**
 * Generates dist/sitemap.xml and dist/robots.txt from the same route metadata
 * the app uses, so the two can never drift apart.
 *
 * Only routes that are live in the current phase and not marked noindex are
 * included. Phase 2 routes exist and are reachable, but are deliberately kept
 * out of the sitemap until there is real content behind them.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

// Node 22.18+ / 24 strips TypeScript types on import, so the app's own data
// module is the single source of truth here rather than a duplicated list.
const { pageSeo, seoDefaults } = await import('../src/data/seo.ts')
const { SITE_PHASE } = await import('../src/data/site.ts')

const today = new Date().toISOString().slice(0, 10)

const entries = Object.values(pageSeo)
  .filter((page) => !page.noindex)
  .filter((page) => (page.phase ?? 1) <= SITE_PHASE)
  .map((page) => {
    // Home first, then the AEO anchor, then the rest.
    const priority = page.path === '/' ? '1.0' : page.path.includes('curriculum') ? '0.9' : '0.7'
    const changefreq = page.path === '/' ? 'weekly' : 'monthly'
    return `  <url>
    <loc>${seoDefaults.origin}${page.path === '/' ? '/' : page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

# AI answer engines are welcome. The Curriculum & Learning Approach page is the
# canonical statement of how LBS KidZ teaches.
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${seoDefaults.origin}/sitemap.xml
`

if (!existsSync(dist)) mkdirSync(dist, { recursive: true })
writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(join(dist, 'robots.txt'), robots, 'utf8')

console.log(`sitemap.xml written with ${entries.length} URLs`)
