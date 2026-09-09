import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import { cn } from '@/lib/cn'
import { useTilt } from '@/animations/interactions'
import { Counter } from '@/animations/Scroll'
import { Photo, type PhotoShape } from '@/components/media/Photo'
import { Ring } from '@/components/art/objects'
import { ObjectBadge } from '@/components/art/ObjectScatter'
import { CardBackground, type CardBackdrop } from './CardBackground'

// Re-exported so a page importing card things has one place to import them
// from, which is where every call site already reaches.
export { cardBackdropCycle, type CardBackdrop } from './CardBackground'
import type { PhotoName } from '@/data/media'

/**
 * Cards.
 *
 * One surface language for the whole site — khadi paper, a hairline edge, a
 * warm-tinted shadow — expressed through several shapes, because a program, a
 * statistic and a quotation are not the same object and forcing them into one
 * rectangle is what makes a page look like a template.
 *
 * What every card shares: radius, hairline, shadow depth, hover behaviour and
 * the tone palette. What differs: internal structure. Tone changes colour,
 * never geometry.
 *
 * HOVER. A card that can be hovered leans very slightly toward the pointer and
 * rises off the page. The rotation caps at 4.5 degrees — most implementations
 * of this use fifteen or twenty, which looks impressive on one isolated card
 * and unusable on a grid of nine, where edges shear against their neighbours
 * and text stops being flat to the screen.
 *
 * The rotation and the rise are Motion springs (see `useTilt`); the shadow step
 * stays in CSS, because it is the one part that is not a transform and CSS does
 * it for free. Both halves switch off together on touch hardware and under
 * reduced motion, where the hook returns nothing and the card renders as a
 * plain element.
 */

type CardTone = 'paper' | 'sand' | 'indigo' | 'terracotta' | 'neem' | 'haldi'

const toneClasses: Record<CardTone, string> = {
  paper: 'bg-linear-to-b from-white to-khadi-50 hairline',
  sand: 'bg-linear-to-b from-khadi-100 to-khadi-200/80 hairline',
  indigo: 'bg-linear-to-b from-indigo-ink-600 to-indigo-ink-700 text-khadi-100',
  terracotta: 'bg-linear-to-b from-terracotta-50 to-terracotta-100/60 hairline',
  neem: 'bg-linear-to-b from-neem-100 to-neem-200/60 hairline',
  haldi: 'bg-linear-to-b from-haldi-100 to-haldi-200/60 hairline',
}

const surface = 'relative shadow-soft'

/* ==========================================================================
   Card silhouettes and backdrop circles
   ========================================================================== */

/**
 * The silhouettes a card can take.
 *
 * `rounded` is the original and stays the default, so nothing changes for a
 * card that does not ask. The other four come from the house shape vocabulary
 * in index.css — the same one the photographs and the buttons use — so a card
 * that takes one is speaking the language the rest of the page already speaks.
 *
 * The point of having four is that a grid can hand a different one to each
 * cell. Four identical rounded rectangles in a row read as one control
 * repeated; four silhouettes read as four things.
 */
export type CardShape = 'rounded' | 'cut' | 'cut-alt' | 'leaf' | 'leaf-alt'

const cardShapes: Record<CardShape, string> = {
  rounded: 'rounded-xl',
  cut: 'corner-cut-lg',
  'cut-alt': 'shape-cut-alt',
  leaf: 'shape-leaf',
  'leaf-alt': 'shape-leaf-alt',
}

/** Rotated through a grid so no two neighbouring cards share an outline. */
export const cardShapeCycle: CardShape[] = ['cut', 'leaf', 'cut-alt', 'leaf-alt']

/**
 * The matching cycle for the photograph inside a `PhotoCard`, offset from
 * `cardShapeCycle` so the picture never wears the same outline as the card
 * around it at any position in the rotation.
 */
export const photoShapeCycle = ['shape-leaf-alt', 'corner-cut-lg', 'shape-leaf', 'shape-cut']

/**
 * Clipping is separate from `surface` because a card carrying an `object` badge
 * must not clip: the drawing sits above the card's own top edge and
 * `overflow-hidden` would cut it in half. Nothing about the surface needs the
 * clip — the tone gradient and the `hairline` inset shadow both follow
 * `border-radius` by themselves, and a `Photo` clips itself — so a card either
 * keeps the clip it has always had, or trades it for a badge.
 */
const clipFor = (object?: string) => (object ? null : 'overflow-hidden')

/**
 * The interactive lift. The shadow steps up with the translate so the card
 * reads as rising off the page rather than sliding along it.
 *
 * This was 260ms, chosen to stay under the 300ms threshold where a hover stops
 * feeling like a response. It moved to 360ms when the cards gained decorative
 * backdrops: the shapes swell over 420ms, and a card that finished moving while
 * its own backdrop was still going read as two unrelated animations. Matching
 * the two into one gesture is worth the 100ms, and 360 is still short enough to
 * feel like an answer to the pointer.
 */
const lift =
  'transition-[box-shadow] duration-[360ms] ease-out-soft hover:shadow-lift motion-reduce:transition-none'

/**
 * Motion-enabled roots. Built once at module scope: `m.create` returns a new
 * component type each call, and one created during render remounts its whole
 * subtree on every parent render.
 */
const MDiv = m.div
const MLinkCard = m.create(Link)

export function Card({
  children,
  className,
  tone = 'paper',
  padded = true,
  id,
  interactive = false,
  object,
  shape = 'rounded',
  backdrop,
}: {
  children: ReactNode
  className?: string
  tone?: CardTone
  padded?: boolean
  id?: string
  /** Adds the hover lift for cards that are themselves clickable wrappers. */
  interactive?: boolean
  /**
   * Hangs a drawn object over the card's top-right corner. The string is the
   * seed that chooses which drawing, so pass something stable and distinct per
   * card — a title or a slug — and neighbours in a grid get different objects.
   */
  object?: string
  /** The card's outline. Rotate `cardShapeCycle` across a grid. */
  shape?: CardShape
  /**
   * A flat-vector pastel composition behind the content. Rotate
   * `cardBackdropCycle` across a grid so neighbours never share one.
   */
  backdrop?: CardBackdrop
}) {
  /**
   * Every card answers the pointer; how much depends on whether it does
   * anything. A card that is a link leans further and rises off the page,
   * because that motion is an affordance. A card that is only information
   * leans about half as far and does not lift: enough that the surface reads
   * as physical rather than printed, not so much that it advertises a click
   * that is not there.
   */
  const tilt = useTilt(interactive ? { strength: 4.5, lift: 6 } : { strength: 2.2, lift: 0 })
  const classes = cn(
    // Named, so the markers and icons inside can answer a hover on the card
    // without colliding with the unnamed group the backdrop uses.
    'group/card',
    surface,
    cardShapes[shape],
    clipFor(object),
    // Only when there is a backdrop: `isolate` keeps its `-z-10` inside the
    // card, and adding a stacking context to every card would change the
    // painting order for content that never asked for one.
    backdrop && 'group isolate',
    toneClasses[tone],
    padded && 'p-6 sm:p-7',
    interactive && lift,
    className,
  )
  const inner = (
    <>
      {backdrop ? <CardBackground variant={backdrop} onDark={tone === 'indigo'} /> : null}
      {object ? <ObjectBadge seed={object} /> : null}
      {children}
    </>
  )

  // Touch hardware and reduced motion get the plain div this has always been.
  if (!tilt) {
    return (
      <div id={id} className={classes}>
        {inner}
      </div>
    )
  }

  return (
    <MDiv id={id} className={classes} {...tilt}>
      {inner}
    </MDiv>
  )
}

/** Card that is itself a link. The whole surface is the target. */
export function LinkCard({
  to,
  children,
  className,
  tone = 'paper',
  padded = true,
  object,
  shape = 'rounded',
  backdrop,
}: {
  to: string
  children: ReactNode
  className?: string
  tone?: CardTone
  padded?: boolean
  /** See `Card`. */
  object?: string
  /** See `Card`. */
  shape?: CardShape
  /** See `Card`. */
  backdrop?: CardBackdrop
}) {
  const tilt = useTilt()
  const classes = cn(
    'group/card group block h-full',
    surface,
    cardShapes[shape],
    clipFor(object),
    backdrop && 'isolate',
    lift,
    toneClasses[tone],
    padded && 'p-6 sm:p-7',
    className,
  )
  const inner = (
    <>
      {backdrop ? <CardBackground variant={backdrop} onDark={tone === 'indigo'} /> : null}
      {object ? <ObjectBadge seed={object} /> : null}
      {children}
    </>
  )

  if (!tilt) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    )
  }

  return (
    <MLinkCard to={to} className={classes} {...tilt}>
      {inner}
    </MLinkCard>
  )
}

/* ==========================================================================
   PhotoCard
   ========================================================================== */

/**
 * A card led by its photograph rather than its heading.
 *
 * The image sits flush to three edges and the text block overlaps it slightly,
 * which is what stops a photo card reading as "picture stuck on top of a box".
 * On hover the photograph scales inside its own clip while the card lifts, so
 * two things move at different rates and the card feels physical.
 */
export function PhotoCard({
  to,
  photo,
  alt,
  sizes,
  eyebrow,
  title,
  children,
  footer,
  tone = 'paper',
  className,
  ratio = '4 / 3',
  focus,
  object,
  shape = 'rounded',
  photoShape = 'rounded-lg',
  backdrop,
}: {
  to?: string
  photo: PhotoName
  alt?: string
  sizes: string
  eyebrow?: ReactNode
  title: ReactNode
  children?: ReactNode
  footer?: ReactNode
  tone?: CardTone
  className?: string
  ratio?: string
  focus?: string
  /** See `Card`. */
  object?: string
  /** See `Card`. */
  shape?: CardShape
  /**
   * The photograph's own outline, which should not match the card's.
   *
   * A picture cut to the same silhouette as the box around it reads as one
   * thick border; two different outlines read as a photograph placed on a card.
   * Passed as a class rather than a `CardShape` so a call site can reach for
   * any of the shape utilities, including the ones only photographs use.
   */
  photoShape?: string
  /** See `Card`. */
  backdrop?: CardBackdrop
}) {
  const body = (
    <>
      {backdrop ? <CardBackground variant={backdrop} onDark={tone === 'indigo'} /> : null}
      {object ? <ObjectBadge seed={object} /> : null}
      <Photo
        name={photo}
        alt={alt}
        sizes={sizes}
        ratio={ratio}
        focus={focus}
        className={cn('relative', photoShape)}
        imgClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <div className="relative flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-6">
        {eyebrow ? (
          <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.16em] text-terracotta-600">
            {eyebrow}
          </p>
        ) : null}
        <h3
          className={cn(
            'font-display text-h3 font-semibold',
            tone === 'indigo' ? 'text-khadi-50' : 'text-indigo-ink-700',
            to && 'transition-colors group-hover:text-terracotta-600',
          )}
        >
          {title}
        </h3>
        {children ? (
          <div
            className={cn(
              'mt-3 flex-1 text-small leading-relaxed',
              tone === 'indigo' ? 'text-khadi-200/85' : 'text-ink-500',
            )}
          >
            {children}
          </div>
        ) : null}
        {footer ? <div className="mt-5">{footer}</div> : null}
      </div>
    </>
  )

  // `p-3` rather than `p-2` once these carry a backdrop. The photograph is
  // opaque and covers the top half of the card, so the only place the shape
  // behind it can be seen is the margin around it and the text block below;
  // at 8px that margin was a hairline of colour rather than a backdrop framing
  // the picture, which is the composition the shapes exist for.
  const classes = cn(
    'group flex h-full flex-col',
    backdrop ? 'p-3 sm:p-4' : 'p-2',
    surface,
    cardShapes[shape],
    clipFor(object),
    backdrop && 'isolate',
    toneClasses[tone],
    to && lift,
    className,
  )

  return to ? (
    <Link to={to} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  )
}

/* ==========================================================================
   StatTile
   ========================================================================== */

/**
 * A single number and what it means.
 *
 * Deliberately unlike the other cards: no hairline, no shadow, a dotted ring
 * behind the figure instead. Statistics are read at a glance and reading them
 * should not feel like reading another card.
 *
 * A numeric value counts up when it reaches the reader; anything else is
 * rendered as given. The count is short — these are small figures, and a
 * four that takes two seconds to arrive at four is a stall dressed as an
 * effect. The number is in the markup at its final value and animated from
 * zero, so it is correct before, during and after, and correct for anyone the
 * animation never runs for.
 */
export function StatTile({
  value,
  label,
  icon,
  className,
  onDark = false,
}: {
  value: ReactNode
  label: ReactNode
  icon?: ReactNode
  className?: string
  onDark?: boolean
}) {
  return (
    <div className={cn('group/stat flex items-start gap-3.5', className)}>
      <span className="relative grid size-11 shrink-0 place-items-center">
        <Ring
          className={cn(
            'absolute inset-0 size-full motion-safe:animate-[spin_28s_linear_infinite]',
            onDark ? 'text-haldi-300/45' : 'text-terracotta-300/70',
          )}
        />
        {/* The medallion answers a hover on the whole tile rather than on
            itself: an 8px target that only reacts when the pointer is exactly
            on it is a detail nobody ever sees. */}
        <span
          className={cn(
            'grid size-8 place-items-center rounded-full transition-transform duration-300 ease-out-soft group-hover/stat:scale-110 motion-reduce:transition-none',
            onDark ? 'bg-khadi-50/12 text-haldi-300' : 'bg-terracotta-50 text-terracotta-600',
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      </span>

      <div>
        <p
          className={cn(
            'font-numeral text-h3 font-semibold leading-none',
            onDark ? 'text-khadi-50' : 'text-indigo-ink-700',
          )}
        >
          {typeof value === 'number' ? <Counter value={value} /> : value}
        </p>
        <p
          className={cn(
            'mt-1.5 max-w-[24ch] text-small leading-snug',
            onDark ? 'text-khadi-200/85' : 'text-ink-500',
          )}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

/* ==========================================================================
   QuoteCard
   ========================================================================== */

/** A pulled sentence, set in the display face at reading size, never smaller. */
export function QuoteCard({
  children,
  attribution,
  tone = 'haldi',
  className,
  photo,
  photoAlt,
  photoShape = 'petal',
  object,
  shape = 'rounded',
  backdrop,
}: {
  children: ReactNode
  attribution?: ReactNode
  tone?: CardTone
  className?: string
  photo?: PhotoName
  photoAlt?: string
  photoShape?: PhotoShape
  /** See `Card`. */
  object?: string
  /** See `Card`. */
  shape?: CardShape
  /** See `Card`. */
  backdrop?: CardBackdrop
}) {
  return (
    <figure
      className={cn(
        surface,
        cardShapes[shape],
        clipFor(object),
        backdrop && 'group isolate',
        toneClasses[tone],
        'flex flex-col gap-6 p-7 sm:p-9',
        photo && 'sm:flex-row sm:items-center',
        className,
      )}
    >
      {backdrop ? <CardBackground variant={backdrop} onDark={tone === 'indigo'} /> : null}
      {object ? <ObjectBadge seed={object} /> : null}
      {photo ? (
        <Photo
          name={photo}
          alt={photoAlt}
          sizes="(min-width: 640px) 9rem, 6rem"
          ratio="1 / 1"
          className={cn('w-24 shrink-0 sm:w-36', photoShape === 'petal' && 'shape-petal')}
        />
      ) : null}

      <div>
        <blockquote
          className={cn(
            'font-display text-h3 leading-snug',
            tone === 'indigo' ? 'text-khadi-50' : 'text-indigo-ink-700',
          )}
        >
          {children}
        </blockquote>
        {attribution ? (
          <figcaption
            className={cn(
              'mt-4 text-small font-semibold',
              // 700 rather than 600: the card gradient darkens toward its foot
              // and the attribution sits at the bottom, which took the pair
              // just under 4.5:1.
              tone === 'indigo' ? 'text-haldi-300' : 'text-terracotta-700',
            )}
          >
            {attribution}
          </figcaption>
        ) : null}
      </div>
    </figure>
  )
}

/* ==========================================================================
   Marker and Chip
   ========================================================================== */

/**
 * The numbered / lettered marker used by SIMPLE pillars, process steps and
 * curricular goals. One shape, one weight, everywhere.
 *
 * It answers a hover on whatever card contains it rather than on itself. A
 * 44px badge that only reacts when the pointer is exactly on it is a detail
 * nobody ever sees; tied to the card, it is the internal movement that stops a
 * hover being one rigid plate tilting.
 *
 * `group-hover/card` and not the bare `group`, because several of these sit
 * inside cards that already run a named group for their backdrop, and an
 * unnamed group binds to the nearest ancestor group — which on those cards is
 * the wrong one.
 */
export function Marker({
  children,
  tone = 'terracotta',
  className,
  size = 'md',
}: {
  children: ReactNode
  tone?: 'terracotta' | 'indigo' | 'haldi' | 'neem'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const tones = {
    terracotta: 'bg-terracotta-100 text-terracotta-700',
    indigo: 'bg-indigo-ink-100 text-indigo-ink-700',
    haldi: 'bg-haldi-100 text-haldi-600',
    neem: 'bg-neem-100 text-neem-600',
  }
  const sizes = {
    sm: 'size-9 text-sm',
    md: 'size-11 text-base',
    lg: 'size-14 text-xl',
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'font-numeral grid shrink-0 place-items-center rounded-md font-semibold',
        'transition-transform duration-300 ease-out-soft motion-reduce:transition-none',
        'group-hover/card:-translate-y-0.5 group-hover/card:scale-105',
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Small factual chip. Used for age bands, phases and keyword tiers. */
export function Chip({
  children,
  tone = 'neutral',
  className,
  icon,
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'muted' | 'onDark' | 'positive'
  className?: string
  icon?: ReactNode
}) {
  const tones = {
    neutral: 'bg-khadi-200 text-ink-600',
    accent: 'bg-terracotta-100 text-terracotta-700',
    muted: 'bg-transparent text-ink-400 hairline',
    onDark: 'bg-khadi-50/10 text-khadi-100',
    positive: 'bg-neem-100 text-neem-600',
  }

  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-semibold',
        // Deliberately NOT `whitespace-nowrap` by default. It was, briefly, to
        // stop a two-word status chip breaking across lines — and it put an
        // 8px horizontal overflow on the admissions page at 320, where one
        // chip carries a long label and had been relying on wrapping. A chip
        // that must stay on one line asks for it at the call site.
        'transition-colors duration-200',
        tones[tone],
        className,
      )}
    >
      {icon ? (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  )
}

/* ==========================================================================
   FeatureChip
   ========================================================================== */

/**
 * A pill carrying a circular icon and one or two lines of label.
 *
 * The reference uses a pair of these under a section's standfirst to name the
 * two things that matter most, in a form that is lighter than a card and
 * heavier than a bullet. That gap is real: a list item is skimmed past, a card
 * demands a paragraph.
 */
export function FeatureChip({
  icon,
  children,
  tone = 'paper',
  className,
}: {
  icon: ReactNode
  children: ReactNode
  tone?: 'paper' | 'onDark'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3.5 rounded-full py-2.5 pl-2.5 pr-6',
        tone === 'onDark' ? 'bg-khadi-50/10 text-khadi-100' : 'bg-khadi-50 text-ink-600 hairline',
        className,
      )}
    >
      <span
        className={cn(
          'grid size-10 shrink-0 place-items-center rounded-full',
          tone === 'onDark' ? 'bg-haldi-300 text-indigo-ink-800' : 'bg-terracotta-500 text-khadi-50',
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-small font-semibold leading-snug">{children}</span>
    </div>
  )
}

/* ==========================================================================
   PersonCard
   ========================================================================== */

/**
 * A portrait standing on a bold colour blob, inside a dashed outline.
 *
 * Taken from the reference's team cards. The dashed rule is what makes the
 * shape read as a frame rather than as another filled box, and it is doing
 * real work on this site: the Shastri family pages hold portraits that do not
 * exist yet, and a dashed frame says "reserved" in a way a solid card cannot.
 */
export function PersonCard({
  name,
  role,
  photo,
  photoAlt,
  colour = 'indigo',
  reserved = false,
  children,
  className,
}: {
  name: ReactNode
  role?: ReactNode
  photo?: PhotoName
  photoAlt?: string
  colour?: 'indigo' | 'terracotta' | 'neem' | 'haldi'
  /** Draws the empty state: the frame with nothing in it yet. */
  reserved?: boolean
  children?: ReactNode
  className?: string
}) {
  const portraitTints = {
    indigo: 'bg-indigo-ink-500',
    terracotta: 'bg-terracotta-400',
    neem: 'bg-neem-400',
    haldi: 'bg-haldi-400',
  }

  return (
    <div
      className={cn(
        'group flex h-full flex-col items-center rounded-3xl border-2 border-dashed border-khadi-400 bg-khadi-50/60 p-5 text-center',
        'transition-colors duration-300 hover:border-terracotta-300',
        className,
      )}
    >
      <div className={cn('shape-blob w-full overflow-hidden', portraitTints[colour])}>
        {photo ? (
          <Photo
            name={photo}
            alt={photoAlt}
            sizes="(min-width: 1024px) 22vw, 80vw"
            ratio="1 / 1"
            className="mix-blend-luminosity opacity-95"
            imgClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        ) : (
          <div
            className="grid aspect-[4/5] w-full place-items-center px-6"
            aria-hidden="true"
          >
            <span className="text-2xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-khadi-50/85">
              {reserved ? 'Portrait to follow' : null}
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-5 font-display text-h3 font-semibold text-indigo-ink-700">{name}</h3>
      {role ? <p className="mt-1 text-small text-ink-400">{role}</p> : null}
      {children ? <div className="mt-4 w-full">{children}</div> : null}
    </div>
  )
}

/* ==========================================================================
   ColourPanel
   ========================================================================== */

/**
 * A saturated colour panel with a photograph in it and a large serif line laid
 * over the top.
 *
 * The reference uses a row of three of these as a statement band, and it is the
 * one place on a page where colour is allowed to be loud. The text sits in the
 * lower half over the flat colour rather than over the photograph, so legibility
 * never depends on what the picture happens to be doing.
 */
type PanelColour = 'terracotta' | 'indigo' | 'neem' | 'haldi'

/**
 * The 600s, not the 500s. Every 500 put the eyebrow under 4.5:1 against its
 * own ground — haldi-500 managed only 2.58:1, which fails even the 3:1 floor
 * large text is allowed.
 */
const panelFields: Record<PanelColour, string> = {
  terracotta: 'bg-terracotta-600',
  indigo: 'bg-indigo-ink-600',
  neem: 'bg-neem-600',
  haldi: 'bg-haldi-600',
}

/** Matching gradient origins, so the fade leaves the photograph invisibly. */
const panelFades: Record<PanelColour, string> = {
  terracotta: 'from-terracotta-600',
  indigo: 'from-indigo-ink-600',
  neem: 'from-neem-600',
  haldi: 'from-haldi-600',
}

export function ColourPanel({
  title,
  photo,
  photoAlt,
  colour,
  to,
  eyebrow,
  focus,
  className,
}: {
  title: ReactNode
  photo: PhotoName
  photoAlt?: string
  colour: PanelColour
  to?: string
  eyebrow?: ReactNode
  /** object-position for the photograph, when the subject is not centred. */
  focus?: string
  className?: string
}) {
  const body = (
    <>
      <Photo
        name={photo}
        alt={photoAlt}
        sizes="(min-width: 1024px) 31vw, 92vw"
        ratio="1 / 1"
        focus={focus}
        className="absolute inset-x-0 top-0"
        imgClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.05] motion-reduce:transition-none"
      />
      {/* The colour rises over the foot of the photograph, so the line below
          always sits on flat colour and never on whatever the picture is doing. */}
      <div
        className={cn('absolute inset-x-0 bottom-0 h-[46%]', panelFields[colour])}
        aria-hidden="true"
      />
      <div
        className={cn(
          'absolute inset-x-0 bottom-[46%] h-24 bg-linear-to-t to-transparent',
          panelFades[colour],
        )}
        aria-hidden="true"
      />

      <div className="relative mt-auto p-6 sm:p-7">
        {eyebrow ? (
          <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.16em] text-khadi-100">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="font-display text-h2 leading-tight text-khadi-50">{title}</h3>
      </div>
    </>
  )

  const classes = cn(
    'group relative flex aspect-[4/5] flex-col overflow-hidden corner-cut-panel',
    panelFields[colour],
    to && lift,
    className,
  )

  return to ? (
    <Link to={to} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  )
}
