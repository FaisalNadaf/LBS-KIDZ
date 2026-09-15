import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { articleSchema } from '@/lib/schema'
import { Container, Eyebrow, Section, SectionHeader } from '@/components/ui/layout'
import { Card, Chip, Marker, cardBackdropCycle, cardShapeCycle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { PhaseNote } from '@/components/ui/misc'
import { ButtonLink, TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import {
  ArrowRight,
  Hand,
  MessageCircleHeart,
  Sparkles,
  Users,
  Utensils,
  Wheat,
  type LucideIcon,
} from 'lucide-react'
import { Grain, Lantern } from '@/components/art/primitives'
import { Photo, PhotoOnColour, ShapedPhoto } from '@/components/media/Photo'
import {
  lbsWayIntro,
  livingTheLegacy,
  littleKarmayogis,
  sankalpCalendar,
  sankalpConstraints,
  sankalpProcess,
  sanskaarHabits,
  sanskaarIntro,
  simpleIntro,
  simplePillars,
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
/**
 * The six SIMPLE letters in the logo's own letter colours, in the logo's order:
 * blue, green, orange, blue, coral, sky. Each at a step that clears 3:1 on the
 * white seal it sits on.
 */
const INTRO_LETTER_TONES = [
  'text-brand-500',
  'text-green-600',
  'text-orange-500',
  'text-brand-500',
  'text-coral-500',
  'text-sky-600',
]

/**
 * The intro's lead sentence with one phrase lifted: a soft band of the logo's
 * orange behind the words, low on the line so it reads as a highlighter stroke
 * rather than a box.
 */
function EmphasisedLead({ text, emphasis }: { text: string; emphasis: string }) {
  const at = text.indexOf(emphasis)
  if (at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <span className="bg-[linear-gradient(transparent_62%,color-mix(in_oklab,var(--color-orange-300)_55%,transparent)_62%)] px-0.5 [box-decoration-break:clone]">
        {emphasis}
      </span>
      {text.slice(at + emphasis.length)}
    </>
  )
}

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
        eyebrow={lbsWayIntro.eyebrow}
        title={lbsWayIntro.headline}
        dividerTo="white"
        standfirst={lbsWayIntro.subheading}
        photo="children-waving-flags"
        photoFocus="35% 50%"
      />

      {/* ---- Intro: from a life to a habit ----
          The specification's Section 1 body, which the page header has no slot
          for. It used to be one grey paragraph alone in a narrow column, which
          read as a caption that had lost its picture.

          Now the paragraph is set out the way it argues: the first sentence is
          the claim, so it is the lead; the second says what the school does
          with it; and the age range it ends on becomes the two steps it
          describes. The words are `lbsWayIntro.body`, split, not rewritten.

          The photograph is a child caring for a tulsi plant: one small,
          repeated act of looking after something, which is what a
          two-year-old's first small habits look like in practice. */}
      <Section tone="white" id="lbs-way-intro" labelledBy="lbs-way-intro-lead">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="right" tier="lead" className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
                <PhotoOnColour
                  name="girl-with-tulsi-plant"
                  shape="leaf"
                  colour="sky"
                  depth="plate"
                  spread="block"
                  lean="left"
                  sizes="(min-width: 1024px) 34vw, 88vw"
                  ratio="4 / 5"
                  focus="50% 28%"
                />

                {/* The framework the rest of the page unpacks, as a seal on the
                    photograph: six letters in the logo's own colours. Decorative
                    here; SIMPLE is introduced properly two sections down. */}
                <div
                  className="absolute -bottom-5 -right-2 flex items-center gap-1 rounded-full bg-white px-4 py-2.5 shadow-lift ring-1 ring-mist-300 sm:-right-5"
                  aria-hidden="true"
                >
                  {['S', 'I', 'M', 'P', 'L', 'E'].map((letter, i) => (
                    <span
                      key={letter}
                      className={cn('font-display text-lg font-semibold leading-none', INTRO_LETTER_TONES[i])}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Living values</Eyebrow>
              </Reveal>

              <Reveal delay={0.06}>
                <p
                  id="lbs-way-intro-lead"
                  className="mt-4 max-w-[26ch] font-display text-h2 font-medium text-brand-700"
                >
                  <EmphasisedLead text={lbsWayIntro.lead} emphasis={lbsWayIntro.leadEmphasis} />
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[48ch] text-lead text-ink-600">{lbsWayIntro.practice}</p>
              </Reveal>

              {/* The two ends of the range, joined. An ordered list, because it
                  is one: read aloud it finishes the sentence above in order. */}
              <RevealGroup as="ol" className="relative mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1 lg:gap-4 xl:grid-cols-2 xl:gap-6" each={0.1}>
                {lbsWayIntro.ageRange.map((step, i) => (
                  <RevealItem as="li" key={step.years} className="relative h-full">
                    <div
                      className={cn(
                        'flex h-full items-center gap-4 rounded-xl p-5 ring-1 ring-inset transition-shadow duration-300 hover:shadow-card sm:p-6',
                        i === 0 ? 'bg-sky-50 ring-sky-200' : 'bg-green-50 ring-green-200',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-16 shrink-0 place-content-center rounded-full bg-white text-center shadow-soft',
                          i === 0 ? 'text-sky-600' : 'text-green-600',
                        )}
                      >
                        <span className="font-numeral text-3xl font-semibold leading-none">{step.years}</span>
                        <span className="mt-1 text-2xs font-semibold uppercase tracking-[0.12em]">years</span>
                      </span>
                      <span className="font-display text-h4 font-semibold text-brand-700">{step.text}</span>
                    </div>

                    {/* The step between them: an arrow on the seam, sky into
                        green, the logo's two colours for growing. */}
                    {i === 0 ? (
                      <span
                        className="absolute -right-3 top-1/2 z-10 hidden size-7 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-white text-green-600 shadow-soft ring-1 ring-mist-300 sm:grid lg:hidden xl:grid"
                        aria-hidden="true"
                      >
                        <ArrowRight className="size-3.5" strokeWidth={2.5} />
                      </span>
                    ) : null}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Little Karmayogis ---- */}
      <Section
        tone="white"
        id="little-karmayogis"
        labelledBy="karmayogis-title"
        divider={{ type: 'gentle', to: 'mist' }}
      >
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader
                id="karmayogis-title"
                eyebrow={littleKarmayogis.role}
                title={littleKarmayogis.headline}
                standfirst={littleKarmayogis.body}
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
                        className="inline-flex items-center gap-2 rounded-full bg-mist-100 px-4 py-2 text-small font-semibold text-brand-700 hairline"
                      >
                        <Grain className="shrink-0 text-sky-500" />
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
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-900/92 via-brand-900/55 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <span className="mx-auto mb-4 block h-12 w-fit text-orange-300">
                    <Lantern />
                  </span>
                  <blockquote className="font-display text-h3 leading-snug text-mist-50">
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
        tone="mist"
        id="simple"
        labelledBy="simple-title"
        divider={{ type: 'blob', to: 'sky' }}
      >
        <Container size="wide">
          <SectionHeader
            id="simple-title"
            eyebrow="The values framework"
            title={simpleIntro.headline}
            standfirst={simpleIntro.intro}
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
                    <Marker tone="sky" size="lg">
                      {pillar.letter}
                    </Marker>
                    <h3 className="font-display text-h3 font-semibold text-brand-700">
                      {pillar.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-body text-ink-500">{pillar.summary}</p>

                  {/* How it is practised, which is what makes the card a
                      practice rather than a definition. The specification is
                      explicit that this must not render as a plain data table
                      on the live site, so the two halves of its table become
                      the two halves of a card. */}
                  <p className="mt-4 border-t border-mist-300 pt-4 text-small leading-relaxed text-ink-600">
                    <span className="font-semibold text-brand-700">In practice: </span>
                    {pillar.practice}
                  </p>

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
        tone="sky"
        id="shastri-sanskaar"
       
        labelledBy="sanskaar-title"
        divider={{ type: 'scallop', to: 'white' }}
      >
        <Container size="wide">
          <SectionHeader
            id="sanskaar-title"
            eyebrow="Manners and respect"
            title={sanskaarIntro.headline}
            standfirst={sanskaarIntro.body}
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
              {/* White, not deep blue. The portrait is a grey halftone print, and
                  on a deep blue panel the paper it was printed on reads as a
                  pale halo around him however far the mask is feathered. On the
                  site's own paper colour there is nothing to give away. */}
              <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-mist-50 p-8 text-center shadow-lift hairline sm:p-10">
                {/*
                  Lal Bahadur Shastri, from an India Post commemorative stamp,
                  released under the Government Open Data License. It is the
                  only photograph of a real, named person anywhere on this site,
                  which is why its provenance is recorded in image-credits.json
                  rather than left to a filename.

                  Transparent by cut-out, not by keying: the stamp is a printed
                  halftone on a mottled ground, so there is no flat colour to
                  remove. It carries a feathered circular alpha mask instead,
                  which is what lets it sit on the light panel with no edge.

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
                    draggable={false}
                    className="mx-auto size-40 sm:size-48"
                  />
                </picture>
                <p className="mt-6 text-2xs font-semibold uppercase tracking-[0.16em] text-orange-600">
                  The habit, not the lecture
                </p>
                {/* Counted from the list rather than written out. It read
                    "Five habits" for as long as there were five, and went on
                    reading "Five" after the Honesty Shop came out and two
                    others went in. */}
                <p className="mt-3 font-display text-h3 leading-snug text-brand-700">
                  {sanskaarHabits.length} habits a child practises inside the day they already
                  have.
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

            {/* --- Below the centre ---
                 Whatever is left after the two flanking pairs, rather than one
                 hard-coded card. The habit list grew from five to six when the
                 Honesty Shop came out and "caring for shared spaces" and the
                 thank-you/sorry pair went in, and a fixed `sanskaarHabits[4]`
                 silently dropped the last one on the floor. */}
            <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 lg:col-span-6 lg:col-start-4 lg:row-start-3 lg:gap-5">
              {sanskaarHabits.slice(4).map((habit, i) => (
                <HabitCard key={habit.slug} habit={habit} index={i + 4} />
              ))}
            </div>
          </div>

        </Container>
      </Section>

      {/* ---- Sankalp Calendar ---- */}
      <Section
        tone="white"
        id="sankalp-calendar"
        labelledBy="sankalp-title"
        divider={{ type: 'asymmetric', to: 'brand' }}
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
                title={sankalpCalendar.headline}
                standfirst={sankalpCalendar.body}
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

              {/* The example themes. Illustrative only, and labelled as such:
                  "final calendar content to be provided separately."
                  Source: LBS Way Page Content S8. */}
              <Reveal className="mt-8">
                <Card tone="paper" object="sankalp-examples" backdrop="beige-arc">
                  <h3 className="font-display text-h4 font-semibold text-brand-700">
                    What a Sankalp looks like
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {sankalpCalendar.examples.map((theme) => (
                      <li key={theme}>
                        <Chip tone="accent">{theme}</Chip>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-small leading-relaxed text-ink-400">
                    {sankalpCalendar.examplesNote}
                  </p>
                </Card>
              </Reveal>

              <Reveal className="mt-8">
                <Card tone="mist" object="lbs-way-proof" backdrop="yellow-block">
                  <h3 className="font-display text-h4 font-semibold text-brand-700">
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
        tone="brand"
        id="how-it-is-built"
        labelledBy="build-title"
        /* Hands over to Living the Legacy below, which is mist. It was
           filled with the coral of the site-wide CTA band, which does not
           follow this page any more. */
        divider={{ type: 'cloud', to: 'mist' }}
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
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-mist-200/90">
                      <Grain className="mt-1.5 shrink-0 text-orange-300" />
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
                    <div className="flex gap-5 rounded-lg bg-mist-50/[0.07] p-6">
                      <span className="font-numeral shrink-0 text-sm font-semibold text-orange-200">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-display text-h4 font-semibold text-mist-50">
                          {step.step}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-mist-200/85">
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

      {/* ---- Living the Legacy ----
           Section 6, and the page's primary navigational intent: it is not a
           conversion page, and these two links are the only things it asks a
           reader to do. */}
      <Section
        tone="mist"
        id="living-the-legacy"
        labelledBy="living-legacy-title"
        divider={{ type: 'layered', fill: 'var(--color-brand-800)' }}
      >
        <Container size="narrow">
          <Reveal className="text-center">
            <h2 id="living-legacy-title" className="text-h2">
              {livingTheLegacy.headline}
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-lead text-ink-500">
              {livingTheLegacy.body}
            </p>
          </Reveal>

          <Reveal className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink to={routes.familyMessage} variant="primary" withArrow>
              A Message from the Family
            </ButtonLink>
            <ButtonLink to={routes.foundersNote} variant="outline" withArrow>
              Read the Founder&rsquo;s Note
            </ButtonLink>
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
  'thank-you-and-sorry': MessageCircleHeart,
  'listening-to-elders': Users,
  'shared-spaces': Sparkles,
  'table-manners': Utensils,
  'food-gratitude': Wheat,
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
          className="grid size-12 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-500 transition-transform duration-300 ease-out-soft group-hover/card:-translate-y-0.5 group-hover/card:scale-105"
          aria-hidden="true"
        >
          <Icon className="size-5" strokeWidth={1.9} />
        </span>

        <div className={cn(!wide && 'mt-4', wide && 'mt-4 sm:mt-0')}>
          <h3 className="font-display text-h4 font-semibold leading-snug text-brand-700">
            {habit.name}
          </h3>
          <p className="mt-2.5 text-small leading-relaxed text-ink-500">{habit.summary}</p>
          <p className="mt-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {habit.dayMoment}
          </p>
        </div>
      </Card>
    </RevealItem>
  )
}
