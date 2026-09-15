import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section } from '@/components/ui/layout'
import { PageHeader } from '@/components/ui/PageHeader'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { MotifDivider } from '@/components/art/scenes'
import { WheatStalk } from '@/components/art/primitives'
import { routes } from '@/data/routes'
import {
  familyBlessing,
  familyMembers,
  familyMessageIntro,
  lalitaShastriTribute,
  type FamilyMember,
} from '@/data/legacy'

/**
 * A Message from the Lal Bahadur Shastri Family.
 *
 * The highest-trust page on the site, and the only one written in somebody
 * else's voice. Sections follow the Family Message Page specification:
 *
 *   1  Hero / Intro                         PageHeader
 *   2  Anil Shastri Ji's message            Letter
 *   3  In Memory of Shrimati Lalita         Tribute
 *   4  A Note from Manju Shastri Ji         Letter
 *   5  Lagan Shastri & Mudit Shastri        Letter
 *   6  Our Family's Blessing                closing block
 *   7  Continue Exploring                   two soft links
 *
 * WHY THIS IS A COLUMN OF LETTERS AND NOT A GRID OF CARDS. It used to be four
 * `PersonCard`s in a 2x2, each holding the space a message would one day
 * occupy, because no message had been received and none would be invented. The
 * messages have now been received, and they are letters: Anil Shastri Ji's runs
 * to seven paragraphs. A card grid cannot hold that without becoming four
 * columns of small print, and the specification asks for the opposite anyway,
 * "single-column, letter-style, generously spaced" and "even more restrained"
 * than the Founder's Note.
 *
 * NO CTA ANYWHERE ON THIS PAGE beyond the persistent one in the navbar, which
 * is also the specification's instruction: this page exists to build trust, and
 * the two links at the foot are soft next steps rather than an ask. The
 * site-wide Register Interest band is suppressed for this route in
 * `AdmissionCta`.
 *
 * NO SCATTERED OBJECTS. Every band here passes `decor={false}`, which turns off
 * the drawn crayons, apples and paper boats the rest of the site scatters
 * through its sections. They are right almost everywhere else and wrong beside
 * a memorial tribute, and the specification asks for no brand iconography on
 * this page at all.
 *
 * PHOTOGRAPHS ARE STILL OUTSTANDING: five are needed, a family group photo for
 * the hero plus four portraits. Each slot draws its reserved state rather than
 * collapsing, so the page reads as complete-but-waiting rather than broken.
 * See docs/decisions-and-todos.md item T-03.
 */
export function FamilyMessagePage() {
  const [anil, manju, nextGeneration] = familyMembers

  return (
    <>
      <Seo page={pageSeo.familyMessage} />

      <PageHeader
        eyebrow={familyMessageIntro.eyebrow}
        title={familyMessageIntro.headline}
        standfirst={familyMessageIntro.standfirst}
        dividerTo="white"
      />

      {/* ---- Section 2: the primary letter ---- */}
      <Section tone="white" id="anil-shastri" labelledBy="anil-shastri-title" decor={false}>
        <Container size="narrow">
          {anil ? <Letter member={anil} lead /> : null}
        </Container>
      </Section>

      {/* ---- Section 3: the tribute ----
           Set apart deliberately. The specification asks for this section to be
           given its own treatment "so it reads as its own dedicated tribute,
           not just another paragraph", and it is the one place on this page
           where the ground changes colour. */}
      <Section
        tone="mist"
        id="lalita-shastri"
        labelledBy="lalita-shastri-title"
        divider={{ type: 'gentle', to: 'white' }}
        decor={false}
      >
        <Container size="narrow">
          <Reveal>
            <figure className="corner-cut-panel relative overflow-hidden bg-mist-50 px-6 py-10 text-center shadow-card hairline sm:px-12 sm:py-14">
              {/* The one place the wheat motif appears on this page. Quiet, and
                  behind the words rather than beside them. */}
              <span
                className="pointer-events-none absolute -right-6 -top-4 h-40 text-orange-200/50"
                aria-hidden="true"
              >
                <WheatStalk />
              </span>

              <PortraitSlot label="Archival photograph to follow" className="mx-auto" />

              <figcaption className="relative">
                <h2
                  id="lalita-shastri-title"
                  className="mt-8 font-display text-h2 font-semibold text-brand-700"
                >
                  {lalitaShastriTribute.headline}
                </h2>
                <p className="mx-auto mt-6 max-w-[58ch] text-lead leading-relaxed text-ink-600">
                  {lalitaShastriTribute.body}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Sections 4 and 5: the other two voices ---- */}
      <Section tone="white" id="manju-shastri" labelledBy="manju-shastri-title" decor={false}>
        <Container size="narrow">
          {manju ? <Letter member={manju} /> : null}

          <Reveal className="my-14 sm:my-20">
            <MotifDivider />
          </Reveal>

          {nextGeneration ? <Letter member={nextGeneration} /> : null}
        </Container>
      </Section>

      {/* ---- Sections 6 and 7: the blessing, and two soft exits ---- */}
      <Section
        tone="mist"
        id="family-blessing"
        labelledBy="family-blessing-title"
        divider={{ type: 'layered', fill: 'var(--color-brand-800)' }}
        decor={false}
      >
        <Container size="narrow">
          <Reveal className="text-center">
            <h2 id="family-blessing-title" className="text-h2">
              {familyBlessing.headline}
            </h2>
            <p className="mx-auto mt-6 max-w-[60ch] text-lead leading-relaxed text-ink-600">
              {familyBlessing.body}
            </p>
          </Reveal>

          {/* "Continue Exploring". Soft, optional, and outlined rather than
              filled: nothing on this page should read as a sales action. */}
          <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink to={routes.foundersNote} variant="outline" withArrow>
              Read the Founder&rsquo;s Note
            </ButtonLink>
            <ButtonLink to={routes.curriculum} variant="outline" withArrow>
              See Our Curriculum &amp; Learning Approach
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */

/**
 * One family member's letter.
 *
 * `lead` marks the primary letter, which takes the larger opening paragraph.
 * Every letter sets its body in the display face, because the specification
 * says this page in particular can carry the serif throughout, and because a
 * letter set in the UI sans reads as website copy rather than as somebody
 * writing to you.
 */
function Letter({ member, lead = false }: { member: FamilyMember; lead?: boolean }) {
  const titleId = `${member.slug}-title`

  return (
    <article aria-labelledby={titleId}>
      <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:gap-8 sm:text-left">
        <PortraitSlot label="Portrait to follow" />
        <div>
          <h2 id={titleId} className={lead ? 'text-h1' : 'text-h2'}>
            {member.name}
          </h2>
          <p className="mt-2 text-small text-ink-400">{member.relation}</p>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div className="space-y-6">
          {member.message?.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 40)}
              className={
                lead && i === 0
                  ? 'font-display text-h3 leading-relaxed text-brand-700'
                  : 'font-display text-lead leading-[1.8] text-ink-600'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* The sign-off. A rule above it rather than a card around it: a letter
            ends, it does not sit in a box. */}
        <footer className="mt-10 border-t border-mist-300 pt-6">
          {member.valediction ? (
            <p className="font-display text-lead italic text-ink-500">{member.valediction}</p>
          ) : null}
          <p className="mt-2 font-display text-h3 font-semibold text-brand-700">
            {member.name}
          </p>
          <p className="mt-1 text-small text-ink-400">{member.relation}</p>
        </footer>
      </Reveal>
    </article>
  )
}

/**
 * The space a photograph will occupy.
 *
 * Drawn rather than left empty, and drawn at the size the real picture will be,
 * so the page does not reflow the day the five outstanding photographs arrive.
 * It says what is missing in as many words: a silent gap reads as a broken
 * image, and on this page of all pages that is the wrong impression to leave.
 */
function PortraitSlot({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`shape-blob grid size-32 shrink-0 place-items-center bg-brand-100 px-4 text-center sm:size-36 ${className ?? ''}`}
    >
      <span className="text-2xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-brand-600">
        {label}
      </span>
    </div>
  )
}

export default FamilyMessagePage
