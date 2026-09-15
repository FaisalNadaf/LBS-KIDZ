/**
 * Derives the site's logo assets from the three supplied brand JPEGs.
 *
 * The supplied files are flat photographs of the artwork on a cream ground
 * (#FEFAF1), one lockup per file, each sitting in a large empty canvas. Three
 * things have to happen before any of them can be used as a logo in a page:
 *
 *   1. CROP to the artwork. Two thirds of each source file is empty canvas, and
 *      a logo that carries its own margin cannot be aligned against anything.
 *
 *   2. KEY OUT THE GROUND. The cream is opaque, so the navbar version would
 *      otherwise paint a cream rectangle over whatever band it sits on. Alpha
 *      is taken from each pixel's distance from the ground colour and the RGB
 *      is then un-blended (`fg = (px - bg(1-a)) / a`), which is what keeps the
 *      anti-aliased glyph edges free of a cream halo on a coloured background.
 *      Straight thresholding leaves that halo; it is visible at navbar size.
 *
 *   3. SPLIT INTO VARIANTS. One lockup cannot serve every slot: the four-line
 *      horizontal file is legible in a footer at 260px and illegible in a 44px
 *      navbar, where only the wordmark survives.
 *
 * Nothing here redraws, recolours or approximates the logo. Every output is
 * pixels from the supplied files.
 *
 * Run: node scripts/build-logo-assets.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.resolve(root, '..')
const OUT = path.join(root, 'public', 'images', 'brand')

const sources = {
  /** Landscape lockup: LBS KidZ / Play School / Learn · Explore · Fly / initiative line. */
  horizontal: 'WhatsApp Image 2026-09-10 at 11.25.24.jpeg',
  /** Stacked lockup, initiative line on one line. */
  stacked: 'WhatsApp Image 2026-09-10 at 11.25.21.jpeg',
  /** Stacked lockup, initiative line wrapped over two. */
  stackedTall: 'WhatsApp Image 2026-09-10 at 11.25.23.jpeg',
}

/**
 * Crops, measured off the source files by `scripts/`-side probing of where the
 * ink actually is, not eyeballed. Each is [left, top, width, height] and each
 * carries a small, even bleed so a glyph is never clipped by a rounding error.
 */
const crops = {
  /** Wordmark + paper plane. The navbar and mobile-menu lockup. */
  wordmark: { src: 'horizontal', left: 436, top: 392, width: 1688, height: 572 },
  /** Everything: wordmark, Play School, the three words, the initiative line. */
  lockup: { src: 'horizontal', left: 436, top: 392, width: 1688, height: 840 },
  /** Portrait lockup, for square-ish slots such as the loading screen. */
  stacked: { src: 'stacked', left: 862, top: 282, width: 970, height: 1076 },
  /** The paper plane alone. */
  mark: { src: 'horizontal', left: 1036, top: 396, width: 156, height: 168 },
  /**
   * The official stacked logo's top block: the plane and its stars, "LBS" and
   * "KidZ", stopping above the "Play School" line. Measured off the stacked
   * output's own rows — the block ends at row 717 and the Play School rule
   * starts at 735 — so nothing is rearranged, only cut short. Close to square
   * (908x852), which is why it can fill an icon where the wide wordmark cannot.
   * The favicon and the app icons.
   */
  emblem: { src: 'stacked', left: 918, top: 286, width: 908, height: 852 },
  /**
   * The emblem's lettering alone: "LBS" over "KidZ", without the plane and its
   * stars. The browser-tab icon. At 16px the plane is two or three pixels and
   * the stars are one each, so leaving them in only shrank the letters that
   * actually say the name; cut away, the letters fill the whole icon.
   */
  letters: { src: 'stacked', left: 914, top: 490, width: 748, height: 646 },
}

/** Ground colour of the supplied files, read from their own corner pixel. */
const GROUND = [254, 251, 244]
/**
 * Distance from the ground at which a pixel is fully the logo. Low enough that
 * the pale interior of a glyph edge is not eaten, high enough that JPEG noise
 * in the empty canvas stays fully transparent.
 */
const KEY = 42
/**
 * Below this distance a pixel is treated as pure ground and zeroed outright.
 * The sources are JPEGs, so the "empty" canvas is not one flat colour but a
 * field of ±6 noise around it. Without the dead zone every one of those pixels
 * gets a low but non-zero alpha, which is invisible on screen and quadruples
 * the PNG: the transparent region stops being a run of identical bytes.
 */
const FLOOR = 10

async function keyed(file, crop) {
  const { data, info } = await sharp(path.join(SRC, file))
    .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const out = Buffer.alloc(info.width * info.height * 4)

  for (let p = 0; p < info.width * info.height; p++) {
    const i = p * info.channels
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const d = Math.max(
      Math.abs(r - GROUND[0]),
      Math.abs(g - GROUND[1]),
      Math.abs(b - GROUND[2]),
    )
    const o = p * 4

    if (d <= FLOOR) continue
    const a = Math.min(1, (d - FLOOR) / (KEY - FLOOR))

    // Un-blend: the source pixel is the glyph composited over the ground, so
    // recovering the glyph's own colour is what removes the cream fringe.
    const un = (c, bg) => Math.max(0, Math.min(255, Math.round((c - bg * (1 - a)) / a)))
    out[o] = un(r, GROUND[0])
    out[o + 1] = un(g, GROUND[1])
    out[o + 2] = un(b, GROUND[2])
    out[o + 3] = Math.round(a * 255)
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
}

/** Every emitted file, and the width it is rasterised at. */
const outputs = [
  { name: 'lbs-kidz-wordmark', crop: 'wordmark', width: 960 },
  { name: 'lbs-kidz-lockup', crop: 'lockup', width: 1100 },
  { name: 'lbs-kidz-stacked', crop: 'stacked', width: 820 },
  { name: 'lbs-kidz-mark', crop: 'mark', width: 512 },
  { name: 'lbs-kidz-emblem', crop: 'emblem', width: 640 },
]

await mkdir(OUT, { recursive: true })

const manifest = {}

for (const { name, crop, width } of outputs) {
  const c = crops[crop]
  const img = await keyed(sources[c.src], c)
  const resized = img.resize({ width, fit: 'inside', withoutEnlargement: false })

  // Palette PNG, not WebP: this is flat vector artwork in a handful of colours,
  // and measured on these four files the indexed PNG comes out around 40%
  // smaller than the equivalent lossy WebP. One format, and the smaller one.
  const png = await resized
    .clone()
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toBuffer()
  await writeFile(path.join(OUT, `${name}.png`), png)

  const meta = await sharp(png).metadata()
  manifest[name] = { width: meta.width, height: meta.height }
  console.log(`${name}  ${meta.width}x${meta.height}  png ${(png.length / 1024).toFixed(1)}kB`)
}

/**
 * Favicons and the app icons: the official logo.
 *
 * The emblem crop above — plane, "LBS" and "KidZ" exactly as they stand in the
 * stacked artwork — rather than the plane on its own, so the tab shows the
 * school's logo and not a fragment of it.
 *
 * TWO KINDS OF ICON, because they are painted on two kinds of surface.
 *
 *   Tab icons (16, 32, 48) sit on a tab strip we do not control, light or dark.
 *   The logo's own lettering (`letters`), edge to edge on a transparent ground
 *   (no tile, by client direction), lightly sharpened after the downscale. At
 *   16px every pixel of width goes to the letters: a margin, or the plane and
 *   stars beside them, made the name too small to read. The trade-off of no
 *   tile: on a dark tab strip the deep-blue "L", "B" and "K" are quieter than
 *   the green, orange and red letters beside them.
 *
 *   App icons (180, 192, 512) are masked into a circle or squircle by the
 *   phone. An opaque white square — transparent corners turn black on iOS —
 *   with the full emblem, plane and all, at 70%, inside every platform's safe
 *   zone. At that size the plane is large enough to be worth keeping.
 *
 * favicon.ico carries the 16, 32 and 48 PNGs for anything that asks for the
 * legacy path directly instead of reading the <link> tags.
 */
const emblem = await (await keyed(sources[crops.emblem.src], crops.emblem)).png().toBuffer()
const letters = await (await keyed(sources[crops.letters.src], crops.letters)).png().toBuffer()

/** A tab icon: the lettering alone, filling the square, on transparency. */
async function tabIcon(size) {
  return sharp(letters)
    .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .sharpen({ sigma: 0.6, m1: 1.2, m2: 2.5 })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/** An app icon: the full emblem on an opaque white square, inside the safe zone. */
async function appIcon(size) {
  const inner = Math.round(size * 0.7)
  const art = await sharp(emblem)
    .resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
    .composite([{ input: art, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

const tabIcons = {}
for (const size of [16, 32, 48]) {
  tabIcons[size] = await tabIcon(size)
  if (size !== 48) {
    await writeFile(path.join(root, 'public', `favicon-${size}.png`), tabIcons[size])
    console.log(`favicon-${size}.png  ${size}x${size}  ${(tabIcons[size].length / 1024).toFixed(1)}kB`)
  }
}

for (const size of [180, 192, 512]) {
  const png = await appIcon(size)
  const file = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`
  await writeFile(path.join(root, 'public', file), png)
  console.log(`${file}  ${size}x${size}  ${(png.length / 1024).toFixed(1)}kB`)
}

/** An .ico is a directory of images; modern readers accept PNG entries as-is. */
function toIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  const entries = []
  let offset = 6 + 16 * pngs.length
  for (const { size, png } of pngs) {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0)
    e.writeUInt8(size >= 256 ? 0 : size, 1)
    e.writeUInt8(0, 2)
    e.writeUInt8(0, 3)
    e.writeUInt16LE(1, 4)
    e.writeUInt16LE(32, 6)
    e.writeUInt32LE(png.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += png.length
    entries.push(e)
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.png)])
}

const ico = toIco([16, 32, 48].map((size) => ({ size, png: tabIcons[size] })))
await writeFile(path.join(root, 'public', 'favicon.ico'), ico)
console.log(`favicon.ico  16/32/48  ${(ico.length / 1024).toFixed(1)}kB`)

await writeFile(
  path.join(OUT, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
)

console.log('\nIntrinsic sizes written to public/images/brand/manifest.json')

/* -------------------------------------------------------------------------
 * The share card.
 *
 * Composed here rather than hand-drawn as an SVG, so that the logo on a link
 * preview is the same artwork as the logo in the navbar. The previous version
 * redrew a wordmark in Georgia beside a wheat-stalk icon, which is exactly the
 * approximation this pass exists to remove.
 *
 * Copy is the Home page's own H1 and tagline, so a shared link says what the
 * page it opens says.
 * ---------------------------------------------------------------------- */

const OG = { w: 1200, h: 630 }

const escape = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const ogText = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG.w}" height="${OG.h}">
  <rect x="0" y="0" width="${OG.w}" height="12" fill="#0160A0"/>
  <g font-family="Georgia, 'Times New Roman', serif" fill="#003D6A">
    <text x="84" y="330" font-size="66" font-weight="700">${escape('A Living Legacy for')}</text>
    <text x="84" y="404" font-size="66" font-weight="700">${escape('Little Learners')}</text>
  </g>
  <text x="84" y="462" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="27" fill="#605C53">
    ${escape('Modern Learning, Timeless Values. Where tiny children learn big values.')}
  </text>
  <g font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#34312B">
    <circle cx="92" cy="538" r="6" fill="#CE3C36"/>
    <text x="112" y="546">${escape('Opening in Indore')}</text>
    <circle cx="392" cy="538" r="6" fill="#F69E09"/>
    <text x="412" y="546">${escape('Academic Session 2027-28')}</text>
    <circle cx="808" cy="538" r="6" fill="#3E9D3F"/>
    <text x="828" y="546">${escape('NEP 2020 aligned')}</text>
  </g>
</svg>`

const ogLogo = await keyed(sources[crops.lockup.src], crops.lockup)
  .then((img) => img.resize({ height: 150 }).png().toBuffer())

const og = await sharp({
  create: { width: OG.w, height: OG.h, channels: 4, background: { r: 254, g: 250, b: 241, alpha: 1 } },
})
  .composite([
    { input: ogLogo, left: 84, top: 78 },
    { input: Buffer.from(ogText), left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer()

await writeFile(path.join(root, 'public', 'og-image.png'), og)
console.log(`og-image.png  ${OG.w}x${OG.h}  ${(og.length / 1024).toFixed(1)}kB`)
