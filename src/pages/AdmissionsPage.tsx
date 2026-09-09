import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema, programSchema } from '@/lib/schema'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import {
  Card,
  Chip,
  Marker,
  PhotoCard,
  cardBackdropCycle,
  cardShapeCycle,
  photoShapeCycle } from '@/components/ui/Card'
import type { PhotoName } from '@/data/media'
import { PageHeader } from '@/components/ui/PageHeader'
import { PhaseNote } from '@/components/ui/misc'
import { ButtonLink, TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { Grain } from '@/components/art/primitives'
import { SITE_PHASE } from '@/data/site'
import { feeCommitment, programs } from '@/data/admissions'
import { sankalpCalendar } from '@/data/brand-framework'
import { routes } from '@/data/routes'

/**
 * Admissions.
 *
 * Present from Phase 1 "so a parent knows what they are registering interest
 * in", carrying the class structure and the fee commitment.
 * Source: Website Reference Document S5.1; Project Decisions Log S4.
 *
 * The genuine FAQ block using Tier C questions lives here.
 * Source: Keyword & AEO Strategy S3.
 */
/** The three questions a parent works through before they enquire, in order. */
const startHere: {
  to: string
  photo: PhotoName
  eyebrow: string
  title: string
  body: string
}[] = [
  {
    to: routes.programs,
    photo: 'toddler-focused',
    eyebrow: 'Which class',
    title: 'Programs & Classes',
    body: 'Playgroup, Nursery, LKG and UKG, and how each maps onto NCERT’s recognised age bands.' },
  {
    to: routes.fees,
    photo: 'lunch-box',
    eyebrow: 'What it costs',
    title: 'Fees & Admissions',
    body: 'Our no-hidden-charges commitment, and why the figure is shared with you directly.' },
  {
    to: routes.faqs,
    photo: 'curious-child',
    eyebrow: 'The awkward questions',
    title: 'FAQs',
    body: 'Exams, language, ages, charges. The questions that actually decide things.' },
]

export function AdmissionsPage() {

  return (
    <>
      <Seo
        page={pageSeo.admissions}
        schemas={[organizationSchema(), programSchema(programs)]}
      />

      <PageHeader
        eyebrow="Admissions"
        title="Preschool admission in Indore"
        standfirst="Four classes, one fee with nothing added later, and no examination at any stage."
        photo="family-portrait"
      />

      {/* ---- The three sub-pages ---- */}
      <Section tone="khadi" labelledBy="admissions-nav-title" divider={{ type: 'gentle', to: 'white' }}>
        <Container size="wide">
          <SectionHeader
            id="admissions-nav-title"
            eyebrow="Start here"
            title="Three things parents ask about first"
          />

          <RevealGroup className="mt-block grid gap-5 md:grid-cols-3" each={0.08}>
            {startHere.map((item, i) => (
              <RevealItem key={item.to} className="h-full">
                <PhotoCard
                  to={item.to}
                  object={item.to}
                  shape={cardShapeCycle[i % cardShapeCycle.length]}
                  photoShape={photoShapeCycle[i % photoShapeCycle.length]}
                  backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                  photo={item.photo}
                  sizes="(min-width: 768px) 30vw, 92vw"
                  ratio="4 / 3"
                  eyebrow={item.eyebrow}
                  title={item.title}
                >
                  {item.body}
                </PhotoCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---- Classes at a glance ---- */}
      <Section tone="white" id="classes" ambient="calm" labelledBy="classes-title" divider={{ type: 'reverse', to: 'terracotta' }}>
        <Container size="wide">
          <SectionHeader
            id="classes-title"
            eyebrow="Class structure"
            title="Playgroup, Nursery, LKG and UKG"
            standfirst="Four classes. The values stay the same across all of them, and only the complexity and the expected independence change."
          />

          <RevealGroup className="mt-block grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, i) => (
              <RevealItem key={program.slug} className="h-full">
                <Card
                  className="flex h-full flex-col"
                  object={program.slug}
                  shape={cardShapeCycle[i % cardShapeCycle.length]}
                  backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                >
                  <h3 className="font-display text-h3 font-semibold text-indigo-ink-700">
                    {program.name}
                  </h3>
                  {program.ncertBand ? (
                    <Chip tone="neutral" className="mt-3 self-start">
                      {program.ncertBand}
                    </Chip>
                  ) : null}
                  {program.ncertAge ? (
                    <p className="mt-3 text-xs font-medium text-ink-400">{program.ncertAge}</p>
                  ) : null}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">
                    {program.blurb}
                  </p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8">
            <TextLink to={routes.programs}>Each class in detail</TextLink>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Fee commitment ---- */}
      <Section tone="terracotta" id="fees" ambient="warm" labelledBy="fees-title" divider={{ type: 'scallop', to: 'khadi' }}>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                id="fees-title"
                eyebrow="Fees"
                title={feeCommitment.headline}
                standfirst={feeCommitment.promise}
              />
              <Reveal className="mt-8">
                <TextLink to={routes.fees}>The full fee commitment</TextLink>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup className="grid gap-3 sm:grid-cols-2" each={0.05}>
                {feeCommitment.covered.map((item) => (
                  <RevealItem key={item}>
                    <div className="flex items-center gap-4 rounded-lg bg-khadi-50 p-5 hairline">
                      <Marker tone="terracotta" size="sm">
                        <Grain />
                      </Marker>
                      <span className="font-display text-h4 font-semibold text-indigo-ink-700">
                        {item}
                      </span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Sankalp Calendar as a take-home ---- */}
      <Section tone="khadi" labelledBy="sankalp-download-title" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="wide">
          <Reveal>
            <Card tone="indigo" object="admissions-for-parents" backdrop="sky-circle">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-haldi-300">
                    For parents
                  </p>
                  <h2
                    id="sankalp-download-title"
                    className="mt-3 font-display text-h2 font-semibold text-khadi-50"
                  >
                    The {sankalpCalendar.name}, as a take-home
                  </h2>
                  <p className="mt-4 max-w-2xl text-body text-khadi-200/85">
                    {sankalpCalendar.takeHome} A printable version will be available here for any
                    parent to use, whether or not their child is with us.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:justify-self-end">
                  {SITE_PHASE >= 2 ? (
                    <ButtonLink to={routes.downloads} variant="onDark" withArrow>
                      Download the calendar
                    </ButtonLink>
                  ) : (
                    <Chip tone="onDark">Available once the week is piloted and locked</Chip>
                  )}
                </div>
              </div>
            </Card>
          </Reveal>

          {SITE_PHASE === 1 ? (
            <Reveal className="mt-6">
              <PhaseNote>
                The day-by-day actions are being drafted and will be piloted with one class for two
                to four weeks before we publish anything. We would rather hand you a version that
                works than a version that is early.
              </PhaseNote>
            </Reveal>
          ) : null}
        </Container>
      </Section>
    </>
  )
}

export default AdmissionsPage
