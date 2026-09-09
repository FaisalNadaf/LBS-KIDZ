import { Link } from 'react-router-dom'
import { Check, Minus, Languages, Music2 } from 'lucide-react'
import { Container, Eyebrow, Section, SectionHeader } from '@/components/ui/layout'
import { SectionDivider } from '@/components/ui/SectionDivider'
import {
  Card,
  cardShapeCycle,
  Chip,
  ColourPanel,
  FeatureChip,
  Marker,
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
import { SITE_PHASE } from '@/data/site'
import {
  brandLayerIntro,
  deliberateChoices,
  differentiator,
  parityLayer,
  positioningPillars
} from '@/data/positioning'
import { littleKarmayogis, sankalpCalendar } from '@/data/brand-framework'
import { PillarStrip } from '@/sections/shared/PillarStrip'
import { zones, campusPhaseState } from '@/data/campuses'
import { dailySchedule, languagePosition } from '@/data/curriculum'
import { legacyIntro, legacyMoments } from '@/data/legacy'
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
 *    join, and the palette moves khadi â†’ white â†’ indigo â†’ terracotta in a
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
   on warm card against white ground, with terracotta as the single accent:
   the numerals index the pillars on their own, and the photographs are matted
   in nothing at all.
   ========================================================================== */

/**
 * Where each cell sits from `lg` up.
 *
 * Explicit placement rather than auto-flow, because the reading order and the
 * visual order are not the same: the DOM runs heading, pillar, picture,
 * pillar, picture, pillar, which is the order a phone should stack them in and
 * the order a screen reader should hear. Auto-flow would put the row-two
 * picture on the left and break the alternation.
 *
 * The two rows that pair a card with a photograph centre the card against it.
 * A 3:2 photograph is most of a row taller than four lines of text, so at
 * `items-start` each of those rows ended in a 240px hole beside the card. A
 * nudge downwards was the first attempt and only moved the hole; centring
 * splits the difference and reads as an alignment rather than a gap.
 */
const positioningCells = {
  header: 'lg:col-start-1 lg:row-start-1',
  first: 'lg:col-start-2 lg:row-start-1',
  photoTop: 'lg:col-start-2 lg:row-start-2',
  second: 'lg:col-start-1 lg:row-start-2 lg:self-center',
  photoFoot: 'lg:col-start-1 lg:row-start-3',
  third: 'lg:col-start-2 lg:row-start-3 lg:self-center'
}

/**
 * The corner each pillar card leads with.
 *
 * An earlier pass cut a concave notch out of the corner facing the next card,
 * on the theory that the bites would trace the reading path and make the three
 * cards read as pieces of one sheet. They did not: with a photograph sitting
 * between any two cards there is nothing to fill a concave corner, so each one
 * read as a chunk taken out of the card rather than as a join, which is the
 * opposite of what it was for. A concave corner only says "joined" when the
 * neighbour's convex corner sits in it.
 *
 * What replaces it says the same thing with convex geometry: each card takes
 * one corner all the way round, on the side facing the next card in the
 * zigzag, so the three lead into each other down the page. Nothing is removed
 * from the card, so nothing can look damaged.
 */
const pillarShapes = [
  'rounded-xl rounded-bl-[3rem]',
  'rounded-xl rounded-br-[3rem]',
  'rounded-xl rounded-tl-[3rem]',
] as const

export function PositioningSection() {
  const pillarCards = positioningPillars.map((pillar, i) => (
    <Card
      key={pillar.slug}
      tone="sand"
      padded={false}
      backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
      className={cn(
        'flex gap-4 p-5 sm:gap-5 sm:p-6',
        pillarShapes[i % pillarShapes.length],
      )}
    >
      <Marker>{String(i + 1).padStart(2, '0')}</Marker>
      <div className="min-w-0">
        <h3 className="font-display text-h3 font-semibold text-indigo-ink-700">
          {pillar.headline}
        </h3>
        {/* A 610px card at 14px is an 85-character line. Capping the measure is
            most of what stopped these reading as a wall. */}
        <p className="mt-2 max-w-[54ch] text-small leading-relaxed text-ink-600">
          {pillar.body}
        </p>
      </div>
    </Card>
  ))

  return (
    <Section
      tone="white"
      id="positioning"
      ambient="warm"
      labelledBy="positioning-title"
      size="sm"
      divider={{ type: 'asymmetric', to: 'indigo' }}
      /* Content is vertically centred inside a full-screen minimum height, so
         it does not sit below the top padding the way every other section's
         does — it rides up into it, and the standard object at `left-[11%]
         top-4` lands on the eyebrow. `'centred'` moves the whole set into the
         foot of the band, which stays empty at every viewport. */
      decor="centred"
      /* The pillars and photographs enter from the left and the right, and a
         horizontal entrance translate is added to the document's scroll width
         while it is running — 2px of transient sideways scroll on a phone.
         `clip` rather than `hidden`: it contains the overflow without making
         this a scroll container, which `hidden` would do. */
      className="overflow-x-clip lg:flex lg:min-h-[calc(100svh-var(--nav-h))] lg:items-center"
    >
      <Container size="wide">
        <RevealGroup
          className="grid items-start gap-x-8 gap-y-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-6"
          each={0.08}
        >
          <RevealItem className={positioningCells.header}>
            <SectionHeader
              id="positioning-title"
              eyebrow="What this means for your child"
              title="Three things we have decided, and will not quietly change"
              standfirst="Each one is a locked decision on this project, not a line written for a website."
            />
          </RevealItem>

          {/* Each cell enters from its own side, so the alternation is legible
              while it settles and not only once it has. */}
          <RevealItem className={positioningCells.first} direction="right">
            {pillarCards[0]}
          </RevealItem>

          {/* A wide band wants a horizontally composed picture. This one is
              three children in a row, so it fills the width; `counting-tray`
              was here first and is a single upright child, which at 14:5 left
              half a frame of empty wall and took the top of her head off no
              matter where `focus` was put. No colour mat either: a 12px band
              of saturated haldi around a photograph that is already mostly red
              uniform was two accents fighting over one cell.

              `focus` sits above centre because a 14:5 crop of a 4:3 frame keeps
              barely a third of its height, and the faces are in the top half. */}
          <RevealItem className={positioningCells.photoTop} direction="right">
            <VideoOnColour
              name="children-classroom-play"
              shape="leaf"
              colour="neem"
              ratioClassName="aspect-[4/3] lg:aspect-[14/5]"
              focus="50% 40%"
            />
          </RevealItem>

          <RevealItem className={positioningCells.second} direction="left">
            {pillarCards[1]}
          </RevealItem>

          {/* Was a flat-lay of a lunch box on saturated orange — the loudest
              thing in the section, the only frame without a child in it, and
              the second stock product shot in a page of documentary
              photographs. A girl painting outdoors carries the same warmth as
              the palette and is nothing like the classroom above it, which the
              other frame from that same shoot could not manage. */}
          <RevealItem className={positioningCells.photoFoot} direction="left">
            <VideoOnColour
              name="child-painting"
              shape="leaf-alt"
              colour="haldi"
              ratioClassName="aspect-[4/3] lg:aspect-[14/5]"
              focus="50% 45%"
            />
          </RevealItem>

          <RevealItem className={positioningCells.third} direction="right">
            {pillarCards[2]}
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   2. Why LBS KidZ: the differentiator, stated plainly

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
      tone="indigo"
      id="why"
      ambient="growth"
      labelledBy="why-title"
      /* This band held 880px against a 900px viewport — a whole screen for a
         heading, one picture and four short cards, most of it air. The small
         padding step, a wider photograph and a tighter gap under the top row
         bring it to roughly four-fifths of a screen without touching the
         content or the type. */
      size="sm"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <Drift y={70} className="absolute -right-16 top-10 hidden h-72 text-khadi-100/5 sm:block">
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
                    tone="indigo"
                    padded={false}
                    shape={cardShapeCycle[i % cardShapeCycle.length]}
                    backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                    className={cn('flex h-full flex-col', pad)}
                  >
                    <p className="flex items-start gap-2.5 text-small text-khadi-300/75 line-through decoration-terracotta-400/70 decoration-2">
                      <Minus className="mt-0.5 size-4 shrink-0 no-underline" aria-hidden="true" />
                      <span>{choice.avoided}</span>
                    </p>
                    <p className="mt-2.5 flex items-start gap-2.5 text-small leading-relaxed text-khadi-100">
                      <Check className="mt-0.5 size-4 shrink-0 text-haldi-300" aria-hidden="true" />
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

   Layout: a bento. The first moment is the largest tile because it is the one
   that explains the name over the door; the other three sit beside it.
   ========================================================================== */

export function LegacySection() {
  const [lead, ...rest] = legacyMoments

  return (
    <Section tone="khadi" id="legacy" labelledBy="legacy-title">
      <Container size="wide">
        <SectionHeader
          id="legacy-title"
          eyebrow={legacyIntro.eyebrow}
          title={legacyIntro.headline}
          standfirst={legacyIntro.standfirst}
          actions={
            <ButtonLink to={routes.legacy} variant="outline" withArrow>
              The full legacy
            </ButtonLink>
          }
        />

        <RevealGroup className="mt-block grid gap-5 sm:grid-cols-2 lg:grid-cols-4" each={0.07}>
          {lead ? (
            <RevealItem className="sm:col-span-2 lg:col-span-2">
              <Card tone="indigo" className="flex h-full flex-col justify-between gap-8" object={lead.title} backdrop="sky-circle">
                <div>
                  <span className="font-numeral text-2xs font-semibold uppercase tracking-[0.16em] text-haldi-300">
                    {lead.year}
                  </span>
                  <h3 className="mt-3 font-display text-h2 font-semibold text-khadi-50">
                    {lead.title}
                  </h3>
                  <p className="mt-4 text-body text-khadi-200/85">{lead.body}</p>
                </div>
                <div
                  className="h-24 self-end text-haldi-300/40 motion-safe:animate-bob"
                  aria-hidden="true"
                >
                  <WheatStalk />
                </div>
              </Card>
            </RevealItem>
          ) : null}

          {rest.map((moment) => (
            <RevealItem key={moment.year} className="lg:col-span-1">
              <Card className="flex h-full flex-col" object={moment.title} backdrop="yellow-block">
                <span className="font-numeral text-2xs font-semibold uppercase tracking-[0.16em] text-terracotta-600">
                  {moment.year}
                </span>
                <h3 className="mt-2 font-display text-h4 font-semibold text-indigo-ink-700">
                  {moment.title}
                </h3>
                <p className="mt-3 text-small leading-relaxed text-ink-500">{moment.body}</p>
              </Card>
            </RevealItem>
          ))}

          {/* The bento's fourth small cell. A photograph rather than a gap:
              four moments and three tiles would otherwise leave a hole exactly
              where the eye finishes reading. */}
          {/* The bento's wide closing cell. Row one is 2 + 1 + 1, row two is
              1 + 3, so nothing is left as a hole where the eye finishes. */}
          <RevealItem className="sm:col-span-2 lg:col-span-3">
            <ShapedPhoto
              name="wheat-sunrise"
              shape="cut"
              interactive
              sizes="(min-width: 1024px) 56vw, 92vw"
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
    <section aria-labelledby="field-band-title" className="relative bg-khadi-100">
      {/* Hung from the top and filled with the indigo above it, because
          this band opens on a full-bleed photograph and has no flat
          colour of its own to lend a divider on the section above. */}
      <SectionDivider
        type="wave"
        fill="var(--color-indigo-ink-700)"
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
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-indigo-ink-900 via-indigo-ink-900/55 to-transparent"
          aria-hidden="true"
        />

        <Container size="wide" className="absolute inset-x-0 bottom-0 pb-section-sm">
          <TextReveal
            as="h2"
            id="field-band-title"
            className="max-w-2xl text-h2 text-khadi-50"
            lines={['A childhood worth having,', 'before anything is asked of it']}
          />
          <Reveal className="max-w-2xl" delay={0.25}>
            <p className="mt-4 max-w-xl text-body text-khadi-100/85">
              The wheat stalk we use as our mark is not decoration. It comes from a Prime
              Minister who asked a country to skip a meal and skipped it first.
            </p>
          </Reveal>
        </Container>
      </div>

      <SectionDivider type="scallop" to="white" />
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
      ambient="calm"
      labelledBy="philosophy-title"
      divider={{ type: 'tight-wave', to: 'khadi' }}
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
              eyebrow="Learning philosophy"
              title={languagePosition.headline}
              standfirst={languagePosition.practice}
            />

            {/* The reference names the two things that matter most in a pair
                of pills under the standfirst. These are the two the whole
                language position rests on. */}
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
                className="shadow-photo ring-4 ring-khadi-50"
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
                        ? 'flex items-center gap-4 rounded-lg bg-haldi-100 p-4 hairline sm:p-5'
                        : 'flex items-center gap-4 rounded-lg bg-khadi-100 p-4 transition-colors duration-300 hover:bg-khadi-200/80 sm:p-5'
                    }
                  >
                    <span className="font-numeral w-6 shrink-0 text-small font-semibold text-ink-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-body font-medium text-indigo-ink-700">
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
    <Section tone="terracotta" id="the-lbs-way" labelledBy="lbs-way-title">
      <Container size="wide">
        <SectionHeader
          id="lbs-way-title"
          eyebrow={brandLayerIntro.eyebrow}
          title={brandLayerIntro.headline}
          standfirst={brandLayerIntro.body}
          actions={
            <ButtonLink to={routes.lbsWay} variant="outline" withArrow>
              The whole framework
            </ButtonLink>
          }
        />

        <div className="mt-block grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* SIMPLE, as the word it spells. The six definitions live on the
              LBS Way page; printing them here as well gave the homepage six
              paragraphs a reader would meet again, verbatim, one click later. */}
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5">SIMPLE, the six pillars</Eyebrow>
            <PillarStrip />
          </div>

          {/* Little Karmayogis + Sankalp */}
          <div className="space-y-5 lg:col-span-5">
            <Reveal>
              <Card tone="indigo" padded={false} className="overflow-hidden" backdrop="mint-semi">
                <ShapedPhoto
                  name="child-arms-open"
                  shape="rounded"
                  interactive
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  ratio="16 / 10"
                  focus="50% 30%"
                  className="rounded-none!"
                />
                <div className="p-6 sm:p-7">
                  <Chip tone="onDark">{littleKarmayogis.role}</Chip>
                  <h3 className="mt-4 font-display text-h2 font-semibold text-khadi-50">
                    {littleKarmayogis.name}
                  </h3>
                  <p className="mt-3 text-small leading-relaxed text-khadi-200/85">
                    {littleKarmayogis.usedWhere}
                  </p>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.08}>
              <Card tone="paper" className="relative" backdrop="blue-peach">
                <DealtObject seed="sankalp-card" className="absolute -right-2 top-4 opacity-70" />
                <h3 className="font-display text-h3 font-semibold text-indigo-ink-700">
                  {sankalpCalendar.name}
                </h3>
                <p className="mt-2 text-small font-medium text-terracotta-600">
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
    { colour: 'terracotta', photo: 'girl-blue-door', focus: '50% 72%' },
    { colour: 'indigo', photo: 'children-in-the-field', focus: '50% 45%' },
    { colour: 'neem', photo: 'craft-table', focus: '50% 50%' },
  ] as const

  return (
    <Section tone="khadi" id="stories" labelledBy="stories-title">
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
   10. Reflection close
   ========================================================================== */

export function ReflectionSection() {
  return (
    <Section tone="white" size="sm" id="reflection">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <QuoteCard tone="haldi" backdrop="blob-duo" attribution="Goodbye Circle, the last block of the day">
              The last few minutes of the day are not spare time. They are where the day’s value
              gets said out loud, in a child’s own words.
            </QuoteCard>
            <p className="mt-6 text-body text-ink-500">
              That slot is in NCERT’s own suggested schedule. We did not invent a new activity to
              hold our values. We put them where the day already pauses.
            </p>
            <p className="mt-4 text-body text-ink-500">
              The same small action goes home with your child, which is where a value either
              takes or does not.
            </p>
            <TextLink to={routes.lbsWay} className="mt-6">
              How the week is built around it
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
            <Sparks className="absolute -left-2 top-4 hidden w-10 text-terracotta-400 lg:block" />
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
    <Section tone="khadi" id="what-parents-check" labelledBy="parity-title">
      <Container size="wide">
        <SectionHeader
          id="parity-title"
          eyebrow="Parent confidence"
          title="Everything you would check at any good preschool"
          standfirst="Set against the things a parent actually compares. Where something is not ready yet, it says so."
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
                  tone={available ? 'paper' : 'sand'}
                  className="flex h-full flex-col"
                  object={item.category}
                  backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                      {item.category}
                    </h3>
                    {available ? (
                      <span
                        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-neem-100 text-neem-600"
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
                      className="mt-4 -mb-2.5 inline-flex items-center gap-1.5 py-2.5 text-small font-semibold text-terracotta-600 underline-offset-4 hover:underline"
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
    <Section tone="indigo" id="campuses" labelledBy="campuses-title">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              id="campuses-title"
              eyebrow="Campuses"
              title={campusPhaseState.phase1Headline}
              standfirst={campusPhaseState.phase1Body}
              onDark
            />
            <Reveal className="mt-8">
              <ButtonLink to={routes.campuses} variant="onDark" withArrow>
                Zones and safety standards
              </ButtonLink>
            </Reveal>

            <RevealGroup className="mt-block grid gap-3 sm:grid-cols-3" each={0.06}>
              {zones.map((zone) => (
                <RevealItem key={zone.slug}>
                  <div className="rounded-lg bg-khadi-50/[0.07] p-5 text-center transition-colors duration-300 hover:bg-khadi-50/12">
                    <p className="font-display text-h4 font-semibold text-khadi-50">
                      {zone.name}
                    </p>
                    <p className="mt-1 text-xs text-khadi-300/70">Indore</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
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

