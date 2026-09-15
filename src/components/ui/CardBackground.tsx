import { cn } from '@/lib/cn'

/**
 * The decorative backdrop behind a card's content.
 *
 * WHAT IT IS. A flat-vector composition of one to three pastel shapes —
 * circles, blocks, blobs, a semi-circle — arranged behind the card's image and
 * text and cropped by the card's own silhouette. It is the whole visual
 * personality of a card: the surface underneath stays quiet white with a
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
 * Every one is a brand token at its 50, 100 or 200 weight, which is what keeps
 * this from becoming a second palette.
 *
 * The alphas are not a style choice. They are the measured point at which body
 * text stays legible on top of the shape.
 *
 * A card's text can land anywhere over these compositions — the shapes do not
 * know how long a paragraph is — so every tint has to be safe under the
 * *lightest* text the site sets, `text-ink-400`, over the deepest ordinary card
 * ground. The strongest of them, the full `sky-100`, is one of the pairs
 * `scripts/build-palette.mjs` proves at 4.6:1; every other tint is lighter than
 * it, or drawn translucent over white, and so clears the same floor.
 *
 * The set is the logo's palette at its palest: the two blues carry most of it,
 * green and orange add warmth and growth, and coral appears once, faintly. A
 * backdrop is felt rather than seen, so none of these ever reaches a 200 at
 * full strength.
 *
 * The variant names below (`peach-block`, `lavender-corner`, `beige-arc`) are
 * handles that pages pass in, and describe the shape more than the hue; the
 * hue each one takes is set here.
 */
const TINT = {
  /** The logo's light blue, the "Z" of KidZ. The strongest tint in the set. */
  sky: 'bg-sky-100',
  skySoft: 'bg-sky-50',
  brand: 'bg-brand-50',
  coral: 'bg-coral-100/60',
  orange: 'bg-orange-100/70',
  orangeSoft: 'bg-orange-200/40',
  green: 'bg-green-100',
  greenSoft: 'bg-green-200/30',
  mist: 'bg-mist-300/60',
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
    ['absolute -left-12 top-5 h-36 w-40 rotate-6 rounded-[2.25rem] sm:-left-16 sm:h-52 sm:w-56 sm:rounded-[3rem]', 'coral'],
  ],

  /** 3. A yellow disc with a smaller beige one riding its edge. */
  'yellow-double': [
    ['absolute -right-8 -top-10 size-32 rounded-full sm:-right-10 sm:-top-12 sm:size-44', 'orangeSoft'],
    ['absolute right-14 top-6 size-14 rounded-full sm:right-20 sm:top-8 sm:size-20', 'mist'],
  ],

  /** 4. An organic green blob rising out of the bottom-left corner. */
  'green-blob': [
    ['absolute -bottom-12 -left-10 size-40 shape-blob sm:-bottom-14 sm:-left-12 sm:size-56', 'greenSoft'],
  ],

  /** 5. A lavender circle settled into the bottom-right. */
  'lavender-corner': [
    ['absolute -bottom-12 -right-10 size-36 rounded-full sm:-bottom-14 sm:-right-12 sm:size-48', 'brand'],
  ],

  /** 6. Sky and peach overlapping, a disc under a tilted block. */
  'blue-peach': [
    ['absolute -right-10 -top-10 size-32 rounded-full sm:-right-12 sm:size-44', 'sky'],
    ['absolute -right-3 top-12 size-20 -rotate-12 rounded-[1.5rem] sm:top-16 sm:size-28 sm:rounded-[2rem]', 'coral'],
  ],

  /** 7. A big asymmetric blush blob with a lemon dot opposite it. */
  'blob-duo': [
    ['absolute -bottom-14 -right-12 size-44 shape-blob-alt sm:-bottom-16 sm:size-60', 'skySoft'],
    ['absolute -top-5 left-6 size-12 rounded-full sm:-top-6 sm:left-8 sm:size-18', 'orange'],
  ],

  /** 8. A soft lemon block, tilted the other way from `peach-block`. */
  'yellow-block': [
    ['absolute -right-14 top-3 h-32 w-36 -rotate-6 rounded-[2.25rem] sm:-right-16 sm:h-48 sm:w-52 sm:rounded-[3rem]', 'orange'],
  ],

  /** 9. A green semi-circle rising from the bottom edge, centred. */
  'mint-semi': [
    ['absolute -bottom-14 left-1/2 h-28 w-52 -translate-x-1/2 rounded-t-full sm:-bottom-16 sm:h-40 sm:w-72', 'green'],
  ],

  /** 10. A beige disc cropped hard by the left edge, with a lavender dot. */
  'beige-arc': [
    ['absolute -left-16 top-1/4 size-40 rounded-full sm:-left-20 sm:size-56', 'mist'],
    ['absolute -bottom-5 right-7 size-12 rounded-full sm:size-16', 'brand'],
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
const DARK_WASH = ['bg-white/10', 'bg-sky-300/14'] as const

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
