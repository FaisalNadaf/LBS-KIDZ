/**
 * QA sweep.
 *
 * Loads every route in a real browser at several viewport widths and reports:
 *  - console errors and page exceptions
 *  - failed network requests (missing assets)
 *  - horizontal overflow (document wider than the viewport)
 *  - the presence of exactly one <h1>
 *  - links pointing at URLs the site does not serve
 *
 * Then it runs a client-side navigation pass through the same routes in one
 * long-lived page. Loading each route fresh never exercises unmount, which is
 * where a whole class of bug lives: anything that mutates DOM React owns
 * (ScrollTrigger's pin-spacer being the classic) only fails on the way out.
 *
 * Run against a running server:  node scripts/qa.mjs http://localhost:3000
 */
import { chromium } from 'playwright'

const origin = process.argv[2] ?? 'http://localhost:3000'

/**
 * Waits out the first-load screen.
 *
 * Every measurement below has to happen on the real page, and until the loader
 * unmounts it is not the real page: `body` carries `overflow: hidden`, so an
 * element pushing the document sideways cannot be detected and every overflow
 * check silently passes, and `window.scrollTo` does nothing, so the scroll that
 * activates lazy content and scroll-driven scenes never happens.
 *
 * Only after a full navigation. A client-side route change never remounts the
 * loader, so the wait resolves immediately and costs nothing.
 */
async function settled(page) {
  await page.waitForSelector('.lbs-load', { state: 'detached', timeout: 15000 }).catch(() => {})
}

const routes = [
  '/',
  '/curriculum-nep-2020-activity-based-learning',
  '/lal-bahadur-shastri-legacy',
  '/the-lal-bahadur-shastri-way',
  '/message-from-the-lal-bahadur-shastri-family',
  '/founders-note',
  '/value-stories',
  '/parenting-tips-and-resources',
  '/preschool-in-indore-campuses',
  '/preschool-admission-indore',
  '/programs-and-classes',
  '/preschool-fees-indore',
  '/faqs',
  '/contact-us',
  '/register-interest',
  '/sitemap',
  '/privacy-policy',
  '/terms-and-conditions',
  '/refund-and-cancellation-policy',
  '/child-protection-policy',
  '/mandatory-public-disclosure',
  '/school-life/gallery',
  '/school-life/our-educators',
  '/school-life/events-and-news',
  '/school-life/testimonials',
  '/admission-process',
  '/careers',
  '/downloads',
  '/not-a-real-page',
]

const viewports = [
  { name: '320', width: 320, height: 720 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
  { name: '1280', width: 1280, height: 900 },
  { name: '1920', width: 1920, height: 1080 },
]

const problems = []
const allLinks = new Set()

const browser = await chromium.launch()

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  })

  for (const route of routes) {
    const page = await context.newPage()
    const url = `${origin}${route}`
    const errors = []

    page.on('console', (msg) => {
      const text = msg.text()
      // A deliberate 404 logs a console error in Chromium; that is the point of the route.
      if (route === '/not-a-real-page' && text.includes('404')) return
      if (msg.type() === 'error') errors.push(`console: ${text}`)
    })
    page.on('pageerror', (err) => errors.push(`exception: ${err.message}`))
    page.on('requestfailed', (req) => {
      errors.push(`request failed: ${req.url()} (${req.failure()?.errorText})`)
    })
    page.on('response', (res) => {
      // The 404 route is expected to return 404 for its own document.
      const expected404 = route === '/not-a-real-page' && res.url().endsWith(route)
      if (res.status() >= 400 && !expected404) {
        errors.push(`http ${res.status()}: ${res.url()}`)
      }
    })

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await settled(page)
      // Let entrance animations settle so any animation-time error surfaces.
      await page.waitForTimeout(400)
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(600)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(200)

      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        h1Count: document.querySelectorAll('h1').length,
        title: document.title,
        links: [...document.querySelectorAll('a[href^="/"]')].map((a) =>
          a.getAttribute('href'),
        ),
        widest: (() => {
          const vw = document.documentElement.clientWidth
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect()
            if (r.right > vw + 1.5 && r.width > 0) {
              return `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`
            }
          }
          return null
        })(),
      }))

      metrics.links.forEach((href) => allLinks.add(href.split('#')[0]))

      if (metrics.scrollWidth > metrics.clientWidth + 1) {
        problems.push(
          `[overflow ${viewport.name}] ${route}: scrollWidth ${metrics.scrollWidth} > ${metrics.clientWidth}. First offender: ${metrics.widest ?? 'unknown'}`,
        )
      }
      if (metrics.h1Count !== 1) {
        problems.push(`[h1 ${viewport.name}] ${route}: found ${metrics.h1Count} h1 elements`)
      }
      if (!metrics.title || metrics.title === 'LBS KidZ') {
        problems.push(`[title ${viewport.name}] ${route}: title is "${metrics.title}"`)
      }
    } catch (error) {
      problems.push(`[load ${viewport.name}] ${route}: ${error.message}`)
    }

    errors.forEach((e) => problems.push(`[js ${viewport.name}] ${route}: ${e}`))
    await page.close()
  }

  await context.close()
  console.log(`checked ${routes.length} routes at ${viewport.width}px`)
}

/* ---- Client-side navigation pass ----
   One page, many route changes, scrolling into the scroll-driven scenes before
   leaving each one. This is what catches teardown errors. */

const navErrors = []
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  page.on('pageerror', (err) => navErrors.push(`exception: ${err.message.slice(0, 160)}`))
  page.on('console', (msg) => {
    const text = msg.text()
    if (msg.type() === 'error' && !text.includes('404')) {
      navErrors.push(`console: ${text.slice(0, 160)}`)
    }
  })

  await page.goto(`${origin}/`, { waitUntil: 'networkidle' })
  await settled(page)

  // Routes reachable by clicking a link in the header or body.
  const walk = [
    '/curriculum-nep-2020-activity-based-learning',
    '/faqs',
    '/lal-bahadur-shastri-legacy',
    '/the-lal-bahadur-shastri-way',
    '/value-stories',
    '/preschool-in-indore-campuses',
    '/programs-and-classes',
    '/curriculum-nep-2020-activity-based-learning',
    '/',
  ]

  for (const target of walk) {
    /**
     * `:visible` matters. The navbar dropdowns are kept mounted and hidden with
     * `visibility: hidden` rather than unmounted, so that opening one is a CSS
     * transition and the panel keeps its place in the tab order. That means a
     * bare `a[href=...]` selector can resolve to a link inside a closed menu,
     * which is present in the DOM but not clickable.
     */
    const link = page.locator(`a[href="${target}"]:visible`).first()
    if ((await link.count()) === 0) {
      await page.goto(`${origin}${target}`, { waitUntil: 'networkidle' })
      await settled(page)
    } else {
      await link.click()
    }
    await page.waitForTimeout(700)
    // Scroll deep enough to activate any scroll-driven scene, then move on.
    await page.evaluate(() => window.scrollTo(0, Math.min(4000, document.body.scrollHeight)))
    await page.waitForTimeout(700)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(200)
  }

  // Nothing may have re-parented a React-owned node.
  const orphans = await page.evaluate(() => document.querySelectorAll('.pin-spacer').length)
  if (orphans > 0) {
    navErrors.push(`${orphans} .pin-spacer wrapper(s) found: GSAP is restructuring React-owned DOM`)
  }

  await context.close()
}
navErrors.forEach((e) => problems.push(`[navigation] ${e}`))
console.log(`walked ${9} client-side navigations`)

/* ---- Link check ---- */

const known = new Set(routes)
const badLinks = []
for (const href of allLinks) {
  if (!href || href.startsWith('//')) continue
  if (known.has(href)) continue
  const res = await fetch(`${origin}${href}`, { redirect: 'manual' })
  if (res.status >= 400) badLinks.push(`${href} -> ${res.status}`)
}
badLinks.forEach((l) => problems.push(`[link] ${l}`))

await browser.close()

console.log('\n=== QA RESULT ===')
if (problems.length === 0) {
  console.log('No problems found.')
} else {
  console.log(`${problems.length} problem(s):`)
  problems.forEach((p) => console.log(' - ' + p))
}
console.log(`\nInternal links checked: ${allLinks.size}`)
process.exit(problems.length ? 1 : 0)
