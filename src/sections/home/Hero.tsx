import { useEffect, useRef } from 'react'
import { Check, MapPin, Layers, Ban } from 'lucide-react'
import { Container } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/Button'
import { StatTile } from '@/components/ui/Card'
import { Photo } from '@/components/media/Photo'
import { Underline } from '@/components/art/primitives'
import { Kite, Leaf, Cloud } from '@/components/art/objects'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { Ambient, Blob, Float } from '@/animations/Scroll'
import { useHeroIntro } from '@/animations/gsap'
import { useNavTone } from '@/layouts/nav-tone'
import { heroCopy } from '@/data/positioning'
import { primaryCta } from '@/data/site'
import { programs } from '@/data/admissions'
import { zones } from '@/data/campuses'
import { routes } from '@/data/routes'

/**
 * Homepage hero.
 *
 * Composition: two photographed children standing in soft colour fields, a
 * centred headline between them, drawn objects overlapping the edges. That
 * does three jobs at once — it says "small children" before a word is read, it
 * uses the full width instead of leaving a dead column beside a text block,
 * and it keeps the reading path down the middle where the CTA is.
 *
 * The H1 leads with the local, functional search term, per Keyword & AEO
 * Strategy S3: "Meta title/H1 should be functional and local; brand tagline
 * sits below the fold." The brand tagline is therefore not in the H1.
 *
 * SIZING. The screen holds the composition and nothing else, and its height
 * is clamped at both ends rather than tracking the viewport all the way up.
 * `svh` rather than `vh` so mobile browser chrome cannot push the CTA
 * off-screen; a 32rem floor so a short landscape phone scrolls instead of
 * crushing the headline; and a 50rem ceiling because past that the band stops
 * being generous and starts being empty. Two portraits and four lines of text
 * cannot fill 856px of a 1080p screen without the pictures growing to the size
 * this composition was explicitly moved away from, so the band stops growing
 * instead. On a tall monitor that brings the top edge of the facts strip into
 * view, which is a better thing to have at the bottom of a fold than nothing.
 *
 * The facts strip sits *under* that screen rather than inside it: as a fourth
 * element competing for the same height it squeezed the composition on every
 * laptop, and it reads better as the first thing a reader meets on scrolling
 * anyway.
 *
 * WEIGHTING. The flanking portraits are deliberately narrow: a 3:5 crop
 * capped at 16rem — 18rem from xl, where there is height going spare — pinned
 * to the inner edge of its column so the pair closes in
 * around the words rather than sitting out on the margins. They are there to
 * say "small children" at a glance and to stop the headline floating in an
 * empty band — the centre column is the thing being read, and at six columns of
 * twelve the headline still breaks across three lines, which is the shape the
 * drawn rule underneath was measured for.
 *
 * GROUNDING. The two portraits share a baseline and stand on one soft
 * ellipse. Before that they were staggered and each sat in its own blurred
 * bloom, which at this size read as two stickers pasted onto a background
 * rather than as one picture: a blur wide enough to be a glow around a 16rem
 * photograph is wider than the photograph. Crisp offset plates hold their edge
 * instead, and a pool of light beneath the pair gives both children the same
 * floor.
 *
 * MOTION. One GSAP timeline for the whole entrance (`useHeroIntro`), so the
 * fold settles once. The floating objects are separate looping tweens, each
 * phase-shifted, so they never bob in unison.
 */

const promises = ['No examinations, ever', 'Hindi first, English joyfully', 'No hidden charges']

export function Hero() {
  const scopeRef = useRef<HTMLElement>(null)
  useHeroIntro(scopeRef)

  // The navbar floats over this band with no ground of its own, and this band
  // is now shaded. Ink-on-transparent links measured 2.1:1 against the shaded
  // photograph. `dark-hero` is the switch the page headers already use for
  // exactly this: it flips the wordmark and the links to light while the reader
  // is at the top, and back the moment the bar gains its own surface.
  const { setTone } = useNavTone()
  useEffect(() => {
    setTone('dark-hero')
    return () => setTone('light-hero')
  }, [setTone])

  return (
    <section
      ref={scopeRef}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-khadi-100 bg-khadi-grain"
    >
      {/* ---- The photographic ground ----
          A full-bleed picture behind the whole fold, held well back so it is a
          room the composition stands in rather than a second thing to read.

          `z-0`, NOT a negative index. A negative z-index only paints above its
          parent's background if that parent makes a stacking context, and this
          section is `relative` with `z-index: auto`, which does not. At `-z-20`
          the picture escaped to the root and painted *behind* the section's
          cream fill, so the hero rendered exactly as it had before and the
          photograph was never visible. At `z-0` it is simply the first
          positioned child: after the section's background, before every
          `relative` sibling that follows it.

          THE SCRIM IS NOT OPTIONAL. The headline is ink on cream and the CTA is
          terracotta on cream; over an unmasked photograph neither clears any
          contrast bar. Two layers do the work: a flat wash that sets the floor,
          and a vertical gradient that goes nearly solid at the top and bottom —
          where the navbar, the eyebrow chips and the buttons sit — while
          staying lightest across the middle, which is the band of the picture
          the children are actually in. `priority`, because this is now the
          largest paint on the page. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Photo
          name="classroom-blocks-hero"
          alt=""
          fill
          priority
          sizes="100vw"
          className="size-full"
          /* The crop, per shape of screen. The source is 3:2 and the child sits
             right of centre, at roughly 73% across and 55% down.

             A desktop viewport is wider than 3:2, so `cover` scales to the width
             and trims top and bottom only: the horizontal figure does nothing
             there and the vertical one is all that matters. A phone is far
             taller than it is wide, so the same `cover` trims the sides hard
             instead, keeping a strip about 46% of the frame — and centred, that
             strip cuts the child out of the picture entirely. Biasing to 72%
             keeps him in it.

             The `!` on each is load-bearing. `Photo` adds `object-center`
             whenever no `focus` prop is given, and that utility and these
             arbitrary ones carry the same specificity, so which one won came
             down to their order in the sheet: measured, the `md` and `lg`
             variants beat it and the unprefixed base did not, leaving phones —
             the one width where the horizontal crop actually matters — sitting
             at dead centre. */
          imgClassName="[object-position:72%_52%]! md:[object-position:66%_50%]! lg:[object-position:58%_46%]!"
        />

        {/* A shade, not a veil.

            The cream wash this replaced had to be dense to hold dark text up,
            and dense cream over a photograph is exactly what "the background is
            not visible" meant: the picture went milky everywhere the words
            were. Shading the ground instead and lifting the type off it costs
            the picture far less, because a light shade keeps a photograph's own
            contrast where a light veil flattens it.

            Below `lg` the column is centred and full width, so the shade has to
            be even. */}
        <div className="absolute inset-0 bg-indigo-ink-800/45 lg:hidden" />

        {/* From `lg` it is one edge. The words are in the left third and the
            child is on the right, so the shade is gone by 62% and the half of
            the picture anyone actually looks at carries nothing at all. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(16,36,56,0.72)_0%,rgba(16,36,56,0.6)_26%,rgba(16,36,56,0.3)_45%,rgba(16,36,56,0)_62%)] lg:block" />

        {/* A real strip of shade under the navbar. The bar is transparent over
            this band and the top of the picture is a bright classroom wall, so
            at 35% the links measured 2.5:1 whichever colour they were: too
            light for the dark set, too dark for the light set. Deep enough for
            the light set to win, and only across the height of the bar. */}
        <div className="absolute inset-x-0 top-0 h-[calc(var(--nav-h)+3.5rem)] bg-linear-to-b from-indigo-ink-900/80 via-indigo-ink-900/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-indigo-ink-900/25 to-transparent" />
      </div>

      {/* The screen. Everything inside this div fits between the navbar and the
          fold; anything that does not belong there goes after it. */}
      {/* Exactly one viewport, never more. `h` rather than `min-h`: a min let a
          tall headline or a wrapped promise row push the fold past the screen.
          The navbar is `fixed` and paints over this band rather than above it,
          so the full `100svh` is the hero's to take and the top padding simply
          keeps the words clear of the bar.

          `svh` rather than `vh` so mobile browser chrome cannot push the CTA
          out of reach, and a `30rem` floor so a short landscape phone scrolls
          instead of crushing the words.

          NO `w-screen`. `100vw` includes the scrollbar gutter, so on any
          desktop browser that reserves one it is wider than the viewport and
          creates exactly the horizontal scroll this brief rules out. A
          block-level section is already the full width of the page without
          it. */}
      <div className="relative flex h-[100svh] min-h-[30rem] flex-col justify-center overflow-hidden pb-10 pt-[calc(var(--nav-h)+1.5rem)]">
        {/* The cream wash that used to sit here has gone with the cream band it
            was drawn for. It covered the top 58% of the fold in
            `terracotta-50`, which over a photograph is a milky film across the
            whole upper half — the last of the "white overlay" still visible
            after the others came off. The band takes its top edge from the
            shade under the navbar instead. */}

        {/* Two fields of colour wandering behind the composition on long,
            mismatched cycles, so the fold is never completely still. Behind
            everything and never legible as objects — the moment one of these
            reads as a shape moving, it is competing with the headline. */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <Ambient className="-left-[8%] top-[-14%] size-[36rem]" range={34} duration={24}>
            <Blob tone="haldi" className="size-full" />
          </Ambient>
          <Ambient
            className="-right-[6%] bottom-[-18%] size-[30rem]"
            range={26}
            duration={31}
            delay={3}
          >
            <Blob tone="terracotta" className="size-full" />
          </Ambient>
        </div>

        <Container size="composition" className="relative">
          {/* The cream pool of light that used to sit here is gone. It was
              drawn for a composition with two photographs standing on it and a
              cream band behind them; over a shaded photograph it was simply a
              pale disc in the middle of the picture, which is the "white
              overlay in the centre" that kept showing up. */}

          {/* Drawn objects. Decorative, aria-hidden, and the only things on this
              screen still moving once the entrance has finished. Anchored to the
              composition rather than to the viewport: pinned to the window edges
              they drifted further from the picture the wider the screen got, and
              at 1920 they were decorating nothing. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {/* All four sit right of the words now. They were composed for a
                centred headline with a photograph either side, so with the text
                moved into the left third they landed on it: a cloud across the
                first promise pill and a leaf through the standfirst. The right
                half is the half with nothing written on it. */}
            <Float index={0} y={9} className="absolute right-[40%] top-[4%] hidden lg:block">
              <Cloud className="h-9 opacity-60" />
            </Float>
            <Float index={1} y={7} className="absolute right-[7%] top-[2%] hidden xl:block">
              <Cloud className="h-6 opacity-45" />
            </Float>
            <Float index={2} y={13} rotate={4} className="absolute right-[2%] top-[20%] hidden lg:block">
              <Kite className="h-16" />
            </Float>
            <Float index={3} y={11} rotate={-5} className="absolute bottom-[18%] right-[2%] hidden xl:block">
              <Leaf className="h-11 opacity-70" />
            </Float>
          </div>

          {/* `relative`, so the words paint over the stage and the drawn
              objects rather than under them.

              The two framed portraits that used to flank this column are gone.
              They were doing a job the band no longer needs: saying "small
              children" before a word is read, which the photograph behind the
              whole fold now says on its own, and at far greater size. Two
              cut-out frames on top of a full-bleed photograph read as pictures
              stuck on a picture. */}
          {/* Left, not centred. The photograph puts its child on the right and
              its quiet, blurred half on the left, so a centred column sits over
              the subject and has to be veiled to stay readable. Moved across,
              the words take the half that was already empty and the half with
              the child in it needs no scrim at all. */}
          <div className="relative flex justify-start">
            {/* ---- The words ---- */}
            <div className="w-full max-w-xl text-center lg:max-w-[52rem] lg:text-left xl:max-w-[58rem]">
              {/* Pills rather than three loose ticks. Given a shape they read as
                  one row of claims; loose, they read as debris above the
                  headline. */}
              <ul
                data-hero-item
                className="mx-auto flex flex-wrap items-center justify-center gap-2 lg:mx-0 lg:flex-nowrap lg:justify-start"
              >
                {promises.map((promise) => (
                  <li
                    key={promise}
                    className="flex items-center gap-2 rounded-full bg-khadi-50/85 py-1.5 pl-1.5 pr-3.5 text-small font-semibold text-ink-600 hairline"
                  >
                    <span
                      className="grid size-5 shrink-0 place-items-center rounded-full bg-terracotta-50 text-terracotta-600"
                      aria-hidden="true"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>

              {/* A step down from `text-display` at `lg`. The emphasis line is the
                  longest phrase on the site and at full display size it broke
                  across two rows however wide the column got; a hair smaller it
                  sets on one, which is what the drawn underline beneath it was
                  measured for. */}
              <h1
                id="hero-title"
                className="mt-5 text-display text-khadi-50 lg:text-[clamp(2.4rem,1.1rem+2.5vw,3.1rem)]"
              >
                <span className="block overflow-hidden pb-[0.08em]">
                  <span data-hero-line className="block font-normal">
                    {heroCopy.h1Lead}
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.14em]">
                  {/*
                    Stays `block`. `inline-block` would let the drawn rule measure
                    the words rather than the column — but it also let the line box
                    collapse to min-content, and the phrase broke to one word per
                    line. A rule that overshoots by a few percent is a hand-drawn
                    flourish; a headline set one word per line is a bug.
                  */}
                  <span data-hero-line className="relative block text-haldi-300">
                    {heroCopy.h1Emphasis}
                    {/* Sized to the last line of the phrase, not to the
                        column. At 92% it ran a full word past "copying" at
                        either end and stopped reading as an underline. */}
                    <Underline className="w-[62%] text-haldi-300/70" />
                  </span>
                </span>
              </h1>

              {/* Light on the shade, like the heading. This paragraph is the
                  band's tightest contrast either way round — body-sized where
                  the headline is large — so it takes the brightest of the
                  khadi steps rather than a muted one. */}
              <p data-hero-item className="mx-auto mt-6 max-w-xl text-lead text-khadi-100 lg:mx-0 lg:max-w-lg">
                {heroCopy.standfirst}
              </p>

              <div
                data-hero-item
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:items-start lg:justify-start"
              >
                <ButtonLink to={primaryCta.href} size="lg" withArrow>
                  {primaryCta.label}
                </ButtonLink>
                <ButtonLink to={routes.curriculum} variant="secondary" size="lg">
                  How we teach
                </ButtonLink>
              </div>
            </div>

          </div>
        </Container>

      </div>

      {/* ---- Three facts, all of them checkable ----
          Deliberately not enrolment or campus numbers: there are none yet, and
          inventing them is the exact overclaim this project avoids. These are
          the three figures a parent can verify from the rest of the site.

          At the fold rather than below it, once the screen above stopped
          stretching past 50rem — so it settles with the entrance rather than
          waiting for a scroll that may never come. */}
      <Container size="composition" className="relative pb-section-sm">
        <ul
          data-hero-item
          className="grid gap-5 rounded-2xl bg-khadi-50 px-5 py-4 shadow-soft hairline sm:grid-cols-3 sm:gap-0 sm:px-6 sm:py-5"
        >
          <li className="sm:pr-5">
            <StatTile
              value="0"
              label="Examinations, at any stage. Assessment happens inside the activity."
              icon={<Ban className="size-5" aria-hidden="true" />}
            />
          </li>
          <li className="sm:border-l sm:border-khadi-300 sm:px-5">
            <StatTile
              value={programs.length}
              label="Classes, from Playgroup through to UKG, on one continuous idea."
              icon={<Layers className="size-5" aria-hidden="true" />}
            />
          </li>
          <li className="sm:border-l sm:border-khadi-300 sm:pl-5">
            <StatTile
              value={zones.length}
              label={`Indore zones we are opening in first: ${zones.map((z) => z.name).join(', ')}.`}
              icon={<MapPin className="size-5" aria-hidden="true" />}
            />
          </li>
        </ul>
      </Container>

      {/* The hero closes into the positioning band. A gentle sweep, because
          that step is khadi-100 to khadi-50 and there is almost no contrast
          to carry a deeper curve. The spacer sits below the fold-height div, so
          the hero's one-screen budget is untouched. */}
      <SectionDivider type="gentle" to="white" />
    </section>
  )
}
