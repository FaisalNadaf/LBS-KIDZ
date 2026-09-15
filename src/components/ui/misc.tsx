import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ChevronRight, Info } from 'lucide-react'
import { cn } from '@/lib/cn'

/* ==========================================================================
   Breadcrumb
   Rendered as a real <nav>, matching the BreadcrumbList structured data that
   the Seo component emits for the same route.
   ========================================================================== */

export function Breadcrumb({
  trail,
  className,
  onDark = false,
  ...rest
}: {
  trail: { label: string; href?: string }[]
  className?: string
  onDark?: boolean
} & React.HTMLAttributes<HTMLElement>) {
  if (!trail.length) return null

  return (
    <nav aria-label="Breadcrumb" className={className} {...rest}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-x-1.5 gap-y-1 text-small',
          onDark ? 'text-mist-200/70' : 'text-ink-400',
        )}
      >
        <li>
          <Link
            to="/"
            className={cn(
              'transition-colors',
              onDark ? 'hover:text-mist-50' : 'hover:text-sky-600',
            )}
          >
            Home
          </Link>
        </li>
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 shrink-0 opacity-50" aria-hidden="true" />
              {crumb.href && !last ? (
                <Link
                  to={crumb.href}
                  className={cn(
                    'transition-colors',
                    onDark ? 'hover:text-mist-50' : 'hover:text-sky-600',
                  )}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn('font-medium', onDark ? 'text-mist-100' : 'text-ink-600')}
                  aria-current={last ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ==========================================================================
   StepList: a short numbered sequence of what happens next.
   ========================================================================== */

/**
 * The "what happens next" flow, in one place.
 *
 * This pattern was written inline on Register Interest, and the Fees &
 * Admissions specification then asked for the same three-step block on its own
 * page: "a simple numbered 1-2-3 flow, consistent with the 'What happens next'
 * pattern already used on the Register Interest page, reuse that component
 * rather than designing a new one." Source: Fees & Admissions Content S4.
 *
 * Taking the instruction literally meant there had to be a component to reuse,
 * so the markup moved here and both pages now render it. Two pages promising a
 * parent the same three things should not be able to drift into promising them
 * differently.
 *
 * The numerals are decorative: an ordered list already conveys the sequence to
 * a screen reader, and reading "zero one" before each step would not help.
 */
export function StepList({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <ol className={cn('space-y-4', className)}>
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <span
            className="font-numeral shrink-0 text-sm font-semibold text-brand-500"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-body text-ink-500">{step}</span>
        </li>
      ))}
    </ol>
  )
}

/* ==========================================================================
   PhaseNote: explains why something on this site is deliberately absent.
   ========================================================================== */

export function PhaseNote({
  children,
  className,
  onDark = false,
}: {
  children: ReactNode
  className?: string
  /** For the deep blue bands, where the pale tint and ink text both disappear. */
  onDark?: boolean
}) {
  return (
    <p
      className={cn(
        'flex items-start gap-2.5 rounded-md px-4 py-3 text-small leading-relaxed',
        onDark ? 'bg-mist-50/10 text-mist-200/90' : 'bg-mist-200/60 text-ink-500',
        className,
      )}
    >
      <Info
        className={cn('mt-0.5 size-4 shrink-0', onDark ? 'text-orange-300' : 'text-ink-400')}
        aria-hidden="true"
      />
      <span>{children}</span>
    </p>
  )
}
