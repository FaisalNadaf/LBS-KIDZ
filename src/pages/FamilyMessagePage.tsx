import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { PersonCard } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { MotifDivider } from '@/components/art/scenes'
import { familyMembers } from '@/data/legacy'

/**
 * A Message from the Lal Bahadur Shastri Family.
 *
 * Structure from Website Reference Document S6:
 *   Mr. Anil Shastri and Mrs. Manju Shastri carry the blessing and
 *   moral-authority message; Mr. Lagan Shastri and Mr. Mudit Shastri appear as
 *   family presence and continuity.
 *
 * HARD CONSTRAINT: "Both require real photographs and a short personal message
 * (3-4 lines is sufficient) from each family member, coordinated through
 * Mr. Adarsh Shastri, before the page can go live."
 * Source: Website Reference Document S6; Project Decisions Log S3.
 *
 * No message is therefore written on any family member's behalf. Each card
 * holds the space their own words will occupy.
 * See docs/decisions-and-todos.md item T-03.
 */
export function FamilyMessagePage() {
  const blessing = familyMembers.filter((m) => m.tier === 'blessing')
  const continuity = familyMembers.filter((m) => m.tier === 'continuity')

  return (
    <>
      <Seo page={pageSeo.familyMessage} />

      <PageHeader
        eyebrow="Shastri Ji Legacy"
        title="A Message from the Lal Bahadur Shastri Family"
        standfirst="A school that carries a family's name should hear from that family directly. These are their words, not ours."
      />

      <Section tone="khadi" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="wide">
          <SectionHeader
            eyebrow="The blessing"
            title="From Shri Lal Bahadur Shastri’s son and daughter-in-law"
          />

          <RevealGroup className="mt-block grid gap-6 md:grid-cols-2">
            {blessing.map((member, i) => (
              <RevealItem key={member.name} className="h-full">
                <FamilyCard member={member} colour={i === 0 ? 'indigo' : 'terracotta'} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="my-16">
            <MotifDivider />
          </Reveal>

          <SectionHeader
            eyebrow="The next generation"
            title="The legacy carried forward"
            standfirst="Mr. Lagan Shastri and Mr. Mudit Shastri, grandsons of Shri Lal Bahadur Shastri."
          />

          <RevealGroup className="mt-block grid gap-6 md:grid-cols-2">
            {continuity.map((member, i) => (
              <RevealItem key={member.name} className="h-full">
                <FamilyCard member={member} colour={i === 0 ? 'neem' : 'haldi'} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  )
}

function FamilyCard({
  member,
  colour }: {
  member: (typeof familyMembers)[number]
  colour: 'indigo' | 'terracotta' | 'neem' | 'haldi'
}) {
  return (
    <PersonCard name={member.name} role={member.relation} colour={colour} reserved>
      <div className="rounded-xl bg-khadi-100 p-5 text-left">
        {member.message ? (
          <blockquote className="font-display text-h4 leading-relaxed text-indigo-ink-700">
            {member.message}
          </blockquote>
        ) : (
          <p className="text-small leading-relaxed text-ink-400">
            {member.role}. Their personal message will appear here in their own words.
          </p>
        )}
      </div>
    </PersonCard>
  )
}

export default FamilyMessagePage
