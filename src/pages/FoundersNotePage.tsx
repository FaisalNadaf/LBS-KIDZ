import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card, Chip, PersonCard } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { WheatStalk } from '@/components/art/primitives'
import { founder, familyPageTone } from '@/data/legacy'
import { site } from '@/data/site'
import { routes } from '@/data/routes'

/**
 * Founder's Note.
 *
 * "Mr. Adarsh Shastri (grandson, Authorized Representative) - the operational,
 *  forward-looking voice."  Source: Project Decisions Log S3.
 * "The Founder's Note is practical and forward-looking."
 *  Source: Website Reference Document S6.
 *
 * The personal message is a pending open item, so it is not written for him.
 * See docs/decisions-and-todos.md item T-03.
 */
export function FoundersNotePage() {
  return (
    <>
      <Seo page={pageSeo.foundersNote} />

      <PageHeader
        eyebrow="Shastri Ji Legacy"
        title="Founder’s Note"
        standfirst={`${founder.name}, ${founder.relation.toLowerCase()} and ${founder.role} for LBS KidZ.`}
      />

      <Section tone="khadi" divider={{ type: 'blob', to: 'white' }}>
        <Container size="narrow">
          <Reveal>
            <Card className="relative overflow-hidden" backdrop="beige-arc">
              <div
                className="pointer-events-none absolute -right-6 -top-4 h-40 text-neem-300/30"
                aria-hidden="true"
              >
                <WheatStalk />
              </div>

              <div className="relative grid gap-7 sm:grid-cols-[15rem_1fr] sm:items-center">
                <PersonCard
                  name={founder.name}
                  role={founder.relation}
                  colour="indigo"
                  reserved
                />
                <div>
                  <Chip tone="accent">{founder.role}</Chip>
                  <p className="mt-4 text-body text-ink-500">{founder.voice}.</p>
                </div>
              </div>

              <div className="relative mt-8 rounded-lg bg-khadi-100 p-6">
                {founder.message ? (
                  <blockquote className="font-display text-lead leading-relaxed text-indigo-ink-700">
                    {founder.message}
                  </blockquote>
                ) : (
                  <p className="text-body text-ink-400">
                    {founder.voice}. His note will appear here in his own words.
                  </p>
                )}
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="wide">
          <SectionHeader
            eyebrow="Who is behind LBS KidZ"
            title="Two organisations, one school"
            standfirst="LBS KidZ is a preschool brand under LBSKidZ Group Indore, developed in strategic partnership."
          />

          <div className="mt-block grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card tone="sand" className="h-full" object="founders-operator" backdrop="sky-circle">
                <h3 className="font-display text-h3 font-semibold text-indigo-ink-700">
                  {site.operator}
                </h3>
                <p className="mt-3 text-body text-ink-500">
                  The operating partner behind the school, its systems and its day-to-day running.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.06}>
              <Card tone="sand" className="h-full" object="founders-partner" backdrop="peach-block">
                <h3 className="font-display text-h3 font-semibold text-indigo-ink-700">
                  {site.partner}
                </h3>
                <p className="mt-3 text-body text-ink-500">
                  The custodian of the name and the legacy this school is built on.
                </p>
              </Card>
            </Reveal>
          </div>

          <Reveal className="mt-block">
            <p className="max-w-prose text-body text-ink-500">
              {familyPageTone.familyMessage}{' '}
              <TextLink to={routes.familyMessage}>Read the family message</TextLink>
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

export default FoundersNotePage
