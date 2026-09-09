import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { faqSchema, organizationSchema } from '@/lib/schema'
import { Container, Section } from '@/components/ui/layout'
import { Chip } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/animations/Reveal'
import { faqs } from '@/data/admissions'

/**
 * FAQs.
 *
 * The question set is the starter set specified in Keyword & AEO Strategy S6,
 * written as questions about LBS KidZ's own practice rather than as generic
 * policy questions, exactly as that document requires.
 *
 * FAQPage structured data is emitted here and on Curriculum & Admissions,
 * which is where the strategy places the AEO anchor and the genuine FAQ block.
 */
export function FaqsPage() {
  const schemaFaqs = faqs.filter((f) => f.schema)

  return (
    <>
      <Seo page={pageSeo.faqs} schemas={[organizationSchema(), faqSchema(schemaFaqs)]} />

      <PageHeader
        eyebrow="Admissions"
        title="Frequently asked questions"
        standfirst="Short, direct answers about how LBS KidZ actually works."
        photo="girl-yellow-clip"
      />

      <Section tone="khadi" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="narrow">
          <Reveal>
            <Accordion
              items={faqs.map((f) => ({
                id: f.q
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, ''),
                title: f.q,
                body: f.a,
                meta: f.pending ? (
                  <Chip tone="muted">Confirmed with you directly on enquiry</Chip>
                ) : null }))}
              defaultOpen={0}
            />
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

export default FaqsPage
