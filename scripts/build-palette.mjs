/**
 * Derives the site's colour tokens from the LBS KidZ logo, and proves them.
 *
 * THE BRAND IS THE FIVE LETTER COLOURS OF THE LOGO, and the hierarchy between
 * them is fixed here rather than decided per component:
 *
 *   brand   #0160A0  primary     "L" and "K". Buttons, links, active states,
 *                                headings, focus, the deep bands.
 *   sky     #009FE3  secondary   "Z". Highlights, hovers, information,
 *                                decorative accents, gradients.
 *   green   #3E9D3F  success     "B" and "i". Growth, positive states.
 *   orange  #F69E09  warning     "S" and the paper plane. Highlights, badges,
 *                                small accents on the deep bands.
 *   coral   #EA574D  error       "d". Alerts and small accents, sparingly.
 *
 * Around them sit two neutral families, both tinted towards the brand blue's
 * own hue so that nothing on the page is a dead grey: `mist` for surfaces and
 * borders (white at 50, the faint blue page ground at 100), and `ink` for text,
 * which bottoms out at #17212B.
 *
 * THE ANCHORS are the exact logo colours and are not adjusted: each sits at a
 * named step of its own ramp, so the real brand colour is always reachable
 * rather than approximated by its neighbours.
 *
 * THE RAMPS are interpolated in OKLab rather than sRGB. A ramp built by mixing
 * towards white in sRGB goes chalky and drifts in hue — the amber turns pink on
 * the way up, the blue turns violet — and the tints of two families stop
 * reading as the same weight of colour. In OKLab a step is a step: hue is held
 * exactly, lightness moves on a perceptual axis, and chroma is tapered at both
 * ends so the palest tints are tinted paper rather than washed pigment.
 *
 * THE PROOF is the part that matters. Several logo colours cannot carry text:
 * the orange measures 2.14:1 on white and the sky blue 2.97:1. Rather than
 * trusting the components by eye, this script checks every colour pair they
 * actually use and exits non-zero if any drops below its floor.
 *
 * Run: node scripts/build-palette.mjs           (report + write CSS)
 *      node scripts/build-palette.mjs --check   (report only, no write)
 */

import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/* -------------------------------------------------------------------------
 * Colour maths
 * ---------------------------------------------------------------------- */

const toLinear = (v) => {
  const c = v / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

const fromLinear = (v) => {
  const c = v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055
  return Math.max(0, Math.min(255, Math.round(c * 255)))
}

function toOklab([R, G, B]) {
  const r = toLinear(R)
  const g = toLinear(G)
  const b = toLinear(B)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

function fromOklabRaw([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ]
}

/**
 * OKLab -> sRGB, with the chroma reduced until the result actually fits.
 *
 * A hue and lightness can name a colour more saturated than sRGB can show. The
 * naive conversion clamps each channel independently, which returns a
 * different hue rather than the nearest displayable colour — a warm coral tint
 * comes out as flat hot pink pinned at R=255. Binary-searching the chroma holds
 * the hue and lightness exactly and gives up only the saturation sRGB cannot
 * render, which is the one of the three the eye is least likely to miss.
 */
function fitOklch(L, C, H) {
  const at = (c) => fromOklabRaw([L, c * Math.cos(H), c * Math.sin(H)])
  const inGamut = (c) => {
    const l = (L + 0.3963377774 * c * Math.cos(H) + 0.2158037573 * c * Math.sin(H)) ** 3
    const m = (L - 0.1055613458 * c * Math.cos(H) - 0.0638541728 * c * Math.sin(H)) ** 3
    const s = (L - 0.0894841775 * c * Math.cos(H) - 1.291485548 * c * Math.sin(H)) ** 3
    const lin = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ]
    return lin.every((v) => v >= -0.0005 && v <= 1.0005)
  }

  if (inGamut(C)) return at(C)

  let lo = 0
  let hi = C
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    if (inGamut(mid)) lo = mid
    else hi = mid
  }
  return at(lo)
}

const parse = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const hex = (rgb) => `#${rgb.map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join('')}`

/**
 * Alpha-composites one token over another and returns the flat result.
 *
 * Text is often set on a translucent tint rather than on a flat token — a card
 * backdrop, a wash over a band — and that composite is the colour actually on
 * screen, so it is what gets measured.
 */
const over = (fg, bg, alpha) => {
  const f = parse(fg)
  const b = parse(bg)
  return hex(f.map((v, i) => Math.round(v * alpha + b[i] * (1 - alpha))))
}

const luminance = ([r, g, b]) =>
  0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

const contrast = (a, b) => {
  const [hi, lo] = [luminance(parse(a)), luminance(parse(b))].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/* -------------------------------------------------------------------------
 * The anchors: the five letter colours of the logo, plus the text anchor
 * ---------------------------------------------------------------------- */

const ANCHORS = {
  /** "L" and "K". The primary brand colour. */
  brand: '#0160A0',
  /** "Z". The secondary. */
  sky: '#009FE3',
  /** "B" and "i". */
  green: '#3E9D3F',
  /** "S" and the paper plane's wing. */
  orange: '#F69E09',
  /** "d". */
  coral: '#EA574D',
  /**
   * The darkest text. It shares the brand blue's hue almost exactly (-111° to
   * the blue's -112° in OKLCh), which is why the whole neutral set can be built
   * on the blue's hue and still land on it.
   */
  ink: '#17212B',
}

/**
 * Where each named step sits.
 *
 * `L` is the OKLab lightness. `c` is a multiplier on the family's anchor
 * chroma: held near 1 around the anchor, tapered towards the ends so a 50
 * reads as tinted paper and a 900 as deep pigment rather than neon at either
 * extreme. `anchor: true` emits the sampled logo colour verbatim; `hex` pins a
 * step to a literal.
 *
 * The step each anchor sits at is not arbitrary: it is where that colour's
 * lightness falls on the shared ladder, so `-100` is the same weight of tint in
 * every family and `-700` is always text weight on a light ground.
 */
const STEPS = {
  brand: [
    { key: 50, L: 0.968, c: 0.1 },
    { key: 100, L: 0.916, c: 0.26 },
    { key: 200, L: 0.836, c: 0.5 },
    { key: 300, L: 0.724, c: 0.72 },
    { key: 400, L: 0.6, c: 0.9 },
    { key: 500, anchor: true },
    { key: 600, L: 0.414, c: 0.98 },
    { key: 700, L: 0.352, c: 0.93 },
    { key: 800, L: 0.276, c: 0.82 },
    { key: 900, L: 0.208, c: 0.7 },
  ],
  sky: [
    { key: 50, L: 0.976, c: 0.1 },
    { key: 100, L: 0.941, c: 0.26 },
    { key: 200, L: 0.879, c: 0.5 },
    { key: 300, L: 0.79, c: 0.76 },
    { key: 400, anchor: true },
    { key: 500, L: 0.588, c: 1.0 },
    /** Text weight: the anchor measures 2.97:1 on white and cannot carry type. */
    { key: 600, L: 0.5, c: 1.0 },
    { key: 700, L: 0.418, c: 0.95 },
    { key: 800, L: 0.345, c: 0.82 },
    { key: 900, L: 0.272, c: 0.7 },
  ],
  green: [
    { key: 50, L: 0.976, c: 0.1 },
    { key: 100, L: 0.951, c: 0.24 },
    { key: 200, L: 0.888, c: 0.48 },
    { key: 300, L: 0.79, c: 0.74 },
    { key: 400, L: 0.7, c: 0.92 },
    { key: 500, anchor: true },
    /** Text weight, and the fill behind white button labels. */
    { key: 600, L: 0.487, c: 0.82 },
    { key: 700, L: 0.41, c: 0.72 },
    { key: 800, L: 0.34, c: 0.6 },
    { key: 900, L: 0.27, c: 0.5 },
  ],
  orange: [
    { key: 50, L: 0.978, c: 0.12 },
    { key: 100, L: 0.948, c: 0.28 },
    { key: 200, L: 0.888, c: 0.55 },
    { key: 300, L: 0.826, c: 0.8 },
    { key: 400, anchor: true },
    { key: 500, L: 0.688, c: 1.0 },
    /**
     * Text weight. The orange is a fill and an accent, never small type on a
     * light ground; where it has to be read, it is read at this depth.
     */
    { key: 600, L: 0.5, c: 0.94 },
    { key: 700, L: 0.43, c: 0.8 },
    { key: 800, L: 0.36, c: 0.66 },
    { key: 900, L: 0.29, c: 0.52 },
  ],
  coral: [
    { key: 50, L: 0.974, c: 0.11 },
    { key: 100, L: 0.933, c: 0.29 },
    { key: 200, L: 0.862, c: 0.55 },
    { key: 300, L: 0.768, c: 0.8 },
    { key: 400, anchor: true },
    /**
     * Chroma is tapered hard below the anchor. The same chroma reads as far more
     * saturated as lightness drops, and carried down it lands on a pure signal
     * red — loud enough to read as an alarm wherever it appeared.
     */
    { key: 500, L: 0.572, c: 0.9 },
    { key: 600, L: 0.498, c: 0.8 },
    { key: 700, L: 0.424, c: 0.68 },
    { key: 800, L: 0.344, c: 0.55 },
    { key: 900, L: 0.27, c: 0.45 },
  ],
  /**
   * Surfaces and borders, on the brand blue's hue at very low chroma.
   *
   * 50 is white: the card and the clean band. 100 is the page ground — a blue
   * so faint it reads as "not quite white" rather than as a colour — and it is
   * deliberately 0.022 of lightness below the cards so a card still has an edge
   * without leaning on its hairline. 200 is the deeper panel, 300 the border.
   */
  mist: [
    { key: 50, hex: '#FFFFFF' },
    { key: 100, L: 0.978, c: 0.06 },
    { key: 200, L: 0.955, c: 0.09 },
    { key: 300, L: 0.915, c: 0.125 },
    { key: 400, L: 0.85, c: 0.16 },
    { key: 500, L: 0.745, c: 0.19 },
    { key: 600, L: 0.62, c: 0.2 },
  ],
  /**
   * Text, on the same hue. A grey-blue rather than a grey: enough chroma to
   * belong to the blue, far too little to read as coloured type.
   */
  ink: [
    { key: 300, L: 0.7, c: 0.22 },
    /**
     * The muted step — captions, meta, card notes — and the one the floors
     * bind on. It has to clear 4.6:1 on the sky card backdrop, which is the
     * deepest light ground it is ever set on.
     */
    { key: 400, L: 0.515, c: 0.95 },
    { key: 500, L: 0.465, c: 0.9 },
    { key: 600, L: 0.385, c: 0.85 },
    { key: 700, L: 0.315, c: 0.85 },
    { key: 800, L: 0.275, c: 0.9 },
    { key: 900, anchor: true },
  ],
}

/** Which anchor each family takes its hue (and chroma) from. */
const FAMILY_ANCHOR = {
  brand: 'brand',
  sky: 'sky',
  green: 'green',
  orange: 'orange',
  coral: 'coral',
  mist: 'brand',
  ink: 'ink',
}

/* -------------------------------------------------------------------------
 * Build
 * ---------------------------------------------------------------------- */

const palette = {}

for (const [family, steps] of Object.entries(STEPS)) {
  const anchorHex = ANCHORS[FAMILY_ANCHOR[family]]
  const [, aa, ab] = toOklab(parse(anchorHex))
  const C0 = Math.hypot(aa, ab)
  const H = Math.atan2(ab, aa)

  palette[family] = {}
  for (const step of steps) {
    palette[family][step.key] = step.hex
      ? step.hex
      : step.anchor
        ? anchorHex
        : hex(fitOklch(step.L, C0 * step.c, H))
  }
}

const token = (family, key) => {
  const value = palette[family]?.[key]
  if (!value) throw new Error(`No such token: ${family}-${key}`)
  return value
}
const WHITE = token('mist', 50)

/* -------------------------------------------------------------------------
 * Proof: every pair the components actually put together
 * ---------------------------------------------------------------------- */

/** WCAG AA: 4.5 for body text, 3.0 for large text and for non-text UI. */
const pairs = [
  // --- Headings and body on the light grounds ----------------------------
  ['heading brand-700 on page ground', token('brand', 700), token('mist', 100), 4.5],
  ['heading brand-700 on white', token('brand', 700), WHITE, 4.5],
  ['heading brand-700 on mist-200', token('brand', 700), token('mist', 200), 4.5],
  ['strong text ink-900 on page ground', token('ink', 900), token('mist', 100), 4.5],
  ['body ink-700 on page ground', token('ink', 700), token('mist', 100), 4.5],
  ['body ink-600 on page ground', token('ink', 600), token('mist', 100), 4.5],
  ['body ink-500 on page ground', token('ink', 500), token('mist', 100), 4.5],
  ['body ink-500 on white', token('ink', 500), WHITE, 4.5],
  ['body ink-500 on mist-200', token('ink', 500), token('mist', 200), 4.5],
  ['muted ink-400 on page ground', token('ink', 400), token('mist', 100), 4.5],
  ['muted ink-400 on white', token('ink', 400), WHITE, 4.5],
  ['muted ink-400 on mist-200', token('ink', 400), token('mist', 200), 4.5],
  [
    'muted ink-400 on the mist card backdrop (mist-300 at 60% over white)',
    token('ink', 400),
    over(token('mist', 300), WHITE, 0.6),
    4.5,
  ],
  /** The card backdrops hold themselves to 4.6, which is that file's own rule. */
  ['muted ink-400 on the sky card backdrop', token('ink', 400), token('sky', 100), 4.6],
  ['body ink-500 on the sky card backdrop', token('ink', 500), token('sky', 100), 4.6],
  ['body ink-500 on green-100', token('ink', 500), token('green', 100), 4.5],
  ['body ink-500 on orange-100', token('ink', 500), token('orange', 100), 4.5],
  ['body ink-500 on sky-50', token('ink', 500), token('sky', 50), 4.5],

  // --- Links, eyebrows, numerals -----------------------------------------
  ['link brand-500 on page ground', token('brand', 500), token('mist', 100), 4.5],
  ['link brand-500 on white', token('brand', 500), WHITE, 4.5],
  ['eyebrow brand-500 on mist-200', token('brand', 500), token('mist', 200), 4.5],
  ['eyebrow brand-500 on sky-50', token('brand', 500), token('sky', 50), 4.5],
  ['link hover sky-600 on white', token('sky', 600), WHITE, 4.5],
  ['link hover sky-600 on page ground', token('sky', 600), token('mist', 100), 4.5],
  ['brand-600 on brand-50 (chip)', token('brand', 600), token('brand', 50), 4.5],

  // --- Buttons -----------------------------------------------------------
  ['primary: white on brand-500', WHITE, token('brand', 500), 4.5],
  ['primary hover: white on brand-600', WHITE, token('brand', 600), 4.5],
  ['secondary: brand-600 on white', token('brand', 600), WHITE, 4.5],
  ['secondary hover: brand-600 on brand-50', token('brand', 600), token('brand', 50), 4.5],
  ['success: white on green-600', WHITE, token('green', 600), 4.5],
  ['success hover: white on green-700', WHITE, token('green', 700), 4.5],
  ['attention: ink-900 on orange-400', token('ink', 900), token('orange', 400), 4.5],
  ['attention hover: ink-900 on orange-300', token('ink', 900), token('orange', 300), 4.5],
  ['on dark: brand-700 on white', token('brand', 700), WHITE, 4.5],

  // --- The deep bands (page headers, dark sections) ----------------------
  ['white heading on brand-700 band', WHITE, token('brand', 700), 4.5],
  ['mist-100 body on brand-700 band', token('mist', 100), token('brand', 700), 4.5],
  ['mist-200 body on brand-700 band', token('mist', 200), token('brand', 700), 4.5],
  ['mist-300 meta on brand-700 band', token('mist', 300), token('brand', 700), 4.5],
  ['orange-300 eyebrow on brand-700 band', token('orange', 300), token('brand', 700), 4.5],
  ['orange-200 on brand-700 band', token('orange', 200), token('brand', 700), 4.5],
  ['orange-400 rule on brand-700 band', token('orange', 400), token('brand', 700), 3.0],
  ['sky-300 on brand-700 band', token('sky', 300), token('brand', 700), 4.5],
  ['brand-300 on brand-700 band', token('brand', 300), token('brand', 700), 4.5],

  // --- The footer --------------------------------------------------------
  ['mist-300 at 85% on brand-800 footer', over(token('mist', 300), token('brand', 800), 0.85), token('brand', 800), 4.5],
  ['mist-300 at 70% on brand-800 footer', over(token('mist', 300), token('brand', 800), 0.7), token('brand', 800), 4.5],
  ['orange-300 heading on brand-800 footer', token('orange', 300), token('brand', 800), 4.5],
  ['sky-200 hover on brand-800 footer', token('sky', 200), token('brand', 800), 4.5],

  // --- The CTA band (brand-500) ------------------------------------------
  ['white heading on brand-500 CTA', WHITE, token('brand', 500), 4.5],
  ['mist-100 at 90% on brand-500 CTA', over(token('mist', 100), token('brand', 500), 0.9), token('brand', 500), 4.5],

  // --- Tags and chips: text on a tint of its own family ------------------
  ['tag brand-700 on brand-100', token('brand', 700), token('brand', 100), 4.5],
  ['tag sky-700 on sky-100', token('sky', 700), token('sky', 100), 4.5],
  ['tag sky-800 on sky-200', token('sky', 800), token('sky', 200), 4.5],
  ['tag green-600 on green-100', token('green', 600), token('green', 100), 4.5],
  ['tag orange-600 on orange-100', token('orange', 600), token('orange', 100), 4.5],
  ['tag coral-700 on coral-100', token('coral', 700), token('coral', 100), 4.5],
  ['tag ink-700 on mist-200', token('ink', 700), token('mist', 200), 4.5],
  ['brand-700 on sky-100', token('brand', 700), token('sky', 100), 4.5],
  ['brand-700 on orange-100', token('brand', 700), token('orange', 100), 4.5],
  ['brand-700 on green-100', token('brand', 700), token('green', 100), 4.5],
  ['brand-700 on coral-100', token('brand', 700), token('coral', 100), 4.5],
  ['brand-800 on sky-300 (chip on the dark panel)', token('brand', 800), token('sky', 300), 4.5],
  ['white on green-600 (directions button)', WHITE, token('green', 600), 4.5],

  // --- Forms and status --------------------------------------------------
  ['error text coral-700 on white', token('coral', 700), WHITE, 4.5],
  ['required marker coral-600 on white', token('coral', 600), WHITE, 4.5],
  ['error banner coral-800 on coral-100', token('coral', 800), token('coral', 100), 4.5],
  ['success text green-700 on green-100', token('green', 700), token('green', 100), 4.5],
  ['label focus brand-600 on white', token('brand', 600), WHITE, 4.5],

  // --- Non-text: borders, rules, focus rings -----------------------------
  ['border mist-300 on page ground', token('mist', 300), token('mist', 100), 1.15],
  ['input border mist-500 on white', token('mist', 500), WHITE, 1.9],
  ['focus ring brand-500 on page ground', token('brand', 500), token('mist', 100), 3.0],
  ['focus ring brand-500 on white', token('brand', 500), WHITE, 3.0],
  ['focus ring sky-300 on brand-700 band', token('sky', 300), token('brand', 700), 3.0],
  ['focus ring sky-300 on brand-800 footer', token('sky', 300), token('brand', 800), 3.0],
  ['focus ring sky-200 on brand-500 CTA', token('sky', 200), token('brand', 500), 3.0],
  ['bullet sky-500 on white', token('sky', 500), WHITE, 3.0],
]

let failed = 0
const rows = pairs.map(([label, fg, bg, floor]) => {
  const ratio = contrast(fg, bg)
  const ok = ratio >= floor
  if (!ok) failed++
  return { label, fg, bg, floor, ratio, ok }
})

console.log('\nLBS KidZ palette, derived from the logo\n')
for (const [family, steps] of Object.entries(palette)) {
  console.log(
    `  ${family.padEnd(8)} ${Object.entries(steps)
      .map(([k, v]) => `${k}:${v}`)
      .join('  ')}`,
  )
}

console.log('\nContrast proof (WCAG AA)\n')
for (const r of rows) {
  if (!r.ok || process.argv.includes('--verbose'))
    console.log(
      `  ${r.ok ? 'PASS' : 'FAIL'}  ${r.ratio.toFixed(2).padStart(6)} : 1  (needs ${r.floor})  ${r.label}  ${r.fg} on ${r.bg}`,
    )
}
console.log(`\n  ${rows.length - failed}/${rows.length} pass\n`)

/* -------------------------------------------------------------------------
 * Emit the CSS
 * ---------------------------------------------------------------------- */

if (!process.argv.includes('--check')) {
  const heading = {
    brand:
      'Brand blue: the primary. 500 is the exact colour of the "L" and the "K".\n     Buttons, links, active states, headings (700), deep bands (700-800).',
    sky: 'Sky: the secondary. 400 is the "Z". Highlights, hovers, information,\n     decoration. Text only from 600 down — the anchor is 2.97:1 on white.',
    green:
      'Green: success and growth. 500 is the "B" of LBS and the "i" of KidZ.',
    orange:
      'Orange: warning and highlight. 400 is the "S" and the paper plane. An\n     accent and a fill; small text only at 600 and below.',
    coral: 'Coral: error and attention. 400 is the "d" of KidZ. Used sparingly.',
    mist: 'Mist: surfaces and borders, on the brand blue\'s hue. 50 is white, 100\n     the page ground, 200 the deeper panel, 300 the border.',
    ink: 'Ink: text, on the same hue. 900 is the darkest text, 400 the muted step.',
  }

  const lines = []
  for (const [family, steps] of Object.entries(palette)) {
    lines.push(`  /* --- ${heading[family]} */`)
    for (const [k, v] of Object.entries(steps)) lines.push(`  --color-${family}-${k}: ${v};`)
    lines.push('')
  }

  const out = path.join(root, 'src', 'styles', 'palette.generated.css')

  const css = `/* GENERATED by scripts/build-palette.mjs. Do not edit by hand.
 *
 * Every colour below is derived from the LBS KidZ logo and checked against the
 * contrast floors the components need. Change the anchors or the ramp shape in
 * the generator and re-run it; editing this file directly means the next run
 * silently reverts you.
 *
 *   node scripts/build-palette.mjs           regenerate
 *   node scripts/build-palette.mjs --check   verify contrast only
 */

@theme {
  /* Tailwind's default palette is switched off, so a stray \`bg-red-500\` or
     \`text-gray-600\` produces nothing rather than an off-brand colour. The
     brand families below are the only colours a utility can reach. */
  --color-*: initial;
  --color-white: #FFFFFF;
  --color-black: #000000;

${lines.join('\n').trimEnd()}
}

/* --- Semantic roles --------------------------------------------------------
   Components that express a role rather than a hue use these: \`bg-primary\`,
   \`text-error\`, \`ring-focus\`. \`inline\` so each utility resolves straight to
   the family token it names. */
@theme inline {
  --color-primary: var(--color-brand-500);
  --color-primary-hover: var(--color-brand-600);
  --color-primary-soft: var(--color-brand-50);
  --color-secondary: var(--color-sky-400);
  --color-secondary-soft: var(--color-sky-50);
  --color-success: var(--color-green-500);
  --color-success-soft: var(--color-green-100);
  --color-warning: var(--color-orange-400);
  --color-warning-soft: var(--color-orange-100);
  --color-error: var(--color-coral-400);
  --color-error-strong: var(--color-coral-700);
  --color-error-soft: var(--color-coral-100);
  --color-info: var(--color-sky-400);
  --color-info-soft: var(--color-sky-100);
  --color-surface: var(--color-mist-50);
  --color-canvas: var(--color-mist-100);
  --color-heading: var(--color-brand-700);
  --color-body: var(--color-ink-700);
  --color-muted: var(--color-ink-500);
  --color-line: var(--color-mist-300);
}

/* --- Named brand variables, for CSS that is not a utility ------------------ */
:root {
  --brand-primary: var(--color-brand-500);
  --brand-primary-light: var(--color-brand-100);
  --brand-primary-dark: var(--color-brand-700);
  --brand-secondary: var(--color-sky-400);
  --brand-green: var(--color-green-500);
  --brand-orange: var(--color-orange-400);
  --brand-coral: var(--color-coral-400);
  --brand-surface: var(--color-mist-50);
  --brand-canvas: var(--color-mist-100);
  --brand-text: var(--color-ink-900);
  --brand-muted: var(--color-ink-500);

  /* Gradients. Used selectively — the hero overlay, the CTA band, the page
     header band, a thin accent rule — never as a default fill. */
  --gradient-brand: linear-gradient(135deg, var(--color-brand-500), var(--color-sky-400));
  --gradient-brand-deep: linear-gradient(160deg, var(--color-brand-800) 0%, var(--color-brand-700) 45%, var(--color-brand-600) 100%);
  --gradient-brand-green: linear-gradient(135deg, var(--color-brand-500), var(--color-green-500));
  --gradient-brand-orange: linear-gradient(135deg, var(--color-brand-500), var(--color-orange-400));
  --gradient-spectrum: linear-gradient(90deg, var(--color-brand-500), var(--color-sky-400) 50%, var(--color-green-500));
}
`

  await writeFile(out, css, 'utf8')
  console.log(`Wrote ${path.relative(root, out)}`)
}

if (failed > 0) {
  console.error(`\n${failed} contrast pair(s) below floor. Adjust STEPS and re-run.\n`)
  process.exit(1)
}
