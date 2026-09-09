/**
 * Derives `size-adjust` percentages for metric-matched fallback fonts.
 *
 * A webfont loaded with `font-display: swap` renders in a fallback first, then
 * swaps. If the two have different advance widths the text reflows, and every
 * element beside it shifts. Scaling the fallback so its average advance width
 * matches the real face removes the reflow almost entirely.
 */
import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

const pairs = [
  { real: '"Plus Jakarta Sans Variable"', fallback: 'Arial', label: 'sans / Arial' },
  { real: '"Fraunces Variable"', fallback: 'Georgia', label: 'display / Georgia' },
  { real: '"Plus Jakarta Sans Variable"', fallback: '"Segoe UI"', label: 'sans / Segoe UI' },
]

const sample =
  'LBS KidZ Curriculum & Learning Approach Admissions Contact Us Shastri Ji Legacy'

for (const p of pairs) {
  const r = await page.evaluate(
    ({ real, fallback, sample }) => {
      const measure = (family) => {
        const el = document.createElement('span')
        el.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font:400 100px ${family}`
        el.textContent = sample
        document.body.appendChild(el)
        const w = el.getBoundingClientRect().width
        el.remove()
        return w
      }
      return { realW: measure(real), fbW: measure(fallback) }
    },
    { ...p, sample },
  )
  const adjust = (r.realW / r.fbW) * 100
  console.log(
    `${p.label.padEnd(20)} real ${r.realW.toFixed(1)}  fallback ${r.fbW.toFixed(1)}  size-adjust: ${adjust.toFixed(1)}%`,
  )
}

await browser.close()
