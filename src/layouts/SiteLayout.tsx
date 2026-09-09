import { useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigationType } from 'react-router-dom'
import { Navbar } from './navbar'
import { Footer } from './Footer'
import { AdmissionCta } from '@/sections/shared/AdmissionCta'
import { NavToneContext, type NavTone } from './nav-tone'
import { useScrollReveal, usePageTransition } from '@/animations/gsap'

/**
 * Shell for every page.
 *
 * ScrollRestoration handles back and forward positions; the effects below take
 * a new page to the top and move keyboard focus to the main landmark, both of
 * which a router-only SPA otherwise loses entirely.
 */
export function SiteLayout() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const [tone, setTone] = useState<NavTone>('light-hero')

  /**
   * A new page starts at the top.
   *
   * `ScrollRestoration` is supposed to do this on its own and did not, for a
   * reason that is invisible in the router: `html` carries
   * `scroll-behavior: smooth`, so the reset it performs is an *animation*.
   * Half the routes on this site are lazily loaded, so the incoming page
   * renders a beat later, the document's height changes underneath the running
   * scroll, and the browser abandons it. Measured from 1800px down, four
   * navigations in a row landed between 1721 and 1800 — the reader arrived at a
   * new page most of the way down it.
   *
   * `behavior: 'instant'` is the fix. It overrides the CSS for this one call,
   * so in-page anchors keep gliding and route changes cut.
   *
   * Not on POP. Back and forward should return the reader to where they were,
   * which is what `ScrollRestoration` is for; forcing the top there would
   * throw away their place every time they backed out of a page.
   */
  useEffect(() => {
    if (hash || navigationType === 'POP') return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, navigationType])

  /**
   * Move focus to <main> when the route changes, which a router-only SPA
   * otherwise loses entirely for keyboard and screen-reader users.
   *
   * Deliberately skipped on first load: focusing <main> on arrival puts the
   * keyboard user past the skip link and the whole header, so their first Tab
   * would land somewhere inside the hero.
   */
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (hash) return
    const main = document.getElementById('main')
    if (main) main.focus({ preventScroll: true })
  }, [pathname, hash])

  /**
   * One batched ScrollTrigger for every `[data-reveal]` on the page, re-armed
   * on each route change. Keyed on pathname rather than run per component, so a
   * long page costs one observer instead of eighty.
   *
   * The scope is the layout root, NOT <main>: the persistent CTA band and
   * anything else rendered as a sibling of <main> would otherwise never be
   * collected, and would sit at the CSS hidden state forever.
   */
  const shellRef = useRef<HTMLDivElement>(null)
  useScrollReveal(shellRef, pathname)

  /** A short fade on the main region so a route change is not a hard cut. */
  const mainRef = useRef<HTMLElement>(null)
  usePageTransition(mainRef, pathname)

  const value = useMemo(() => ({ tone, setTone }), [tone])

  return (
    <NavToneContext.Provider value={value}>
      <div ref={shellRef} className="flex min-h-dvh flex-col">
        <Navbar />
        <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <AdmissionCta />
        <Footer />
        <ScrollRestoration getKey={(location) => location.pathname} />
      </div>
    </NavToneContext.Provider>
  )
}
