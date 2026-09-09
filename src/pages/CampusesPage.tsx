import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema } from '@/lib/schema'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card, cardBackdropCycle, cardShapeCycle } from '@/components/ui/Card'
import { ZoneCard } from '@/sections/campuses/ZoneCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { ContentImageSection } from '@/components/ui/ContentImageSection'
import { TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { ShapedPhoto } from '@/components/media/Photo'
import { Grain } from '@/components/art/primitives'
import { SITE_PHASE } from '@/data/site'
import {
  campusPhaseState,
  classroomEnvironment,
  safetyStandards,
  zones
} from '@/data/campuses'
import { routes } from '@/data/routes'

/**
 * Campuses.
 *
 * Phase 1: zone-level information only, "Launching Soon in Indore".
 * Phase 2: real addresses, photographs and maps, same nav slot and URL.
 * Source: Full Website Sitemap S1.1 / S1.2; Project Decisions Log S4.
 *
 * Safety & Well-being is placed here per the parity-layer table. In Phase 1 it
 * is framed as the standards our campuses are being built to, which is a
 * commitment rather than a claim about a building a parent could visit today.
 * The list itself is transcribed from NCERT Guidelines Chapter 6.
 * Source: NCERT Curriculum Summary S7; Website Reference Document S4.
 */
export function CampusesPage() {
  return (
    <>
      <Seo page={pageSeo.campuses} schemas={[organizationSchema()]} />

      <PageHeader
        eyebrow="Campuses"
        title={SITE_PHASE === 1 ? campusPhaseState.phase1Headline : 'Our campuses in Indore'}
        /* The full phase-one explanation is still on the page below. A
           header carries the signpost, not the argument. */
        standfirst="The Indore zones we are opening in first. Each campus gets its address, photographs and map the day it is ready."
        photo="school-friends"
      />

      {/* ---- Zones ---- */}
      <Section tone="khadi" id="zones" labelledBy="zones-title" divider={{ type: 'gentle', to: 'white' }}>
        <Container size="wide">
          <SectionHeader
            id="zones-title"
            eyebrow="Where we are opening"
            title="The Indore zones we are launching in"
            standfirst="Each campus will have its own page, its own address and its own map as soon as it is ready."
          />

          {/* Three location cards: picture, place, directions, map.

              WHAT THEY MAY CLAIM is the whole design of them. No campus has an
              address yet, so every part of the card is about the zone instead —
              real OpenStreetMap coordinates for the locality, a map centred on
              it, a directions link that searches for it. Each card says as much
              in a line under the copy, because a card shaped like a campus
              listing that is not one would undo the promise made two paragraphs
              above it.

              Not a `RevealGroup`: the cards carry their own staggered entrance
              in Motion, which also drives the hover lift and the picture's zoom,
              so one system owns the whole card rather than two overlapping. */}
          <div className="mt-block grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone, i) => (
              <ZoneCard key={zone.slug} zone={zone} index={i} />
            ))}
          </div>

        </Container>
      </Section>

      {/* ---- Safety ---- */}
      <Section tone="white" id="safety" labelledBy="safety-title" divider={{ type: 'blob', to: 'khadi' }}>
        <Container size="wide">
          <SectionHeader
            id="safety-title"
            eyebrow="Safety & well-being"
            title="The standards every campus is built to"
            standfirst="Not a general reassurance. This is the specific checklist, taken from NCERT’s Guidelines for Preschool Education, that a campus has to satisfy before a child is in it."
          />

          <RevealGroup className="mt-block grid gap-6 lg:grid-cols-3">
            {safetyStandards.map((group, i) => (
              <RevealItem key={group.group} className="h-full">
                <Card
                  className="flex h-full flex-col"
                  tone="sand"
                  object={group.group}
                  shape={cardShapeCycle[(i + 1) % cardShapeCycle.length]}
                  backdrop={cardBackdropCycle[(i + 1) % cardBackdropCycle.length]}
                >
                  <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                    {group.group}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-500">
                        <Grain className="mt-1.5 shrink-0 text-terracotta-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-block">
            <ShapedPhoto
              name="children-school-ground"
              shape="cut-alt"
              interactive
              sizes="(min-width: 1024px) 78vw, 92vw"
              ratio="21 / 9"
            />
          </Reveal>
        </Container>
      </Section>

      {/* ---- Environment ----
          Deliberately a photograph of *materials*, not of a classroom. A room
          with children in it would read as our room, which is the one thing
          this page must not imply while nothing is open yet. */}
      <ContentImageSection
        tone="khadi"
        id="environment"
        labelledBy="environment-title"
        side="right"
        eyebrow="The classroom"
        title={classroomEnvironment.headline}
        standfirst={classroomEnvironment.body}
        photo="school-kit"
        photoAlt="The materials a child works with: a packed school bag of books, pencils and a ruler"
        photoRatio="3 / 2" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}
      >
        <div className="mt-6">
          <TextLink to={routes.curriculum}>How the room connects to the day</TextLink>
        </div>
      </ContentImageSection>

    </>
  )
}

export default CampusesPage
