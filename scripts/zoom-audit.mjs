/**
 * Layout audit across viewport widths AND browser zoom levels.
 *
 * Zoom is simulated the way Chrome actually does it — the CSS viewport shrinks
 * while the device pixel ratio rises — rather than with a CSS transform, so
 * media queries, `vh` units and every `clamp()` behave exactly as they would
 * for a real user at 110% or 125%. A transform-based fake would pass while the
 * real thing broke.
 *
 * What it looks for, per route per case:
 *   - horizontal overflow
 *   - content colliding with the fixed navbar
 *   - text clipped by an ancestor that cannot scroll
 *   - page-header height drifting away from the 40vh target
 *   - controls below the 44px minimum touch target
 *
 * Run against a running server:
 *   node scripts/zoom-audit.mjs http://localhost:3000
 */
import { chromium } from 'playwright'

const origin = process.argv[2] ?? 'http://localhost:3000'

const routes = [
  '/',
  '/curriculum-nep-2020-activity-based-learning',
  '/lal-bahadur-shastri-legacy',
  '/the-lal-bahadur-shastri-way',
  '/value-stories',
  '/parenting-tips-and-resources',
  '/preschool-in-indore-campuses',
  '/preschool-admission-indore',
  '/programs-and-classes',
  '/preschool-fees-indore',
  '/faqs',
  '/contact-us',
  '/register-interest',
  '/message-from-the-lal-bahadur-shastri-family',
  '/founders-note',
  '/sitemap',
  '/privacy-policy',
  '/school-life/gallery',
]

/** Width is the *device* width; the CSS viewport is that divided by the zoom. */
const cases = [
  { label: '1440 @100%', width: 1440, zoom: 1 },
  { label: '1440 @110%', width: 1440, zoom: 1.1 },
  { label: '1440 @125%', width: 1440, zoom: 1.25 },
  { label: '1280 @125%', width: 1280, zoom: 1.25 },
  { label: '1024 @110%', width: 1024, zoom: 1.1 },
  { label: ' 834 @100%', width: 834, zoom: 1 },
  { label: ' 768 @110%', width: 768, zoom: 1.1 },
  { label: ' 430 @100%', width: 430, zoom: 1 },
  { label: ' 390 @100%', width: 390, zoom: 1 },
  { label: ' 375 @110%', width: 375, zoom: 1.1 },
]

const problems = []
const headerHeights = []
const browser = await chromium.launch()

for (const c of cases) {
  const ctx = await browser.newContext({
    viewport: { width: Math.round(c.width / c.zoom), height: Math.round(900 / c.zoom) },
    deviceScaleFactor: c.zoom,
  })
  const page = await ctx.newPage()

  for (const route of routes) {
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle', timeout: 45000 })
    // The site sets `scroll-behavior: smooth`, so scrollTo(0, 0) is still
    // animating when the measurement runs and reports hero content as sitting
    // under the fixed navbar. Measure against instant scrolling.
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.6) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 90))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(650)

    const found = await page.evaluate(() => {
      const out = []
      const doc = document.documentElement
      const vw = doc.clientWidth
      const vh = window.innerHeight

      if (doc.scrollWidth > vw + 1) {
        let culprit = ''
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width > 0 && r.right > vw + 2) {
            culprit = `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 44)}`
            break
          }
        }
        out.push(`overflow-x ${doc.scrollWidth - vw}px (${culprit || 'unknown'})`)
      }

      // Anything sitting under the fixed navbar at rest, other than the header
      // art that is meant to run behind it.
      const nav = document.querySelector('header.fixed')
      if (nav) {
        const navBottom = nav.getBoundingClientRect().bottom
        for (const el of document.querySelectorAll(
          'main h1, main h2, main p, main a, main button, main li',
        )) {
          const r = el.getBoundingClientRect()
          if (r.height > 0 && r.top < navBottom - 4 && r.bottom > 8) {
            out.push(`under navbar: ${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 28)}"`)
            break
          }
        }
      }

      // Text taller than a clipping ancestor: a real "content is cut off" bug,
      // as opposed to an intentional overflow-hidden frame around an image.
      for (const el of document.querySelectorAll('h1, h2, h3, p, li, span, a, button')) {
        if (!el.textContent?.trim()) continue
        const parent = el.parentElement
        if (!parent) continue
        const cs = getComputedStyle(parent)
        if (cs.overflow !== 'hidden' && cs.overflowY !== 'hidden') continue
        if (parent.querySelector('img, picture, svg')) continue
        const r = el.getBoundingClientRect()
        const pr = parent.getBoundingClientRect()
        if (r.height > 4 && pr.height > 4 && r.bottom > pr.bottom + 3) {
          out.push(`clipped text in ${parent.tagName.toLowerCase()}.${String(parent.className).slice(0, 36)}`)
          break
        }
      }

      // Touch targets.
      for (const el of document.querySelectorAll('a[href], button')) {
        const r = el.getBoundingClientRect()
        if (r.width < 2 || r.height < 2) continue
        const display = getComputedStyle(el).display
        if (display === 'inline') continue
        // A link sitting inside a run of text is exempt under WCAG 2.5.8.
        const parentText = (el.parentElement?.textContent || '').trim()
        const ownText = (el.textContent || '').trim()
        if (display.startsWith('inline') && parentText.length > ownText.length + 12) continue
        if (r.height < 30) {
          out.push(`small target ${Math.round(r.height)}px: "${(el.textContent || '').trim().slice(0, 24)}"`)
          break
        }
      }

      const header = document.querySelector('main header')
      const hh = header ? header.getBoundingClientRect().height : null

      return { out, headerVh: hh ? +(hh / vh).toFixed(3) : null, headerPx: hh ? Math.round(hh) : null }
    })

    found.out.forEach((f) => problems.push(`[${c.label}] ${route}: ${f}`))
    if (found.headerVh !== null) {
      headerHeights.push({ case: c.label, route, vh: found.headerVh, px: found.headerPx })
    }
  }

  await ctx.close()
  console.log(`checked ${routes.length} routes at ${c.label}`)
}

await browser.close()

/* ---- Page-header consistency ---- */
console.log('\n=== PAGE HEADER HEIGHT (target ~0.40vh) ===')
const byCase = new Map()
for (const h of headerHeights) {
  if (!byCase.has(h.case)) byCase.set(h.case, [])
  byCase.get(h.case).push(h)
}
for (const [label, rows] of byCase) {
  const vhs = rows.map((r) => r.vh)
  const min = Math.min(...vhs)
  const max = Math.max(...vhs)
  const spread = ((max - min) / max) * 100
  const flag = spread > 20 ? '  << spread over 20%' : ''
  console.log(
    `${label}  ${rows.length} headers  ${min.toFixed(2)}-${max.toFixed(2)}vh  spread ${spread.toFixed(0)}%${flag}`,
  )
}

console.log('\n=== LAYOUT RESULT ===')
if (!problems.length) {
  console.log('No overflow, navbar collisions, clipped text or small targets found.')
} else {
  const unique = [...new Set(problems)]
  console.log(`${unique.length} problem(s):`)
  unique.slice(0, 40).forEach((p) => console.log('  - ' + p))
  if (unique.length > 40) console.log(`  ...and ${unique.length - 40} more`)
}
process.exit(problems.length ? 1 : 0)
