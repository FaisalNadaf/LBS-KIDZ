import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema } from '@/lib/schema'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { StepList } from '@/components/ui/misc'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { ShapedPhoto } from '@/components/media/Photo'
import { Grain } from '@/components/art/primitives'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { feeCommitment, feeEnquirySteps } from '@/data/admissions'
import { cn } from '@/lib/cn'
import { Backpack, BookOpen, GlassWater, Sandwich, Shirt } from 'lucide-react'
import { CTA_SEAM } from '@/components/ui/SectionDivider'

/**
 * Fees & Admissions.
 *
 * Section order is the Fees & Admissions specification's own:
 *
 *   1  Hero                          the "no hidden charges" commitment, plainly
 *   2  What's Already Inside Your Fee   the five inclusions
 *   3  Why You Won't See a Fee Table    the fee-on-demand explanation
 *   4  Ask Us for the Fee               the lead form
 *   5  What Happens After You Ask       three steps
 *
 * Source: Fees & Admissions Content (D18) S2.
 *
 * NO FEE FIGURE APPEARS ANYWHERE ON THIS PAGE, in its copy or in its structured
 * data. D18 S8 is absolute about it: "this page must never carry a number, even
 * as an example." The figure is shared per enquiry, which is standard practice
 * across Indian preschools and a locked decision on this project, not an
 * omission someone forgot to fill in.
 *
 * THE FRAMING RULE. D18 S1: the page is "framed entirely in positive terms,
 * what LBS KidZ includes and promises, never as a comparison to what other
 * schools charge or don't". The section heading over the five inclusions used
 * to read "Five things other schools bill you for separately", which is exactly
 * the comparison that rule forbids, and it now states the commitment instead.
 *
 * ONE PATH, NOT SEVERAL. D18 S5: "this page should feel like one clear path
 * (ask, hear back), not multiple competing asks", so the form is the only
 * conversion moment and there is no mid-page CTA anywhere above it.
 */

/**
 * A mark and a colour for each thing the fee already covers, in the order the
 * data lists them.
 *
 * The cards used to carry a number and a single word on a neutral ground, which
 * is a hundred and forty pixels of card doing about twenty pixels of work. An
 * object is also the faster read here: a parent scanning five of these is
 * checking a list against the one in their head, and a bag is quicker to
 * recognise than the word "Bag".
 */
const FEE_ITEMS = [
  {
    icon: BookOpen,
    card: 'bg-sky-50/80 ring-sky-200/70 hover:ring-sky-300',
    chip: 'bg-sky-200 text-sky-800',
    num: 'text-sky-600',
    mark: 'text-sky-300/25',
  },
  {
    icon: Backpack,
    card: 'bg-orange-100/60 ring-orange-200/70 hover:ring-orange-300',
    chip: 'bg-orange-200 text-orange-600',
    num: 'text-orange-600',
    mark: 'text-orange-400/25',
  },
  {
    icon: Shirt,
    card: 'bg-green-100/60 ring-green-200/70 hover:ring-green-300',
    chip: 'bg-green-200 text-green-600',
    num: 'text-green-600',
    mark: 'text-green-400/25',
  },
  {
    icon: Sandwich,
    card: 'bg-brand-50/80 ring-brand-200/60 hover:ring-brand-300',
    chip: 'bg-brand-100 text-brand-700',
    num: 'text-brand-600',
    mark: 'text-brand-300/25',
  },
  {
    icon: GlassWater,
    card: 'bg-sky-50/80 ring-sky-200/70 hover:ring-sky-300',
    chip: 'bg-sky-200 text-sky-800',
    num: 'text-sky-600',
    mark: 'text-sky-300/25',
  },
]

export function FeesPage() {
  return (
    <>
      <Seo page={pageSeo.fees} schemas={[organizationSchema()]} />

      {/* ---- 1. Hero ---- */}
      <PageHeader
        eyebrow="Fees & Admissions"
        title={feeCommitment.headline}
        standfirst={feeCommitment.promise}
        photo="girl-backpack-school-ground"
        photoFocus="50% 40%"
      />

      {/* ---- 2. What's already inside your fee ---- */}
      <Section
        tone="mist"
        id="included"
        labelledBy="included-title"
        divider={{ type: 'tight-wave', to: 'white' }}
      >
        <Container size="wide">
          {/* HEADING AND PHOTOGRAPH SHARE A ROW, AND THAT FIXES TWO HOLES AT ONCE.
              The heading is a short title over a two-line standfirst, so on a
              wide screen its right half was empty; the photograph then sat
              under the cards capped at 48rem and left about 45% of its own row
              empty at the bottom right. Those were the two largest areas of
              nothing on the page and they were the same shape, so the picture
              now fills the space beside the heading instead of making a second
              gap below the cards.

              It also closes the section better. The band now ends on the five
              cards, which are the actual promise, rather than trailing off into
              a decorative photograph after them. */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeader
                id="included-title"
                eyebrow="Inside the fee"
                title="What’s Already Inside Your Fee"
                standfirst={feeCommitment.intro}
              />
            </div>

            <Reveal className="lg:col-span-7" tier="lead" direction="left">
              <ShapedPhoto
                name="child-running-joy"
                shape="crest"
                interactive
                sizes="(min-width: 1024px) 56vw, 92vw"
                ratio="16 / 10"
                focus="50% 28%"
              />
            </Reveal>
          </div>

          <RevealGroup className="mt-block grid gap-4 sm:grid-cols-2 lg:grid-cols-5" each={0.05}>
            {feeCommitment.covered.map((item, i) => {
              const fee = FEE_ITEMS[i % FEE_ITEMS.length]
              return (
                <RevealItem key={item.name} className="h-full">
                  <div
                    className={cn(
                      'group/fee relative isolate flex h-full flex-col overflow-hidden rounded-2xl p-6 ring-1',
                      'transition-transform duration-300 ease-out-soft hover:-translate-y-1.5',
                      'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                      // Rotating which corner is squared, so five in a row do
                      // not read as one strip.
                      ['rounded-tl-sm', 'rounded-tr-sm', 'rounded-br-sm', 'rounded-bl-sm', 'rounded-tl-sm'][i % 5],
                      fee.card,
                    )}
                  >
                    <fee.icon
                      className={cn(
                        'pointer-events-none absolute -bottom-5 -right-4 -z-10 size-24',
                        'transition-transform duration-500 ease-out-soft group-hover/fee:scale-110',
                        'motion-reduce:transition-none',
                        fee.mark,
                      )}
                      strokeWidth={1.1}
                      aria-hidden="true"
                    />

                    <span className="flex items-center justify-between gap-2">
                      <span
                        className={cn('grid size-11 place-items-center rounded-xl shadow-soft', fee.chip)}
                        aria-hidden="true"
                      >
                        <fee.icon className="size-5" strokeWidth={1.9} />
                      </span>
                      <span className={cn('font-numeral text-lg font-semibold', fee.num)}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </span>

                    <h3 className="mt-5 font-display text-h4 font-semibold text-brand-700">
                      {item.name}
                    </h3>
                    {/* The line under the name is what turns five labels into
                        five commitments. Source: D18 S3, Section 2. */}
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.detail}</p>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>

        </Container>
      </Section>

      {/* ---- 3 and 4. Why there is no table, and the form ---- */}
      <Section
        tone="white"
        id="why-on-enquiry"
        labelledBy="enquiry-title"
        divider={{ type: 'scallop', to: 'mist' }}
      >
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* The form runs to about a thousand pixels and this column to
                under five hundred. Filling the difference with the picture was
                the first fix and it overcorrected: a 450px-tall lunch box is
                not worth that much of the page. The column is pinned instead,
                so the promise stays beside the fields the whole way down the
                form and the leftover space is simply not there to fill. */}
            <div className="lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
              <SectionHeader
                id="enquiry-title"
                eyebrow="Why there is no fee table here"
                title="Why You Won’t See a Fee Table on This Page"
                standfirst={feeCommitment.disclosure}
              />

              <Reveal className="mt-8">
                <Card tone="mist" object="fees-what-we-tell-you" backdrop="lavender-corner">
                  <h3 className="font-display text-h4 font-semibold text-brand-700">
                    What we will tell you
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {feeCommitment.willTell.map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink-500">
                        <Grain className="mt-1.5 shrink-0 text-sky-500" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>

              <Reveal className="mt-6" direction="right">
                <ShapedPhoto
                  name="lunch-box"
                  shape="leaf"
                  interactive
                  ratio="16 / 10"
                  focus="50% 45%"
                  sizes="(min-width: 1024px) 46vw, 92vw"
                />
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <Card object="fees-ask-us" backdrop="blue-peach">
                  <h2 className="font-display text-h2 font-semibold text-brand-700">
                    Ask Us for the Fee
                  </h2>
                  <p className="mt-2 text-body text-ink-500">
                    Tell us the class and the area of Indore, and we will come back with the figure.
                  </p>
                  <div className="mt-7">
                    <EnquiryForm compact />
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- 5. What happens after you ask ----
          New section, from D18 S3 Section 5. The page previously ended on the
          form, which left a parent who had just given their number with no
          answer to the obvious next question. Three steps, on a band the width
          of the page so it reads as the close rather than as a fourth thing to
          do: there is deliberately no CTA here. */}
      <Section
        tone="mist"
        id="after-you-ask"
        labelledBy="after-title"
        divider={CTA_SEAM}
      >
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                id="after-title"
                eyebrow="No guessing"
                title="What Happens After You Ask"
                standfirst="Three steps, and you will know where you stand."
              />
            </div>

            <Reveal className="lg:col-span-7" direction="left">
              <Card tone="mist" object="fees-after-you-ask" backdrop="yellow-double">
                <StepList steps={feeEnquirySteps} />
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default FeesPage
