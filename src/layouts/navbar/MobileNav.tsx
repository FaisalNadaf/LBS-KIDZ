import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { m } from 'framer-motion'
import { cn } from '@/lib/cn'
import { panelItemVariants, panelVariants } from '@/animations/motion'
import { Container } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/Button'
import { primaryNav } from '@/data/navigation'
import { primaryCta } from '@/data/site'
import { navIcons } from './nav-icons'

/**
 * The mobile sheet.
 *
 * WHY GROUPS ARE ACCORDIONS NOW. Every group used to be printed open, so the
 * whole of Phase 1's navigation was one 17-row scroll: a reader looking for
 * Campuses had to travel past four legacy pages and two parent pages to reach
 * it. Collapsed, the sheet opens as seven rows — the same seven the desktop bar
 * shows — and a group only costs its own height when someone asks for it.
 *
 * The group holding the current page starts open, so arriving from a legacy
 * page and opening the menu shows you where you are rather than a closed row.
 *
 * HEIGHTS ARE ANIMATED WITH `grid-template-rows: 0fr -> 1fr`, both for the
 * sheet and for each group. It resolves to the content's natural height with no
 * measuring and no JavaScript, and the panel never leaves the DOM, so nothing
 * has to be remounted to reopen it.
 *
 * WHICH IS WHY BOTH ARE `inert` WHEN CLOSED. A zero-height `overflow-hidden`
 * box clips its children visually but does not take them out of the layout:
 * measured, every one of the eighteen links in this sheet was still tabbable
 * with the menu shut, so a keyboard reader on any page had eighteen invisible
 * stops before reaching the content. `aria-hidden` alone made that worse rather
 * than better — hiding focusable elements from assistive technology while
 * leaving them focusable is the `aria-hidden-focus` violation. `inert` removes
 * them from the tab order, from the accessibility tree and from hit testing in
 * one attribute, and it costs no layout, so the open and close transitions are
 * untouched.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-nav"
      className={cn(
        'grid overflow-hidden border-khadi-300 bg-khadi-50 transition-[grid-template-rows,opacity] duration-300 ease-out-soft motion-reduce:transition-none lg:hidden',
        open ? 'grid-rows-[1fr] border-t opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
      inert={!open}
    >
      <div className="min-h-0 overflow-hidden">
        <nav
          aria-label="Primary, mobile"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain"
        >
          <Container className="py-5">
            {/* `initial={false}`: the sheet is mounted from first paint, so
                without it every row would play its entrance once on load,
                underneath a closed menu. */}
            <m.ul
              className="space-y-1"
              initial={false}
              animate={open ? 'shown' : 'hidden'}
              variants={panelVariants}
            >
              {primaryNav.map((item) =>
                item.kind === 'link' ? (
                  <m.li key={item.label} variants={panelItemVariants}>
                    <MobileLink to={item.href} onClick={onClose}>
                      {item.label}
                    </MobileLink>
                  </m.li>
                ) : (
                  <m.li key={item.label} variants={panelItemVariants}>
                    <MobileGroup item={item} onNavigate={onClose} sheetOpen={open} />
                  </m.li>
                ),
              )}
            </m.ul>

            <ButtonLink
              to={primaryCta.href}
              size="lg"
              className="mt-6 w-full"
              onClick={onClose}
              withArrow
            >
              {primaryCta.label}
            </ButtonLink>
          </Container>
        </nav>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function MobileLink({
  to,
  onClick,
  children,
  nested = false,
}: {
  to: string
  onClick: () => void
  children: React.ReactNode
  nested?: boolean
}) {
  const Icon = nested ? navIcons[to] : undefined

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          // 48px minimum: this is the whole navigation on a phone and every row
          // has to be comfortably tappable.
          'flex min-h-12 items-center gap-3 rounded-lg px-4 transition-colors duration-200',
          nested ? 'text-body' : 'text-base font-semibold',
          isActive
            ? 'bg-terracotta-100 font-semibold text-terracotta-700'
            : cn(nested ? 'text-ink-600' : 'text-indigo-ink-700', 'hover:bg-khadi-200'),
        )
      }
    >
      {Icon ? (
        <span
          className="grid size-8 shrink-0 place-items-center rounded-md bg-terracotta-50 text-terracotta-600"
          aria-hidden="true"
        >
          <Icon className="size-4" strokeWidth={1.9} />
        </span>
      ) : null}
      {children}
    </NavLink>
  )
}

function MobileGroup({
  item,
  onNavigate,
  sheetOpen,
}: {
  item: Extract<(typeof primaryNav)[number], { kind: 'group' }>
  onNavigate: () => void
  sheetOpen: boolean
}) {
  // From the router rather than `window.location`, which is only correct here by
  // accident of when react-router happens to re-render.
  const { pathname } = useLocation()
  const hasCurrent = [item.href, ...item.children.map((c) => c.href)].some(
    (href) => href === pathname,
  )

  const [open, setOpen] = useState(hasCurrent)
  const panelId = `mobile-group-${item.label.replace(/\W+/g, '-').toLowerCase()}`

  // Re-open the group holding the current page each time the sheet is opened,
  // and let any group the reader opened by hand fall closed again.
  useEffect(() => {
    if (sheetOpen) setOpen(hasCurrent)
  }, [sheetOpen, hasCurrent])

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          'flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-4 text-base font-semibold transition-colors duration-200',
          open ? 'bg-khadi-200/70 text-terracotta-700' : 'text-indigo-ink-700 hover:bg-khadi-200',
        )}
      >
        <span className="text-left">{item.short ?? item.label}</span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 transition-transform duration-300 ease-out-soft motion-reduce:transition-none',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out-soft motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
        inert={!open}
      >
        <div className="overflow-hidden">
          <ul className="space-y-0.5 pb-1 pl-3 pt-1">
            {item.href ? (
              <li>
                <MobileLink to={item.href} onClick={onNavigate} nested>
                  Everything in {item.label}
                </MobileLink>
              </li>
            ) : null}
            {item.children.map((child) => (
              <li key={child.href}>
                <MobileLink to={child.href} onClick={onNavigate} nested>
                  {child.label}
                </MobileLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
