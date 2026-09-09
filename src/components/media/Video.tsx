import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { videos, type VideoName } from '@/data/video'
import { shapeClasses, type PhotoShape } from './Photo'

/**
 * Ambient video.
 *
 * A short silent loop standing where a photograph would, in the same house
 * silhouettes and with the same colour surround. It is decoration with a job:
 * a still of a child colouring says the activity exists, and seven seconds of a
 * hand choosing the next crayon says what the day is actually like.
 *
 * FOUR THINGS THIS WILL NOT DO, each of which is the usual way a background
 * video ruins a page.
 *
 * It will not download until it is needed. `preload="none"` plus a poster frame
 * means the page costs one JPEG until the clip is on screen; the src is only
 * attached once an IntersectionObserver says the element is visible. A hero
 * video that downloads on load is the single most expensive mistake available
 * here, and this site currently ships 40KB of gzipped JavaScript.
 *
 * It will not play when the reader has asked for stillness. `prefers-reduced-
 * motion` is honoured by never starting playback at all, leaving the poster —
 * which is a real photograph, not a blank box. The same check covers
 * `Save-Data` and the coarse "slow connection" hints, where an autoplaying loop
 * is somebody's mobile allowance.
 *
 * It will not play off screen. The observer pauses on the way out as well as
 * playing on the way in, so a page with four of these is never decoding four
 * videos at once.
 *
 * And it makes no sound, ever. `muted` is not a default here, it is the whole
 * design: it is also what lets `autoPlay` work at all, since no browser will
 * autoplay audio.
 *
 * WHAT IT IS NOT ALLOWED TO IMPLY. The clips are licensed stock, and like every
 * photograph on this site none of them is an LBS KidZ campus, class or child.
 * Nothing beside one may say "our". See src/data/video.ts.
 */

const VIDEO_BASE = '/videos'

/** MIME types, in the order the manifest lists formats. */
const mimeFor = { webm: 'video/webm', mp4: 'video/mp4' } as const

/**
 * Whether this reader should get motion at all.
 *
 * Read once on mount rather than subscribed to: a loop that starts and stops as
 * someone toggles an OS setting mid-visit is a worse experience than one that
 * settles on the answer it had when the page opened.
 */
function useWantsMotion() {
  const [wants, setWants] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // `connection` is Chromium-only, so every part of this is optional.
    const c = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
    ).connection
    if (c?.saveData) return
    if (c?.effectiveType && ['slow-2g', '2g', '3g'].includes(c.effectiveType)) return

    setWants(true)
  }, [])

  return wants
}

export function AmbientVideo({
  name,
  shape = 'rounded',
  className,
  alt,
  ratio,
  ratioClassName,
  focus,
}: {
  name: VideoName
  shape?: PhotoShape
  className?: string
  /** Overrides the manifest's description. */
  alt?: string
  /** CSS aspect-ratio for the frame. Defaults to the clip's own. */
  ratio?: string
  /** Per-breakpoint ratio, as Tailwind classes. Takes precedence over `ratio`. */
  ratioClassName?: string
  /** object-position, for when the subject is not centred. */
  focus?: string
}) {
  const meta = videos[name]
  const ref = useRef<HTMLVideoElement>(null)
  const wantsMotion = useWantsMotion()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!wantsMotion) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          // `play()` rejects if the element is detached or the tab is hidden.
          // Nothing to recover here — the poster is already the right fallback.
          void el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '200px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [wantsMotion])

  const poster = `${VIDEO_BASE}/${name}.jpg`

  return (
    <span
      className={cn(
        'relative block overflow-hidden',
        shapeClasses[shape],
        ratioClassName,
        className,
      )}
      style={{
        aspectRatio: ratioClassName ? undefined : (ratio ?? `${meta.width} / ${meta.height}`),
      }}
    >
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={wantsMotion}
        preload="none"
        // A silent decorative loop is not content anyone needs announced, and
        // the poster carries the description for anyone who does look.
        aria-label={alt ?? meta.alt}
        className={cn(
          'absolute inset-0 size-full object-cover',
          focus ? undefined : 'object-center',
        )}
        style={focus ? { objectPosition: focus } : undefined}
      >
        {/* Sources are attached only once the clip is near the viewport, so an
            off-screen video costs its poster and nothing else. */}
        {active
          ? meta.formats.map((format) => (
              <source
                key={format}
                src={`${VIDEO_BASE}/${name}.${format}`}
                type={mimeFor[format]}
              />
            ))
          : null}
      </video>
    </span>
  )
}

/**
 * An ambient clip inside a solid shape of colour, matching `PhotoOnColour`'s
 * `ring` treatment so a video and a photograph in the same band read as the
 * same object.
 */
export function VideoOnColour({
  colour = 'haldi',
  shape = 'rounded',
  className,
  ...video
}: Parameters<typeof AmbientVideo>[0] & {
  colour?: 'haldi' | 'neem' | 'terracotta' | 'indigo' | 'khadi'
}) {
  const surround = {
    haldi: 'bg-haldi-400',
    neem: 'bg-neem-400',
    terracotta: 'bg-terracotta-400',
    indigo: 'bg-indigo-ink-400',
    khadi: 'bg-khadi-500',
  }

  return (
    <div className={cn('p-3 sm:p-5', shapeClasses[shape], surround[colour], className)}>
      <AmbientVideo {...video} shape={shape} className="shadow-photo" />
    </div>
  )
}
