/**
 * Divider audit.
 *
 * Walks every route, lists the full-bleed bands in document order, and checks
 * two things at each join: that the upper band carries a divider at all, and
 * that the divider's fill is exactly the background of the band below it. A
 * mismatch there is the one failure this system cannot tolerate — it shows as a
 * band of the wrong colour across the full width of the page.
 *
 * Run against a running server:  node scripts/divider-audit.mjs http://localhost:5174
 */
import { chromium } from 'playwright'

const origin = process.argv[2] ?? 'http://localhost:5174'
const routes = [
  '/', '/preschool-admission-indore', '/curriculum-nep-2020-activity-based-learning',
  '/the-lal-bahadur-shastri-way', '/lal-bahadur-shastri-legacy', '/preschool-fees-indore',
  '/preschool-in-indore-campuses', '/programs-and-classes', '/parenting-tips-and-resources',
  '/contact-us', '/register-interest', '/value-stories', '/founders-note',
  '/message-from-the-lal-bahadur-shastri-family', '/faqs', '/privacy-policy', '/sitemap',
]


/**
 * Waits out the first-load screen.
 *
 * Every measurement below has to happen on the real page, and until the loader
 * unmounts it is not the real page: `body` carries `overflow: hidden`, so an
 * element pushing the document sideways cannot be detected and every overflow
 * check silently passes, and `window.scrollTo` does nothing, so the scroll that
 * activates lazy content and scroll-driven scenes never happens.
 *
 * Only after a full navigation. A client-side route change never remounts it,
 * so the wait resolves immediately and costs nothing.
 */
async function settled(page) {
  await page.waitForSelector('.lbs-load', { state: 'detached', timeout: 15000 }).catch(() => {})
}

const b = await chromium.launch()
let missing = 0, mismatch = 0
for (const r of routes) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } })
  await p.goto(origin + r, { waitUntil: 'networkidle' })
  await settled(p)
  await new Promise((s) => setTimeout(s, 400))

  const rows = await p.evaluate(() => {
    const out = []
    // Every full-bleed band on the page, in document order. `section` alone is
    // not enough: the header and footer are bands too, and the CTA is rendered
    // as a sibling of <main> rather than inside it.
    for (const el of document.querySelectorAll('header, section, footer')) {
      const cs = getComputedStyle(el)
      if (cs.backgroundColor === 'rgba(0, 0, 0, 0)') continue
      if (el.getBoundingClientRect().width < window.innerWidth - 2) continue
      if (el.getBoundingClientRect().height < 80) continue
      // A band can carry a divider at either edge: one hanging from its foot
      // (the band below reaching up) or one at its head (the band above
      // reaching down). Both cover the seam they touch, so both are collected.
      const fills = { bottom: null, top: null }
      for (const wrap of el.querySelectorAll(':scope > div[aria-hidden="true"]')) {
        const svg = wrap.querySelector('svg[viewBox^="0 0 1440"]')
        if (!svg) continue
        // Which edge it hangs from, measured rather than inferred. Reading
        // `transform` fails because Tailwind v4 flips through the CSS `scale`
        // property; reading `top` fails because a browser resolves `top` to a
        // used value even when only `bottom` was set. The geometry cannot lie.
        const wr = wrap.getBoundingClientRect()
        const br = el.getBoundingClientRect()
        const edge = Math.abs(wr.top - br.top) < 4 ? 'top' : 'bottom'
        fills[edge] = getComputedStyle(svg.querySelector('path')).fill
      }
      out.push({
        id: el.id || el.getAttribute('aria-labelledby') || el.tagName.toLowerCase(),
        bg: cs.backgroundColor,
        ...fills,
      })
    }
    return out
  })

  const bad = []
  rows.forEach((row, i) => {
    const next = rows[i + 1]
    if (!next) return
    // Two bands on the same ground have no seam to cover. This is not a band
    // that forgot its divider; it is one run of colour that happens to be split
    // across two elements, which the Curriculum day does because its pinned
    // scene has to own its height to the pixel and cannot carry the notes that
    // follow it. Drawing a curve at that join would invent an edge where the
    // reader sees none.
    if (row.bg === next.bg) return

    // Otherwise the seam is covered if this band reaches down into the next, or
    // the next reaches up into this one. Either way the fill has to be the
    // colour of the band on the *other* side of the join.
    const fromAbove = row.bottom && row.bottom === next.bg
    const fromBelow = next.top && next.top === row.bg
    if (fromAbove || fromBelow) return
    if (!row.bottom && !next.top) { bad.push(`  MISSING  ${row.id} -> ${next.id}`); missing++ }
    else {
      const got = row.bottom ?? next.top
      const want = row.bottom ? next.bg : row.bg
      bad.push(`  MISMATCH ${row.id} -> ${next.id}: fill ${got}, needs ${want}`); mismatch++
    }
  })
  console.log(`${r}  bands=${rows.length}${bad.length ? '' : '  all seams ok'}`)
  bad.forEach((x) => console.log(x))
  await p.close()
}
console.log(`\n=== ${missing} missing, ${mismatch} mismatched ===`)
await b.close()
process.exit(missing + mismatch ? 1 : 0)
