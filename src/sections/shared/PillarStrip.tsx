import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { cn } from '@/lib/cn'
import { simplePillars } from '@/data/brand-framework'
import { routes } from '@/data/routes'
import { RevealItem } from '@/animations/Reveal'
import { useTilt } from '@/animations/interactions'

/**
 * The six SIMPLE pillars as an acronym, and nothing more.
 *
 * WHY THIS EXISTS. The pillars were being printed in full in four places: the
 * homepage, the Legacy page, the LBS Way page, and again lower down the LBS Way
 * page. All four repeated the same six names and the same six summaries, so a
 * reader moving through the site met the identical six paragraphs four times —
 * and the fourth was worse than repetition, because it padded each row with the
 * same placeholder caption six times over.
 *
 * The pillars now appear in full exactly once, on the LBS Way page, which is
 * the page whose subject they are. This is what stands in for them elsewhere.
 *
 * `showNames` is the difference between the two jobs it does. With names, it is
 * a compact index of the six: right on a page that has not introduced them and
 * is sending the reader somewhere that will. Without names it is purely the
 * word being spelled, S to E, which is what the Legacy page needs — that
 * section is about a life becoming an acronym, and printing the six names there
 * as well would be the third time a reader had met the same list.
 *
 * Either way it is the only place on the site where the letters are legible
 * *as* a word. Six paragraph cards bury the acronym they spell; six tiles in a
 * row are the acronym.
 */
/** Letter to pillar name, for the screen-reader text when names are hidden. */
const LETTER_NAMES: Record<string, string> = Object.fromEntries(
  simplePillars.map((p) => [p.letter, p.name]),
)

export function PillarStrip({
  className,
  tone = 'light',
  /** Set false where the surrounding section already links onward. */
  withLink = true,
  /**
   * Set false to show the letters alone. Use it anywhere the six names appear
   * again within a screen or two, which on this site means the Legacy page.
   */
  showNames = true,
}: {
  className?: string
  tone?: 'light' | 'dark'
  withLink?: boolean
  showNames?: boolean
}) {
  const onDark = tone === 'dark'

  return (
    <div className={className}>
      <ul className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:grid-cols-6">
        {simplePillars.map((pillar) => (
          <RevealItem as="li" key={pillar.name} tier="quiet" direction="rise" distance={14}>
            <PillarTile
              letter={pillar.letter}
              name={showNames ? pillar.name : undefined}
              onDark={onDark}
            />
          </RevealItem>
        ))}
      </ul>

      {withLink ? (
        <p
          className={cn(
            'mt-5 text-small',
            onDark ? 'text-mist-300/80' : 'text-ink-400',
          )}
        >
          <Link
            to={routes.lbsWay}
            className={cn(
              'font-semibold underline underline-offset-4 transition-colors',
              onDark
                ? 'text-orange-300 hover:text-orange-200'
                : 'text-brand-500 hover:text-sky-600',
            )}
          >
            What each pillar means
          </Link>
          , and how it reaches a child&rsquo;s day.
        </p>
      ) : null}
    </div>
  )
}

/**
 * One tile.
 *
 * The letter is the object and the name is its label, which is the opposite
 * weighting to the full cards on the LBS Way page — there the name leads and
 * the letter is a small marker. Reversing it is what stops this reading as a
 * shrunken copy of that grid.
 */
function PillarTile({
  letter,
  name,
  onDark,
}: {
  letter: string
  /** Omitted where the tile is carrying the acronym rather than the list. */
  name?: string
  onDark: boolean
}) {
  // The same 4.5-degree lean every interactive card on the site uses, so a
  // small tile and a full card answer the pointer identically.
  const tilt = useTilt({ strength: 5, lift: 4 })

  const classes = cn(
    'group/tile flex h-full flex-col items-center justify-center rounded-xl text-center',
    'transition-[background-color,border-color,box-shadow] duration-300 ease-out-soft',
    // Without a name the tile is holding one glyph, so it stops being a card
    // with a label in it and becomes a letter in a word: square, tight, and
    // with the letter big enough to be read as type rather than as an icon.
    name ? 'gap-2 px-2 py-5' : 'aspect-square gap-0 p-2',
    onDark
      ? 'border border-mist-100/12 bg-mist-50/[0.05] hover:border-orange-300/40 hover:bg-mist-50/[0.09]'
      : 'border border-mist-300/70 bg-mist-50 hover:border-brand-300 hover:shadow-card',
  )

  const inner = (
    <>
      <span
        className={cn(
          'font-numeral grid shrink-0 place-items-center rounded-lg font-semibold',
          name ? 'size-11 text-xl' : 'size-14 text-3xl',
          'transition-[background-color,color,transform] duration-300 ease-out-soft',
          'group-hover/tile:-translate-y-0.5 group-hover/tile:scale-105',
          onDark
            ? 'bg-orange-300/15 text-orange-300 group-hover/tile:bg-orange-300 group-hover/tile:text-brand-800'
            : 'bg-brand-50 text-brand-500 group-hover/tile:bg-brand-500 group-hover/tile:text-mist-50',
        )}
        aria-hidden="true"
      >
        {letter}
      </span>
      {name ? (
        <span
          className={cn(
            'font-display text-small font-semibold leading-tight',
            onDark ? 'text-mist-100' : 'text-brand-700',
          )}
        >
          {name}
        </span>
      ) : (
        // The name is still read out, just not drawn: a row of six loose
        // capitals is meaningless to a screen reader, and "S I M P L E" is not
        // what the letters stand for.
        <span className="sr-only">{LETTER_NAMES[letter] ?? letter}</span>
      )}
    </>
  )

  if (!tilt) return <div className={classes}>{inner}</div>

  return (
    <m.div className={classes} {...tilt}>
      {inner}
    </m.div>
  )
}
