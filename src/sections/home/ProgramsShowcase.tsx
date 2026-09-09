import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { EASE } from '@/animations/motion'
import { cn } from '@/lib/cn'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { ButtonLink, TextLink } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Card'
import { Photo } from '@/components/media/Photo'
import { Reveal } from '@/animations/Reveal'
import { Grain } from '@/components/art/primitives'
import { programs } from '@/data/admissions'
import { routes } from '@/data/routes'
import type { PhotoName } from '@/data/media'

/* ==========================================================================
   6. Programs / age groups

   Layout: a cluster of four diamonds beside a panel that changes with them.
   Each diamond is one class; picking one — by click, by keyboard, or by
   waiting — swaps the panel to that class.

   WHY A DIAMOND CLUSTER RATHER THAN FOUR TILES. The four classes are a
   sequence, not a menu, and a row of four equal cards says the opposite: it
   invites you to compare rather than to read one. One panel at a time puts a
   single class in front of the reader with room for what it actually covers,
   and the cluster keeps the other three visible so the sequence is never
   hidden behind a control.

   HOW THE DIAMONDS ARE BUILT. A 2x2 grid rotated 45 degrees, not four
   individually rotated and hand-positioned boxes. Rotating the grid means the
   browser keeps the four tiles the same size and evenly spaced at every
   breakpoint, and the gap between them stays a gap rather than four numbers
   that have to be re-tuned whenever the container changes width. The grid is
   sized to 1/sqrt(2) of its square container so that its rotated bounding box
   lands exactly on the container's edges.

   Inside each tile the photograph is counter-rotated back to upright and
   scaled by sqrt(2), which is the smallest scale at which an axis-aligned
   rectangle still covers the rotated square clipping it.

   DOM ORDER IS THE READING ORDER, NOT THE VISUAL ONE. Rotation moves the grid
   cells: the top-left cell ends up at the top, the bottom-left at the left.
   Left to its own devices that would make the tab order Nursery, UKG,
   Playgroup, LKG — the classes shuffled. So each tile is placed explicitly and
   the markup stays in the order a parent thinks in, Playgroup through UKG,
   which is the order the arrow keys walk and a screen reader announces.
   ========================================================================== */

/**
 * One photograph per class, graded by age and by what that year is actually
 * doing: a toddler for Playgroup, floor play with a sorting tray for Nursery,
 * painting for LKG, drawing at a table for UKG. The youngest child in the
 * cluster is in the first tile and the oldest in the last, which is the same
 * order the panel reads in.
 *
 * NONE OF THEM CARRIES ANOTHER SCHOOL'S BADGE. The first set here used
 * `letter-board` and `counting-frame`, both of which show a chest badge and, in
 * one case, a child's ID card on a lanyard. On a preschool's own site that
 * reads as this school's students in this school's uniform, which is the
 * overclaim the photography rule exists to prevent, and the mark belongs to
 * somebody else. See docs/decisions-and-todos.md item C-04; the same swap is
 * still owed on several other pages.
 *
 * TWO OF THE FOUR ARE INDIAN CHILDREN AND TWO ARE NOT, which is a compromise
 * rather than a choice. The library's Indian school photography is all from one
 * shoot and all of it carries that badge; the unbranded classroom photography
 * available to license is European. Fixing this properly means commissioning or
 * sourcing Indian classroom photography without third-party branding.
 */
const programPhotos: Record<string, PhotoName> = {
  playgroup: 'toddler-focused',
  nursery: 'class-sorting-play',
  lkg: 'craft-outdoors',
  ukg: 'class-drawing-table',
}

/**
 * A ZIGZAG, NOT A ROSETTE, and that is the correction this arrangement exists
 * to make. Four diamonds evenly spaced around a centre — which is what the
 * previous pass built, in pursuit of identical gaps — produce a rhombus: one
 * tile at the top, one at the foot, two level in the middle. The drawing is a
 * staircase: Nursery at the top right, then down-left, down-right, down-left,
 * so the four read as a bolt running down the column.
 *
 * A STAIRCASE: Nursery top right, then down-left to Playgroup, down-right to
 * UKG, down-left to LKG. Four rungs, two columns, reading as a bolt down the
 * page.
 *
 * This has been round the houses — an eyeballed stagger with uneven gaps, an
 * idealised ellipse, a symmetrical rosette, this staircase, back to the rosette
 * with Playgroup and UKG level, and back here against a drawing that plainly
 * shows UKG below Playgroup. Recorded so nobody re-derives the rosette from a
 * half-remembered instruction: the staircase is the end state, and the level
 * pair was the version that got corrected.
 *
 * EVERY GAP IS THE SAME, and one number sets them all. A square turned 45
 * degrees is an L1 ball of radius h = TILE/sqrt(2), and two of them touch when
 * their centres satisfy |dx| + |dy| = 2h. Make the step across equal the step
 * down and every pair in the cluster — the three diagonal neighbours and the
 * two vertical ones — lands at the same multiple of that. Both steps are 1.09h,
 * so the whole cluster sits 9% clear of contact, which is 17px of daylight
 * between facing edges at the size this renders. It was 6% and 11px, which read
 * as slightly cramped.
 *
 * THE SECOND ROW IS SLID UP AND TO THE RIGHT by half an h, which closes the
 * cluster through its middle and makes it read as one shape rather than two
 * stacked pairs. That direction is not arbitrary: up-and-right is one of the
 * lattice's own diagonals, and a translation along it leaves every L1 distance
 * untouched, because the gain in |dx| is exactly the loss in |dy|. So all five
 * pairs stay at 1.060 whatever the slide — this is the one adjustment here that
 * costs nothing. Lifting the row straight up, by contrast, eats into three of
 * the five and runs out of room by 0.16h.
 *
 * THE CLUSTER IS NOT SQUARE. Four rungs down and two columns across, sheared by
 * the slide, makes it 3.56h by 4.68h. The container carries that aspect rather
 * than staying square and letterboxing the shape inside it. The slide also
 * widens the cluster relative to its height, which is what takes the tiles down
 * from 46.2% of the width to 39.7% — smaller cards, as asked, without touching
 * the spacing.
 */
const TILE = 39.4

/**
 * `x` is a share of the cluster's width and `y` a share of its height. The two
 * are different lengths now that the container is not square, which is also
 * why a tile takes its size from the width alone and is squared by
 * `aspect-square` rather than being given a percentage height.
 */
const SPOT: Record<string, { x: number; y: number }> = {
  nursery: { x: 58.2, y: 21.0 },
  playgroup: { x: 27.9, y: 43.8 },
  ukg: { x: 72.1, y: 56.2 },
  lkg: { x: 41.8, y: 79.0 },
}

/** How long a class holds the panel before the next one takes it. */
const DWELL_MS = 5200

export function ProgramsSection() {
  const [active, setActive] = useState(0)
  /**
   * Auto-advance stops for good the first time someone chooses a class, and
   * pauses while the pointer or the keyboard is inside the cluster.
   *
   * Stopping rather than resuming is the deliberate half. A carousel that
   * takes the panel back a few seconds after a reader deliberately picked
   * something is the single most irritating thing this pattern does, and it is
   * worse here than usual because the panel is the content: the reader is
   * mid-sentence when it changes under them.
   */
  const [taken, setTaken] = useState(false)
  const [paused, setPaused] = useState(false)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (taken || paused) return
    // Auto-advance is motion, and a reader who has asked for less of it gets
    // the first class and a set of controls, which is the whole section minus
    // the part that moves on its own.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(
      () => setActive((i) => (i + 1) % programs.length),
      DWELL_MS,
    )
    return () => window.clearInterval(id)
  }, [taken, paused])

  const choose = useCallback((i: number) => {
    setActive(i)
    setTaken(true)
  }, [])

  /** Arrow keys move between classes, which is what a tablist owes a keyboard. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = (active + delta + programs.length) % programs.length
    choose(next)
    tabsRef.current[next]?.focus()
  }

  const current = programs[active]

  return (
    <Section
      tone="khadi"
      id="programs"
      ambient="warm"
      labelledBy="programs-title"
      /* Content is vertically centred in a full-screen band, so it does not
         sit below the top padding the standard objects occupy — it rides up
         into it. `'centred'` puts them in the foot of the band instead, the
         same answer the positioning band takes. */
      decor="centred"
      className="lg:flex lg:min-h-screen lg:items-center" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}
    >
      <Container size="wide">
        <div className="grid items-center gap-block lg:grid-cols-12 lg:gap-14">
          {/* ---- The cluster ---- */}
          <Reveal className="lg:col-span-6 lg:order-1">
            <div
              className="relative mx-auto aspect-[359/477] w-full max-w-[19rem] sm:max-w-[25rem] lg:max-w-[30rem]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
              <div role="tablist" aria-label="Classes" onKeyDown={onKeyDown} className="contents">
                {programs.map((program, i) => {
                  const on = i === active
                  const spot = SPOT[program.slug]
                  return (
                    <button
                      key={program.slug}
                      ref={(el) => {
                        tabsRef.current[i] = el
                      }}
                      type="button"
                      role="tab"
                      id={`class-tab-${program.slug}`}
                      aria-selected={on}
                      aria-controls="class-panel"
                      tabIndex={on ? 0 : -1}
                      onClick={() => choose(i)}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${TILE}%` }}
                      className={cn(
                        'group absolute aspect-square -translate-x-1/2 -translate-y-1/2 rotate-45 overflow-hidden',
                        'rounded-[1.5rem] sm:rounded-[2rem]',
                        'transition-[transform,box-shadow] duration-[360ms] ease-out-soft',
                        /* The tiles overlap, so each one needs a rim of the
                           band's own colour to read as a separate card rather
                           than as one continuous shape. */
/* One rim on every tile, identical but for colour, so the
                           gaps stay the same width whichever class is chosen.
                           The inner line of the selected tile's double border is
                           a child element rather than an inset shadow: `ring`
                           and `shadow` are both box-shadows, so an arbitrary
                           inset would have replaced the drop shadow outright,
                           and `ring-offset` would have made the chosen tile
                           physically larger and eaten into its own gaps. */
                        'ring-[7px] sm:ring-8',
                        on
                          ? 'z-20 shadow-lift ring-terracotta-500'
                          : 'z-10 shadow-soft ring-khadi-100 hover:z-20 hover:ring-khadi-300 hover:shadow-lift',
                        'motion-reduce:transition-none motion-reduce:hover:scale-100',
                        'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-indigo-ink-600',
                      )}
                    >
{/* The inner half of the double border. */}
                      {on ? (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border-[3px] border-khadi-50"
                        />
                      ) : null}

                      {/* Upright again, and grown by sqrt(2) so the picture
                          still covers the corners of the turned square. */}
                      <span className="absolute inset-0 -rotate-45 scale-[1.42]">
                        <Photo
                          name={programPhotos[program.slug]}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 16vw, 42vw"
                          imgClassName="transition-transform duration-[520ms] ease-out-soft group-hover:scale-[1.06] motion-reduce:transition-none"
                        />
                      </span>

                      {/* No tint over the photograph. The label sits on a solid
                          chip that carries its own contrast, so a scrim would
                          only be dulling four pictures to no purpose. The
                          chosen class is marked by scale, shadow and the chip's
                          colour instead. */}
{/* The label rides the diamond's lower-right edge rather than
                          sitting in the middle of it, which is both what the
                          reference draws and the only place it does not land on
                          a child's face.

                          Three rotations stack to get there and they are easier
                          to read from the outside in: the tile is turned +45,
                          this layer takes it back to upright so the offset can
                          be reasoned about in screen terms, and the chip itself
                          is turned -45 so it finishes parallel to the edge it
                          sits against, reading up to the right. Placed at 76%
                          on both axes, which is far enough out to clear the
                          middle of the picture and still inside the shape. */}
                      <span className="absolute inset-0 -rotate-45">
                        <span
                          className={cn(
                            'absolute left-[72%] top-[72%] -translate-x-1/2 -translate-y-1/2 -rotate-45 whitespace-nowrap',
                            'rounded-full px-3 py-1.5 text-2xs font-semibold uppercase tracking-[0.14em] shadow-soft transition-colors duration-[360ms] sm:px-4 sm:text-xs',
                            on
                              ? 'bg-terracotta-600 text-khadi-50'
                              : 'bg-khadi-50 text-indigo-ink-700',
                          )}
                        >
                          {program.name}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* ---- The panel ---- */}
          <div className="lg:col-span-6 lg:order-2">
            <SectionHeader
              id="programs-title"
              eyebrow="Programs & classes"
              title="Four classes, one continuous idea"
              standfirst="The same values run through every class. Only the complexity and the expected independence change."
            />

            {/* Keyed on the class, so React replaces the subtree on every
                change instead of the text swapping in place.

                `AnimatePresence` with `mode="wait"` is the reason this is
                Motion rather than the CSS keyframe it replaced: a keyframe can
                only animate the panel arriving, because by the time it would
                run React has already removed the old one. Waiting for the
                outgoing panel to leave before the incoming one enters is what
                turns a swap into a transition — and it matters here because the
                panel changes itself every five seconds, unprompted.

                `id`, `role` and `aria-labelledby` stay on the animated element
                so the tab's `aria-controls` always points at something present
                in the DOM. */}
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                id="class-panel"
                role="tabpanel"
                aria-labelledby={`class-tab-${current.slug}`}
                key={current.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: EASE.out }}
                className="mt-8"
              >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-h2 font-semibold text-indigo-ink-700">
                  {current.name}
                </h3>
                {current.ncertBand ? <Chip tone="accent">{current.ncertBand}</Chip> : null}
              </div>

              {current.ncertAge ? (
                <p className="mt-2 text-small font-medium text-ink-400">{current.ncertAge}</p>
              ) : null}

              <p className="mt-4 max-w-prose text-body leading-relaxed text-ink-500">
                {current.blurb}
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {current.focus.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-small leading-relaxed text-ink-600"
                  >
                    <Grain className="mt-1.5 shrink-0 text-terracotta-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink to={`${routes.programs}#${current.slug}`} variant="outline" withArrow>
                  Inside {current.name}
                </ButtonLink>
                <TextLink to={routes.programs}>Every class in detail</TextLink>
              </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

      </Container>
    </Section>
  )
}
