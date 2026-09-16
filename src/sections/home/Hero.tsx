import { useEffect, useRef } from 'react'
import { Check, MapPin, Layers, Shapes } from 'lucide-react'
import { Container } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/Button'
import { StatTile } from '@/components/ui/Card'
import { Photo } from '@/components/media/Photo'
import { Underline } from '@/components/art/primitives'
import { Kite, Leaf, Cloud, Star } from '@/components/art/objects'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { Float } from '@/animations/Scroll'
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

const promises = [
  'Activities First, Progress Naturally',
  'Mother Tongue First, English Joyfully',
  'Everything Included, Nothing Added Later',
]

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
      className="relative overflow-hidden bg-mist-100 bg-grain"
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
        <div className="absolute inset-0 bg-brand-800/45 lg:hidden" />

        {/* From `lg` it is one edge. The words are in the left third and the
            child is on the right, so the shade is gone by 62% and the half of
            the picture anyone actually looks at carries nothing at all. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,color-mix(in_oklab,var(--color-brand-900)_74%,transparent)_0%,color-mix(in_oklab,var(--color-brand-800)_62%,transparent)_26%,color-mix(in_oklab,var(--color-brand-700)_30%,transparent)_45%,transparent_62%)] lg:block" />

        {/* A real strip of shade under the navbar. The bar is transparent over
            this band and the top of the picture is a bright classroom wall, so
            at 35% the links measured 2.5:1 whichever colour they were: too
            light for the dark set, too dark for the light set. Deep enough for
            the light set to win, and only across the height of the bar. */}
        <div className="absolute inset-x-0 top-0 h-[calc(var(--nav-h)+3.5rem)] bg-linear-to-b from-brand-900/80 via-brand-900/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-brand-900/25 to-transparent" />
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
      <div className="on-dark relative flex h-[100svh] min-h-[30rem] flex-col justify-center overflow-hidden pb-10 pt-[calc(var(--nav-h)+1.5rem)]">
        {/* The cream wash that used to sit here has gone with the cream band it
            was drawn for. It covered the top 58% of the fold in
            `brand-50`, which over a photograph is a milky film across the
            whole upper half — the last of the "white overlay" still visible
            after the others came off. The band takes its top edge from the
            shade under the navbar instead. */}

        {/* ---- Drawn objects ----
            Decorative, aria-hidden, and the only things on this screen still
            moving once the entrance has finished.

            THEY BELONG TO THE PHOTOGRAPH, so they are pinned to the fold rather
            than to the text column. Inside `Container` their box was only as
            tall as the paragraph and no wider than 96rem, which held the whole
            set in a band beside the words while the child — who is in a
            full-bleed picture — was somewhere else entirely: one cloud landed
            on his hair and the other three were pressed into the right margin,
            the kite hard against the edge of the screen. Out here the layer is
            the picture's own box, so they can be placed against the picture.

            WHERE THEY GO IS MEASURED, not eyeballed, because `cover` moves the
            child about. His left shoulder is the one dependable landmark: it
            lands between 63.5% and 65.7% of the screen at every desktop size
            tried, so anything ending before 62% is always clear of him. His
            right shoulder is the opposite — 86% of the screen in a 16:9 window,
            98% in a 4:3 one — which is why the objects on that side belong to
            `wide-window` and not to a width breakpoint.

            So there are two arrangements. In a squarish window the crop leaves
            no margin past the child at all and the set thins to three: the two
            clouds in the air above the headline, and the kite dropped into the
            channel between the words and his shoulder. Given a 3:2 window or
            wider there is picture on both sides of him and the full five open
            out into a ring — the kite climbs into the window light he is turned
            away from, the leaf comes down past his shoulder, and a star closes
            the circle underneath.

            SHADOWED FOR A PHOTOGRAPH, not for cream. An `h-6` cloud at 45%
            opacity over a sunlit window is a smudge, which is what the previous
            set measured as. What fixes that is the ink shadow every one of them
            now carries, NOT size: a cream cloud holds its edge over the bright
            half of the picture because it is separated from it, and drawn at
            twice this size it stopped being a decoration and started competing
            with the child for the picture. They sit a step or two above the old
            sizes and no more.

            `lg` and up. Below that the words are centred and take the full
            width, and there is no air left to put anything in. */}
        <div
          className="pointer-events-none absolute inset-0 hidden [--object-shadow:color-mix(in_oklab,var(--color-brand-900)_50%,transparent)] lg:block"
          aria-hidden="true"
        >
          {/* Ten o'clock, furthest out: the smaller cloud, drifting in over the
              empty air above the headline. */}
          <Float
            index={0}
            y={8}
            className="absolute left-[40%] top-[11%] wide-window:left-[42%] wide-window:top-[12%]"
          >
            <Cloud className="h-8 drop-shadow-[0_2px_5px_var(--object-shadow)] wide-window:h-9" />
          </Float>

          {/* Eleven o'clock: the sun-behind-cloud, in the gap between the last
              word of the headline and his hair. */}
          <Float index={1} y={11} className="absolute left-[52%] top-[19%]">
            <Cloud className="h-10 drop-shadow-[0_2px_6px_var(--object-shadow)] wide-window:h-12" />
          </Float>

          {/* The kite, and the object that moves furthest between the two
              arrangements: beside him in the channel when the crop is tight,
              up in the sky at one o'clock when there is a margin to fly it in.
              The largest of the five either way, because it is the one drawing
              here anybody actually looks at. */}
          <Float
            index={2}
            y={15}
            rotate={5}
            className="absolute left-[55%] top-[54%] wide-window:left-[92.5%] wide-window:top-[14%] wider-window:left-[90%]"
          >
            <Kite className="h-14 drop-shadow-[0_2px_7px_var(--object-shadow)] wide-window:h-20" />
          </Float>

          {/* Four o'clock, past his shoulder. Nothing sensible to do with it in
              the tight crop — the only space left there is the channel, and the
              kite is already in it — so it waits for the margin. */}
          <Float
            index={3}
            y={12}
            rotate={-6}
            className="absolute left-[93.5%] top-[56%] hidden wide-window:block wider-window:left-[91%]"
          >
            <Leaf className="h-11 drop-shadow-[0_2px_6px_var(--object-shadow)] wider-window:h-14" />
          </Float>

          {/* Eight o'clock, and the reason there are five rather than four: with
              two clouds up on the left and the kite and the leaf both down the
              right, the set read as two groups either side of him rather than
              as one ring around him. This closes it, in the quiet blurred strip
              between the standfirst and his elbow — which is only quiet from
              `xl`, since the paragraph is a fixed 32rem and reaches past this
              point on a narrower screen. Small, because anything larger there
              starts competing with the blocks he is building. */}
          <Float
            index={4}
            y={9}
            rotate={8}
            className="absolute left-[51%] top-[57%] hidden xl:wide-window:block"
          >
            <Star className="h-6 drop-shadow-[0_2px_5px_var(--object-shadow)]" />
          </Float>
        </div>

        <Container size="composition" className="relative">
          {/* The cream pool of light that used to sit here is gone. It was
              drawn for a composition with two photographs standing on it and a
              cream band behind them; over a shaded photograph it was simply a
              pale disc in the middle of the picture, which is the "white
              overlay in the centre" that kept showing up. */}

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
                  headline. They wrap at every width: the three claims are too
                  long to hold one line even at xl, and a nowrap row would
                  squeeze each pill until its own text broke instead. */}
              <ul
                data-hero-item
                className="mx-auto flex flex-wrap items-center justify-center gap-2 lg:mx-0 lg:justify-start"
              >
                {promises.map((promise) => (
                  <li
                    key={promise}
                    className="flex items-center gap-2 rounded-full bg-white/90 py-1.5 pl-1.5 pr-3.5 text-small font-semibold text-brand-700 hairline"
                  >
                    <span
                      className="grid size-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-600"
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
                className="mt-5 text-display text-white lg:text-[clamp(2.4rem,1.1rem+2.5vw,3.1rem)]"
              >
                <span className="block overflow-hidden pb-[0.08em]">
                  <span data-hero-line className="block font-normal">
                    {heroCopy.h1Lead}
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.14em]">
                  {/*
                    The rule is measured against an `inline-block` around the
                    words, so it sits under them. Measured against the block
                    line it was a share of the whole column, centred in it — and
                    from `lg`, where the words are left-aligned, that put it
                    under the back half of "Learners" and out into empty picture.

                    `[display:inline-block]`, NOT the `inline-block` class. The
                    theme defines `--spacing-block`, so Tailwind also reads
                    `inline-block` as the logical-width utility and emits
                    `inline-size: var(--spacing-block)` beside the display —
                    about 46px. The box collapsed to that and the phrase broke
                    one word per line, which is what an earlier attempt at this
                    ran into and put down to `inline-block` itself.
                  */}
                  <span data-hero-line className="block text-orange-300">
                    <span className="relative [display:inline-block]">
                      {heroCopy.h1Emphasis}
                      {/* A touch past the words at both ends, so it reads as
                          drawn under them rather than ruled to their edges.
                          `max-w-none` because the base reset caps every svg at
                          100%, which quietly undid the overshoot. */}
                      <Underline className="w-[104%] max-w-none text-orange-300/70" />
                    </span>
                  </span>
                </span>
              </h1>

              {/* The tagline and the supporting line, in the order the Home
                  specification sets them: tagline directly under the H1 and
                  smaller, then the supporting line, then the body. Three short
                  lines rather than one paragraph, so the hero reads as a
                  masthead and not as a block of copy over a photograph. */}
              <p
                data-hero-item
                className="mx-auto mt-4 max-w-xl text-label font-semibold uppercase tracking-[0.14em] text-orange-300 lg:mx-0"
              >
                {heroCopy.tagline}
              </p>

              <p
                data-hero-item
                className="mx-auto mt-4 max-w-xl font-display text-h3 font-semibold text-white lg:mx-0"
              >
                {heroCopy.supporting}
              </p>

              {/* Light on the shade, like the heading. This paragraph is the
                  band's tightest contrast either way round — body-sized where
                  the headline is large — so it takes the brightest of the
                  mist steps rather than a muted one. */}
              <p data-hero-item className="mx-auto mt-4 max-w-xl text-lead text-mist-100 lg:mx-0 lg:max-w-lg">
                {heroCopy.standfirst}
              </p>

              <div
                data-hero-item
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:items-start lg:justify-start"
              >
                <ButtonLink to={primaryCta.href} size="lg" withArrow>
                  {primaryCta.label}
                </ButtonLink>
                {/* "Discover Our Legacy", per the specification's secondary CTA.
                    It used to point at Curriculum, which the page previews four
                    sections further down anyway; the Legacy strip is the very
                    next band, so this hands a reader straight into the story
                    the hero has just opened. */}
                <ButtonLink to={routes.legacy} variant="secondary" size="lg" withArrow>
                  Discover Our Legacy
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
        <div
          data-hero-item
          className="rounded-2xl bg-mist-50 px-5 py-4 shadow-soft hairline sm:px-6 sm:py-5"
        >
        {/* ONE LINE OF LABEL EACH, AND THE ZONES ARE NOT NAMED HERE.
            The third label used to spell out all five zone names, which ran to
            five lines and set the height of the whole strip: the other two
            needed two lines and got five, so most of this panel was empty. The
            names are already on this page, in full, in the "Opening in Indore"
            band, which is where a parent looking for their neighbourhood will
            actually read them. A figure in a hero strip is a claim to be
            checked further down, not the place to do the checking. */}
        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-0">
          <li className="sm:pr-5">
            {/* The figure used to be "0" against a label that opened "100% —",
                so the tile stated two different numbers about the same fact and
                the one the eye reached first was the one that meant nothing on
                its own. The claim is about how children are assessed, not about
                a count of something absent, so the figure is the percentage and
                the label finishes the sentence. `Ban` went with the zero: a
                prohibition sign over a positive claim read as a warning. */}
            <StatTile
              value="100%"
              label="Activity-based assessment, not exams."
              icon={<Shapes className="size-5" aria-hidden="true" />}
            />
          </li>
          <li className="sm:border-l sm:border-mist-300 sm:px-5">
            <StatTile
              value={programs.length}
              label="Classes, Playgroup through to UKG."
              icon={<Layers className="size-5" aria-hidden="true" />}
            />
          </li>
          <li className="sm:border-l sm:border-mist-300 sm:pl-5">
            <StatTile
              value={zones.length}
              label="Indore zones we are opening in first."
              icon={<MapPin className="size-5" aria-hidden="true" />}
            />
          </li>
        </ul>

        {/* The functional local phrasing, once, in body copy rather than in the
            headline. "Meta title/H1 should be functional and local; brand
            tagline sits below the fold." Source: Keyword & AEO Strategy S3.

            Inside the panel rather than under it. Under it, this line sits on
            the foot of the hero photograph, and a photograph is not a surface
            a fixed text colour can be trusted on: at 1440 it landed as dark
            ink on the dark half of the frame and was unreadable. */}
        <p className="mt-3.5 border-t border-mist-300 pt-3.5 text-center text-small text-ink-400">
          {heroCopy.searchLine}
        </p>
        </div>
      </Container>

      {/* The hero closes into the positioning band. A gentle sweep, because
          that step is mist-100 to mist-50 and there is almost no contrast
          to carry a deeper curve. The spacer sits below the fold-height div, so
          the hero's one-screen budget is untouched. */}
      <SectionDivider type="gentle" to="white" />
    </section>
  )
}
