import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { m } from 'framer-motion'
import { cn } from '@/lib/cn'
import { navbarVariants, navRegionVariants } from '@/animations/motion'
import { useAppReady } from '@/animations/ready'
import { primaryCta } from '@/data/site'
import { Container } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/Button'
import { Logo } from '../Logo'
import { useNavTone } from '../nav-tone'
import { ScrollProgress } from '@/animations/Scroll'
import { useDismissable, useLockBodyScroll, useScrollState } from '@/hooks'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'
import { MenuIcon } from './MenuIcon'

/**
 * Primary navigation.
 *
 * Structure is fixed by Full Website Sitemap S1.1 / S1.2: dropdowns exist only
 * where the sitemap defines a group, no item changes position or URL between
 * phases, and the Register Interest CTA is right-aligned and persistently
 * visible outside the dropdown structure.
 *
 * WHY THIS IS A FOLDER. It was one 390-line file holding the bar, both
 * indicators, the dropdown panel and the mobile sheet, and the three had
 * nothing to say to each other beyond which group is open. Split, the desktop
 * bar can own its pointer tracking and the sheet can own its accordions without
 * either being a branch inside the other.
 *
 * TWO COLOUR STATES. Transparent over the hero, and a khadi bar once scrolled.
 * Over a dark page header the transparent state flips to light-on-dark;
 * otherwise the wordmark and links would be ink on deep blue.
 *
 * THE BAR'S HEIGHT DOES NOT CHANGE ON SCROLL, and that is deliberate rather
 * than an omission. It is `--nav-h`, which `scroll-padding-top` and every page
 * header's top inset are measured from, so a bar that shrank would silently
 * move every in-page anchor target on the site. The scrolled state earns its
 * distinction through surface instead: a blur, a hairline and a shadow.
 */
export function Navbar() {
  const scrolled = useScrollState(16)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const { pathname } = useLocation()
  const { tone } = useNavTone()
  const ready = useAppReady()

  useLockBodyScroll(mobileOpen)

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false)
    setOpenGroup(null)
  }, [pathname])

  const closeGroup = useCallback(() => setOpenGroup(null), [])
  // Escape, and any pointer press outside the bar, close an open dropdown.
  const navRef = useDismissable<HTMLDivElement>(Boolean(openGroup), closeGroup)

  const solid = scrolled || mobileOpen
  const onDark = !solid && tone === 'dark-hero'

  return (
    <>
      <a
        href="#main"
        className="sr-only z-100 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-indigo-ink-700 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-khadi-50"
      >
        Skip to main content
      </a>

      <m.header
        initial="hidden"
        animate={ready ? 'shown' : 'hidden'}
        variants={navbarVariants}
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          'transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out-soft',
          solid
            ? 'border-b border-khadi-300/70 bg-khadi-50/85 shadow-soft backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container size="wide">
          <div
            ref={navRef}
            className="flex h-18 items-center justify-between gap-4 lg:h-20 lg:gap-6"
          >
            {/* The three regions arrive in reading order behind the bar's own
                drop, which is what makes the entrance read as a bar being set
                rather than a block appearing. */}
            <m.div variants={navRegionVariants}>
              <Logo onDark={onDark} />
            </m.div>

            <m.div variants={navRegionVariants} className="hidden lg:block">
              <DesktopNav onDark={onDark} openGroup={openGroup} setOpenGroup={setOpenGroup} />
            </m.div>

            <m.div variants={navRegionVariants} className="flex items-center gap-1.5">
              {/* Wrapped rather than given `hidden sm:inline-flex` directly: the
                  button's own `inline-flex` would win the specificity tie and
                  show it at every width. */}
              <div className="hidden sm:block">
                <ButtonLink to={primaryCta.href} size="sm" className="whitespace-nowrap">
                  {primaryCta.label}
                </ButtonLink>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                className={cn(
                  'grid size-11 place-items-center rounded-lg transition-colors duration-200 lg:hidden',
                  onDark
                    ? 'text-khadi-50 hover:bg-khadi-50/15'
                    : 'text-indigo-ink-700 hover:bg-khadi-200',
                )}
              >
                <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
                <MenuIcon open={mobileOpen} />
              </button>
            </m.div>
          </div>
        </Container>

        {/* Reading progress, drawn only once the bar has a surface to sit on.
            Over a transparent hero it would be a line floating on a photograph. */}
        {solid ? <ScrollProgress /> : null}

        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </m.header>
    </>
  )
}
