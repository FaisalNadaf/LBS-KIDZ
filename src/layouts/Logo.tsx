import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/**
 * The wheat-stalk mark on its own, without the wordmark or the link.
 *
 * Split out of `Logo` for the loading screen, which needs the mark at 3x the
 * navbar's size and must not render a link: an overlay that covers the site is
 * no place for a control that navigates, and it would be the one focusable
 * thing on screen while the site underneath is inert.
 *
 * Colour comes from `currentColor` so a caller sets it with a text utility.
 * `vectorEffect` is not used: the stroke is meant to thicken with the mark.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 29V12" />
        <path d="M16 15c-4-1-6-4-5.5-7.5" />
        <path d="M16 15c4-1 6-4 5.5-7.5" />
        <path d="M16 21c-4-1-6-4-5.5-7.5" />
        <path d="M16 21c4-1 6-4 5.5-7.5" />
        <path d="M16 12c-1.6-3 -1.2-6 0-9 1.2 3 1.6 6 0 9Z" />
      </g>
    </svg>
  )
}

/**
 * The LBS KidZ wordmark.
 *
 * Built from type plus the wheat-stalk motif rather than as a supplied asset,
 * because no logo file accompanies the source documents. It is deliberately a
 * single component so replacing it with the official artwork later is a
 * one-file change.
 * See docs/decisions-and-todos.md item T-05.
 */
export function Logo({
  className,
  onDark = false,
  showTagline = false,
}: {
  className?: string
  onDark?: boolean
  showTagline?: boolean
}) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label="LBS KidZ, home"
    >
      <span
        className={cn(
          'grid size-11 shrink-0 place-items-center rounded-lg transition-colors duration-200',
          onDark ? 'bg-khadi-50/10' : 'bg-terracotta-500',
        )}
      >
        <LogoMark className={cn('size-7', onDark ? 'text-khadi-100' : 'text-khadi-50')} />
      </span>

      {/*
        The wordmark is set in the display face, which arrives after first paint
        with `font-display: swap`. Georgia stands in until then and is narrower,
        so the swap used to widen this block and push the whole nav sideways —
        it was the single largest layout shift on the site (0.024 of a 0.024
        CLS). A floor on the width means the swap happens inside a box that has
        already been reserved, and nothing beside it moves.
      */}
      <span className="flex min-w-[6.75rem] flex-col leading-none">
        <span
          className={cn(
            'font-display whitespace-nowrap text-xl font-semibold tracking-tight',
            onDark ? 'text-khadi-50' : 'text-indigo-ink-700',
          )}
        >
          LBS <span className={onDark ? 'text-haldi-300' : 'text-terracotta-600'}>KidZ</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              'mt-1.5 whitespace-nowrap text-2xs font-medium uppercase tracking-[0.14em]',
              onDark ? 'text-khadi-300/80' : 'text-ink-400',
            )}
          >
            Little Karmayogis in the making
          </span>
        ) : null}
      </span>
    </Link>
  )
}
