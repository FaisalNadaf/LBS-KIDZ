import { useRef } from 'react'
import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { articleSchema } from '@/lib/schema'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card, cardBackdropCycle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { useDrawPath } from '@/animations/gsap'
import { WheatStalk } from '@/components/art/primitives'
import { Book, Leaf, Rainbow, Star } from '@/components/art/objects'
import { Float } from '@/animations/Scroll'
import { legacyIntro, legacyMoments, legacyToValues, wheatMotif } from '@/data/legacy'
import { routes } from '@/data/routes'
import { cn } from '@/lib/cn'
import { PhotoOnColour, ShapedPhoto } from '@/components/media/Photo'

/**
 * LBS Legacy: "the story of Shri Lal Bahadur Shastri himself".
 * Source: Website Reference Document S6; Project Decisions Log S3.
 *
 * Keyword discipline: Tier E brand terms with light Tier D presence only.
 * "Legacy content stays as designed; light Tier D keyword presence, not
 *  Tier A/B."  Source: Keyword & AEO Strategy S3.
 *
 * The narrative copy for this page is an open item in the source documents
 * ("Page-wise website content drafting - To be scheduled, starting with Home
 *  and LBS Legacy"), so what appears here is limited to widely documented
 * public history and is marked for family review before go-live.
 */
export function LegacyPage() {
  return (
    <>
      <Seo
        page={pageSeo.legacy}
        schemas={[
          articleSchema({
            headline: 'The Lal Bahadur Shastri legacy',
            description: pageSeo.legacy.description,
            path: pageSeo.legacy.path,
            section: 'Shastri Ji Legacy'
          }),
        ]}
      />

      <PageHeader
        eyebrow={legacyIntro.eyebrow}
        title={legacyIntro.headline}
        /* `legacyIntro.standfirst` in full still opens the section below. */
        standfirst="We carry the name of Shri Lal Bahadur Shastri as a standard to be held to, not as decoration."
        photo="wheat-sunrise"
      />

      <TimelineSection />

      <Section tone="white" labelledBy="legacy-values-title" divider={{ type: 'reverse', to: 'terracotta' }}>
        <Container size="wide">
          {/* Centred, now that the right-hand column is a compact acronym strip
              rather than six paragraph cards. Top-aligned it left the strip
              floating against a much taller block of text. */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                id="legacy-values-title"
                eyebrow="From a life to a values framework"
                title={legacyToValues.headline}
                standfirst={legacyToValues.body}
              />
            </div>

            {/* Narrower than the text column, and capped, because it is an
                illustration and not the argument. At `col-span-7` and 4:3 it
                rendered 711 wide by 533 tall against a 309-tall paragraph:
                nearly twice the height of the thing it was supporting, and the
                first thing the eye landed on. A 3:2 crop inside a 34rem ceiling
                brings it to roughly the height of the copy, which is where an
                illustration belongs. The cap sits on the column so the link
                below lines up with the picture instead of drifting wide. */}
            <div className="lg:col-span-6 lg:col-start-7 lg:ml-auto lg:max-w-[34rem]">
              {/* A photograph rather than the acronym. The section's argument
                  is that a value only means anything once it is shown as a
                  story a child can follow, so a picture of exactly that does
                  more work here than six letters, and the letters were the
                  third time the framework appeared on the site. */}
              <Reveal direction="clip" tier="lead">
                {/* A parent reading to a small child. The paragraph beside
                    it says a value is shown as a story rather than stated as a
                    rule, and this is that sentence as a picture. The previous
                    choice was a group of older schoolchildren around a guide in
                    a museum, which is a school trip, not a value being passed
                    on. */}
                <ShapedPhoto
                  name="parent-and-child"
                  shape="cut"
                  interactive
                  sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 44vw, 92vw"
                  ratio="3 / 2"
                  focus="50% 45%"
                />
              </Reveal>

              <Reveal className="mt-8">
                {/* Shortened to fit the narrowed column on one line. The
                    arrow is a flex sibling of the label, so a wrapped label
                    leaves it marooned at the far right of the block: measured,
                    460px past the end of the second line. This is the only
                    wrapping TextLink on the site. */}
                <TextLink to={routes.lbsWay}>
                  The full framework: SIMPLE and Shastri Sanskaar
                </TextLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="terracotta" labelledBy="motif-title" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="wide">
          {/* Picture first, then the explanation. The section's whole claim is
              that the mark on this site was taken from a real thing, and the
              argument is far easier to make with the real thing next to the
              drawing than with the drawing alone. The photograph carries the
              left column and the line-drawn stalk sits on its corner, so the
              two are read as one object: this ear, and what we drew from it. */}
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal direction="right" tier="lead" className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
                <PhotoOnColour
                  name="wheat-field"
                  shape="leaf"
                  colour="haldi"
                  depth="plate"
                  lean="left"
                  sizes="(min-width: 1024px) 38vw, 88vw"
                  ratio="3 / 2"
                />

                {/* The drawing, as a seal on the photograph. Small and offset
                    onto the corner rather than beside it: at the same visual
                    weight the two would compete, and the point is that one
                    came from the other. */}
                <span
                  className="absolute -bottom-6 -right-3 grid size-24 place-items-center rounded-full bg-khadi-50 text-neem-500 shadow-lift ring-1 ring-neem-200 sm:-right-6 sm:size-28"
                  aria-hidden="true"
                >
                  <span className="h-14 sm:h-16">
                    <WheatStalk />
                  </span>
                </span>
              </div>

              {/* Visible attribution, which this photograph actually requires.
                  Every other picture on the site is Unsplash or Pexels, whose
                  licences ask for no credit line, so provenance lives quietly
                  in image-credits.json. This one is CC BY-SA 4.0: crediting the
                  photographer and naming the licence is a condition of using
                  it, not a courtesy, and a record in a JSON file the reader
                  never sees does not satisfy it. */}
              <p className="mt-9 text-2xs leading-relaxed text-ink-400 sm:mt-8">
                Photograph by A S M Jobaer,{' '}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0"
                  className="underline decoration-ink-400/40 underline-offset-2 hover:text-ink-500"
                  rel="license noopener noreferrer"
                  target="_blank"
                >
                  CC BY-SA 4.0
                </a>
                , via Wikimedia Commons.
              </p>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeader
                id="motif-title"
                eyebrow="The motif"
                title={wheatMotif.headline}
                standfirst={wheatMotif.body}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */

/**
 * The life, as a curve rather than a column.
 *
 * WHY THE SPINE IS SEGMENTED. The obvious build is one long SVG behind the
 * whole list, and it does not survive contact with real content: the rows are
 * different heights, so a single path's control points can only be guessed at
 * and the curve drifts away from the milestones it is supposed to pass through.
 * Each row draws its own segment instead, filling that row's box exactly. Every
 * segment enters at the horizontal centre and leaves at the horizontal centre,
 * so they join seamlessly however tall any individual row turns out to be, and
 * a milestone is always on the curve because the curve is measured from it.
 *
 * `preserveAspectRatio="none"` lets one 100x100 path stretch to whatever the
 * row is, and `vector-effect="non-scaling-stroke"` is what stops that stretch
 * from also stretching the line: without it a tall row draws a spine several
 * times thicker than a short one.
 *
 * BELOW `lg` THERE IS NO CURVE. A weave needs two columns to weave between; in
 * one narrow column it is a wobble with nothing on either side of it. Small
 * screens get the same content as a straight stack, which is what the layout
 * actually is at that width.
 */
function TimelineSection() {
  return (
    <Section
      tone="khadi"
      as="section"
      labelledBy="timeline-title"
      className="overflow-hidden"
      divider={{ type: 'gentle', to: 'white' }}
    >
      <Container size="wide">
        <SectionHeader
          id="timeline-title"
          eyebrow="A short life, plainly told"
          title="Four things worth knowing"
        />

        <ol className="relative mt-block">
          {legacyMoments.map((moment, i) => (
            <TimelineRow
              key={moment.year}
              moment={moment}
              index={i}
              last={i === legacyMoments.length - 1}
            />
          ))}
        </ol>
      </Container>
    </Section>
  )
}

/**
 * One milestone: a curve segment, a marker sitting on it, and a card opposite.
 *
 * The card alternates sides and the curve always bulges away from it, so the
 * two never fight for the middle of the row. `nodeX` is the cubic evaluated at
 * its midpoint, which is where the marker goes, so the marker is on the line by
 * construction rather than by a number someone nudged until it looked right.
 */
/**
 * One drawing per milestone, in order. Hand-picked rather than dealt from the
 * `ObjectScatter` deck, because these four sit in a fixed column down one side
 * of the page and a reader compares them to each other: they need to be four
 * obviously different objects, which a deck cursor cannot promise.
 */
const TIMELINE_ART = [Book, Star, Rainbow, Leaf]

function TimelineRow({
  moment,
  index,
  last
}: {
  moment: (typeof legacyMoments)[number]
  index: number
  last: boolean
}) {
  const rowRef = useRef<HTMLLIElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const beadRef = useRef<SVGPathElement>(null)
  // Same offset for both, so this segment finishes drawing at exactly the
  // point the next one starts. See `useDrawPath`.
  useDrawPath(pathRef, rowRef, { start: 'top 88%', end: 'bottom 88%', head: beadRef })

  // Even rows put the card on the left, so the curve leans right.
  const cardLeft = index % 2 === 0
  /**
   * How far the curve leans, in viewBox units, and with it where the year sits.
   *
   * The bulge used to be 10 units, which put the year at 57.5% while the card
   * ended at 40%: a milestone and its own date separated by a seventh of the
   * page, with nothing in between. The eye had to travel the gap to pair them,
   * which is the one job a timeline has. At 6.5 the curve still visibly weaves
   * and the year lands about two percent clear of the card edge, so the date
   * reads as belonging to the card beside it.
   */
  const bulge = 6.5
  const cx = cardLeft ? 50 + bulge : 50 - bulge
  const d = `M50 0 C ${cx} 22, ${cx} 78, 50 100`
  // Cubic at t = 0.5: (P0 + 3P1 + 3P2 + P3) / 8, which reduces to the midpoint
  // of the ends plus three quarters of the lean.
  const nodeX = 50 + (cardLeft ? 1 : -1) * bulge * 0.75
  const TimelineArt = TIMELINE_ART[index % TIMELINE_ART.length]

  return (
    <li
      ref={rowRef}
      className="relative grid items-center gap-y-4 py-4 lg:min-h-[13.5rem] lg:grid-cols-12 lg:gap-x-6 lg:py-0"
    >
      {/* ---- The curve ---- */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="var(--color-terracotta-300)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* The bead that rides the drawing head. Same `d`, so it cannot drift
            off the line; `non-scaling-stroke` is what keeps it a circle despite
            the viewBox being stretched to the row's aspect ratio. */}
        <path
          ref={beadRef}
          d={d}
          fill="none"
          stroke="var(--color-terracotta-500)"
          strokeWidth="9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0"
        />
      </svg>

      {/* ---- The marker, on the curve ---- */}
      <span
        className="pointer-events-none absolute top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        style={{ left: `${nodeX}%` }}
        aria-hidden="true"
      >
        {/* `as="span"`: this sits inside a span, and a div here would be
            invalid markup inside the marker. Scaling in rather than sliding,
            because it belongs to the point on the line underneath it and
            anything that travels would leave that point. */}
        <Reveal as="span" direction="scale" className="block">
          <span className="font-numeral inline-flex items-center rounded-full bg-khadi-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-600 shadow-card ring-1 ring-terracotta-200">
            {moment.year}
          </span>
        </Reveal>
      </span>

      {/* ---- The empty side ----
              A drawn object, not a photograph. The obvious way to fill this
              column is a picture, and there is no honest one to use: these are
              milestones from 1904 to 1966, and the site's photography is
              present-day stock of other people's children. Putting one beside
              "Born in Mughalsarai" would read as a historical image, which is
              exactly the overclaim this project rules out. A drawing from the
              site's own set carries no such implication. ---- */}
      <div
        className={cn(
          'pointer-events-none hidden lg:col-span-3 lg:block',
          cardLeft ? 'lg:col-start-10' : 'lg:col-start-1 lg:justify-self-end',
        )}
        aria-hidden="true"
      >
        <Float index={index} y={9} rotate={index % 2 ? -4 : 4}>
          <TimelineArt className="h-20 opacity-80" />
        </Float>
      </div>

      {/* ---- The card ---- */}
      <Reveal
        direction={cardLeft ? 'left' : 'right'}
        className={cn('lg:col-span-6', cardLeft ? 'lg:col-start-1' : 'lg:col-start-7')}
      >
        <Card backdrop={cardBackdropCycle[index % cardBackdropCycle.length]}>
          {/* The year again, for small screens, where the marker on the curve
              is not rendered and would otherwise take the date with it. */}
          <span className="font-numeral text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-600 lg:hidden">
            {moment.year}
          </span>
          <h3 className="mt-1 font-display text-h3 font-semibold text-indigo-ink-700 lg:mt-0">
            {moment.title}
          </h3>
          <p className="mt-2.5 max-w-prose text-body text-ink-500">{moment.body}</p>
        </Card>
      </Reveal>

      {/* The tail below the final card, so the spine ends on the curve rather
          than being cut off square at the last row's edge. */}
      {last ? (
        <span
          className="absolute left-1/2 top-full hidden h-10 w-px -translate-x-1/2 bg-linear-to-b from-terracotta-300 to-transparent lg:block"
          aria-hidden="true"
        />
      ) : null}
    </li>
  )
}

export default LegacyPage
