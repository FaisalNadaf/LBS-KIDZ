import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema, webSiteSchema } from '@/lib/schema'
import { Hero } from '@/sections/home/Hero'
import {
  BrandLayerSection,
  CampusesSection,
  DifferentiatorSection,
  FieldBandSection,
  LegacySection,
  ParitySection,
  PhilosophySection,
  PositioningSection,
  ReflectionSection,
  // Parked, not deleted: these two are commented out of the tree below, and an
  // unused import is a build error. Uncomment here and there together.
  //   DaySection, StoriesSection
} from '@/sections/home/sections'
import { ProgramsSection } from '@/sections/home/ProgramsShowcase'

/**
 * Homepage.
 *
 * SECTION ORDER IS THE HOME PAGE SPECIFICATION'S OWN, section for section:
 *
 *    1  Hero                    Hero
 *    2  Legacy Strip            LegacySection
 *    3  Why LBS KidZ            PositioningSection
 *    4  The LBS Way Preview     BrandLayerSection
 *    5  Curriculum Preview      PhilosophySection
 *    6  Programs Snapshot       ProgramsSection
 *    7  Opening in Indore       CampusesSection
 *    8  Founder's Note Teaser   ReflectionSection
 *    9  Reassurance Strip       ParitySection
 *   10  Final CTA               AdmissionCta, in SiteLayout
 *   11  Footer                  Footer, in SiteLayout
 *
 * Source: Home Page Content S2 (Section-by-Section Layout).
 *
 * TWO BANDS ARE NOT IN THAT LIST and are kept anyway. DifferentiatorSection
 * makes the argument the rest of the page rests on, and every line of it is
 * sourced to the Global & Indian Preschool Research. FieldBandSection is a
 * full-bleed photograph with one line over it, and it is the only place between
 * two dense sections where the page stops arguing and breathes. Both sit
 * between Section 3 and Section 4, so the specification's own run of previews
 * stays unbroken from the LBS Way through to the Reassurance Strip.
 *
 * The tone sequence is deliberate rather than alternating for variety's sake:
 * every colour change is also a change of subject, and the full-bleed
 * photograph sits where the page needs to stop arguing and breathe. The run is
 * mist (hero) -> mist -> white -> brand -> photograph -> sky ->
 * white -> mist -> brand -> white -> mist.
 */
export function HomePage() {
  return (
    <>
      <Seo
        page={pageSeo.home}
        schemas={[organizationSchema(), webSiteSchema()]}
      />

      <Hero />
      <LegacySection />
      <PositioningSection />
      <DifferentiatorSection />
      <FieldBandSection />
      <BrandLayerSection />
      <PhilosophySection />
      <ProgramsSection />
      <CampusesSection />
      <ReflectionSection />
      <ParitySection />
      {/* <DaySection /> */}
      {/* <StoriesSection /> */}
    </>
  )
}

export default HomePage
