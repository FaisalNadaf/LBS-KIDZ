import { useId, useState, type FormEvent } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { programs } from '@/data/admissions'
import { zones } from '@/data/campuses'

/**
 * Register Interest / Enquiry form.
 *
 * Posts to /api/register-interest, which the bundled Express server
 * (server.mjs) implements. That server exists because the project's own vendor
 * scope specifies "Node.js + Express, backend upload facility, admin panel".
 * Source: Website Reference Document S8; Project Decisions Log S5.
 *
 * Phase 1 leads must carry forward into Phase 2's real admission funnel with no
 * data loss and no restart, so every submission is stored whole rather than
 * only emailed. Source: Project Decisions Log S4.
 *
 * Accessibility: every field has a real <label>, errors are announced through
 * aria-describedby and a live region, and the first invalid field takes focus.
 */

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Errors = Partial<Record<'parentName' | 'phone' | 'childClass', string>>

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const validate = (data: FormData): Errors => {
    const next: Errors = {}
    const parentName = String(data.get('parentName') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const childClass = String(data.get('childClass') ?? '')

    if (parentName.length < 2) next.parentName = 'Please tell us your name.'
    // Indian mobile numbers: 10 digits, optionally with +91 or 0 in front.
    if (!/^(?:\+?91[-\s]?|0)?[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, ''))) {
      next.phone = 'Please enter a 10-digit mobile number we can call you on.'
    }
    if (!childClass) next.childClass = 'Please choose the class you are asking about.'
    return next
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = form.querySelector<HTMLElement>(`[data-invalid="true"], [name="${Object.keys(found)[0]}"]`)
      first?.focus()
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/register-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      })
      if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-xl bg-neem-100 p-8 text-center hairline"
      >
        <CheckCircle2 className="mx-auto size-9 text-neem-400" aria-hidden="true" />
        <h3 className="mt-4 font-display text-h2 font-semibold text-indigo-ink-700">
          Thank you. We have your details.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-body text-ink-500">
          Someone from our team will call you back with class options, the fee for the class you
          asked about, and the campus nearest to you.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus('idle')}
        >
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className={cn('grid gap-5', !compact && 'sm:grid-cols-2')}>
        <Field
          id={`${id}-parentName`}
          name="parentName"
          label="Your name"
          autoComplete="name"
          required
          error={errors.parentName}
        />
        <Field
          id={`${id}-phone`}
          name="phone"
          label="Mobile number"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          required
          error={errors.phone}
          hint="We will call you on this number."
        />
      </div>

      <div className={cn('grid gap-5', !compact && 'sm:grid-cols-2')}>
        <Field
          id={`${id}-childName`}
          name="childName"
          label="Your child’s name"
          autoComplete="off"
        />
        <SelectField
          id={`${id}-childClass`}
          name="childClass"
          label="Class you are asking about"
          required
          error={errors.childClass}
          options={[
            { value: '', label: 'Please choose' },
            ...programs.map((p) => ({ value: p.slug, label: p.name })),
            { value: 'not-sure', label: 'Not sure yet' },
          ]}
        />
      </div>

      <div className={cn('grid gap-5', !compact && 'sm:grid-cols-2')}>
        <Field id={`${id}-email`} name="email" label="Email" type="email" autoComplete="email" />
        <SelectField
          id={`${id}-zone`}
          name="zone"
          label="Area of Indore"
          options={[
            { value: '', label: 'Please choose' },
            ...zones.map((z) => ({ value: z.slug, label: z.name })),
            { value: 'other', label: 'Somewhere else in Indore' },
          ]}
        />
      </div>

      <div>
        <label
          htmlFor={`${id}-message`}
          className="block text-small font-semibold text-indigo-ink-700"
        >
          Anything you would like us to know
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          className="mt-2 w-full rounded-md border border-khadi-300 bg-white px-4 py-3 text-body text-ink-700 transition-[border-color,box-shadow] duration-200 placeholder:text-ink-400/70 focus:border-terracotta-400 focus:ring-4 focus:ring-terracotta-100 focus:outline-none"
          placeholder="A question, a concern, or a good time to call."
        />
      </div>

      {status === 'error' ? (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-md bg-terracotta-100 px-4 py-3 text-sm text-terracotta-800"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            We could not send that just now. Please try again, or reach us through the Contact
            page.
          </span>
        </p>
      ) : null}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" loading={status === 'submitting'} withArrow>
          {status === 'submitting' ? 'Sending' : 'Register Interest'}
        </Button>
        <p className="text-xs leading-relaxed text-ink-400">
          We use your details only to answer your enquiry. See our{' '}
          <a href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  name,
  label,
  error,
  hint,
  required,
  ...rest
}: {
  id: string
  name: string
  label: string
  error?: string
  hint?: string
  required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    /*
     * `focus-within` on the wrapper is what lets the label answer its own
     * field. A rule hung off `input:focus` can only reach the input — the label
     * sits before it in the DOM, so no sibling selector reaches back to it, and
     * the group is the only way to move both from one state.
     */
    <div className="group/field">
      <label
        htmlFor={id}
        className="block text-small font-semibold text-indigo-ink-700 transition-colors duration-200 group-focus-within/field:text-terracotta-700"
      >
        {label}
        {required ? (
          <span className="ml-1 text-terracotta-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        data-invalid={error ? 'true' : undefined}
        className={cn(
          'mt-2 min-h-control-md w-full rounded-md border bg-white px-4 text-body text-ink-700 placeholder:text-ink-400/70',
          // A ring as well as a border change, so the active field is obvious to
          // a pointer user too, not only to someone tabbing through.
          // The lift is one pixel. A form field is not a button and must not
          // bounce when it takes focus; this is just enough that the active row
          // separates from the ones around it.
          'transition-[border-color,box-shadow,transform] duration-200 focus:ring-4 focus:outline-none',
          'focus:-translate-y-px motion-reduce:transform-none',
          error
            ? 'border-terracotta-500 focus:ring-terracotta-100'
            : 'border-khadi-300 focus:border-terracotta-400 focus:ring-terracotta-100',
        )}
        {...rest}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-400">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-terracotta-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function SelectField({
  id,
  name,
  label,
  options,
  error,
  required,
}: {
  id: string
  name: string
  label: string
  options: { value: string; label: string }[]
  error?: string
  required?: boolean
}) {
  return (
    /*
     * `focus-within` on the wrapper is what lets the label answer its own
     * field. A rule hung off `input:focus` can only reach the input — the label
     * sits before it in the DOM, so no sibling selector reaches back to it, and
     * the group is the only way to move both from one state.
     */
    <div className="group/field">
      <label
        htmlFor={id}
        className="block text-small font-semibold text-indigo-ink-700 transition-colors duration-200 group-focus-within/field:text-terracotta-700"
      >
        {label}
        {required ? (
          <span className="ml-1 text-terracotta-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        data-invalid={error ? 'true' : undefined}
        className={cn(
          'mt-2 min-h-control-md w-full rounded-md border bg-white px-4 text-body text-ink-700',
          // The lift is one pixel. A form field is not a button and must not
          // bounce when it takes focus; this is just enough that the active row
          // separates from the ones around it.
          'transition-[border-color,box-shadow,transform] duration-200 focus:ring-4 focus:outline-none',
          'focus:-translate-y-px motion-reduce:transform-none',
          error
            ? 'border-terracotta-500 focus:ring-terracotta-100'
            : 'border-khadi-300 focus:border-terracotta-400 focus:ring-terracotta-100',
        )}
        defaultValue=""
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.value === ''}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-terracotta-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}
