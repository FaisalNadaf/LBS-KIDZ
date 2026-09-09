import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema } from '@/lib/schema'
import { Container, Section } from '@/components/ui/layout'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/animations/Reveal'
import { Grain } from '@/components/art/primitives'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { primaryCta } from '@/data/site'
import { positioningPillars } from '@/data/positioning'

/**
 * Register Interest.
 *
 * The persistent conversion action for Phase 1. The label relabels to
 * "Enquire Now" in Phase 2 while the URL stays the same, so links and
 * campaigns built now keep working.
 * Source: Full Website Sitemap S1.1 / S1.2; Project Decisions Log S4.
 *
 * "Phase 1 leads carry forward into Phase 2's real admission funnel - no data
 *  loss, no restart."  Source: Project Decisions Log S4.
 */
export function RegisterInterestPage() {
  return (
    <>
      <Seo page={pageSeo.registerInterest} schemas={[organizationSchema()]} />

      <PageHeader
        eyebrow={primaryCta.label}
        title="Tell us about your child"
        standfirst="A few details is all we need. We will come back to you with class options, the fee, and the campus nearest to you."
        photo="girl-blue-kurta"
        photoFocus="50% 22%"
      />

      <Section tone="khadi" divider={{ type: 'layered', fill: 'var(--color-indigo-ink-800)' }}>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Card object="register-interest-form" backdrop="sky-circle">
                  <EnquiryForm />
                </Card>
              </Reveal>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Reveal>
                <Card tone="sand" object="register-interest-next" backdrop="yellow-double">
                  <h2 className="font-display text-h3 font-semibold text-indigo-ink-700">
                    What happens next
                  </h2>
                  <ol className="mt-5 space-y-4">
                    {[
                      'We call you back on the number you give us.',
                      'We answer your questions about the class, the fee and the campus.',
                      'If it feels right, we take it forward when admissions open in your zone.',
                    ].map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="font-numeral shrink-0 text-sm font-semibold text-terracotta-600">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-body text-ink-500">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </Reveal>

              <Reveal delay={0.06}>
                <Card tone="indigo" object="register-interest-what" backdrop="green-blob">
                  <h2 className="font-display text-h3 font-semibold text-khadi-50">
                    What you are registering for
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {positioningPillars.map((pillar) => (
                      <li key={pillar.slug} className="flex gap-3">
                        <Grain className="mt-1.5 shrink-0 text-haldi-300" />
                        <span className="text-sm leading-relaxed text-khadi-200/90">
                          <strong className="font-semibold text-khadi-50">{pillar.label}.</strong>{' '}
                          {pillar.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default RegisterInterestPage
