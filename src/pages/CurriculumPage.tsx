import { Fragment, useRef } from 'react'
import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema } from '@/lib/schema'
import { Container, Eyebrow, Section, SectionHeader } from '@/components/ui/layout'
import { Card, Chip, Marker, cardBackdropCycle, cardShapeCycle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { useHorizontalTrack } from '@/animations/gsap'
import { MotifDivider } from '@/components/art/scenes'
import { ShapedPhoto } from '@/components/media/Photo'
import { ParallaxPhoto } from '@/animations/Scroll'
import { DealtObject } from '@/components/art/ObjectScatter'
import { Grain } from '@/components/art/primitives'
import {
  Apple,
  ArrowLeftRight,
  BookOpen,
  CalendarDays,
  Camera,
  ClipboardList,
  Gauge,
  Heart,
  Languages,
  MessageCircle,
  Moon,
  Palette,
  Shapes,
  Sprout,
  Send,
  Sunrise,
  ToyBrick,
  Trees,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { routes } from '@/data/routes'
import { parentUpdates } from '@/data/admissions'
import {
  assessmentPrinciples,
  attainmentLevels,
  curricularDomains,
  dailySchedule,
  ethicsQuestions,
  familyInvolvement,
  guidingPrinciples,
  languagePosition,
  panchakosha,
  planningPrinciples,
  programmeDuration } from '@/data/curriculum'

/**
 * Curriculum & Learning Approach.
 *
 * This is the page the whole discoverability strategy runs through:
 *   "The primary AEO anchor page ... This is the only page that should carry
 *    Tier B/C policy keywords."  Source: Keyword & AEO Strategy S3.
 *
 * Framing rule enforced throughout: every policy sentence is a statement about
 * LBS KidZ's own practice, citing NCERT as the source. Nowhere does this page
 * explain or interpret government policy on its own authority.
 * Source: Keyword & AEO Strategy S4; Full Website Sitemap S1.1.
 *
 * Honesty bar, from the Alignment Map S3: because this page exists to rank for
 * "no examinations" and "activity-based learning", every claim on it must be
 * verifiably true of actual classroom practice and visible in ERP activity
 * records. Nothing is asserted here that the ERP record cannot evidence.
 */
export function CurriculumPage() {

  return (
    <>
      <Seo
        page={pageSeo.curriculum}
        schemas={[organizationSchema()]}
      />

      <PageHeader
        eyebrow="How we teach"
        title="Activity-based learning, in plain terms"
        dividerTo="white"
        photo="craft-table"
        standfirst="Learning through play, hands-on activity and real experiences, not worksheets or memorisation."
      />

      <AlignmentSection />
      <ActivityBasedSection />
      <TheDaySection />
      <DayNotesSection />
      <NoExamsSection />
      <LanguageSection />
      <GoalsSection />
      <PrinciplesSection />
      <EthicsSection />
      <WhatYouSeeSection />
    </>
  )
}

/* ========================================================================== */

/**
 * The four things this school actually commits to, and the icon each one gets.
 *
 * Lifted out of the JSX because each row now carries presentation as well as
 * copy, and four inline objects wearing six properties apiece buries the
 * markup. The tones rotate so no two neighbours share a ground, and each icon
 * is the claim itself rather than a generic tick: bricks for play, a language
 * mark for mother tongue, a seedling for assessment that measures growth
 * instead of pass and fail, and shapes for number and letter work.
 */
const ALIGNMENT_CLAIMS = [
  {
    claim: 'Play-based and activity-based days',
    detail:
      'Play and activity are the primary context of learning, which is the first design principle in NCERT\u2019s guidelines, not a preference of ours.',
    icon: ToyBrick,
    tone: 'terracotta' as const,
    medallion: 'bg-terracotta-100 text-terracotta-700 ring-terracotta-200/70'
  },
  {
    claim: 'A mother-tongue foundation',
    detail:
      'Home language as the medium of instruction through the Foundational Stage, with English as joyful exposure.',
    icon: Languages,
    tone: 'haldi' as const,
    medallion: 'bg-haldi-100 text-haldi-600 ring-haldi-200/70'
  },
  {
    claim: 'No formal examinations',
    detail:
      'Continuous, comprehensive and non-competitive assessment, recorded as Beginner, Progressive or Proficient.',
    icon: Sprout,
    tone: 'neem' as const,
    medallion: 'bg-neem-100 text-neem-600 ring-neem-200/70'
  },
  {
    claim: 'Foundational literacy and numeracy',
    detail:
      'Woven into activities and the environment rather than delivered through workbooks.',
    icon: Shapes,
    tone: 'sand' as const,
    medallion: 'bg-khadi-200 text-indigo-ink-700 ring-khadi-300/70'
  },
]

function AlignmentSection() {
  return (
    <Section tone="white" id="nep-2020-alignment" ambient="calm" labelledBy="alignment-title" divider={{ type: 'gentle', to: 'khadi' }}>
      <Container size="wide">
        {/* The reference note has moved under the four claims, which is what it
            actually sources: beside the heading it annotated a paragraph that
            makes no claim at all. Moving it also squares the two columns, and
            the photograph takes whatever height is left over, so the bay of
            empty white that used to sit under the heading is gone. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
            <SectionHeader
              id="alignment-title"
              splitTitle
              eyebrow="Our alignment with NEP 2020 and NCF-FS"
              title="What we follow, and who says so"
              standfirst="We describe our own practice and name NCERT as the source for it. We are not in the business of explaining national education policy, and we do not claim to be."
            />

            {/* Sorting by colour into a divided tray is the first two claims
                happening at once: play as the context, and number and category
                arriving through the activity rather than through a workbook.
                A different silhouette from the `cut`, `petal` and `crest`
                frames already on this page, so the four policy claims beside it
                are not read as another card. An ellipse was the first try and
                it cropped both children through the head: the file is square
                and this frame is landscape, so the vertical crop is severe and
                a shape that narrows at the top takes the faces with it. */}
            <Reveal className="mt-8 lg:flex-1" direction="right" tier="lead">
              <div className="h-64 sm:h-80 lg:h-full lg:min-h-[16rem]">
                <ShapedPhoto
                  name="class-sorting-play"
                  shape="leaf"
                  fill
                  interactive
                  focus="50% 34%"
                  sizes="(min-width: 1024px) 38vw, 92vw"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <RevealGroup className="space-y-4">
              {ALIGNMENT_CLAIMS.map((row, i) => (
                <RevealItem key={row.claim}>
                  <Card
                    tone={row.tone}
                    shape={cardShapeCycle[i % cardShapeCycle.length]}
                    backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                    padded={false}
                    className="flex items-start gap-4 p-5 sm:gap-5 sm:p-6"
                  >
                    {/* The medallion replaces a bare `Grain` marker. Four
                        near-identical paragraphs in a stack are read as a list
                        of the same thing; a distinct object against a distinct
                        ground gives each claim its own address on the page. */}
                    <span
                      className={cn(
                        'grid size-11 shrink-0 place-items-center rounded-xl shadow-soft ring-1',
                        'transition-transform duration-300 ease-out-soft group-hover/card:-translate-y-0.5',
                        'motion-reduce:transition-none motion-reduce:group-hover/card:translate-y-0',
                        row.medallion,
                      )}
                      aria-hidden="true"
                    >
                      <row.icon className="size-5" strokeWidth={1.8} />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                        {row.claim}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{row.detail}</p>
                    </div>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>

          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */

function ActivityBasedSection() {
  return (
    <Section tone="khadi" id="activity-based-learning" ambient="growth" labelledBy="abl-title" divider={{ type: 'asymmetric', to: 'indigo' }}>
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              id="abl-title"
              eyebrow="Activity-based learning"
              title="What activity-based learning actually looks like here"
              standfirst="Children learn through play, hands-on activity and real experiences rather than worksheets or memorisation. In practice that means the material comes first and the concept follows it."
            />

            <Reveal className="mt-8 space-y-4">
              <p className="max-w-prose text-body text-ink-500">
                Quantities, shapes and measures arrive through pouring, sorting, stacking and
                counting real things. Language arrives through storytelling, rhymes and role-play.
                Local and indigenous material is used deliberately, because a child does more with
                what they already recognise.
              </p>
              <p className="max-w-prose text-body text-ink-500">
                A teacher moves between initiating an activity and letting a child choose one.
                Both are planned for, and the balance across the day is the point.
              </p>
            </Reveal>
          </div>

          {/* A layered pair rather than one image: the large photograph shows
              the work, the small one shows the material it is done with, and
              the overlap is what stops this reading as text-beside-a-picture. */}
          <div className="relative lg:col-span-6">
            <ParallaxPhoto
              name="stacking-blocks"
              shape="cut"
              strength={1.12}
              sizes="(min-width: 1024px) 46vw, 92vw"
              ratio="4 / 3"
            />
            <div className="absolute -bottom-8 -left-6 hidden w-40 sm:block lg:w-48">
              <ShapedPhoto
                name="learning-materials"
                shape="petal"
                interactive
                sizes="12rem"
                ratio="1 / 1"
                className="shadow-photo ring-4 ring-khadi-100"
              />
            </div>
            <DealtObject seed="curriculum-day" className="absolute -right-3 -top-5 hidden rotate-6 lg:block" />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ==========================================================================
   The day. Horizontal scroll scene on desktop, vertical stack elsewhere.
   ========================================================================== */

/**
 * One icon per block, in order.
 *
 * These are drawn large behind the text and clipped by the card, so they read
 * as a watermark rather than as an icon someone forgot to size. That is the
 * only job they have: eight cards of near-identical text are hard to tell
 * apart at a glance while the track is moving, and a shape is quicker to
 * recognise in motion than a heading is to read.
 */
const DAY_ICONS = [Sunrise, Shapes, ToyBrick, Apple, BookOpen, Palette, Trees, Moon]

/**
 * How each card's corners are cut.
 *
 * Four variants on a cycle rather than one radius for all eight. Travelling
 * sideways past identical rectangles gives the eye nothing to measure progress
 * against, and the row reads as one long block instead of eight things.
 * Rotating which corner is squared makes each card individual without any of
 * them being decorated.
 */
const DAY_SHAPES = [
  'rounded-[1.75rem] rounded-tl-md',
  'rounded-[1.75rem] rounded-br-md',
  'rounded-[1.75rem] rounded-tr-md',
  'rounded-[1.75rem] rounded-bl-md',
]

/**
 * A colour per block, cycled across the row.
 *
 * Eight cards drawn in one translucent white on one navy is a row with no
 * temperature to it: correct, legible, and completely flat, which is the note
 * this band kept striking. The three brand accents rotate instead, each tinting
 * its card's ground, its edge, its number and its watermark together, so a card
 * reads as one coloured object rather than a grey box with a yellow disc on it.
 * The tints stay low because the ground is dark and the body copy has to hold
 * its contrast against them.
 */
const DAY_ACCENTS = [
  {
    ring: 'ring-haldi-300/30',
    hover: 'hover:ring-haldi-300/70',
    glow: 'bg-haldi-300/30',
    band: 'border-haldi-300/25 from-haldi-300/25',
    chip: 'bg-haldi-300 text-indigo-ink-800',
    numeral: 'text-haldi-300/80',
    mark: 'text-haldi-300/[0.18]',
  },
  {
    ring: 'ring-terracotta-300/30',
    hover: 'hover:ring-terracotta-300/70',
    glow: 'bg-terracotta-300/30',
    band: 'border-terracotta-300/25 from-terracotta-300/25',
    chip: 'bg-terracotta-300 text-indigo-ink-800',
    numeral: 'text-terracotta-200/85',
    mark: 'text-terracotta-300/[0.18]',
  },
  {
    ring: 'ring-neem-300/30',
    hover: 'hover:ring-neem-300/70',
    glow: 'bg-neem-300/30',
    band: 'border-neem-300/25 from-neem-300/25',
    chip: 'bg-neem-300 text-indigo-ink-800',
    numeral: 'text-neem-200/85',
    mark: 'text-neem-300/[0.18]',
  },
]

/**
 * Where the photographs sit in the row, keyed by the block they follow.
 *
 * Two pictures spaced across eight cards rather than one at the front. A single
 * opening image is spent by the third card and the rest of the travel is text;
 * breaking the run again near the middle gives the scroll somewhere to arrive
 * twice, and the second picture lands next to the creative block it belongs to.
 */
const DAY_PHOTOS = {
  0: {
    name: 'class-drawing-table' as const,
    title: 'A morning, in order',
    kicker: 'Eight blocks',
  },
  5: {
    name: 'art-hands-painting' as const,
    title: 'Made, not marked',
    kicker: 'Creative activity',
  },
}

function TheDaySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const { enabled: horizontal, distance } = useHorizontalTrack(sectionRef, trackRef, 1024, railRef)

  return (
    <section
      ref={sectionRef}
      id="the-day"
      aria-labelledby="day-title"
      className="relative bg-indigo-ink-700 text-khadi-100"
      /* The spacer is only as tall as the track actually needs to travel.
         Without the horizontal scene it collapses to auto height.

         NOTHING MAY FOLLOW THE STICKY PANEL INSIDE THIS ELEMENT. The height is
         exactly one viewport plus the travel, and the pinned panel occupies all
         of it, so a sibling underneath has no room of its own and paints
         straight over the cards. The notes that used to sit here have their own
         section now. */
      style={horizontal ? { height: `calc(100dvh + ${distance}px)` } : undefined}
    >
      <div
        className={
          horizontal
            ? // The extra top padding is the fixed navbar. Centring inside the full
              // viewport puts equal space above and below the content, but the top
              // share sits under an opaque bar, so what the reader sees is a scene
              // pushed high with a bay of empty navy under it. Reserving the bar's
              // height first centres the content in the part of the screen that is
              // actually visible.
              'sticky top-0 flex h-dvh flex-col overflow-hidden pb-10 pt-[calc(3rem+var(--nav-h))]'
            : 'overflow-hidden py-16 sm:py-20 lg:py-24'
        }
      >
        {/* The heading and the track centre in whatever is left once the rail
            has taken its place at the foot. Centring all three together left a
            173px band of empty navy under the rail, because the rail is short
            and that space had nowhere else to go. Anchored, the scene reaches
            the bottom of the screen and the reader sees cards, not ground. */}
        <div className="flex flex-1 flex-col justify-center">
          <Container size="wide">
            <SectionHeader
              id="day-title"
              eyebrow="The preschool day"
              title="Eight blocks, four hours, five days"
              standfirst="Our day follows the structure NCERT suggests for a preschool. The programme runs four hours a day, Monday to Friday."
              onDark
            />
          </Container>

          <div className="mt-10 lg:mt-block">
          <div
            ref={trackRef}
            className={
              horizontal
                ? 'flex w-max items-stretch gap-5 pl-10 pr-24 will-change-transform'
                : 'grid gap-4 px-5 sm:grid-cols-2 sm:px-7 lg:px-10'
            }
          >
            {/* Pictures break the run of text. Drawn only where the track
                scrolls: stacked vertically they would be two large images
                between seven cards, which is a different page. */}
            {horizontal ? <DayPhotoPanel {...DAY_PHOTOS[0]} /> : null}

            {dailySchedule.map((block, i) => {
              const Icon = DAY_ICONS[i % DAY_ICONS.length]
              const accent = DAY_ACCENTS[i % DAY_ACCENTS.length]
              const photo = DAY_PHOTOS[i as keyof typeof DAY_PHOTOS]
              return (
                <Fragment key={block.name}>
                  <div
                    className={cn(
                      'group/block relative isolate flex flex-col overflow-hidden',
                      // A lighter ground than the band, which is what actually
                      // separates a card from the page. The previous version
                      // tinted the section's own navy and the cards read as
                      // slightly-different navy, which is the note this section
                      // kept getting: correct, and invisible.
                      'bg-indigo-ink-600 shadow-lift ring-1',
                      'transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1.5',
                      'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                      accent.ring,
                      accent.hover,
                      DAY_SHAPES[i % DAY_SHAPES.length],
                      horizontal && 'w-[22rem] shrink-0 lg:min-h-[21rem]',
                    )}
                  >
                    {/* A bloom of the accent in the corner. Blurred and behind
                        everything, so the card has a light source rather than a
                        flat fill. */}
                    <span
                      className={cn(
                        'pointer-events-none absolute -right-16 -top-20 -z-10 size-52 rounded-full blur-3xl',
                        accent.glow,
                      )}
                      aria-hidden="true"
                    />

                    {/* The watermark. `isolate` on the card is what keeps
                        `-z-10` behind this card's own text without dropping it
                        behind the card beside it. */}
                    <Icon
                      className={cn(
                        'pointer-events-none absolute -bottom-8 -right-7 -z-10 size-40',
                        'transition-transform duration-500 ease-out-soft group-hover/block:scale-110 motion-reduce:transition-none',
                        accent.mark,
                      )}
                      strokeWidth={1.1}
                      aria-hidden="true"
                    />

                    {/* A banded head, so the number and the mark belong to a
                        strip of colour rather than floating on the body. */}
                    <div
                      className={cn(
                        'flex items-center justify-between gap-3 border-b bg-linear-to-r to-transparent px-7 py-5',
                        accent.band,
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-11 place-items-center rounded-2xl shadow-soft',
                          'transition-transform duration-300 ease-out-soft group-hover/block:-translate-y-0.5',
                          'motion-reduce:transition-none motion-reduce:group-hover/block:translate-y-0',
                          accent.chip,
                        )}
                        aria-hidden="true"
                      >
                        <Icon className="size-5" strokeWidth={1.9} />
                      </span>
                      <span
                        className={cn(
                          'font-numeral text-3xl font-semibold leading-none',
                          accent.numeral,
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
                      {block.isSankalpMoment ? (
                        <span className="mb-3">
                          <Chip tone="onDark">Sankalp Calendar moment</Chip>
                        </span>
                      ) : null}

                      <h3 className="font-display text-h3 font-semibold text-khadi-50">
                        {block.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-khadi-200/90">
                        {block.detail}
                      </p>

                      {block.conduct ? (
                        <p className="mt-auto pt-5 text-xs font-medium uppercase tracking-wide text-khadi-300/85">
                          {block.conduct}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {horizontal && photo && i !== 0 ? <DayPhotoPanel {...photo} /> : null}
                </Fragment>
              )
            })}
            </div>
          </div>
        </div>

        {horizontal ? (
          <div className="mt-8 flex items-center gap-4 px-10">
            <span className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-khadi-300/80">
              Keep scrolling
            </span>
            {/* The rail. Scaled from the same timeline that moves the track, so
                it reports the scene's own progress rather than an approximation
                of it. */}
            <span
              className="relative h-px flex-1 overflow-hidden bg-khadi-50/15"
              aria-hidden="true"
            >
              <span ref={railRef} className="absolute inset-0 block bg-haldi-300/70" />
            </span>
          </div>
        ) : null}
      </div>
    </section>
  )
}

/** A picture in the track, captioned over its own foot. */
function DayPhotoPanel({
  name,
  title,
  kicker,
}: {
  name: 'class-drawing-table' | 'art-hands-painting'
  title: string
  kicker: string
}) {
  return (
    <div className="relative w-[20rem] shrink-0 overflow-hidden rounded-[1.75rem] rounded-br-md shadow-lift ring-1 ring-khadi-50/15 lg:min-h-[21rem]">
      <ShapedPhoto
        name={name}
        shape="rounded"
        fill
        interactive
        focus="50% 45%"
        sizes="20rem"
        className="h-full rounded-none"
      />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-indigo-ink-700 via-indigo-ink-700/70 to-transparent p-6 pt-20"
        aria-hidden="true"
      >
        <span className="block font-display text-h4 font-semibold text-khadi-50">{title}</span>
        <span className="mt-1 block text-xs font-medium uppercase tracking-[0.14em] text-haldi-300">
          {kicker}
        </span>
      </span>
    </div>
  )
}

/* ========================================================================== */

/**
 * The notes that used to live at the foot of the pinned scene.
 *
 * Their own band, because that scene's height is measured to the pixel for the
 * scroll track and anything sharing the box is painted over by the pinned
 * panel. Same ground and no divider between them, so the split is invisible.
 *
 * IT ALSO CARRIES THE HANDOVER TO THE WHITE BAND BELOW. A divider hangs from
 * the foot of the section it is written in, so leaving the wave in the scene
 * put it in the middle of the indigo run: a cream curve with more indigo under
 * it, and no seam at all where the run actually ended. The curve belongs to
 * whichever band is last, and that is now this one. It no longer needs `flush`
 * either, because this band's height is its content's to give.
 */
function DayNotesSection() {
  return (
    <section className="relative bg-indigo-ink-700 text-khadi-100">
      {/* Half the usual space above. This band opens on the same navy the
          pinned scene closes on, so a full section's worth of padding here is
          not a gap between two things; it is a hole in the middle of one. */}
      <Container size="wide" className="pb-section pt-12 sm:pt-14">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Carded, in the same two accents as the blocks above. Two headings
              floating on bare navy underneath a row of solid cards read as
              leftovers rather than as the end of the scene. */}
          <Reveal>
            <div className="relative isolate h-full overflow-hidden rounded-[1.75rem] rounded-tl-md bg-indigo-ink-600 p-7 shadow-lift ring-1 ring-terracotta-300/30">
              <span
                className="pointer-events-none absolute -right-16 -top-20 -z-10 size-52 rounded-full bg-terracotta-300/30 blur-3xl"
                aria-hidden="true"
              />
              <CalendarDays
                className="pointer-events-none absolute -bottom-8 -right-7 -z-10 size-40 text-terracotta-300/[0.18]"
                strokeWidth={1.1}
                aria-hidden="true"
              />
              <span
                className="grid size-11 place-items-center rounded-2xl bg-terracotta-300 text-indigo-ink-800 shadow-soft"
                aria-hidden="true"
              >
                <CalendarDays className="size-5" strokeWidth={1.9} />
              </span>
              <h3 className="mt-5 font-display text-h4 font-semibold text-khadi-50">
                Saturday is not a school day
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-khadi-200/90">
                {programmeDuration.saturday}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative isolate h-full overflow-hidden rounded-[1.75rem] rounded-br-md bg-indigo-ink-600 p-7 shadow-lift ring-1 ring-haldi-300/30">
              <span
                className="pointer-events-none absolute -right-16 -top-20 -z-10 size-52 rounded-full bg-haldi-300/30 blur-3xl"
                aria-hidden="true"
              />
              <Gauge
                className="pointer-events-none absolute -bottom-8 -right-7 -z-10 size-40 text-haldi-300/[0.18]"
                strokeWidth={1.1}
                aria-hidden="true"
              />
              <span
                className="grid size-11 place-items-center rounded-2xl bg-haldi-300 text-indigo-ink-800 shadow-soft"
                aria-hidden="true"
              >
                <Gauge className="size-5" strokeWidth={1.9} />
              </span>
              <h3 className="mt-5 font-display text-h4 font-semibold text-khadi-50">
                How the day is paced
              </h3>
              <ul className="mt-3 space-y-2">
                {planningPrinciples.map((principle) => (
                  <li
                    key={principle}
                    className="flex gap-2.5 text-sm leading-relaxed text-khadi-200/90"
                  >
                    <Grain className="mt-1.5 shrink-0 text-haldi-300" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      <SectionDivider type="wave" to="white" />
    </section>
  )
}

/* ========================================================================== */

function NoExamsSection() {
  return (
    <Section tone="white" id="no-examinations" ambient="warm" labelledBy="exams-title" divider={{ type: 'blob', to: 'terracotta' }}>
      <Container size="wide">
        <SectionHeader
          id="exams-title"
          eyebrow="Assessment"
          title="There are no examinations here. At any stage."
          standfirst="Assessment happens inside the activity itself. A child answers out loud, colours something, draws something or makes something, and that is the record."
        />

        <RevealGroup className="mt-block grid gap-5 md:grid-cols-3">
          {attainmentLevels.map((level, i) => (
            <RevealItem key={level.level} className="h-full">
              <Card
                className="flex h-full flex-col"
                tone={['neem', 'haldi', 'terracotta'][i] as 'neem'}
                object={level.level}
                shape={cardShapeCycle[i % cardShapeCycle.length]}
                backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
              >
                <Marker tone={['neem', 'haldi', 'terracotta'][i] as 'neem'} size="sm">
                  {i + 1}
                </Marker>
                <h3 className="mt-4 font-display text-h3 font-semibold text-indigo-ink-700">
                  {level.level}
                </h3>
                <p className="mt-2 text-body text-ink-500">{level.definition}</p>

                {/* Three levels are a scale, and printing them as three
                    separate cards hides that. The filled segments say where
                    this one sits on it, and they sit on `mt-auto`, so the slack
                    left by the shorter definitions is carrying something
                    instead of being white. */}
                <span
                  className="mt-auto flex items-center gap-1.5 pt-6"
                  aria-hidden="true"
                >
                  {[0, 1, 2].map((step) => (
                    <span
                      key={step}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-colors duration-300',
                        step <= i
                          ? ['bg-neem-400', 'bg-haldi-400', 'bg-terracotta-400'][i]
                          : 'bg-indigo-ink-700/10',
                      )}
                    />
                  ))}
                </span>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* The two text blocks now share a column and the photograph takes the
            other one whole. Before this the list sat alone on the left while
            the picture and the card stacked on the right, and the left column
            ran out 362px above the right: a third of a screen of white beside a
            bulleted list. Stacked together they are also the better pairing,
            since what assessment is and what it never becomes are two halves of
            one answer. */}
        <div className="mt-block grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col lg:col-span-7">
            <Eyebrow className="mb-5">How assessment works</Eyebrow>
            <ul className="space-y-3">
              {assessmentPrinciples.map((principle) => (
                <li key={principle} className="flex gap-3 text-body text-ink-500">
                  <Grain className="mt-1.5 shrink-0 text-terracotta-500" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>

            <Card
              tone="sand"
              object="curriculum-never-see"
              backdrop="blob-duo"
              className="mt-8"
            >
              <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                What you will never see
              </h3>
              {/* Two columns from `sm` up: four short struck-out phrases in a
                  single file is a tall thin list with a lot of air to its
                  right. */}
              <ul className="mt-4 grid gap-x-8 gap-y-2.5 text-body text-ink-500 sm:grid-cols-2">
                {['A mark', 'A grade', 'A rank against other children', 'A written test'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-px w-4 shrink-0 bg-terracotta-400" aria-hidden="true" />
                      <span className="line-through decoration-terracotta-400/60">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </Card>
          </div>

          {/* Height from the grid row rather than an aspect ratio, so the
              picture closes whatever gap the column beside it leaves. */}
          <Reveal direction="left" tier="lead" className="lg:col-span-5">
            <div className="h-72 sm:h-96 lg:h-full lg:min-h-[22rem]">
              <ShapedPhoto
                name="hands-painting"
                shape="crest"
                fill
                interactive
                focus="50% 45%"
                sizes="(min-width: 1024px) 38vw, 92vw"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */

/**
 * The four grounds a numbered point can wear, cycled down a list.
 *
 * These lists were all the same object repeated: a grey rule, a small numeral
 * and a paragraph. Correct, and nothing to hold on to. Rotating the ground, the
 * chip and the corner that is squared off gives each point its own address
 * without any of them being decorated.
 */
/** One icon per reason, in the order the reasons are written. */
const LANGUAGE_ICONS = [MessageCircle, TrendingUp, ArrowLeftRight, Heart]

/** One icon per parent-update point. */
const UPDATE_ICONS = [Camera, ClipboardList, Send]

const POINT_ACCENTS = [
  {
    card: 'bg-terracotta-50/70 ring-terracotta-200/70 hover:ring-terracotta-300',
    chip: 'bg-terracotta-100 text-terracotta-700 ring-terracotta-200',
    mark: 'text-terracotta-300/[0.18]',
    shape: 'rounded-2xl rounded-tl-sm',
  },
  {
    card: 'bg-haldi-100/60 ring-haldi-200/70 hover:ring-haldi-300',
    chip: 'bg-haldi-100 text-haldi-600 ring-haldi-200',
    mark: 'text-haldi-400/[0.18]',
    shape: 'rounded-2xl rounded-br-sm',
  },
  {
    card: 'bg-neem-100/60 ring-neem-200/70 hover:ring-neem-300',
    chip: 'bg-neem-100 text-neem-600 ring-neem-200',
    mark: 'text-neem-400/[0.18]',
    shape: 'rounded-2xl rounded-tr-sm',
  },
  {
    card: 'bg-indigo-ink-50/70 ring-indigo-ink-200/60 hover:ring-indigo-ink-300',
    chip: 'bg-indigo-ink-100 text-indigo-ink-700 ring-indigo-ink-200',
    mark: 'text-indigo-ink-300/[0.18]',
    shape: 'rounded-2xl rounded-bl-sm',
  },
]

/** One numbered point: a chip, an icon watermark, and the sentence. */
function PointCard({
  index,
  icon: Icon,
  children,
}: {
  index: number
  icon: LucideIcon
  children: React.ReactNode
}) {
  const accent = POINT_ACCENTS[index % POINT_ACCENTS.length]
  return (
    <div
      className={cn(
        'group/point relative isolate flex gap-5 overflow-hidden p-6 ring-1',
        'transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        accent.card,
        accent.shape,
      )}
    >
      <Icon
        className={cn(
          'pointer-events-none absolute -bottom-5 -right-4 -z-10 size-28',
          'transition-transform duration-500 ease-out-soft group-hover/point:scale-110 motion-reduce:transition-none',
          accent.mark,
        )}
        strokeWidth={1.1}
        aria-hidden="true"
      />
      <span
        className={cn(
          'font-numeral grid size-10 shrink-0 place-items-center rounded-xl text-sm font-semibold ring-1',
          accent.chip,
        )}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="text-body text-ink-500">{children}</p>
    </div>
  )
}

function LanguageSection() {
  return (
    <Section tone="terracotta" id="mother-tongue" labelledBy="language-title" divider={{ type: 'scallop', to: 'khadi' }}>
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
            <SectionHeader
              id="language-title"
              eyebrow="Language"
              title={languagePosition.headline}
              standfirst={languagePosition.practice}
            />

            {/* A child reading Devanagari is this section's argument as a
                picture, and it fills a column that was otherwise a heading with
                two hundred pixels of empty terracotta under it. Height comes
                from the grid row, so it closes whatever gap the list beside it
                leaves. */}
            <Reveal className="mt-10 lg:flex-1" direction="right" tier="lead">
              <div className="h-64 sm:h-80 lg:h-full lg:min-h-[14rem]">
                <ShapedPhoto
                  name="reading-devanagari"
                  shape="leaf"
                  fill
                  interactive
                  focus="50% 40%"
                  sizes="(min-width: 1024px) 38vw, 92vw"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup className="space-y-4" each={0.06}>
              {languagePosition.reasons.map((reason, i) => (
                <RevealItem key={reason}>
                  <PointCard index={i} icon={LANGUAGE_ICONS[i % LANGUAGE_ICONS.length]}>
                    {reason}
                  </PointCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */

function GoalsSection() {
  return (
    <Section tone="khadi" id="curricular-goals" labelledBy="goals-title" divider={{ type: 'tight-wave', to: 'white' }}>
      <Container size="wide">
        <SectionHeader
          id="goals-title"
          eyebrow="Curricular goals"
          title="Thirteen goals, across six areas of development"
          standfirst="These are the national curricular goals for the Foundational Stage. Our activities are built to move children along them."
        />

        <RevealGroup className="mt-block grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {curricularDomains.map((domain, i) => (
            <RevealItem key={domain.slug} className="h-full">
              <Card
                className="flex h-full flex-col"
                object={domain.slug}
                shape={cardShapeCycle[i % cardShapeCycle.length]}
                backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
              >
                <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                  {domain.domain}
                </h3>
                <ul className="mt-4 space-y-3">
                  {domain.goals.map((goal) => (
                    <li key={goal.id} className="flex gap-3">
                      <span className="font-numeral shrink-0 text-xs font-semibold text-terracotta-600">
                        {goal.id}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-500">{goal.text}</span>
                    </li>
                  ))}
                </ul>

                {/* The domains carry between one and four goals each, and the
                    cards stretch to the tallest in their row, so the short ones
                    ended on a block of empty paper. The count sits on `mt-auto`
                    and closes the card off, and it is worth saying anyway: the
                    thirteen in the heading has to add up somewhere. */}
                <p className="mt-auto flex items-center gap-2 pt-6 text-xs font-medium uppercase tracking-[0.12em] text-ink-400">
                  <span className="h-px w-6 bg-khadi-400" aria-hidden="true" />
                  {domain.goals.length} {domain.goals.length === 1 ? 'goal' : 'goals'}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-block">
          <MotifDivider />
        </Reveal>

        <div className="mt-block grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
            <Eyebrow className="mb-4">Where the framework comes from</Eyebrow>
            <h3 className="font-display text-h2 font-semibold text-indigo-ink-700">
              Panchakosha, mapped onto developmental science
            </h3>

            {/* A heading and nothing else left most of this column empty beside
                a five-row table. Height comes from the grid row, so the picture
                closes exactly the gap the table leaves. */}
            <Reveal className="mt-8 lg:flex-1" direction="right">
              <div className="h-56 sm:h-72 lg:h-full lg:min-h-[13rem]">
                <ShapedPhoto
                  name="child-sorting-board"
                  shape="cut"
                  fill
                  interactive
                  focus="40% 50%"
                  sizes="(min-width: 1024px) 38vw, 92vw"
                />
              </div>
            </Reveal>

            {/* Visible attribution, which this photograph requires: it is
                CC BY 2.0, not one of the no-credit stock licences the rest of
                the site's pictures carry. */}
            <p className="mt-3 text-2xs leading-relaxed text-ink-400">
              Photograph by Shixart1985,{' '}
              <a
                href="https://creativecommons.org/licenses/by/2.0"
                className="underline decoration-ink-400/40 underline-offset-2 hover:text-ink-500"
                rel="license noopener noreferrer"
                target="_blank"
              >
                CC BY 2.0
              </a>
              , via Wikimedia Commons.
            </p>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup className="overflow-hidden rounded-xl hairline">
              <div className="hidden bg-khadi-200 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 sm:grid sm:grid-cols-2">
                <span>Kosha</span>
                <span>Modern domain</span>
              </div>
              {panchakosha.map((row) => (
                <RevealItem key={row.transliteration}>
                  <div className="grid gap-1 border-t border-khadi-300 bg-khadi-50 px-6 py-4 sm:grid-cols-2 sm:items-center sm:gap-4">
                    <div>
                      <span className="font-deva text-base text-indigo-ink-700">{row.kosha}</span>
                      <span className="ml-2 text-sm text-ink-400">
                        {row.transliteration}
                      </span>
                      <span className="block text-xs text-ink-400">{row.gloss}</span>
                    </div>
                    <span className="text-sm font-medium text-ink-600">{row.domain}</span>
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

/* ========================================================================== */

function PrinciplesSection() {
  return (
    <Section tone="white" id="principles" labelledBy="principles-title" divider={{ type: 'reverse', to: 'neem' }}>
      <Container size="wide">
        <SectionHeader
          id="principles-title"
          eyebrow="Design principles"
          title="Ten principles we treat as non-negotiable"
          standfirst="Taken directly from NCERT’s Guidelines for Preschool Education. Everything else on this page follows from them."
        />

        {/* Ten hairline rules down a page is a table of contents, not ten
            things a school will not compromise on. Each principle now sits on
            its own tinted ground with its number in a chip, and the grounds
            rotate so the column reads as ten items rather than one block. */}
        <RevealGroup className="mt-block grid gap-4 sm:grid-cols-2" each={0.04}>
          {guidingPrinciples.map((principle, i) => (
            <RevealItem key={principle} className="h-full">
              {(() => {
                const accent = POINT_ACCENTS[i % POINT_ACCENTS.length]
                return (
                  <div
                    className={cn(
                      'group/point flex h-full items-start gap-4 p-5 ring-1',
                      'transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1',
                      'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                      accent.card,
                      accent.shape,
                    )}
                  >
                    <span
                      className={cn(
                        'font-numeral grid size-9 shrink-0 place-items-center rounded-lg text-xs font-semibold ring-1',
                        accent.chip,
                      )}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-body text-ink-600">{principle}</p>
                  </div>
                )
              })()}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

/* ========================================================================== */

function EthicsSection() {
  return (
    <Section tone="neem" id="ethics" labelledBy="ethics-title" divider={{ type: 'cloud', to: 'khadi' }}>
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-6">
            <SectionHeader
              id="ethics-title"
              eyebrow="Values, taught as reasoning"
              title="Two questions, asked instead of a rule"
              standfirst="Character education here is not a list of rules recited at children. It is a habit of asking themselves something before they act."
            />

            {/* A child mid-thought, which is the whole claim of this section:
                the pause before acting, not a rule recited at them. It also
                fills a column that was a heading and three lines of standfirst
                against two large quotations. */}
            <Reveal className="mt-10 lg:flex-1" direction="right" tier="lead">
              <div className="h-64 sm:h-80 lg:h-full lg:min-h-[13rem]">
                <ShapedPhoto
                  name="toddler-focused"
                  shape="leaf-alt"
                  fill
                  interactive
                  focus="50% 40%"
                  sizes="(min-width: 1024px) 46vw, 92vw"
                />
              </div>
            </Reveal>
          </div>

          {/* The two questions grow to meet the column opposite instead of
              sitting at the top of it. They are the loudest thing in the
              section and they were the smallest: two short panels with a third
              of the band empty underneath them. Given the height, they read as
              the two things a child is asked to weigh. */}
          <div className="flex flex-col lg:col-span-6">
            <RevealGroup className="flex flex-1 flex-col gap-4">
              {ethicsQuestions.map((q) => (
                <RevealItem key={q} className="flex-1">
                  <div className="flex h-full items-center rounded-xl bg-khadi-50 p-8 hairline">
                    <p className="font-display text-h2 leading-snug text-indigo-ink-700">“{q}”</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-6">
              <TextLink to={routes.lbsWay}>
                How this runs through Shastri Sanskaar and SIMPLE
              </TextLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */

function WhatYouSeeSection() {
  return (
    <Section tone="khadi" id="what-you-see" labelledBy="see-title" divider={{ type: 'layered', fill: 'var(--color-terracotta-600)' }}>
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
            <SectionHeader
              id="see-title"
              eyebrow="What reaches you"
              title={parentUpdates.headline}
              standfirst="Assessment without exams only means something if you can see it. Here is what you get."
            />

            {/* The people the updates are for. Same reason as the language
                band: the heading alone left most of this column empty. */}
            <Reveal className="mt-10 lg:flex-1" direction="right" tier="lead">
              <div className="h-64 sm:h-80 lg:h-full lg:min-h-[16rem]">
                <ShapedPhoto
                  name="family-at-home"
                  shape="cut-alt"
                  fill
                  interactive
                  focus="50% 35%"
                  sizes="(min-width: 1024px) 38vw, 92vw"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup className="space-y-4">
              {parentUpdates.points.map((point, i) => (
                <RevealItem key={point}>
                  <PointCard index={i} icon={UPDATE_ICONS[i % UPDATE_ICONS.length]}>
                    {point}
                  </PointCard>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-8">
              <Card tone="sand" object="curriculum-family" backdrop="mint-semi">
                <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                  {familyInvolvement.principle}
                </h3>
                <ul className="mt-4 space-y-2">
                  {familyInvolvement.practices.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink-500">
                      <Grain className="mt-1.5 shrink-0 text-neem-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ========================================================================== */

export default CurriculumPage
