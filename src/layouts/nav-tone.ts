import { createContext, useContext } from 'react'

/**
 * Inner pages open on a deep-blue PageHero, so a navbar drawn in ink-on-khadi
 * would be invisible against it until the reader scrolls. PageHero registers
 * itself here and the navbar switches to its light-on-dark treatment while the
 * page is still at the top.
 *
 * A context rather than a scroll-position guess: it stays correct if a page
 * ever opens on a light hero, and it needs no measurement on every frame.
 */
export type NavTone = 'dark-hero' | 'light-hero'

export const NavToneContext = createContext<{
  tone: NavTone
  setTone: (tone: NavTone) => void
}>({ tone: 'light-hero', setTone: () => {} })

export const useNavTone = () => useContext(NavToneContext)
