import { Link } from 'react-router-dom'
import type { ReactNode, ComponentPropsWithoutRef } from 'react'
import { ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react'
import { m } from 'framer-motion'
import { cn } from '@/lib/cn'
import { pressable, SPRING } from '@/animations/motion'
import { Magnetic } from '@/animations/interactions'

/**
 * Motion-enabled elements.
 *
 * `m.create` rather than `motion()` so these stay inside the lazily loaded
 * feature bundle — see `MotionRoot`. Created at module scope, never inside a
 * component: `m.create` returns a new component type on every call, and one
 * built during render would remount its whole subtree on every keystroke in a
 * form beside it.
 */
const MButton = m.button
const MLink = m.create(Link)
const MAnchor = m.a

/**
 * Props Motion defines that collide with React's DOM typings. They are all
 * animation callbacks the button never uses, so they are dropped rather than
 * reconciled.
 */
type Clash = 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'

/**
 * The button system.
 *
 * Six variants, three sizes, one geometry. Everything that differs between
 * variants is colour; height, padding, radius, weight and motion are fixed, so
 * two buttons sitting next to each other always line up whatever they are for.
 *
 * MOTION. Hover and press run on Motion springs rather than CSS transitions,
 * which is the one thing a duration curve genuinely cannot do here: a spring
 * that is interrupted mid-flight — the pointer leaving before the rise finishes,
 * a press landing during the hover — carries its velocity into the new target
 * instead of restarting. With a transition, fast repeated hovers stutter.
 *
 * It is still deliberately small: a 2px rise, 2% of scale, a shadow that
 * deepens, an arrow that slides. The press state matters more than it looks —
 * without it a click has no acknowledgement until the page changes, and on a
 * slow connection that is a second of wondering whether it registered.
 *
 * `sheen` is the one flourish, on filled variants only: a soft highlight that
 * crosses the face on hover. It is a translated pseudo-layer inside an
 * `overflow-hidden` box, so it costs one composited transform and never touches
 * the label's contrast.
 *
 * Contrast is the reason `primary` uses terracotta-600 rather than the 500
 * accent: white on 500 is 4.24:1, under the 4.5:1 AA floor for label text.
 * 600 gives 5.75:1 and the 700 hover gives 7.81:1.
 */

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'onDark' | 'onDarkOutline'
type Size = 'sm' | 'md' | 'lg'

/**
 * No `transform` in the transition list and no `hover:-translate-y`: Motion
 * owns `transform` on these elements now, and a CSS transition on the same
 * property fights the spring for control of the style attribute.
 */
const base = [
  'group relative isolate inline-flex items-center justify-center gap-2 font-semibold',
  'overflow-hidden',
  'transition-[background-color,color,box-shadow,border-color] duration-200 ease-out-soft',
  'disabled:pointer-events-none disabled:opacity-55',
].join(' ')

const variants: Record<Variant, string> = {
  primary: 'bg-terracotta-600 text-khadi-50 shadow-soft hover:bg-terracotta-700 hover:shadow-lift',
  secondary: 'bg-khadi-50 text-indigo-ink-700 hairline hover:bg-white hover:shadow-card',
  outline:
    'bg-transparent text-indigo-ink-700 ring-1 ring-inset ring-indigo-ink-700/25 hover:bg-indigo-ink-700 hover:text-khadi-50 hover:ring-indigo-ink-700',
  ghost: 'bg-transparent text-indigo-ink-700 hover:bg-khadi-200/70',
  onDark: 'bg-khadi-50 text-indigo-ink-700 shadow-soft hover:bg-white hover:shadow-lift',
  onDarkOutline:
    'bg-transparent text-khadi-50 ring-1 ring-inset ring-khadi-50/40 hover:bg-khadi-50/12 hover:ring-khadi-50/70',
}

/**
 * Heights come from the shared control ladder in the theme, the same one the
 * form fields use, so a button next to an input lines up exactly rather than
 * being a pixel or two out. The smallest step is 2.75rem — 44px, the WCAG 2.5.8
 * minimum touch target — so no size in this system can be too small to tap.
 *
 * `corner-cut` is the house signature: three corners fully rounded, the
 * bottom-left held tight. It always sits on the same corner — a shape whose odd
 * corner wanders stops reading as a signature and starts reading as a mistake.
 */
const sizes: Record<Size, string> = {
  sm: 'min-h-control-sm corner-cut px-5 text-sm',
  md: 'min-h-control-md corner-cut px-6 text-[0.9375rem]',
  lg: 'min-h-control-lg corner-cut px-7 text-[0.9375rem] sm:px-8 sm:text-base',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Shows an arrow that slides on hover. */
  withArrow?: boolean
  /** Uses the diagonal arrow, for anything leaving the current context. */
  arrowDirection?: 'right' | 'up-right'
  /**
   * Leans the control a few pixels toward the pointer as it approaches.
   *
   * Opt-in, and meant for the one primary action in a view — a page's Register
   * Interest, the CTA band. On a row of six buttons it stops reading as
   * attention and starts reading as instability.
   */
  magnetic?: boolean
}

/** Hover and press, shared by every variant so they all move by the same amount. */
const motionProps = {
  whileHover: pressable.hover,
  whileTap: pressable.press,
  transition: SPRING.press,
} as const

/**
 * The hover highlight, on filled variants only.
 *
 * Outline and ghost buttons have no face for it to cross, and on a transparent
 * control it reads as a rendering artefact rather than as a sheen.
 */
function Sheen({ variant }: { variant: Variant }) {
  if (variant !== 'primary' && variant !== 'onDark' && variant !== 'secondary') return null
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 -translate-x-full skew-x-12',
        'bg-linear-to-r from-transparent to-transparent',
        variant === 'primary' ? 'via-khadi-50/22' : 'via-indigo-ink-700/8',
        'transition-transform duration-700 ease-out-soft group-hover:translate-x-full',
        'motion-reduce:hidden',
      )}
    />
  )
}

/** Wraps in the magnetic field only when asked, so the common path adds nothing. */
function MaybeMagnetic({ on, children }: { on?: boolean; children: ReactNode }) {
  return on ? <Magnetic>{children}</Magnetic> : <>{children}</>
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  withArrow,
  arrowDirection = 'right',
  magnetic,
  loading = false,
  disabled,
  ...rest
}: CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, Clash> & {
    /** Shows a spinner, blocks further presses and announces the wait. */
    loading?: boolean
  }) {
  const inert = disabled || loading
  return (
    <MaybeMagnetic on={magnetic && !inert}>
      <MButton
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={inert}
        aria-busy={loading || undefined}
        {...(inert ? {} : motionProps)}
        {...rest}
      >
        <Sheen variant={variant} />
        {loading ? (
          <Loader2
            className="size-4 shrink-0 animate-spin motion-reduce:animate-none"
            aria-hidden="true"
          />
        ) : null}
        {children}
        {withArrow && !loading ? <Arrow direction={arrowDirection} /> : null}
      </MButton>
    </MaybeMagnetic>
  )
}

export function ButtonLink({
  children,
  to,
  variant = 'primary',
  size = 'md',
  className,
  withArrow,
  arrowDirection = 'right',
  magnetic,
  external,
  ...rest
}: CommonProps & {
  to: string
  external?: boolean
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | Clash>) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const inner = (
    <>
      <Sheen variant={variant} />
      {children}
      <Arrow direction={external ? 'up-right' : arrowDirection} show={withArrow} />
    </>
  )

  return (
    <MaybeMagnetic on={magnetic}>
      {external ? (
        <MAnchor
          href={to}
          className={classes}
          rel="noopener noreferrer"
          target="_blank"
          {...motionProps}
          {...rest}
        >
          {inner}
        </MAnchor>
      ) : (
        <MLink to={to} className={classes} {...motionProps} {...rest}>
          {inner}
        </MLink>
      )}
    </MaybeMagnetic>
  )
}

function Arrow({ direction, show = true }: { direction: 'right' | 'up-right'; show?: boolean }) {
  if (!show) return null
  const Icon = direction === 'right' ? ArrowRight : ArrowUpRight
  return (
    <Icon
      className={cn(
        'size-4 shrink-0 transition-transform duration-200 ease-out-soft',
        direction === 'right'
          ? 'group-hover:translate-x-1'
          : 'group-hover:-translate-y-1 group-hover:translate-x-1',
        'motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0',
      )}
      aria-hidden="true"
    />
  )
}

/* ==========================================================================
   TextLink
   ========================================================================== */

/**
 * Quiet inline link with the arrow affordance, for in-body cross-links.
 *
 * The underline grows from the left on hover rather than appearing all at once,
 * which is one animated transform on a pseudo-element and reads as considered
 * where a plain `hover:underline` reads as default.
 */
export function TextLink({
  to,
  children,
  className,
  onDark = false,
}: {
  to: string
  children: ReactNode
  className?: string
  onDark?: boolean
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-1.5 font-semibold transition-colors',
        // The link's text is ~26px tall, under the 44px touch minimum. Padding
        // grows the hit area and the matching negative margin cancels its
        // effect on layout, so the target is tappable without anything moving.
        'py-2.5 -my-2.5',
        onDark
          ? 'text-haldi-300 hover:text-haldi-200'
          : 'text-terracotta-600 hover:text-terracotta-700',
        className,
      )}
    >
      {/* The rule is a background image sized from 0% to 100%, so the hover
          animates background-size rather than a border or a pseudo-element's
          width. It inherits currentColor, which means it needs no light/dark
          variant of its own. */}
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1.5px] bg-bottom-left bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out-soft group-hover:bg-size-[100%_1.5px] motion-reduce:transition-none">
        {children}
      </span>
      <ArrowRight
        className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        aria-hidden="true"
      />
    </Link>
  )
}
