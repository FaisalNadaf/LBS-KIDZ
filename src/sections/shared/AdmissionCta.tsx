import { useLocation } from 'react-router-dom'
import { Container } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/Button'
import { primaryCta } from '@/data/site'
import { routes } from '@/data/routes'
import { Reveal } from '@/animations/Reveal'
import { ShapedPhoto } from '@/components/media/Photo'
import { WheatStalk } from '@/components/art/primitives'
import { Sparks } from '@/components/art/objects'
import { ObjectScatter } from '@/components/art/ObjectScatter'
import { SectionDivider } from '@/components/ui/SectionDivider'

/**
 * The persistent conversion action, repeated at the foot of every page.
 * "Register Interest - CTA button, visually distinct (colour-filled,
 *  right-aligned), persistently visible on every page."
 * Source: Full Website Sitemap S1.1.
 *
 * Hidden on the Register Interest page itself, where it would be a link to the
 * page the reader is already on.
 *
 * A photograph sits inside the band on wide screens. Without it this is a
 * saturated terracotta rectangle with a paragraph in it, which is exactly the
 * kind of block a reader has learned to scroll past. With a child's face in it,
 * it reads as the end of a story rather than as an advertisement.
 */
export function AdmissionCta() {
  const { pathname } = useLocation()
  if (pathname === routes.registerInterest) return null

  return (
    <section aria-labelledby="site-cta" className="relative bg-terracotta-600">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-8 top-6 h-64 text-khadi-50/10 motion-safe:animate-drift">
          <WheatStalk />
        </div>
      </div>

      {/* `inline`: this band has no `isolate`, so a `-z-10` layer would escape
          it and paint behind the page ground. DOM order does the same job —
          the objects are rendered before the `relative` Container below. */}
      <ObjectScatter seed="admission-cta" variant="cap" onDark inline />

      <Container size="wide" className="relative py-14 sm:py-16 lg:py-20">
        <Reveal className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="site-cta" className="text-h2 text-khadi-50">
              Tell us about your child
            </h2>
            <p className="mt-4 max-w-xl text-lead text-khadi-100/90">
              Tell us a few details. We will come back to you with class options, the fee, and
              your nearest campus.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to={primaryCta.href} variant="onDark" size="lg" withArrow>
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink to={routes.contact} variant="onDarkOutline" size="lg">
                Contact Us
              </ButtonLink>
            </div>
          </div>

          <div className="relative hidden lg:col-span-5 lg:block">
            <ShapedPhoto
              name="girl-green-dress"
              shape="crest-alt"
              interactive
              sizes="(min-width: 1024px) 38vw, 0px"
              ratio="4 / 3"
              /* She stands right of centre in a 547x729 source, so a centred
                 crop left a third of the frame as wall and pushed her against
                 the shape's edge. */
              focus="60% 30%"
              className="ring-4 ring-khadi-50/20"
            />
            <Sparks className="absolute -left-3 top-10 w-9 text-haldi-300/90" />
          </div>
        </Reveal>
      </Container>

      {/* The one seam that ends a page, so it takes the only layered variant:
          two curves closing the CTA into the footer. Last child, so its spacer
          reserves room at the foot of the band rather than the head of it. */}
      <SectionDivider type="layered" fill="var(--color-indigo-ink-800)" />
    </section>
  )
}
