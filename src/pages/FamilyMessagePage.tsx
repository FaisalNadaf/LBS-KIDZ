import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section } from '@/components/ui/layout'
import { Photo } from '@/components/media/Photo'
import { PageHeader } from '@/components/ui/PageHeader'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { WheatStalk } from '@/components/art/primitives'
import { routes } from '@/data/routes'
import {
  familyBlessing,
  familyMembers,
  familyMessageIntro,
  familyPortrait,
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
 *   1b The family group photograph          FamilyPortrait
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
 * PHOTOGRAPHS ARE STILL OUTSTANDING: five are needed, a family group photo plus
 * four portraits. Each slot draws its reserved state rather than collapsing, so
 * the page reads as complete-but-waiting rather than broken.
 *
 * The group photograph is the one D12 §8 lists first and the one that had no
 * slot at all until now. It is given a mounted frame of its own directly under
 * the header rather than a place inside it: `PageHeader` renders photographs by
 * name out of the generated manifest, this picture is not in that manifest, and
 * nothing may stand in for it, so the header would have had to stay empty and
 * the real print would have had nowhere to land.
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
        dividerTo="mist"
      />

      {/* ---- Section 1b: the family group photograph ----
           D12 §8's first outstanding picture, which until now had no slot
           anywhere on the page. It opens the page rather than filling the
           header: `PageHeader` takes a name from the generated photograph
           manifest, and this picture is not in it and will not be stood in for
           — the two Shastri family pages take no stock photography at all. */}
      <Section
        tone="mist"
        size="sm"
        id="family-portrait"
        labelledBy="family-portrait-caption"
        divider={{ type: 'gentle', to: 'white' }}
        decor={false}
      >
        <Container>
          <Reveal>
            <FamilyPortrait />
          </Reveal>
        </Container>
      </Section>

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

          {/* Space, not an ornament. Two sheets already separate themselves, and
              the `MotifDivider` that used to sit here carried a wheat stalk —
              which quietly contradicted the tribute's claim below to be the one
              place the motif appears on this page. */}
          <div className="h-14 sm:h-20" />

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
 * The family group photograph, mounted.
 *
 * WHY IT IS A MOUNT AND NOT A ROUNDED RECTANGLE. Everything else on this page
 * is a letter, and a letter does not compete for attention. The one picture the
 * specification puts first can, so it is framed the way a photograph that
 * matters actually gets framed: a white mount, a warm field inside it, and an
 * engraved plaque beneath. The field is 3:2, the shape a group photograph
 * almost always arrives in, and it holds that shape whether it has a picture in
 * it or not — which is the entire point of reserving it.
 *
 * THE MOUNT IS WEIGHTED. More margin at the foot than at the head, which is
 * what a framer does so a picture does not look like it is sliding down its own
 * glass. It earns its keep twice here: the plaque overlaps into that deeper
 * bottom margin and so never crosses the picture, which it would have to if the
 * mount were even and which would put a blue box over the family's faces the
 * day the photograph lands.
 *
 * CONCENTRIC CORNERS AT THE HEAD. The field's radius is the mount's radius less
 * the mount's width at each breakpoint (40px less 12px, then 40px less 20px),
 * so the white band stays even across the top and sides instead of pinching at
 * the corners. It is also why neither box wears `shape-arch`: a 999px radius is
 * clamped to half of each box's own height, so two boxes of different heights
 * curve differently and the mount would read thicker at the crown.
 *
 * THE RESERVED STATE. Warm paper rather than grey, because a large pale
 * rectangle the same tone as its frame reads as a void and a photographic
 * ground reads as a picture that has not arrived. The dashed fillet is the
 * house's word for "reserved" — `PersonCard` established it, on the grounds
 * that a dashed frame says the thing is coming in a way a solid one cannot —
 * drawn inside the field so it sits where a framer's fillet line would. Both
 * the fillet and the words go the day the photograph lands. Nothing else moves.
 */
function FamilyPortrait() {
  const { photo, caption, eyebrow, reservedLabel, reservedNote } = familyPortrait

  return (
    <figure className="mx-auto max-w-2xl">
      <div className="shape-soft relative bg-mist-50 p-3 pb-10 shadow-card hairline sm:p-5 sm:pb-14">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-orange-50 via-mist-50 to-mist-200 sm:rounded-[1.25rem]">
          {photo ? (
            <Photo
              name={photo}
              alt={caption}
              sizes="(min-width: 768px) 40rem, 92vw"
              ratio="3 / 2"
              className="size-full"
              priority
            />
          ) : (
            /* Said in as many words. A silent tinted rectangle on this page of
               all pages reads as an image that failed to load. */
            <div className="absolute inset-2 grid place-items-center rounded-[1.25rem] border border-dashed border-orange-200 px-6 text-center sm:inset-3 sm:rounded-[1rem]">
              <div>
                <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-brand-500">
                  {reservedLabel}
                </p>
                {/* A short rule under the label, the width of a caption rather
                    than the width of the field: it gives the two lines a join
                    and keeps the middle of the field from reading as a gap. */}
                <span
                  className="mx-auto mt-4 block h-px w-12 bg-orange-300"
                  aria-hidden="true"
                />
                <p className="mx-auto mt-4 max-w-[42ch] font-display text-lead leading-relaxed text-ink-500">
                  {reservedNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* The plaque, overlapping the weighted foot of the mount so the two read
          as one object. Deep blue because a white label on a white mount is not
          a label. */}
      <figcaption className="relative z-10 mx-auto -mt-7 w-[min(26rem,80%)] rounded-2xl bg-brand-700 px-6 py-4 text-center shadow-card sm:-mt-9">
        <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-orange-300">
          {eyebrow}
        </p>
        <p
          id="family-portrait-caption"
          className="mt-1.5 font-display text-h3 font-semibold text-mist-100"
        >
          {caption}
        </p>
      </figcaption>
    </figure>
  )
}

/**
 * One family member's letter, on its own sheet.
 *
 * WHY THE SHEETS ARE NOT A RETURN TO THE CARD GRID. The 2x2 of `PersonCard`s
 * that stood here was rejected because four small cards cannot hold a
 * seven-paragraph letter without turning it into four columns of small print.
 * The objection was to the grid, not to the sheet: one letter per sheet, full
 * measure, stacked down a single column is still the layout D12 §4 asks for.
 * What it adds is an edge. Three letters run straight onto the page ground with
 * nothing but white space between them, and by the third the reader has no way
 * of telling where one voice stopped and the next began.
 *
 * WHY THE PAPER IS WARM. The bands these sit in are white — `mist-50` is
 * literally #FFFFFF — so a white sheet on them would have no edge at all;
 * `mist` for the bands was the obvious alternative and is not available,
 * because the tribute's whole treatment rests on its being the one place on
 * this page where the ground changes colour. Cream on the white band keeps that
 * true, and it is the same cream as the family photograph's field at the top of
 * the page, so the two read as one material.
 *
 * The cream is flat rather than a gradient down to white. A gradient was the
 * first attempt and it fails on exactly the letter that needs this most: Anil
 * Shastri Ji's runs seven paragraphs, so the paper had turned white long before
 * the halfway point and the sheet lost its edge for most of its own height.
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
    <Reveal>
      <article
        aria-labelledby={titleId}
        className="corner-cut-panel bg-orange-50 p-6 shadow-card hairline sm:p-10 lg:p-12"
      >
        {/* The letterhead. A rule under it rather than a band of colour behind
            it: a letter announces who is writing and then gets on with it. */}
        <header className="flex flex-col items-center gap-5 border-b border-orange-200 pb-7 text-center sm:flex-row sm:items-center sm:gap-7 sm:text-left">
          <PortraitSlot label="Portrait to follow" />
          <div>
            <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-brand-500">
              A message from
            </p>
            <h2 id={titleId} className={lead ? 'mt-2 text-h1' : 'mt-2 text-h2'}>
              {member.name}
            </h2>
            <p className="mt-2 text-small text-ink-400">{member.relation}</p>
          </div>
        </header>

        <div className="mt-8 space-y-6">
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

        {/* The sign-off. A rule above it rather than a box around it: a letter
            ends, and the sheet is already the box. */}
        <footer className="mt-10 border-t border-orange-200 pt-6">
          {member.valediction ? (
            <p className="font-display text-lead italic text-ink-500">{member.valediction}</p>
          ) : null}
          <p className="mt-2 font-display text-h3 font-semibold text-brand-700">{member.name}</p>
          <p className="mt-1 text-small text-ink-400">{member.relation}</p>
        </footer>
      </article>
    </Reveal>
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
