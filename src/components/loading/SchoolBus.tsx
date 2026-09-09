/**
 * The school bus that drives across the loading screen.
 *
 * Drawn to the same rules as everything in `components/art/objects.tsx`, which
 * is what stops it reading as clip-art dropped into someone else's website:
 * flat fills, one 1.8px ink outline, round caps and joins, and colours taken
 * only from the site palette. The body is haldi rather than the usual school-bus
 * chrome yellow, the stripe and the bumper are terracotta, and the glass is
 * indigo — so the bus is recognisably a school bus without introducing a hue the
 * design system does not already own.
 *
 * It also follows that file's three-part test for a drawing rather than a
 * pictogram: a second colour (the haldi-400 skirt under the haldi-300 body), one
 * detail only this object has (the roof sign and its two warning lamps), and
 * interior lines at reduced opacity for the panel seams.
 *
 * WHAT THE CSS DRIVES. Three hooks are exposed as classes, and the stylesheet
 * owns all of the motion:
 *
 *   .lbs-bus__wheel   rotated continuously, about a centre set per wheel with
 *                     `transform-box: fill-box`, so both wheels spin about
 *                     their own axle rather than the SVG's origin.
 *   .lbs-bus__glint   the diagonal highlight that travels across the glass.
 *   .lbs-bus__puff    exhaust/dust behind the rear wheel.
 *
 * Nothing here is announced: the bus is decoration, and the loading state is
 * carried by text in `LoadingScreen`.
 */

const ink = 'var(--color-ink-700)'

const stroke = {
  stroke: ink,
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** One wheel. Two of them, so the tyre, hub and spokes are written once. */
function Wheel({ cx }: { cx: number }) {
  return (
    <g>
      {/* Tyre. Drawn as a ring rather than a disc so the hub colour is the
          only thing inside it — a solid dark circle with a small light dot on
          top reads as a button, not a wheel. */}
      <circle cx={cx} cy={117} r={24} fill="var(--color-ink-600)" {...stroke} />
      <circle cx={cx} cy={117} r={14.5} fill="var(--color-khadi-200)" {...stroke} />
      {/* The spokes are the part that makes the rotation legible. Without them
          a circle can spin all day and look stationary. */}
      {/* No `transform-origin` here. The stylesheet spins this group with
          `transform-box: fill-box`, which measures the origin against the
          group's own bounding box — and this group is exactly the spokes and
          the hub, so its centre already is the axle. An origin in user-space
          coordinates fights that: `244px 118px` inside a 30px box put the
          front wheel's spokes 500px away from the bus, orbiting the middle of
          the screen on their own. */}
      <g
        className="lbs-bus__wheel"
        stroke={ink}
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d={`M${cx} 104.5v25`} />
        <path d={`M${cx - 12.5} 117h25`} />
        <path d={`M${cx - 8.8} 108.2l17.6 17.6`} />
        <path d={`M${cx - 8.8} 125.8l17.6-17.6`} />
        <circle cx={cx} cy={117} r={3.6} fill="var(--color-terracotta-500)" strokeWidth="1.4" />
      </g>
    </g>
  )
}

/** A child seen through a window: head, shoulders, nothing else. */
function Passenger({ x, fill }: { x: number; fill: string }) {
  return (
    <g fill={fill} stroke="none">
      <circle cx={x} cy={62} r={7.5} />
      <path d={`M${x - 12} 81c0-7 5.4-12 12-12s12 5 12 12Z`} />
    </g>
  )
}

export function SchoolBus({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 152"
      className={className}
      aria-hidden="true"
      focusable="false"
      /* The drawing overflows its box downward at the wheels and upward at the
         roof sign, and the shadow sits under everything. `visible` keeps all of
         it, since the lane that carries the bus does its own clipping. */
      style={{ overflow: 'visible' }}
    >
      {/* ---- Contact shadow. Travels with the bus, not with the road. ---- */}
      <ellipse cx="160" cy="143" rx="132" ry="7" fill="var(--color-ink-700)" opacity="0.1" />

      {/* ---- Dust behind the rear wheel ---- */}
      <g fill="var(--color-khadi-400)" opacity="0.55">
        <circle className="lbs-bus__puff" cx="30" cy="130" r="6" />
        <circle className="lbs-bus__puff" cx="12" cy="136" r="4.5" />
        <circle className="lbs-bus__puff" cx="46" cy="138" r="3.5" />
      </g>

      <Wheel cx={84} />
      <Wheel cx={244} />

      {/* ---- Roof sign and its two warning lamps. The detail that says
              "school bus" at a glance, and the one thing on this drawing that
              belongs to no other object in the set. ---- */}
      <g {...stroke}>
        <rect x="120" y="16" width="86" height="17" rx="6" fill="var(--color-terracotta-600)" />
        <path
          d="M132 22h44M132 27h30"
          stroke="var(--color-khadi-100)"
          strokeWidth="2.4"
          opacity="0.85"
        />
        <circle cx="112" cy="27" r="5" fill="var(--color-haldi-300)" />
        <circle cx="214" cy="27" r="5" fill="var(--color-terracotta-400)" />
      </g>

      {/* ---- Body ---- */}
      <g {...stroke}>
        <path
          d="M32 33h232c15 0 28 10 32 24l4 15c1 4 2 8 2 12v22c0 7-6 12-13 12H27c-7 0-13-5-13-12V51c0-10 8-18 18-18Z"
          fill="var(--color-haldi-300)"
        />

        {/* The skirt: a second value of the same hue, which is what gives the
            body an inside as well as an edge. */}
        <path
          d="M14 96h288v14c0 7-6 12-13 12H27c-7 0-13-5-13-12Z"
          fill="var(--color-haldi-400)"
        />

        {/* The stripe. A real school bus wears black here; terracotta is the
            site's signature accent doing the same job. */}
        <rect x="14" y="96" width="288" height="9" fill="var(--color-terracotta-600)" stroke="none" />
        <path d="M14 96h288M14 105h288" strokeWidth="1.4" opacity="0.55" />
      </g>

      {/* ---- Glass ---- */}
      <g {...stroke}>
        <rect x="30" y="45" width="56" height="38" rx="9" fill="var(--color-indigo-ink-100)" />
        <rect x="94" y="45" width="56" height="38" rx="9" fill="var(--color-indigo-ink-100)" />
        <rect x="158" y="45" width="46" height="38" rx="9" fill="var(--color-indigo-ink-100)" />
        {/* Windscreen, following the rake of the front. */}
        <path
          d="M262 45h6c9 0 17 6 20 15l3 10c1 4-2 8-6 8h-23c-4 0-7-3-7-7V52c0-4 3-7 7-7Z"
          fill="var(--color-indigo-ink-100)"
        />
      </g>

      {/* Passengers sit behind a clip of their own window, so a head never
          drifts over the frame. */}
      <defs>
        <clipPath id="lbs-bus-w1">
          <rect x="30" y="45" width="56" height="38" rx="9" />
        </clipPath>
        <clipPath id="lbs-bus-w2">
          <rect x="94" y="45" width="56" height="38" rx="9" />
        </clipPath>
        <clipPath id="lbs-bus-w3">
          <rect x="158" y="45" width="46" height="38" rx="9" />
        </clipPath>
      </defs>
      <g opacity="0.9">
        <g clipPath="url(#lbs-bus-w1)">
          <Passenger x={58} fill="var(--color-terracotta-400)" />
        </g>
        <g clipPath="url(#lbs-bus-w2)">
          <Passenger x={122} fill="var(--color-neem-400)" />
        </g>
        <g clipPath="url(#lbs-bus-w3)">
          <Passenger x={181} fill="var(--color-indigo-ink-400)" />
        </g>
      </g>

      {/* ---- Reflections. Drawn over the passengers, which is the right order:
              a highlight sits on the outside of the glass. ---- */}
      <g stroke="var(--color-khadi-50)" strokeWidth="5" strokeLinecap="round" opacity="0.5">
        <path className="lbs-bus__glint" d="M42 76 62 50" />
        <path className="lbs-bus__glint" d="M106 76 126 50" />
        <path className="lbs-bus__glint" d="M168 76 186 50" />
      </g>

      {/* ---- Door, headlight, mirror, seams ---- */}
      <g {...stroke}>
        <rect x="212" y="45" width="38" height="51" rx="8" fill="var(--color-indigo-ink-200)" />
        <path d="M231 45v51" strokeWidth="1.6" />
        <path d="M226 70h-3M236 70h3" strokeWidth="2.2" strokeLinecap="round" />

        {/* Headlight. Small, warm and ringed: the first version was a
            near-white rounded rect at twice this size sitting under the
            windscreen, and at speed it read as a sticker rather than a lamp.
            The haldi-200 surround is what makes it a lens. */}
        <rect
          x="286"
          y="82"
          width="15"
          height="12"
          rx="5"
          fill="var(--color-haldi-200)"
        />
        <rect
          x="289"
          y="84.5"
          width="9"
          height="7"
          rx="3"
          fill="var(--color-khadi-50)"
          strokeWidth="1.2"
        />

        {/* No wing mirror. There was one, and there are two reasons it is gone
            rather than moved: on the passenger side of a left-hand-drive bus it
            belongs at the front, where the windscreen already fills the space,
            and at the size this actually renders — the whole bus is 158px wide
            on a phone — a 9px dark rectangle beside the door read as a chimney
            rather than as a mirror. The detail budget is better spent on the
            roof sign, which is legible at every size. */}

        {/* Panel seams, at the reduced opacity that reads as a fold rather than
            as more outline. */}
        <path d="M90 105v13M204 105v13" strokeWidth="1.4" opacity="0.35" />
        <path d="M36 41h180" strokeWidth="1.6" opacity="0.3" />
      </g>

      {/* Front bumper, the last terracotta note. */}
      <rect
        x="286"
        y="107"
        width="18"
        height="11"
        rx="5"
        fill="var(--color-terracotta-500)"
        {...stroke}
      />
    </svg>
  )
}
