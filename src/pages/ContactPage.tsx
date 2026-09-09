import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema } from '@/lib/schema'
import { Container, Section } from '@/components/ui/layout'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { PhaseNote } from '@/components/ui/misc'
import { TextLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { contact, site } from '@/data/site'
import { zones } from '@/data/campuses'
import { routes } from '@/data/routes'

/**
 * Contact Us.
 *
 * Public contact details are a pending open item: no school phone number,
 * email or address appears in any source document. The numbers that do appear
 * are the SEP founder's on internal letterhead, which is not a published school
 * contact line, so they are not used.
 * See docs/decisions-and-todos.md item T-01.
 *
 * Until those are supplied, the enquiry form is the working contact channel and
 * the page says so plainly rather than showing a placeholder number.
 */
export function ContactPage() {
  const hasDirectChannels =
    !contact.phone.pending || !contact.email.pending || !contact.whatsapp.pending

  return (
    <>
      <Seo page={pageSeo.contact} schemas={[organizationSchema()]} />

      <PageHeader
        eyebrow="Contact Us"
        title="Talk to us"
        standfirst="Ask about a class, a fee or a campus. A person will answer, not a form letter."
        photo="laughing-girl"
      />

      <Section tone="khadi" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Card object="contact-message" backdrop="sky-circle">
                  <h2 className="font-display text-h2 font-semibold text-indigo-ink-700">
                    Send us a message
                  </h2>
                  <p className="mt-2 text-body text-ink-500">
                    Tell us a little about your child and we will come back to you.
                  </p>
                  <div className="mt-8">
                    <EnquiryForm />
                  </div>
                </Card>
              </Reveal>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Reveal>
                <Card tone="sand" object="contact-where" backdrop="peach-block">
                  <h2 className="font-display text-h3 font-semibold text-indigo-ink-700">
                    Where we are
                  </h2>
                  <p className="mt-3 text-body text-ink-500">
                    We are opening across {site.city}, starting with{' '}
                    {zones.map((z) => z.name).join(', ')}.
                  </p>
                  <div className="mt-5">
                    <TextLink to={routes.campuses}>See the zones</TextLink>
                  </div>
                </Card>
              </Reveal>

              {hasDirectChannels ? (
                <Reveal delay={0.06}>
                  <Card object="contact-reach" backdrop="yellow-double">
                    <h2 className="font-display text-h3 font-semibold text-indigo-ink-700">
                      Reach us directly
                    </h2>
                    <ul className="mt-4 space-y-3 text-body text-ink-500">
                      {!contact.phone.pending ? (
                        <li>
                          <a href={`tel:${contact.phone.value}`} className="hover:text-terracotta-600">
                            {contact.phone.display}
                          </a>
                        </li>
                      ) : null}
                      {!contact.whatsapp.pending ? (
                        <li>
                          <a
                            href={`https://wa.me/${contact.whatsapp.value}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="hover:text-terracotta-600"
                          >
                            WhatsApp us
                          </a>
                        </li>
                      ) : null}
                      {!contact.email.pending ? (
                        <li>
                          <a
                            href={`mailto:${contact.email.value}`}
                            className="hover:text-terracotta-600"
                          >
                            {contact.email.display}
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </Card>
                </Reveal>
              ) : (
                <Reveal delay={0.06}>
                  <PhaseNote>
                    Our published phone line, WhatsApp number and email are being set up alongside
                    our first campus. Until then this form reaches our team directly, and we will
                    call you back on the number you give us.
                  </PhaseNote>
                </Reveal>
              )}

              <Reveal delay={0.1}>
                <Card tone="indigo" object="contact-who-runs" backdrop="green-blob">
                  <h2 className="font-display text-h3 font-semibold text-khadi-50">
                    Who runs LBS KidZ
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-khadi-200/85">
                    A preschool brand under {site.parentGroup}, built in partnership between{' '}
                    {site.operator} and the {site.partner}.
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

    </>
  )
}

export default ContactPage
