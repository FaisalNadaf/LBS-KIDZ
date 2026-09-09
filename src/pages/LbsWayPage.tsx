import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { articleSchema } from '@/lib/schema'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card, Chip, Marker, cardBackdropCycle, cardShapeCycle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { PhaseNote } from '@/components/ui/misc'
import { TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { Hand, ShoppingBasket, Users, Utensils, Wheat, type LucideIcon } from 'lucide-react'
import { Grain, Lantern } from '@/components/art/primitives'
import { Photo, ShapedPhoto } from '@/components/media/Photo'
import {
  littleKarmayogis,
  sanskaarHabits,
  sankalpCalendar,
  sankalpConstraints,
  sankalpProcess,
  simplePillars
} from '@/data/brand-framework'
import { routes } from '@/data/routes'
import { cn } from '@/lib/cn'

/**
 * The Lal Bahadur Shastri Way.
 *
 * Houses SIMPLE, Little Karmayogis, Shastri Sanskaar and the Sankalp Calendar,
 * which the sitemap calls "the brand/character layer".
 * Source: Full Website Sitemap S1.1.
 *
 * Keyword discipline, stated explicitly in the strategy:
 *   "Brand/emotional page - do not force Tier A/B or Tier B/C keywords here,
 *    they belong on Curriculum & Learning Approach."
 *   Source: Keyword & AEO Strategy S3.
 *
 * Honesty constraint carried onto the page itself, because the source documents
 * are unambiguous that these are communication devices and not a curriculum.
 * Source: Project Decisions Log S8.
 */
export function LbsWayPage() {
  return (
    <>
      <Seo
        page={pageSeo.lbsWay}
        schemas={[
          articleSchema({
            headline: 'The Lal Bahadur Shastri Way',
            description: pageSeo.lbsWay.description,
            path: pageSeo.lbsWay.path,
            section: 'Shastri Ji Legacy'
          }),
        ]}
      />

      <PageHeader
        eyebrow="The Lal Bahadur Shastri Way"
        title="The LBS Way"
        dividerTo="white"
        standfirst="Four named things sit under everything a child does here. They are not search terms. They are what you find once you have arrived."
        photo="child-arms-open"
        photoFocus="50% 30%"
      />

      {/* ---- Little Karmayogis ---- */}
      <Section
        tone="white"
        id="little-karmayogis"
        labelledBy="karmayogis-title"
        divider={{ type: 'gentle', to: 'khadi' }}
      >
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader
                id="karmayogis-title"
                eyebrow={littleKarmayogis.role}
                title={littleKarmayogis.name}
                standfirst={littleKarmayogis.usedWhere}
              />

              {/* Where the name is actually used. The column held four short
                  lines against a full-height photograph, so the band read as
                  half empty; this is content the section was already making a
                  claim about ("in the classroom and in every parent
                  communication") without ever showing it. */}
              <Reveal className="mt-8" delay={0.06}>
                <ul className="flex flex-wrap gap-2.5">
                  {['In the classroom', 'On the report home', 'In every parent message'].map(
                    (where) => (
                      <li
                        key={where}
                        className="inline-flex items-center gap-2 rounded-full bg-khadi-100 px-4 py-2 text-small font-semibold text-indigo-ink-700 hairline"
                      >
                        <Grain className="shrink-0 text-terracotta-500" />
                        {where}
                      </li>
                    ),
                  )}
                </ul>
              </Reveal>
            </div>
            {/* The quotation is about one child not being a number, and it
                used to be set on an empty indigo panel with a lantern on it.
                A single child, looking straight out, is the whole argument;
                the words now sit over her rather than beside nothing. */}
            <Reveal className="lg:col-span-6" delay={0.08} direction="right">
              <figure className="relative isolate overflow-hidden rounded-xl shadow-lift">
                <Photo
                  name="child-standing-dungarees"
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  /* 4:3, not 4:5. The portrait crop made this the tallest
                     thing in the row by a long way, and since the text column
                     beside it is four short lines the band ended up mostly
                     empty on the left. A landscape crop brings the two columns
                     within reach of each other. */
                  ratio="4 / 3"
                  focus="50% 22%"
                  className="rounded-none!"
                  imgClassName="transition-transform duration-700 ease-out-soft hover:scale-[1.03] motion-reduce:transition-none"
                />
                {/* A scrim, not a tint: the quotation sits in the lower half, so
                    the gradient is opaque where the words are and clear over her
                    face. A flat overlay would dull the whole photograph to
                    protect two lines of text. */}
                <div
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-indigo-ink-900/92 via-indigo-ink-900/55 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <span className="mx-auto mb-4 block h-12 w-fit text-haldi-300">
                    <Lantern />
                  </span>
                  <blockquote className="font-display text-h3 leading-snug text-khadi-50">
                    “Your child is not a student number here. They are a Little Karmayogi.”
                  </blockquote>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- SIMPLE ---- */}
      <Section
        tone="khadi"
        id="simple"
        labelledBy="simple-title"
        divider={{ type: 'blob', to: 'terracotta' }}
      >
        <Container size="wide">
          <SectionHeader
            id="simple-title"
            eyebrow="The values framework"
            title="SIMPLE"
            standfirst="Six pillars, taken from the documented character of one man rather than from an abstract theory of education."
          />

          {/*
            Six cards holding the same three things, so the grid is a grid.
            Two of them used to carry an NCERT citation as well, which made
            those two roughly twice the height of the rest; the row stretched to
            the tallest and the four short ones were left with a third of their
            surface empty. The NCERT citations that caused it have been taken off
            this page at the client's request. The same sourcing is still set
            out in full on the Curriculum page, which is where the framework's
            alignment claims are actually made.
          */}
          <RevealGroup className="mt-block grid gap-5 md:grid-cols-2 lg:grid-cols-3" each={0.05}>
            {simplePillars.map((pillar, i) => (
              <RevealItem key={pillar.name} className="h-full">
                <Card
                  className="flex h-full flex-col"
                  interactive
                  object={pillar.name}
                  shape={cardShapeCycle[i % cardShapeCycle.length]}
                  backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                >
                  <div className="flex items-center gap-4">
                    <Marker tone="terracotta" size="lg">
                      {pillar.letter}
                    </Marker>
                    <h3 className="font-display text-h3 font-semibold text-indigo-ink-700">
                      {pillar.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-body text-ink-500">{pillar.summary}</p>
                  {pillar.ncertAnchor?.goals.length ? (
                    <div className="mt-4 flex gap-1.5">
                      {pillar.ncertAnchor.goals.map((goal) => (
                        <Chip key={goal} tone="accent">
                          {goal}
                        </Chip>
                      ))}
                    </div>
                  ) : null}
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---- Shastri Sanskaar ---- */}
      <Section
        tone="terracotta"
        id="shastri-sanskaar"
        ambient="growth"
        labelledBy="sanskaar-title"
        divider={{ type: 'scallop', to: 'white' }}
      >
        <Container size="wide">
          <SectionHeader
            id="sanskaar-title"
            eyebrow="Manners and respect"
            title="Shastri Sanskaar"
            standfirst="Five habit areas, woven into moments that already exist in the day rather than taught as a separate subject."
          />

          {/*
            The five habits ring a centre, rather than sitting in a row of five
            narrow columns above an unrelated 21:9 photograph. Two on each side
            and one below, which is as close to a ring as five readable text
            cards get: a true polar layout puts them on a circle, and at the
            width a sentence needs they then overlap each other.

            The medallion is `lg:row-span-2`, so the two flanking pairs sit
            against it at full height and the grid stays a grid. Below `lg`
            everything stacks and the medallion goes first, because on a phone
            "surrounded by" is not a thing a single column can express.
          */}
          <div className="mt-block grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {/* --- Left pair --- */}
            <HabitCard
              habit={sanskaarHabits[0]}
              index={0}
              className="lg:col-span-3 lg:col-start-1"
            />
            <HabitCard
              habit={sanskaarHabits[1]}
              index={1}
              className="lg:col-span-3 lg:col-start-1 lg:row-start-2"
            />

            {/* --- The centre --- */}
            <Reveal
              direction="scale"
              tier="lead"
              className="order-first sm:col-span-2 lg:order-none lg:col-span-6 lg:col-start-4 lg:row-span-2 lg:row-start-1"
            >
              {/* Khadi, not indigo. The portrait is a grey halftone print, and
                  on a deep blue panel the paper it was printed on reads as a
                  pale halo around him however far the mask is feathered. On the
                  site's own paper colour there is nothing to give away. */}
              <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-khadi-50 p-8 text-center shadow-lift hairline sm:p-10">
                {/*
                  Lal Bahadur Shastri, from an India Post commemorative stamp,
                  released under the Government Open Data License. It is the
                  only photograph of a real, named person anywhere on this site,
                  which is why its provenance is recorded in image-credits.json
                  rather than left to a filename.

                  Transparent by cut-out, not by keying: the stamp is a printed
                  halftone on a mottled ground, so there is no flat colour to
                  remove. It carries a feathered circular alpha mask instead,
                  which is what lets it sit on the khadi panel with no edge.

                  Outside `Photo` and the generated manifest on purpose. That
                  pipeline emits AVIF, WebP and JPEG at four widths, and JPEG
                  has no alpha channel; this is one fixed-size asset, so it is
                  a plain `<picture>` with the WebP first and the PNG behind it.
                */}
                <picture>
                  <source srcSet="/images/lal-bahadur-shastri.webp" type="image/webp" />
                  <img
                    src="/images/lal-bahadur-shastri.png"
                    alt="Lal Bahadur Shastri, India's second Prime Minister"
                    width={480}
                    height={480}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto size-40 sm:size-48"
                  />
                </picture>
                <p className="mt-6 text-2xs font-semibold uppercase tracking-[0.16em] text-haldi-300">
                  The habit, not the lecture
                </p>
                <p className="mt-3 font-display text-h3 leading-snug text-indigo-ink-700">
                  Five habits a child practises inside the day they already have.
                </p>
              </div>
            </Reveal>

            {/* --- Right pair --- */}
            <HabitCard
              habit={sanskaarHabits[2]}
              index={2}
              className="lg:col-span-3 lg:col-start-10 lg:row-start-1"
            />
            <HabitCard
              habit={sanskaarHabits[3]}
              index={3}
              className="lg:col-span-3 lg:col-start-10 lg:row-start-2"
            />

            {/* --- Below the centre --- */}
            <HabitCard
              habit={sanskaarHabits[4]}
              index={4}
              className="sm:col-span-2 lg:col-span-6 lg:col-start-4 lg:row-start-3"
              wide
            />
          </div>

        </Container>
      </Section>

      {/* ---- Sankalp Calendar ---- */}
      <Section
        tone="white"
        id="sankalp-calendar"
        labelledBy="sankalp-title"
        divider={{ type: 'asymmetric', to: 'indigo' }}
      >
        <Container size="wide">
          {/* The photograph is the thing that absorbs the difference between
              the two columns, which is why it takes its height from the grid
              rather than from an aspect ratio. Before this the left column ran
              a fixed 4:3 picture under the heading and the right column ran out
              of content well above it, leaving a bay of empty white about two
              hundred pixels deep at the bottom right of the section. A picture
              that stretches cannot leave that gap: whichever column is taller
              sets the row, and the photograph fills what is left of the other. */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col lg:col-span-5">
              <SectionHeader
                id="sankalp-title"
                eyebrow="The weekly rhythm"
                title={sankalpCalendar.name}
                standfirst={`${sankalpCalendar.cadence}. The value moment sits at ${sankalpCalendar.daySlot}, and the same small action goes home with your child.`}
              />
              <Reveal className="mt-8 lg:flex-1">
                {/* An explicit height below `lg`, where there is no grid row to
                    inherit one from and `h-full` would resolve to nothing. */}
                <div className="h-64 sm:h-80 lg:h-full lg:min-h-[10rem]">
                  <ShapedPhoto
                    name="craft-outdoors"
                    shape="crest-alt"
                    fill
                    interactive
                    focus="50% 40%"
                    sizes="(min-width: 1024px) 38vw, 92vw"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {/* No list of pillars here. This page sets all six out in full,
                  with their meanings, at the top; naming them again two screens
                  later is the reader being told the same six things twice. What
                  this section is actually about is the rhythm, so that is all it
                  says.

                  The paragraph that used to open this column has gone with it.
                  "Each day of the week takes one pillar, and each pillar becomes
                  one small action at Goodbye Circle" is the standfirst opposite
                  rewritten: same cadence, same slot, same promise, twice on one
                  screen. The eyebrow above it went too, for the same reason the
                  pillars did. */}

              <Reveal className="mt-6">
                <PhaseNote>
                  Which weekday carries which pillar is being fixed as part of the curriculum
                  workstream, alongside the actual day-by-day actions. We would rather publish the
                  finished week than a version that changes under you.
                </PhaseNote>
              </Reveal>

              <Reveal className="mt-8">
                <Card tone="sand" object="lbs-way-proof" backdrop="yellow-block">
                  <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                    Proof of action, not a test
                  </h3>
                  <p className="mt-2 text-body text-ink-500">
                    Every activity produces one of four things, matched to what is realistic for the
                    age band.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {sankalpCalendar.proofFormats.map((format) => (
                      <li key={format}>
                        <Chip tone="accent">{format}</Chip>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Constraints and process ---- */}
      <Section
        tone="indigo"
        id="how-it-is-built"
        labelledBy="build-title"
        divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}
      >
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                id="build-title"
                eyebrow="How this gets built"
                title="Rules we set for ourselves first"
                standfirst="These constraints were written before any activity was. They are what stop a values programme turning into homework."
                onDark
              />
              <Reveal className="mt-8">
                <ul className="space-y-3">
                  {sankalpConstraints.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-khadi-200/90">
                      <Grain className="mt-1.5 shrink-0 text-haldi-300" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup className="space-y-4">
                {sankalpProcess.map((step, i) => (
                  <RevealItem key={step.step}>
                    <div className="flex gap-5 rounded-lg bg-khadi-50/[0.07] p-6">
                      <span className="font-numeral shrink-0 text-sm font-semibold text-haldi-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-display text-h4 font-semibold text-khadi-50">
                          {step.step}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-khadi-200/85">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

            </div>
          </div>

          {/* The standing constraint from the Project Decisions Log: these four
              names are branding and communication devices, and nothing on this
              site may present them as a taught syllabus. It used to have a band
              and a divider of its own at the foot of the page for one
              paragraph. The paragraph is the part that matters, so it stays;
              the band it was sitting in does not. */}
          <Reveal className="mt-block">
            <PhaseNote onDark>
              SIMPLE, Little Karmayogis, Shastri Sanskaar and the Sankalp Calendar are how we name
              and communicate our character work. They are not a curriculum, a lesson plan or a
              formal assessment framework. What a child is actually taught follows NCERT’s
              Foundational Stage guidance, which is set out in full on our{' '}
              <TextLink to={routes.curriculum} onDark>
                Curriculum &amp; Learning Approach
              </TextLink>{' '}
              page.
            </PhaseNote>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

export default LbsWayPage

/**
 * One Shastri Sanskaar habit.
 *
 * Each carries its own icon rather than the single generic grain mark all five
 * used to share. Five identical marks above five different headings is a
 * decoration that has stopped carrying information; a plate, a basket and a
 * pair of hands tell a parent what the habit is before they have read the
 * title.
 */
const HABIT_ICONS: Record<string, LucideIcon> = {
  greetings: Hand,
  'respect-for-elders': Users,
  'table-manners': Utensils,
  'food-gratitude': Wheat,
  'honesty-shop': ShoppingBasket
}

function HabitCard({
  habit,
  index,
  className,
  wide = false
}: {
  habit: (typeof sanskaarHabits)[number]
  /** Position in the ring. Used only to vary the backdrop. */
  index: number
  className?: string
  /** The card under the medallion, which has twice the width to fill. */
  wide?: boolean
}) {
  const Icon = HABIT_ICONS[habit.slug] ?? Hand

  return (
    <RevealItem className={cn('h-full', className)}>
      <Card
        id={habit.slug}
        interactive
        shape="cut"
        backdrop={cardBackdropCycle[index % cardBackdropCycle.length]}
        className={cn('flex h-full flex-col', wide && 'sm:flex-row sm:items-start sm:gap-6')}
      >
        <span
          className="grid size-12 shrink-0 place-items-center rounded-lg bg-terracotta-50 text-terracotta-600 transition-transform duration-300 ease-out-soft group-hover/card:-translate-y-0.5 group-hover/card:scale-105"
          aria-hidden="true"
        >
          <Icon className="size-5" strokeWidth={1.9} />
        </span>

        <div className={cn(!wide && 'mt-4', wide && 'mt-4 sm:mt-0')}>
          <h3 className="font-display text-h4 font-semibold leading-snug text-indigo-ink-700">
            {habit.name}
          </h3>
          <p className="mt-2.5 text-small leading-relaxed text-ink-500">{habit.summary}</p>
          <p className="mt-4 inline-flex rounded-full bg-terracotta-50 px-3 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-terracotta-700">
            {habit.dayMoment}
          </p>
        </div>
      </Card>
    </RevealItem>
  )
}
