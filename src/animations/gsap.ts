import { useEffect, useRef, useState, type RefObject } from 'react'
import type { gsap as gsapNamespace } from 'gsap'
import { usePrefersReducedMotion, useMediaQuery } from '@/hooks'

/**
 * GSAP owns every animation on this site that is tied to scroll position or to
 * a timeline: the reveal system, scrub-linked parallax and image scale, the
 * horizontal preschool-day scene, the drawn legacy timeline, and the ambient
 * floats on composed hero art. CSS keeps only the two-keyframe drifts on
 * site-wide chrome, where a keyframe costs nothing and a library would.
 *
 * GSAP is imported dynamically rather than at module scope, so it never blocks
 * first paint; the reveal system loads it immediately after mount and every
 * other hook reuses the same in-flight promise. Under reduced motion, or on a
 * screen too small for a given scene, it is not fetched at all.
 *
 * HARD RULE: nothing here may restructure the DOM.
 * ScrollTrigger's `pin: true` wraps the pinned element in a `.pin-spacer` div,
 * which changes the parent of a React-rendered node. React still holds the old
 * parent, so unmounting that subtree throws
 *   "Failed to execute 'removeChild' on 'Node'".
 * Pinning is therefore done with CSS `position: sticky` (see
 * `useHorizontalTrack`), and GSAP only ever animates transforms on nodes that
 * React created and still owns.
 */

type Gsap = typeof gsapNamespace
type GsapContext = ReturnType<Gsap['context']>

let enginePromise: Promise<Gsap> | null = null

async function loadGsap(): Promise<Gsap> {
  if (!enginePromise) {
    enginePromise = (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      gsap.registerPlugin(ScrollTrigger)
      return gsap
    })()
  }
  return enginePromise
}

/**
 * Runs a GSAP setup function once the library has loaded, and cleans it up
 * correctly even if the component unmounts while the import is still in flight.
 */
function useGsapEffect(
  enabled: boolean,
  setup: (gsap: Gsap) => GsapContext | undefined,
  deps: unknown[],
) {
  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    let context: GsapContext | undefined

    void loadGsap().then((gsap) => {
      // Cleaned up before the import resolved: build nothing, otherwise the
      // animation would outlive the component that asked for it.
      if (cancelled) return
      context = setup(gsap)
    })

    return () => {
      cancelled = true
      context?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/* ==========================================================================
   The reveal system
   ========================================================================== */

/* ==========================================================================
   The reveal vocabulary
   ========================================================================== */

/**
 * How hard an element enters, by how much it matters.
 *
 * The site had one duration and one stagger for everything, which is what made
 * a page of eighty reveals read as one effect applied eighty times rather than
 * as a composition. Three tiers now:
 *
 *   lead   a section's heading block, a hero photograph, a headline stat --
 *          the thing the eye should reach first. Travels furthest, takes
 *          longest, and staggers widest so it is unmistakably deliberate.
 *   base   the default. Cards, paragraphs, list rows.
 *   quiet  captions, footnotes, chrome. Barely moves; it resolves.
 *
 * Set with `data-reveal-tier`. Everything unmarked is `base`, so this is
 * additive: no existing call site changes behaviour by being left alone.
 */
const TIER = {
  lead: { duration: 0.95, stagger: 0.1, distance: 46, scale: 0.955 },
  base: { duration: 0.72, stagger: 0.065, distance: 26, scale: 0.97 },
  quiet: { duration: 0.55, stagger: 0.045, distance: 14, scale: 0.985 },
} as const

type Tier = keyof typeof TIER

function tierOf(el: HTMLElement): Tier {
  const t = el.dataset.revealTier
  return t === 'lead' || t === 'quiet' ? t : 'base'
}

/**
 * Where an element comes from when nothing says otherwise.
 *
 * `auto` is the default, and it reads the element's own position on screen:
 * something sitting in the left third of the viewport arrives from the left,
 * something in the right third from the right, and anything spanning or near
 * the middle rises and scales instead. A two-column band therefore opens
 * outward from its centre, a three-card row deals its cards left, centre and
 * right, and a full-width heading lifts -- without a single call site having
 * to say so.
 *
 * That inference is the whole reason this exists. Of roughly 190 reveals on
 * this site, five had ever been given a direction by hand; the rest all rose
 * 22px, which is why a page felt like one animation on repeat. Position is
 * information the layout already holds, so the motion can simply read it.
 *
 * Measured once, at setup, before anything has moved -- never during the
 * animation, where the transform being applied would feed back into the
 * reading.
 */
function autoDirection(el: HTMLElement): 'left' | 'right' | 'centre' {
  const r = el.getBoundingClientRect()
  const vw = window.innerWidth || 1
  // A wide element has no side to belong to, whatever its centre says: a
  // full-bleed heading that happens to start at 45% is still a heading.
  if (r.width > vw * 0.62) return 'centre'
  const centre = (r.left + r.right) / 2 / vw
  if (centre < 0.4) return 'left'
  if (centre > 0.6) return 'right'
  return 'centre'
}

/**
 * The start state for one element.
 *
 * MOBILE IS NOT DESKTOP SCALED DOWN. Below 768px every column has stacked, so
 * "left content" and "right content" no longer exist -- a sideways entrance
 * there is movement with no spatial meaning behind it, and on a narrow screen
 * it is also the one thing that can drag the page sideways. So sideways
 * entrances collapse to a rise, and every distance is damped: a 46px travel
 * that reads as generous on a 1440 desktop reads as a lurch on a 375 phone.
 */
function revealFrom(el: HTMLElement): Record<string, unknown> {
  const tier = TIER[tierOf(el)]
  const narrow = window.innerWidth < 768
  const damp = narrow ? 0.6 : 1
  const d = Number(el.dataset.revealDistance ?? tier.distance) * damp

  let kind = el.dataset.reveal || 'auto'
  if (kind === 'auto') {
    const side = narrow ? 'centre' : autoDirection(el)
    kind = side === 'centre' ? 'rise' : side
  }

  switch (kind) {
    case 'left':
      return { opacity: 0, x: -d }
    case 'right':
      return { opacity: 0, x: d }
    case 'scale':
      return { opacity: 0, scale: tier.scale }
    case 'none':
      return { opacity: 0 }
    // A photograph uncovering itself rather than fading on, paired with a
    // slight over-scale so the frame and the picture inside it do not arrive
    // as one flat plane.
    case 'clip':
      return { opacity: 1, clipPath: 'inset(0% 0% 100% 0%)', scale: 1.04 }
    // Display headings only. Blur is the most expensive thing in this file --
    // a full-surface filter, not a composited transform -- so it is
    // deliberately unreachable from `auto` and never lands on a card grid.
    case 'blur':
      return { opacity: 0, filter: 'blur(9px)', y: d * 0.5 }
    // `rise`, and anything unrecognised. The centre case: up, plus a touch of
    // scale, which is what separates "arrived" from "faded in".
    default:
      return { opacity: 0, y: d, scale: tier.scale }
  }
}

/**
 * Reveals every `[data-reveal]` element inside a scope as it enters view.
 *
 * One ScrollTrigger.batch for the whole page rather than one trigger per
 * element: a long page has ~80 revealable nodes, and 80 independent triggers
 * is measurably worse on scroll than a single batched observer that hands GSAP
 * groups of up to six at a time.
 *
 * Three properties are honoured, read off the element itself so a caller can
 * tune a reveal without a new hook:
 *   data-reveal="up" | "left" | "right" | "scale" | "none"
 *   data-reveal-delay="0.12"
 *   data-reveal-distance="28"
 *
 * FAILSAFE. The hidden state is CSS (`[data-reveal] { opacity: 0 }`), which is
 * what stops a flash of fully-painted content before GSAP arrives — but it also
 * means a failed import would leave the page blank. So a timer starts on mount:
 * if GSAP has not taken over within 1.2s, `.reveal-ready` goes on <html> and
 * everything becomes visible. Content never depends on an animation working.
 */
export function useScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  routeKey: string,
) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const root = document.documentElement

    if (reduced) {
      root.classList.add('reveal-ready')
      return
    }

    // A new route renders new hidden nodes, so the "everything is visible"
    // escape hatch has to come off before they are animated.
    root.classList.remove('reveal-ready')

    let cancelled = false
    let context: GsapContext | undefined
    const failsafe = window.setTimeout(() => root.classList.add('reveal-ready'), 1200)

    void loadGsap().then((gsap) => {
      if (cancelled) return
      window.clearTimeout(failsafe)
      const scope = scopeRef.current
      if (!scope) {
        root.classList.add('reveal-ready')
        return
      }

      context = gsap.context(() => {
        const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope)
        if (!targets.length) return

        const startState = targets.map((el) => revealFrom(el))
        targets.forEach((el, i) => gsap.set(el, startState[i]))

        void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          if (cancelled) return
          ScrollTrigger.batch(targets, {
            start: 'top 90%',
            once: true,
            batchMax: 6,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: (_i: number, el: Element) => TIER[tierOf(el as HTMLElement)].duration,
                ease: 'power3.out',
                stagger: (_i: number, el: Element) => TIER[tierOf(el as HTMLElement)].stagger,
                delay: (_i: number, el: Element) =>
                  Number((el as HTMLElement).dataset.revealDelay ?? 0),
                overwrite: true,
                // Cleared so the compositor is not asked to hold a layer for
                // every revealed node for the rest of the session. `filter` and
                // `clipPath` go with it: a lingering `blur(0px)` or an
                // `inset(0%)` still forces the element onto its own layer, and
                // that is memory held on every card until the page unloads.
                onComplete: () =>
                  batch.forEach((node) => {
                    const el = node as HTMLElement
                    el.style.willChange = ''
                    el.style.filter = ''
                    el.style.clipPath = ''
                  }),
              })
            },
          })
          ScrollTrigger.refresh()
        })
      }, scope)
    })

    return () => {
      cancelled = true
      window.clearTimeout(failsafe)
      context?.revert()
      // Anything still hidden when the route changes must not stay hidden.
      root.classList.add('reveal-ready')
    }
  }, [scopeRef, routeKey, reduced])
}

/**
 * The homepage hero's opening sequence.
 *
 * One timeline rather than a dozen independent entrances, so the fold settles
 * once and quickly instead of twitching for two seconds. Three roles are
 * animated, in order:
 *
 *   [data-hero-line]  headline lines, rising out of their own overflow mask
 *   [data-hero-item]  everything else in the text column, in DOM order
 *   [data-hero-art]   the photographs and their colour fields
 *
 * The whole thing is under a second. Nothing a parent is trying to read waits
 * on an animation to finish, and the elements are visible from the first frame
 * if reduced motion is on — the hook simply does not run.
 */
export function useHeroIntro(scopeRef: RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion()

  useGsapEffect(
    !reduced,
    (gsap) => {
      const scope = scopeRef.current
      if (!scope) return

      return gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from('[data-hero-line]', {
          yPercent: 112,
          opacity: 0,
          duration: 0.8,
          stagger: 0.09,
        })
          .from(
            '[data-hero-item]',
            { y: 16, opacity: 0, duration: 0.55, stagger: 0.08 },
            '-=0.5',
          )
          .from(
            '[data-hero-art]',
            { y: 26, scale: 0.94, opacity: 0, duration: 0.85, stagger: 0.1 },
            '-=0.75',
          )
      }, scope)
    },
    [scopeRef, reduced],
  )
}

/**
 * Fades the main region briefly when the route changes.
 *
 * From 0.5 rather than from 0. The new page is already painted and already
 * correct by the time this runs, so starting from invisible would add a second
 * loading state to a navigation that has already finished. Half opacity for a
 * third of a second is enough to read as a transition rather than a cut.
 *
 * Skipped on first paint: an arriving visitor should not watch the page fade in
 * on top of everything else that is already animating.
 */
export function usePageTransition(
  ref: RefObject<HTMLElement | null>,
  routeKey: string,
) {
  const reduced = usePrefersReducedMotion()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (reduced) return

    const el = ref.current
    if (!el) return

    let cancelled = false
    void loadGsap().then((gsap) => {
      if (cancelled || !ref.current) return
      gsap.fromTo(
        ref.current,
        { opacity: 0.5 },
        { opacity: 1, duration: 0.32, ease: 'power2.out', overwrite: 'auto' },
      )
    })
    return () => {
      cancelled = true
      // Never leave the page stuck part-way through a fade.
      if (ref.current) ref.current.style.opacity = ''
    }
  }, [ref, routeKey, reduced])
}

/* ==========================================================================
   Ambient motion
   ========================================================================== */

/**
 * A slow, looping float. Used on composed decorative art where a two-keyframe
 * CSS drift reads as mechanical: GSAP can give each element its own duration
 * and phase, so a cluster of floating objects never moves in lockstep.
 */
/**
 * The shapes a drawn object's idle motion can take.
 *
 * One motion for every object on the site is what makes a decorative layer read
 * as a layer rather than as a set of things that happen to be floating: four
 * drawings bobbing on the same axis at the same amplitude look like one
 * animation applied four times, however carefully their phases are offset.
 * These are deliberately close in weight to each other, so the variety shows up
 * as texture rather than as some objects being livelier than others.
 *
 *   float   the original: straight up and down, with an optional lean.
 *   sway    side to side, barely any vertical.
 *   drift   a slow diagonal.
 *   rotate  rotation-led, with just enough rise to stop it reading as a hinge.
 *   pulse   a small swell in scale on the way up.
 *   orbit   vertical and horizontal on *different* periods, so the path never
 *           closes and the object wanders. The one pattern that needs two
 *           tweens, and the reason it is worth them.
 */
export type FloatPattern = 'float' | 'sway' | 'drift' | 'rotate' | 'pulse' | 'orbit'

/** Where an object comes in from when its band first reaches the viewport. */
export type FloatEnter = 'left' | 'right' | 'up' | 'down' | 'scale'

const ENTER_OFFSET: Record<FloatEnter, { x: number; y: number }> = {
  left: { x: -34, y: 0 },
  right: { x: 34, y: 0 },
  up: { x: 0, y: 26 },
  down: { x: 0, y: -26 },
  scale: { x: 0, y: 0 },
}

export function useFloat<T extends Element>(
  ref: RefObject<T | null>,
  options: {
    y?: number
    x?: number
    rotate?: number
    duration?: number
    delay?: number
    pattern?: FloatPattern
    enter?: FloatEnter | null
  } = {},
) {
  const reduced = usePrefersReducedMotion()
  const {
    y = 10,
    x = 0,
    rotate = 0,
    duration = 4.5,
    delay = 0,
    pattern = 'float',
    enter = null,
  } = options

  useGsapEffect(
    !reduced,
    (gsap) => {
      const el = ref.current
      if (!el) return

      return gsap.context(() => {
        const base = { duration, ease: 'sine.inOut', repeat: -1, yoyo: true } as const
        const side = x || y * 0.9

        const loop = () => {
          switch (pattern) {
            case 'sway':
              gsap.to(el, { ...base, x: side, rotate: rotate * 0.5 })
              break
            case 'drift':
              gsap.to(el, { ...base, x: side, y: -y, rotate })
              break
            case 'rotate':
              gsap.to(el, { ...base, rotate: rotate || 7, y: -y * 0.45 })
              break
            case 'pulse':
              gsap.to(el, { ...base, y: -y * 0.65, scale: 1.07 })
              break
            case 'orbit':
              // Two periods that do not divide into each other, so the object
              // traces an open path instead of retracing one line.
              gsap.to(el, { ...base, y: -y })
              gsap.to(el, { ...base, x: side, duration: duration * 1.45 })
              break
            default:
              gsap.to(el, { ...base, y: -y, rotate })
          }
        }

        if (!enter) {
          gsap.to(el, { ...base, delay, y: -y, rotate })
          return
        }

        // Arrive, then idle. The loop starts on completion rather than running
        // alongside, because both write `y` and a running yoyo would fight the
        // entrance for it.
        const off = ENTER_OFFSET[enter]
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.72, x: off.x, y: off.y, rotate: rotate * -1.5 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotate: 0,
            duration: 0.85,
            delay,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: el, start: 'top 98%', once: true },
            onComplete: loop,
          },
        )
      })
    },
    [ref, y, x, rotate, duration, delay, pattern, enter, reduced],
  )
}

/**
 * Drives a 0-to-1 scaleX on an element from overall document scroll.
 *
 * A ScrollTrigger scrub rather than a scroll listener: the value is read on
 * GSAP's own ticker, and only a transform is written, so the reading-progress
 * bar costs one composited property per frame.
 */
export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T | null>) {
  const reduced = usePrefersReducedMotion()

  useGsapEffect(
    !reduced,
    (gsap) => {
      const el = ref.current
      if (!el) return
      return gsap.context(() => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.25,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    },
    [ref, reduced],
  )
}

/**
 * The horizontal storytelling scene used for the preschool day.
 *
 * The section is made tall enough to scroll through, an inner wrapper holds
 * itself in place with `position: sticky`, and GSAP scrubs a transform on the
 * track inside it. The browser does the pinning, so the DOM stays exactly as
 * React rendered it.
 *
 * Returns the travel distance so the caller can size its own spacer, and
 * whether the scene is active at all. Below `minWidth`, or under reduced
 * motion, it returns `enabled: false` and the caller renders a plain grid with
 * the same DOM. GSAP is never fetched on that path.
 */
export function useHorizontalTrack(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  minWidth = 1024,
  /**
   * A bar to fill as the track travels, scaled on the same scrub.
   *
   * A pinned scene takes the page's scroll away and gives no sign of how much
   * is left, which is the standard complaint about them: the reader cannot tell
   * whether two more cards are coming or ten, and cannot tell the pin from a
   * page that has stopped responding. One rule that fills answers both.
   */
  progressRef?: RefObject<HTMLElement | null>,
) {
  const reduced = usePrefersReducedMotion()
  const wideEnough = useMediaQuery(`(min-width: ${minWidth}px)`)
  const enabled = wideEnough && !reduced
  const [distance, setDistance] = useState(0)

  // Measure how far the track has to travel, and keep it correct on resize.
  useEffect(() => {
    if (!enabled) {
      setDistance(0)
      return
    }
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const overflow = track.scrollWidth - window.innerWidth
      setDistance((current) => {
        const next = Math.max(0, Math.round(overflow + 96))
        // Avoid a state write, and so a re-render, on every observer tick.
        return Math.abs(next - current) > 1 ? next : current
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [enabled, trackRef])

  useGsapEffect(
    enabled && distance > 0,
    (gsap) => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      return gsap.context(() => {
        // One timeline, so the rail cannot drift out of step with the track.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })

        tl.fromTo(track, { x: 0 }, { x: -distance, ease: 'none', duration: 1 }, 0)

        const progress = progressRef?.current
        if (progress) {
          gsap.set(progress, { transformOrigin: 'left center' })
          tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)
        }
      }, section)
    },
    [sectionRef, trackRef, progressRef, enabled, distance],
  )

  return { enabled, distance }
}

/**
 * Draws an SVG path as the reader scrolls past it. Used for the legacy
 * timeline spine.
 *
 * `start` and `end` are exposed because a spine built from several segments
 * needs them to meet. With the defaults a segment finishes drawing when its
 * *bottom* reaches 55% of the viewport, while the next one starts as soon as
 * its *top* reaches 80% — and since those are the same point on the page, the
 * next segment begins before the previous has finished. The line then appears
 * in two places at once with a gap between them. Passing the same offset for
 * both, as the legacy timeline does, makes each segment complete exactly where
 * the following one begins.
 *
 * `head` takes a second path with the same `d`, and turns it into a bead that
 * rides the point the line is being drawn to. A line that merely lengthens
 * reads as a bar chart filling; a line with something at its tip reads as being
 * drawn, and it gives the eye something to follow between one milestone and the
 * next. It is done with the dash pattern rather than MotionPath so it costs no
 * extra plugin: a dash of almost no length with a round cap is a dot, and
 * moving the pattern's origin moves the dot along the path. The bead fades in
 * and out at the two ends of the segment, so it never parks on top of the join
 * where the next segment takes over.
 */
export function useDrawPath(
  pathRef: RefObject<SVGPathElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  options: {
    start?: string
    end?: string
    head?: RefObject<SVGPathElement | null>
  } = {},
) {
  const { start = 'top 80%', end = 'bottom 55%', head } = options
  const reduced = usePrefersReducedMotion()

  // Under reduced motion, show the finished drawing rather than an unfinished
  // one. No library needed for that. The bead is pure motion, so it goes.
  useEffect(() => {
    const path = pathRef.current
    if (!path || !reduced) return
    path.style.strokeDasharray = 'none'
    path.style.strokeDashoffset = '0'
    const bead = head?.current
    if (bead) bead.style.opacity = '0'
  }, [pathRef, head, reduced])

  useGsapEffect(
    !reduced,
    (gsap) => {
      const path = pathRef.current
      if (!path) return
      const length = path.getTotalLength()
      const bead = head?.current

      return gsap.context(() => {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current ?? path,
            start,
            end,
            scrub: 0.7,
          },
        })

        tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)

        if (bead) {
          // A dash pattern of "nothing, then the whole path" leaves one dot,
          // and the dash offset is where along the path that dot sits.
          gsap.set(bead, { strokeDasharray: `0.01 ${length}`, strokeDashoffset: 0, opacity: 0 })
          tl.to(bead, { strokeDashoffset: -length, ease: 'none', duration: 1 }, 0)
            .to(bead, { opacity: 1, ease: 'none', duration: 0.12 }, 0)
            .to(bead, { opacity: 0, ease: 'none', duration: 0.12 }, 0.88)
        }
      })
    },
    [pathRef, triggerRef, head, start, end, reduced],
  )
}

/**
 * Slow scale on a photograph as it crosses the viewport.
 *
 * The image is rendered slightly larger than its frame and eases back to its
 * natural size, so the movement reads as the page breathing rather than as an
 * element growing. Only `scale` is touched, and the frame clips, so nothing
 * around it reflows.
 */
export function useScaleOnScroll<T extends Element>(
  ref: RefObject<T | null>,
  options: { from?: number; to?: number; trigger?: RefObject<Element | null> } = {},
) {
  const reduced = usePrefersReducedMotion()
  const { from = 1.12, to = 1, trigger } = options

  useGsapEffect(
    !reduced,
    (gsap) => {
      const el = ref.current
      if (!el) return

      return gsap.context(() => {
        gsap.fromTo(
          el,
          { scale: from },
          {
            scale: to,
            ease: 'none',
            scrollTrigger: {
              trigger: trigger?.current ?? el,
              start: 'top bottom',
              end: 'center center',
              scrub: 0.7,
            },
          },
        )
      })
    },
    [ref, from, to, reduced, trigger],
  )
}

/**
 * Drifts a decorative element as the page scrolls past it.
 *
 * Distinct from `useParallax` in that the travel is expressed as a fraction of
 * the trigger's own height rather than a fixed pixel figure, which keeps a
 * floating illustration in sensible proportion to the section it decorates on
 * any screen. Decorative only: nothing that carries meaning moves.
 */
export function useDrift<T extends Element>(
  ref: RefObject<T | null>,
  options: { y?: number; x?: number; rotate?: number; trigger?: RefObject<Element | null> } = {},
) {
  const reduced = usePrefersReducedMotion()
  const isCoarse = useMediaQuery('(pointer: coarse)')
  const { y = 40, x = 0, rotate = 0, trigger } = options

  useGsapEffect(
    !reduced,
    (gsap) => {
      const el = ref.current
      if (!el) return
      const damp = isCoarse ? 0.5 : 1

      return gsap.context(() => {
        gsap.fromTo(
          el,
          { y: (-y * damp) / 2, x: (-x * damp) / 2, rotate: (-rotate * damp) / 2 },
          {
            y: (y * damp) / 2,
            x: (x * damp) / 2,
            rotate: (rotate * damp) / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: trigger?.current ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        )
      })
    },
    [ref, y, x, rotate, reduced, isCoarse, trigger],
  )
}

/* ==========================================================================
   Word-level heading reveal
   ========================================================================== */

/**
 * Splits a heading into words and flips them up into place.
 *
 * WHY WORDS AND NOT CHARACTERS. A display serif with ligatures and optical
 * sizing does not survive being cut into glyphs -- the kerning goes, and on a
 * three-line H1 it is 60-odd extra nodes to animate instead of a dozen. Words
 * read as deliberate; characters read as a typewriter effect, which is the
 * cheap version of this.
 *
 * WHY NOT A MASK. The obvious premium version clips each word behind
 * `overflow: hidden`, and for a *line* that works -- it is what `TextReveal`
 * does, on block elements where there is no baseline to disturb. Per word it
 * does not: an inline-block with clipped overflow takes its baseline from its
 * bottom margin edge, so every word in the heading shifts down against the
 * text around it, and descenders get sliced unless each word carries
 * compensating padding. A rotateX off a bottom origin gives the same sense of
 * the word turning into view with none of that.
 *
 * WHAT IT PROTECTS.
 *
 *   Nested markup. Headings here contain coloured spans and line breaks, so
 *   this walks text nodes and rebuilds them in place rather than touching
 *   innerHTML -- an innerHTML split would flatten the emphasis out of every
 *   heading on the site.
 *
 *   Screen readers. The words stay in document order with their whitespace
 *   intact, so the accessible name is unchanged. `aria-hidden` is never set:
 *   this is real text, just wrapped.
 *
 *   Layout. It waits for `document.fonts.ready` before measuring anything.
 *   Splitting during the webfont swap wraps the heading to the fallback's
 *   metrics and then re-wraps, which is a visible jump on the largest text on
 *   the page.
 *
 * Restores the original DOM on cleanup, so a route change leaves no wrappers
 * behind for the next split to nest inside.
 */
export function useSplitReveal(
  ref: RefObject<HTMLElement | null>,
  options: { delay?: number; stagger?: number } = {},
) {
  const reduced = usePrefersReducedMotion()
  const { delay = 0, stagger = 0.035 } = options

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    let cancelled = false
    let restore: (() => void) | undefined
    let context: GsapContext | undefined

    const run = async () => {
      // Fonts first: a split measured against the fallback face re-wraps when
      // the real one lands, and on an H1 that is the largest reflow on screen.
      await document.fonts?.ready
      const [gsap] = await Promise.all([loadGsap()])
      if (cancelled || !ref.current) return

      const host = ref.current
      const original = host.innerHTML
      restore = () => {
        host.innerHTML = original
        host.style.perspective = ''
      }

      const words = wrapWords(host)
      if (!words.length) return
      host.style.perspective = '640px'

      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return

      context = gsap.context(() => {
        gsap.set(words, { opacity: 0, yPercent: 55, rotateX: -48, transformOrigin: '50% 100%' })
        gsap.to(words, {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger,
          delay,
          scrollTrigger: { trigger: host, start: 'top 88%', once: true },
          // The 3D context is dropped the moment it stops being needed: a
          // heading left with `perspective` and a dozen transformed children
          // holds a compositor layer per word for the life of the page.
          onComplete: () => {
            host.style.perspective = ''
            words.forEach((w) => {
              w.style.transform = ''
              w.style.willChange = ''
            })
          },
        })
        ScrollTrigger.refresh()
      }, host)
    }

    void run()

    return () => {
      cancelled = true
      context?.revert()
      restore?.()
    }
  }, [ref, delay, stagger, reduced])
}

/**
 * Wraps every word of every text node under `root` in an inline-block span.
 *
 * Whitespace is preserved as its own text node rather than folded into the
 * words, which is what keeps both the line breaking and the accessible name
 * identical to the unsplit heading.
 */
function wrapWords(root: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const texts: Text[] = []
  for (let n = walker.nextNode(); n; n = walker.nextNode()) texts.push(n as Text)

  for (const node of texts) {
    const value = node.nodeValue ?? ''
    if (!value.trim()) continue
    const frag = document.createDocumentFragment()
    for (const part of value.split(/(\s+)/)) {
      if (!part) continue
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part))
        continue
      }
      const span = document.createElement('span')
      span.textContent = part
      span.style.display = 'inline-block'
      span.style.willChange = 'transform'
      frag.appendChild(span)
      out.push(span)
    }
    node.parentNode?.replaceChild(frag, node)
  }
  return out
}

/* ==========================================================================
   Counters
   ========================================================================== */

/**
 * Counts a figure up when it reaches the reader.
 *
 * Writes `textContent` on a tick rather than going through React state, which
 * would re-render the whole card sixty times a second for a number that is
 * decoration.
 *
 * The element is given its final value in the markup and only then animated
 * from zero, so the figure is correct before this runs, correct if GSAP never
 * loads, correct under reduced motion, and correct in the prerendered HTML a
 * crawler sees. A counter that starts at zero in the DOM is a counter that
 * reads "0" to anyone it fails for.
 */
export function useCounter(
  ref: RefObject<HTMLElement | null>,
  value: number,
  options: { duration?: number; decimals?: number } = {},
) {
  const reduced = usePrefersReducedMotion()
  const { duration = 1.6, decimals = 0 } = options

  useGsapEffect(
    !reduced,
    (gsap) => {
      const el = ref.current
      if (!el) return
      const format = (n: number) => n.toFixed(decimals)

      return gsap.context(() => {
        const counter = { n: 0 }
        gsap.to(counter, {
          n: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = format(counter.n)
          },
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })
    },
    [ref, value, duration, decimals, reduced],
  )
}

/* ==========================================================================
   Ambient background motion
   ========================================================================== */

/**
 * A slow, endless drift for a decorative background shape.
 *
 * Distinct from `useFloat`, which is a two-value bob on a small object.  This
 * is a long, wandering path on something large and soft -- a blob behind a
 * section, a gradient wash -- where a symmetrical yoyo would be legible as a
 * loop. Three unequal legs at unequal durations means the shape does not
 * visibly repeat, which is the whole difference between a background that is
 * alive and one that is animating.
 *
 * Deliberately slow. Anything fast enough to notice in the corner of the eye
 * while reading is competing with the text.
 */
export function useAmbientDrift<T extends Element>(
  ref: RefObject<T | null>,
  options: { range?: number; duration?: number; delay?: number } = {},
) {
  const reduced = usePrefersReducedMotion()
  const isCoarse = useMediaQuery('(pointer: coarse)')
  const { range = 26, duration = 18, delay = 0 } = options

  useGsapEffect(
    // Not on touch hardware. These are large, blurred, translucent surfaces,
    // and compositing one continuously is a cost a phone pays in battery for
    // something nobody is looking at.
    !reduced && !isCoarse,
    (gsap) => {
      const el = ref.current
      if (!el) return
      const r = range

      return gsap.context(() => {
        gsap
          .timeline({ repeat: -1, delay, defaults: { ease: 'sine.inOut' } })
          .to(el, { x: r, y: -r * 0.6, scale: 1.04, duration: duration * 0.38 })
          .to(el, { x: -r * 0.5, y: r * 0.5, scale: 0.98, duration: duration * 0.34 })
          .to(el, { x: 0, y: 0, scale: 1, duration: duration * 0.28 })
      })
    },
    [ref, range, duration, delay, reduced, isCoarse],
  )
}
