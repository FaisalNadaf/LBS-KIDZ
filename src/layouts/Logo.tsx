import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/**
 * The LBS KidZ logo.
 *
 * These are the real supplied artwork files, cropped and keyed to transparency
 * by `scripts/build-logo-assets.mjs`. Nothing here is drawn, recoloured or
 * approximated: earlier versions of this component built a wordmark out of type
 * plus a wheat-stalk SVG because no logo file had been supplied, and that stand-in
 * is now gone.
 *
 * THREE VARIANTS, BECAUSE ONE LOCKUP CANNOT SERVE EVERY SLOT.
 *
 *   `wordmark`  LBS KidZ and the paper plane. The only variant that survives
 *               navbar height: at 40px the full lockup's initiative line is
 *               under 3px tall and the strapline is a smudge.
 *   `lockup`    The complete landscape artwork, straplines included. For the
 *               footer and anywhere the brand is introduced rather than merely
 *               identified, at 200px wide or more.
 *   `stacked`   The portrait artwork, for square-ish slots — the loading screen.
 *
 * ASPECT RATIOS ARE INTRINSIC AND FIXED. Every usage sets a height and lets the
 * width follow, so the artwork can never be stretched: there is no code path
 * here that sets both. The `width`/`height` attributes carry the real pixel
 * dimensions of each file so the box is reserved before the image decodes,
 * which is what keeps the navbar from shifting on first paint.
 */

/** Real pixel dimensions of each generated file, from its own manifest. */
export const logoVariants = {
  wordmark: { src: '/images/brand/lbs-kidz-wordmark.png', width: 960, height: 325 },
  lockup: { src: '/images/brand/lbs-kidz-lockup.png', width: 1100, height: 547 },
  stacked: { src: '/images/brand/lbs-kidz-stacked.png', width: 820, height: 910 },
  mark: { src: '/images/brand/lbs-kidz-mark.png', width: 512, height: 551 },
} as const

export type LogoVariant = keyof typeof logoVariants

/**
 * The artwork on its own, with no link and no wrapper.
 *
 * Split out for the loading screen, which needs the logo at eight times navbar
 * size and must not render a link: an overlay covering an `inert` site is no
 * place for a control that navigates, and it would be the one focusable thing
 * on screen.
 *
 * `alt=""` by default because in almost every position the logo sits inside
 * something that is already labelled — the home link, a heading, a figure. A
 * caller that puts it somewhere unlabelled passes its own `alt`.
 */
export function LogoArt({
  variant = 'wordmark',
  className,
  alt = '',
  priority = false,
}: {
  variant?: LogoVariant
  className?: string
  alt?: string
  priority?: boolean
}) {
  const art = logoVariants[variant]
  return (
    <img
      src={art.src}
      width={art.width}
      height={art.height}
      alt={alt}
      /* Height-driven: `w-auto` is what makes stretching impossible however the
         caller sizes it. */
      className={cn('w-auto', className)}
      decoding="async"
      draggable={false}
      loading={priority ? 'eager' : 'lazy'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      aria-hidden={alt === '' ? true : undefined}
    />
  )
}

/**
 * The logo as the site's home link. The navbar's and the footer's brand block.
 *
 * The artwork is shown exactly as supplied, on every ground. There is no dark
 * variant, and drawing one would mean recolouring the logo.
 *
 * NO OUTLINE ON DARK, BY CLIENT DIRECTION (15 Sep 2026). It used to carry a
 * 1.5px white outline and a soft shadow over the deep blue headers, because
 * three of its glyphs — the "L", the "B" bowl and the "K" — are the brand blue
 * and measure about 1.4:1 against a band a few steps deeper. The outline read as
 * a white glow behind the mark and was removed. Those glyphs are quieter over a
 * deep header as a result; the rest of the wordmark carries it, and the bar
 * turns white as soon as the reader scrolls. `onDark` is kept so a future
 * treatment has somewhere to go without touching the call sites.
 *
 * Sized 25% up from the previous build, by client direction (6 Oct 2026), so
 * the logo holds its own against the navigation beside it: 55px on phones and
 * tablets, 50px from 1100, 65px from `xl`. Between 1024 and 1099 it stays at
 * 40px: that is where the full desktop menu first appears, and anything larger
 * is squeezed by the menu, squashing the artwork and hiding the dropdown
 * chevrons. Measured: 50px first fits whole at 1088. The 40px band is a closed
 * range rather than a plain `lg:` because Tailwind emits arbitrary breakpoints
 * before named ones, so `lg:h-10` would beat `min-[1100px]:h-12.5`.
 */
export function Logo({
  className,
  variant = 'wordmark',
  sizeClassName = 'h-13.75 lg:max-[1100px]:h-10 min-[1100px]:h-12.5 xl:h-16.25',
}: {
  className?: string
  /** Accepted and currently unused: the mark is identical on every ground. */
  onDark?: boolean
  variant?: LogoVariant
  /** Sets the height. The width always follows the artwork. */
  sizeClassName?: string
}) {
  return (
    <Link
      to="/"
      className={cn(
        'group inline-flex items-center rounded-md transition-opacity duration-200 hover:opacity-90',
        className,
      )}
      aria-label="LBS KidZ, home"
    >
      <LogoArt
        variant={variant}
        priority
        className={sizeClassName}
      />
    </Link>
  )
}

/**
 * The full lockup on a light plaque, for use on the deep blue footer.
 *
 * The artwork's smallest line — "An Initiative of Lal Bahadur Shastri Group of
 * Institutions" — is set in near-black, so on the dark band it disappears
 * entirely while the rest of the logo still reads. Recolouring it is not an
 * option: it is the supplied artwork. Giving it a light surface to sit on keeps
 * every line of the real logo legible, and the plaque takes the site's own cut
 * corner so it reads as a designed brand block rather than as a pasted image.
 */
export function LogoPlaque({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        'corner-cut-lg group inline-flex bg-mist-50 p-4 shadow-lift transition-transform duration-300 ease-out-soft hover:-translate-y-0.5 sm:p-5',
        className,
      )}
      aria-label="LBS KidZ, home"
    >
      <LogoArt variant="lockup" className="h-20 sm:h-24" />
    </Link>
  )
}
