import { Link } from 'react-router-dom'
import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Chip } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/animations/Reveal'
import { SITE_PHASE } from '@/data/site'
import { routes } from '@/data/routes'

/**
 * Plain HTML sitemap.
 *
 * "A plain HTML sitemap page (distinct from the technical XML sitemap for
 *  search engines) should be built and linked in the footer - both aid
 *  discoverability."  Source: Full Website Sitemap S4 (Notes for Sarvesh).
 *
 * Pages not yet live are listed and labelled rather than hidden, so a reader
 * can see the shape of the whole site.
 */

type Entry = { label: string; href: string; phase: 1 | 2 }

const groups: { title: string; entries: Entry[] }[] = [
  {
    title: 'Main',
    entries: [
      { label: 'Home', href: routes.home, phase: 1 },
      { label: 'Curriculum & Learning Approach', href: routes.curriculum, phase: 1 },
      { label: 'Campuses', href: routes.campuses, phase: 1 },
      { label: 'Contact Us', href: routes.contact, phase: 1 },
      { label: 'Register Interest', href: routes.registerInterest, phase: 1 },
    ],
  },
  {
    title: 'Shastri Ji Legacy',
    entries: [
      { label: 'LBS Legacy', href: routes.legacy, phase: 1 },
      { label: 'The Lal Bahadur Shastri Way', href: routes.lbsWay, phase: 1 },
      {
        label: 'A Message from the Lal Bahadur Shastri Family',
        href: routes.familyMessage,
        phase: 1,
      },
      { label: 'Founder’s Note', href: routes.foundersNote, phase: 1 },
    ],
  },
  {
    title: 'For Parents',
    entries: [
      { label: 'Value Stories', href: routes.valueStories, phase: 1 },
      { label: 'Parenting Tips & Resources', href: routes.parenting, phase: 1 },
    ],
  },
  {
    title: 'Admissions',
    entries: [
      { label: 'Admissions', href: routes.admissions, phase: 1 },
      { label: 'Programs & Classes', href: routes.programs, phase: 1 },
      { label: 'Fees & Admissions', href: routes.fees, phase: 1 },
      { label: 'FAQs', href: routes.faqs, phase: 1 },
      { label: 'Admission Process', href: routes.admissionProcess, phase: 2 },
    ],
  },
  {
    title: 'School Life',
    entries: [
      { label: 'Gallery', href: routes.gallery, phase: 2 },
      { label: 'Our Educators', href: routes.educators, phase: 2 },
      { label: 'Events & News', href: routes.events, phase: 2 },
      { label: 'Testimonials', href: routes.testimonials, phase: 2 },
    ],
  },
  {
    title: 'Legal & Compliance',
    entries: [
      { label: 'Privacy Policy', href: routes.privacy, phase: 1 },
      { label: 'Terms & Conditions', href: routes.terms, phase: 1 },
      { label: 'Refund & Cancellation Policy', href: routes.refund, phase: 1 },
      { label: 'Child Protection Policy', href: routes.childProtection, phase: 1 },
      { label: 'Mandatory Public Disclosure', href: routes.mandatoryDisclosure, phase: 2 },
    ],
  },
  {
    title: 'Utility',
    entries: [
      { label: 'Sitemap', href: routes.sitemap, phase: 1 },
      { label: 'Careers', href: routes.careers, phase: 2 },
      { label: 'Downloads', href: routes.downloads, phase: 2 },
    ],
  },
]

export function SitemapPage() {
  return (
    <>
      <Seo page={pageSeo.sitemap} />

      <PageHeader
        eyebrow="Sitemap"
        title="Every page on this site"
        standfirst="Including the pages that arrive with our first campus, so you can see the shape of the whole thing."
      />

      <Section tone="khadi" divider={{ type: 'tight-wave', fill: 'var(--color-terracotta-600)' }}>
        <Container size="wide">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Reveal key={group.title}>
                <SectionHeader as="h2" title={group.title} className="max-w-none" />
                <ul className="mt-5 space-y-2.5">
                  {group.entries.map((entry) => {
                    const live = entry.phase <= SITE_PHASE
                    return (
                      <li key={entry.href} className="flex flex-wrap items-center gap-2">
                        <Link
                          to={entry.href}
                          className="-my-2 inline-block py-2 text-body text-ink-600 underline-offset-4 transition-colors hover:text-terracotta-600 hover:underline"
                        >
                          {entry.label}
                        </Link>
                        {live ? null : <Chip tone="muted">With our first campus</Chip>}
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

    </>
  )
}

export default SitemapPage
