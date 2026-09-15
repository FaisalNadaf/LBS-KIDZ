import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { articleSchema } from '@/lib/schema'
import { Container, Section } from '@/components/ui/layout'
import { Card, Chip } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { MotifDivider } from '@/components/art/scenes'
import { ShapedPhoto } from '@/components/media/Photo'
import type { PhotoName } from '@/data/media'
import { valueStories, valueStoriesIntro, valueStoriesOutro } from '@/data/parents'
import { routes } from '@/data/routes'
import { cn } from '@/lib/cn'
import { CTA_SEAM } from '@/components/ui/SectionDivider'

/**
 * Value Stories.
 *
 * "Where The Lal Bahadur Shastri Way states the SIMPLE framework, this page
 *  shows where each value actually comes from, a real moment in Shastri Ji's
 *  life, told simply enough for a parent to read in a minute, ending in the
 *  same everyday question a child is asked to practice it."
 *  Source: Value Stories Page Content (D16) S1.
 *
 * SIX STORIES, ONE PER PILLAR. The page previously carried three, written
 * before any page-level specification existed for it. D16 supplies one story
 * for each SIMPLE letter, which is what makes the page do its stated job: a
 * parent who has read the framework on The LBS Way can now see every letter of
 * it earned rather than asserted.
 *
 * The Integrity story is the railway resignation, not the Honesty Shop. D16 S8
 * lists the Honesty Shop as "deliberately excluded, consistent with holding it
 * back until a campus exists", which is the same instruction that keeps it off
 * The LBS Way in this build.
 *
 * NOT A DISCOVERY PAGE. D16 S1 and S7: "illustrative brand content, not a
 * discovery/SEO page", brand-tier keywords only, and the persistent nav CTA is
 * the only conversion action. Nothing on this page asks for a lead.
 */

/**
 * One photograph per story, chosen for what the story turns on rather than for
 * the value it is named after: the thing a child can see.
 *
 * All six are distinct, and none is the page's header image. D16 S4 prefers
 * real photography "with illustration acceptable for the more abstract stories
 * (Simplicity, Mindfulness) if no suitable photo exists" — both of those are
 * carried here by a quiet, single-subject photograph rather than by a literal
 * depiction, which is the same thing the instruction is reaching for.
 */
const storyPhotos: Record<string, PhotoName> = {
  // One child, one tray of materials, and nothing else needed.
  simplicity: 'counting-tray',
  // A board you can rub out and start again on: owning the part that went wrong.
  integrity: 'boy-at-chalkboard',
  // Unhurried attention, which is what pausing before reacting looks like at four.
  mindfulness: 'letter-board',
  // The farmer's half of the sentence.
  patriotism: 'children-in-the-field',
  // Standing forward, before anyone asked.
  leadership: 'child-standing-yellow',
  // He tried it at home first.
  empathy: 'family-at-home',
}

/** One silhouette per story, so six in a column do not read as a form. */
const storyShapes = ['crest', 'cut-alt', 'leaf', 'blob-alt', 'crest-alt', 'leaf-alt'] as const

/**
 * A tint per pillar for the story's tag.
 *
 * D16 S4 asks for "a small coloured label above the category label", tying each
 * story back to its SIMPLE letter. Six tints from the logo palette, each dark
 * enough on its own tint to carry the label at AA.
 */
const pillarTints: Record<string, string> = {
  Simplicity: 'bg-mist-200 text-ink-700',
  Integrity: 'bg-brand-100 text-brand-700',
  Mindfulness: 'bg-sky-100 text-sky-700',
  Patriotism: 'bg-orange-100 text-orange-600',
  Leadership: 'bg-coral-100 text-coral-700',
  Empathy: 'bg-green-100 text-green-600',
}

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
            section: 'For Parents',
          }),
        ]}
      />

      <PageHeader
        eyebrow={valueStoriesIntro.eyebrow}
        title={valueStoriesIntro.headline}
        standfirst={valueStoriesIntro.standfirst}
        photo="grandmother-grandson-raipur"
        photoFocus="50% 20%"
      />

      <Section tone="mist" divider={CTA_SEAM}>
        <Container size="wide">
          {/* Jump-to-pillar nav. D16 S4: six stories is a long scroll, and a
              parent usually arrives curious about one value rather than all
              six. Six anchors, above the first story, is the page's only
              interaction beyond scrolling.

              IT SITS ON ITS OWN SURFACE, AND THAT IS NOT DECORATION. Bare on
              the band, the six pills and the first story's pillar tag were the
              same pill, in the same tint, forty-six pixels apart, and the first
              story's tag reads "Simplicity" exactly as the first pill does. It
              looked like a seventh pill that had wrapped onto a new line rather
              than the start of the article. A lighter panel with a hairline
              marks the whole row as an index, which is the distinction the eye
              was missing. */}
          <Reveal>
            <nav
              aria-label={valueStoriesIntro.quickNavLabel}
              className="mb-section rounded-2xl bg-mist-50 px-6 py-5 hairline sm:flex sm:items-center sm:gap-6"
            >
              <p className="shrink-0 text-2xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                {valueStoriesIntro.quickNavLabel}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5 sm:mt-0">
                {valueStories.map((story) => (
                  <li key={story.slug}>
                    <a
                      href={`#${story.slug}`}
                      className={cn(
                        'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold',
                        'transition-transform duration-200 ease-out-soft hover:-translate-y-0.5',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
                        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                        pillarTints[story.pillar],
                      )}
                    >
                      {story.pillar}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* One story, one screen. Each used to run a full-width 16:9
              photograph with the whole story stacked under it, which is around
              a thousand pixels before the question card and means no reader
              ever sees a story whole. Side by side, the picture and the telling
              are one object, and the photograph takes its height from the row
              so neither column is left with a bay of empty paper. The side
              alternates, which is also what D16 S4 asks for. */}
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
                          name={storyPhotos[story.slug]}
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
                      {/* Tag above kicker above title, which is the order D16
                          S4 sets out: "a small coloured label above the
                          category label", and the category label "sits above
                          the story title as a kicker line". They were on one
                          row, which both lost that order and made the tag read
                          as part of the jump nav above it. */}
                      <Reveal>
                        <Chip className={pillarTints[story.pillar]}>{story.pillar}</Chip>
                        <p className="mt-3 text-2xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                          {story.kicker}
                        </p>
                        <h2 className="mt-2 text-h2">{story.title}</h2>
                      </Reveal>

                      <RevealGroup className="mt-5 space-y-4" each={0.06}>
                        {story.body.map((paragraph) => (
                          <RevealItem key={paragraph}>
                            <p className="max-w-prose text-body text-ink-500">{paragraph}</p>
                          </RevealItem>
                        ))}
                      </RevealGroup>

                      {/* "The most important line on the page for a parent to
                          notice", per D16 S4, which is why it is a tinted card
                          and not another paragraph. */}
                      <Reveal className="mt-7">
                        <Card tone="orange" object="value-stories-question" backdrop="blue-peach">
                          <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                            The question a child is asked
                          </p>
                          <p className="mt-3 font-display text-h3 leading-snug text-brand-700">
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

          {/* D16 S5: a closing route out for a parent who wants the full
              framework after reading the stories. A line and a link, not a
              banner: this page is not a conversion page. */}
          <Reveal className="mt-block">
            <Card tone="mist" object="value-stories-outro" backdrop="green-blob">
              <h2 className="font-display text-h3 font-semibold text-brand-700">
                {valueStoriesOutro.headline}
              </h2>
              <p className="mt-3 max-w-prose text-body text-ink-500">{valueStoriesOutro.body}</p>
              <div className="mt-5">
                <TextLink to={routes.lbsWay}>{valueStoriesOutro.linkLabel}</TextLink>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

export default ValueStoriesPage
