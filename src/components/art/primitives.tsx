import { cn } from '@/lib/cn'

/**
 * The LBS KidZ illustration language.
 *
 * Why illustration and not photography, in Phase 1:
 *   "Real photography once available (Phase 2); tasteful custom illustration in
 *    the interim (Phase 1)."  Source: Website Reference Document S7;
 *    Project Decisions Log S7.
 *   Overclaiming campus experience before it is real is explicitly avoided.
 *   Source: Global & Indian Preschool Research S6.
 *
 * One visual system, applied everywhere:
 *   - Flat shapes in the khadi / terracotta / deep-blue / haldi / neem palette.
 *   - A single ink outline weight, round caps and round joins.
 *   - Geometry from Indian sources (jharokha arches, rangoli grids, kites,
 *     wheat, diyas), drawn plainly rather than decoratively.
 *   - No gradients, no 3D, no mixed styles.
 *
 * Every illustration is inline SVG: no network request, scales to any screen,
 * and inherits currentColor where it should.
 */

export const ink = 'var(--color-ink-700)'

type SvgProps = {
  className?: string
  /** Decorative art gets aria-hidden; meaningful art gets a title. */
  title?: string
}

const a11y = (title?: string) =>
  title
    ? ({ role: 'img' as const, 'aria-label': title })
    : ({ 'aria-hidden': true as const, focusable: 'false' as const })

/* ==========================================================================
   The motif: a wheat stalk.
   "A recurring, subtle visual motif tied to the legacy story (e.g., a lantern
    or wheat-stalk line-icon, tied to food-respect/farmer-gratitude), used
    quietly, never literally or politically."
   Source: Website Reference Document S7; Project Decisions Log S7.
   ========================================================================== */

export function WheatStalk({ className, title }: SvgProps) {
  return (
    <svg viewBox="0 0 48 96" className={cn('h-full w-auto', className)} {...a11y(title)}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 94V26" />
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 30 + i * 12
          return (
            <g key={i}>
              <path d={`M24 ${y} C 15 ${y - 3}, 11 ${y - 9}, 12 ${y - 15}`} />
              <path d={`M24 ${y} C 33 ${y - 3}, 37 ${y - 9}, 36 ${y - 15}`} />
            </g>
          )
        })}
        <path d="M24 26 C 20 18, 21 10, 24 4 C 27 10, 28 18, 24 26 Z" />
      </g>
    </svg>
  )
}

/**
 * The wheat stalk as a bare <g>, for composing inside a larger scene's SVG.
 * Intrinsic box: 48 x 96. It must stay a bare <g>: a nested <svg> with no
 * explicit width inherits the parent viewport rather than the transform it sits
 * under, which silently blows the artwork up to full-canvas size.
 */
export function WheatStalkArt() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M24 94V26" />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 30 + i * 12
        return (
          <g key={i}>
            <path d={`M24 ${y} C 15 ${y - 3}, 11 ${y - 9}, 12 ${y - 15}`} />
            <path d={`M24 ${y} C 33 ${y - 3}, 37 ${y - 9}, 36 ${y - 15}`} />
          </g>
        )
      })}
      <path d="M24 26 C 20 18, 21 10, 24 4 C 27 10, 28 18, 24 26 Z" />
    </g>
  )
}

/** A single grain, used as a list bullet and a section divider. */
export function Grain({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 12 20" className={cn('h-3 w-auto', className)} aria-hidden="true">
      <path
        d="M6 1 C 2 6, 1 12, 6 19 C 11 12, 10 6, 6 1 Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  )
}

/** The second motif named in the brand direction. */
export function Lantern({ className, title }: SvgProps) {
  return (
    <svg viewBox="0 0 40 56" className={cn('h-full w-auto', className)} {...a11y(title)}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 2v6" />
        <path d="M11 8h18" />
        <path d="M12 8 C 6 18, 6 34, 12 44 h16 C 34 34, 34 18, 28 8" />
        <path d="M9 44h22" />
        <path d="M20 50v4" />
        <path d="M20 20 C 16 25, 16 31, 20 35 C 24 31, 24 25, 20 20 Z" />
      </g>
    </svg>
  )
}

/** A hand-drawn underline for emphasised words in headings. */
export function Underline({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      /* No width in the base class. Two width utilities on one element is a
         coin-flip decided by CSS source order, so the caller owns it. */
      className={cn('absolute -bottom-1 left-1/2 h-2.5 -translate-x-1/2', className)}
      aria-hidden="true"
    >
      <path
        d="M3 8.5 C 45 3.5, 92 3, 197 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PaperBoat({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 48 32" className={cn('h-full w-auto', className)} aria-hidden="true">
      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke={ink}>
        <path d="M4 18 L24 18 L44 18 L36 28 L12 28 Z" fill="var(--color-khadi-50)" />
        <path d="M24 18 L24 4 L40 18" fill="var(--color-terracotta-200)" />
        <path d="M24 18 L24 4 L8 18" fill="var(--color-terracotta-100)" />
      </g>
    </svg>
  )
}
