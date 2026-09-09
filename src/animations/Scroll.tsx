import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import {
  useAmbientDrift,
  useCounter,
  useDrift,
  useFloat,
  useScaleOnScroll,
  useScrollProgress,
  useSplitReveal,
  type FloatEnter,
  type FloatPattern,
} from './gsap'
import {
  Photo,
  shapeClasses,
  type PhotoProps,
  type PhotoShape,
} from '@/components/media/Photo'

/**
 * Scroll-linked and ambient motion, packaged.
 *
 * Every scrub lives behind these components so no page writes its own
 * ScrollTrigger. That matters twice over: GSAP stays lazily loaded and
 * reduced-motion-aware in exactly one place, and the site cannot drift into a
 * dozen slightly different parallax strengths.
 */

/* ==========================================================================
   ParallaxPhoto
   ========================================================================== */

/**
 * A photograph that eases back to its natural size as it rises into view.
 *
 * The frame clips and the transform runs on a wrapper inside it, so the motion
 * never changes the height of anything around it. Below the fold only: the
 * hero image must not be doing this while the page is still settling.
 */
export function ParallaxPhoto({
  shape = 'rounded',
  className,
  strength = 1.1,
  ...photo
}: PhotoProps & { shape?: PhotoShape; className?: string; strength?: number }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  useScaleOnScroll(innerRef, { from: strength, to: 1, trigger: frameRef })

  return (
    <div ref={frameRef} className={cn('overflow-hidden', shapeClasses[shape], className)}>
      <div ref={innerRef} className="gpu-layer h-full">
        <Photo {...photo} className="rounded-none!" />
      </div>
    </div>
  )
}

/* ==========================================================================
   Drift: decorative elements that move with scroll position
   ========================================================================== */

export function Drift({
  children,
  className,
  y = 40,
  x = 0,
  rotate = 0,
}: {
  children: ReactNode
  className?: string
  y?: number
  x?: number
  rotate?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useDrift(ref, { y, x, rotate })

  return (
    <div ref={ref} aria-hidden="true" className={cn('pointer-events-none', className)}>
      {children}
    </div>
  )
}

/**
 * The same scrub, for content rather than decoration.
 *
 * `Drift` marks itself `aria-hidden`, which is right for a floating leaf and
 * wrong for anything a reader needs: wrapping a photograph in it would take the
 * picture and its alt text out of the accessibility tree. This is the version
 * for things that carry meaning — no `aria-hidden`, no `pointer-events-none`.
 *
 * Deliberately its own element rather than a prop on the thing it moves. Where
 * something already carries an entrance animation, that animation and this
 * scrub both want to write `transform`, and the later one silently wins. Two
 * nested elements give each its own.
 */
export function Parallax({
  children,
  className,
  y = 40,
  x = 0,
}: {
  children: ReactNode
  className?: string
  y?: number
  x?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useDrift(ref, { y, x })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/* ==========================================================================
   Float: decorative elements that move on their own
   ========================================================================== */

/**
 * A looping float, phase-shifted per instance.
 *
 * `index` offsets the start so a cluster of drawn objects never bobs in
 * lockstep — the difference between "these things are floating" and "this
 * whole layer is animating".
 */
export function Float({
  children,
  className,
  y = 10,
  x = 0,
  rotate = 0,
  duration = 4.5,
  index = 0,
  pattern = 'float',
  enter = null,
  parallax = 0,
}: {
  children: ReactNode
  className?: string
  y?: number
  x?: number
  rotate?: number
  duration?: number
  index?: number
  /** Which idle motion to use. See `FloatPattern`. */
  pattern?: FloatPattern
  /** Direction to arrive from when the band reaches the viewport. */
  enter?: FloatEnter | null
  /** Scroll-linked travel in px, for depth. 0 disables it. */
  parallax?: number
}) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  // Two elements, because these are three transforms that would otherwise
  // overwrite each other: the scrub writes `y` from scroll position, and the
  // entrance and the idle loop both write `y` from their own timelines. Split,
  // each owns one node and they compose instead of competing.
  useDrift(outer, { y: parallax })
  useFloat(inner, {
    y,
    x,
    rotate,
    duration,
    pattern,
    enter,
    // A stagger, not a queue: the objects in a band arrive within about half a
    // second of each other rather than one after another.
    delay: index * (enter ? 0.11 : 0.7),
  })

  return (
    <div ref={outer} aria-hidden="true" className={cn('pointer-events-none', className)}>
      <div ref={inner}>{children}</div>
    </div>
  )
}

/* ==========================================================================
   TextReveal
   ========================================================================== */

/**
 * A heading that arrives one line at a time.
 *
 * Lines are passed in explicitly rather than measured, because splitting text
 * at render time gives a different result before and after the webfont loads
 * and the reflow is visible. Each line gets its own overflow-hidden mask so
 * descenders are never clipped mid-animation, and a growing delay makes the
 * lines cascade rather than arrive together.
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  as: Tag = 'span',
  delay = 0,
  id,
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  delay?: number
  id?: string
}) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.2em]">
          <span
            className={cn('block', lineClassName)}
            data-reveal="up"
            data-reveal-distance={64}
            data-reveal-delay={delay + index * 0.09}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/* ==========================================================================
   ScrollProgress
   ========================================================================== */

/**
 * A hairline under the navbar showing how far through the page the reader is.
 *
 * Only `scaleX` is written, from a ScrollTrigger scrub, so this costs one
 * composited transform and never touches layout. Under reduced motion the hook
 * does nothing and the bar simply stays at zero width.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollProgress(ref)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-terracotta-500/70',
        className,
      )}
    />
  )
}

/* ==========================================================================
   SplitHeading
   ========================================================================== */

/**
 * A heading whose words turn up into place one after another.
 *
 * The strongest text entrance in the system, and therefore the rarest: one per
 * page, on the heading the page is actually about. Everything else uses the
 * reveal engine's `blur` or `rise`. A site where every heading splits is a site
 * where the effect has stopped meaning anything.
 *
 * Takes real children rather than a string, so a heading keeps its coloured
 * spans and line breaks — the split walks text nodes and leaves the markup
 * around them alone. See `useSplitReveal`.
 */
export function SplitHeading({
  children,
  className,
  as: Tag = 'h2',
  id,
  delay = 0,
  stagger,
}: {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  id?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  useSplitReveal(ref, { delay, stagger })

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  )
}

/* ==========================================================================
   Counter
   ========================================================================== */

/**
 * A figure that counts up when it reaches the reader.
 *
 * The final value is rendered into the markup and animated *from* zero rather
 * than counted up to — so the number is right before the animation runs, right
 * if GSAP never loads, right under reduced motion, and right in the prerendered
 * HTML. A counter whose DOM starts at zero is a counter that reads "0" to
 * everyone it fails for, including search engines.
 *
 * `tabular-nums` is not optional: without it the figure changes width on almost
 * every tick and drags whatever sits beside it back and forth.
 */
export function Counter({
  value,
  suffix,
  prefix,
  decimals = 0,
  className,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useCounter(ref, value, { decimals })

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}
      <span ref={ref}>{value.toFixed(decimals)}</span>
      {suffix}
    </span>
  )
}

/* ==========================================================================
   Ambient
   ========================================================================== */

/**
 * A large, soft background shape wandering slowly behind a section.
 *
 * Sized and coloured by the caller; this only supplies the movement. Always
 * `aria-hidden` and `pointer-events-none`, always behind content — these are
 * atmosphere, and the moment one is legible as a moving object it is competing
 * with the words in front of it.
 */
export function Ambient({
  children,
  className,
  range,
  duration,
  delay,
}: {
  children: ReactNode
  className?: string
  range?: number
  duration?: number
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useAmbientDrift(ref, { range, duration, delay })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute', className)}
    >
      {children}
    </div>
  )
}

/**
 * A soft blurred field of colour. The default thing to put inside `Ambient`.
 *
 * Deliberately built from a radial gradient rather than a blurred solid: a
 * `filter: blur()` on a 30rem element is a full-surface repaint every frame it
 * moves, where a gradient is one composited layer that costs nothing to
 * translate.
 */
export type BlobTone = 'terracotta' | 'haldi' | 'neem' | 'indigo' | 'lilac'

export function Blob({
  className,
  tone = 'terracotta',
}: {
  className?: string
  tone?: BlobTone
}) {
  const fill = {
    terracotta: 'rgba(224, 156, 124, 0.20)',
    haldi: 'rgba(237, 199, 107, 0.22)',
    neem: 'rgba(156, 188, 161, 0.20)',
    indigo: 'rgba(122, 155, 189, 0.18)',
    lilac: 'rgba(213, 206, 234, 0.28)',
  }[tone]

  return (
    <div
      className={cn('rounded-full', className)}
      style={{ background: `radial-gradient(circle at 50% 50%, ${fill} 0%, transparent 70%)` }}
    />
  )
}
