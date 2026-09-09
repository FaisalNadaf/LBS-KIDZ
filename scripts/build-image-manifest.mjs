/**
 * Builds src/data/media.ts from what is actually on disk in public/images.
 *
 * Every photograph is downloaded as a set of widths in avif, webp and jpg by
 * the sourcing toolkit, which also writes image-credits.json. Rather than
 * hand-maintaining a parallel list in TypeScript (which drifts the moment an
 * image is swapped), this reads the directory, measures each file, and emits a
 * typed manifest the <Photo> component renders from.
 *
 * Re-run after adding or replacing anything in public/images:
 *   node scripts/build-image-manifest.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = join(root, 'public', 'images')
const creditsFile = join(root, 'image-credits.json')

const credits = JSON.parse(readFileSync(creditsFile, 'utf8'))
const creditByName = new Map(credits.map((entry) => [entry.file, entry]))

/**
 * Alt text is written by hand rather than taken from the stock library's own
 * caption: the library describes the photograph, we need to describe what it is
 * doing on this page. Anything not listed here falls back to the caption, which
 * is a bug worth noticing rather than a silent shrug.
 */
const alt = {
  'class-sorting-play':
    'Young children sitting on the floor of a playroom, sorting coloured balls into a wooden tray',
  'class-drawing-table':
    'Two children drawing on paper at a low classroom table',
  'girl-writing-classroom':
    'A young girl at a classroom table, writing in a workbook with a coloured pencil',
  'boy-at-chalkboard':
    'A small boy standing at an easel chalkboard, drawing with a piece of chalk',
  'child-standing-yellow':
    'A young girl in a yellow kurta, standing and smiling at the camera',
  'child-standing-dungarees':
    'A small boy in denim dungarees, standing and smiling at the camera',
  'child-running-joy': 'A girl in a yellow kurta running, mid-stride and laughing',
  'counting-tray':
    'A child working through a counting tray on her own at a low wooden table',
  'working-together':
    'Three children side by side at a table, each working with their own materials',
  'letter-board': 'A child tracing letters on a wooden board with his fingertip',
  'stacking-blocks': 'A child stacking coloured wooden blocks into a tower',
  'counting-frame': 'A child moving beads across a wooden counting frame',
  'children-school-ground':
    'Five children running together across a school ground, hand in hand',
  'children-in-the-field': 'A group of children running through an open field',
  'parent-and-child':
    'A father and his small son reading a picture book together on the floor at home',
  'family-at-home': 'A mother and her young son, both smiling, outside their home',
  'reading-devanagari': 'A child holding an open book printed in Devanagari script',
  'child-reading': 'A child lying on the floor, absorbed in a picture book',
  'hands-with-crayons': "A small child's hand drawing with a wax crayon",
  'hands-painting': "A child's hand painting with a brush and a tray of watercolours",
  'learning-materials':
    'A wooden counting frame with coloured beads, one of the materials used in an activity corner',

  /* --- Added for the one-image-per-slot pass. Each is chosen for a specific
         section, and the age of the child matches the age the section is
         about: toddlers for Playgroup, four- and five-year-olds for Nursery
         and LKG, older children only where the copy is about older children. */
  'blocks-toddler': 'A toddler at a low table, lining up coloured wooden blocks',
  'toddler-focused': 'A small boy absorbed in what is in front of him',
  'boy-white-polo': 'A boy of about five in a white school polo shirt, smiling',
  'boy-with-ball': 'A boy holding a basketball, grinning',
  'child-arms-open': 'A child in a red kurta laughing with both arms flung open',
  'girl-blue-kurta': 'A girl of about five in a blue kurta with a lace collar',
  'girl-yellow-clip': 'A young girl in a yellow kurta with a flower clip in her hair',
  'girl-green-dress': 'A small girl in a green dress standing on grass with her hands raised',
  'girl-blue-door': 'A girl in school uniform standing in front of a weathered blue door',
  'laughing-girl': 'A girl laughing with her mother, one hand raised to her face',
  'curious-child': 'A boy balancing an open book on his head and peering through a magnifying glass',
  'family-portrait': 'A mother and father standing outdoors holding their baby',
  'school-friends': 'A group of schoolchildren standing together in front of a yellow door',
  'walking-to-school': 'Children walking to school together with backpacks on',
  'circle-storytime': 'Schoolchildren gathered around an adult, listening, away from the classroom',
  'project-model': 'Children looking at a model village they have built, its parts labelled in Hindi',
  'craft-outdoors': 'A girl in a yellow kurta kneeling on the ground to paint',
  'craft-table': "Children's hands cutting and arranging coloured paper into a flower",
  'writing-practice': 'Two girls in school uniform writing at their desks',
  'writing-hand': "A child's hand writing in a notebook",
  'school-kit': 'An open school bag packed with books, pencils and a ruler',
  'lunch-box': 'A lunch box, a pencil and a glue stick on a desk',
  'wheat-sunrise': 'A wheat field at sunrise',
}

/* ---- Group every file on disk by image name and format ---- */

const files = readdirSync(imagesDir).filter((f) => /\.(avif|webp|jpg)$/.test(f))
const images = new Map()

for (const file of files) {
  const match = file.match(/^(.+?)(?:-(\d+)w)?\.(avif|webp|jpg)$/)
  if (!match) continue
  const [, name, width, format] = match
  if (!images.has(name)) images.set(name, { name, variants: [] })
  images.get(name).variants.push({ file, width: width ? Number(width) : null, format })
}

/* ---- Measure, and fill in the width of the unsuffixed original ---- */

const manifest = []

for (const image of [...images.values()].sort((a, b) => a.name.localeCompare(b.name))) {
  const jpg = image.variants.find((v) => v.format === 'jpg' && v.width === null)
  if (!jpg) {
    console.warn(`skipping ${image.name}: no full-size jpg`)
    continue
  }

  const meta = await sharp(join(imagesDir, jpg.file)).metadata()
  const widths = [
    ...new Set(
      image.variants
        .filter((v) => v.format === 'jpg')
        .map((v) => v.width ?? meta.width),
    ),
  ].sort((a, b) => a - b)

  // Average colour, used as the placeholder ground behind a photo while it
  // loads. Cheaper and steadier than a blurhash, and it never flashes white.
  const { dominant } = await sharp(join(imagesDir, jpg.file)).stats()
  const hex =
    '#' +
    [dominant.r, dominant.g, dominant.b]
      .map((c) => c.toString(16).padStart(2, '0'))
      .join('')

  const credit = creditByName.get(image.name)

  manifest.push({
    name: image.name,
    width: meta.width,
    height: meta.height,
    widths,
    tint: hex,
    alt: alt[image.name] ?? credit?.title ?? image.name,
    credit: credit
      ? { author: credit.author, source: credit.provider, url: credit.sourceUrl }
      : null,
  })
}

/* ---- Emit ---- */

const body = manifest
  .map((image) => {
    const credit = image.credit
      ? `{ author: ${JSON.stringify(image.credit.author)}, source: ${JSON.stringify(
          image.credit.source,
        )}, url: ${JSON.stringify(image.credit.url)} }`
      : 'null'
    return `  '${image.name}': {
    width: ${image.width},
    height: ${image.height},
    widths: [${image.widths.join(', ')}],
    tint: '${image.tint}',
    alt: ${JSON.stringify(image.alt)},
    credit: ${credit},
  },`
  })
  .join('\n')

const out = `/**
 * Photograph manifest. GENERATED — do not edit by hand.
 * Run \`node scripts/build-image-manifest.mjs\` after changing public/images.
 *
 * These photographs show early childhood and early-years learning as it really
 * looks. None is presented anywhere on the site as an LBS KidZ campus, class,
 * child or educator, and licence provenance for every file is kept in
 * image-credits.json. See docs/decisions-and-todos.md item C-04.
 */

export type PhotoMeta = {
  width: number
  height: number
  /** Widths available on disk, ascending. Used to build the srcset. */
  widths: number[]
  /** Average colour, painted behind the image so nothing flashes white. */
  tint: string
  alt: string
  credit: { author: string; source: string; url: string } | null
}

export const photos = {
${body}
} as const satisfies Record<string, PhotoMeta>

export type PhotoName = keyof typeof photos
`

writeFileSync(join(root, 'src', 'data', 'media.ts'), out)
console.log(`wrote src/data/media.ts with ${manifest.length} images`)
