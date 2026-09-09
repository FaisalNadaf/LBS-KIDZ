import { lazy, Suspense, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { SiteLayout } from '@/layouts/SiteLayout'
import { routes } from '@/data/routes'
import { SITE_PHASE } from '@/data/site'
import { LoadingScreen } from '@/components/loading/LoadingScreen'
import { MotionRoot } from '@/animations/interactions'
import { ReadyContext } from '@/animations/ready'

/**
 * Routing.
 *
 * Home and the Curriculum page are eagerly bundled because they are the two
 * entry points the Keyword & AEO Strategy expects most first visits to land on.
 * Everything else is code-split, so a parent reading one page never downloads
 * the other twenty.
 */
import { HomePage } from '@/pages/HomePage'
import { CurriculumPage } from '@/pages/CurriculumPage'
import { ErrorPage } from '@/pages/ErrorPage'

const LegacyPage = lazy(() => import('@/pages/LegacyPage'))
const LbsWayPage = lazy(() => import('@/pages/LbsWayPage'))
const FamilyMessagePage = lazy(() => import('@/pages/FamilyMessagePage'))
const FoundersNotePage = lazy(() => import('@/pages/FoundersNotePage'))
const ValueStoriesPage = lazy(() => import('@/pages/ValueStoriesPage'))
const ParentingPage = lazy(() => import('@/pages/ParentingPage'))
const CampusesPage = lazy(() => import('@/pages/CampusesPage'))
const AdmissionsPage = lazy(() => import('@/pages/AdmissionsPage'))
const ProgramsPage = lazy(() => import('@/pages/ProgramsPage'))
const FeesPage = lazy(() => import('@/pages/FeesPage'))
const FaqsPage = lazy(() => import('@/pages/FaqsPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const RegisterInterestPage = lazy(() => import('@/pages/RegisterInterestPage'))
const SitemapPage = lazy(() => import('@/pages/SitemapPage'))
const PolicyPage = lazy(() => import('@/pages/PolicyPage'))
const ComingWithCampusesPage = lazy(() => import('@/pages/ComingWithCampusesPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <span
        className="size-8 animate-spin rounded-full border-2 border-khadi-300 border-t-terracotta-500 motion-reduce:animate-none"
        aria-hidden="true"
      />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    // Without an errorElement, React Router shows its own developer screen,
    // stack trace and all, to whoever is on the page.
    errorElement: <ErrorPage />,
    children: [
      { path: routes.home, element: <HomePage /> },

      // Curriculum. The long keyword-bearing slug is canonical; the short
      // variant named in the sitemap PDF redirects into it so there is exactly
      // one indexable URL for this page.
      { path: routes.curriculum, element: <CurriculumPage /> },
      {
        path: routes.curriculumShort,
        element: <Navigate to={routes.curriculum} replace />,
      },

      { path: routes.legacy, element: <LegacyPage /> },
      { path: routes.lbsWay, element: <LbsWayPage /> },
      { path: routes.familyMessage, element: <FamilyMessagePage /> },
      { path: routes.foundersNote, element: <FoundersNotePage /> },

      { path: routes.valueStories, element: <ValueStoriesPage /> },
      { path: routes.parenting, element: <ParentingPage /> },

      { path: routes.campuses, element: <CampusesPage /> },

      { path: routes.admissions, element: <AdmissionsPage /> },
      { path: routes.programs, element: <ProgramsPage /> },
      { path: routes.fees, element: <FeesPage /> },
      { path: routes.faqs, element: <FaqsPage /> },

      { path: routes.contact, element: <ContactPage /> },
      { path: routes.registerInterest, element: <RegisterInterestPage /> },
      { path: routes.sitemap, element: <SitemapPage /> },

      { path: routes.privacy, element: <PolicyPage policy="privacy" /> },
      { path: routes.terms, element: <PolicyPage policy="terms" /> },
      { path: routes.refund, element: <PolicyPage policy="refund" /> },
      { path: routes.childProtection, element: <PolicyPage policy="childProtection" /> },
      { path: routes.mandatoryDisclosure, element: <PolicyPage policy="mandatoryDisclosure" /> },

      /**
       * Phase 2 routes.
       *
       * The URLs are reserved now so that turning SITE_PHASE to 2 needs no
       * structural change, exactly as the sitemap requires for the Mandatory
       * Public Disclosure slot. Until then each renders an honest "not yet"
       * state rather than fabricated galleries, staff or testimonials, and
       * each is noindex and absent from sitemap.xml.
       */
      { path: routes.gallery, element: <ComingWithCampusesPage page="gallery" /> },
      { path: routes.educators, element: <ComingWithCampusesPage page="educators" /> },
      { path: routes.events, element: <ComingWithCampusesPage page="events" /> },
      { path: routes.testimonials, element: <ComingWithCampusesPage page="testimonials" /> },
      { path: routes.admissionProcess, element: <ComingWithCampusesPage page="admissionProcess" /> },
      { path: routes.careers, element: <ComingWithCampusesPage page="careers" /> },
      { path: routes.downloads, element: <ComingWithCampusesPage page="downloads" /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  /**
   * The first-load screen, and the site it covers.
   *
   * Mounted here rather than inside `SiteLayout` for two reasons: it must be
   * outside the router, so a client-side navigation can never bring it back,
   * and it must not be inside the `Suspense` boundary above — a lazy route
   * resolving would otherwise swap the loader for `PageFallback`, replacing a
   * composed brand moment with a spinner.
   *
   * `inert` is what keeps the site underneath genuinely unreachable rather than
   * merely hidden. The overlay covers it and locks scrolling, but without this
   * a Tab press would still walk into the navbar and the hero behind it, and a
   * screen reader would read a page nobody can see. The wrapper is a plain div
   * with no styling: `body` is not a flex or grid container and nothing in the
   * stylesheet selects on `#root`'s children, so it changes no layout.
   */
  const [loading, setLoading] = useState(true)

  return (
    <MotionRoot>
      {loading ? <LoadingScreen onDone={() => setLoading(false)} /> : null}
      <div inert={loading || undefined}>
        {/* The navbar's opening move waits on this, so it is not performed
            behind an opaque overlay. See `animations/ready.ts`. */}
        <ReadyContext.Provider value={!loading}>
          <Suspense fallback={<PageFallback />}>
            <RouterProvider router={router} />
          </Suspense>
        </ReadyContext.Provider>
      </div>
    </MotionRoot>
  )
}

export { SITE_PHASE }
