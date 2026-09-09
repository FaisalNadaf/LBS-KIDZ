import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { programSchema, organizationSchema } from '@/lib/schema'
import { Container, Section } from '@/components/ui/layout'
import { Chip } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { ContentImageSection } from '@/components/ui/ContentImageSection'
import { TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { Grain } from '@/components/art/primitives'
import { MotifDivider } from '@/components/art/scenes'
import { ShapedPhoto } from '@/components/media/Photo'
import type { PhotoName } from '@/data/media'
import { programs } from '@/data/admissions'
import { attainmentLevels } from '@/data/curriculum'
import { routes } from '@/data/routes'
import { cn } from '@/lib/cn'
import { Blocks, BookOpen, Calculator, PencilLine } from 'lucide-react'

/**
 * Programs & Classes.
 *
 * "Consider individual class-level content sections for age-specific search
 *  capture."  Source: Keyword & AEO Strategy S3.
 * Each class therefore gets its own anchored section with its own heading.
 *
 * Age bands are presented as NCERT's reference model, not as LBS KidZ policy,
 * because admission ages are explicitly unfinalised in the source documents.
 * Source: NCERT Curriculum Summary S8; Keyword & AEO Strategy S6.
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
    chip: 'bg-haldi-100 text-haldi-600 ring-haldi-200',
    panel: 'bg-haldi-100/60 ring-haldi-200/70',
    mark: 'text-haldi-400/25',
    icon: Blocks,
  },
  {
    chip: 'bg-terracotta-100 text-terracotta-700 ring-terracotta-200',
    panel: 'bg-terracotta-50/80 ring-terracotta-200/70',
    mark: 'text-terracotta-300/25',
    icon: BookOpen,
  },
  {
    chip: 'bg-neem-100 text-neem-600 ring-neem-200',
    panel: 'bg-neem-100/60 ring-neem-200/70',
    mark: 'text-neem-400/25',
    icon: PencilLine,
  },
  {
    chip: 'bg-indigo-ink-100 text-indigo-ink-700 ring-indigo-ink-200',
    panel: 'bg-indigo-ink-50/80 ring-indigo-ink-200/60',
    mark: 'text-indigo-ink-300/25',
    icon: Calculator,
  },
]

export function ProgramsPage() {
  return (
    <>
      <Seo page={pageSeo.programs} schemas={[organizationSchema(), programSchema(programs)]} />

      <PageHeader
        eyebrow="Admissions"
        title="Programs & Classes"
        standfirst="Playgroup, Nursery, LKG and UKG. One continuous idea across four years."
        photo="working-together"
      />

      <Section tone="khadi" divider={{ type: 'scallop', to: 'white' }}>
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
                      <div className="mt-4 flex flex-wrap gap-2">
                        {program.ncertBand ? (
                          <Chip tone="accent">NCERT: {program.ncertBand}</Chip>
                        ) : (
                          <Chip tone="neutral">Beyond NCERT’s preschool scope</Chip>
                        )}
                        {program.ncertAge ? <Chip tone="neutral">{program.ncertAge}</Chip> : null}
                      </div>
                      <p className="mt-5 max-w-prose text-body leading-relaxed text-ink-500">
                        {program.blurb}
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
                        <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                          What the year focuses on
                        </h3>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {program.focus.map((focus) => (
                            <li key={focus} className="flex gap-3 text-body text-ink-500">
                              <Grain className="mt-1.5 shrink-0 text-terracotta-500" />
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
        photoRatio="4 / 3" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}
      >
        <RevealGroup className="space-y-3">
          {attainmentLevels.map((level) => (
            <RevealItem key={level.level}>
              <div className="flex flex-col gap-1 rounded-lg bg-khadi-100 p-5 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="font-display shrink-0 text-h4 font-semibold text-indigo-ink-700 sm:w-32">
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

    </>
  )
}

export default ProgramsPage
