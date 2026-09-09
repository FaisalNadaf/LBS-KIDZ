import { m } from 'framer-motion'
import { EASE } from '@/animations/motion'
import { usePrefersReducedMotion } from '@/hooks'

/**
 * The menu button's mark: three bars that fold into a cross.
 *
 * Drawn rather than swapped between lucide's `Menu` and `X`, because swapping
 * two icons is a cut — the bars vanish and a cross appears in their place, and
 * at the moment the sheet starts sliding that reads as a glitch. Here the same
 * three lines travel: the outer two rotate onto each other and the middle one
 * fades, so the button visibly *becomes* the close control.
 *
 * Under reduced motion the states still swap, just without the tween. The
 * button must always show whether it will open or close.
 *
 * ALL THREE LINES ARE DRAWN AT y=12 AND SPREAD BY TRANSLATION, rather than
 * drawn where they sit and rotated in place. A rotation swings a line whose own
 * midpoint is not the pivot, so bars at y=7/12/17 do not fold into a cross; the
 * ends travel instead of pivoting. Drawn through a common midpoint, each
 * rotation is exact and the closed state costs only a translate.
 *
 * AND THE PIVOT IS LEFT ALONE. Motion resolves `originX`/`originY` against each
 * element's own fill-box, not the viewBox, so the seemingly obvious
 * `originX: '12px'` is read as twelve units past this line's bounding box
 * corner at (4, 12) and pivots it about (16, 24). Measured, that threw the two
 * diagonals to (21.7, 12.7) and (4.7, 18.3) as disjoint slashes, half of each
 * outside the 24-unit box. Motion's default origin is already the element's
 * midpoint, which for these three lines is (12, 12): the centre of the box, and
 * exactly the pivot a cross needs.
 */
export function MenuIcon({ open }: { open: boolean }) {
  const reduced = usePrefersReducedMotion()
  const transition = reduced ? { duration: 0 } : { duration: 0.28, ease: EASE.out }

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <m.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
        transition={transition}
      />
      {/* The middle bar has nowhere to go, so it shortens as it fades and the
          cross reads as the outer two closing over it. */}
      <m.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.4 : 1 }}
        transition={transition}
      />
      <m.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
        transition={transition}
      />
    </svg>
  )
}
