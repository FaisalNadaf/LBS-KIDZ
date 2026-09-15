import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section } from '@/components/ui/layout'
import { Card, Chip, cardBackdropCycle, cardShapeCycle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { Grain } from '@/components/art/primitives'
import {
  parentingIntro,
  parentingOutro,
  parentingResources,
  type ParentingCategory,
} from '@/data/parents'
import { routes } from '@/data/routes'
import { CTA_SEAM } from '@/components/ui/SectionDivider'

/**
 * Parenting Tips & Resources.
 *
 * "A resource page, not a sales page, practical, honest answers to the
 *  questions every parent of a 2-6 year old runs into, whether or not they ever
 *  enrol at LBS KidZ. Its job is to earn trust through usefulness."
 *  Source: Parenting Tips & Resources Page Content (D17) S1.
 *
 * TWO EXCLUSIONS, BOTH DELIBERATE, BOTH EASY TO UNDO BY ACCIDENT:
 *
 *   - No NEP 2020 or policy framing anywhere on this page. "This section of the
 *     site is intentionally not a vehicle for NEP 2020/policy keywords. Its
 *     purpose is to be genuinely useful to any parent, regardless of brand
 *     awareness or specific government policy."
 *     Source: Keyword & AEO Strategy S5; Full Website Sitemap S1.1.
 *   - No CTA inside any card. D17 S4 and S5: "no CTAs embedded inside the cards
 *     themselves", only the persistent nav button, and one light closing prompt
 *     beneath the grid. A card that ends in "book a visit" turns advice into an
 *     ask, which is the one thing this page is not for.
 *
 * It is measured on engagement, not keyword ranking.
 */

/**
 * A tint per category tag.
 *
 * D17 S4: three recurring categories, "each can carry its own subtle accent
 * color for quick visual scanning". With twelve cards in a grid, the tag is how
 * a parent finds the three that apply to them, so it needs to be legible at a
 * glance rather than uniformly neutral. All three carry their label at AA on
 * their own tint.
 */
const categoryTints: Record<ParentingCategory, string> = {
  'Activity Ideas': 'bg-orange-100 text-orange-600',
  'Early-Years Concerns': 'bg-sky-100 text-sky-700',
  'Preschool Readiness': 'bg-green-100 text-green-600',
}

export function ParentingPage() {
  return (
    <>
      <Seo page={pageSeo.parenting} />

      <PageHeader
        eyebrow={parentingIntro.eyebrow}
        title={parentingIntro.headline}
        standfirst={parentingIntro.standfirst}
        photo="mother-son-meal-at-home"
        photoFocus="50% 40%"
      />

      <Section tone="mist" divider={CTA_SEAM}>
        <Container size="wide">
          {/* Every resource, always. The topic filter has gone, and with it the
              `mt-block` that spaced the grid off it: as the first thing in the
              band, the grid would otherwise sit on a second helping of the
              section's own top padding.

              Twelve cards rather than six. D17 S8 expects the list to keep
              growing, so nothing here is hard-coded to a count. */}
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" each={0.05}>
            {parentingResources.map((resource, i) => (
              <RevealItem key={resource.slug} className="h-full">
                <Card
                  id={resource.slug}
                  className="flex h-full flex-col scroll-mt-28"
                  object={resource.slug}
                  shape={cardShapeCycle[i % cardShapeCycle.length]}
                  backdrop={cardBackdropCycle[i % cardBackdropCycle.length]}
                >
                  <Chip className={categoryTints[resource.category]}>{resource.category}</Chip>
                  <h2 className="mt-4 font-display text-h3 font-semibold leading-snug text-brand-700">
                    {resource.title}
                  </h2>
                  <p className="mt-3 text-body text-ink-500">{resource.summary}</p>

                  <ul className="mt-5 flex-1 space-y-3">
                    {resource.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-500">
                        <Grain className="mt-1.5 shrink-0 text-sky-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* D17 S5's "light closing prompt". A line and a link under the grid,
              deliberately not a CTA banner: the page has just spent twelve
              cards being useful without asking for anything, and a hard ask
              here would spend that. */}
          <Reveal className="mt-block">
            <div className="rounded-2xl bg-mist-100 px-7 py-6 hairline sm:flex sm:items-center sm:justify-between sm:gap-8">
              <div>
                <h2 className="font-display text-h4 font-semibold text-brand-700">
                  {parentingOutro.headline}
                </h2>
                <p className="mt-2 max-w-prose text-body text-ink-500">{parentingOutro.body}</p>
              </div>
              <div className="mt-4 shrink-0 sm:mt-0">
                <TextLink to={routes.curriculum}>{parentingOutro.linkLabel}</TextLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

export default ParentingPage
