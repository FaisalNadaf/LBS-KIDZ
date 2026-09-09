import { createContext, useContext } from 'react'

/**
 * Whether the site is actually on screen yet.
 *
 * The loading screen covers the whole viewport for its first four seconds, and
 * the app underneath is mounted and running the entire time. Anything that
 * animates on mount therefore performs to nobody and is finished before the
 * reader sees it — which is fine for the hero, whose settled state is exactly
 * what the loader should hand over to, and wrong for the navbar, whose whole
 * job is to arrive.
 *
 * So `App` publishes one boolean and the few components with a genuine opening
 * move wait for it. Deliberately a context rather than a prop chain: the
 * navbar is four levels down inside the router, and threading a flag through
 * `SiteLayout` for one animation would put presentation state into components
 * that have no other reason to know about it.
 *
 * Defaults to `true`, so anything rendered outside the provider — a test, a
 * component mounted in isolation — animates immediately rather than never.
 */
export const ReadyContext = createContext(true)

export function useAppReady() {
  return useContext(ReadyContext)
}
