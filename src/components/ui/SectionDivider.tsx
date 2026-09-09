import { cn } from '@/lib/cn'

/**
 * Section dividers.
 *
 * A shaped seam between two full-width bands, so one colour hands over to the
 * next along a curve instead of a ruled line. Ten of them, so a page of eight
 * bands never repeats a shape, and each has a job:
 *
 *   ELEGANT      asymmetric, reverse, blob      one long organic curve, no
 *                                               period. For the big colour
 *                                               changes, where the eye should
 *                                               feel carried across.
 *   PLAYFUL      cloud, scallop                 rounded lobes. The loudest
 *                                               pair; one or two a page.
 *   STRUCTURED   wave, tight-wave               an even sine. The quiet
 *                                               option, and the only one that
 *                                               survives repetition.
 *   QUIET        gentle, arc                    a single shallow sweep, for a
 *                                               step between two near-identical
 *                                               creams where anything more
 *                                               would be decoration for its
 *                                               own sake.
 *   EMPHATIC     layered                        two curves, the back one held
 *                                               well down in opacity. Reserved
 *                                               for a seam that closes a
 *                                               chapter.
 *
 * HOW IT WORKS. The divider sits at the foot of the band it belongs to and is
 * painted in the colour of the band *below* it. It is not a third thing between
 * two sections; it is the next section's colour reaching up into this one,
 * which is why there is never an edge to misalign.
 *
 * WHY NOTHING LEAKS. Four things, each a real failure this avoids:
 *
 *   - `preserveAspectRatio="none"` lets one path stretch to any width. Without
 *     it the SVG keeps its 1440 ratio and either crops the curve or letterboxes
 *     it at every viewport that is not exactly 1440 wide.
 *   - Every path closes to the bottom of its own viewBox, one unit past it, and
 *     the element sits a pixel low (`-bottom-px`). Sub-pixel rounding at
 *     fractional zoom otherwise leaves a hairline of the wrong colour along the
 *     join — the classic seam.
 *   - `block` on the svg. An inline SVG sits on the text baseline and collects
 *     descender space underneath, which shows as a gap.
 *   - `pointer-events-none`, so it can never take a click meant for content.
 *
 * HEIGHT IS RESPONSIVE, THE PATH IS NOT. Each variant carries a `clamp()`
 * rather than a separate mobile path: the curve is described once and the
 * viewport decides how deep it is drawn, so a 6.5rem sweep on a desktop is
 * 2.25rem on a phone and never eats the screen. Heights also vary *between*
 * variants — the quiet ones are genuinely shallower — because a page where
 * every seam is the same depth reads as a template however different the
 * shapes are.
 *
 * Decorative: `aria-hidden`, no text, nothing focusable.
 */

/** The tones a band can be, matching `Section`'s own vocabulary. */
export type DividerTone = 'khadi' | 'white' | 'indigo' | 'terracotta' | 'neem' | 'haldi'

/**
 * Each tone's flat background as a CSS colour, mirroring `toneClasses` in
 * layout.tsx. Values rather than classes because the colour has to reach a
 * `fill`, and a Tailwind background utility cannot get inside an SVG.
 */
const TONE_FILL: Record<DividerTone, string> = {
  khadi: 'var(--color-khadi-100)',
  white: 'var(--color-khadi-50)',
  indigo: 'var(--color-indigo-ink-700)',
  terracotta: 'var(--color-terracotta-50)',
  neem: 'var(--color-neem-100)',
  haldi: 'var(--color-haldi-100)',
}

export type DividerType =
  | 'asymmetric'
  | 'reverse'
  | 'blob'
  | 'cloud'
  | 'scallop'
  | 'wave'
  | 'tight-wave'
  | 'gentle'
  | 'arc'
  | 'layered'

type Shape = { box: number; h: string; paths: { d: string; opacity?: number }[] }

/**
 * WHY EVERY viewBox IS AS TALL AS THE SHAPE RENDERS.
 *
 * `preserveAspectRatio="none"` is what lets one path span any width, and the
 * price is that it scales x and y independently. The first version of this file
 * authored every curve in a 1440x120-ish box and let it land in a 1440x79 strip,
 * which squashed everything to about 60% of its drawn height — measured at 0.51
 * to 0.72 across the ten. On a Bezier that reads as a slightly lazier curve. On
 * the scalloped ones it was fatal: a circle drawn round came out as a flat-topped
 * hump, and the cloud edge looked like a row of bread loaves.
 *
 * So each `box` below is set to the height the divider actually renders at the
 * 1440 reference width, which makes the vertical scale exactly 1 there and the
 * shapes come out as drawn. Away from 1440 the two axes drift apart again — that
 * is unavoidable with `none` — but the drift is now centred on the design width
 * instead of starting 40% wrong.
 *
 * The scalloped pair are generated rather than hand-typed: their lobes are true
 * semicircles (ry = rx), which forces the lobe count, because a semicircle can
 * only be as tall as the box and the widths have to sum to exactly 1440. Fourteen
 * lobes for the cloud and eighteen for the scallop are the counts that fall out.
 */
const SINE = 'c 30 -14 90 -14 120 0 c 30 14 90 14 120 0 '.repeat(6)
const SINE_TIGHT = 'c 20 -9 60 -9 80 0 c 20 9 60 9 80 0 '.repeat(9)

const SHAPE: Record<DividerType, Shape> = {
  /**
   * One continuous curve: rises from the left, falls through the middle, lifts
   * again before the right edge. Three Bezier segments, no two the same length,
   * which keeps it from reading as a wave with a period.
   */
  asymmetric: {
    box: 79,
    h: 'h-[clamp(2.25rem,5.5vw,6.5rem)]',
    paths: [{ d: 'M0 36 C 190 4 430 1 668 29 C 906 57 1156 78 1440 41 L1440 80 L0 80 Z' }],
  },

  /** The same idea run the other way, so two big seams on one page differ. */
  reverse: {
    box: 79,
    h: 'h-[clamp(2.25rem,5.5vw,6.5rem)]',
    paths: [{ d: 'M0 41 C 284 78 534 57 772 29 C 1010 1 1250 4 1440 36 L1440 80 L0 80 Z' }],
  },

  /**
   * Three uneven segments that rise and fall twice. More restless than
   * `asymmetric` and deliberately so — it is the one that reads as hand-drawn.
   */
  blob: {
    box: 72,
    h: 'h-[clamp(2rem,5vw,5.75rem)]',
    paths: [
      { d: 'M0 38 C 150 14 302 63 470 48 C 638 34 762 3 940 20 C 1118 37 1262 68 1440 43 L1440 73 L0 73 Z' },
    ],
  },

  /**
   * Sixteen lobes alternating large and small, all true semicircles on one
   * baseline, summing to exactly 1440.
   *
   * Two earlier versions of this were rows of same-sized domes, and a row of
   * same-sized domes is trim, not cloud — the eye reads the repeat before it
   * reads the shape. What makes a cloud edge is the *size* difference: big
   * puffs with small ones tucked into the valleys between them, so the
   * silhouette rises and falls twice over at different scales. Radii here run
   * 59 to 67 for the large lobes and 23 to 30 for the small.
   */
  cloud: {
    box: 70,
    h: 'h-[clamp(1.75rem,4.85vw,5.25rem)]',
    paths: [
      {
        d:
          'M0 71 L0 70 ' +
          'a64.5 64.5 0 0 1 129 0 a29.5 29.5 0 0 1 59 0 a60.5 60.5 0 0 1 121 0 ' +
          'a26.5 26.5 0 0 1 53 0 a67.5 67.5 0 0 1 135 0 a23.5 23.5 0 0 1 47 0 ' +
          'a61.5 61.5 0 0 1 123 0 a30.5 30.5 0 0 1 61 0 a65.5 65.5 0 0 1 131 0 ' +
          'a25.5 25.5 0 0 1 51 0 a59 59 0 0 1 118 0 a28.5 28.5 0 0 1 57 0 ' +
          'a63.5 63.5 0 0 1 127 0 a24.5 24.5 0 0 1 49 0 a62.5 62.5 0 0 1 125 0 ' +
          'a27 27 0 0 1 54 0' +
          ' L1440 71 Z',
      },
    ],
  },

  /** Eighteen smaller lobes: the cloud's quieter relation. */
  scallop: {
    box: 43,
    h: 'h-[clamp(1.25rem,3vw,3.25rem)]',
    paths: [
      {
        d:
          'M0 44 L0 43 ' +
          'a40 40 0 0 1 80 0 a41 41 0 0 1 82 0 a42 41 0 0 1 84 0 a37 37 0 0 1 74 0 ' +
          'a40 40 0 0 1 80 0 a38.5 39 0 0 1 77 0 a43.5 41 0 0 1 87 0 a39.5 40 0 0 1 79 0 ' +
          'a39 39 0 0 1 78 0 a38.5 39 0 0 1 77 0 a40 40 0 0 1 80 0 a43.5 41 0 0 1 87 0 ' +
          'a38.5 39 0 0 1 77 0 a40 40 0 0 1 80 0 a36.5 37 0 0 1 73 0 a42.5 41 0 0 1 85 0 ' +
          'a40.5 41 0 0 1 81 0 a39.5 40 0 0 1 79 0' +
          ' L1440 44 Z',
      },
    ],
  },

  /** An even sine. Seamless by construction: one stretched path, no tiling. */
  wave: {
    box: 40,
    h: 'h-[clamp(1rem,2.75vw,3rem)]',
    paths: [{ d: `M0 20 ${SINE}L1440 41 L0 41 Z` }],
  },

  /** The same, at two-thirds the wavelength, for a more insistent rhythm. */
  'tight-wave': {
    box: 32,
    h: 'h-[clamp(0.85rem,2.25vw,2.5rem)]',
    paths: [{ d: `M0 16 ${SINE_TIGHT}L1440 33 L0 33 Z` }],
  },

  /**
   * One shallow sweep across the whole width. The quietest thing here, for a
   * step between two near-identical creams.
   */
  gentle: {
    box: 36,
    h: 'h-[clamp(1rem,2.5vw,2.75rem)]',
    paths: [{ d: 'M0 21 C 480 6 960 6 1440 21 L1440 37 L0 37 Z' }],
  },

  /** A single wide dome: the next section rising to meet the one above. */
  arc: {
    box: 86,
    h: 'h-[clamp(2.5rem,6vw,7.5rem)]',
    paths: [{ d: 'M0 87 L0 61 C 380 5 1060 5 1440 61 L1440 87 Z' }],
  },

  /**
   * Two curves, the back one at 35%. The only variant with depth, so it marks
   * the end of a chapter. The back layer takes the same fill: a second hue here
   * would put a third colour into a two-colour join and read as a mistake.
   */
  layered: {
    box: 86,
    h: 'h-[clamp(2.5rem,6vw,7rem)]',
    paths: [
      { d: 'M0 30 C 300 4 640 61 1000 37 C 1180 25 1320 13 1440 26 L1440 87 L0 87 Z', opacity: 0.35 },
      { d: 'M0 52 C 260 29 620 78 980 56 C 1180 44 1330 37 1440 50 L1440 87 L0 87 Z' },
    ],
  },
}

/**
 * The rendered height of each variant, for a band that has to reserve the space
 * itself rather than take the spacer. See the `flush` prop.
 */
export const DIVIDER_HEIGHT: Record<DividerType, string> = {
  asymmetric: 'clamp(2.25rem,5.5vw,6.5rem)',
  reverse: 'clamp(2.25rem,5.5vw,6.5rem)',
  blob: 'clamp(2rem,5vw,5.75rem)',
  cloud: 'clamp(1.75rem,4.85vw,5.25rem)',
  scallop: 'clamp(1.25rem,3vw,3.25rem)',
  wave: 'clamp(1rem,2.75vw,3rem)',
  'tight-wave': 'clamp(0.85rem,2.25vw,2.5rem)',
  gentle: 'clamp(1rem,2.5vw,2.75rem)',
  arc: 'clamp(2.5rem,6vw,7.5rem)',
  layered: 'clamp(2.5rem,6vw,7rem)',
}

export function SectionDivider({
  type = 'wave',
  to,
  fill,
  flush = false,
  position = 'bottom',
  className,
}: {
  type?: DividerType
  /** The tone of the band below. The divider is painted in it. */
  to?: DividerTone
  /**
   * Drops the flow spacer, leaving only the curve.
   *
   * For a band whose height is not its content's to give — the pinned
   * horizontal-scroll day on the Curriculum page sets an explicit
   * `calc(100dvh + Npx)` for its scroll distance, and a spacer inside that
   * neither grows the band nor buys any clearance; it only eats into the
   * track. Such a band has to have room at its foot already.
   */
  flush?: boolean
  /**
   * Which edge the curve hangs from.
   *
   * `bottom` is the normal case: the band below reaches up into this one.
   * `top` inverts it, so the band *above* reaches down into this one. That
   * exists for a seam where the lower band has no flat colour to lend — the
   * homepage's field band opens straight onto a full-bleed photograph, so a
   * bottom divider on the indigo above had to be painted cream, and the cream
   * had nothing to belong to: it read as a white stripe laid over the picture.
   * Hung from the top and filled with the indigo instead, the same curve reads
   * as the band above breaking over the photograph.
   */
  position?: 'bottom' | 'top'
  /** Any CSS colour, for a band whose ground is not one of the tones. */
  fill?: string
  className?: string
}) {
  const shape = SHAPE[type]

  return (
    <>
      {/* A spacer of exactly the divider's height, in normal flow.
          The curve itself is absolutely positioned, so without this it would
          paint over whatever sits in the band's bottom padding — and the taller
          variants are 7rem, more than a section's whole padding step. Reserving
          the space means the divider is part of the layout instead of something
          laid on top of it, and no content can ever end up underneath a curve. */}
      {flush ? null : <div aria-hidden="true" className={shape.h} />}
      <div
        aria-hidden="true"
        className={cn(
          // `z-10`: a band's own content is often wrapped in a `relative`
          // div that comes later in the DOM, and a positioned sibling paints
          // over an absolute one at the same level. Without this the curve
          // disappears behind a full-bleed photograph.
          'pointer-events-none absolute left-0 z-10 w-full',
          position === 'top' ? '-top-px -scale-y-100' : '-bottom-px',
          className,
        )}
        style={{ ['--divider-fill' as string]: fill ?? (to ? TONE_FILL[to] : TONE_FILL.khadi) }}
      >
        <svg
          viewBox={`0 0 1440 ${shape.box}`}
          preserveAspectRatio="none"
          className={cn('block w-full', shape.h)}
          aria-hidden="true"
          focusable="false"
        >
        {shape.paths.map((p) => (
          <path key={p.d} d={p.d} fill="var(--divider-fill)" opacity={p.opacity} />
        ))}
        </svg>
      </div>
    </>
  )
}
