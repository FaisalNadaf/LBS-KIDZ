import { useRef } from 'react'
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

        {/* A very light overall wash, only enough to take the edge off the
            footage at the frame edges — but only from `lg`. The lighter value
            was on `sm` first, which is wrong: the radial below is sized as a
            percentage of the band, so on a tablet it covers proportionally
            less while the text still spans most of the width. Measured at
            768x1024 the standfirst came in at 2.6:1 against a floor of 3. The
            step belongs at `lg`, where the column actually narrows. */}
        <div className="absolute inset-0 bg-khadi-100/26 lg:bg-khadi-100/6" />

        {/* The one that does the real work, and the one that was wrong. It used
            to be an ellipse half the width and 42% of the height of the band,
            solid cream out to 22% of its radius and only reaching transparent
            at the frame edge — which is not a scrim behind the text, it is a
            cream veil over the whole picture. The footage was paying its
            download and showing almost nothing for it.

            Tight and explicit instead: near-opaque under the words, still 86%
            at the standfirst, then falling away to nothing by the frame edge.
            Written in rgba rather than a token because the stops need four
            different alphas of one colour, which a single `var()` cannot
            express.

            The middle stop was set by the standfirst, not the headline, and
            for a while it was the only thing holding the veil up: at `ink-500`
            over a very bright classroom that line measured 2.5:1 at 768px, and
            every attempt to lighten the picture pushed it under. Darkening the
            paragraph instead moved the constraint off the scrim, which is why
            these numbers are roughly half what they were. */}
        <div className="absolute inset-0 bg-[radial-gradient(48%_44%_at_50%_47%,rgba(250,246,238,0.82)_0%,rgba(250,246,238,0.6)_42%,rgba(250,246,238,0.18)_72%,rgba(250,246,238,0)_100%)]" />

        {/* Top and bottom only: the navbar needs something to sit on, and the
            foot has to reach the facts strip without a visible edge. */}
        <div className="absolute inset-0 bg-linear-to-b from-khadi-100/70 via-transparent to-khadi-100/28" />
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
        {/* A soft terracotta wash behind the fold, so the band has a top edge. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-linear-to-b from-terracotta-50/60 to-transparent"
          aria-hidden="true"
        />

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
          {/* The floor: a pool of light under the whole composition, so the two
              children read as standing in the same place instead of hovering at
              two unrelated heights.

              A radial gradient rather than an ellipse filled with a linear one.
              The filled shape had an edge, and at its widest point that edge
              cut straight across the headline as a visible lens; fading to
              transparent on every side leaves nothing to catch. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[6%] bottom-[-16%] top-[54%] hidden bg-[radial-gradient(closest-side,var(--color-khadi-50),transparent)] lg:block"
          />

          {/* Drawn objects. Decorative, aria-hidden, and the only things on this
              screen still moving once the entrance has finished. Anchored to the
              composition rather than to the viewport: pinned to the window edges
              they drifted further from the picture the wider the screen got, and
              at 1920 they were decorating nothing. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Float index={0} y={9} className="absolute left-[1%] top-[4%] hidden lg:block">
              <Cloud className="h-9 opacity-70" />
            </Float>
            <Float index={1} y={7} className="absolute -top-7 right-[13%] hidden xl:block">
              <Cloud className="h-6 opacity-50" />
            </Float>
            <Float index={2} y={13} rotate={4} className="absolute right-[3%] top-[16%] hidden lg:block">
              <Kite className="h-16" />
            </Float>
            <Float index={3} y={11} rotate={-5} className="absolute bottom-[12%] left-[3%] hidden lg:block">
              <Leaf className="h-11 opacity-80" />
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
          <div className="relative flex justify-center">
            {/* ---- The words ---- */}
            <div className="w-full max-w-2xl text-center">
              {/* Pills rather than three loose ticks. Given a shape they read as
                  one row of claims; loose, they read as debris above the
                  headline. */}
              <ul
                data-hero-item
                className="mx-auto flex flex-wrap items-center justify-center gap-2"
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

              <h1 id="hero-title" className="mt-5 text-display text-indigo-ink-700">
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
                  <span data-hero-line className="relative block text-terracotta-600">
                    {heroCopy.h1Emphasis}
                    {/* Sized to the last line of the phrase, not to the
                        column. At 92% it ran a full word past "copying" at
                        either end and stopped reading as an underline. */}
                    <Underline className="w-[62%] text-terracotta-300/80" />
                  </span>
                </span>
              </h1>

              {/* `indigo-ink-700`, not the `ink-500` this paragraph uses elsewhere on
                  the site. Over a photograph the scrim exists almost entirely to
                  hold this one line up: it is body-sized and mid-toned, where the
                  headline above it is large and near-black and clears its floor
                  almost anywhere. Darkening it by two steps buys about three
                  points of contrast, which is three points the veil over the
                  picture no longer has to buy. */}
              <p data-hero-item className="mx-auto mt-6 max-w-xl text-lead text-indigo-ink-700/90">
                {heroCopy.standfirst}
              </p>

              <div
                data-hero-item
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
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
