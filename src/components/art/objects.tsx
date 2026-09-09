import { cn } from '@/lib/cn'

/**
 * Object illustrations.
 *
 * The division of labour across the whole site, in one sentence: people are
 * photographed, everything else is drawn. These are the "everything else" —
 * the pencils, kites, drums, rainbows and paper boats that sit around a
 * photograph and give a flat rectangle somewhere to belong.
 *
 * Every one of them is built the same way, and new ones must be too: flat
 * fills, one 1.8px ink outline, round caps and joins, colours taken only from
 * the site palette. That last rule is what keeps a desk full of objects from
 * turning into the primary-colour clutter the design direction rules out —
 * the *style* is the sticker-flat reference, the *hues* stay khadi, terracotta,
 * indigo, haldi and neem.
 *
 * THREE THINGS EVERY DRAWING NEEDS, and the reason the first set of these was
 * redrawn: a flat fill inside an outline is a pictogram, not an illustration.
 * What separates the two at 40px is
 *
 *   - a second colour somewhere, so the shape has an inside as well as an edge;
 *   - one detail that only that object has — the ferrule on a pencil, the bows
 *     on a kite tail, the knot under a balloon;
 *   - an interior line at reduced opacity, which is what reads as a fold, a
 *     seam or a facet rather than as more outline.
 *
 * They follow the same rules as the rest of the illustration language in
 * `primitives.tsx`. Each is inline SVG, so nothing here costs a request.
 *
 * All of them are decorative by definition, so all of them are aria-hidden.
 * Anything that carries meaning is a photograph with real alt text, or words.
 */

const ink = 'var(--color-ink-700)'

type ObjectProps = { className?: string }

const stroke = {
  stroke: ink,
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/**
 * Every object sizes itself from the height the caller gives it.
 *
 * The base class is deliberately NOT `h-full`: these are usually absolutely
 * positioned inside a full-bleed decorative layer, where `h-full` resolves to
 * the height of the whole section and the object fills the screen. Tailwind
 * cannot arbitrate between `h-full` here and `h-16` at the call site — both are
 * height utilities in the same layer, so the winner depends on CSS source order
 * rather than on which one was written last. Leaving height entirely to the
 * caller removes the ambiguity.
 */
function Svg({
  children,
  viewBox,
  className,
}: {
  children: React.ReactNode
  viewBox: string
  className?: string
}) {
  return (
    <svg
      viewBox={viewBox}
      className={cn('block w-auto', className)}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/* ==========================================================================
   Writing and reading
   ========================================================================== */

export function Pencil({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 40 96" className={className}>
      <g {...stroke}>
        <path d="M12 22h16v42H12Z" fill="var(--color-haldi-300)" />
        {/* The wood shoulder and the graphite are two shapes, not one: a pencil
            drawn as a single triangle reads as a party hat at this size. */}
        <path d="M12 22 20 6l8 16Z" fill="var(--color-khadi-200)" />
        <path d="M16.5 13 20 6l3.5 7Z" fill={ink} />
        <path d="M12 64h16v7H12Z" fill="var(--color-khadi-400)" />
        <path d="M12 71h16v9a8 8 0 0 1-16 0Z" fill="var(--color-terracotta-300)" />
        <path d="M20 22v42" opacity="0.28" />
        <path d="M12 67.5h16" opacity="0.35" />
      </g>
    </Svg>
  )
}

export function Book({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 96 72" className={className}>
      <g {...stroke}>
        <path d="M48 18C40 10 26 8 10 10v50c16-2 30 0 38 8Z" fill="var(--color-khadi-50)" />
        <path d="M48 18c8-8 22-10 38-8v50c-16-2-30 0-38 8Z" fill="var(--color-khadi-200)" />
        <path d="M48 18v48" />
        <path d="M18 24c8-1 16 0 22 4M18 36c8-1 16 0 22 4" opacity="0.4" />
        <path d="M78 24c-8-1-16 0-22 4M78 36c-8-1-16 0-22 4" opacity="0.4" />
        {/* The ribbon is the whole reason this reads as a book being read
            rather than as an open folder. */}
        <path d="M64 12v22l5-5 5 5V14Z" fill="var(--color-terracotta-400)" />
      </g>
    </Svg>
  )
}

export function AlphabetBlock({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 64 64" className={className}>
      <g {...stroke}>
        <rect x="4" y="4" width="56" height="56" rx="10" fill="var(--color-neem-200)" />
        <rect x="12" y="12" width="40" height="40" rx="6" fill="var(--color-khadi-50)" />
        <path d="M22 44 32 20l10 24" fill="none" />
        <path d="M26 36h12" fill="none" />
      </g>
    </Svg>
  )
}

export function Crayon({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 36 88" className={className}>
      <g {...stroke}>
        <path d="M8 24 18 4l10 20Z" fill="var(--color-neem-400)" />
        <path d="M8 24h20v58H8Z" fill="var(--color-neem-300)" />
        {/* The paper label. A crayon without one is a lipstick. */}
        <path d="M8 36h20v24H8Z" fill="var(--color-khadi-50)" />
        <path d="M12 44h12M12 52h8" opacity="0.4" />
      </g>
    </Svg>
  )
}

export function Abacus({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 88 72" className={className}>
      <g {...stroke}>
        <rect x="5" y="6" width="78" height="60" rx="8" fill="var(--color-khadi-100)" />
        <path d="M14 23h60M14 36h60M14 49h60" opacity="0.5" />
        <circle cx="22" cy="23" r="5.5" fill="var(--color-terracotta-300)" />
        <circle cx="34" cy="23" r="5.5" fill="var(--color-haldi-300)" />
        <circle cx="62" cy="23" r="5.5" fill="var(--color-neem-300)" />
        <circle cx="22" cy="36" r="5.5" fill="var(--color-neem-300)" />
        <circle cx="50" cy="36" r="5.5" fill="var(--color-terracotta-300)" />
        <circle cx="62" cy="36" r="5.5" fill="var(--color-indigo-ink-300)" />
        <circle cx="22" cy="49" r="5.5" fill="var(--color-haldi-300)" />
        <circle cx="34" cy="49" r="5.5" fill="var(--color-indigo-ink-300)" />
        <circle cx="46" cy="49" r="5.5" fill="var(--color-terracotta-300)" />
      </g>
    </Svg>
  )
}

/* ==========================================================================
   Play
   ========================================================================== */

export function Kite({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 64 96" className={className}>
      <g {...stroke}>
        <path d="M32 4 58 32 32 68 6 32Z" fill="var(--color-haldi-300)" />
        {/* The two lower quarters in a second colour, which is what turns a
            diamond into a kite that has been made out of paper. */}
        <path d="M32 32 58 32 32 68Z" fill="var(--color-terracotta-300)" />
        <path d="M32 4v64M6 32h52" opacity="0.4" />
        <path d="M32 68c8 10-8 14 0 24" fill="none" />
        <path d="M31 76h6M27 86h6" />
      </g>
    </Svg>
  )
}

export function PaperPlane({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 72 56" className={className}>
      <g {...stroke}>
        {/* Two wings in two tones. As one flat shape it was the only drawing in
            the set with no inside — pure outline, invisible at 32px. */}
        <path d="M4 26 68 4 32 34Z" fill="var(--color-khadi-200)" />
        <path d="M32 34 68 4 46 52Z" fill="var(--color-khadi-50)" />
        <path d="M32 34v17l10-9Z" fill="var(--color-khadi-300)" />
        <path d="M68 4 32 34" />
      </g>
    </Svg>
  )
}

export function Ball({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 72 72" className={className}>
      <g {...stroke}>
        {/* A beach ball, not a basketball: four segments in the site palette
            rather than a single orange disc with seams ruled across it. The
            quadratic controls sit inside the circle, so each segment's inner
            edge is concave and the four read as panels rather than as pie. */}
        <circle cx="36" cy="36" r="30" fill="var(--color-khadi-50)" />
        <path d="M36 6A30 30 0 0 0 6 36Q24 24 36 6Z" fill="var(--color-haldi-300)" />
        <path d="M36 6A30 30 0 0 1 66 36Q48 24 36 6Z" fill="var(--color-terracotta-400)" />
        <path d="M6 36A30 30 0 0 0 36 66Q24 48 6 36Z" fill="var(--color-neem-300)" />
        <path d="M66 36A30 30 0 0 1 36 66Q48 48 66 36Z" fill="var(--color-indigo-ink-300)" />
        <circle cx="36" cy="36" r="30" fill="none" />
        <circle cx="36" cy="36" r="5.5" fill="var(--color-khadi-50)" />
      </g>
    </Svg>
  )
}

export function Balloon({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 56 88" className={className}>
      <g {...stroke}>
        {/* No centre seam. With one, the ellipse plus the pointed knot read as
            a leaf — and there is already a leaf in this set. */}
        <ellipse cx="28" cy="30" rx="22" ry="25" fill="var(--color-terracotta-300)" />
        {/* The knot has to be big enough to survive being drawn 32px tall.
            Without it this is an egg. */}
        <path d="M21 54h14l-7 10Z" fill="var(--color-terracotta-400)" />
        <path d="M28 64c9 6-9 11 0 18" fill="none" />
        <path d="M14 21c1-7 6-12 12-13" opacity="0.5" />
      </g>
    </Svg>
  )
}

export function Drum({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 80 76" className={className}>
      <g {...stroke}>
        <path d="M15 24c0-5 50-5 50 0v28c0 5-50 5-50 0Z" fill="var(--color-terracotta-400)" />
        {/* The lacing. A drum without the zigzag is a tin. */}
        <path d="M15 28 27 48l13-20 13 20 12-20" fill="none" opacity="0.75" />
        <ellipse cx="40" cy="24" rx="25" ry="7" fill="var(--color-khadi-100)" />
        <path d="M52 18 68 6M60 22 76 12" />
      </g>
    </Svg>
  )
}

/* ==========================================================================
   Nature and weather
   ========================================================================== */

export function Leaf({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 64 76" className={className}>
      <g {...stroke}>
        <path d="M30 72C30 46 30 26 30 14" fill="none" />
        <path d="M30 40c-14-2-22-12-22-24 14-2 22 8 22 24Z" fill="var(--color-neem-300)" />
        <path d="M30 30c2-14 12-22 24-22 2 13-8 22-24 22Z" fill="var(--color-neem-200)" />
        <path d="M30 34C22 30 16 24 12 20M30 24c3-7 8-11 14-13" opacity="0.5" />
      </g>
    </Svg>
  )
}

export function Flower({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 72 88" className={className}>
      <g {...stroke}>
        <path d="M36 46v38" fill="none" />
        <path d="M36 64c-10 0-16-6-17-14 10-1 16 5 17 14Z" fill="var(--color-neem-300)" />
        <circle cx="36" cy="20" r="13" fill="var(--color-terracotta-300)" />
        <circle cx="51" cy="31" r="13" fill="var(--color-terracotta-300)" />
        <circle cx="45" cy="49" r="13" fill="var(--color-terracotta-300)" />
        <circle cx="27" cy="49" r="13" fill="var(--color-terracotta-300)" />
        <circle cx="21" cy="31" r="13" fill="var(--color-terracotta-300)" />
        <circle cx="36" cy="35" r="10" fill="var(--color-haldi-300)" />
      </g>
    </Svg>
  )
}

export function Butterfly({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 80 72" className={className}>
      <g {...stroke}>
        <path d="M38 26C24 8 6 13 8 27c2 12 18 12 30 8Z" fill="var(--color-indigo-ink-300)" />
        <path d="M42 26C56 8 74 13 72 27c-2 12-18 12-30 8Z" fill="var(--color-indigo-ink-300)" />
        <path d="M38 38C26 40 13 47 17 58c4 10 17-2 21-14Z" fill="var(--color-haldi-300)" />
        <path d="M42 38c12 2 25 9 21 20-4 10-17-2-21-14Z" fill="var(--color-haldi-300)" />
        <path d="M40 16c-2 4-2 38 0 44 2-6 2-40 0-44Z" fill="var(--color-ink-700)" />
        <path d="M38 17c-3-6-9-9-12-9M42 17c3-6 9-9 12-9" fill="none" />
      </g>
    </Svg>
  )
}

export function Cloud({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 96 56" className={className}>
      <g {...stroke}>
        {/* A sun behind the cloud. The plain cloud was the emptiest drawing in
            the set — one flat shape, one outline, nothing inside it. */}
        <circle cx="70" cy="20" r="13" fill="var(--color-haldi-300)" />
        <path
          d="M22 52c-10 0-18-7-18-15s8-15 18-15c2-7 9-11 17-11 10 0 18 7 19 16 9 0 14 6 14 13s-6 12-14 12Z"
          fill="var(--color-khadi-50)"
        />
        <path d="M20 42h34" opacity="0.35" />
      </g>
    </Svg>
  )
}

export function Sun({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 80 80" className={className}>
      <g {...stroke}>
        <path d="M66 40h8M58.4 58.4 64 64M40 66v8M21.6 58.4 16 64M14 40H6M21.6 21.6 16 16M40 14V6M58.4 21.6 64 16" />
        <circle cx="40" cy="40" r="20" fill="var(--color-haldi-300)" />
        <path d="M28 32c2-4 6-7 10-8" opacity="0.45" />
      </g>
    </Svg>
  )
}

export function Rainbow({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 96 60" className={className}>
      <g {...stroke}>
        <path d="M6 52a42 42 0 0 1 84 0H79a31 31 0 0 0-62 0Z" fill="var(--color-terracotta-300)" />
        <path d="M17 52a31 31 0 0 1 62 0H68a20 20 0 0 0-40 0Z" fill="var(--color-haldi-300)" />
        <path d="M28 52a20 20 0 0 1 40 0H57a9 9 0 0 0-18 0Z" fill="var(--color-neem-300)" />
      </g>
    </Svg>
  )
}

export function Apple({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 64 76" className={className}>
      <g {...stroke}>
        <path
          d="M32 24C21 16 6 24 6 42c0 17 13 30 26 24 13 6 26-7 26-24 0-18-15-26-26-18Z"
          fill="var(--color-terracotta-400)"
        />
        <path d="M32 24c0-9 2-13 7-18" fill="none" />
        <path d="M35 10c8-7 17-3 15 6-9 4-15 0-15-6Z" fill="var(--color-neem-300)" />
        <path d="M16 34c3-4 7-6 11-6" opacity="0.4" />
      </g>
    </Svg>
  )
}

/* ==========================================================================
   Desk and classroom
   ========================================================================== */

export function PencilCup({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 72 88" className={className}>
      <g {...stroke}>
        {/* Contents first, so the pot draws over their bases. */}
        <path d="M22 46V16l6-8 6 8v30Z" fill="var(--color-khadi-50)" />
        <path d="M22 22h12" />
        <path d="M38 46V20l5-7 5 7v26Z" fill="var(--color-neem-300)" />
        <path d="M15 46 20 22l7 2-4 22Z" fill="var(--color-haldi-300)" />
        <path d="M48 46 52 26l7 3-5 17Z" fill="var(--color-indigo-ink-300)" />
        <path d="M12 44h48l-5 36H17Z" fill="var(--color-terracotta-300)" />
        <path d="M17 56h38" opacity="0.4" />
      </g>
    </Svg>
  )
}

export function SetSquare({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 84 72" className={className}>
      <g {...stroke}>
        <path d="M8 64 68 64 8 12Z" fill="var(--color-neem-300)" />
        {/* A smaller window than the obvious one: cut too much away and the
            frame thins to a wire that disappears at badge size. */}
        <path d="M24 54 50 54 24 32Z" fill="var(--color-khadi-50)" />
        <path d="M18 64v-6M28 64v-6M38 64v-6M48 64v-6M58 64v-6" opacity="0.5" />
        <path d="M14 58h5v-5" fill="none" opacity="0.6" />
      </g>
    </Svg>
  )
}

export function Calculator({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 64 84" className={className}>
      <g {...stroke}>
        <rect x="6" y="4" width="52" height="76" rx="10" fill="var(--color-indigo-ink-300)" />
        <rect x="15" y="13" width="34" height="14" rx="3" fill="var(--color-khadi-50)" />
        <circle cx="20" cy="40" r="3.5" fill="var(--color-khadi-50)" />
        <circle cx="32" cy="40" r="3.5" fill="var(--color-khadi-50)" />
        <circle cx="44" cy="40" r="3.5" fill="var(--color-khadi-50)" />
        <circle cx="20" cy="53" r="3.5" fill="var(--color-khadi-50)" />
        <circle cx="32" cy="53" r="3.5" fill="var(--color-khadi-50)" />
        <circle cx="44" cy="53" r="3.5" fill="var(--color-haldi-300)" />
        <circle cx="20" cy="66" r="3.5" fill="var(--color-khadi-50)" />
        <circle cx="32" cy="66" r="3.5" fill="var(--color-khadi-50)" />
        <circle cx="44" cy="66" r="3.5" fill="var(--color-terracotta-300)" />
      </g>
    </Svg>
  )
}

export function PaintPalette({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 88 80" className={className}>
      <g {...stroke}>
        <path
          d="M44 6c21 0 38 12 38 27 0 9-7 13-14 13-5 0-8 3-8 7 0 5-5 12-16 12C22 65 6 52 6 33 6 17 23 6 44 6Z"
          fill="var(--color-khadi-50)"
        />
        {/* The thumb hole is what makes it read as a palette and not a blob. */}
        <ellipse cx="34" cy="49" rx="8" ry="6" fill="var(--color-khadi-200)" />
        <circle cx="24" cy="26" r="5" fill="var(--color-terracotta-300)" />
        <circle cx="41" cy="20" r="5" fill="var(--color-haldi-300)" />
        <circle cx="58" cy="24" r="5" fill="var(--color-neem-300)" />
        <circle cx="66" cy="38" r="5" fill="var(--color-indigo-ink-300)" />
        <path d="M56 62 78 74" />
        <path d="M52 60l7-4 4 7-7 4Z" fill="var(--color-terracotta-400)" />
      </g>
    </Svg>
  )
}

export function BuildingBlocks({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 80 72" className={className}>
      <g {...stroke}>
        <rect x="5" y="40" width="32" height="26" rx="5" fill="var(--color-terracotta-300)" />
        <rect x="43" y="40" width="32" height="26" rx="5" fill="var(--color-neem-300)" />
        <rect x="24" y="8" width="32" height="26" rx="5" fill="var(--color-haldi-300)" />
        <circle cx="21" cy="53" r="4.5" fill="var(--color-khadi-50)" />
        <path d="M55 48v10M50 53h10" />
        <path d="M35 21h10" />
      </g>
    </Svg>
  )
}

export function Star({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 72 72" className={className}>
      <g {...stroke}>
        <path
          d="M36 5 43.9 25.2 64.9 26.3 48.5 39.6 53.9 60 36 48.6 18.1 60 23.5 39.6 7.1 26.3 28.1 25.2Z"
          fill="var(--color-haldi-300)"
        />
        <path d="M36 15v10M30 30l-8-1" opacity="0.4" />
      </g>
    </Svg>
  )
}

export function MusicNote({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 60 72" className={className}>
      <g {...stroke}>
        <path d="M22 56V13l28-7v43" fill="none" />
        <path d="M22 13 50 6v11L22 24Z" fill="var(--color-indigo-ink-300)" />
        <ellipse cx="14" cy="56" rx="9" ry="7" fill="var(--color-indigo-ink-300)" />
        <ellipse cx="42" cy="49" rx="9" ry="7" fill="var(--color-terracotta-400)" />
      </g>
    </Svg>
  )
}

export function PaperBoat({ className }: ObjectProps) {
  return (
    <Svg viewBox="0 0 88 72" className={className}>
      <g {...stroke}>
        <path d="M44 4 24 34h20Z" fill="var(--color-khadi-200)" />
        <path d="M44 4 66 34H44Z" fill="var(--color-terracotta-300)" />
        <path d="M6 34h76l-13 22H19Z" fill="var(--color-khadi-50)" />
        <path d="M44 4v30" opacity="0.4" />
        <path d="M4 64c8-6 14 6 22 0s14 6 22 0 14 6 22 0" fill="none" opacity="0.7" />
      </g>
    </Svg>
  )
}

/* ==========================================================================
   Marks: the small hand-drawn punctuation between elements
   ========================================================================== */

/** A short curved arrow, used to connect two facts across whitespace. */
export function CurveArrow({
  className,
  flip = false,
}: ObjectProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 56"
      className={cn('block h-auto', flip && '-scale-x-100', className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 8C30 46 76 52 112 30" />
        <path d="M100 34l12-4-2 12" />
      </g>
    </svg>
  )
}

/** Three short strokes, the "this just happened" mark beside a photograph. */
export function Sparks({ className }: ObjectProps) {
  return (
    <svg
      viewBox="0 0 44 40"
      className={cn('block h-auto', className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M4 30 12 18" />
        <path d="M21 24V8" />
        <path d="M38 30 31 18" />
      </g>
    </svg>
  )
}

/**
 * A dashed ring, drawn behind an icon and turned very slowly.
 *
 * The slowness is the point. At twenty-eight seconds a revolution it is not an
 * animation anyone watches, it is a sign that the page is alive; anything
 * faster reads as a loading spinner, which is the wrong thing to say beside a
 * statistic. The `motion-safe:` prefix at the call site stops it entirely for
 * readers who ask for reduced motion.
 */
export function Ring({ className }: ObjectProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn('block', className)}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="40"
        cy="40"
        r="37"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 9"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ==========================================================================
   Section edges
   ========================================================================== */

/**
 * A scalloped edge, for handing one band over to the next.
 *
 * The reference uses a deep cloud-shaped seam between sections. Straight from
 * that source it would be too loud here — this palette is khadi paper and deep
 * blue, and a tall row of bubbles reads as a nursery poster rather than as a
 * school with a hundred-year-old name over the door. So the bumps are shallow:
 * enough to register as a deliberate seam, not enough to become the loudest
 * thing on the page.
 *
 * The path is generated rather than hand-authored so the bump count can change
 * with the breakpoint without anyone redrawing a `d` attribute, and
 * `preserveAspectRatio="none"` lets one path stretch to any width.
 */
export function ScallopEdge({
  className,
  flip = false,
  bumps = 14,
}: ObjectProps & {
  /** Points the bumps upward, for the foot of a band rather than its head. */
  flip?: boolean
  bumps?: number
}) {
  const width = 1200
  const height = 40
  const step = width / bumps
  const rise = height * 0.62

  let d = `M0 ${height} V${rise}`
  for (let i = 0; i < bumps; i += 1) {
    d += ` a${step / 2} ${rise} 0 0 1 ${step} 0`
  }
  d += ` V${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn('block h-6 w-full sm:h-10', flip && 'rotate-180', className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} fill="currentColor" />
    </svg>
  )
}

/**
 * A short curved arrow with a hand-drawn feel, for linking one figure to the
 * next across whitespace. Two are used between the three homepage facts, which
 * is what turns a row of numbers into a sequence to be read left to right.
 */
export function LinkArrow({
  className,
  flip = false,
}: ObjectProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 96 40"
      className={cn('block h-auto', flip && '-scale-y-100', className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 28C24 6 62 4 90 16" />
        <path d="M79 12l11 4-6 9" />
      </g>
    </svg>
  )
}
