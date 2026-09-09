/**
 * Ambient video manifest.
 *
 * Short, silent, looping clips used in place of a photograph where motion says
 * something a still cannot — a hand actually choosing a crayon, a room that is
 * busy rather than posed.
 *
 * THE SAME HONESTY RULE AS THE PHOTOGRAPHS, AND IT BINDS HARDER HERE. No clip
 * is captioned, framed or implied as an LBS KidZ campus, classroom, child or
 * educator, and nothing beside one says "our". That rule matters more for video
 * than for stills: motion implies a camera that was present, so a parent reads
 * footage as the school's own far more readily than they read a photograph that
 * way. Anything that could be mistaken for a tour of a campus does not belong
 * here. See docs/decisions-and-todos.md item C-04.
 *
 * WEIGHT. Every clip is trimmed to seven seconds, silent, 960px wide and
 * re-encoded at CRF 30; a WebM is kept only where it actually came out smaller
 * than the MP4, which is why some entries have one and some do not. Provenance
 * for every file is in video-credits.json, the same licence ledger the
 * photographs use.
 */

export type VideoMeta = {
  width: number
  height: number
  /** Seconds. Used only for documentation — nothing reads it at runtime. */
  duration: number
  /** Formats present on disk, best-compressed first. */
  formats: ('webm' | 'mp4')[]
  /**
   * Describes the clip for anyone who cannot see it, and for the poster frame.
   * Written to the same standard as the photograph alt text: what is happening,
   * never a claim about whose classroom it is.
   */
  alt: string
}

export const videos = {
  'child-coloring': {
    width: 960,
    height: 540,
    duration: 7,
    formats: ['webm', 'mp4'],
    alt: 'A young child colouring a drawing with crayons at a wooden table',
  },
  'child-painting': {
    width: 960,
    height: 540,
    duration: 7,
    formats: ['webm', 'mp4'],
    alt: 'A young child painting on paper with bright colours',
  },
  'children-classroom-play': {
    width: 960,
    height: 540,
    duration: 7,
    formats: ['mp4'],
    alt: 'Children playing together with toys in a bright classroom',
  },
  'children-schoolwork': {
    width: 960,
    height: 540,
    duration: 7,
    formats: ['mp4'],
    alt: 'Children working at a table on early writing and drawing',
  },
} as const satisfies Record<string, VideoMeta>

export type VideoName = keyof typeof videos
