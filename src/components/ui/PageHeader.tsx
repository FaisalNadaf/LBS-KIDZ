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
 * the same header. It dissolves leftward into the deep blue through a mask, which
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
  dividerTo = 'mist',
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
        'on-dark min-h-[var(--page-header-h)] bg-brand-700 text-mist-100',
        /* A header with no photograph is the only place the band is seen
           whole, so it carries the deep brand gradient instead of a flat fill.
           With a photograph the scrims are drawn in the flat 700 and the
           gradient would show a seam against them. */
        !photo && 'bg-gradient-brand-deep',
        'pt-[calc(var(--nav-h)+1.25rem)]',
      )}
      /* The curve's own height, plus the band's padding. Inline rather than a
         class because `DIVIDER_HEIGHT` is a clamp() and there is no utility
         that adds one to a spacing step. */
      style={{ paddingBottom: `calc(2rem + ${DIVIDER_HEIGHT.asymmetric})` }}
    >
      {/* ---- Photograph ----
          `-z-20` is safe here in a way it was not in the homepage hero: this
          header is `isolate`, so a negative index stays inside it instead of
          escaping behind the band's own fill. It sits below the faint circles
          and the wheat stalk at `-z-10`, which is the layering the band already
          had.

          THE BOX IS SHAPED FOR THE PICTURE, NOT FOR THE BAND. Full-bleed, the
          box was the whole band — about 4:1 on a desktop — and `cover` could only
          fill that by keeping a thin horizontal strip of the source. Every
          header ran portrait photographs, so the strip was a pair of eyes, or
          half a face, blown up to twice its resolution. Nothing about the
          choice of picture could survive that shape.

          So from `lg` the photograph starts 16% in from the left, about 3.2:1 at
          1920 and 1.9:1 at 1024 — wide enough to run on under the text, narrow
          enough that a landscape source keeps everyone's head. It is thinned
          rather than cut towards its left edge and under the navbar
          (`mask-page-header`), so the picture carries on faintly behind the
          words under a light blue overlay instead of stopping at a seam. The
          sources are landscape too, and the focus is set per page.

          Below `lg` the column is full width, so the photograph is full-bleed
          under an even wash and is only ever a texture behind the words. */}
      {photo ? (
        <div
          className="absolute inset-0 -z-20"
          data-reveal="clip"
          data-reveal-tier="lead"
          data-reveal-delay="0.06"
        >
          <div className="absolute inset-0 lg:left-[16%] lg:mask-page-header">
            <Photo
              name={photo}
              alt={photoAlt}
              fill
              /* On a phone `cover` scales the landscape source to the band's
                 height, so it renders well over the viewport's width. */
              sizes="(min-width: 1024px) 84vw, (min-width: 640px) 100vw, 160vw"
              focus={photoFocus}
              className="size-full"
            />
          </div>

          {/* The scrims split by breakpoint, because the text does not sit in
              the same place at both. They are positioned against the band, not
              the photograph's box, so their stops line up with the text column.

              Below `lg` the column runs the full width, so the whole band needs
              an even wash. That floor is set by the eyebrow, not the title: it
              is `orange-300` at 12px, so it needs 4.5:1 where the title needs 3,
              and at the first setting it came in at 3.2 on two headers.

              From `lg` the text is capped at 46% of the container, and the
              overlay is light: it never goes solid, so the thinned picture still
              shows through under the words, and it is clear by 70% so the right
              of the band is the photograph at full strength. Its stops are set by
              measurement against the brightest source in the set (a white studio
              wall), not by eye — see the note on `mask-page-header`. */}
          <div
            className="pointer-events-none absolute inset-0 bg-brand-700/72 lg:bg-transparent"
            aria-hidden="true"
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-0 bg-linear-to-r',
              'from-brand-700/88 via-brand-700/72 to-brand-700/45',
              'lg:from-brand-800/80 lg:via-brand-700/64 lg:via-42% lg:to-transparent lg:to-70%',
            )}
            aria-hidden="true"
          />
        </div>
      ) : null}

      {/* ---- Quiet geometry, so a photo-less header is never an empty band ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-28 -top-28 size-[26rem] rounded-full border border-mist-100/[0.07]" />
        <div className="absolute -bottom-40 left-[8%] size-[22rem] rounded-full border border-mist-100/[0.06]" />
        <div className="absolute -left-8 bottom-0 h-44 text-mist-100/[0.07] motion-safe:animate-drift">
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
              className="mb-3 text-2xs font-semibold uppercase tracking-[0.18em] text-orange-300"
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
            className="text-h1 text-white"
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
              className="mt-4 max-w-[52ch] text-lead text-mist-100"
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
