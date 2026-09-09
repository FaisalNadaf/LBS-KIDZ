import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { ShapedPhoto } from '@/components/media/Photo'
import { faqs } from '@/data/admissions'
import { routes } from '@/data/routes'

/**
 * FAQ block on the homepage.
 *
 * A shortened set. The full FAQ lives on the Admissions group, which is where
 * the Keyword & AEO Strategy places the genuine FAQ block, and the FAQPage
 * structured data is emitted from the Curriculum page and Admissions, so the
 * same questions are not marked up twice in a way search engines would read as
 * duplicated.
 *
 * Laid out as a two-column spread rather than a centred column: the accordion
 * is tall and narrow, and a photograph beside it stops the last band of the
 * homepage ending on a column of text floating in white space.
 */
export function HomeFaqSection() {
  const shortlist = faqs.filter((f) => f.schema).slice(0, 4)

  return (
    <Section
      divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}
      tone="white" id="faq" labelledBy="home-faq-title">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                id="home-faq-title"
                eyebrow="Straight answers"
                title="The questions parents ask us first"
                standfirst="Four of them here. The rest, including the awkward ones, are on the FAQ page."
              />

              <Reveal className="mt-8">
                <ButtonLink to={routes.faqs} variant="outline" withArrow>
                  Every question, answered
                </ButtonLink>
              </Reveal>

              <Reveal className="mt-block" delay={0.1}>
                <ShapedPhoto
                  name="curious-child"
                  shape="leaf"
                  interactive
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  ratio="3 / 2"
                  className="max-w-sm"
                />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Accordion items={shortlist.map((f) => ({ title: f.q, body: f.a }))} defaultOpen={0} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
