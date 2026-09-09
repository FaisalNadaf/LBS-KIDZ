import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema, webSiteSchema } from '@/lib/schema'
import { Hero } from '@/sections/home/Hero'
import {
  DifferentiatorSection,
  FieldBandSection,
  PhilosophySection,
  PositioningSection,
  // Parked, not deleted: these seven are commented out of the tree below, and
  // an unused import is a build error. Uncomment here and there together.
  //   BrandLayerSection, CampusesSection, DaySection, LegacySection,
  //   ParitySection, ReflectionSection, StoriesSection
} from '@/sections/home/sections'
import { ProgramsSection } from '@/sections/home/ProgramsShowcase'

/**
 * Homepage.
 *
 * Order follows the visitor flow the sitemap document describes:
 *   Home (first impression) -> Legacy (trust) -> Curriculum (credibility)
 *   -> For Parents (value given before any ask) -> Campuses (relevance)
 *   -> Admissions (practical basics) -> Register Interest (the ask).
 * Source: Full Website Sitemap S1.1.
 *
 * The tone sequence is deliberate rather than alternating for variety's sake:
 * every colour change is also a change of subject, and the full-bleed
 * photograph sits where the page needs to stop arguing and breathe.
 *
 * Seven of the fourteen bands are currently commented out, so the sequence
 * running today is: khadi (hero) → white → indigo → photograph → white →
 * khadi → white. Note that BrandLayerSection is one of the seven, and it is
 * the band that names Little Karmayogis — the single element the Alignment Map
 * (S2) requires the homepage to carry. Restoring it puts that back.
 */
export function HomePage() {

  return (
    <>
      <Seo
        page={pageSeo.home}
        schemas={[organizationSchema(), webSiteSchema()]}
      />

      <Hero />
      <PositioningSection />
      <DifferentiatorSection />
      {/* <LegacySection /> */}
      <FieldBandSection />
      <PhilosophySection />
      <ProgramsSection />
      {/* <DaySection /> */}
      {/* <BrandLayerSection /> */}
      {/* <StoriesSection /> */}
      {/* <ReflectionSection /> */}
      {/* <ParitySection /> */}
      {/* <CampusesSection /> */}
    </>
  )
}

export default HomePage
