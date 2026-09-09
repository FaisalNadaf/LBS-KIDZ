import type { ReactNode, ElementType } from 'react'

/**
 * Entrance reveals.
 *
 * These render nothing but a plain element carrying `data-reveal`. All the
 * animation lives in `useScrollReveal`, which runs one batched ScrollTrigger
 * for the whole page (see animations/gsap.ts).
 *
 * That indirection is the point. Previously each of these was a Motion
 * component with its own IntersectionObserver and its own animation instance,
 * which on the homepage meant roughly eighty observers and eighty tweens for
 * what is conceptually one behaviour. Now it is one observer, one timeline
 * factory, and markup that costs nothing to render.
 *
 * The hidden state is CSS, not JavaScript, so nothing is ever painted and then
 * snapped back — and a failsafe in the hook reveals everything if GSAP never
 * arrives. See the "Scroll reveal" block in styles/index.css.
 *
 * DIRECTION IS INFERRED, NOT DECLARED. The default is `auto`: the engine reads
 * where the element actually sits on screen and sends it in from that side, so
 * a two-column band opens outward and a card row deals left, centre, right. A
 * direction passed here overrides that, and should only be passed where the
 * inference is genuinely wrong — before this existed, five of roughly 190
 * reveals on the site had a direction and the other 185 all rose 22px.
 */

/**
 * `auto` reads position. `rise` is the explicit form of what centred content
 * gets. `clip` is for photographs, `blur` for display headings only — it is a
 * full-surface filter rather than a composited transform, so it does not belong
 * on anything that appears in quantity.
 */
type Direction = 'auto' | 'rise' | 'up' | 'left' | 'right' | 'scale' | 'clip' | 'blur' | 'none'

/** How much this element matters. Drives distance, duration and stagger. */
type Tier = 'lead' | 'base' | 'quiet'

type Common = {
  children: ReactNode
  className?: string
  /** Travel in px. Defaults to the tier's own distance. */
  distance?: number
  direction?: Direction
  tier?: Tier
  as?: ElementType
}

export function Reveal({
  children,
  className,
  distance,
  delay = 0,
  direction = 'auto',
  tier,
  as: Tag = 'div',
  id,
}: Common & {
  /** Seconds added after this element's batch begins. */
  delay?: number
  id?: string
}) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={direction}
      data-reveal-tier={tier}
      data-reveal-delay={delay || undefined}
      data-reveal-distance={distance}
    >
      {children}
    </Tag>
  )
}

/**
 * Wrapper for a list of RevealItem children.
 *
 * It is no longer an animation target itself: the batched ScrollTrigger
 * staggers whatever enters view together, so a group's children cascade
 * naturally without the parent having to orchestrate them. The `each` and
 * `delayChildren` props are kept because call sites pass them, and because
 * they still express intent, but the batch's own stagger is what runs.
 */
export function RevealGroup({
  children,
  className,
  as: Tag = 'div',
  id,
}: {
  children: ReactNode
  className?: string
  each?: number
  delayChildren?: number
  as?: ElementType
  id?: string
}) {
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  )
}

export function RevealItem({
  children,
  className,
  distance,
  direction = 'auto',
  tier,
  as: Tag = 'div',
}: Common) {
  return (
    <Tag
      className={className}
      data-reveal={direction}
      data-reveal-tier={tier}
      data-reveal-distance={distance}
    >
      {children}
    </Tag>
  )
}
