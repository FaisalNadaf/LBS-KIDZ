  
  import { Seo } from '@/lib/Seo'
import { pageSeo } from '@/data/seo'
import { organizationSchema } from '@/lib/schema'
import { Container, Section, SectionHeader } from '@/components/ui/layout'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal, RevealGroup, RevealItem } from '@/animations/Reveal'
import { ShapedPhoto } from '@/components/media/Photo'
import { Grain } from '@/components/art/primitives'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { feeCommitment } from '@/data/admissions'
import { cn } from '@/lib/cn'
import { Backpack, BookOpen, GlassWater, Sandwich, Shirt } from 'lucide-react'

/**
 * Fees & Admissions.
 *
 * "Fee-on-demand - figures shared on enquiry, not published. Page leads with a
 *  clear 'no hidden charges' commitment (books, bag, uniform, lunch box, water
 *  bottle included) rather than a fee table."
 * Source: Keyword & AEO Strategy S3; Project Decisions Log S6.
 *
 * No fee figure appears anywhere on this page or in its structured data. That
 * is a deliberate decision recorded in the source documents, following standard
 * Indian preschool practice, not an omission.
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
    card: 'bg-terracotta-50/80 ring-terracotta-200/70 hover:ring-terracotta-300',
    chip: 'bg-terracotta-200 text-terracotta-800',
    num: 'text-terracotta-600/70',
    mark: 'text-terracotta-300/25',
  },
  {
    icon: Backpack,
    card: 'bg-haldi-100/60 ring-haldi-200/70 hover:ring-haldi-300',
    chip: 'bg-haldi-200 text-haldi-600',
    num: 'text-haldi-600/70',
    mark: 'text-haldi-400/25',
  },
  {
    icon: Shirt,
    card: 'bg-neem-100/60 ring-neem-200/70 hover:ring-neem-300',
    chip: 'bg-neem-200 text-neem-600',
    num: 'text-neem-600/70',
    mark: 'text-neem-400/25',
  },
  {
    icon: Sandwich,
    card: 'bg-indigo-ink-50/80 ring-indigo-ink-200/60 hover:ring-indigo-ink-300',
    chip: 'bg-indigo-ink-100 text-indigo-ink-700',
    num: 'text-indigo-ink-400/70',
    mark: 'text-indigo-ink-300/25',
  },
  {
    icon: GlassWater,
    card: 'bg-terracotta-50/80 ring-terracotta-200/70 hover:ring-terracotta-300',
    chip: 'bg-terracotta-200 text-terracotta-800',
    num: 'text-terracotta-600/70',
    mark: 'text-terracotta-300/25',
  },
]

export function FeesPage() {

  return (
    <>
      <Seo
        page={pageSeo.fees}
        schemas={[organizationSchema()]}
      />

      <PageHeader
        eyebrow="Admissions"
        title="No hidden charges"
        standfirst={feeCommitment.promise}
        photo="school-kit"
      />

      {/* ---- What is included ---- */}
      <Section tone="khadi" id="included" labelledBy="included-title" divider={{ type: 'tight-wave', to: 'white' }}>
        <Container size="wide">
          <SectionHeader
            id="included-title"
            eyebrow="Inside the fee"
            title="Five things other schools bill you for separately"
            standfirst="These are inside the figure we quote you. Nothing is added later."
          />

          <RevealGroup className="mt-block grid gap-4 sm:grid-cols-2 lg:grid-cols-5" each={0.05}>
            {feeCommitment.covered.map((item, i) => {
              const fee = FEE_ITEMS[i % FEE_ITEMS.length]
              return (
                <RevealItem key={item} className="h-full">
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

                    <h3 className="mt-5 font-display text-h4 font-semibold text-indigo-ink-700">
                      {item}
                    </h3>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>

          {/* Capped, and aligned to the column rather than centred. At full
              width this was 1264x542, most of a laptop screen for a picture
              that is punctuation between the list above it and the enquiry
              below. Centred under five full-width cards it then read as a
              third alignment on one screen; sharing the heading's left edge it
              reads as part of the same column. */}
          <Reveal className="mt-block" tier="lead">
            <div className="max-w-3xl">
              <ShapedPhoto
                name="child-running-joy"
                shape="crest"
                interactive
                sizes="(min-width: 1024px) 48rem, 92vw"
                ratio="21 / 9"
                focus="50% 30%"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Why the figure is not published ---- */}
      <Section tone="white" id="why-on-enquiry" labelledBy="enquiry-title" divider={{ type: 'cloud', fill: 'var(--color-terracotta-600)' }}>
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
                title="The figure comes to you directly"
                standfirst={feeCommitment.disclosure}
              />

              <Reveal className="mt-8">
                <Card tone="sand" object="fees-what-we-tell-you" backdrop="lavender-corner">
                  <h3 className="font-display text-h4 font-semibold text-indigo-ink-700">
                    What we will tell you
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      'The fee for the specific class you are asking about.',
                      'What that figure includes, in writing.',
                      'What, if anything, sits outside it. Today, that answer is nothing.',
                    ].map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink-500">
                        <Grain className="mt-1.5 shrink-0 text-terracotta-500" />
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
                  <h2 className="font-display text-h2 font-semibold text-indigo-ink-700">
                    Ask us for the fee
                  </h2>
                  <p className="mt-2 text-body text-ink-500">
                    Tell us the class and the area, and we will come back with the figure.
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
    </>
  )
}

export default FeesPage
