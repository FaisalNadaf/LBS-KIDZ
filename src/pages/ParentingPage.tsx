import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section } from '@/components/ui/layout'
import { Card, Chip, cardBackdropCycle, cardShapeCycle } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { RevealGroup, RevealItem } from '@/animations/Reveal'
import { Grain } from '@/components/art/primitives'
import { parentingIntro, parentingResources } from '@/data/parents'

/**
 * Parenting Tips & Resources.
 *
 * Deliberate exclusion, stated twice in the source documents:
 *   "This section of the site is intentionally not a vehicle for NEP 2020/
 *    policy keywords. Its purpose is to be genuinely useful to any parent,
 *    regardless of brand awareness or specific government policy."
 *   Source: Keyword & AEO Strategy S5; Full Website Sitemap S1.1.
 *
 * So there is no NEP 2020 framing, no policy explainer and no admissions push
 * anywhere on this page. It is measured on engagement, not keyword ranking.
 */
export function ParentingPage() {
  return (
    <>
      <Seo page={pageSeo.parenting} />

      <PageHeader
        eyebrow={parentingIntro.eyebrow}
        title={parentingIntro.headline}
        standfirst="Activity ideas, preschool-readiness guidance and the questions that come up in every early-years household."
        photo="parent-and-child"
      />

      {/* Last band on the page now, so it takes the handover to the CTA that
          the removed "Why this section exists" band used to carry. A divider
          hangs from the foot of the section it is written in, so leaving it
          behind would have left this page ending on a seam to nothing. */}
      <Section tone="khadi" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="wide">
          {/* Every resource, always. The topic filter has gone, and with it the
              `mt-block` that spaced the grid off it: as the first thing in the
              band, the grid would otherwise sit on a second helping of the
              section's own top padding. */}
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
                  <Chip tone="neutral">{resource.category}</Chip>
                  <h2 className="mt-4 font-display text-h3 font-semibold leading-snug text-indigo-ink-700">
                    {resource.title}
                  </h2>
                  <p className="mt-3 text-body text-ink-500">
                    {resource.summary}
                  </p>

                  <ul className="mt-5 flex-1 space-y-3">
                    {resource.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-500">
                        <Grain className="mt-1.5 shrink-0 text-terracotta-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

    </>
  )
}

export default ParentingPage
