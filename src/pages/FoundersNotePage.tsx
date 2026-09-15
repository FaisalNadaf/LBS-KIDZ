import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card, PersonCard } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { WheatStalk } from '@/components/art/primitives'
import { founder, foundersLetter, familyPageTone } from '@/data/legacy'
import { site } from '@/data/site'
import { routes } from '@/data/routes'
import { CTA_SEAM } from '@/components/ui/SectionDivider'

/**
 * Founder's Note.
 *
 * "Where LBS Legacy is history and The Lal Bahadur Shastri Way is philosophy,
 *  Founder's Note is the present-day, personal voice, Adarsh Shastri speaking
 *  directly to parents, in first person, about why LBS KidZ exists now."
 *  Source: Founder's Note Page Content (D11) S1.
 *
 * THE PAGE IS A LETTER, AND IS BUILT LIKE ONE. D11 S2: "intentionally simpler
 * in structure than the other Legacy pages, it should read like a letter, not a
 * brochure", and S4 asks for a single column, generous spacing, minimal
 * iconography, and the display face carrying the whole body rather than just
 * the headings. That is the reason this page has no card grid, no chip row and
 * no mid-page CTA: every one of those would make it a brochure again.
 *
 * WHAT CHANGED HERE. Until D11 arrived no words of his existed in any source
 * document, so this page published the single teaser line from the Home
 * specification and said plainly that the rest was being written. The letter is
 * now supplied and is transcribed in `data/legacy.ts`, where the note about its
 * draft status also lives.
 *
 * THE PORTRAIT IS STILL OUTSTANDING. D11 S4 calls a real photograph of Adarsh
 * Shastri "the one place on the site where a real photo, not illustration, is
 * essential", and S8 lists it as still to be requested. `PersonCard` in
 * `reserved` mode holds the frame at its real size and says so, which is what
 * stops the letter reflowing when the photograph lands.
 */
export function FoundersNotePage() {
  return (
    <>
      <Seo page={pageSeo.foundersNote} />

      <PageHeader
        eyebrow="Shastri Ji Legacy"
        title={foundersLetter.heading}
        standfirst={foundersLetter.subheading}
      />

      {/* ---- The letter ---- */}
      <Section tone="mist" divider={{ type: 'blob', to: 'white' }}>
        <Container size="narrow">
          <Reveal>
            <Card className="relative overflow-hidden" backdrop="beige-arc">
              {/* The motif once, quietly, in the corner the text does not
                  reach. D11 S4 asks for minimal iconography on this page. */}
              <div
                className="pointer-events-none absolute -right-6 -top-4 h-40 text-green-300/25"
                aria-hidden="true"
              >
                <WheatStalk />
              </div>

              {/* The portrait sits with the salutation rather than above it, so
                  the letter opens on a face and a greeting together instead of
                  spending a full screen on a reserved frame. */}
              <div className="relative grid gap-7 sm:grid-cols-[13rem_1fr] sm:items-center">
                <PersonCard
                  name={founder.name}
                  role={founder.relation}
                  colour="brand"
                  reserved
                />
                <div>
                  <p className="font-display text-lead text-brand-700">
                    {foundersLetter.salutation}
                  </p>
                  <p className="mt-3 text-body text-ink-500">{founder.voice}.</p>
                </div>
              </div>

              {/* The letter body. Display face throughout, per D11 S4, and a
                  measure that keeps it readable rather than running the full
                  card width. */}
              <RevealGroup className="relative mt-9 space-y-6" each={0.05}>
                {foundersLetter.paragraphs.map((runs) => (
                  <RevealItem key={runs[0].text}>
                    <p className="max-w-prose font-display text-lead leading-relaxed text-ink-600">
                      {/* Weight only. D11 S3 and S4 both say so in as many
                          words: "true bold weight on the live page (not a color
                          change)" and "not a color or size change, keep the
                          emphasis subtle". So `<strong>` inherits the
                          paragraph's own colour and size and changes nothing
                          else. */}
                      {runs.map((run) =>
                        run.em ? (
                          <strong key={run.text} className="font-semibold">
                            {run.text}
                          </strong>
                        ) : (
                          <span key={run.text}>{run.text}</span>
                        ),
                      )}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>

              {/* Signature. Rule above it rather than a card around it: this is
                  the end of a letter, not a separate block. */}
              <Reveal className="relative mt-10 border-t border-mist-300 pt-7">
                <p className="text-body text-ink-500">{foundersLetter.signOff}</p>
                <p className="mt-2 font-display text-h3 font-semibold text-brand-700">
                  {founder.name}
                </p>
                <p className="mt-1 text-small text-ink-400">{founder.role}</p>
              </Reveal>
            </Card>
          </Reveal>

          {/* Section 4, Continue Exploring. One soft next step. */}
          <Reveal className="mt-10">
            <p className="text-body text-ink-500">
              {foundersLetter.outro.body}{' '}
              <TextLink to={routes.curriculum}>{foundersLetter.outro.linkLabel}</TextLink>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Who is behind LBS KidZ ----
          Not in D11's four-section layout, and kept. It answers the one
          question the letter raises but does not address, which is who is
          actually running the school alongside the family, and it is the only
          place in the Legacy group that names the two organisations. */}
      <Section tone="white" divider={CTA_SEAM}>
        <Container size="wide">
          <SectionHeader
            eyebrow="Who is behind LBS KidZ"
            title="Two organisations, one school"
            standfirst="LBS KidZ is a preschool brand under LBSKidZ Group Indore, developed in strategic partnership."
          />

          <div className="mt-block grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card tone="mist" className="h-full" object="founders-operator" backdrop="sky-circle">
                <h3 className="font-display text-h3 font-semibold text-brand-700">
                  {site.operator}
                </h3>
                <p className="mt-3 text-body text-ink-500">
                  The operating partner behind the school, its systems and its day-to-day running.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.06}>
              <Card tone="mist" className="h-full" object="founders-partner" backdrop="peach-block">
                <h3 className="font-display text-h3 font-semibold text-brand-700">
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
