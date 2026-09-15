import { useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { primaryCta } from '@/data/site'
import { routes } from '@/data/routes'

/**
 * The sticky Register Interest bar, on phones only.
 *
 * REQUIRED BY THE HOME SPECIFICATION, and it closes a real gap rather than
 * decorating one: "Mobile: sticky bottom CTA bar with Register Interest, since
 * it is the page's single conversion goal." Source: Home Page Content S5.
 *
 * The gap it closes is that the navbar's own CTA is `hidden sm:block`, so
 * between 320px and 639px, which is most phones held in portrait, the only
 * Register Interest anywhere on screen was inside the closed hamburger menu.
 * The button existed on every page and was reachable on none of them.
 *
 * `sm:hidden` rather than `lg:hidden`: from 640px the navbar shows its own CTA,
 * and two of them on one screen is worse than either.
 *
 * WHAT IT DOES NOT COVER. A fixed bar sits over the foot of the page forever,
 * so `SiteLayout` reserves its height at the bottom of the document below `sm`.
 * Without that the footer's last line and its Back to top control were
 * permanently underneath it.
 *
 * `env(safe-area-inset-bottom)` keeps it clear of the home indicator on a
 * notched phone, where a bar flush to the bottom edge is half-swallowed.
 */
export function MobileCtaBar() {
  const { pathname } = useLocation()

  // A link to the page the reader is already on is not a call to action.
  if (pathname === routes.registerInterest) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-300 bg-mist-50/95 backdrop-blur-lg sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="px-edge py-3">
        <Link
          to={primaryCta.href}
          className="corner-cut flex h-12 w-full items-center justify-center gap-2 bg-primary px-5 text-small font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-primary-hover"
        >
          {primaryCta.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

/**
 * The space the bar occupies, reserved at the foot of the document.
 *
 * Rendered as a sibling rather than as padding on `body`, so nothing has to
 * know the bar's height in two places: this is the bar's own height, declared
 * once, and it disappears at exactly the width the bar does.
 */
export function MobileCtaSpacer() {
  const { pathname } = useLocation()
  if (pathname === routes.registerInterest) return null

  return (
    <div
      aria-hidden="true"
      className="h-[4.5rem] sm:hidden"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    />
  )
}
