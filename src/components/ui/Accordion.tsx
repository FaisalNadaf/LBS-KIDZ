import { useId, useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

export type AccordionEntry = {
  id?: string
  title: ReactNode
  /** Plain-text version, used for structured data where relevant. */
  body: ReactNode
  meta?: ReactNode
}

/**
 * Accessible disclosure list.
 *
 * Built on real buttons with aria-expanded / aria-controls rather than
 * <details>, so the open state can be driven from outside (a deep link to a
 * specific FAQ, for instance) and only one panel need be open at a time.
 *
 * The open/close animation is `grid-template-rows: 0fr -> 1fr` on a wrapper
 * whose only child is the panel. That animates to the content's natural height
 * without measuring it, without JavaScript, and without the panel ever being
 * removed from the DOM — so the accordion no longer needs an animation library
 * at all, and a screen reader always finds the panel where aria-controls says
 * it is.
 *
 * Two things ride on top of that height change. The answer fades and rises
 * slightly behind it, so the text arrives rather than being uncovered by a
 * moving edge; and an accent rule grows down the left of the open row, which
 * is what marks which question is open when several sit close together.
 */
export function Accordion({
  items,
  className,
  allowMultiple = false,
  defaultOpen,
}: {
  items: AccordionEntry[]
  className?: string
  allowMultiple?: boolean
  defaultOpen?: number
}) {
  const baseId = useId()
  const [open, setOpen] = useState<number[]>(defaultOpen === undefined ? [] : [defaultOpen])

  const toggle = (index: number) => {
    setOpen((current) => {
      const isOpen = current.includes(index)
      if (allowMultiple) {
        return isOpen ? current.filter((i) => i !== index) : [...current, index]
      }
      return isOpen ? [] : [index]
    })
  }

  return (
    <div className={cn('divide-y divide-khadi-300 border-y border-khadi-300', className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index)
        const buttonId = `${baseId}-t-${index}`
        const panelId = `${baseId}-p-${index}`

        return (
          <div key={item.id ?? index} id={item.id} className="relative">
            {/* The open marker. `scale-y` from the top rather than a height, so
                it is one composited transform and stays in step with the panel
                opening above it. */}
            <span
              className={cn(
                'absolute -left-3 top-3 bottom-3 w-0.5 origin-top rounded-full bg-terracotta-500',
                'transition-transform duration-300 ease-out-soft motion-reduce:transition-none',
                isOpen ? 'scale-y-100' : 'scale-y-0',
              )}
              aria-hidden="true"
            />
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-start justify-between gap-5 rounded-md py-4 text-left transition-colors hover:text-terracotta-600 sm:py-5"
              >
                <span className="font-display text-h3 font-semibold leading-snug text-indigo-ink-700 transition-colors group-hover:text-terracotta-700">
                  {item.title}
                </span>
                <span
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-khadi-200 text-ink-600',
                    'transition-[transform,background-color] duration-300 ease-out-soft',
                    'group-hover:bg-terracotta-100 group-hover:text-terracotta-700 motion-reduce:transition-none',
                    isOpen && 'rotate-45',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>

            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out-soft motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="overflow-hidden"
              >
                <div
                  className={cn(
                    'max-w-prose pb-5 text-body text-ink-500',
                    'transition-[opacity,transform] duration-300 ease-out-soft motion-reduce:transition-none',
                    isOpen ? 'translate-y-0 opacity-100 delay-75' : '-translate-y-1 opacity-0',
                  )}
                >
                  {item.body}
                  {item.meta ? <div className="mt-3">{item.meta}</div> : null}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
