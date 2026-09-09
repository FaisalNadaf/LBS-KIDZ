import { m } from 'framer-motion'
import { ArrowUpRight, MapPin, Navigation } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Photo } from '@/components/media/Photo'
import { Chip } from '@/components/ui/Card'
import { LiveDot } from '@/animations/interactions'
import { EASE } from '@/animations/motion'
import { usePrefersReducedMotion } from '@/hooks'
import { zoneDirectionsUrl, zoneMapEmbedUrl, type Zone } from '@/data/campuses'

/**
 * One zone, as a location card.
 *
 * WHAT THIS CARD MAY AND MAY NOT CLAIM. No campus has an address yet — the
 * site's own `address` is `pending` and the band above this one promises the
 * address, the photographs and the map "the day it is ready". So everything
 * here is about the *zone*: the coordinates are the locality's, from
 * OpenStreetMap; the map is centred on the locality; the directions link
 * searches for the locality. The card says so in as many words, because a
 * location card that looks like a campus listing and is not one is worse than
 * no card at all.
 *
 * THE PHOTOGRAPH IS OF INDORE, NOT OF THE ZONE, and the caption under it says
 * so. There is no usable photograph of Kanadia Road, Rau or Bicholi Mardana on
 * Commons — two return nothing at all — so a street captioned with a locality
 * name would be inventing the one thing this page refuses to. Three different
 * real photographs of the city instead, each named in the line beneath it.
 *
 * THE MAPS ARE JUST THERE. They were behind a "show the map" button, which is
 * an extra decision asked of every reader to save a load most of them wanted
 * anyway, and two cards out of three sat as blank panels until touched.
 * `loading="lazy"` keeps the cost off the initial page: the browser fetches
 * each frame as it nears the viewport, which is the same saving without the
 * click.
 */
export function ZoneCard({ zone, index }: { zone: Zone; index: number }) {
  const reduced = usePrefersReducedMotion()
  const accent = ACCENTS[index % ACCENTS.length]

  return (
    <m.article
      className={cn(
        'group/zone relative isolate flex h-full flex-col overflow-hidden ring-1 shadow-card',
        'transition-[box-shadow,transform] duration-300 ease-out-soft',
        'hover:-translate-y-1.5 hover:shadow-lift',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        accent.shape,
        accent.card,
        accent.ring,
      )}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: EASE.out, delay: index * 0.08 }}
    >
      {/* A blurred bloom of the card's own colour, so the ground under the
          text is lit rather than flat. `isolate` on the card keeps the `-z-10`
          inside it instead of dropping it behind the section. */}
      <span
        className={cn(
          'pointer-events-none absolute -right-16 top-1/3 -z-10 size-56 rounded-full blur-3xl',
          accent.bloom,
        )}
        aria-hidden="true"
      />

      {/* ---- Top: the picture ---- */}
      <div className={cn('relative aspect-[16/10] overflow-hidden', accent.photoShape)}>
        <Photo
          name={zone.photo}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          className="size-full"
          imgClassName={cn(
            'transition-transform duration-700 ease-out-soft group-hover/zone:scale-[1.06]',
            'motion-reduce:transition-none motion-reduce:group-hover/zone:scale-100',
          )}
        />
        {/* A foot of shade, so the chip reads whatever the picture is doing. */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-indigo-ink-800/70 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute bottom-3 left-4">
          <Chip tone="onDark" className="whitespace-nowrap">
            <LiveDot tone="terracotta" />
            In preparation
          </Chip>
        </span>
      </div>

      {/* What the picture actually is. Two jobs in one line: it stops a photo
          of Indore being read as a photo of this zone, and it carries the
          attribution these CC BY images require. */}
      <p className="border-b border-khadi-200 px-6 py-2 text-2xs leading-relaxed text-ink-400">
        {zone.photoCredit}
      </p>

      {/* ---- Middle: the place ---- */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <span
            className={cn('mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl', accent.chip)}
            aria-hidden="true"
          >
            <MapPin className="size-5" strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-h3 font-semibold leading-tight text-indigo-ink-700">
              {zone.name}
            </h3>
            <p className="mt-1 text-sm text-ink-400">{zone.area}</p>
          </div>
        </div>

        <p className="mt-4 text-body text-ink-500">
          A campus is planned for this zone. Register your interest and we will tell you the moment
          admissions open here.
        </p>

        <p className="mt-3 text-2xs leading-relaxed text-ink-400">
          The map shows the zone, not a campus address. Each campus gets its own address and map the
          day it opens.
        </p>

        <a
          href={zoneDirectionsUrl(zone)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group/dir mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-full px-5 text-sm font-semibold',
            'transition-[background-color,transform] duration-200 ease-out-soft',
            'hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2',
            'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
            accent.button,
          )}
        >
          <Navigation className="size-4" strokeWidth={2} aria-hidden="true" />
          Get directions
          <ArrowUpRight
            className="size-4 transition-transform duration-200 ease-out-soft group-hover/dir:translate-x-0.5 group-hover/dir:-translate-y-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
          <span className="sr-only">to {zone.name}, Indore, in Google Maps (opens a new tab)</span>
        </a>
      </div>

      {/* ---- Bottom: the map ---- */}
      <div className={cn('relative mt-auto h-56 border-t bg-khadi-200', accent.mapEdge)}>
        <iframe
          title={`Map of ${zone.name}, Indore`}
          src={zoneMapEmbedUrl(zone)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />

        {/* The only pin on the map. OSM's own `marker` parameter is not used —
            see `zoneMapEmbedUrl` — so this one is the marker rather than a
            second one sitting next to it, and the box is centred on the
            coordinate so it lands on the place. */}
        {(
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center"
            aria-hidden="true"
          >
            <span className="absolute size-8 rounded-full bg-terracotta-500/30 motion-safe:animate-ping" />
            <span className="relative grid size-6 place-items-center rounded-full bg-terracotta-600 text-khadi-50 shadow-lift ring-2 ring-khadi-50">
              <MapPin className="size-3.5" strokeWidth={2.4} />
            </span>
          </span>
        )}
      </div>
    </m.article>
  )
}

/**
 * Three cards, three silhouettes, three colours.
 *
 * The copy in these cards is identical word for word — it has to be, because
 * the same thing is true of all three zones — so everything that tells them
 * apart has to be visual. Each gets its own squared corner, its own tinted
 * ground and its own bloom, and the picture's corners follow the card's so the
 * two read as one object rather than a photograph laid on a panel.
 */
const ACCENTS = [
  {
    shape: 'rounded-[2rem] rounded-tl-md',
    photoShape: 'rounded-tl-md',
    card: 'bg-linear-to-b from-terracotta-50/80 to-khadi-50',
    ring: 'ring-terracotta-200/70',
    bloom: 'bg-terracotta-200/40',
    chip: 'bg-terracotta-100 text-terracotta-700',
    button: 'bg-terracotta-600 text-khadi-50 hover:bg-terracotta-700',
    mapEdge: 'border-terracotta-200/70',
  },
  {
    shape: 'rounded-[2rem] rounded-tr-md',
    photoShape: 'rounded-tr-md',
    card: 'bg-linear-to-b from-haldi-100/70 to-khadi-50',
    ring: 'ring-haldi-200/70',
    bloom: 'bg-haldi-200/45',
    chip: 'bg-haldi-100 text-haldi-600',
    button: 'bg-indigo-ink-700 text-khadi-50 hover:bg-indigo-ink-600',
    mapEdge: 'border-haldi-200/70',
  },
  {
    shape: 'rounded-[2rem] rounded-bl-md',
    photoShape: '',
    card: 'bg-linear-to-b from-neem-100/70 to-khadi-50',
    ring: 'ring-neem-200/70',
    bloom: 'bg-neem-200/45',
    chip: 'bg-neem-100 text-neem-600',
    button: 'bg-neem-500 text-khadi-50 hover:bg-neem-600',
    mapEdge: 'border-neem-200/70',
  },
]
