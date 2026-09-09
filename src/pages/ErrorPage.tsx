import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { Container, Section } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/Button'
import { PaperBoat } from '@/components/art/primitives'
import { routes } from '@/data/routes'

/**
 * Route-level error boundary.
 *
 * Without one, React Router falls back to its own developer screen, which shows
 * a raw stack trace to whoever is on the page. A parent should never see that.
 *
 * A 404 reaches this only if a loader throws one; ordinary unknown URLs are
 * handled by the catch-all route and render the friendlier NotFoundPage.
 */
export function ErrorPage() {
  const error = useRouteError()

  const is404 = isRouteErrorResponse(error) && error.status === 404
  const detail =
    error instanceof Error
      ? error.message
      : isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : null

  // The stack is useful to whoever is building the site, and useless to a
  // parent, so it goes to the console rather than onto the page.
  if (import.meta.env.DEV && error) {
    console.error('Route error:', error)
  }

  return (
    <Section tone="khadi" size="lg" className="pt-36">
      <title>Something went wrong | LBS KidZ</title>
      <meta name="robots" content="noindex, nofollow" />

      <Container size="narrow">
        <div className="text-center">
          <div className="mx-auto h-20 w-auto">
            <PaperBoat />
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl">
            {is404 ? 'This page has drifted off' : 'Something went wrong at our end'}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-body leading-relaxed text-ink-500">
            {is404
              ? 'The address you followed does not point anywhere on our site.'
              : 'This page did not load properly. It is our problem, not yours. Reloading usually sorts it, and everything else on the site still works.'}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to={routes.home} size="lg" withArrow>
              Back to the homepage
            </ButtonLink>
            <ButtonLink to={routes.contact} variant="secondary" size="lg">
              Contact Us
            </ButtonLink>
          </div>

          {import.meta.env.DEV && detail ? (
            <p className="mx-auto mt-10 max-w-lg rounded-md bg-khadi-200 px-4 py-3 text-left font-mono text-xs text-ink-500">
              {detail}
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}

export default ErrorPage
