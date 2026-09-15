/**
 * Adds two more photographs of Indore to `public/images`.
 *
 * WHY. The Home page's "Opening in Indore" section and the Campuses page both
 * list five zones, per the Home Page content specification. The zone card
 * carries one photograph each and shares none — five zones, and only three
 * pictures of the city were on disk.
 *
 * WHAT THESE PICTURES ARE, AND ARE NOT. They are photographs OF INDORE, not of
 * any zone, exactly like the three already here, and the caption under each one
 * on the page says which part of the city it is. No campus exists yet, so a
 * street captioned with a locality name would invent the one thing the Campuses
 * page refuses to.
 *
 * Both are Creative Commons from Wikimedia Commons, and both require
 * attribution, which is written into `image-credits.json` alongside the
 * existing set and rendered under the picture by the zone card.
 *
 * Run: node scripts/fetch-indore-photos.mjs
 * Then: node scripts/build-image-manifest.mjs
 */

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const IMAGES = path.join(root, 'public', 'images')
const CREDITS = path.join(root, 'image-credits.json')

/** Matches the existing Indore set exactly, so the cards crop identically. */
const TARGET = { width: 1120, height: 700 }
const WIDTHS = [480, 768, 1120]

const wanted = [
  {
    name: 'indore-rajwada',
    title: 'File:Indore Rajwada01.jpg',
    /** Where the interesting part of the frame is, for the 16:10 crop. */
    position: 'centre',
  },
  {
    /**
     * Lal Bagh Palace. Picked over the other landscape options on Commons for
     * two reasons that matter on this particular page: it is in colour, so it
     * sits with the four beside it rather than as the one monochrome card in
     * the row; and it carries no signage. The obvious alternative, an office
     * park, is a wall of tenant brand names, and the temple frames are
     * religious imagery, which the brand direction rules out as firmly as it
     * rules out anything political.
     */
    name: 'indore-lalbagh',
    title: 'File:Lalbagh Palace IndoreR0010278s.jpg',
    position: 'centre',
  },
]

const api = 'https://commons.wikimedia.org/w/api.php'
const UA = 'LBSKidZ-website/1.0 (build script; contact via lbskidz.com)'

const query = new URLSearchParams({
  action: 'query',
  format: 'json',
  prop: 'imageinfo',
  iiprop: 'url|size|extmetadata',
  iiurlwidth: '2400',
  titles: wanted.map((w) => w.title).join('|'),
})

const res = await fetch(`${api}?${query}`, { headers: { 'User-Agent': UA } })
if (!res.ok) throw new Error(`Commons API ${res.status}`)
const pages = Object.values((await res.json()).query.pages)

const strip = (html) => (html ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

const credits = JSON.parse(await readFile(CREDITS, 'utf8'))

for (const spec of wanted) {
  const page = pages.find((p) => p.title === spec.title)
  if (!page?.imageinfo?.[0]) throw new Error(`No image info for ${spec.title}`)

  const info = page.imageinfo[0]
  const meta = info.extmetadata ?? {}
  const author = strip(meta.Artist?.value)
  const license = strip(meta.LicenseShortName?.value)
  const licenseUrl = strip(meta.LicenseUrl?.value)
  const descriptionUrl = info.descriptionurl ?? spec.title

  if (!license || !author) throw new Error(`Missing licence or author for ${spec.title}`)

  const src = await fetch(info.thumburl ?? info.url, { headers: { 'User-Agent': UA } })
  if (!src.ok) throw new Error(`Download ${spec.name}: ${src.status}`)
  const original = Buffer.from(await src.arrayBuffer())

  /**
   * Cropped to a buffer first, and not left as a queued operation on a shared
   * pipeline. `sharp` keeps one resize per pipeline, so cloning a pipeline that
   * already has the 16:10 crop queued and calling `.resize({ width })` on the
   * clone REPLACES the crop rather than composing with it — every derivative
   * came out at the source aspect ratio, and the card cropped it a second time
   * in CSS. Rasterising the crop once removes the ambiguity.
   */
  const cropped = await sharp(original)
    .resize({
      width: TARGET.width,
      height: TARGET.height,
      fit: 'cover',
      position: spec.position,
    })
    .toBuffer()

  const files = []
  for (const w of WIDTHS) {
    const suffix = w === TARGET.width ? '' : `-${w}w`
    const sized = sharp(cropped).resize({ width: w })
    for (const [ext, opts] of [
      ['avif', { quality: 55 }],
      ['webp', { quality: 78 }],
      ['jpg', { quality: 80, mozjpeg: true }],
    ]) {
      const file = path.join(IMAGES, `${spec.name}${suffix}.${ext}`)
      const buf = await sized.clone()[ext === 'jpg' ? 'jpeg' : ext](opts).toBuffer()
      await writeFile(file, buf)
      files.push(`public/images/${path.basename(file)}`)
    }
  }

  const title = spec.title.replace(/^File:/, '').replace(/\.[a-z]+$/i, '')
  const entry = {
    file: spec.name,
    provider: 'wikimedia-commons',
    sourceId: `commons:${spec.title.replace(/^File:/, '')}`,
    title,
    author,
    authorUrl: descriptionUrl,
    sourceUrl: descriptionUrl,
    license,
    licenseUrl,
    attributionRequired: true,
    creditLine: `${title} by ${author}, ${license}, via Wikimedia Commons`,
    downloadedAt: new Date().toISOString(),
    files,
  }

  const at = credits.findIndex((c) => c.file === spec.name)
  if (at >= 0) credits[at] = entry
  else credits.push(entry)

  console.log(`${spec.name}  ${author}  ${license}`)
}

await writeFile(CREDITS, `${JSON.stringify(credits, null, 2)}\n`, 'utf8')
console.log(`\nimage-credits.json now holds ${credits.length} entries.`)
console.log('Run: node scripts/build-image-manifest.mjs')
