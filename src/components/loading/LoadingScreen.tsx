import { useEffect, useRef, useState } from 'react'
import { LogoMark } from '@/layouts/Logo'
import { SchoolBus } from './SchoolBus'
import { Book, Cloud, PaperPlane, Pencil, Star } from '@/components/art/objects'
import { usePrefersReducedMotion, useLockBodyScroll } from '@/hooks'
import './LoadingScreen.css'

/**
 * The first-load screen: the mark and the wordmark held in the centre, and a
 * school bus driving across the foot of the screen.
 *
 * WHAT IT IS FOR. Not to hide a slow site — the homepage is eagerly bundled and
 * paints quickly. It is the brand's opening move, and the bus is the part a
 * parent remembers. Which is also why it is capped in both directions: it must
 * never be the reason someone waits.
 *
 * THE FOUR SECONDS, AND THE THREE LIMITS AROUND THEM.
 *
 *   HOLD (3640ms) is the floor. The sequence is composed to that length — the
 *   mark at 300ms, the wordmark at 700ms, the bus crossing from 450ms to
 *   3800ms — so cutting it short mid-drive would leave the bus stranded in the
 *   middle of the screen. If the page is ready sooner, the floor still applies.
 *
 *   `load` is the signal. If the page's own images, fonts and stylesheets are
 *   still arriving at 3640ms, the screen stays up until they land, which is
 *   what stops a reader being handed a half-painted homepage.
 *
 *   CEILING (8000ms) is the escape hatch, and the reason this is not simply
 *   "wait for load". `load` waits on every image on the page, and one that
 *   never resolves — a dead CDN, a flaky connection — would otherwise hold a
 *   working site behind an overlay forever. At the ceiling the loader leaves
 *   regardless. A page missing a photograph is recoverable; a page nobody can
 *   reach is not.
 *
 * ACCESSIBILITY. The overlay is a `role="status"` region with a single line of
 * real text for screen readers; every drawing in it is `aria-hidden`. Focus is
 * not trapped and nothing here is focusable — instead `App` marks the site
 * underneath `inert` while this is up, so the first Tab lands on the real page
 * rather than inside content nobody can see. Under `prefers-reduced-motion`
 * the whole sequence is static and the hold drops to ~1s (see the stylesheet).
 *
 * `onDone` fires once, when the exit transition has finished. `App` owns the
 * unmount so that it can drop `inert` from the site in the same commit — the
 * overlay leaving and the page becoming reachable are one event, and splitting
 * them across two renders would leave a frame where either the loader is gone
 * and the site is still inert, or the site is live under a visible overlay.
 * Nothing of this component remains in the DOM afterwards, and it never
 * re-appears on a client-side navigation because it is mounted outside the
 * router.
 */

/** How long the screen is held before it starts leaving. */
const HOLD_MS = 3640
/** The leave transition. HOLD + EXIT is the ~4s total. */
const EXIT_MS = 360
/** Longest the loader may ever stay up, however slow the page is. */
const CEILING_MS = 8000

/** Reduced motion gets the same screen without the wait. */
const REDUCED_HOLD_MS = 700
const REDUCED_EXIT_MS = 200

type Phase = 'holding' | 'leaving'

/**
 * The watermark drawings, and where they sit.
 *
 * All six are in the outer quarters of the screen. The middle third is left
 * empty on purpose: the mark is the focal point and a pencil floating past it
 * would be the thing the eye goes to. Opacities are low enough that at a glance
 * this reads as texture rather than as six objects.
 *
 * The `Svg` wrapper in `objects.tsx` takes a className and nothing else — by
 * design, so a drawing can never be positioned from the inside — hence the
 * wrapping span carries the placement.
 */
const SKY = [
  { Art: Cloud, size: 'h-10 sm:h-14', at: { left: '7%', top: '13%' }, opacity: 0.45 },
  { Art: Star, size: 'h-6 sm:h-8', at: { left: '17%', top: '31%' }, opacity: 0.35 },
  { Art: PaperPlane, size: 'h-8 sm:h-11', at: { right: '9%', top: '17%' }, opacity: 0.4 },
  { Art: Pencil, size: 'h-9 sm:h-12', at: { right: '16%', top: '35%' }, opacity: 0.3 },
  { Art: Book, size: 'h-8 sm:h-10', at: { left: '11%', bottom: '14%' }, opacity: 0.3 },
  { Art: Cloud, size: 'h-8 sm:h-10', at: { right: '6%', bottom: '18%' }, opacity: 0.35 },
] as const

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState<Phase>('holding')

  const hold = reduced ? REDUCED_HOLD_MS : HOLD_MS
  const exit = reduced ? REDUCED_EXIT_MS : EXIT_MS

  /**
   * Held in a ref so a parent that passes an inline arrow — which is a new
   * function on every render — cannot restart the schedule and leave the
   * loader up forever.
   */
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const startedAt = performance.now()
    const timers: number[] = []
    let settled = false

    const leave = () => {
      if (settled) return
      settled = true
      setPhase('leaving')
      timers.push(window.setTimeout(() => onDoneRef.current(), exit))
    }

    /** Serve out whatever is left of the floor, then go. */
    const leaveAfterFloor = () => {
      const remaining = hold - (performance.now() - startedAt)
      if (remaining <= 0) leave()
      else timers.push(window.setTimeout(leave, remaining))
    }

    // `readyState === 'complete'` means `load` has already fired and will not
    // fire again — a real possibility here, because a warm cache can finish the
    // document before React has mounted this component.
    if (document.readyState === 'complete') {
      leaveAfterFloor()
    } else {
      window.addEventListener('load', leaveAfterFloor, { once: true })
      timers.push(window.setTimeout(leave, CEILING_MS))
    }

    return () => {
      window.removeEventListener('load', leaveAfterFloor)
      timers.forEach(window.clearTimeout)
    }
    // `phase` is deliberately absent: this effect owns the schedule and must
    // not restart when it advances the phase itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hold, exit])

  /**
   * Hold the page still underneath, for as long as this is mounted. The hook
   * compensates for the scrollbar it removes, so locking and unlocking costs no
   * layout shift — which matters more here than anywhere else on the site,
   * because the unlock lands on the reader's very first view of the page.
   */
  useLockBodyScroll(true)

  return (
    <div
      className={`lbs-load${phase === 'leaving' ? ' is-leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading LBS KidZ"
    >
      <div className="lbs-load__wash" aria-hidden="true" />

      {/* Drawings from the site's own object set, at the weight of a watermark.
          They cost nothing extra: `objects.tsx` is already in the entry chunk
          because every Section on the homepage scatters them. */}
      <div className="lbs-load__sky" aria-hidden="true">
        {SKY.map(({ Art, size, at, opacity }, i) => (
          <span key={i} style={{ ...at, opacity }}>
            <Art className={size} />
          </span>
        ))}
      </div>

      <div className="lbs-load__stage">
        <div className="lbs-load__float">
          <div className="lbs-load__mark">
            <span className="lbs-load__halo" aria-hidden="true" />
            <LogoMark />
          </div>
        </div>

        <p className="lbs-load__name">
          LBS <em>KidZ</em>
        </p>

        <div className="lbs-load__meta">
          <p className="lbs-load__tagline">Little Karmayogis in the making</p>
          <div className="lbs-load__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="lbs-load__road" aria-hidden="true">
        <div className="lbs-load__road-surface" />
        <div className="lbs-load__road-dashes" />
        <div className="lbs-load__lane">
          <div className="lbs-load__bus">
            <div className="lbs-load__bus-tilt">
              <span className="lbs-load__bus-bob">
                <SchoolBus />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
