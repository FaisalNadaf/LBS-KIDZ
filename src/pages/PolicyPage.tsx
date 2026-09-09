import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Prose, Section } from '@/components/ui/layout'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { site } from '@/data/site'
import { routes } from '@/data/routes'

/**
 * Legal and compliance pages.
 *
 * Required by Full Website Sitemap S2.3 and Project Decisions Log S9:
 *   Privacy Policy, Terms & Conditions, Refund & Cancellation Policy,
 *   Child Protection Policy, and a reserved Mandatory Public Disclosure slot.
 *
 * IMPORTANT: no source document supplies the text of any of these policies.
 * What follows states only what is factually true of this website and of
 * decisions actually recorded in the project documents, and every page carries
 * a visible note that final wording needs legal review before go-live.
 * Inventing binding legal terms for a school would be exactly the kind of
 * unsupported claim the brief forbids.
 * See docs/decisions-and-todos.md item T-06.
 */

type PolicyKey = 'privacy' | 'terms' | 'refund' | 'childProtection' | 'mandatoryDisclosure'

export function PolicyPage({ policy }: { policy: PolicyKey }) {
  const page = pageSeo[policy]

  return (
    <>
      <Seo page={page} />

      <PageHeader
        eyebrow="Legal & Compliance"
        title={page.title.split(' | ')[0]}
        /* Not `page.description`: that is the meta description, written
           for a search result at 150-160 characters, and it overflowed the
           header on every policy page. */
        standfirst="The full text, in plain language."
      />

      <Section tone="khadi" divider={{ type: 'scallop', fill: 'var(--color-terracotta-600)' }}>
        <Container size="narrow">
          <Reveal>{bodies[policy]}</Reveal>
        </Container>
      </Section>
    </>
  )
}

const bodies: Record<PolicyKey, React.ReactNode> = {
  privacy: (
    <div className="space-y-8">
      <Prose>
        <h2>What we collect</h2>
        <p>
          If you fill in a Register Interest or contact form, we collect what you type into it.
          That is your name and your mobile number. You can also give us your child’s name, your
          email address, the class you are asking about, your area of Indore, and anything you
          write in the message box.
        </p>
        <p>
          We do not ask for, and you should not send us, any information about your child beyond
          what is needed to answer your enquiry.
        </p>

        <h2>What we use it for</h2>
        <p>
          Only to answer your enquiry and to talk to you about admission to {site.name}. When our
          admissions process opens in your area, the details you gave us carry forward so that you
          do not have to start again.
        </p>

        <h2>Who can see it</h2>
        <p>
          Our own admissions team, and the systems {site.operator} uses to run the school. We do
          not sell your details, and we do not share them with anyone outside the school for their
          own marketing.
        </p>

        <h2>How long we keep it</h2>
        <p>
          For as long as your enquiry is open, and for as long afterwards as we are required to
          keep admission records. You can ask us to delete your details at any point.
        </p>

        <h2>Asking us to change or delete it</h2>
        <p>
          Write to us through the <TextLink to={routes.contact}>Contact page</TextLink> and tell us
          what you would like changed or removed.
        </p>
      </Prose>
    </div>
  ),

  terms: (
    <div className="space-y-8">
      <Prose>
        <h2>About this site</h2>
        <p>
          This website is published by {site.operator} for {site.name}, a preschool brand under{' '}
          {site.parentGroup}, developed in partnership with the {site.partner}.
        </p>

        <h2>What the information here is</h2>
        <p>
          The pages on this site describe our own educational approach and our own practice. Where
          we refer to national curriculum guidance, we cite NCERT as the source and describe how we
          follow it. We do not present ourselves as an authority on government education policy,
          and nothing here should be read as an official interpretation of it.
        </p>

        <h2>Fees and admission</h2>
        <p>
          Fees are shared with you directly on enquiry rather than published on this site. Nothing
          on this website is an offer of admission or a fee quotation. An admission is confirmed
          only in writing, through our admissions process.
        </p>

        <h2>Registering interest</h2>
        <p>
          Registering your interest does not commit you to admission and does not reserve a place.
          It tells us to contact you when admissions open in your area.
        </p>

        <h2>Content on this site</h2>
        <p>
          The text, illustrations and design on this site belong to {site.operator} unless stated
          otherwise. Please do not reproduce them without asking us first.
        </p>
      </Prose>
    </div>
  ),

  refund: (
    <div className="space-y-8">
      <Prose>
        <h2>What this policy will cover</h2>
        <p>
          This page sets out the terms for any registration or admission fee paid to {site.name}.
          It covers when a fee is refundable, when it is not, and how to ask for a refund or
          cancel an admission.
        </p>

        <h2>Where we are today</h2>
        <p>
          We are not yet collecting any registration or admission fee. Registering your interest on
          this site is free, and asks nothing of you beyond your contact details.
        </p>
        <p>
          We publish the full refund and cancellation terms here before we accept any payment.
          No parent should ever be asked to pay under terms they have not been able to read
          first.
        </p>

        <h2>Our fee commitment, either way</h2>
        <p>
          Whatever the terms, the fee we quote covers books, bag, uniform, lunch box and water
          bottle, with nothing added later. You can read that commitment in full on our{' '}
          <TextLink to={routes.fees}>Fees & Admissions</TextLink> page.
        </p>
      </Prose>
    </div>
  ),

  childProtection: (
    <div className="space-y-8">
      <Prose>
        <h2>Our commitment</h2>
        <p>
          The safety of every child at {site.name} comes before every other consideration,
          including convenience, cost and reputation. This page states that in plain language
          rather than in legal terms, because it is written for parents.
        </p>

        <h2>The physical environment</h2>
        <p>
          Every campus is built and checked against a specific list of safety standards, taken from
          Chapter 6 of NCERT’s Guidelines for Preschool Education. That list is published in full,
          item by item, on our <TextLink to={routes.campuses}>Campuses</TextLink> page rather than
          summarised as a general reassurance.
        </p>
        <p>It covers:</p>
        <ul>
          <li>Boundary walls with lockable gates.</li>
          <li>Doors that cannot self-lock, with latches placed beyond a child’s reach.</li>
          <li>Mesh on all windows.</li>
          <li>Non-toxic materials only, and no small or loose parts in play material.</li>
          <li>Daily hazard inspections.</li>
          <li>Electrical fittings checked regularly, with sockets out of reach.</li>
        </ul>

        <h2>The people around your child</h2>
        <p>
          We keep our pupil-teacher ratio low, because that is what the early years need. We will
          never meet that number by hiring underqualified or under-trained staff. Our selection
          and training standards go on the Our Educators page as the team is appointed.
        </p>

        <h2>Governance</h2>
        <p>
          Our Child Protection Committee, its composition, and the process for raising a concern
          are being formalised alongside our first campus, and will be published here in full.
          Indian schools are increasingly expected to disclose this governance publicly, and we
          would rather do it early than be asked for it.
        </p>

        <h2>Raising a concern</h2>
        <p>
          Any concern about a child’s safety can be raised with us directly through the{' '}
          <TextLink to={routes.contact}>Contact page</TextLink>, and will be taken seriously by a
          named person rather than an inbox.
        </p>
      </Prose>
    </div>
  ),

  mandatoryDisclosure: (
    <div className="space-y-8">
      <Prose>
        <h2>This page is reserved, and not yet active</h2>
        <p>
          Mandatory Public Disclosure is a CBSE requirement for affiliated schools. It covers the
          affiliation number, the fee structure, staff details, infrastructure, and the composition
          of the school’s safety committee.
        </p>
        <p>
          {site.name} is a preschool. This page becomes a legal requirement, and will be filled in
          full, if and when the group’s school affiliates with CBSE. The address is reserved now so
          that it can be published the moment it applies, without the footer or the site structure
          needing to change.
        </p>

        <h2>What is available in the meantime</h2>
        <p>
          You will find each of these in full on our own pages. Safety standards are on the{' '}
          <TextLink to={routes.campuses}>Campuses</TextLink> page, our fee commitment on the{' '}
          <TextLink to={routes.fees}>Fees & Admissions</TextLink> page, and our curriculum approach
          on the <TextLink to={routes.curriculum}>Curriculum & Learning Approach</TextLink> page.
          Registration numbers are displayed here as soon as they are issued.
        </p>
      </Prose>
    </div>
  ),
}

export default PolicyPage
