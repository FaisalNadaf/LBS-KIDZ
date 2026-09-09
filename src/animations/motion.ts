import type { Transition, Variants } from 'framer-motion'

/**
 * The Framer Motion half of the motion system.
 *
 * WHERE THE LINE BETWEEN THE TWO LIBRARIES IS. GSAP owns anything tied to
 * scroll position or to a timeline — the reveal engine, parallax, the drawn
 * timeline, the horizontal day, heading splits, counters, ambient drift. Motion
 * owns anything tied to *pointer state or presence*: hover, press, focus, and
 * entering or leaving the tree.
 *
 * That split is not arbitrary. ScrollTrigger has no equivalent in Motion, and
 * exit animations on unmounting React subtrees have no clean equivalent in
 * GSAP — a menu that has to animate out before React removes it is exactly what
 * `AnimatePresence` is for, and doing it in GSAP means holding the node in
 * state until a callback fires. Each library is used for the thing the other
 * one is bad at, and never for the same job twice.
 *
 * WHY `m` AND NOT `motion`. Every component here imports `m`, which carries no
 * animation features of its own; `MotionRoot` loads the DOM feature bundle
 * asynchronously alongside it. The full `motion` export pulls that bundle into
 * the entry chunk instead, which is the same mistake `animations/gsap.ts` is
 * built to avoid — the site's first paint should not be waiting on a hover
 * effect. Anything using `motion.*` directly silently undoes it.
 */

/**
 * The site's two easing curves, as arrays.
 *
 * The same two the CSS uses (`--ease-out-soft`, `--ease-in-out-soft`), written
 * out because Motion cannot read a custom property. If either changes in
 * `styles/index.css` it has to change here too, and the whole point is that
 * a Motion hover and a CSS transition on the same button decelerate identically.
 */
export const EASE = {
  /** Entrances, hovers, anything arriving. */
  out: [0.22, 1, 0.36, 1],
  /** Anything that leaves and comes back — panels, menus. */
  inOut: [0.65, 0, 0.35, 1],
} as const

/**
 * Springs, for anything that follows the pointer.
 *
 * A tween cannot do this convincingly: the cursor changes direction mid-flight
 * and a duration-based curve has to restart, which reads as a stutter. These
 * are deliberately over-damped — `bounce` is effectively nil — because a card
 * that wobbles after the pointer leaves reads as a toy.
 */
export const SPRING = {
  /** Pointer tracking: tilt, magnetism. Fast, no overshoot. */
  pointer: { type: 'spring', stiffness: 260, damping: 28, mass: 0.6 },
  /** Press and release. Snappier still, because it answers a click. */
  press: { type: 'spring', stiffness: 420, damping: 32, mass: 0.5 },
} satisfies Record<string, Transition>

/** Timings, so a dropdown and a mobile panel are never a beat apart. */
export const DURATION = {
  micro: 0.18,
  hover: 0.28,
  panel: 0.34,
} as const

export const transitions = {
  hover: { duration: DURATION.hover, ease: EASE.out },
  panel: { duration: DURATION.panel, ease: EASE.out },
  micro: { duration: DURATION.micro, ease: EASE.out },
} satisfies Record<string, Transition>

/* ==========================================================================
   Presence variants
   ========================================================================== */

/**
 * A panel that opens from the edge it is anchored to — a nav dropdown, the
 * mobile sheet. It leaves faster than it arrives: a menu closing is the reader
 * having already decided, and matching the opening duration on the way out
 * makes the interface feel like it is arguing.
 */
export const panelVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.985 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...transitions.panel, staggerChildren: 0.035, delayChildren: 0.04 },
  },
  leaving: { opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.16, ease: EASE.out } },
}

/** One row inside an opening panel. */
export const panelItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  shown: { opacity: 1, x: 0, transition: transitions.micro },
  leaving: { opacity: 0, transition: { duration: 0.1 } },
}

/**
 * The navbar's own arrival.
 *
 * Runs once, on the first paint of a session, after the loading screen has
 * handed over. Small on purpose — the bar is chrome, and chrome that makes an
 * entrance competes with the hero it sits on top of.
 */
export const navbarVariants: Variants = {
  hidden: { y: -18, opacity: 0 },
  shown: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE.out,
      delay: 0.1,
      // The bar arrives first and its three regions follow, so the entrance
      // reads as a bar being set rather than as one block dropping in.
      staggerChildren: 0.08,
      delayChildren: 0.22,
    },
  },
}

/** Logo, navigation and CTA, in reading order, inside the bar's own entrance. */
export const navRegionVariants: Variants = {
  hidden: { y: -8, opacity: 0 },
  shown: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE.out } },
}

/* ==========================================================================
   Interaction states
   ========================================================================== */

/**
 * The shared hover and press language for anything pressable.
 *
 * Every control on the site moves by the same amounts, so a button, a card and
 * a chip feel like one system rather than three. The press state is what most
 * sites miss: without it a click has no acknowledgement until the page changes,
 * and on a slow connection that is a second of wondering whether it registered.
 */
export const pressable = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2 },
  press: { scale: 0.985, y: 0 },
} as const

/** The same, for a card: more lift, less scale, because it is a bigger surface. */
export const liftable = {
  rest: { y: 0 },
  hover: { y: -6 },
  press: { y: -2 },
} as const
