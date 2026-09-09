import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { ButtonLink, TextLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { Grain } from '@/components/art/primitives'
import { MotifDivider } from '@/components/art/scenes'
import { primaryCta } from '@/data/site'
import { routes } from '@/data/routes'

/**
 * Phase 2 pages, held open in Phase 1.
 *
 * These URLs are reserved now so that flipping SITE_PHASE to 2 needs no
 * structural change, which is exactly what the sitemap requires for the
 * Mandatory Public Disclosure slot and is the same discipline applied here.
 * Source: Full Website Sitemap S1.2 and S4.
 *
 * They render an honest "not yet" rather than fabricated galleries, staff
 * profiles or testimonials, because overclaiming campus experience before it is
 * real is on the explicit avoid list.
 * Source: Global & Indian Preschool Research S6; Project Decisions Log S4.
 *
 * All of them are noindex and absent from sitemap.xml until Phase 2.
 */

type PageKey =
  | 'gallery'
  | 'educators'
  | 'events'
  | 'testimonials'
  | 'admissionProcess'
  | 'careers'
  | 'downloads'

const content: Record<
  PageKey,
  { eyebrow: string; title: string; standfirst: string; whyNot: string; meanwhile: React.ReactNode }
> = {
  gallery: {
    eyebrow: 'School Life',
    title: 'Gallery',
    standfirst: 'Photographs of our classrooms, our children and our days.',
    whyNot:
      'We have no photographs to show you, because we have no classrooms with children in them yet. Every other option, stock photography of somebody else’s school, or renders of a building we have not built, would be a picture of something that is not us.',
    meanwhile: (
      <>
        You can see the classroom design we are building to, illustrated, on the{' '}
        <TextLink to={routes.campuses}>Campuses</TextLink> page.
      </>
    ),
  },
  educators: {
    eyebrow: 'School Life',
    title: 'Our Educators',
    standfirst: 'The teachers at LBS KidZ, and the standards behind how they are chosen and trained.',
    whyNot:
      'Our teaching team is being appointed. Once they are, their training and selection standards will be stated here plainly, not summarised as a claim about quality.',
    meanwhile: (
      <>
        What we can already tell you is how we think about class sizes and staffing, on the{' '}
        <TextLink to={`${routes.campuses}#safety`}>Campuses</TextLink> page.
      </>
    ),
  },
  events: {
    eyebrow: 'School Life',
    title: 'Events & News',
    standfirst: 'What is happening across LBS KidZ campuses.',
    whyNot: 'There is nothing to report yet. When there is, it will be here.',
    meanwhile: (
      <>
        Register your interest and we will tell you directly when our first campus opens in your
        area.
      </>
    ),
  },
  testimonials: {
    eyebrow: 'School Life',
    title: 'Testimonials',
    standfirst: 'What families at LBS KidZ say, in their own words.',
    whyNot:
      'We have no families enrolled yet, so we have no testimonials. We will collect them from real parents once children are with us, with their names and their permission. Not before.',
    meanwhile: (
      <>
        In the meantime, the <TextLink to={routes.valueStories}>Value Stories</TextLink> page shows
        how we think about the way a child actually learns a value.
      </>
    ),
  },
  admissionProcess: {
    eyebrow: 'Admissions',
    title: 'Admission Process',
    standfirst: 'The steps, the dates and the brochure.',
    whyNot:
      'Our admissions funnel opens with our first campus. Publishing steps and dates before then would set expectations we cannot yet meet.',
    meanwhile: (
      <>
        Everything you need before that point is already published: our{' '}
        <TextLink to={routes.programs}>classes</TextLink>, our{' '}
        <TextLink to={routes.fees}>fee commitment</TextLink> and our{' '}
        <TextLink to={routes.faqs}>FAQs</TextLink>.
      </>
    ),
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Work with us',
    standfirst: 'Open roles across LBS KidZ campuses.',
    whyNot: 'We are not yet advertising roles publicly.',
    meanwhile: <>If you teach in the early years and want to be considered, write to us.</>,
  },
  downloads: {
    eyebrow: 'Downloads',
    title: 'Downloads',
    standfirst: 'Our brochure, academic calendar and the printable Sankalp Calendar.',
    whyNot:
      'The Sankalp Calendar is being drafted and piloted with a class before we publish it, and the academic calendar follows our first campus.',
    meanwhile: (
      <>
        You can read how the Sankalp Calendar works, and how it is being built, on{' '}
        <TextLink to={routes.lbsWay}>The Lal Bahadur Shastri Way</TextLink>.
      </>
    ),
  },
}

export function ComingWithCampusesPage({ page }: { page: PageKey }) {
  const item = content[page]

  return (
    <>
      <Seo page={pageSeo[page]} />

      <PageHeader
        eyebrow={item.eyebrow}
        title={item.title}
        standfirst={item.standfirst}
      />

      {/* The band hands over to the terracotta CTA along a curve. Without a
          divider here these seven pages met the CTA on a hard horizontal line,
          while every other page on the site curved into it, so the same
          boundary looked deliberate in one place and unfinished in another. */}
      <Section tone="khadi" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="narrow">
          <Reveal>
            <Card tone="sand" object="coming-with-campuses" backdrop="mint-semi">
              <div className="flex gap-4">
                <Grain className="mt-1.5 shrink-0 text-terracotta-500" />
                <div className="space-y-4">
                  <h2 className="font-display text-h2 font-semibold text-indigo-ink-700">
                    This page arrives with our first campus
                  </h2>
                  <p className="text-body text-ink-500">{item.whyNot}</p>
                  <p className="text-body text-ink-500">{item.meanwhile}</p>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal className="mt-block">
            <MotifDivider />
          </Reveal>

          <Reveal className="mt-block">
            <SectionHeader
              align="center"
              eyebrow="Meanwhile"
              title="Hear from us the day this changes"
              standfirst="Register your interest and we will contact you when admissions open in your zone."
            />
            <div className="mt-8 flex justify-center">
              <ButtonLink to={primaryCta.href} size="lg" withArrow>
                {primaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

export default ComingWithCampusesPage
