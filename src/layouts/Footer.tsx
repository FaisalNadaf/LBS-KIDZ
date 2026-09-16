import { Link } from 'react-router-dom'
import { ArrowUp, Facebook, Instagram, MapPin, MessageCircle, Youtube } from 'lucide-react'
import { Container } from '@/components/ui/layout'
import { LogoPlaque } from './Logo'
import { contact, site } from '@/data/site'
import {
  footerExploreLinks,
  footerLegalLinks,
  footerQuickLinks,
  footerUtilityLinks,
} from '@/data/navigation'
import { WheatStalk } from '@/components/art/primitives'
import { ObjectScatter } from '@/components/art/ObjectScatter'
import { Reveal, RevealItem } from '@/animations/Reveal'
import { Magnetic } from '@/animations/interactions'
import { cn } from '@/lib/cn'

/**
 * Footer.
 *
 * Structure is fixed by Full Website Sitemap S2:
 *   2.1 School Information, 2.2 Quick Links, 2.3 Legal & Compliance,
 *   2.4 Utility, 2.5 Copyright, plus the Section 3 keyword-linking block.
 *
 * The keyword block is deliberately separate from Quick Links and uses full
 * keyword phrases as the link text itself.
 *
 * WHY CARDS. Four bare lists on one dark ground gave the eye nothing to hold
 * on to: thirty links of near-identical weight, separated only by whitespace,
 * with no edge telling you where one group ended and the next began. Each group
 * now sits on its own faintly lifted panel, which is the cheapest possible way
 * to make a dense link list scannable — the boundary does the work that a
 * heading alone could not.
 *
 * WHY THE KEYWORD BLOCK IS A FULL-WIDTH ROW OF PILLS. It is the one group whose
 * items are phrases rather than labels — "Activity-Based Learning for
 * Preschoolers" is five words. In a quarter-width column those wrapped to four
 * lines each and the column became a wall. Given the full width and set as
 * wrapped pills, each phrase stays on one or two lines and reads as a tag.
 *
 * MOTION. The panels arrive as panels — the reveal engine reads their position,
 * so the row opens outward from the middle — and each link row follows its own
 * card rather than the page, which is what makes thirty links read as four
 * lists being dealt instead of thirty things appearing. Everything here is
 * `quiet`: this is the end of the document, sitting directly under the CTA
 * band, and a footer that makes an entrance is competing with the one thing on
 * the page that is actually asking for a decision.
 */
/** True once any social account has actually launched. See the guard below. */
const hasSocial = Object.values(contact.social).some((s) => !s.pending)

export function Footer() {
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-brand-800 text-mist-200">
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-72 text-mist-100/[0.06]"
        aria-hidden="true"
      >
        <WheatStalk />
      </div>

      {/* `inline`: the object scatter is rendered before the `relative`
          Container, so DOM order already puts it behind the content.

          No ambient glow on this band. It used to carry a drifting field of
          light blue, and because the band clips its own children the glow
          stopped dead at the footer's top edge — a visible light line directly
          under the CTA's curve, which is flat brand-800 like the footer. */}
      <ObjectScatter seed="site-footer" variant="cap" onDark inline />

      <Container size="wide" className="relative py-16 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {/* ---- 2.1 School information ---- */}
          <Reveal className="sm:col-span-2 lg:col-span-5" tier="quiet">
            <Panel className="h-full">
              <LogoPlaque />

              {/* The logo's colours as one short rule: the only gradient in the
                  footer, and small enough to read as a signature. */}
              <span className="mt-6 block h-1 w-14 rounded-full bg-gradient-spectrum" aria-hidden="true" />

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist-300/85">
                A preschool brand under {site.parentGroup}, built in partnership between{' '}
                {site.operator} and the {site.partner}.
              </p>

              <address className="mt-6 space-y-3 not-italic text-sm">
                {contact.address.pending ? (
                  <p className="flex items-start gap-2.5 text-mist-300/80">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-orange-300" aria-hidden="true" />
                    <span>
                      Campus addresses are published as each campus opens. We are launching across{' '}
                      Indore.
                    </span>
                  </p>
                ) : (
                  <p className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-orange-300" aria-hidden="true" />
                    <span>{contact.address.lines.join(', ')}</span>
                  </p>
                )}

                {contact.phone.pending ? null : (
                  <p>
                    <a
                      href={`tel:${contact.phone.value}`}
                      className="transition-colors hover:text-sky-200"
                    >
                      {contact.phone.display}
                    </a>
                  </p>
                )}

                {contact.whatsapp.pending ? null : (
                  <p className="flex items-center gap-2.5">
                    <MessageCircle className="size-4 shrink-0 text-orange-300" aria-hidden="true" />
                    <a
                      href={`https://wa.me/${contact.whatsapp.value}`}
                      className="transition-colors hover:text-sky-200"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      WhatsApp us
                    </a>
                  </p>
                )}

                {contact.email.pending ? null : (
                  <p>
                    <a
                      href={`mailto:${contact.email.value}`}
                      className="transition-colors hover:text-sky-200"
                    >
                      {contact.email.display}
                    </a>
                  </p>
                )}
              </address>

              {/* Guarded as a group, not only per icon. In Phase 1 all three
                  accounts are `pending` and every `SocialLink` returns null, so
                  without this the row still rendered — an empty flex box
                  carrying 28px of top margin, which read as a gap someone had
                  forgotten to fill. */}
              {hasSocial ? (
                <div className="mt-7 flex items-center gap-2">
                  <SocialLink
                    href={contact.social.instagram.url}
                    pending={contact.social.instagram.pending}
                    label="Instagram"
                  >
                    <Instagram className="size-4" aria-hidden="true" />
                  </SocialLink>
                  <SocialLink
                    href={contact.social.facebook.url}
                    pending={contact.social.facebook.pending}
                    label="Facebook"
                  >
                    <Facebook className="size-4" aria-hidden="true" />
                  </SocialLink>
                  <SocialLink
                    href={contact.social.youtube.url}
                    pending={contact.social.youtube.pending}
                    label="YouTube"
                  >
                    <Youtube className="size-4" aria-hidden="true" />
                  </SocialLink>
                </div>
              ) : null}
            </Panel>
          </Reveal>

          {/* ---- 2.2 Quick links ---- */}
          <LinkPanel title="Quick Links" className="lg:col-span-3">
            {footerQuickLinks.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
          </LinkPanel>

          {/* ---- 2.3 Legal & compliance, with 2.4 Utility below the rule ---- */}
          <LinkPanel title="Legal & Compliance" className="lg:col-span-4">
            {footerLegalLinks.map((link) => (
              <FooterLink key={link.href} {...link} />
            ))}
            {footerUtilityLinks.length ? (
              <li className="mt-3 border-t border-mist-100/10 pt-3">
                <ul>
                  {footerUtilityLinks.map((link) => (
                    <FooterLink key={link.href} {...link} />
                  ))}
                </ul>
              </li>
            ) : null}
          </LinkPanel>
        </div>

        {/* ---- Section 3: keyword-linking layer ---- */}
        <Reveal className="mt-5" tier="quiet">
          <Panel>
            <PanelHeading>Explore</PanelHeading>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {footerExploreLinks.map((link) => (
                <RevealItem as="li" key={link.label} tier="quiet" direction="rise" distance={10}>
                  <Link
                    to={link.href}
                    className={cn(
                      'group/pill inline-flex items-center gap-2 rounded-full border border-mist-100/15 py-2 pl-4 pr-3.5',
                      'text-sm leading-snug text-mist-300/90',
                      'transition-[background-color,border-color,color] duration-200 ease-out-soft',
                      'hover:border-orange-300/45 hover:bg-mist-50/[0.07] hover:text-sky-200',
                    )}
                  >
                    {link.label}
                    {/* The dot only earns its place on hover: eighteen static
                        dots in a wrapped row would read as bullet points. */}
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-orange-300 opacity-0 transition-opacity duration-200 group-hover/pill:opacity-100 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </Link>
                </RevealItem>
              ))}
            </ul>
          </Panel>
        </Reveal>

        {/* ---- 2.5 Copyright ---- */}
        {/* The row used to sit at `text-mist-300/70`, which is the tone this
            site uses for text nobody is expected to read. Two of the three
            organisations named on this site are named here and nowhere else in
            the footer, so the row carries their names as links: full-strength
            `mist-300` for the sentences, and the names themselves lifted to
            `mist-100` in semibold so the eye finds them without the row turning
            into two more rows of navigation.

            THE LINKS ARE LEFT AT TEXT SIZE. Everything focusable on this site
            is grown to a 44px target, and these two are the deliberate
            exception: WCAG 2.2 SC 2.5.8 exempts a link inside a sentence, and
            the padding that buys the target would have put a 44px box behind
            three words in the middle of a 12px line. `Sitemap` beside them is
            not in a sentence, and still gets its own. */}
        <div className="mt-10 flex flex-col gap-4 border-t border-mist-100/10 pt-7 text-xs text-mist-300 sm:flex-row sm:items-center sm:justify-between">
          {/* One paragraph, two sentences. They were stacked, which gave a
              single line of small print its own two-line block at the foot of
              every page. The dot between them is `aria-hidden`: it is a
              typographic join, and a screen reader announcing "middle dot"
              between two finished sentences is noise. */}
          <p>
            {site.copyright.before}
            <FootnoteLink href={site.operatorUrl}>{site.operator}</FootnoteLink>
            {site.copyright.after}
            <span className="px-1.5 text-mist-300/50" aria-hidden="true">
              &middot;
            </span>
            {site.credit.prefix}
            <FootnoteLink href={site.credit.url}>{site.credit.name}</FootnoteLink>
          </p>
          {/* `gap-2` and negative margins rather than `gap-5`: the link needs a
              44px-tall hit area to meet the touch minimum, and the padding that
              buys it would otherwise push this row 16px taller than the line of
              copyright text beside it. The margins pull the box back to the
              text's own height, so the target grows and the layout does not.
              `Sitemap` was the one control on the site under the minimum, on
              every page, at every width. */}
          <div className="-my-2.5 flex items-center gap-2">
            <Link
              to="/sitemap"
              className="inline-flex min-h-11 items-center rounded-md px-2.5 transition-colors hover:text-sky-200"
            >
              Sitemap
            </Link>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  )
}

/* ------------------------------------------------------------------ */

/**
 * A named organisation inside the copyright row, linked to its own site.
 *
 * Semibold and a step brighter than the sentence around it, which is the whole
 * job: at `mist-300` in 12px these names were indistinguishable from the words
 * either side of them. The underline is permanent rather than a hover
 * affordance — at this size and this far down the page, a link that only
 * announces itself on hover is a link most readers never find — and it is
 * `decoration-mist-300/40` so it reads as a fine rule under the name rather
 * than as a second line of text.
 */
function FootnoteLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'font-semibold text-mist-100 underline decoration-mist-300/40 underline-offset-2',
        'transition-colors duration-200 hover:text-sky-200 hover:decoration-sky-200/60',
      )}
    >
      {children}
    </a>
  )
}

/**
 * The panel surface.
 *
 * Deliberately not the site's `Card`. That component carries a white
 * gradient, a hairline built for a light ground and a pointer tilt — all three
 * are wrong at the foot of a dark page, and the tilt in particular would have
 * thirty links leaning about under the cursor. This is the same idea expressed
 * for this ground: a translucent lift rather than a fill, so the indigo still
 * reads through and the panels look like part of the footer rather than four
 * light cards dropped onto it.
 */
function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-mist-100/10 bg-mist-50/[0.035] p-6 sm:p-7',
        'transition-[background-color,border-color] duration-300 ease-out-soft',
        'hover:border-mist-100/[0.18] hover:bg-mist-50/[0.055]',
        className,
      )}
    >
      {children}
    </div>
  )
}

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-2xs font-semibold uppercase tracking-[0.16em] text-orange-300">
      <span className="h-px w-5 shrink-0 rounded-full bg-orange-300/60" aria-hidden="true" />
      {children}
    </h2>
  )
}

function LinkPanel({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Reveal className={className} tier="quiet">
      <Panel className="h-full">
        <PanelHeading>{title}</PanelHeading>
        {/* `-mx-3` cancels the padding the rows carry for their hover
            background, so the text still lines up with the heading above it
            while the highlight runs the full width of the panel. */}
        <ul className="-mx-3 mt-4">{children}</ul>
      </Panel>
    </Reveal>
  )
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <RevealItem as="li" tier="quiet" direction="left" distance={10}>
      <Link
        to={href}
        /*
         * `block`, and specifically not `inline-block`.
         *
         * The previous footer set these `inline-block` so the hover translate
         * would apply — a transform is ignored on a plain inline box — and
         * combined with 170px columns it broke every multi-word link in the
         * footer: "Curriculum & Learning Approach" came out one word per line,
         * and so did every phrase in the keyword column. An inline-block is
         * shrink-to-fit, so in a column too narrow for the text it collapses
         * toward min-content instead of simply wrapping at the column width.
         *
         * A block box takes the container's width and wraps normally, and
         * transforms apply to it just as well. It also makes the whole row a
         * target rather than only the glyphs, which is what the padded hover
         * background is drawing. The columns are wider now too, and the long
         * keyword phrases have moved to the full-width pill row — the wrapping
         * needed all three fixes, not just this one.
         */
        className={cn(
          'group/row relative block rounded-lg px-3 py-2 text-sm leading-snug',
          'text-mist-300/85 transition-[color,background-color] duration-200 ease-out-soft',
          'hover:bg-mist-50/[0.06] hover:text-sky-200',
        )}
      >
        {/* The same growing accent rule the navbar dropdown rows use, so a link
            list behaves identically wherever it appears on the site. */}
        <span
          className="absolute inset-y-1.5 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-orange-300 transition-transform duration-300 ease-out-soft group-hover/row:scale-y-100 motion-reduce:transition-none"
          aria-hidden="true"
        />
        {/* `block` for the same reason the anchor is: an inline-block here is
            shrink-to-fit and reintroduces the collapse the moment a label is
            wider than its column. A block box takes the row's width, wraps
            normally, and still accepts the transform. */}
        <span className="block transition-transform duration-200 ease-out-soft group-hover/row:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/row:translate-x-0">
          {label}
        </span>
      </Link>
    </RevealItem>
  )
}

function SocialLink({
  href,
  pending,
  label,
  children,
}: {
  href: string
  pending: boolean
  label: string
  children: React.ReactNode
}) {
  if (pending) return null
  return (
    <Magnetic strength={4}>
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={label}
        className={cn(
          'grid size-11 place-items-center rounded-lg border border-mist-100/10 bg-mist-100/[0.06] text-mist-100',
          'transition-[background-color,border-color,color] duration-200',
          'hover:border-orange-300/40 hover:bg-mist-100/15 hover:text-orange-300',
        )}
      >
        {children}
      </a>
    </Magnetic>
  )
}

/**
 * Back to the top of the page.
 *
 * A real convenience at the foot of pages this long, and the reason it is a
 * `button` rather than an `href="#top"` link is that it has to respect the
 * reader's motion preference — `scrollIntoView` and `scrollTo` both take
 * `behavior`, and `smooth` is exactly the kind of long animated scroll that
 * reduced-motion exists to switch off.
 */
function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
      }}
      className="group/top inline-flex items-center gap-2 rounded-full border border-mist-100/15 py-1.5 pl-3.5 pr-3 transition-[background-color,border-color,color] duration-200 hover:border-orange-300/40 hover:bg-mist-50/[0.06] hover:text-sky-200"
    >
      Back to top
      <ArrowUp
        className="size-3.5 transition-transform duration-200 ease-out-soft group-hover/top:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/top:translate-y-0"
        aria-hidden="true"
      />
    </button>
  )
}
