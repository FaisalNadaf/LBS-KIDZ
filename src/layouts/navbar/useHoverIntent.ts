import { useCallback, useEffect, useRef } from 'react'

/**
 * Forgiving open/close for hover-triggered menus.
 *
 * A menu that opens on `mouseenter` and closes on `mouseleave` is the single
 * most common way to make navigation annoying. Two things go wrong. Moving the
 * pointer diagonally toward a panel clips the corner of a neighbouring item, so
 * the menu you were aiming at closes and another opens. And any gap at all
 * between the trigger and the panel — a shadow, a rounding, a pixel of
 * padding — closes the menu on the way there.
 *
 * The fix is a short grace period on the way out, cancelled if the pointer
 * comes back to the trigger or reaches the panel. 160ms is long enough to cross
 * a gap or clip a corner and short enough that a deliberate exit still feels
 * immediate.
 *
 * Opening is not delayed. Hover-intent implementations often delay both, which
 * makes the menu feel like it is thinking; the cost of opening slightly early
 * is nothing, because the panel closes again as soon as the pointer moves on.
 */
export function useHoverIntent(open: (label: string) => void, close: () => void, delay = 160) {
  const timer = useRef<number | undefined>(undefined)

  const cancel = useCallback(() => {
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
  }, [])

  const enter = useCallback(
    (label: string) => {
      cancel()
      open(label)
    },
    [cancel, open],
  )

  const leave = useCallback(() => {
    cancel()
    timer.current = window.setTimeout(close, delay)
  }, [cancel, close, delay])

  // A pending close must not fire after the menu has already gone, which is
  // what would happen if the route changed while the pointer was on its way out.
  useEffect(() => cancel, [cancel])

  return { enter, leave, cancel }
}
