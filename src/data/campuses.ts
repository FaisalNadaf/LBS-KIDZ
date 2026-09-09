import { SITE_PHASE } from './site'
import type { PhotoName } from './media'

/**
 * Campuses.
 *
 * Phase 1 shows zone-level information only ("Launching Soon in Indore").
 * Real addresses, photos and maps arrive in Phase 2, in the same nav slot and
 * at the same URL throughout.
 * Source: Full Website Sitemap S1.1 / S1.2; Website Reference Document S5.1;
 * Project Decisions Log S4.
 *
 * Overclaiming infrastructure or campus experience before it is real is on the
 * explicit "deliberately avoid" list.
 * Source: Global & Indian Preschool Research S6.
 */

export type Zone = {
  slug: string
  name: string
  /** The local search term this zone is meant to be found through. */
  keyword: string
  confirmed: boolean
  /**
   * The locality's own coordinates, from OpenStreetMap.
   *
   * NOT a campus address, and the difference matters. No campus has one yet —
   * `site.address` is still `pending` and this file's own note says real
   * addresses arrive in Phase 2. What these point at is the zone: the part of
   * Indore we are opening in, which is exactly what the page says it is naming.
   * A map and a directions link built on them send a reader to the area, which
   * is true, rather than to a building that does not exist, which would not be.
   */
  coords: { lat: number; lon: number }
  /** How OpenStreetMap describes the locality. Sourced, not composed. */
  area: string
  /**
   * The picture on the card. One each, never shared.
   *
   * These are photographs of Indore, not of the zone. No usable photograph of
   * Kanadia Road, Rau or Bicholi Mardana exists, and a street captioned with a
   * locality name would invent the one thing this page refuses to. The caption
   * under each says which part of Indore it actually is, which doubles as the
   * attribution these CC BY images require.
   */
  photo: PhotoName
  /** Shown under the picture. Says what the photo is, and credits it. */
  photoCredit: string
}

/**
 * The locked location zones named in the source documents. The sitemap says to
 * "extend to all confirmed zones as campuses open", so this list grows here.
 * Source: Full Website Sitemap S3; Keyword & AEO Strategy S8.
 */
export const zones: Zone[] = [
  {
    slug: 'kanadia-road',
    name: 'Kanadia Road',
    keyword: 'Preschool in Kanadia Road',
    confirmed: true,
    coords: { lat: 22.7211102, lon: 75.9142125 },
    area: 'Juni Indore, Indore 452001',
    photo: 'indore-skyline',
    photoCredit: 'Indore skyline · John Hoey · CC BY 2.0',
  },
  {
    slug: 'rau',
    name: 'Rau',
    keyword: 'Preschool in Rau',
    confirmed: true,
    coords: { lat: 22.6336511, lon: 75.8051046 },
    area: 'Rau Tahsil, Indore 453331',
    photo: 'indore-lake',
    photoCredit: 'Regional Park lake, Indore · Sonika Dhakad · CC BY-SA 4.0',
  },
  {
    slug: 'bicholi-mardana',
    name: 'Bicholi Mardana',
    keyword: 'Preschool in Bicholi Mardana',
    confirmed: true,
    coords: { lat: 22.6961998, lon: 75.9285621 },
    area: 'Bicholi Mardana, Indore Bypass',
    photo: 'indore-street',
    photoCredit: 'Subhash Marg, Indore · Kprateek88 · CC BY-SA 3.0',
  },
]

/** Google Maps, centred on the zone. Opens in the reader's own maps app. */
export const zoneDirectionsUrl = (zone: Zone) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${zone.name}, Indore, Madhya Pradesh`,
  )}`

/**
 * An OpenStreetMap embed for the zone.
 *
 * OSM rather than a Google Maps iframe because the Google embed needs an API
 * key, and adding a keyed third-party dependency to show three static points is
 * a cost this page does not need to carry.
 *
 * NO `marker` PARAMETER. OSM draws its own teardrop when you pass one, and the
 * card draws a pulsing pin of its own at the centre of the frame — which
 * produced two markers a few pixels apart, one of them inert. The box below is
 * centred on the coordinate, so the card's pin sits exactly on the place and
 * OSM does not need to mark it twice.
 *
 * The box is built from plain numbers joined with commas and handed to
 * `URLSearchParams`, which encodes them once. Encoding them by hand *and*
 * letting the browser encode the result is how one of these came out as a view
 * of the whole world: a double-escaped comma is not a number, OSM could not
 * parse the box, and it fell back to zoom zero.
 */
export const zoneMapEmbedUrl = (zone: Zone) => {
  const { lat, lon } = zone.coords
  // Roughly a kilometre across, which is a neighbourhood rather than a street.
  const dLon = 0.011
  const dLat = 0.006
  const params = new URLSearchParams({
    bbox: [lon - dLon, lat - dLat, lon + dLon, lat + dLat].join(','),
    layer: 'mapnik',
  })
  return `https://www.openstreetmap.org/export/embed.html?${params}`
}

export const campusPhaseState = {
  phase1Headline: 'Launching Soon in Indore',
  phase1Body:
    'Our first campuses are being prepared across Indore. We are naming the zones we are opening in now, and we will publish each campus address, its photographs and its map the day it is ready. Until then we would rather tell you where we are coming than describe a building you cannot visit.',
  isPhase1: SITE_PHASE === 1,
}

/**
 * Safety and infrastructure standards.
 *
 * Transcribed from NCERT Curriculum Summary S7, which draws them from the
 * NCERT Guidelines for Preschool Education, Chapter 6, and says they are
 * "usable directly as real website content ... rather than generic safety
 * claims".
 *
 * PHASE FRAMING: the parity-layer table places a dedicated Safety & Well-being
 * section on the Campuses page in Phase 2. In Phase 1 these are presented as
 * the standards our campuses are being built to, which is a commitment rather
 * than a claim about a building a parent could visit today.
 * See docs/decisions-and-todos.md item C-03.
 */
export const safetyStandards: { group: string; items: string[] }[] = [
  {
    group: 'Inside the classroom',
    items: [
      'Classrooms free from clutter, obstacles, slippery floors or rumpled durries, on even flooring.',
      'Child-friendly furniture with no sharp edges. Nails, screws and edges checked periodically.',
      'No self-locking doors or latches. Any latch is placed beyond a child’s reach.',
      'Mesh on all windows, with no broken glass or loose fittings.',
      'Play materials free of small or loose parts that could be swallowed. Non-toxic paint and materials only.',
    ],
  },
  {
    group: 'Outside and around the building',
    items: [
      'Outdoor play areas free of sharp objects, harmful plants, stray animals and discarded materials.',
      'A boundary wall with a lockable gate, so neither a stranger nor an animal can walk in.',
      'No open drains, high-tension wires or water bodies on or near the premises.',
    ],
  },
  {
    group: 'Checked, not assumed',
    items: [
      'Daily inspection of indoor and outdoor areas for hazards: sharp objects, insect nests, poisonous plants.',
      'Regular safety checks of electrical fittings, with sockets installed beyond a child’s reach.',
      'Cleaners, flammables and other hazardous materials stored in their original containers, out of reach.',
    ],
  },
]

/** Source: NCERT Curriculum Summary S7, closing note. */
export const ptrNote =
  'Pupil-teacher ratio matters more in the early years than later on, and a lower ratio is linked to better engagement and better outcomes. It should never be reached by hiring underqualified or under-trained staff to hit a number.'

/**
 * Classroom environment. Source: Global & Indian Preschool Research S3, which
 * records the already-locked classroom design (themed learning walls, activity
 * corners) and validates describing it through EtonHouse's framing of the
 * environment as the third educator.
 */
export const classroomEnvironment = {
  headline: 'The room is part of the teaching',
  body:
    'Themed learning walls and activity corners are part of our classroom design, not decoration added afterwards. A child choosing which corner to go to is already making a decision about their own learning.',
  sourceNote:
    'Following the principle, drawn from Reggio Emilia influenced practice, that the environment itself teaches. Source: Global & Indian Preschool Research, Section 3.',
}
