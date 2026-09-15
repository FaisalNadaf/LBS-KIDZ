import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema } from '@/lib/schema'
import { Container, Section } from '@/components/ui/layout'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { contact, site } from '@/data/site'
import { zones } from '@/data/campuses'
import { routes } from '@/data/routes'
import { CTA_SEAM } from '@/components/ui/SectionDivider'

/**
 * Contact Us.
 *
 * "The page for a parent who's past browsing and wants to actually reach
 *  someone. Its job is to feel personal and responsive, not like dropping a
 *  message into a void."  Source: Contact Us Page Content (D20) S1.
 *
 * LAYOUT IS THE SPECIFICATION'S. D20 S4: "form on one side, 'Where We Are' and
 * 'Reaching Us Directly' as supporting panels on the other", matching the
 * two-column pattern on Fees & Admissions.
 *
 * THE HONEST PANEL. There is still no published phone line, WhatsApp number or
 * email, and D20 S8 confirms these are "not yet live", with S3 instructing the
 * page to state that rather than display placeholder details. The numbers that
 * do appear in the source documents are the SEP founder's on internal
 * letterhead, which is not a published school contact line, so they are not
 * used here either. See docs/decisions-and-todos.md item T-01.
 *
 * D20 S4 is specific about how that reads: "present as a reassuring note, not
 * an apology, this is a young, honest brand being upfront about where it is in
 * its own journey." It was previously set as a `PhaseNote`, the component this
 * site uses for "this is deliberately missing", which framed a normal stage of
 * a new school as a gap. It is a card with a heading now, the same weight as
 * the panel above it.
 *
 * The `hasDirectChannels` branch is live code, not dead code: filling in
 * `contact` in `data/site.ts` is all it takes to turn the real details on.
 */
export function ContactPage() {
  const hasDirectChannels =
    !contact.phone.pending || !contact.email.pending || !contact.whatsapp.pending

  return (
    <>
      <Seo page={pageSeo.contact} schemas={[organizationSchema()]} />

      <PageHeader
        eyebrow="Contact Us"
        title="Get in Touch"
        standfirst="Ask about a class, a fee, or a campus. A real person on our team will get back to you."
        photo="mother-son-sunny-day"
        photoFocus="42% 38%"
      />

      <Section tone="mist" divider={CTA_SEAM}>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Card object="contact-message" backdrop="sky-circle">
                  <h2 className="font-display text-h2 font-semibold text-brand-700">
                    Send Us a Message
                  </h2>
                  <p className="mt-2 text-body text-ink-500">
                    Tell us a little about your child, and we will come back to you.
                  </p>
                  <div className="mt-8">
                    <EnquiryForm />
                  </div>
                </Card>
              </Reveal>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Reveal>
                <Card tone="mist" object="contact-where" backdrop="peach-block">
                  <h2 className="font-display text-h3 font-semibold text-brand-700">
                    Where We Are
                  </h2>
                  <p className="mt-3 text-body text-ink-500">
                    We are opening across {site.city}, starting with five zones:{' '}
                    {zones.map((z) => z.name).join(', ')}.
                  </p>
                  <div className="mt-5">
                    <TextLink to={routes.campuses}>See All Five Zones</TextLink>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={0.06}>
                <Card object="contact-reach" backdrop="yellow-double">
                  <h2 className="font-display text-h3 font-semibold text-brand-700">
                    Reaching Us Directly
                  </h2>
                  {hasDirectChannels ? (
                    <ul className="mt-4 space-y-3 text-body text-ink-500">
                      {!contact.phone.pending ? (
                        <li>
                          <a href={`tel:${contact.phone.value}`} className="hover:text-sky-600">
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
                            className="hover:text-sky-600"
                          >
                            WhatsApp us
                          </a>
                        </li>
                      ) : null}
                      {!contact.email.pending ? (
                        <li>
                          <a
                            href={`mailto:${contact.email.value}`}
                            className="hover:text-sky-600"
                          >
                            {contact.email.display}
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  ) : (
                    <p className="mt-3 text-body text-ink-500">
                      Our published phone line, WhatsApp number, and email are being set up
                      alongside our first campus. Until then, this form reaches our team directly,
                      and we will call you back on the number you give us.
                    </p>
                  )}
                </Card>
              </Reveal>

              {/* Not in D20's four-section layout, and kept. A parent about to
                  hand over their phone number is entitled to know who receives
                  it, and this is the only place on the page that says so. */}
              <Reveal delay={0.1}>
                <Card tone="brand" object="contact-who-runs" backdrop="green-blob">
                  <h2 className="font-display text-h3 font-semibold text-mist-50">
                    Who runs LBS KidZ
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-mist-200/85">
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
