import type { ReactNode, ElementType } from 'react'
import { cn } from '@/lib/cn'
import { ObjectScatter } from '@/components/art/ObjectScatter'
import { Reveal } from '@/animations/Reveal'
import { SplitHeading } from '@/animations/Scroll'
import { Grain } from '@/components/art/primitives'
import { SectionDivider, DIVIDER_HEIGHT } from './SectionDivider'
import type { DividerTone, DividerType } from './SectionDivider'

/* ==========================================================================
   Container
   ========================================================================== */

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode
  className?: string
  /**
   * `composition` is deliberately wider than `wide`: it is for bands built out
   * of pictures rather than prose, where the reading measure is set by the
   * inner columns instead of by the frame.
   */
  size?: 'narrow' | 'default' | 'wide' | 'composition'
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-edge',
        size === 'narrow' && 'max-w-narrow',
        size === 'default' && 'max-w-measure',
        size === 'wide' && 'max-w-wide',
        size === 'composition' && 'max-w-composition',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ==========================================================================
   Section
   ========================================================================== */

type Tone = 'mist' | 'white' | 'brand' | 'sky' | 'green' | 'orange'

/**
 * The bands a page can be made of.
 *
 * Mostly light: `white` and `mist` (the faint blue page ground) carry the bulk
 * of every page, and `sky`, `green` and `orange` are the palest step of their
 * family — enough to separate one band from the next, never enough to read as a
 * coloured section. `brand` is the one deep band, and it marks itself `on-dark`
 * so anything focusable inside picks up the light focus ring.
 */
const toneClasses: Record<Tone, string> = {
  mist: 'bg-mist-100 text-ink-700',
  white: 'bg-mist-50 text-ink-700',
  brand: 'on-dark bg-brand-700 text-mist-100',
  sky: 'bg-sky-50 text-ink-700',
  green: 'bg-green-50 text-ink-700',
  orange: 'bg-orange-50 text-ink-700',
}

/**
 * A full-width band of the page.
 *
 * Bands used to round their own top or bottom corners (`edge`), so one colour
 * curved into the next. That is gone: the curve read as a scoop taken out of
 * the band rather than as a seam, and with every card now carrying a shaped
 * backdrop the page had rounded geometry at two scales competing with each
 * other. Bands meet on a straight line and the shapes inside them do the work.
 *
 * Vertical rhythm is three fixed steps and nothing else. Per-section padding
 * picked by eye is the single biggest reason a page feels assembled from
 * unrelated pieces, and each step is a single clamp rather than a
 * `py-16 sm:py-20 lg:py-24` stack — which is also what makes the rhythm hold at
 * 110% and 125% browser zoom, where the vw term shrinks with the viewport.
 */
export function Section({
  children,
  className,
  tone = 'mist',
  id,
  size = 'default',
  as: Tag = 'section',
  labelledBy,
  divider,
  decor = true,
}: {
  children: ReactNode
  className?: string
  tone?: Tone
  id?: string
  size?: 'sm' | 'default' | 'lg'
  as?: ElementType
  labelledBy?: string
  /**
   * A shaped seam at the foot of this band, painted in the colour of the band
   * below it. `to` names that band's tone; `fill` takes any CSS colour for a
   * ground that is not one of the tones, such as the brand-blue CTA.
   */
  divider?: {
    type?: DividerType
    to?: DividerTone
    fill?: string
  }
  /**
   * The drawn-object layer. On by default: the illustration language is meant
   * to run across the whole site, not only the pages someone remembered to
   * decorate. Pass `false` for a band that already places its own objects.
   *
   * `'centred'` is for a band that centres its content in a full-screen height.
   * There the content rides up into the top padding, so the objects move to the
   * foot of the band, which stays empty at every viewport — see CENTRED_SLOTS.
   */
  decor?: boolean | 'centred'
}) {
  const onDarkTone = tone === 'brand'

  /**
   * A band with a divider reserves the curve's height in its own bottom
   * padding, rather than letting the divider drop a spacer into the flow.
   *
   * The spacer was the first approach and it fails here in a way that is easy
   * to miss: two of these sections are `lg:flex`, and a spacer inside a flex
   * row is laid out *beside* the content, contributing width and no height at
   * all. The curve then painted straight over the bottom of a card. Padding is
   * immune to what `display` the band happens to be using.
   *
   * `calc` on top of the section's own step rather than a replacement for it,
   * so the rhythm of the three padding sizes survives.
   */
  const padStep =
    size === 'sm'
      ? 'var(--spacing-section-sm)'
      : size === 'lg'
        ? 'var(--spacing-section-lg)'
        : 'var(--spacing-section)'

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      style={
        divider
          ? { paddingBottom: `calc(${padStep} + ${DIVIDER_HEIGHT[divider.type ?? 'wave']})` }
          : undefined
      }
      className={cn(
        // `isolate` so the decoration layer's negative z-index stays inside
        // this band instead of escaping to the page ground.
        'relative isolate',
        toneClasses[tone],
        size === 'sm' && 'py-section-sm',
        size === 'default' && 'py-section',
        size === 'lg' && 'py-section-lg',
        className,
      )}
    >
      {decor ? (
        <ObjectScatter
          seed={id ?? labelledBy ?? tone}
          onDark={onDarkTone}
          variant={decor === 'centred' ? 'centred' : 'band'}
          /* Keep the drawings clear of the curve at the foot of the band. */
          floor={divider ? DIVIDER_HEIGHT[divider.type ?? 'wave'] : undefined}
        />
      ) : null}
      {children}
      {/* Last, so it draws over the drawn-object layer: an object floating on
          the seam reads as debris rather than decoration. */}
      {divider ? <SectionDivider {...divider} flush /> : null}
    </Tag>
  )
}

/* ==========================================================================
   Eyebrow + SectionHeader
   ========================================================================== */

export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: ReactNode
  className?: string
  onDark?: boolean
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.16em]',
        onDark ? 'text-orange-300' : 'text-brand-500',
        className,
      )}
    >
      {/* Two-tone on purpose: the label in the primary, the mark in the
          secondary, which is the smallest place the logo's two blues can sit
          side by side. The mark is decoration, so the lighter blue is safe. */}
      <Grain className={cn('shrink-0', onDark ? 'text-orange-400' : 'text-sky-400')} />
      {children}
    </p>
  )
}

/**
 * The standard opening of a section: eyebrow, title, standfirst, and an
 * optional action sitting opposite the text on wide screens.
 *
 * `actions` exists so that a section's primary link no longer has to be dropped
 * underneath the grid as an afterthought. Putting it on the header line is what
 * gives a section a clear "what should I click" answer.
 *
 * MOTION. The four parts arrive in reading order rather than together. This
 * used to be a single `Reveal` around the whole block, which meant the eyebrow,
 * the heading and the standfirst all rose 22px in unison — legible, but it gave
 * the reader nothing to follow, and it was the same gesture in all forty-odd
 * sections on the site.
 *
 * Now the eyebrow resolves quietly, the heading follows as the `lead` element
 * of its section, and the standfirst comes in behind it. The delays are small
 * enough that the whole header is settled inside half a second — this is
 * sequencing to direct the eye, not a queue to sit through.
 */
export function SectionHeader({
  eyebrow,
  title,
  standfirst,
  align = 'left',
  onDark = false,
  className,
  id,
  as: Tag = 'h2',
  children,
  actions,
  splitTitle = false,
}: {
  eyebrow?: string
  title: ReactNode
  standfirst?: ReactNode
  align?: 'left' | 'center'
  onDark?: boolean
  className?: string
  id?: string
  as?: 'h1' | 'h2' | 'h3'
  children?: ReactNode
  actions?: ReactNode
  /**
   * Promotes the title to the word-by-word reveal.
   *
   * One per page at most, on the heading the page is actually about. It is the
   * strongest text entrance in the system and it only means anything while it
   * stays rare — a site where every heading splits is a site where the effect
   * has become the house style for headings, which is the same as having no
   * effect at all.
   */
  splitTitle?: boolean
}) {
  const header = (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
        !actions && className,
      )}
    >
      {eyebrow ? (
        <Reveal tier="quiet" direction="rise">
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      {/* The section's `lead`: the furthest travel and the longest curve of
          anything in the band. `rise` rather than `auto` because a heading is
          the one element whose direction should never depend on where it
          happens to sit — every section on the site opens the same way, and
          that consistency is what makes the sequencing read as a system. */}
      {splitTitle ? (
        <SplitHeading as={Tag} id={id} className={cn('text-h2', onDark && 'text-mist-50')}>
          {title}
        </SplitHeading>
      ) : (
        <Reveal
          as={Tag}
          id={id}
          tier="lead"
          direction="rise"
          delay={0.05}
          className={cn('text-h2', onDark && 'text-mist-50')}
        >
          {title}
        </Reveal>
      )}

      {standfirst ? (
        <Reveal
          delay={0.14}
          className={cn(
            // Capped in characters, not pixels: the type scale is fluid, so a
            // fixed max-width means a different line length at every viewport.
            'max-w-[62ch] text-lead',
            onDark ? 'text-mist-200/90' : 'text-ink-500',
          )}
        >
          {standfirst}
        </Reveal>
      ) : null}

      {children ? <Reveal delay={0.2}>{children}</Reveal> : null}
    </div>
  )

  if (!actions) return header

  return (
    <div
      className={cn(
        'flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12',
        className,
      )}
    >
      {header}
      <Reveal delay={0.26} direction="right" className="shrink-0">
        {actions}
      </Reveal>
    </div>
  )
}

/* ==========================================================================
   Prose: readable long-form body copy.
   ========================================================================== */

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-prose space-y-4 text-body text-ink-500',
        '[&_strong]:font-semibold [&_strong]:text-ink-700',
        '[&_a]:text-brand-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-sky-600',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ==========================================================================
   SourceNote: where a claim on this site comes from.
   The project's honesty bar is explicit - a claim on a search-facing page must
   be verifiably true of actual practice - so citations are shown to parents,
   not hidden in code comments.
   ========================================================================== */

export function SourceNote({
  children,
  className,
  onDark = false,
}: {
  children: ReactNode
  className?: string
  onDark?: boolean
}) {
  return (
    <p
      className={cn(
        'flex gap-2.5 border-l-2 pl-3.5 text-small leading-relaxed',
        onDark ? 'border-orange-400/60 text-mist-200/80' : 'border-sky-300 text-ink-400',
        className,
      )}
    >
      <span>{children}</span>
    </p>
  )
}
