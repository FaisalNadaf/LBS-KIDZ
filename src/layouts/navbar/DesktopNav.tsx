import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { m, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/cn'
import { panelItemVariants, panelVariants, SPRING } from '@/animations/motion'
import { usePrefersReducedMotion } from '@/hooks'
import { primaryNav, type NavItem } from '@/data/navigation'
import { navIcons } from './nav-icons'
import { useHoverIntent } from './useHoverIntent'

/**
 * The desktop bar.
 *
 * TWO INDICATORS, DOING DIFFERENT JOBS. A pill slides under whichever item the
 * pointer is on, and a rule sits under the item for the page you are actually
 * on. They are deliberately not the same object: a single indicator that
 * doubles as both loses the active route the moment the pointer moves, which is
 * exactly when a reader is looking for it.
 *
 * The pill is one element for the whole bar rather than a background on each
 * item. Per-item backgrounds can only fade in place; a single element can
 * travel, so moving along the row reads as one thing following the pointer
 * instead of seven things blinking. It is driven by springs off the measured
 * offset of the hovered item, so it stays correct at any width and needs no
 * hard-coded positions.
 */
export function DesktopNav({
  onDark,
  openGroup,
  setOpenGroup,
}: {
  onDark: boolean
  openGroup: string | null
  setOpenGroup: (label: string | null) => void
}) {
  const reduced = usePrefersReducedMotion()
  const listRef = useRef<HTMLUListElement>(null)
  const [pillVisible, setPillVisible] = useState(false)

  const x = useMotionValue(0)
  const w = useMotionValue(0)
  const sx = useSpring(x, SPRING.pointer)
  const sw = useSpring(w, SPRING.pointer)

  const { enter, leave, cancel } = useHoverIntent(
    (label) => setOpenGroup(label),
    () => setOpenGroup(null),
  )

  /** Move the pill to an item, measured against the list rather than the page. */
  const trackPill = (el: HTMLElement | null) => {
    const list = listRef.current
    if (!el || !list || reduced) return
    const a = el.getBoundingClientRect()
    const b = list.getBoundingClientRect()
    x.set(a.left - b.left)
    w.set(a.width)
    setPillVisible(true)
  }

  return (
    <nav aria-label="Primary">
      <ul
        ref={listRef}
        className="relative flex items-center gap-0.5"
        onPointerLeave={() => setPillVisible(false)}
      >
        {/* The travelling highlight. `aria-hidden` and behind the items: it is a
            pointer affordance, and nothing about it is information. */}
        {!reduced ? (
          <m.li
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-y-1.5 left-0 -z-10 rounded-lg',
              onDark ? 'bg-khadi-50/12' : 'bg-khadi-200/80',
            )}
            style={{ x: sx, width: sw }}
            animate={{ opacity: pillVisible ? 1 : 0 }}
            transition={{ duration: 0.18 }}
          />
        ) : null}

        {primaryNav.map((item) => (
          <NavItemView
            key={item.label}
            item={item}
            onDark={onDark}
            open={openGroup === item.label}
            reduced={reduced}
            onPointerEnter={(el) => {
              trackPill(el)
              if (!reduced && item.kind === 'group') enter(item.label)
              else if (!reduced) leave()
            }}
            onPointerLeaveItem={() => {
              if (!reduced && item.kind === 'group') leave()
            }}
            onPanelEnter={cancel}
            onToggle={() => setOpenGroup(openGroup === item.label ? null : item.label)}
            onClose={() => setOpenGroup(null)}
          />
        ))}
      </ul>
    </nav>
  )
}

/* ------------------------------------------------------------------ */

function NavItemView({
  item,
  open,
  onDark,
  reduced,
  onPointerEnter,
  onPointerLeaveItem,
  onPanelEnter,
  onToggle,
  onClose,
}: {
  item: NavItem
  open: boolean
  onDark: boolean
  reduced: boolean
  onPointerEnter: (el: HTMLElement | null) => void
  onPointerLeaveItem: () => void
  onPanelEnter: () => void
  onToggle: () => void
  onClose: () => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // True only once the panel has finished animating shut, which is the earliest
  // moment it is safe to take out of the paint. See the note on the panel.
  const [settled, setSettled] = useState(true)
  useEffect(() => {
    if (open) setSettled(false)
  }, [open])

  const trigger = cn(
    'relative inline-flex h-11 items-center gap-1 rounded-lg px-3 text-[0.8125rem] font-semibold',
    'transition-colors duration-200',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    onDark ? 'text-khadi-100 hover:text-khadi-50' : 'text-indigo-ink-700 hover:text-terracotta-700',
  )

  if (item.kind === 'link') {
    return (
      <li ref={ref} onPointerEnter={() => onPointerEnter(ref.current)}>
        <NavLink
          to={item.href}
          // The bar shows `short`; the accessible name keeps the full phrase, so
          // "Curriculum" in the bar is still "Curriculum & Learning Approach" to
          // a screen reader.
          aria-label={item.short ? item.label : undefined}
          className={({ isActive }) =>
            cn(trigger, isActive && (onDark ? 'text-haldi-300' : 'text-terracotta-600'))
          }
        >
          {({ isActive }) => (
            <>
              {item.short ?? item.label}
              <ActiveRule active={isActive} onDark={onDark} />
            </>
          )}
        </NavLink>
      </li>
    )
  }

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={() => onPointerEnter(ref.current)}
      onPointerLeave={onPointerLeaveItem}
      // Escape closes the menu and hands focus back to the trigger. Closing
      // alone is not enough: the panel turns `inert` in the same tick, so the
      // row the reader was standing on stops being focusable and the browser
      // drops focus to `<body>` — measured, Escape from inside the panel put a
      // keyboard reader back at the top of the document with the whole bar to
      // tab through again. This runs before the document-level handler in
      // `useDismissable`, so the trigger is focused while it still can be.
      onKeyDown={(e) => {
        if (e.key !== 'Escape' || !open) return
        e.stopPropagation()
        triggerRef.current?.focus()
        onClose()
      }}
      // Tabbing off the end of the panel leaves the group behind; an open menu
      // with focus somewhere else is stale by definition. `onBlur` is React's
      // delegated `focusout`, so it reports where focus went and this can tell
      // moving *within* the group from leaving it.
      onBlur={(e) => {
        if (!open) return
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return
        onClose()
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          trigger,
          open && (onDark ? 'text-khadi-50' : 'text-terracotta-700'),
        )}
      >
        {item.short ?? item.label}
        <ChevronDown
          className={cn(
            'size-3.5 transition-transform duration-300 ease-out-soft motion-reduce:transition-none',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {/* Kept mounted and animated with `animate` rather than mounted on open:
          unmounting a menu takes it out of the tab order, and only opacity and
          transform change here, so opening costs no layout.

          `pt-2` is load-bearing. It bridges the gap between the trigger and the
          panel so the pointer never leaves the item on the way down — which,
          together with the close delay in `useHoverIntent`, is what stops the
          menu shutting under the cursor. */}
      <m.div
        initial={false}
        animate={open ? 'shown' : 'hidden'}
        variants={panelVariants}
        onPointerEnter={onPanelEnter}
        onAnimationComplete={(label) => {
          if (label === 'hidden') setSettled(true)
        }}
        className={cn(
          'absolute left-1/2 top-full z-50 w-[24rem] origin-top -translate-x-1/2 pt-2.5',
          // Only once the fade has finished. Applying it on `!open` is the
          // obvious thing and it is wrong: `visibility: hidden` lands the
          // instant `open` goes false, which is the instant the exit starts.
          // Measured, the panel was already `hidden` at opacity 1.00 and stayed
          // hidden for every frame of the fade, so the menu snapped shut and the
          // exit animation was played to nobody.
          !open && settled && 'invisible',
        )}
        // Motion animates opacity to zero but leaves the element in the tab
        // order and in the hit-test path, so a closed menu is still focusable
        // and still swallows clicks meant for the page behind it. This applies
        // immediately, covering the window while the panel is fading but no
        // longer wanted: `inert` removes it from the tab order, the
        // accessibility tree, hit testing and find-in-page without touching how
        // it paints, so the exit is still seen but nothing can reach it.
        inert={!open}
      >
        <div
          className={cn(
            'overflow-hidden rounded-xl border border-khadi-300/70 bg-khadi-50/95 p-2 shadow-lift',
            // The blur is what stops a translucent panel over a photograph
            // turning into unreadable text on a busy background.
            'backdrop-blur-xl',
          )}
        >
          {item.href ? <OverviewRow label={item.label} href={item.href} onClick={onClose} /> : null}

          <ul>
            {item.children.map((child) => (
              <m.li key={child.href} variants={panelItemVariants}>
                <DropdownRow
                  label={child.label}
                  href={child.href}
                  description={child.description}
                  onClick={onClose}
                  reduced={reduced}
                />
              </m.li>
            ))}
          </ul>
        </div>
      </m.div>
    </li>
  )
}

/** The rule that marks the page you are on. Distinct from the hover pill. */
function ActiveRule({ active, onDark }: { active: boolean; onDark: boolean }) {
  return (
    <span
      className={cn(
        'absolute inset-x-3 bottom-1.5 h-0.5 origin-center rounded-full transition-transform duration-300 ease-out-soft motion-reduce:transition-none',
        active ? 'scale-x-100' : 'scale-x-0',
        onDark ? 'bg-haldi-300' : 'bg-terracotta-500',
      )}
      aria-hidden="true"
    />
  )
}

/**
 * The group's own landing page, where it has one.
 *
 * Given the top slot and a tinted ground because it is the parent of everything
 * under it, not a fifth sibling. Only Admissions has one, so this renders for
 * one menu out of three.
 */
function OverviewRow({
  label,
  href,
  onClick,
}: {
  label: string
  href: string
  onClick: () => void
}) {
  return (
    <m.div variants={panelItemVariants}>
      <Link
        to={href}
        onClick={onClick}
        className="group/row mb-1 flex items-center justify-between gap-3 rounded-lg bg-terracotta-50 px-3.5 py-3 transition-colors duration-200 hover:bg-terracotta-100"
      >
        <span className="text-sm font-semibold text-indigo-ink-700">Everything in {label}</span>
        <ArrowRight
          className="size-4 shrink-0 text-terracotta-600 transition-transform duration-200 ease-out-soft group-hover/row:translate-x-1 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Link>
    </m.div>
  )
}

function DropdownRow({
  label,
  href,
  description,
  onClick,
  reduced,
}: {
  label: string
  href: string
  description?: string
  onClick: () => void
  reduced: boolean
}) {
  const Icon = navIcons[href]

  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'group/row flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200',
          isActive ? 'bg-khadi-200/80' : 'hover:bg-khadi-200/70',
        )
      }
    >
      {Icon ? (
        <span
          className={cn(
            'mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-terracotta-50 text-terracotta-600',
            'transition-[background-color,color,transform] duration-200 ease-out-soft',
            !reduced && 'group-hover/row:-translate-y-0.5',
            'group-hover/row:bg-terracotta-600 group-hover/row:text-khadi-50',
          )}
          aria-hidden="true"
        >
          <Icon className="size-4" strokeWidth={1.9} />
        </span>
      ) : null}

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="text-sm font-semibold leading-snug text-indigo-ink-700">{label}</span>
          <ArrowRight
            className={cn(
              'size-3.5 shrink-0 text-terracotta-600 opacity-0 transition-[opacity,transform] duration-200 ease-out-soft',
              'group-hover/row:translate-x-0.5 group-hover/row:opacity-100',
              'motion-reduce:transition-none',
            )}
            aria-hidden="true"
          />
        </span>
        {description ? (
          <span className="mt-0.5 block text-xs leading-relaxed text-ink-400">{description}</span>
        ) : null}
      </span>
    </NavLink>
  )
}
