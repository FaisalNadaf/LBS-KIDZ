import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { programSchema, organizationSchema } from '@/lib/schema'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Chip } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { ContentImageSection } from '@/components/ui/ContentImageSection'
import { ButtonLink, TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { Grain } from '@/components/art/primitives'
import { MotifDivider } from '@/components/art/scenes'
import { ShapedPhoto } from '@/components/media/Photo'
import type { PhotoName } from '@/data/media'
import { dailyRhythm, programs } from '@/data/admissions'
import { attainmentLevels } from '@/data/curriculum'
import { routes } from '@/data/routes'
import { primaryCta } from '@/data/site'
import { cn } from '@/lib/cn'
import {
  Blocks,
  BookOpen,
  Calculator,
  Heart,
  PencilLine,
  Send,
  Sunrise,
  ToyBrick,
  Utensils,
} from 'lucide-react'

/**
 * Programs & Classes.
 *
 * "Consider individual class-level content sections for age-specific search
 *  capture."  Source: Keyword & AEO Strategy S3.
 * Each class therefore gets its own anchored section with its own heading.
 *
 * Age bands ARE ours now, and lead each class block. They were NCERT's
 * reference model only, because admission ages were unfinalised in the earlier
 * source documents; the Programs & Classes specification sets one per class.
 * NCERT's model is still shown beneath, labelled as theirs, because the mapping
 * onto a recognised national structure is itself a credibility signal.
 * Source: Programs & Classes Content S3; NCERT Curriculum Summary S8.
 */
/**
 * One photograph per class, chosen for what that year is actually about:
 * settling in and handling materials, then reading, then letters, then number.
 */
const classPhotos: Record<string, PhotoName> = {
  playgroup: 'blocks-toddler',
  nursery: 'child-reading',
  // Neither of these is the picture that was here before. `letter-board` and
  // `counting-frame` both show another school's crest: a lanyard ID card in one
  // and a branded label on the abacus in the other, legible at full size. A
  // page about our own classes cannot be illustrated with somebody else's.
  lkg: 'child-drawing-notebook',
  ukg: 'child-sorting-board',
}

/** One silhouette per class, so four cards in a column never rhyme. */
const classShapes = ['cut', 'crest', 'cut-alt', 'crest-alt'] as const

/**
 * A colour and a mark per class, in order.
 *
 * Four near-identical blocks down a page in one neutral is the note this page
 * kept getting. The accent tints the number, the focus panel and the watermark
 * together, so each year reads as its own thing while the four still belong to
 * one series.
 */
const CLASS_ACCENTS = [
  {
    chip: 'bg-orange-100 text-orange-600 ring-orange-200',
    panel: 'bg-orange-100/60 ring-orange-200/70',
    mark: 'text-orange-400/25',
    icon: Blocks,
  },
  {
    chip: 'bg-sky-100 text-sky-700 ring-sky-200',
    panel: 'bg-sky-50/80 ring-sky-200/70',
    mark: 'text-sky-300/25',
    icon: BookOpen,
  },
  {
    chip: 'bg-green-100 text-green-600 ring-green-200',
    panel: 'bg-green-100/60 ring-green-200/70',
    mark: 'text-green-400/25',
    icon: PencilLine,
  },
  {
    chip: 'bg-brand-100 text-brand-700 ring-brand-200',
    panel: 'bg-brand-50/80 ring-brand-200/60',
    mark: 'text-brand-300/25',
    icon: Calculator,
  },
]

export function ProgramsPage() {
  return (
    <>
      <Seo page={pageSeo.programs} schemas={[organizationSchema(), programSchema(programs)]} />

      <PageHeader
        eyebrow="Programs & classes"
        title="From Their First Day at Two, to Their Next Big Step at Six"
        standfirst="Playgroup to UKG: a preschool journey built around how children actually grow."
        photo="children-jumping-at-school"
        photoFocus="55% 60%"
      />

      <Section tone="mist" divider={{ type: 'scallop', to: 'white' }}>
        <Container size="wide">
          <div className="space-y-14">
            {programs.map((program, i) => {
              const accent = CLASS_ACCENTS[i % CLASS_ACCENTS.length]
              const photoLeft = i % 2 === 0
              return (
                <section
                key={program.slug}
                id={program.slug}
                aria-labelledby={`${program.slug}-title`}
                className="scroll-mt-28"
              >
                {/* The telling and the focus panel share a column; the picture
                    takes the other one whole and its height from the row. Before
                    this the left column held a heading, two chips and three
                    lines against a 16:9 photograph stacked on a focus card, and
                    ran out roughly three hundred pixels above it. The side
                    alternates so four classes do not read as a form. */}
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                  <div
                    className={cn(
                      'flex flex-col lg:col-span-6 lg:row-start-1',
                      photoLeft ? 'lg:col-start-7' : 'lg:col-start-1',
                    )}
                  >
                    <Reveal>
                      <span
                        className={cn(
                          'font-numeral inline-grid size-11 place-items-center rounded-xl text-sm font-semibold ring-1',
                          accent.chip,
                        )}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2 id={`${program.slug}-title`} className="mt-4 text-h2">
                        {program.name}
                      </h2>
                      {/* Our own age band first and largest, because it is the
                          fact a parent came to this page for. The NCERT
                          reference model sits under it as a chip, labelled as
                          NCERT's rather than ours. */}
                      <p className="mt-3 font-display text-h3 font-semibold text-brand-500">
                        {program.ageRange}
                      </p>
                      <p className="mt-1 font-display text-h4 font-semibold text-brand-600">
                        {program.tagline}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {program.ncertBand ? (
                          <Chip tone="accent">NCERT: {program.ncertBand}</Chip>
                        ) : (
                          <Chip tone="neutral">Beyond NCERT’s preschool scope</Chip>
                        )}
                        {program.ncertAge ? <Chip tone="neutral">{program.ncertAge}</Chip> : null}
                      </div>
                      <p className="mt-5 max-w-prose text-body leading-relaxed text-ink-500">
                        {program.about}
                      </p>
                    </Reveal>

                    <Reveal className="mt-7" delay={0.06}>
                      <div
                        className={cn(
                          'group/focus relative isolate overflow-hidden rounded-2xl p-6 ring-1',
                          'transition-transform duration-300 ease-out-soft hover:-translate-y-1',
                          'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                          accent.panel,
                        )}
                      >
                        <accent.icon
                          className={cn(
                            'pointer-events-none absolute -bottom-6 -right-5 -z-10 size-32',
                            'transition-transform duration-500 ease-out-soft group-hover/focus:scale-110',
                            'motion-reduce:transition-none',
                            accent.mark,
                          )}
                          strokeWidth={1.1}
                          aria-hidden="true"
                        />
                        <h3 className="font-display text-h4 font-semibold text-brand-700">
                          What your child does
                        </h3>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {program.focus.map((focus) => (
                            <li key={focus} className="flex gap-3 text-body text-ink-500">
                              <Grain className="mt-1.5 shrink-0 text-sky-500" />
                              <span>{focus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>

                  <Reveal
                    direction={photoLeft ? 'right' : 'left'}
                    tier="lead"
                    className={cn(
                      'lg:col-span-6 lg:row-start-1',
                      photoLeft ? 'lg:col-start-1' : 'lg:col-start-7',
                    )}
                  >
                    <div className="h-72 sm:h-96 lg:h-full lg:min-h-[22rem]">
                      <ShapedPhoto
                        name={classPhotos[program.slug] ?? 'circle-storytime'}
                        shape={classShapes[i % classShapes.length]}
                        fill
                        interactive
                        focus="50% 45%"
                        sizes="(min-width: 1024px) 46vw, 92vw"
                      />
                    </div>
                  </Reveal>
                </div>

                  {i < programs.length - 1 ? <MotifDivider className="mt-block" /> : null}
                </section>
              )
            })}
          </div>

          {/* Both replacement photographs are CC BY 2.0 and by the same
              photographer, so one line satisfies both. The rest of the page's
              pictures are stock licences that ask for no credit, which is why
              this is the only such note here. */}
          <Reveal className="mt-block">
            <p className="text-2xs leading-relaxed text-ink-400">
              LKG and UKG photographs by Shixart1985,{' '}
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
          </Reveal>
        </Container>
      </Section>

      <ContentImageSection
        tone="white"
        labelledBy="progression-title"
        side="left"
        eyebrow="How a child moves on"
        title="Not by passing anything"
        standfirst="A child moves through the classes with their age group. Within each class, what changes is how much support a skill still needs."
        photo="boy-with-ball"
        photoRatio="4 / 3"
        /* Was a terracotta cloud, which was correct while the site-wide coral
           CTA band came next. It does not on this page any more: the page has
           its own closing section and the band is suppressed, so the seam now
           hands over to the mist band that actually follows. A divider filled
           with the colour of a section that is not there reads as a stray
           shape. */
        divider={{ type: 'cloud', to: 'mist' }}
      >
        <RevealGroup className="space-y-3">
          {attainmentLevels.map((level) => (
            <RevealItem key={level.level}>
              <div className="flex flex-col gap-1 rounded-lg bg-mist-100 p-5 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="font-display shrink-0 text-h4 font-semibold text-brand-700 sm:w-32">
                  {level.level}
                </span>
                <span className="text-body text-ink-500">{level.definition}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-6">
          <TextLink to={`${routes.curriculum}#no-examinations`}>
            Read the assessment approach in full
          </TextLink>
        </div>
      </ContentImageSection>

      <DailyRhythmSection />
      <ClosingSection />
    </>
  )
}

/* ------------------------------------------------------------------ */

/** One icon per moment of the day, in order. */
const RHYTHM_ICONS = [Sunrise, ToyBrick, Utensils, Heart, Send] as const

/**
 * Section 3 of the specification: A Day at LBS KidZ.
 *
 * DELIBERATELY NOT A TIMETABLE, and that is the specification's instruction
 * rather than a shortcut: "exact daily timetable, not finalized yet, Section 3
 * is deliberately general and should be revisited once the real timetable is
 * locked." So this is a flow of five moments with no clock against any of them.
 * Putting times here would be inventing the one thing the page does not know.
 *
 * A horizontal flow rather than a stack, so it reads as a day passing. The
 * connector is drawn between the medallions and hidden on the last item, which
 * is what stops a line running off the end of the row.
 */
function DailyRhythmSection() {
  return (
    <Section
      tone="mist"
      id="a-day-here"
     
      labelledBy="rhythm-title"
      divider={{ type: 'gentle', to: 'white' }}
    >
      <Container size="wide">
        <SectionHeader
          id="rhythm-title"
          eyebrow="A day at LBS KidZ"
          title={dailyRhythm.headline}
          standfirst={dailyRhythm.body}
        />

        <RevealGroup
          className="mt-block grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
          each={0.07}
        >
          {dailyRhythm.moments.map((moment, i) => {
            const Icon = RHYTHM_ICONS[i % RHYTHM_ICONS.length]
            const last = i === dailyRhythm.moments.length - 1
            return (
              <RevealItem key={moment.name} className="h-full">
                <div className="relative flex h-full flex-col items-center px-2 text-center">
                  {/* The connector. A hairline from the centre of this
                      medallion to the next one, drawn only from `lg` where the
                      five actually sit in a row, and never on the last. */}
                  {last ? null : (
                    <span
                      className="pointer-events-none absolute left-1/2 top-7 hidden h-px w-full bg-mist-400 lg:block"
                      aria-hidden="true"
                    />
                  )}

                  <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-mist-50 text-brand-600 shadow-soft ring-1 ring-mist-300">
                    <Icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 font-display text-h4 font-semibold text-brand-700">
                    {moment.name}
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-ink-600">{moment.detail}</p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Container>
    </Section>
  )
}

/**
 * Section 4: the closing CTA.
 *
 * Two soft next steps rather than one hard push, which is what the
 * specification asks for: "a parent this far into researching classes may want
 * either more values context or to act now." The site-wide Register Interest
 * band still follows below this, so the harder ask is not missing, it is just
 * not this section's job.
 */
function ClosingSection() {
  return (
    <Section
      tone="white"
      id="right-for-your-child"
      labelledBy="closing-title"
      size="sm"
      divider={{ type: 'layered', fill: 'var(--color-brand-800)' }}
    >
      <Container size="narrow">
        <Reveal className="text-center">
          <h2 id="closing-title" className="text-h2">
            See If LBS KidZ Is Right for Your Child
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-ink-500">
            Curious how these years connect to values, or what admission looks like?
          </p>
        </Reveal>

        <Reveal className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink to={routes.curriculum} variant="outline" withArrow>
            See Our Curriculum &amp; Learning Approach
          </ButtonLink>
          <ButtonLink to={primaryCta.href} variant="primary" withArrow>
            {primaryCta.label}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  )
}

export default ProgramsPage
