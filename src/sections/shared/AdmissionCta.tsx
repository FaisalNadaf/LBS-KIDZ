import { useLocation } from 'react-router-dom'
import { Container } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/Button'
import { primaryCta } from '@/data/site'
import { finalCta } from '@/data/positioning'
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
 * saturated coral rectangle with a paragraph in it, which is exactly the kind
 * of block a reader has learned to scroll past. With a child's face in it, it
 * reads as the end of a story rather than as an advertisement.
 *
 * The copy is Section 10 of the Home specification, the page's closing
 * conversion moment. It is repeated on every page rather than written per page,
 * because the specification asks for one persistent action and not for a
 * different sales line at the foot of each route.
 */
/**
 * Routes this band does not appear on.
 *
 * Four of the five page specifications say, in their own words, that their page
 * is not a conversion page and that the persistent navbar button is the only
 * Register Interest a reader should meet on it:
 *
 *   LBS Legacy      "not a conversion page, no hard sell ... no additional CTA
 *                    blocks mid-page"
 *   The LBS Way     "persistent nav CTA only ... not a hard-conversion page"
 *   Family Message  "no conversion CTA on this page at all beyond the
 *                    persistent nav"
 *   Curriculum      "persistent nav Register Interest CTA only"
 *
 * None of them is left with a hole where this band was: each closes on the
 * section its own specification ends with, which is a soft pair of links rather
 * than an ask. Register Interest itself is here too, where a link to the page
 * the reader is already on would be nonsense.
 */
const SUPPRESSED_ON: string[] = [
  routes.registerInterest,
  routes.legacy,
  routes.lbsWay,
  routes.familyMessage,
  routes.curriculum,
  /**
   * Programs & Classes is here for a different reason from the four above. It
   * IS a conversion page, and its specification gives it a closing CTA of its
   * own, Section 4, ending on Register Interest. With this band underneath as
   * well the page finished on two Register Interest buttons one above the
   * other, which reads as a page that has forgotten it already asked.
   */
  routes.programs,
]

export function AdmissionCta() {
  const { pathname } = useLocation()
  if (SUPPRESSED_ON.includes(pathname)) return null

  return (
    <section aria-labelledby="site-cta" className="on-dark relative bg-primary">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Flat primary blue, top to bottom. It carried a sky glow and a
            deepening foot, which met the clouds above and the layered curve
            below as two soft bands of a different blue — read as a stray
            shadow at both seams. Flat, both curves meet exactly one colour. */}
        <div className="absolute -left-8 top-6 h-64 text-white/10 motion-safe:animate-drift">
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
            <h2 id="site-cta" className="text-h2 text-white">
              {finalCta.headline}
            </h2>
            <p className="mt-4 max-w-xl text-lead text-mist-100/90">
              {finalCta.body}
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
              className="ring-4 ring-white/25"
            />
            <Sparks className="absolute -left-3 top-10 w-9 text-orange-300/90" />
          </div>
        </Reveal>
      </Container>

      {/* The one seam that ends a page, so it takes the only layered variant:
          two curves closing the CTA into the footer. Last child, so its spacer
          reserves room at the foot of the band rather than the head of it. */}
      <SectionDivider type="layered" fill="var(--color-brand-800)" />
    </section>
  )
}
