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
          onDark ? 'text-khadi-200/70' : 'text-ink-400',
        )}
      >
        <li>
          <Link
            to="/"
            className={cn(
              'transition-colors',
              onDark ? 'hover:text-khadi-50' : 'hover:text-terracotta-600',
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
                    onDark ? 'hover:text-khadi-50' : 'hover:text-terracotta-600',
                  )}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn('font-medium', onDark ? 'text-khadi-100' : 'text-ink-600')}
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
   PhaseNote: explains why something on this site is deliberately absent.
   ========================================================================== */

export function PhaseNote({
  children,
  className,
  onDark = false,
}: {
  children: ReactNode
  className?: string
  /** For the indigo bands, where the khadi tint and ink text both disappear. */
  onDark?: boolean
}) {
  return (
    <p
      className={cn(
        'flex items-start gap-2.5 rounded-md px-4 py-3 text-small leading-relaxed',
        onDark ? 'bg-khadi-50/10 text-khadi-200/90' : 'bg-khadi-200/60 text-ink-500',
        className,
      )}
    >
      <Info
        className={cn('mt-0.5 size-4 shrink-0', onDark ? 'text-haldi-300' : 'text-ink-400')}
        aria-hidden="true"
      />
      <span>{children}</span>
    </p>
  )
}
