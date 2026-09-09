import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section } from '@/components/ui/layout'
import { ButtonLink, TextLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { PaperBoat } from '@/components/art/primitives'
import { routes } from '@/data/routes'

export function NotFoundPage() {
  return (
    <>
      <Seo page={pageSeo.notFound} />

      <Section tone="khadi" size="lg" className="pt-36">
        <Container size="narrow">
          <Reveal className="text-center">
            <div className="mx-auto h-20 w-auto motion-safe:animate-drift">
              <PaperBoat />
            </div>

            <h1 className="mt-8 text-4xl sm:text-5xl">This page has drifted off</h1>
            <p className="mx-auto mt-5 max-w-md text-body leading-relaxed text-ink-500">
              The address you followed does not point anywhere on our site. It may have moved, or
              it may never have existed.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to={routes.home} size="lg" withArrow>
                Back to the homepage
              </ButtonLink>
              <ButtonLink to={routes.sitemap} variant="secondary" size="lg">
                See every page
              </ButtonLink>
            </div>

            <p className="mt-10 text-sm text-ink-400">
              Looking for something specific? Try{' '}
              <TextLink to={routes.curriculum}>how we teach</TextLink> or{' '}
              <TextLink to={routes.admissions}>admissions</TextLink>.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

export default NotFoundPage
