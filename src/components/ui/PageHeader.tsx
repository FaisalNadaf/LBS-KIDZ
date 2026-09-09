import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Container } from './layout'
import { Photo } from '@/components/media/Photo'
import type { PhotoName } from '@/data/media'
import { WheatStalk } from '@/components/art/primitives'
import { ObjectScatter } from '@/components/art/ObjectScatter'
import { SectionDivider, DIVIDER_HEIGHT, type DividerTone } from './SectionDivider'
import { useNavTone } from '@/layouts/nav-tone'

/**
 * The top of every inner page. One component, one height, one type scale.
 *
 * WHY IT IS FIXED AT ~40vh
 * Page headers used to be padding-driven, so their height was whatever their
 * content happened to need — measured at 671px on Admissions and 600px on
 * Contact against a 900px viewport, which is 0.75vh, not 0.4. Two pages that
 * open differently make a site feel like two sites, and a header that eats
 * three-quarters of the first screen pushes the actual page below the fold.
 *
 * So the height is a token (`--page-header-h`, clamp(21rem, 40vh, 27rem)) and
 * the content is budgeted to fit it. The clamp matters as much as the 40vh: a
 * bare percentage collapses under its own text on a short laptop at 125% zoom
 * and becomes a dead band on a tall monitor.
 *
 * WHAT IT WILL AND WILL NOT HOLD
 * Eyebrow, title, standfirst, and at most one action. Chip rows and secondary
 * buttons were the reason headers drifted in height, so they now live in the
 * first section of the page, where they are content rather than chrome.
 *
 * NO VISIBLE BREADCRUMB. It was a third line of chrome above the title on every
 * page, repeating the label the title was about to say — "Home > Campuses" over
 * a heading that reads "Launching Soon in Indore" tells a reader nothing the
 * navbar has not already told them, and it was one of the three things pushing
 * headers to different heights. The `BreadcrumbList` structured data is
 * untouched: it is generated in `lib/Seo.tsx` straight from `pageSeo`, so
 * search engines still get the trail without a parent having to read it.
 *
 * ROOM FOR THE CURVE. The divider at the foot is up to 104px deep and used to
 * be painted straight over the standfirst — measured across eight pages, every
 * one of them had between 11px and 38px of text underneath the curve. The
 * bottom padding now reserves the divider's own height, the same way `Section`
 * does, so the text has somewhere to end.
 *
 * THE PHOTOGRAPH
 * Rendered in `fill` mode, taking its height from the header rather than from
 * its own aspect ratio, so a portrait and a landscape source produce exactly
 * the same header. It dissolves leftward into the indigo through a mask, which
 * is what stops it reading as a rectangle pasted beside the text.
 */
export function PageHeader({
  eyebrow,
  title,
  standfirst,
  actions,
  photo,
  photoAlt,
  photoFocus = '50% 42%',
  dividerTo = 'khadi',
}: {
  eyebrow?: string
  title: ReactNode
  standfirst?: ReactNode
  /** At most one button. More than one and the header stops being 40vh. */
  actions?: ReactNode
  photo?: PhotoName
  photoAlt?: string
  photoFocus?: string
  /**
   * The tone of the page's first band. The header closes into it along a
   * curve, so this has to match or the seam shows a third colour.
   */
  dividerTo?: DividerTone
}) {
  /**
   * This header is deep blue, so the navbar must draw itself light-on-dark
   * until the reader scrolls past it.
   *
   * The tone is claimed on mount and handed back on unmount rather than reset
   * from the layout on every route change: child effects run before parent
   * effects, so a reset in the layout would fire after this one and silently
   * win, leaving the wordmark and menu button invisible on dark.
   */
  const { setTone } = useNavTone()
  useEffect(() => {
    setTone('dark-hero')
    return () => setTone('light-hero')
  }, [setTone])

  /**
   * The seed for the drawn objects. The path rather than the title, because the
   * title is a ReactNode and may be a fragment with a line break in it, and
   * because two pages that happen to share an eyebrow should still open with
   * different drawings.
   */
  const { pathname } = useLocation()

  return (
    <header
      className={cn(
        'relative isolate flex flex-col justify-center overflow-hidden',
        'min-h-[var(--page-header-h)] bg-indigo-ink-700 text-khadi-100',
        'pt-[calc(var(--nav-h)+1.25rem)]',
      )}
      /* The curve's own height, plus the band's padding. Inline rather than a
         class because `DIVIDER_HEIGHT` is a clamp() and there is no utility
         that adds one to a spacing step. */
      style={{ paddingBottom: `calc(2rem + ${DIVIDER_HEIGHT.asymmetric})` }}
    >
      {/* ---- Photograph, filling the whole band ----
          It used to occupy the right 46% and fade out leftwards through a mask,
          which left the other half a flat indigo panel and drew a visible seam
          down the middle of every header on the site. Full-bleed, the band is
          one picture and the words sit on it.

          `-z-20` is safe here in a way it was not in the homepage hero: this
          header is `isolate`, so a negative index stays inside it instead of
          escaping behind the band's own fill. It sits below the faint circles
          and the wheat stalk at `-z-10`, which is the layering the band already
          had.

          TWO SCRIMS, because the type is light-on-dark and the photographs are
          not. A flat wash sets a floor dark enough for `khadi` text anywhere in
          the band, and a left-to-right gradient deepens it under the column
          where the eyebrow, title and standfirst actually are. The right side
          stays lightest, so the picture is still legible as a picture. */}
      {photo ? (
        <div
          className="absolute inset-0 -z-20"
          data-reveal="clip"
          data-reveal-tier="lead"
          data-reveal-delay="0.06"
        >
          <Photo
            name={photo}
            alt={photoAlt}
            fill
            sizes="100vw"
            focus={photoFocus}
            className="size-full"
          />
          {/* The two scrims split by breakpoint, because the text does not sit
              in the same place at both.

              Below `lg` the column runs the full width, so the whole band needs
              an even wash and the picture can only ever be a texture under the
              words. That floor is set by the eyebrow, not the title: it is
              `haldi-300` at 12px, so it needs 4.5:1 where the title needs 3,
              and at the first setting it came in at 3.2 on two headers. From `lg` the text is capped at 46% and the right side is
              free: the gradient goes fully opaque under the column and clears
              completely off the right edge, so the photograph is a photograph
              there rather than a tint.

              The first version washed the entire band at 64-72% and then laid a
              gradient bottoming out at 25% on top, which left even the lightest
              corner at about 73% indigo. Every header looked like the same blue
              panel with a hint of something behind it. */}
          <div
            className="pointer-events-none absolute inset-0 bg-indigo-ink-700/72 lg:bg-indigo-ink-700/28"
            aria-hidden="true"
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-0 bg-linear-to-r',
              'from-indigo-ink-700/88 via-indigo-ink-700/72 to-indigo-ink-700/45',
              'lg:from-indigo-ink-700 lg:via-indigo-ink-700/82 lg:to-transparent',
            )}
            aria-hidden="true"
          />
        </div>
      ) : null}

      {/* ---- Quiet geometry, so a photo-less header is never an empty band ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-28 -top-28 size-[26rem] rounded-full border border-khadi-100/[0.07]" />
        <div className="absolute -bottom-40 left-[8%] size-[22rem] rounded-full border border-khadi-100/[0.06]" />
        <div className="absolute -left-8 bottom-0 h-44 text-khadi-100/[0.07] motion-safe:animate-drift">
          <WheatStalk />
        </div>
      </div>

      {/* ---- The drawn objects, the same ones every band carries ---- */}
      <ObjectScatter
        seed={pathname}
        variant={photo ? 'header' : 'headerOpen'}
        onDark
        floor={DIVIDER_HEIGHT.asymmetric}
      />

      <Container size="wide" className="relative">
        <div className={cn('max-w-2xl', photo && 'lg:max-w-[46%]')}>
          {eyebrow ? (
            <p
              className="mb-3 text-2xs font-semibold uppercase tracking-[0.18em] text-haldi-300"
              data-reveal="rise"
              data-reveal-tier="quiet"
              data-reveal-delay="0.04"
            >
              {eyebrow}
            </p>
          ) : null}

          {/* The page's `lead`, and the only place on the site that uses the
              blur variant. A page title is the one heading big enough for the
              softness to read as focus pulling in rather than as a smear, and
              there is exactly one per route — this is deliberately not
              available to anything that appears in quantity. */}
          <h1
            className="text-h1 text-khadi-50"
            data-reveal="blur"
            data-reveal-tier="lead"
            data-reveal-delay="0.1"
          >
            {title}
          </h1>

          {/* The standfirst is capped in characters as well as by the column,
              so a two-line block stays two lines whatever the fluid type scale
              does at a given viewport. Headers only read as one family if their
              text blocks are the same shape. */}
          {standfirst ? (
            <div
              className="mt-4 max-w-[52ch] text-lead text-khadi-200/90"
              data-reveal="rise"
              data-reveal-delay="0.22"
            >
              {standfirst}
            </div>
          ) : null}

          {actions ? (
            <div className="mt-6" data-reveal="rise" data-reveal-delay="0.32">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>

      {/* The deep blue hands over to the page below it. Held constant across
          every inner page: this seam is the site's opening move, and a
          different shape per route would read as inconsistency rather than as
          variety. `flush` because the header's height is budgeted to 40vh and a
          spacer would push the title off centre; the band's own `pb-8` leaves
          the curve its room. */}
      <SectionDivider type="asymmetric" to={dividerTo} flush />
    </header>
  )
}
