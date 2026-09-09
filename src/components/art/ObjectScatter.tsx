import { Float } from '@/animations/Scroll'
import type { FloatEnter, FloatPattern } from '@/animations/gsap'
import { cn } from '@/lib/cn'
import {
  Abacus,
  AlphabetBlock,
  Apple,
  Balloon,
  Ball,
  Book,
  BuildingBlocks,
  Butterfly,
  Calculator,
  Cloud,
  Crayon,
  Drum,
  Flower,
  Kite,
  Leaf,
  MusicNote,
  PaintPalette,
  PaperBoat,
  PaperPlane,
  Pencil,
  PencilCup,
  Rainbow,
  SetSquare,
  Star,
  Sun,
} from './objects'

/**
 * The drawn-object layer that every band, header, footer and card carries.
 *
 * The illustration language existed before this component but only ran on four
 * files — the hero, the homepage sections, Curriculum and the CTA band. Every
 * other page had none, so a reader moving from Home to Fees watched the site's
 * character drain away. This puts the same objects behind every section, and
 * `ObjectBadge` puts one over the top edge of a card.
 *
 * WHERE THEY SIT. In a band's own vertical padding, inset well away from the
 * corners. Three constraints pin this down:
 *
 *   - Not the content column. Gutters beside the container only exist above
 *     about 1440px, so anything placed there vanishes on a laptop, and anything
 *     over the column eventually collides with a card. The padding above and
 *     below the content is the one place that is reliably empty at every width,
 *     which is why all four band slots live there.
 *   - Not the corners. This dates from when bands curved into each other and
 *     an object at 4% of the width sat inside that curve, where the next band's
 *     colour cut a slice out of it. The curves are gone; the inset stays,
 *     because an object hard against the edge of a full-bleed band reads as
 *     something that failed to load rather than as decoration.
 *   - Not in lockstep. Four objects at one height across a band reads as a
 *     border. Two ride the top padding and two the bottom, so the set frames
 *     the content instead of capping it.
 *
 * WHY THEY CANNOT COVER TEXT. The layer is `-z-10` inside a section that
 * `isolate`s. A negative z-index child paints after its parent's background and
 * before any of its content, so an object can drift under a paragraph but never
 * over one. The `isolate` matters: without a stacking context on the section,
 * `-z-10` escapes upward and the objects disappear behind the page ground.
 * `inline` is the escape hatch for a band with no `isolate` of its own — it
 * drops the negative z-index and relies on DOM order instead, which works
 * because the layer is rendered before the content and the content is
 * `relative`.
 *
 * WHY IT CANNOT PUSH THE PAGE SIDEWAYS. The layer is `overflow-hidden`. An
 * absolutely positioned child that reaches past its parent still counts toward
 * the document's scroll width unless something clips it — that is exactly how a
 * blurred photo halo once added 3px of horizontal scroll at 768px. Clipping
 * here means a decoration can never do it again.
 *
 * Decorative throughout: the objects are `aria-hidden`, and the whole layer is
 * `pointer-events-none`, so nothing here is reachable, readable or clickable.
 */

/**
 * `h` is the height in a band, `badge` the height over a card edge. Two numbers
 * rather than one scale factor because these are drawings, not icons: a cloud
 * is wide and a pencil is tall, so the height that reads as "small" is a
 * different number for each of them.
 */
const CATALOGUE = [
  /*  0 */ { Art: Pencil, h: 'h-12', badge: 'h-10' },
  /*  1 */ { Art: Book, h: 'h-10', badge: 'h-8' },
  /*  2 */ { Art: AlphabetBlock, h: 'h-10', badge: 'h-8' },
  /*  3 */ { Art: Crayon, h: 'h-12', badge: 'h-10' },
  /*  4 */ { Art: Abacus, h: 'h-10', badge: 'h-8' },
  /*  5 */ { Art: Kite, h: 'h-14', badge: 'h-11' },
  /*  6 */ { Art: PaperPlane, h: 'h-9', badge: 'h-7' },
  /*  7 */ { Art: Ball, h: 'h-10', badge: 'h-8' },
  /*  8 */ { Art: Balloon, h: 'h-12', badge: 'h-10' },
  /*  9 */ { Art: Drum, h: 'h-10', badge: 'h-8' },
  /* 10 */ { Art: Leaf, h: 'h-11', badge: 'h-9' },
  /* 11 */ { Art: Flower, h: 'h-12', badge: 'h-10' },
  /* 12 */ { Art: Butterfly, h: 'h-10', badge: 'h-8' },
  /* 13 */ { Art: Cloud, h: 'h-9', badge: 'h-7' },
  /* 14 */ { Art: Sun, h: 'h-10', badge: 'h-8' },
  /* 15 */ { Art: Rainbow, h: 'h-9', badge: 'h-7' },
  /* 16 */ { Art: Apple, h: 'h-11', badge: 'h-9' },
  /* 17 */ { Art: PencilCup, h: 'h-12', badge: 'h-9' },
  /* 18 */ { Art: SetSquare, h: 'h-10', badge: 'h-7' },
  /* 19 */ { Art: Calculator, h: 'h-12', badge: 'h-9' },
  /* 20 */ { Art: PaintPalette, h: 'h-11', badge: 'h-8' },
  /* 21 */ { Art: BuildingBlocks, h: 'h-10', badge: 'h-8' },
  /* 22 */ { Art: Star, h: 'h-10', badge: 'h-8' },
  /* 23 */ { Art: MusicNote, h: 'h-11', badge: 'h-9' },
  /* 24 */ { Art: PaperBoat, h: 'h-10', badge: 'h-8' },
] as const

/**
 * The order the catalogue is handed out in.
 *
 * Hand-ordered rather than sorted or shuffled at runtime, under two rules.
 *
 * No two neighbours come from the same shelf. A kite is followed by a leaf and
 * then a pencil, never by a balloon and a ball — two picks in a row from the
 * same family read as a repeat even when they are different drawings, which is
 * the failure this whole mechanism exists to prevent.
 *
 * And the homepage hero's four come last. The hero composes Kite, Leaf, Pencil
 * and Cloud by hand, because it wants those four specifically — a kite in the
 * sky, a pencil by the photograph — so they are the one part of the site
 * outside the deck's no-repeat guarantee. They opened the deck in the first
 * draft, which meant the first band under the hero was dealt a kite and a leaf
 * while the hero's were still on screen. Dealt twenty-one drawings later they
 * are most of a page away.
 */
const DECK = [
  15, 20, 8, 1, 22, 17, 11, 6, 24, 2, 14, 19, 7, 12, 3, 21, 16, 9, 18, 23, 4, 5, 10, 0, 13,
]

/**
 * Which drawing each slot on the page gets.
 *
 * WHY THIS IS NOT A HASH. It was: a seed string hashed to an index, which is
 * pure and stable and gives no guarantee at all that two slots near each other
 * come out different. With a dozen drawings the birthday maths makes a
 * collision on screen close to certain, and a page that shows the same ball
 * twice looks like a bug rather than a texture.
 *
 * So slots are served from a deck instead. The first slot to ask gets the first
 * card, the second the second, and nothing repeats until all twenty-five have
 * been dealt. Requests are memoised by key, which is what keeps it stable:
 * asking twice for the same slot — a re-render, StrictMode's double invoke, a
 * route left and returned to — always returns the same drawing, and only a slot
 * the page has never rendered before advances the cursor.
 *
 * The order therefore depends on render order rather than on the seed. That is
 * the trade: the assignment is no longer predictable from the seed alone, and
 * in exchange no reader ever sees the same drawing twice on one screen.
 */
const dealt = new Map<string, number>()
let cursor = 0

function pick(key: string) {
  let index = dealt.get(key)
  if (index === undefined) {
    index = DECK[cursor % DECK.length]
    cursor += 1
    dealt.set(key, index)
  }
  return CATALOGUE[index]
}

type Slot = {
  /** Position, plus the breakpoint below which the slot is not drawn at all. */
  pos: string
  y: number
  rotate: number
  /**
   * Idle motion. Unset means the plain vertical bob every slot used to have.
   *
   * Assigned per slot rather than per band, and deliberately never twice in a
   * row within a table: two neighbours on the same pattern is the one thing
   * that makes a decorative layer look automated.
   */
  pattern?: FloatPattern
  /** Which direction it arrives from the first time its band is reached. */
  enter?: FloatEnter
  /**
   * Scroll-linked travel, in px. Only a couple of slots per table carry it:
   * depth comes from *some* things moving at a different rate to the page, and
   * if everything does, nothing reads as nearer or further away.
   */
  parallax?: number
}

/**
 * Band slots: two in the top padding, two in the bottom.
 *
 * The inner pair is `xl:` only. Below that the band is narrow enough that four
 * objects crowd each other, and the outer pair on its own is the composition
 * the site already shipped with.
 */
const BAND_SLOTS: Slot[] = [
  // Phones had none at all. Every slot in this table began at `sm`, so the
  // whole illustration layer switched off below 640px and the site lost its
  // character on the screen most readers meet it on.
  //
  // Both of these are hard against the edge of the band. `left-[6%] top-2` and
  // `right-[7%] bottom-2` were the first attempt and both landed on the
  // homepage: 39x16px across "Why LBS KidZ" and 44x8px across "Learning
  // philosophy". At 390px the content column runs to within about 5% of the
  // frame, so the only reliably empty strip is the outermost one, and the
  // drawings have to be small enough to sit in it — hence the badge height
  // below rather than the band height.
  { pos: 'left-1 top-1 sm:hidden', y: 3, rotate: -5, pattern: 'sway', enter: 'left' },
  { pos: 'right-1 bottom-1 sm:hidden', y: 3, rotate: 5, pattern: 'float', enter: 'right' },

  { pos: 'left-[11%] top-1 hidden sm:block', y: 5, rotate: -4, pattern: 'orbit', enter: 'left', parallax: 26 },
  { pos: 'right-[13%] top-3 hidden sm:block', y: 6, rotate: 5, pattern: 'drift', enter: 'right' },
  // xl and not lg: 1024 is where a band is at its tightest — wide enough that
  // the two-column layouts have already unstacked and filled the width, but not
  // wide enough to have gained any padding back. The bottom pair overlapped the
  // last paragraph of two FAQ sections by 16-19px there and cleared everything
  // from 1280 up.
  { pos: 'left-[15%] bottom-3 hidden xl:block', y: 7, rotate: 6, pattern: 'pulse', enter: 'up' },
  { pos: 'right-[17%] bottom-4 hidden xl:block', y: 5, rotate: -6, pattern: 'rotate', enter: 'up', parallax: 18 },

  // The true gutters, and only where they are genuinely empty. The header's
  // note records that at 1440 an object at 4% lands on the eyebrow; these sit
  // further out again and only from 1536px, where the 84rem container finally
  // leaves a strip wide enough to stand something in.
  { pos: 'left-[1.5%] top-[42%] hidden 2xl:block', y: 5, rotate: -4, pattern: 'sway', enter: 'left', parallax: 34 },
  { pos: 'right-[1.5%] top-[58%] hidden 2xl:block', y: 4, rotate: 5, pattern: 'drift', enter: 'right' },
]

/*
 * The offsets above are small on purpose, and were not always. They started at
 * `top-4`/`bottom-8`, which was comfortable while the padding was the only
 * thing in it. Two changes since have eaten that room from both ends: the
 * dividers took the bottom of every band (the layer's `floor` now stops short
 * of the curve, so a bottom slot's offset is measured from the top of it, not
 * from the foot of the section), and the two 70-80vh redesigns took the top.
 * Measured across 29 routes, `bottom-6` put a drawing 7-21px into a paragraph
 * on the curriculum FAQs and `top-4` grazed the "Why LBS KidZ" heading. Each
 * slot now sits within a few pixels of the edge of the band, which is the one
 * part of the padding that no layout change reaches into.
 *
 * Not fewer than three, though. The objects bob by `y` pixels, and the layer
 * clips, so a bottom slot closer to the floor than its own amplitude has a
 * sliver shaved off it at the bottom of every cycle.
 */

/**
 * Page-header slots.
 *
 * This band is the hardest of the three to place in, for two reasons.
 *
 * It has no spare room. The header is height-budgeted (`--page-header-h`) and
 * its content is vertically centred, so on a page with a breadcrumb, an
 * eyebrow, a two-line title and a standfirst there is no empty strip above or
 * below the text at all. `-z-10` keeps the words readable regardless, so the
 * objects are treated as texture here rather than as things standing in space —
 * see ON_DARK_OPACITY, which takes them down to roughly the weight of the
 * circles and the wheat stalk already drawn in this band.
 *
 * And its right-hand half belongs to the photograph from `lg` up. Anything
 * placed there simply disappears behind it, so the two desktop slots stay in
 * the left half and the right-hand slot is capped at `lg`, where the photo
 * starts.
 *
 * Vertical offsets are measured from `--nav-h` rather than from the top of the
 * header, because the navbar floats over this band and an object at a flat
 * `top-4` sits behind the menu.
 */
const HEADER_SLOTS: Slot[] = [
  { pos: 'left-1 bottom-6 sm:hidden', y: 3, rotate: -5, pattern: 'sway', enter: 'up' },
  { pos: 'right-[7%] top-[calc(var(--nav-h)+1.25rem)] hidden sm:block lg:hidden', y: 6, rotate: 5, pattern: 'drift', enter: 'right' },
  // The corridor between the text column and the photograph. Measured across
  // four widths and three pages, the glyphs stop at 42.9-46.4% of the header
  // and the photo starts at 54-56%, so this ~7% strip is clear at every size
  // from lg up — and it is the only strip that is. The slot this replaced sat
  // at `left-[30%] bottom-7`, in the middle of the column, and landed on the
  // title or the standfirst on twenty of the site's pages.
  { pos: 'left-[47.5%] bottom-[15%] hidden lg:block', y: 7, rotate: 4, pattern: 'orbit', enter: 'down' },
  // The one true gutter slot. 2xl and not xl: at 1440 the 84rem container
  // leaves 48px a side, and an object at 4% lands squarely on the eyebrow.
  { pos: 'left-[2.5%] top-[38%] hidden 2xl:block', y: 5, rotate: -5, pattern: 'pulse', enter: 'left', parallax: 30 },
]

/**
 * Footer and CTA slots: the top padding only.
 *
 * These two bands close the page and both already carry a wheat stalk in a
 * bottom corner. A second drawing down there competes with it, so the objects
 * stay at the head of the band where there is nothing else.
 */
const CAP_SLOTS: Slot[] = [
  // The left of both these bands is spoken for at every width — the footer's
  // wordmark and the CTA's heading — but only below lg is the band narrow
  // enough for `left-[7%]` to reach them, which it did on the CTA heading by
  // 38x17px. So the tablet slot is on the right, where the footer's columns
  // have stacked away and the CTA's photograph has not yet appeared.
  { pos: 'right-1 top-3 sm:hidden', y: 3, rotate: -5, pattern: 'float', enter: 'down' },
  { pos: 'right-[9%] top-6 hidden sm:block lg:hidden', y: 6, rotate: -5, pattern: 'drift', enter: 'right' },
  { pos: 'left-[7%] top-6 hidden lg:block', y: 6, rotate: -5, pattern: 'orbit', enter: 'left', parallax: 22 },
  // xl, for the same reason the band's bottom pair is: at 1024 the footer's
  // four columns have unstacked and cover the width in 4% gaps.
  { pos: 'right-[30%] top-9 hidden xl:block', y: 5, rotate: 6, pattern: 'rotate', enter: 'down' },
]

/**
 * Slots for a band whose content is vertically centred in a full-screen height.
 *
 * Two sections work this way — the positioning pillars and the programs cluster
 * — and both shipped with no drawings at all, because the `band` slots put an
 * object at `top-4` and centred content rides up into the top padding to meet
 * it. Measured at 1440 the top padding is 70-79px and a kite is 56px tall from
 * `top-4`, so it grazes the eyebrow; at 1280 it lands on it.
 *
 * The foot of the band has no such problem: 163-218px at every width from 1024
 * up, because these sections reserve room for a divider there. Net of the curve
 * that is still 64-116px of genuinely empty strip, so all four slots live in it
 * and none of them can be pushed into the text by a change in viewport height.
 */
const CENTRED_SLOTS: Slot[] = [
  { pos: 'left-1 bottom-1 sm:hidden', y: 3, rotate: -5, pattern: 'sway', enter: 'left' },
  { pos: 'left-[9%] bottom-1 hidden sm:block', y: 4, rotate: -5, pattern: 'drift', enter: 'left', parallax: 20 },
  { pos: 'right-[11%] bottom-2 hidden sm:block', y: 3, rotate: 6, pattern: 'pulse', enter: 'right' },
  // 2xl and not xl: the strip is at its narrowest at exactly 1280, where the
  // band has shrunk but the cards have not, and the inner pair does not fit.
  { pos: 'left-[29%] bottom-1 hidden 2xl:block', y: 3, rotate: 4, pattern: 'orbit', enter: 'up' },
  { pos: 'right-[33%] bottom-1 hidden 2xl:block', y: 3, rotate: -4, pattern: 'rotate', enter: 'up' },
]

/**
 * Page-header slots for a header with no photograph.
 *
 * Same three positions, except the middle one. `header`'s corridor slot is
 * pinned to the gap between the text column and the picture, and on a header
 * with no picture the text is not capped at 46% — it runs to the full width of
 * `max-w-2xl`, which is 52% at 1024 — so the corridor slot lands on the title.
 * With nothing on the right to avoid, the slot simply moves out into it.
 *
 * Three slots either way, so a header consumes the same number of cards from
 * the deck whichever it uses and the drawings downstream do not shift.
 */
const HEADER_OPEN_SLOTS: Slot[] = [
  { pos: 'left-1 bottom-6 sm:hidden', y: 3, rotate: -5, pattern: 'sway', enter: 'up' },
  { pos: 'right-[7%] top-[calc(var(--nav-h)+1.25rem)] hidden sm:block lg:hidden', y: 6, rotate: 5, pattern: 'drift', enter: 'right' },
  { pos: 'left-[68%] bottom-[22%] hidden lg:block', y: 7, rotate: 4, pattern: 'orbit', enter: 'down' },
  { pos: 'left-[2.5%] top-[38%] hidden 2xl:block', y: 5, rotate: -5, pattern: 'pulse', enter: 'left', parallax: 30 },
]

const SLOTS = {
  band: BAND_SLOTS,
  header: HEADER_SLOTS,
  headerOpen: HEADER_OPEN_SLOTS,
  cap: CAP_SLOTS,
  centred: CENTRED_SLOTS,
}

/**
 * How far each variant pulls back on a dark ground.
 *
 * A flat-filled drawing in khadi and haldi is a bright object against deep
 * blue, so every dark band needs some restraint — but not the same amount. A
 * dark *section* is a band like any other and its objects stand in open
 * padding, so 70% keeps them reading as objects. A page header is already
 * carrying faint circles and a wheat stalk at 6-7%, and its objects have to
 * share space with the title rather than sit beside it; at 70% they compete
 * with the eyebrow instead of backing it, so they drop to texture weight.
 */
const ON_DARK_OPACITY: Record<keyof typeof SLOTS, string> = {
  band: 'opacity-70',
  header: 'opacity-25',
  headerOpen: 'opacity-25',
  cap: 'opacity-60',
  centred: 'opacity-70',
}

export function ObjectScatter({
  seed = '',
  onDark = false,
  variant = 'band',
  inline = false,
  floor,
}: {
  seed?: string
  onDark?: boolean
  /** Which set of positions to use. See the slot tables above. */
  variant?: keyof typeof SLOTS
  /**
   * Drops the `-z-10`, for a band that does not `isolate`. Without a stacking
   * context the negative index escapes the band and the objects vanish behind
   * the page ground; DOM order puts them under the content just as well.
   */
  inline?: boolean
  /**
   * Lifts the layer's floor by this much, so the lower objects clear a shaped
   * divider at the foot of the band.
   *
   * The objects sit at `-z-10` and a divider at `z-10`, which is the right way
   * round — a drawing must never cover a heading, and the curve must beat the
   * `relative` wrappers that content sometimes sits in. The consequence is that
   * anything in the bottom slots is painted over by the curve, and once the
   * dividers went in that was 47 drawings across four pages, each one sliced in
   * half. Raising the objects above the curve would put them above the text
   * too, so the layer stops short of the curve instead.
   */
  floor?: string
}) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-x-0 top-0 overflow-hidden', !inline && '-z-10')}
      style={{ bottom: floor ?? 0 }}
      aria-hidden="true"
    >
      {SLOTS[variant].map((slot, i) => {
        const item = pick(`${seed}#${i}`)
        return (
          <Float
            key={slot.pos}
            index={i}
            y={slot.y}
            rotate={slot.rotate}
            pattern={slot.pattern}
            enter={slot.enter}
            parallax={slot.parallax}
            className={cn('absolute', slot.pos, onDark && ON_DARK_OPACITY[variant])}
          >
            {/* The centred variant takes the badge height rather than the band
                height. Its strip is the narrowest on the site — measured at
                47-61px on the positioning band across five widths, against
                89-125px on programs — and a band-height drawing plus its bob
                does not fit in 47px. Small everywhere rather than small on one
                band: two sections that share a treatment should share a size. */}
            <item.Art
              className={variant === 'centred' || slot.pos.includes('sm:hidden') ? item.badge : item.h}
            />
          </Float>
        )
      })}
    </div>
  )
}

/**
 * A single drawing placed by hand against a specific element.
 *
 * A handful of places on the site hang one object off the corner of a card or a
 * photograph, as part of that composition rather than as part of the band. They
 * used to name the drawing directly — `<Book className="absolute -right-4 …" />`
 * — and that is exactly how a repeat gets onto the screen: the band around them
 * is dealing four drawings out of the deck with a no-repeat guarantee, and a
 * hard-coded `Book` sitting two hundred pixels away is outside that guarantee
 * and can duplicate one of them. Taking the drawing from the deck puts these
 * back inside it.
 *
 * The caller positions; the catalogue sizes. A hand-picked height belonged to
 * the drawing it was chosen for, and a cloud is nothing like a pencil at the
 * same height.
 */
export function DealtObject({ seed, className }: { seed: string; className?: string }) {
  const item = pick(`spot:${seed}`)

  return (
    <span className={cn('pointer-events-none block', className)} aria-hidden="true">
      <item.Art className={item.h} />
    </span>
  )
}

/**
 * One drawn object peeking over the top edge of a card.
 *
 * WHY IT IS NOT A `Float`. A page of this site can hold twenty cards, and
 * twenty looping GSAP tweens to nudge twenty stickers is a real cost for
 * something a reader never looks straight at. The card language is already
 * "CSS only, zero JavaScript per card" and this stays inside it: the tilt is a
 * static rotation picked from the seed, so neighbours in a grid lean opposite
 * ways rather than all the same way.
 *
 * WHY THE CARD MUST NOT CLIP. The badge is deliberately outside the card's
 * bounds, so any card carrying one drops `overflow-hidden`. That is safe for
 * every card shape here — a tone gradient and the `hairline` inset shadow both
 * follow `border-radius` on their own, and a `Photo` clips itself — but it is
 * why `object` is opt-in per call site rather than on by default.
 *
 * Placed at the top *right*: a card's heading starts at the top left, and a
 * drawing directly above the first word of a title reads as a bullet.
 */
export function ObjectBadge({ seed = '', className }: { seed?: string; className?: string }) {
  const item = pick(`badge:${seed}`)
  // Alternating rather than random: neighbours in a grid are dealt consecutive
  // deck positions, so parity here makes a row of cards lean in and out.
  const lean = CATALOGUE.indexOf(item) % 2 === 0 ? '-rotate-6' : 'rotate-6'

  return (
    <span
      className={cn('pointer-events-none absolute -top-5 right-6 hidden sm:block', lean, className)}
      aria-hidden="true"
    >
      <item.Art className={item.badge} />
    </span>
  )
}
