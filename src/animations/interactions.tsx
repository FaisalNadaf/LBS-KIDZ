import { useRef, type ReactNode, type ElementType } from 'react'
import { LazyMotion, domAnimation, m, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/cn'
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks'
import { SPRING, transitions } from './motion'

/**
 * Pointer-driven interactions.
 *
 * Everything here answers the mouse: tilt, magnetism, hover lift, and the two
 * small "alive" indicators. Nothing here is tied to scroll — that is GSAP's
 * half of the system, in `animations/gsap.ts`.
 *
 * THREE RULES EVERY COMPONENT IN THIS FILE FOLLOWS.
 *
 *   Nothing pointer-driven runs on touch. `(pointer: coarse)` gates all of it.
 *   A tilt that reacts to a tap is a card that jumps under the thumb, and a
 *   magnetic button on a phone is a button that moves away from the finger
 *   pressing it. On touch these components render their children and stop.
 *
 *   Nothing here changes layout. Every effect is `transform` or `box-shadow` on
 *   an element that already has its size, so a hover cannot reflow a grid.
 *
 *   Reduced motion is a real branch, not a smaller number. The hooks return
 *   early and no listener is attached at all, so a reader who has asked for
 *   stillness is not paying for a spring that resolves to zero.
 */

/**
 * Installs Motion's DOM feature bundle once, for the whole app.
 *
 * `m` components carry no animation features of their own; this is what teaches
 * them to animate, and doing it once here is what keeps `domAnimation` from
 * being pulled in separately by every file that animates something.
 *
 * WHY NOT THE ASYNC `features` FORM. `LazyMotion` accepts a function returning
 * a promise, and that genuinely defers the feature bundle — but only while
 * nothing else forces Motion into the entry chunk. `Button` and `Card` import
 * `m` at module scope, which does exactly that, so the deferral bought nothing
 * and cost an extra module. The split that does work is in `vite.config.ts`:
 * all of Motion becomes one 29KB-gzipped chunk that loads in parallel with the
 * app rather than inside it.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

/* ==========================================================================
   Tilt
   ========================================================================== */

/**
 * A card that leans toward the pointer.
 *
 * SUBTLETY IS THE ENTIRE DESIGN. The rotation caps at 5 degrees. Most
 * implementations of this use 15 or 20, which looks impressive on one isolated
 * card and unusable on a grid of nine — text stops being flat to the screen,
 * edges shear against their neighbours, and the page reads as unstable. Five
 * degrees is enough that the eye registers depth and not enough to notice the
 * mechanism.
 *
 * The springs are what make it feel like a physical object rather than a value
 * being assigned: the card keeps travelling for a beat after the pointer stops,
 * and settles rather than snapping back on exit.
 *
 * `perspective` sits on the wrapper and `preserve-3d` on the moving child, so
 * anything the caller lifts with `translateZ` — an icon, a badge — genuinely
 * separates from the card face instead of scaling.
 */
export function Tilt({
  children,
  className,
  strength = 5,
  scale = 1.015,
}: {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. Above about 8 this stops looking good. */
  strength?: number
  scale?: number
}) {
  const reduced = usePrefersReducedMotion()
  const coarse = useMediaQuery('(pointer: coarse)')
  const ref = useRef<HTMLDivElement>(null)

  // -0.5..0.5 across the card, so the maths below is symmetrical about centre.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, SPRING.pointer)
  const sy = useSpring(py, SPRING.pointer)

  // Y position drives rotateX and X drives rotateY — the axis you rotate about
  // is perpendicular to the direction the pointer moved. The negation on
  // rotateX is what makes the card lean *toward* the cursor rather than away.
  const rotateX = useTransform(sy, [-0.5, 0.5], [strength, -strength])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-strength, strength])

  if (reduced || coarse) return <div className={className}>{children}</div>

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 900 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        px.set((e.clientX - r.left) / r.width - 0.5)
        py.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
    >
      <m.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale }}
        transition={transitions.hover}
        className="h-full"
      >
        {children}
      </m.div>
    </div>
  )
}

/**
 * Lifts a child off the tilting card face.
 *
 * Only does anything inside a `Tilt`, which is what establishes the 3D context.
 * Used on the one element per card that should read as sitting above it — an
 * icon medallion, a number — so the tilt has something to parallax against.
 * Without a raised element a tilt is just a rotating rectangle.
 */
export function Raise({
  children,
  z = 28,
  className,
}: {
  children: ReactNode
  z?: number
  className?: string
}) {
  return (
    <div className={className} style={{ transform: `translateZ(${z}px)` }}>
      {children}
    </div>
  )
}

/* ==========================================================================
   Magnetic
   ========================================================================== */

/**
 * A control that leans a few pixels toward the pointer as it approaches.
 *
 * Capped at 6px, and the child moves at a third of the pointer's offset. The
 * effect people usually ship moves 15-20px, which pulls the button out from
 * under the cursor and makes it genuinely harder to click — an interaction
 * that fights the user is not polish. At this strength it reads as the control
 * acknowledging the approach, and the click target never meaningfully moves.
 */
export function Magnetic({
  children,
  className,
  strength = 6,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  strength?: number
  as?: ElementType
}) {
  const reduced = usePrefersReducedMotion()
  const coarse = useMediaQuery('(pointer: coarse)')
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING.pointer)
  const sy = useSpring(y, SPRING.pointer)

  if (reduced || coarse) return <Tag className={className}>{children}</Tag>

  return (
    <m.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        x.set(Math.max(-strength, Math.min(strength, dx * 0.32)))
        y.set(Math.max(-strength, Math.min(strength, dy * 0.32)))
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </m.div>
  )
}

/* ==========================================================================
   Live indicators
   ========================================================================== */

/**
 * A dot with a ring expanding out of it.
 *
 * Used beside genuinely current information — the admissions status, the
 * "opening soon" campus notes. Not decoration: a pulse on a static label is a
 * site pretending to have live data, which erodes the trust the rest of the
 * copy is working to build.
 *
 * The ring is a second element rather than a `box-shadow` keyframe so the
 * expansion is a composited transform. `animate` rather than CSS because the
 * ring and the dot have to stay in phase across remounts.
 */
export function LiveDot({ className, tone = 'terracotta' }: { className?: string; tone?: 'terracotta' | 'neem' | 'haldi' }) {
  const reduced = usePrefersReducedMotion()
  const colour = {
    terracotta: 'bg-terracotta-500',
    neem: 'bg-neem-500',
    haldi: 'bg-haldi-500',
  }[tone]

  return (
    <span className={cn('relative grid size-2.5 shrink-0 place-items-center', className)} aria-hidden="true">
      {!reduced ? (
        <m.span
          className={cn('absolute inset-0 rounded-full', colour)}
          animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      ) : null}
      <span className={cn('size-1.5 rounded-full', colour)} />
    </span>
  )
}

/* ==========================================================================
   useTilt
   ========================================================================== */

/**
 * The tilt, as props to spread onto an `m.*` element, with no wrapper.
 *
 * WHY NOT THE `<Tilt>` COMPONENT. A 3D rotation needs a perspective, and the
 * `perspective` *property* only applies to an element's children — so the
 * obvious implementation puts a wrapper div around the card. Every card on this
 * site is a CSS grid item, and a wrapper makes the wrapper the grid item
 * instead: `h-full` starts resolving against the wrapper, equal-height rows
 * stop being equal, and a card with a badge hanging over its edge gets clipped
 * by a box that was not there before.
 *
 * The `perspective()` transform *function* has no such problem — it applies to
 * the element it is written on. Motion exposes it as `transformPerspective`, so
 * the card can tilt in place and the DOM is exactly what it was.
 *
 * The hook also owns the hover lift, because both write `transform` and CSS and
 * Motion cannot share that property: whichever wrote last wins, and the result
 * is a card that rises until you move the pointer inside it and then drops.
 * The shadow stays in CSS, where it costs nothing.
 *
 * Returns `null` on touch and under reduced motion, and the caller then renders
 * the element with no motion props at all.
 */
export function useTilt(options: { strength?: number; lift?: number } = {}) {
  const { strength = 4.5, lift = 6 } = options
  const reduced = usePrefersReducedMotion()
  const coarse = useMediaQuery('(pointer: coarse)')

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [strength, -strength]), SPRING.pointer)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-strength, strength]), SPRING.pointer)

  if (reduced || coarse) return null

  return {
    style: { rotateX, rotateY, transformPerspective: 900 },
    whileHover: { y: -lift },
    transition: SPRING.pointer,
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect()
      px.set((e.clientX - r.left) / r.width - 0.5)
      py.set((e.clientY - r.top) / r.height - 0.5)
    },
    onPointerLeave: () => {
      px.set(0)
      py.set(0)
    },
  } as const
}
