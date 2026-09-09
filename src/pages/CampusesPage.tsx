import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema } from '@/lib/schema'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card, Chip, cardBackdropCycle, cardShapeCycle } from '@/components/ui/Card'
import { LiveDot } from '@/animations/interactions'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/cn'
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
/**
 * A colour and a ring per zone, cycled.
 *
 * Three cards carrying the same paragraph verbatim need something to tell them
 * apart other than the place name, and the name is the one thing a reader is
 * scanning for. Colour does that work without adding words.
 */
const ZONE_ACCENTS = [
  { chip: 'bg-terracotta-200 text-terracotta-800', ring: 'border-terracotta-200/30' },
  { chip: 'bg-haldi-200 text-haldi-600', ring: 'border-haldi-200/35' },
  { chip: 'bg-neem-200 text-neem-600', ring: 'border-neem-200/35' },
]

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

          {/* WHY THERE IS NO PHOTOGRAPH OF EACH ZONE HERE.
              A picture of Kanadia Road, Rau or Bicholi Mardana would be the
              obvious way to fill these cards, and none exists that we can use:
              Wikimedia Commons returns nothing at all for two of the three, and
              for Rau only a Navratri procession and an unrelated portrait.
              Dropping a generic Indore street in and heading it "Kanadia Road"
              would be showing a place that is not the place, on the one page
              that promises the opposite two paragraphs above: photographs and a
              map the day the campus is ready, and until then no building you
              cannot visit.

              So each zone gets a marker rather than a view. The pin, the tinted
              ground and the faint contour behind it say "a located place" and
              claim nothing about what it looks like. */}
          <RevealGroup className="mt-block grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone, i) => {
              const accent = ZONE_ACCENTS[i % ZONE_ACCENTS.length]
              return (
              <RevealItem key={zone.slug} className="h-full">
                <Card
                  className="flex h-full flex-col"
                  object={zone.slug}
                  shape={cardShapeCycle[i % cardShapeCycle.length]}
                  backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                >
                  {/* A contour, not a map: enough to read as ground without
                      pretending to be this ground. */}
                  <span
                    className={cn(
                      'pointer-events-none absolute -bottom-6 -right-5 -z-10 size-28 rounded-full border-[6px]',
                      accent.ring,
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'mb-4 grid size-11 place-items-center rounded-xl shadow-soft',
                      accent.chip,
                    )}
                    aria-hidden="true"
                  >
                    <MapPin className="size-5" strokeWidth={1.9} />
                  </span>

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-h2 font-semibold text-indigo-ink-700">
                      {zone.name}
                    </h3>
                    {/* The one pulsing indicator on the site. It marks a state
                        that is genuinely current and genuinely changing — these
                        campuses are in preparation right now — rather than
                        decorating a static label, which is a site pretending to
                        have live data. */}
                    <Chip tone="muted" className="whitespace-nowrap">
                      <LiveDot tone="terracotta" />
                      In preparation
                    </Chip>
                  </div>
                  <p className="mt-4 flex-1 text-body text-ink-500">
                    A campus is planned for this zone. Register your interest and we will tell you
                    the moment admissions open here.
                  </p>
                  <p className="mt-5 text-sm font-semibold text-terracotta-600">{zone.keyword}</p>
                </Card>
              </RevealItem>
              )
            })}
          </RevealGroup>

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
