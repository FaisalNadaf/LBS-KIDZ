import { cn } from '@/lib/cn'
import { WheatStalk } from './primitives'

/**
 * Composed illustration.
 *
 * This file used to hold five drawn scenes with children in them — a courtyard,
 * a circle time, an activity corner, a reflection and a child at work. They
 * were the Phase 1 stand-in for photographs that did not exist yet.
 *
 * They are gone because the site now shows real children. Drawing a child
 * beside a photograph of one reads as two different products, and the
 * illustration language earns more by staying where it is genuinely better than
 * a camera: objects, motifs and marks. Those live in `primitives.tsx` and
 * `objects.tsx`.
 *
 * What remains here is the divider, which is composition rather than a scene.
 * See docs/decisions-and-todos.md item C-04.
 */

export function MotifDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 text-khadi-400', className)} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="h-7 text-neem-400">
        <WheatStalk />
      </span>
      <span className="h-px flex-1 bg-current opacity-60" />
    </div>
  )
}
