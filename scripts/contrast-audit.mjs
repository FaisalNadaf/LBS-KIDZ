/**
 * Contrast audit.
 *
 * Colours are recovered by painting each sample over white and over black
 * rather than parsed from the computed string: Tailwind v4 compiles opacity
 * modifiers to color-mix(), which getComputedStyle returns as oklab(...), and a
 * naive rgb() regex reads those channel values as 0-255 and reports nonsense.
 *
 * Text drawn over a photograph, and text in the fixed navbar over a hero it
 * cannot see, are reported separately: this walker can only resolve painted
 * background-colors, so those two cases need a human eye.
 */
import { chromium } from 'playwright'

const origin = process.argv[2] ?? 'http://localhost:3000'
const routes = [
  '/',
  '/curriculum-nep-2020-activity-based-learning',
  '/preschool-admission-indore',
  '/contact-us',
  '/lal-bahadur-shastri-legacy',
  '/value-stories',
  '/preschool-in-indore-campuses',
  '/register-interest',
  '/faqs',
  '/the-lal-bahadur-shastri-way',
  '/preschool-fees-indore',
  '/parenting-tips-and-resources',
]

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const all = new Set()

for (const route of routes) {
  await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.6) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(400)

  const fails = await page.evaluate(() => {
    const cv = document.createElement('canvas')
    cv.width = cv.height = 1
    const cx = cv.getContext('2d', { willReadFrequently: true })
    const cache = new Map()

    const paint = (css, base) => {
      cx.fillStyle = base
      cx.fillRect(0, 0, 1, 1)
      try {
        cx.fillStyle = css
      } catch {
        return null
      }
      cx.fillRect(0, 0, 1, 1)
      return cx.getImageData(0, 0, 1, 1).data
    }

    /**
     * For a colour C with alpha a, compositing over white gives C*a + 255(1-a)
     * and over black gives C*a. The difference recovers a; dividing the black
     * result by a recovers C.
     */
    const toRGBA = (css) => {
      if (cache.has(css)) return cache.get(css)
      const w = paint(css, '#ffffff')
      const b = paint(css, '#000000')
      if (!w || !b) return null
      const a = 1 - (w[0] - b[0]) / 255
      const v =
        a < 0.004 ? { r: 0, g: 0, b: 0, a: 0 } : { r: b[0] / a, g: b[1] / a, b: b[2] / a, a }
      cache.set(css, v)
      return v
    }

    const lum = ({ r, g, b }) => {
      const f = (v) => {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
      }
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
    }
    /**
     * Source-over compositing, keeping the resulting alpha rather than
     * assuming 1. A stack of translucent layers over a dark section only
     * resolves correctly if the accumulator stays translucent until an opaque
     * layer is found.
     */
    const over = (fg, bg) => {
      const a = fg.a + bg.a * (1 - fg.a)
      if (a === 0) return { r: 0, g: 0, b: 0, a: 0 }
      return {
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
        a,
      }
    }

    /**
     * Every colour stop in a linear/radial gradient, as painted colours.
     *
     * `backgroundColor` is transparent whenever an element paints a gradient
     * instead, so a walker that only reads `backgroundColor` falls straight
     * through a gradient card to the page ground and reports light text on a
     * dark card as a 1:1 failure. Card surfaces on this site are gradients, so
     * that blind spot covered most of the UI.
     *
     * The stops are checked individually and the worst one is used, which is
     * stricter than sampling a midpoint: text has to pass against the darkest
     * *and* the lightest part of the surface it sits on.
     */
    const gradientStops = (backgroundImage, backgroundSize) => {
      if (!backgroundImage || !backgroundImage.includes('gradient')) return []
      /**
       * Only a gradient that actually covers its element is a surface. A
       * `background-size` of anything else means the gradient is a decoration
       * drawn on top of the surface — TextLink's hover underline is a 1.5px
       * `currentColor` rule, and treating that as the background behind the
       * text gives a perfect 1:1 "failure" on every link on the site.
       */
      if (backgroundSize && !/^(auto|auto auto|100%|100% 100%|cover|contain)$/.test(backgroundSize)) {
        return []
      }
      const stops = backgroundImage.match(
        /(?:rgba?|oklab|oklch|color|hsla?)\([^()]*(?:\([^()]*\))?[^()]*\)/g,
      )
      if (!stops) return []
      return stops.map(toRGBA).filter((c) => c && c.a > 0)
    }

    /**
     * Walks up for the nearest chain of painted backgrounds, returning every
     * candidate surface the text could be sitting on.
     */
    const bgOf = (el) => {
      let node = el
      let acc = null
      let sawFixed = false
      const candidates = []

      while (node && node !== document.documentElement) {
        const cs = getComputedStyle(node)
        if (cs.position === 'fixed') sawFixed = true

        const stops = gradientStops(cs.backgroundImage, cs.backgroundSize)
        if (stops.length) {
          // A gradient is opaque enough to stop the walk; test against each of
          // its stops layered under whatever translucency we have collected.
          for (const stop of stops) {
            candidates.push(acc ? over(acc, stop) : stop)
          }
          return { bgs: candidates, sawFixed }
        }

        const c = toRGBA(cs.backgroundColor)
        if (c && c.a > 0) {
          acc = acc ? over(acc, c) : c
          if (acc.a >= 0.999) return { bgs: [acc], sawFixed }
        }
        node = node.parentElement
      }
      return { bgs: [acc ?? { r: 250, g: 246, b: 238, a: 1 }], sawFixed }
    }

    /**
     * True when a photograph is painted behind this text.
     *
     * Detected geometrically rather than structurally: any <img> that overlaps
     * the element's own box, and is not on the element's own ancestor chain,
     * is behind it. Matching on DOM shape instead missed the common case where
     * the picture and the caption are cousins inside a positioned wrapper.
     */
    const overPhoto = (el) => {
      const r = el.getBoundingClientRect()
      for (const img of document.querySelectorAll('img')) {
        if (img.contains(el) || el.contains(img)) continue
        const ir = img.getBoundingClientRect()
        if (ir.width < 8 || ir.height < 8) continue
        const overlaps =
          r.left < ir.right && r.right > ir.left && r.top < ir.bottom && r.bottom > ir.top
        if (overlaps) return true
      }
      return false
    }

    const out = []
    for (const el of document.querySelectorAll(
      'p,li,a,span,h1,h2,h3,h4,button,figcaption,label,strong,blockquote',
    )) {
      const ownsText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
      if (!ownsText) continue
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      if (r.width < 4 || r.height < 4 || cs.visibility === 'hidden' || Number(cs.opacity) < 0.1) {
        continue
      }
      const fg = toRGBA(cs.color)
      if (!fg) continue
      const { bgs, sawFixed } = bgOf(el)

      // Worst case across every candidate surface, so a gradient has to pass
      // at both ends rather than on average.
      let ratio = Infinity
      for (const candidate of bgs) {
        const opaqueBg = { ...candidate, a: 1 }
        const flat = fg.a < 1 ? over(fg, opaqueBg) : fg
        const l1 = lum(flat)
        const l2 = lum(opaqueBg)
        ratio = Math.min(ratio, (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05))
      }
      const px = parseFloat(cs.fontSize)
      const bold = parseInt(cs.fontWeight, 10) >= 700
      const large = px >= 24 || (px >= 18.66 && bold)
      const floor = large ? 3 : 4.5
      if (ratio >= floor) continue

      const unresolvable = sawFixed || overPhoto(el)
      out.push(
        `${unresolvable ? 'UNRESOLVED' : 'FAIL      '} ${ratio.toFixed(2)}/${floor} ${Math.round(px)}px ` +
          `${el.tagName}.${String(el.className).slice(0, 34)} "${el.textContent.trim().slice(0, 30)}"`,
      )
    }
    return [...new Set(out)]
  })
  fails.forEach((f) => all.add(f))
}

await browser.close()

const list = [...all].sort()
const real = list.filter((l) => l.startsWith('FAIL'))
const unresolved = list.filter((l) => l.startsWith('UNRESOLVED'))

console.log(real.length ? real.join('\n') : 'contrast: every resolvable text node passes WCAG AA')
if (unresolved.length) {
  console.log(
    `\n${unresolved.length} node(s) this walker cannot resolve (fixed navbar over a hero, or text on a photo scrim) — checked by eye:`,
  )
  console.log(unresolved.slice(0, 12).join('\n'))
}
process.exit(real.length ? 1 : 0)
