import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { faqSchema, organizationSchema } from '@/lib/schema'
import { Container, Section } from '@/components/ui/layout'
import { Card, Chip } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/Button'
import { Reveal } from '@/animations/Reveal'
import { faqCategories, faqs, faqsOutro } from '@/data/admissions'
import { routes } from '@/data/routes'
import { cn } from '@/lib/cn'
import { CTA_SEAM } from '@/components/ui/SectionDivider'

/**
 * FAQs.
 *
 * "A single, comprehensive place for the questions parents actually ask,
 *  pulling together facts already established across Curriculum, Programs &
 *  Classes, Fees & Admissions, and Campuses into one scannable page."
 *  Source: FAQs Page Content (D19) S1.
 *
 * This is the one page on the site where restating another page's fact is the
 * job rather than duplication: a parent comes here to get a straight answer
 * without reading four pages, and each answer routes onward for the detail.
 *
 * FOURTEEN QUESTIONS, IN FOUR GROUPS. The page previously ran six in a flat
 * list, from the starter set in Keyword & AEO Strategy S6. D19 expands that set
 * and groups it, and requires the group headings to stay visible while every
 * answer is collapsed "so a parent can jump straight to the section they care
 * about", which is why the accordion is per category rather than one long run.
 *
 * SCHEMA. D19 S7 asks for "full FAQPage schema using all 14 Q&A pairs", and S4
 * requires every question and answer to be present in the page's HTML even when
 * collapsed. Both hold: `Accordion` animates height with a CSS grid and never
 * unmounts a panel, so the answers are in the DOM for a crawler whatever the
 * open state is.
 */
export function FaqsPage() {
  const schemaFaqs = faqs.filter((f) => f.schema)

  return (
    <>
      <Seo page={pageSeo.faqs} schemas={[organizationSchema(), faqSchema(schemaFaqs)]} />

      <PageHeader
        eyebrow="Admissions"
        title="Questions Parents Actually Ask"
        standfirst="Everything you would want to know about LBS KidZ, gathered in one place."
        photo="girl-at-india-map"
        photoFocus="40% 30%"
      />

      <Section tone="mist" divider={CTA_SEAM}>
        <Container size="wide">
          {/* TWO COLUMNS, NOT ONE NARROW ONE.
              Fourteen questions in a `narrow` container ran four thousand
              pixels down the middle of the page with around 390px of empty
              page ground either side at 1440. The contents list takes that width and
              does a job with it: D19 S4 wants a parent able to "jump straight
              to the section they care about", and a sticky list of the four
              groups is a better answer to that than four headings they have to
              scroll past. Below `lg` it stacks back to one column and the list
              reads as an index above the questions. */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <nav aria-label="Question categories">
                    <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                      On this page
                    </p>
                    <ul className="mt-4 space-y-1">
                      {faqCategories.map((category, i) => (
                        <li key={category.name}>
                          <a
                            href={`#${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            className={cn(
                              'group/jump flex items-baseline justify-between gap-4 rounded-lg px-4 py-3',
                              'transition-colors duration-200 hover:bg-mist-200/70',
                              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
                            )}
                          >
                            <span className="font-display text-h4 font-semibold text-brand-700">
                              {category.name}
                            </span>
                            <span className="font-numeral shrink-0 text-sm font-semibold text-brand-500">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Reveal>

                {/* D19 S5's closing prompt. It sits in this column rather than
                    under the last answer so it is reachable from anywhere on a
                    four-thousand-pixel page, and so the column carries its own
                    weight instead of ending in a sticky stub. */}
                <Reveal className="mt-8">
                  <Card tone="mist" object="faqs-outro" backdrop="sky-circle">
                    <h2 className="font-display text-h4 font-semibold text-brand-700">
                      {faqsOutro.headline}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">{faqsOutro.body}</p>
                    <div className="mt-4">
                      <TextLink to={routes.contact}>{faqsOutro.linkLabel}</TextLink>
                    </div>
                  </Card>
                </Reveal>
              </div>
            </div>

            <div className="space-y-14 lg:col-span-8">
              {faqCategories.map((category, categoryIndex) => (
                <section
                  key={category.name}
                  id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  aria-labelledby={`faq-${categoryIndex}`}
                  className="scroll-mt-28"
                >
                  <Reveal>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h2
                        id={`faq-${categoryIndex}`}
                        className="font-display text-h3 font-semibold text-brand-700"
                      >
                        {category.name}
                      </h2>
                      {/* The count is the fastest way to tell a parent how much
                          is behind a heading that is showing them nothing yet. */}
                      <Chip tone="muted">
                        {category.items.length}{' '}
                        {category.items.length === 1 ? 'question' : 'questions'}
                      </Chip>
                    </div>
                    <p className="mt-2 max-w-prose text-body text-ink-500">{category.blurb}</p>
                  </Reveal>

                  <Reveal className="mt-6">
                    <Accordion
                      items={category.items.map((f) => ({
                        id: f.q
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, ''),
                        title: f.q,
                        body: f.a,
                        meta: f.pending ? (
                          <Chip tone="muted">Confirmed with you directly on enquiry</Chip>
                        ) : null,
                      }))}
                      /* Only the first group opens on arrival. D19 S4 asks for
                         collapsed by default and one open at a time; leaving
                         every group shut opens the page on four headings and no
                         answer, which reads as an empty page. */
                      defaultOpen={categoryIndex === 0 ? 0 : undefined}
                    />
                  </Reveal>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default FaqsPage
