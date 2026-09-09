import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container, Section, SectionHeader } from './layout'
import { ParallaxPhoto } from '@/animations/Scroll'
import { Reveal } from '@/animations/Reveal'
import type { PhotoName } from '@/data/media'
import type { PhotoShape } from '@/components/media/Photo'

/**
 * A section that is one column of words beside one photograph.
 *
 * This shape was written out by hand eleven times across the site — Philosophy,
 * the day, Campuses, three sections of Curriculum, the LBS Way, Parenting — and
 * every copy had drifted: different column splits, different gaps, different
 * photo ratios, a `mt-8` here and a `mt-10` there. That drift is most of what
 * made the pages feel like separate designs.
 *
 * `side` is the only knob that matters. Alternating it down a page is what
 * produces visual rhythm without any animation: words left, picture right,
 * then the reverse, so the eye crosses the page instead of running straight
 * down one gutter.
 *
 * The image always leads on a phone, where a side-by-side split does not exist
 * and a picture is a better invitation into a block of text than a heading is.
 */
export function ContentImageSection({
  id,
  labelledBy,
  eyebrow,
  title,
  standfirst,
  children,
  photo,
  photoAlt,
  photoShape = 'crest-alt',
  photoRatio = '4 / 3',
  photoFocus,
  side = 'right',
  tone = 'white',
  size = 'default',
  aside,
  className,
  divider,
}: {
  id?: string
  labelledBy?: string
  /** See `Section`. */
  divider?: ComponentProps<typeof Section>['divider']
  eyebrow?: string
  title: ReactNode
  standfirst?: ReactNode
  /** Everything under the standfirst: notes, links, lists. */
  children?: ReactNode
  photo: PhotoName
  photoAlt?: string
  photoShape?: PhotoShape
  photoRatio?: string
  photoFocus?: string
  /** Which side the photograph sits on from `lg` up. */
  side?: 'left' | 'right'
  tone?: 'khadi' | 'white' | 'indigo' | 'terracotta' | 'neem' | 'haldi'
  size?: 'sm' | 'default' | 'lg'
  /** Rendered beneath the photograph — a caption, a chip row, a second image. */
  aside?: ReactNode
  className?: string
}) {
  const onDark = tone === 'indigo'

  return (
    <Section
      tone={tone}
      size={size}
      id={id}
      labelledBy={labelledBy}
      divider={divider}
      className={className}
    >
      <Container size="wide">
        <div className="grid items-center gap-block lg:grid-cols-12 lg:gap-14">
          <div
            className={cn(
              'lg:col-span-6',
              // Order, not direction: `flex-row-reverse` would reverse the tab
              // order too, and a keyboard user would meet the photograph before
              // the heading that explains it.
              side === 'left' ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            <SectionHeader
              id={labelledBy}
              eyebrow={eyebrow}
              title={title}
              standfirst={standfirst}
              onDark={onDark}
            />
            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          <div
            className={cn(
              'order-first lg:col-span-6',
              side === 'left' ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            {/* `clip` rather than a fade: the photograph uncovers itself from
                the bottom edge up while easing back from a slight over-scale,
                so it reads as being revealed rather than as an image whose
                opacity was turned up. It is `lead` because in this layout the
                picture and the heading share top billing — a band that opened
                its text strongly and its photograph quietly would look like it
                had forgotten one of them. */}
            <Reveal direction="clip" tier="lead">
              <ParallaxPhoto
                name={photo}
                alt={photoAlt}
                shape={photoShape}
                strength={1.1}
                sizes="(min-width: 1024px) 46vw, 92vw"
                ratio={photoRatio}
                focus={photoFocus}
              />
            </Reveal>
            {aside ? (
              <Reveal className="mt-5" tier="quiet" delay={0.12}>
                {aside}
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}
