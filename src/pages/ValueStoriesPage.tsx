import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { articleSchema } from '@/lib/schema'
import { Container, Section } from '@/components/ui/layout'
import { Card, Chip } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { MotifDivider } from '@/components/art/scenes'
import { ShapedPhoto } from '@/components/media/Photo'
import type { PhotoName } from '@/data/media'
import { valueStories, valueStoriesIntro } from '@/data/parents'
import { cn } from '@/lib/cn'

/**
 * Value Stories.
 *
 * Tone instruction from the research summary: follow Reggio Emilia in showing
 * "how a value is learned, not just state that it is taught", documenting the
 * child's process rather than only the outcome.
 * Source: Global & Indian Preschool Research S3 and S5.
 *
 * Phase scope: "general/legacy stories in Phase 1", with real classroom moments
 * added once operational. Source: Alignment Map S2.
 */
/**
 * One image per story, chosen for the thing the story turns on rather than for
 * the value it is named after: a shared meal, a field, a set of materials left
 * out for anyone to use.
 */
const storyPhotos: PhotoName[] = ['family-at-home', 'children-in-the-field', 'craft-table']

/** One silhouette per story, so the page does not alternate two shapes. */
const storyShapes = ['crest', 'cut-alt', 'leaf'] as const

export function ValueStoriesPage() {
  return (
    <>
      <Seo
        page={pageSeo.valueStories}
        schemas={[
          articleSchema({
            headline: valueStoriesIntro.headline,
            description: pageSeo.valueStories.description,
            path: pageSeo.valueStories.path,
            section: 'For Parents' }),
        ]}
      />

      <PageHeader
        eyebrow={valueStoriesIntro.eyebrow}
        title={valueStoriesIntro.headline}
        standfirst="Anyone can list values. These are stories about how one actually gets into a child."
        photo="girl-blue-door"
      />

      <Section tone="khadi" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="wide">
          {/* One story, one screen. Each used to run a full-width 16:9
              photograph with the whole story stacked under it, which is around
              a thousand pixels before the question card and means no reader
              ever sees a story whole. Side by side, the picture and the telling
              are one object, and the photograph takes its height from the row
              so neither column is left with a bay of empty paper. The side
              alternates so three stories in a column do not read as a form. */}
          <div className="space-y-16 lg:space-y-block">
            {valueStories.map((story, i) => {
              const photoLeft = i % 2 === 0
              return (
                <article key={story.slug} id={story.slug} className="scroll-mt-28">
                  {/* Stretch, not centre: centred, the picture sat at its minimum height
                      with the difference split above and below it. Stretched, it
                      takes the height the telling needs and the row has no slack
                      left in it at all. */}
                  <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                    <Reveal
                      direction={photoLeft ? 'right' : 'left'}
                      tier="lead"
                      className={cn(
                        'lg:col-span-5 lg:row-start-1',
                        photoLeft ? 'lg:col-start-1' : 'lg:col-start-8',
                      )}
                    >
                      <div className="h-72 sm:h-96 lg:h-full lg:min-h-[24rem]">
                        <ShapedPhoto
                          name={storyPhotos[i % storyPhotos.length]}
                          shape={storyShapes[i % storyShapes.length]}
                          fill
                          interactive
                          focus="50% 40%"
                          sizes="(min-width: 1024px) 38vw, 92vw"
                        />
                      </div>
                    </Reveal>

                    <div
                      className={cn(
                        'lg:col-span-7 lg:row-start-1',
                        photoLeft ? 'lg:col-start-6' : 'lg:col-start-1',
                      )}
                    >
                      <Reveal>
                        <span className="flex flex-wrap items-center gap-3">
                          <Chip tone="accent">{story.pillar}</Chip>
                          <span className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                            {story.kicker}
                          </span>
                        </span>
                        <h2 className="mt-4 text-h2">{story.title}</h2>
                      </Reveal>

                      <RevealGroup className="mt-5 space-y-4" each={0.06}>
                        {story.body.map((paragraph) => (
                          <RevealItem key={paragraph}>
                            <p className="max-w-prose text-body text-ink-500">{paragraph}</p>
                          </RevealItem>
                        ))}
                      </RevealGroup>

                      <Reveal className="mt-7">
                        <Card tone="haldi" object="value-stories-question" backdrop="blue-peach">
                          <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                            The question a child is asked
                          </p>
                          <p className="mt-3 font-display text-h3 leading-snug text-indigo-ink-700">
                            “{story.question}”
                          </p>
                        </Card>
                      </Reveal>
                    </div>
                  </div>

                  {i < valueStories.length - 1 ? (
                    <Reveal className="mt-block">
                      <MotifDivider />
                    </Reveal>
                  ) : null}
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

    </>
  )
}

export default ValueStoriesPage
