import { cn } from '@/lib/cn'

/**
 * The decorative backdrop behind a card's content.
 *
 * WHAT IT IS. A flat-vector composition of one to three pastel shapes —
 * circles, blocks, blobs, a semi-circle — arranged behind the card's image and
 * text and cropped by the card's own silhouette. It is the whole visual
 * personality of a card: the surface underneath stays quiet khadi paper with a
 * hairline and a soft shadow, and the shapes do the work.
 *
 * WHY IT IS A TABLE OF VARIANTS AND NOT A GENERATOR. The brief is that cards
 * should *look* random and *be* controlled, and those pull in opposite
 * directions unless the compositions are authored. Ten are written out below,
 * each a deliberate arrangement; a grid rotates through them, so four cards in
 * a row are four different pictures and the same card is the same picture on
 * every render, every build and every reload. Nothing here calls Math.random,
 * nothing measures the DOM, and nothing can shift after paint.
 *
 * HOW IT CANNOT DAMAGE THE PAGE. The layer is `absolute inset-0 -z-10
 * overflow-hidden rounded-[inherit]`, and each of those words is load-bearing:
 *
 *   - `overflow-hidden` is what lets a shape be positioned outside the card and
 *     still be safe. Every composition here has at least one shape hanging past
 *     an edge — that crop is the effect — and an absolutely positioned child
 *     that reaches past its parent counts toward the document's scroll width
 *     unless something clips it. The clip is why none of this can introduce
 *     horizontal scrolling.
 *   - `rounded-[inherit]` cuts the shapes to whatever silhouette the card is
 *     wearing, so a leaf-shaped card gets leaf-shaped crops rather than a
 *     rectangle of colour poking out of its corners.
 *   - `-z-10`, inside a card that `isolate`s, paints the shapes after the
 *     card's own background and before any of its content. A shape can sit
 *     under a photograph or a paragraph; it can never sit over one. That is
 *     what guarantees text stays readable and faces stay visible without any
 *     composition having to know what is in the card.
 *
 * RESPONSIVE. Every shape carries two sizes: a smaller one for phones, where a
 * 13rem circle inside a 20rem card is not a backdrop but a background, and the
 * full size from `sm` up. Positions are in rem rather than percentages so a
 * shape sits the same distance off the same corner at every width instead of
 * drifting across the card as it narrows.
 */

/**
 * The pastel set the compositions draw from.
 *
 * Seven are existing brand tokens at their 100/200 weights, which is what keeps
 * this from becoming a second palette; lilac and blush are the two hues the
 * brand has no equivalent for. See the note beside them in index.css.
 *
 * The alphas are not a style choice. They are the measured point at which body
 * text stays legible on top of the shape.
 *
 * A card's text can land anywhere over these compositions — the shapes do not
 * know how long a paragraph is — so every tint has to be safe under the
 * *lightest* text the site sets, `text-ink-400` (#6E6459), over the *darkest*
 * ordinary card ground, khadi-200. Measured at full strength against that pair,
 * seven of these eleven failed WCAG AA: sky 4.40, peach 4.52, yellow 4.34,
 * beige 4.37, mint 3.85, and the two darkest, indigo-ink-200 at 3.19 and
 * terracotta-200 at 3.48.
 *
 * The alphas below are the strongest each hue can be drawn at and still clear
 * 4.6:1. Two hues could not: indigo-ink-200 and terracotta-200 needed 15% and
 * 20%, which is not a colour any more, so they are gone and the compositions
 * that used them now reach for a lighter neighbour. It is worth saying that
 * this made the set better rather than worse — "soft, clean, low saturation" is
 * the brief, and the measured ceiling turned out to be roughly where that
 * lives.
 */
const TINT = {
  sky: 'bg-indigo-ink-100/60',
  peach: 'bg-terracotta-100/80',
  lemon: 'bg-haldi-100',
  yellow: 'bg-haldi-200/50',
  green: 'bg-neem-100',
  mint: 'bg-neem-200/30',
  lavender: 'bg-lilac-100',
  pink: 'bg-blush-100',
  beige: 'bg-khadi-300/60',
} as const

/**
 * The compositions.
 *
 * Read each array as "back shape first, then what overlaps it". The ordering
 * rule across the ten: no two consecutive variants lead with the same hue or
 * the same silhouette, because the cycle hands them out in order and two
 * neighbours in a grid get consecutive entries.
 */
const VARIANTS = {
  /** 1. A large sky circle off the top-right, mostly outside the card. */
  'sky-circle': [
    ['absolute -right-10 -top-12 size-36 rounded-full sm:-right-14 sm:-top-16 sm:size-52', 'sky'],
  ],

  /** 2. A peach block down the left, tilted off square. */
  'peach-block': [
    ['absolute -left-12 top-5 h-36 w-40 rotate-6 rounded-[2.25rem] sm:-left-16 sm:h-52 sm:w-56 sm:rounded-[3rem]', 'peach'],
  ],

  /** 3. A yellow disc with a smaller beige one riding its edge. */
  'yellow-double': [
    ['absolute -right-8 -top-10 size-32 rounded-full sm:-right-10 sm:-top-12 sm:size-44', 'yellow'],
    ['absolute right-14 top-6 size-14 rounded-full sm:right-20 sm:top-8 sm:size-20', 'beige'],
  ],

  /** 4. An organic green blob rising out of the bottom-left corner. */
  'green-blob': [
    ['absolute -bottom-12 -left-10 size-40 shape-blob sm:-bottom-14 sm:-left-12 sm:size-56', 'mint'],
  ],

  /** 5. A lavender circle settled into the bottom-right. */
  'lavender-corner': [
    ['absolute -bottom-12 -right-10 size-36 rounded-full sm:-bottom-14 sm:-right-12 sm:size-48', 'lavender'],
  ],

  /** 6. Sky and peach overlapping, a disc under a tilted block. */
  'blue-peach': [
    ['absolute -right-10 -top-10 size-32 rounded-full sm:-right-12 sm:size-44', 'sky'],
    ['absolute -right-3 top-12 size-20 -rotate-12 rounded-[1.5rem] sm:top-16 sm:size-28 sm:rounded-[2rem]', 'peach'],
  ],

  /** 7. A big asymmetric blush blob with a lemon dot opposite it. */
  'blob-duo': [
    ['absolute -bottom-14 -right-12 size-44 shape-blob-alt sm:-bottom-16 sm:size-60', 'pink'],
    ['absolute -top-5 left-6 size-12 rounded-full sm:-top-6 sm:left-8 sm:size-18', 'lemon'],
  ],

  /** 8. A soft lemon block, tilted the other way from `peach-block`. */
  'yellow-block': [
    ['absolute -right-14 top-3 h-32 w-36 -rotate-6 rounded-[2.25rem] sm:-right-16 sm:h-48 sm:w-52 sm:rounded-[3rem]', 'lemon'],
  ],

  /** 9. A green semi-circle rising from the bottom edge, centred. */
  'mint-semi': [
    ['absolute -bottom-14 left-1/2 h-28 w-52 -translate-x-1/2 rounded-t-full sm:-bottom-16 sm:h-40 sm:w-72', 'green'],
  ],

  /** 10. A beige disc cropped hard by the left edge, with a lavender dot. */
  'beige-arc': [
    ['absolute -left-16 top-1/4 size-40 rounded-full sm:-left-20 sm:size-56', 'beige'],
    ['absolute -bottom-5 right-7 size-12 rounded-full sm:size-16', 'lavender'],
  ],
} as const

export type CardBackdrop = keyof typeof VARIANTS

/**
 * The order a grid hands variants out in. Ten, so a row of four and a row of
 * six never repeat, and a page of eight cards is eight different pictures.
 */
export const cardBackdropCycle: CardBackdrop[] = [
  'sky-circle',
  'peach-block',
  'yellow-double',
  'green-blob',
  'lavender-corner',
  'blue-peach',
  'blob-duo',
  'yellow-block',
  'mint-semi',
  'beige-arc',
]

/**
 * The hover response.
 *
 * A gentle swell and a 2px rise, which is the shape's half of the card's own
 * lift — two things moving at slightly different rates is what makes a card
 * feel physical rather than animated. 420ms and an eased curve keep it a
 * response rather than a performance, and `motion-reduce` stops it entirely.
 *
 * Scale and a Y translate only. An X translate would fight the `-translate-x-1/2`
 * that centres the semi-circle in variant 9, and a shape that jumps sideways on
 * hover is worse than one that does not move at all.
 */
const shapeMotion =
  'transition-transform duration-[420ms] ease-out-soft group-hover:-translate-y-0.5 group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100'

/**
 * What the shapes become on a dark card.
 *
 * A pastel is a light colour, and a light colour on deep indigo is not a
 * backdrop — it is a bright blob sitting on top of the card, loud enough to
 * beat the heading it is supposed to sit behind. Every tint therefore collapses
 * to a wash of the card's own light ink on a dark ground, and the geometry does
 * the work instead of the hue: the same circle in the same corner, at a weight
 * that reads as a tonal shift in the surface rather than as an object on it.
 *
 * Two weights rather than one, alternating by position, so a composition built
 * out of two overlapping shapes still reads as two shapes.
 */
const DARK_WASH = ['bg-khadi-50/10', 'bg-haldi-300/14'] as const

export function CardBackground({
  variant,
  onDark = false,
  className,
}: {
  variant: CardBackdrop
  /** Swaps the pastels for tonal washes. Set by the card from its own tone. */
  onDark?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]',
        className,
      )}
      aria-hidden="true"
    >
      {VARIANTS[variant].map(([position, tint], i) => (
        <span
          key={position}
          className={cn(
            position,
            onDark ? DARK_WASH[i % DARK_WASH.length] : TINT[tint],
            shapeMotion,
          )}
        />
      ))}
    </span>
  )
}
