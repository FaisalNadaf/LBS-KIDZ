import { Link } from 'react-router-dom'
import {
  Blocks,
  Check,
  HeartHandshake,
  Languages,
  MapPin,
  Minus,
  Music2,
  ShieldCheck,
  Sprout,
  Users,
} from 'lucide-react'
import { Container, Eyebrow, Section, SectionHeader } from '@/components/ui/layout'
import { SectionDivider, CTA_SEAM } from '@/components/ui/SectionDivider'
import {
  Card,
  cardShapeCycle,
  Chip,
  ColourPanel,
  FeatureChip,
  QuoteCard,
  cardBackdropCycle
} from '@/components/ui/Card'
import { ButtonLink, TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { ParallaxPhoto, Drift, TextReveal } from '@/animations/Scroll'
import { ShapedPhoto } from '@/components/media/Photo'
import { VideoOnColour } from '@/components/media/Video'
import { WheatStalk } from '@/components/art/primitives'
import { Sparks } from '@/components/art/objects'
import { DealtObject } from '@/components/art/ObjectScatter'
import { cn } from '@/lib/cn'
import { routes } from '@/data/routes'
import { primaryCta, SITE_PHASE } from '@/data/site'
import {
  brandLayerIntro,
  curriculumPreview,
  deliberateChoices,
  differentiator,
  foundersNoteTeaser,
  parityLayer,
  positioningPillars,
  reassurance,
  whyLbsKidz,
  type PositioningPillar,
} from '@/data/positioning'
import { littleKarmayogis, sankalpCalendar } from '@/data/brand-framework'
import { PillarStrip } from '@/sections/shared/PillarStrip'
import { zones, campusPhaseState } from '@/data/campuses'
import { dailySchedule } from '@/data/curriculum'
import { legacyStrip, legacyMoments } from '@/data/legacy'
import { valueStories } from '@/data/parents'

/**
 * The homepage, below the fold.
 *
 * Two rules shape every section here.
 *
 * 1. No section repeats the layout of the one before it. A page of identical
 *    three-column card grids reads as a template no matter how good the cards
 *    are, so each block earns its own arrangement: a sticky column beside a
 *    stack, a bento with one dominant tile, a full-bleed photograph, a
 *    two-column ledger. The content decides which.
 *
 * 2. Bands hand over to each other. Alternating flat colours with hard
 *    horizontal seams is the other half of the "assembled from parts" problem,
 *    so sections curve into one another (`edge`), photographs bleed across the
 *    join, and the palette moves mist → white → brand → sky in a
 *    deliberate order rather than at random.
 *
 * Photographs are real children; none is claimed as ours anywhere in the copy.
 * See docs/decisions-and-todos.md item C-04.
 */

/* ==========================================================================
   1. Trust: the three decisions that actually differentiate

   Layout: a two-column zigzag, sized to one screen from `lg` up. The heading
   takes the first cell and the three pillars alternate sides down the page,
   with two photographs filling the cells they leave empty. The eye crosses the
   page three times instead of running down one gutter — the rhythm
   `ContentImageSection` gets from alternating `side`, but sustained over three
   beats.

   This replaced a sticky header beside a single stack. The stack was the more
   obvious reading of "three points", but it put all three pillars in one
   column at the same width and weight, which is exactly the undifferentiated
   list the sticky column was there to compensate for.

   FITTING ONE SCREEN is what sets the sizes here, and it is tight: three rows
   plus two gutters inside `100svh` minus the navbar and the section's own
   padding leaves roughly 215px a row at 1440x900. That is the whole reason the
   cards carry their own padding rather than the default, the bodies are set at
   `small`, and the photographs are cinematic from `lg` — a 3:2 crop is 400px
   tall on its own and blows the budget in one cell. Below `lg` none of it
   applies: the column stacks and scrolls like any other section.

   TWO COLOURS, NOT SIX. An earlier pass had a terracotta marker, an indigo
   marker, a neem marker, a haldi mat around one photograph and a neem mat
   around the other — five accents competing inside one screen, over a sixth
   from whatever the photographs themselves were wearing. The section now runs
   on a pale card against white ground, with the brand blue as the single accent:
   the numerals index the pillars on their own, and the photographs are matted
   in nothing at all.
   ========================================================================== */

/**
 * The six cards' icons, keyed by the `icon` name each pillar carries.
 *
 * Kept here rather than in the data file because it is a rendering decision:
 * the content layer names a concept, this layer picks the glyph for it, and
 * swapping icon sets should not mean touching the copy.
 */
const whyIcons = {
  legacy: Users,
  values: HeartHandshake,
  safety: ShieldCheck,
  learning: Blocks,
  language: Languages,
  growth: Sprout,
} as const

/**
 * The corner each card leads with.
 *
 * An earlier pass cut a concave notch out of the corner facing the next card,
 * on the theory that the bites would trace the reading path and make the cards
 * read as pieces of one sheet. They did not: with a photograph sitting between
 * any two cards there is nothing to fill a concave corner, so each one read as
 * a chunk taken out of the card rather than as a join, which is the opposite of
 * what it was for. A concave corner only says "joined" when the neighbour's
 * convex corner sits in it.
 *
 * What replaces it says the same thing with convex geometry: each card takes
 * one corner all the way round, so the set leads into itself across the grid.
 * Nothing is removed from the card, so nothing can look damaged.
 */
const pillarShapes = [
  'rounded-xl rounded-bl-[3rem]',
  'rounded-xl rounded-br-[3rem]',
  'rounded-xl rounded-tl-[3rem]',
  'rounded-xl rounded-tr-[3rem]',
] as const

/**
 * Section 3 of the Home specification: "Why LBS KidZ", six icon-led cards under
 * the heading "A Foundation Strong Enough to Last a Lifetime".
 *
 * WHY IT IS A BENTO OF EIGHT AND NOT A GRID OF SIX. The specification asks for
 * six cards and generous white space; the band also has to carry the page's
 * first two photographs, which used to sit inside a three-card zigzag that
 * cannot survive the count doubling. Six cards and two pictures is eight cells,
 * which is exactly two rows of four, and putting one photograph at the end of
 * the first row and the other at the head of the second gives the block its
 * diagonal without a single explicit grid placement.
 *
 * THE ONE-SCREEN CONSTRAINT IS GONE, deliberately. The old three-card layout
 * was sized to fit `100svh`; six cards cannot, and the only way to pretend
 * otherwise is to set the copy small enough that nobody reads it.
 */
export function PositioningSection() {
  return (
    <Section
      tone="white"
      id="why-lbs-kidz"
     
      labelledBy="why-lbs-kidz-title"
      divider={{ type: 'asymmetric', to: 'brand' }}
      /* The standard decor set sits at `left-[11%] top-4`, which lands on the
         eyebrow. `'centred'` moves it into the foot of the band, which stays
         empty at every viewport. */
      decor="centred"
      /* The cards and photographs enter from the left and the right, and a
         horizontal entrance translate is added to the document's scroll width
         while it runs: 2px of transient sideways scroll on a phone. `clip`
         rather than `hidden`, which would make this a scroll container. */
      className="overflow-x-clip"
    >
      <Container size="wide">
        <SectionHeader
          id="why-lbs-kidz-title"
          eyebrow={whyLbsKidz.eyebrow}
          title={whyLbsKidz.headline}
          standfirst={whyLbsKidz.standfirst}
        />

        <RevealGroup
          className="mt-block grid gap-gutter sm:grid-cols-2 lg:grid-cols-4"
          each={0.07}
        >
          {positioningPillars.slice(0, 3).map((pillar, i) => (
            <RevealItem key={pillar.slug} className="h-full">
              <WhyCard pillar={pillar} index={i} />
            </RevealItem>
          ))}

          {/* A horizontally composed picture, which is what this cell wants:
              three children in a row, so it fills the width it is given.
              `focus` sits above centre because the crop keeps the faces in the
              top half of the frame. */}
          <RevealItem className="sm:col-span-2 lg:col-span-1" direction="right">
            <VideoOnColour
              name="children-classroom-play"
              shape="leaf"
              colour="green"
              ratioClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
              focus="50% 40%"
              className="h-full"
            />
          </RevealItem>

          <RevealItem className="sm:col-span-2 lg:col-span-1" direction="left">
            <VideoOnColour
              name="child-painting"
              shape="leaf-alt"
              colour="sky"
              ratioClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
              focus="50% 45%"
              className="h-full"
            />
          </RevealItem>

          {positioningPillars.slice(3).map((pillar, i) => (
            <RevealItem key={pillar.slug} className="h-full">
              <WhyCard pillar={pillar} index={i + 3} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

/** One of the six: icon, short title, one line, in that order. */
function WhyCard({ pillar, index }: { pillar: PositioningPillar; index: number }) {
  const Icon = whyIcons[pillar.icon as keyof typeof whyIcons] ?? Sprout

  return (
    <Card
      tone="mist"
      padded={false}
      backdrop={cardBackdropCycle[index % cardBackdropCycle.length]}
      className={cn(
        'flex h-full flex-col p-5 sm:p-6',
        pillarShapes[index % pillarShapes.length],
      )}
    >
      <span
        className="mb-4 grid size-11 shrink-0 place-items-center rounded-xl bg-mist-50 text-brand-600 shadow-soft"
        aria-hidden="true"
      >
        <Icon className="size-5" strokeWidth={1.9} />
      </span>
      <h3 className="font-display text-h4 font-semibold text-brand-700">{pillar.label}</h3>
      {/* Capping the measure is most of what stops a row of six reading as a
          wall of text. */}
      <p className="mt-2 max-w-[42ch] text-small leading-relaxed text-ink-600">{pillar.body}</p>
    </Card>
  )
}

/* ==========================================================================
   2. What sets this apart: the differentiator, stated plainly

   Layout: deep blue. The headline and its action sit top left, a wide
   photograph fills the top right, and the ledger runs underneath as four cards
   across the full width.

   WHY IT IS NO LONGER TWO COLUMNS. The ledger used to be a stack of four rows
   in a right-hand column beside the text. Read down a narrow column, the four
   rows became a list — and a list is skimmed. Laid out across the band each
   choice is a card the eye stops on, and the four read as four decisions rather
   than as four bullets. It also fixed the section's oldest layout problem: a
   column of rows whose natural height never matched the column beside it, which
   is what the old `justify-between` and its comment about dead navy were for.

   WHY THE FOUR CARDS ARE FOUR DIFFERENT SHAPES. Four identical rounded
   rectangles in a row read as one control repeated, and the eye moves along
   them without stopping. Four silhouettes from the house vocabulary — the
   dome, the two leaves, the cut corner — give each decision its own outline
   while staying inside a language the photographs and buttons already speak.
   ========================================================================== */

/**
 * The four silhouettes, in the order the ledger uses them.
 *
 * `pad` travels with the shape because it has to: `shape-arch` takes its top
 * corners all the way round, so a flat `p-6` puts the first line of text inside
 * the curve. The dome gets its top padding opened up; the other three do not
 * need it.
 */
const ledgerShapes = [
  { pad: 'p-5' },
  { pad: 'p-5' },
  { pad: 'p-5' },
  { pad: 'p-5' },
] as const

export function DifferentiatorSection() {
  return (
    <Section
      tone="brand"
      id="why"
     
      labelledBy="why-title"
      /* This band held 880px against a 900px viewport — a whole screen for a
         heading, one picture and four short cards, most of it air. The small
         padding step, a wider photograph and a tighter gap under the top row
         bring it to roughly four-fifths of a screen without touching the
         content or the type. */
      size="sm"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <Drift y={70} className="absolute -right-16 top-10 hidden h-72 text-mist-100/5 sm:block">
          <WheatStalk />
        </Drift>
      </div>

      <Container size="wide" className="relative">
        {/* ---- Headline left, photograph right ----
             `items-stretch`, not `items-center`: the heading column is the
             taller of the two, and centring the picture against it left a
             hundred pixels of empty navy above and below the crop. Stretched,
             the photograph is exactly as tall as the words beside it and the
             row has no slack in it at all. */}
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            {/* The homepage's one split heading. This is the band that makes
                the site's actual argument, so it gets the strongest text
                entrance on the page and nothing else does. */}
            <SectionHeader
              id="why-title"
              eyebrow={differentiator.eyebrow}
              title={differentiator.headline}
              standfirst={differentiator.body}
              splitTitle
              onDark
            />
          </div>

          <Reveal className="lg:col-span-7" delay={0.12}>
            <ShapedPhoto
              name="project-model"
              shape="cut"
              interactive
              sizes="(min-width: 1024px) 56vw, 90vw"
              /* `h-full` from lg, so the crop follows the row rather than
                 setting it. The aspect ratio still governs on a phone, where
                 the two stack and there is no row to fill. */
              ratioClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
            />
          </Reveal>
        </div>

        {/* ---- The ledger, four across ----
             The legacy link moved out of the heading column and onto this line.
             It cost 84px of column height where it was, and it reads better
             here anyway: the eyebrow says what the row is, the link says where
             to go next, and they sit on one line instead of two blocks. */}
        <div className="mt-7 lg:mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <Eyebrow onDark>What we chose instead</Eyebrow>
            <ButtonLink to={routes.legacy} variant="onDark" withArrow>
              Read the legacy
            </ButtonLink>
          </div>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" each={0.07}>
            {deliberateChoices.map((choice, i) => {
              const { pad } = ledgerShapes[i % ledgerShapes.length]
              return (
                <RevealItem key={choice.avoided} className="h-full">
                  <Card
                    tone="brand"
                    padded={false}
                    shape={cardShapeCycle[i % cardShapeCycle.length]}
                    backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                    className={cn('flex h-full flex-col', pad)}
                  >
                    <p className="flex items-start gap-2.5 text-small text-mist-300 line-through decoration-coral-300 decoration-2">
                      <Minus className="mt-0.5 size-4 shrink-0 no-underline" aria-hidden="true" />
                      <span>{choice.avoided}</span>
                    </p>
                    <p className="mt-2.5 flex items-start gap-2.5 text-small leading-relaxed text-mist-100">
                      <Check className="mt-0.5 size-4 shrink-0 text-orange-300" aria-hidden="true" />
                      <span>{choice.instead}</span>
                    </p>
                  </Card>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   3. The legacy, in brief

   Layout: one row. The opening moment, which explains the name over the door,
   beside a photograph. The rest of the timeline lives on the Legacy page, which
   the button on the header line leads to; on the homepage it was four columns
   of biography between the reader and everything else the school does.
   ========================================================================== */

export function LegacySection() {
  const [lead] = legacyMoments

  return (
    <Section tone="mist" id="legacy" labelledBy="legacy-title">
      <Container size="wide">
        <SectionHeader
          id="legacy-title"
          eyebrow={legacyStrip.eyebrow}
          title={legacyStrip.headline}
          standfirst={legacyStrip.body}
          actions={
            <ButtonLink to={routes.legacy} variant="outline" withArrow>
              {legacyStrip.linkLabel}
            </ButtonLink>
          }
        />

        {/* ---- The row ----
             The opening moment beside the photograph, two cells each.

             THE PHOTOGRAPH HAS TO SHARE A ROW WITH A CARD, and that is what
             sets this arrangement rather than taste. It is sized
             `lg:aspect-auto lg:h-full` so it fills whatever the row turns out
             to be, which is only defined if something else in the row has an
             intrinsic height. Left alone on a row of its own — which is what
             happened when the moment count went from four to five and it was
             pushed onto a third row — `h-full` resolves against a row whose
             height it is itself supposed to set, and the cell collapses to
             nothing. The picture simply vanished. */}
        <RevealGroup className="mt-block grid gap-5 sm:grid-cols-2 lg:grid-cols-4" each={0.07}>
          {lead ? (
            <RevealItem className="sm:col-span-2 lg:col-span-2">
              <Card tone="brand" className="flex h-full flex-col justify-between gap-8" object={lead.title} backdrop="sky-circle">
                <div>
                  <span className="font-numeral text-2xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                    {lead.year}
                  </span>
                  <h3 className="mt-3 font-display text-h2 font-semibold text-mist-50">
                    {lead.title}
                  </h3>
                  <p className="mt-4 text-body text-mist-200/85">{lead.body}</p>
                </div>
                <div
                  className="h-24 self-end text-orange-300/40 motion-safe:animate-bob"
                  aria-hidden="true"
                >
                  <WheatStalk />
                </div>
              </Card>
            </RevealItem>
          ) : null}

          <RevealItem className="sm:col-span-2 lg:col-span-2">
            <ShapedPhoto
              name="wheat-sunrise"
              shape="cut"
              interactive
              sizes="(min-width: 1024px) 44vw, 92vw"
              ratioClassName="aspect-[16/9] lg:aspect-auto lg:h-full"
              className="h-full"
            />
          </RevealItem>

        </RevealGroup>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   4. A full-bleed photograph, carrying the wheat motif into a real field

   No card, no box, no heading competing with it. This is the section that lets
   the page breathe between two dense ones, and it is the only place a
   photograph is allowed the whole width.
   ========================================================================== */

export function FieldBandSection() {
  return (
    <section aria-labelledby="field-band-title" className="relative bg-mist-100">
      {/* Hung from the top and filled with the indigo above it, because
          this band opens on a full-bleed photograph and has no flat
          colour of its own to lend a divider on the section above. */}
      <SectionDivider
        type="wave"
        fill="var(--color-brand-700)"
        position="top"
        flush
      />
      <div className="relative">
        {/* Portrait on a phone, cinematic on a desktop. At a flat 21/9 this
            band measured 167px tall at 390px wide, which left the headline
            sitting on a sliver of photograph. */}
        <ParallaxPhoto
          name="children-in-the-field"
          shape="rounded"
          strength={1.14}
          sizes="100vw"
          ratioClassName="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
          className="rounded-none!"
        />
        {/* The scrim. Text over a photograph can only be guaranteed legible if
            the layer under it is guaranteed dark, so this reaches full opacity
            at the foot of the frame rather than stopping at 80%. */}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-900 via-brand-900/55 to-transparent"
          aria-hidden="true"
        />

        <Container size="wide" className="absolute inset-x-0 bottom-0 pb-section-sm">
          <TextReveal
            as="h2"
            id="field-band-title"
            className="max-w-2xl text-h2 text-mist-50"
            lines={['A childhood worth having,', 'before anything is asked of it']}
          />
          <Reveal className="max-w-2xl" delay={0.25}>
            <p className="mt-4 max-w-xl text-body text-mist-100/85">
              The wheat stalk we use as our mark is not decoration. It comes from a Prime
              Minister who asked a country to skip a meal and skipped it first.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* Sky, because the band under this one is `BrandLayerSection`,
          which is the sky tone. It said `white`, so the scallops came
          off the foot of the photograph in mist-50 and met a brand-50
          ground: close enough to look like a printing fault rather than a
          deliberate shape. */}
      <SectionDivider type="scallop" to="sky" />
    </section>
  )
}

/* ==========================================================================
   5. Learning philosophy: language and the day

   Layout: a layered photograph pair — one large, one overlapping its corner —
   against a text column. Two images at different depths is what stops this
   reading as "text beside a picture".
   ========================================================================== */

export function PhilosophySection() {
  return (
    <Section
      tone="white"
      id="philosophy"
     
      labelledBy="philosophy-title"
      divider={{ type: 'tight-wave', to: 'mist' }}
      /* The band ran 907px against a 900px viewport, with 192px of it empty
         navy beside a photograph that was centred against a much taller column
         of text. The small padding step and a photograph that fills its own row
         bring it under four-fifths of a screen. */
      size="sm"
    >
      <Container size="wide">
        {/* `items-stretch`: the text column is the taller of the two, so
            centring the picture against it left dead space above and below the
            crop. Stretched, the picture is exactly as tall as the words. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              id="philosophy-title"
              eyebrow={curriculumPreview.eyebrow}
              title={curriculumPreview.headline}
              standfirst={curriculumPreview.body}
            />

            {/* The language position, in a pair of pills under the standfirst.
                The Home specification keeps this section to its curriculum
                preview and puts language in the Why grid above, so the detail
                that used to be this section's heading is demoted to supporting
                evidence rather than dropped: it is the single most asked
                question a parent has about a preschool in Indore. The full
                argument lives on the Curriculum page. */}
            <Reveal className="mt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <FeatureChip icon={<Languages className="size-5" />}>
                  Hindi or home language,
                  <br className="hidden sm:block" /> as the medium
                </FeatureChip>
                <FeatureChip icon={<Music2 className="size-5" />}>
                  English through songs,
                  <br className="hidden sm:block" /> stories and play
                </FeatureChip>
              </div>
            </Reveal>

            <Reveal className="mt-6">
              <p className="max-w-prose text-small leading-relaxed text-ink-400">
                Themed learning walls and activity corners are part of the classroom design, not
                decoration added afterwards. A child choosing which corner to go to is already
                making a decision about their own learning.
              </p>
            </Reveal>

            <Reveal className="mt-6">
              <TextLink to={routes.curriculum}>See how a day is actually built</TextLink>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <ParallaxPhoto
              name="writing-practice"
              shape="cut"
              strength={1.12}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="lg:h-full"
              /* Ratio on a phone, where the two columns stack and there is no
                 row to fill; the row's height from `lg` up. */
              ratioClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
            />

            {/* The overlapping second image. Hidden below sm, where two stacked
                photographs would be taller than the text they illustrate. */}
            <div className="absolute -bottom-10 -left-6 hidden w-44 sm:block lg:-left-12 lg:w-56">
              <ShapedPhoto
                name="reading-devanagari"
                shape="blob"
                interactive
                sizes="14rem"
                ratio="1 / 1"
                className="shadow-photo ring-4 ring-mist-50"
              />
            </div>

            <DealtObject seed="programs-lead" className="absolute -right-4 -top-6 hidden rotate-6 lg:block" />
          </div>
        </div>

      </Container>
    </Section>
  )
}

/* ==========================================================================
   7. A day at LBS KidZ, in brief

   Layout: a two-column ledger. Eight numbered rows read faster as a list than
   as eight cards, and the Sankalp row is the only one given colour, so the eye
   lands on the block the section exists to point at.
   ========================================================================== */

export function DaySection() {
  return (
    <Section tone="white" id="a-day" labelledBy="a-day-title">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                id="a-day-title"
                eyebrow="The shape of a day"
                title="Eight blocks, ending somewhere on purpose"
                standfirst="Our day follows NCERT’s own suggested structure for a preschool. The last block is where the day’s value lands."
              />
              <Reveal className="mt-8">
                <ButtonLink to={routes.curriculum} variant="secondary" withArrow>
                  The full day, block by block
                </ButtonLink>
              </Reveal>

              <Reveal className="mt-block" delay={0.1}>
                <ShapedPhoto
                  name="writing-hand"
                  shape="crest-alt"
                  interactive
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  ratio="4 / 3"
                  className="max-w-sm"
                />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup className="space-y-2" each={0.045}>
              {dailySchedule.map((block, i) => (
                <RevealItem key={block.name}>
                  <div
                    className={
                      block.isSankalpMoment
                        ? 'flex items-center gap-4 rounded-lg bg-orange-100 p-4 hairline sm:p-5'
                        : 'flex items-center gap-4 rounded-lg bg-mist-100 p-4 transition-colors duration-300 hover:bg-mist-200/80 sm:p-5'
                    }
                  >
                    <span className="font-numeral w-6 shrink-0 text-small font-semibold text-ink-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-body font-medium text-brand-700">
                      {block.name}
                    </span>
                    {block.isSankalpMoment ? (
                      <Chip tone="accent" className="shrink-0">
                        Sankalp moment
                      </Chip>
                    ) : null}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   8. The brand / character layer
   ========================================================================== */

export function BrandLayerSection() {
  return (
    <Section tone="sky" id="the-lbs-way" labelledBy="lbs-way-title">
      <Container size="wide">
        <SectionHeader
          id="lbs-way-title"
          eyebrow={brandLayerIntro.eyebrow}
          title={brandLayerIntro.headline}
          standfirst={brandLayerIntro.body}
          actions={
            <ButtonLink to={routes.lbsWay} variant="outline" withArrow>
              {brandLayerIntro.linkLabel}
            </ButtonLink>
          }
        />

        {/* EVERY ROW RUNS THE FULL WIDTH, WHICH IS WHY THIS IS NOT TWO COLUMNS.
            The acronym used to sit in a seven-column well beside a stack of two
            cards: the strip is one row about 130px tall, the stack ran to 490,
            and the difference was 350px of empty tint under the pillars.
            Worse, the six tiles were cramped into little over half the page,
            which is the one thing they must not be. The whole point of the
            strip, and the reason it exists as a component at all, is that six
            tiles in a row ARE the word: at full width they read as S I M P L E
            rather than as six small boxes. So the acronym takes the top row
            outright and the two cards take the row beneath it. */}
        <div className="mt-block">
          {/* SIMPLE, as the word it spells. The six definitions live on the
              LBS Way page; printing them here as well gave the homepage six
              paragraphs a reader would meet again, verbatim, one click later. */}
          <Eyebrow className="mb-5">SIMPLE, the six pillars</Eyebrow>
          <PillarStrip />

          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Little Karmayogis. Split across the card rather than stacked:
                stacked at this width the photograph alone ran past 400px and
                the card towered over its neighbour. Side by side, the picture
                takes its height from the text instead of setting it. */}
            <Reveal className="lg:col-span-7">
              <Card
                tone="brand"
                padded={false}
                className="h-full overflow-hidden"
                backdrop="mint-semi"
              >
                <div className="grid h-full sm:grid-cols-2">
                  <div className="min-h-56 sm:min-h-full">
                    <ShapedPhoto
                      name="child-arms-open"
                      shape="rounded"
                      fill
                      interactive
                      sizes="(min-width: 1024px) 30vw, 92vw"
                      focus="50% 30%"
                      className="rounded-none!"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-7">
                    <Chip tone="onDark">{littleKarmayogis.role}</Chip>
                    <h3 className="mt-4 font-display text-h2 font-semibold text-mist-50">
                      {littleKarmayogis.name}
                    </h3>
                    <p className="mt-3 text-small leading-relaxed text-mist-200/85">
                      {littleKarmayogis.usedWhere}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.08}>
              <Card tone="paper" className="relative h-full" backdrop="blue-peach">
                <DealtObject seed="sankalp-card" className="absolute -right-2 top-4 opacity-70" />
                <h3 className="font-display text-h3 font-semibold text-brand-700">
                  {sankalpCalendar.name}
                </h3>
                <p className="mt-2 text-small font-medium text-brand-500">
                  {sankalpCalendar.cadence}
                </p>
                <p className="mt-3 text-small leading-relaxed text-ink-500">
                  The day’s value moment sits at {sankalpCalendar.daySlot}, and the same small
                  action goes home with the child.
                </p>
                <TextLink to={routes.lbsWay} className="mt-5">
                  See the whole rhythm
                </TextLink>
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   9. Value stories preview

   Layout: one featured story with a photograph, two supporting ones beside it.
   Three equal cards would say all three matter the same amount; they do not.
   ========================================================================== */

export function StoriesSection() {
  /** One colour per story, in the order the palette reads warmest to coolest. */
  const panels = [
    // Focus is per photograph, not shared: one value across three different
    // compositions left the girl in the doorway at the very foot of her panel.
    { colour: 'sky', photo: 'girl-blue-door', focus: '50% 72%' },
    { colour: 'brand', photo: 'children-in-the-field', focus: '50% 45%' },
    { colour: 'green', photo: 'craft-table', focus: '50% 50%' },
  ] as const

  return (
    <Section tone="mist" id="stories" labelledBy="stories-title">
      <Container size="wide">
        <SectionHeader
          id="stories-title"
          eyebrow="Value Stories"
          title="How a value is actually learned"
          standfirst="Not a list of virtues. Stories about the small moments where one of them gets into a child."
          actions={
            <ButtonLink to={routes.valueStories} variant="outline" withArrow>
              Read the stories
            </ButtonLink>
          }
        />

        <RevealGroup className="mt-block grid gap-gutter sm:grid-cols-2 lg:grid-cols-3" each={0.08}>
          {valueStories.map((story, i) => {
            const panel = panels[i % panels.length]
            return (
              <RevealItem key={story.slug} className="h-full">
                <ColourPanel
                  to={`${routes.valueStories}#${story.slug}`}
                  title={story.title}
                  eyebrow={story.pillar}
                  colour={panel.colour}
                  photo={panel.photo}
                  focus={panel.focus}
                />
              </RevealItem>
            )
          })}
        </RevealGroup>

        <Reveal className="mt-8">
          <p className="mx-auto max-w-2xl text-center text-small leading-relaxed text-ink-400">
            Every story connects to one of the six SIMPLE pillars, and to a question a child is
            asked rather than a rule they are given.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   10. Founder's Note teaser

   Section 8 of the Home specification. The quote is the client's own supplied
   placeholder, flagged as one in `data/positioning.ts`, and is replaced the
   moment the real message arrives.
   ========================================================================== */

export function ReflectionSection() {
  return (
    <Section tone="white" size="sm" id="founders-note" labelledBy="founders-teaser-title">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-4">{foundersNoteTeaser.eyebrow}</Eyebrow>
            <h2 id="founders-teaser-title" className="text-h2">
              {foundersNoteTeaser.headline}
            </h2>

            <QuoteCard
              tone="orange"
              backdrop="blob-duo"
              attribution={`${foundersNoteTeaser.attribution}, ${foundersNoteTeaser.attributionRole}`}
              className="mt-7"
            >
              {foundersNoteTeaser.quote}
            </QuoteCard>

            <TextLink to={routes.foundersNote} className="mt-6">
              {foundersNoteTeaser.linkLabel}
            </TextLink>
          </Reveal>

          <div className="relative lg:col-span-6">
            <ParallaxPhoto
              name="parent-and-child"
              shape="cut-alt"
              strength={1.12}
              sizes="(min-width: 1024px) 46vw, 92vw"
              ratio="4 / 3"
            />
            <Sparks className="absolute -left-2 top-4 hidden w-10 text-orange-400 lg:block" />
            <DealtObject seed="karmayogis" className="absolute -bottom-4 -right-2 hidden motion-safe:animate-bob lg:block" />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   11. Parent confidence: the parity layer

   Layout: a hairline grid rather than nine separate cards. This is a checklist,
   and a checklist should look like one continuous document, not like nine
   things competing for attention.
   ========================================================================== */

export function ParitySection() {
  return (
    <Section tone="mist" id="what-parents-check" labelledBy="parity-title" divider={CTA_SEAM}>
      <Container size="wide">
        <SectionHeader
          id="parity-title"
          eyebrow={reassurance.eyebrow}
          title={reassurance.headline}
          standfirst={reassurance.standfirst}
          actions={
            <ButtonLink to={routes.faqs} variant="outline" withArrow>
              {reassurance.linkLabel}
            </ButtonLink>
          }
        />

        <RevealGroup
          className="mt-block grid gap-gutter sm:grid-cols-2 lg:grid-cols-3"
          each={0.04}
        >
          {parityLayer.map((item, i) => {
            const available = item.phase <= SITE_PHASE
            return (
              <RevealItem key={item.category} className="h-full">
                <Card
                  tone={available ? 'paper' : 'mist'}
                  className="flex h-full flex-col"
                  object={item.category}
                  backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-h4 font-semibold text-brand-700">
                      {item.category}
                    </h3>
                    {available ? (
                      <span
                        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-100 text-green-600"
                        aria-hidden="true"
                      >
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                    ) : (
                      <Chip tone="muted" className="shrink-0">
                        With our first campus
                      </Chip>
                    )}
                  </div>
                  <p className="mt-3 flex-1 text-small leading-relaxed text-ink-500">
                    {item.claim}
                  </p>
                  {available ? (
                    <Link
                      to={item.href}
                      className="mt-4 -mb-2.5 inline-flex items-center gap-1.5 py-2.5 text-small font-semibold text-brand-500 underline-offset-4 hover:underline"
                    >
                      See it
                    </Link>
                  ) : null}
                </Card>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   12. Campuses
   ========================================================================== */

export function CampusesSection() {
  return (
    /* This band carried no divider, so deep indigo met the white band below it
       on a dead straight line: the single highest-contrast join on the page and
       the only one left showing a hard edge. Every other indigo band on this
       site closes on a curve. */
    <Section
      tone="brand"
      id="campuses"
      labelledBy="campuses-title"
      divider={{ type: 'blob', to: 'white' }}
    >
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              id="campuses-title"
              eyebrow="Opening in Indore"
              title={campusPhaseState.phase1Headline}
              standfirst={campusPhaseState.phase1Body}
              onDark
            />
            <Reveal className="mt-8">
              <ButtonLink to={primaryCta.href} variant="onDark" withArrow>
                Register Your Interest
              </ButtonLink>
            </Reveal>

            {/* Zone level only, and the badge says so. The specification is
                explicit that this block must avoid implying exact addresses
                exist yet, so each tag carries the locality and the session and
                nothing that could be mistaken for a street. */}
            <RevealGroup className="mt-block grid gap-3 sm:grid-cols-2" each={0.06}>
              {zones.map((zone) => (
                <RevealItem key={zone.slug}>
                  <div className="flex h-full items-start gap-3 rounded-lg bg-mist-50/[0.07] p-4 transition-colors duration-300 hover:bg-mist-50/12">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-orange-300"
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-h4 font-semibold text-mist-50">
                        {zone.name}
                      </span>
                      <span className="mt-1 block text-2xs uppercase tracking-[0.14em] text-orange-300">
                        {campusPhaseState.zoneBadge}
                      </span>
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-6">
              <TextLink to={routes.campuses} onDark>
                Zones and safety standards
              </TextLink>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <ParallaxPhoto
              name="walking-to-school"
              shape="crest"
              strength={1.14}
              sizes="(min-width: 1024px) 46vw, 92vw"
              ratio="4 / 3"
            />
            <DealtObject seed="faq-aside" className="absolute -bottom-5 -left-4 hidden -rotate-6 lg:block" />
          </div>
        </div>
      </Container>
    </Section>
  )
}

