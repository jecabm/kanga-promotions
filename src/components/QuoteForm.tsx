import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { products, site } from '../data/content';
import { useQuote } from '../context/QuoteContext';
import { Button } from './Button';
import './QuoteForm.css';

/**
 * Quote form.
 * Sends enquiries to Web3Forms (https://web3forms.com), which emails them to the address
 * verified on the Web3Forms account that owns the access key. No backend is needed.
 * Submission is ONLY attempted when VITE_WEB3FORMS_ACCESS_KEY is set, so the page never
 * claims an enquiry was sent when no form service is connected.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? '';
const FORMS_ENABLED = ACCESS_KEY !== '';
const ENDPOINT = 'https://api.web3forms.com/submit';

type Field = 'fullName' | 'company' | 'email' | 'phone' | 'products' | 'quantity' | 'details' | 'artworkLink';
type Values = Record<Exclude<Field, 'products'>, string>;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'not-connected';

const LABELS: Record<Field, string> = {
  fullName: 'Full name',
  company: 'Company name',
  email: 'Email address',
  phone: 'Phone number',
  products: 'Products of interest',
  quantity: 'Estimated quantity',
  details: 'Project details',
  artworkLink: 'Artwork link',
};

const EMPTY: Values = { fullName: '', company: '', email: '', phone: '', quantity: '', details: '', artworkLink: '' };

// Loose check: accepts links with or without https://, e.g. drive.google.com/… or https://we.tl/…
const LINK_RE = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i;

function validate(v: Values, selected: string[]): Errors {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = 'Please enter your full name.';
  if (!v.company.trim()) e.company = 'Please enter your company name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'Please enter a valid email address, e.g. name@company.com.au.';
  const digits = v.phone.replace(/[^\d]/g, '');
  if (!v.phone.trim()) e.phone = 'Please enter your phone number.';
  else if (digits.length < 8 || digits.length > 15 || /[^\d\s()+-]/.test(v.phone))
    e.phone = 'Please enter a valid phone number, e.g. 0400 000 000.';
  if (selected.length === 0) e.products = 'Please choose at least one product.';
  if (v.details.trim().length < 10) e.details = 'Please tell us a little about your project (at least 10 characters).';
  if (v.artworkLink.trim() && !LINK_RE.test(v.artworkLink.trim()))
    e.artworkLink = 'Please paste a full link, e.g. https://drive.google.com/…';
  return e;
}

export function QuoteForm() {
  const { selected, setSelected } = useQuote();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);

  const revalidate = (nextValues = values, nextSelected = selected) => {
    // only update errors for fields that already show an error (avoids shouting while typing)
    const all = validate(nextValues, nextSelected);
    setErrors((prev) => {
      const next: Errors = {};
      (Object.keys(prev) as Field[]).forEach((k) => {
        if (all[k]) next[k] = all[k];
      });
      return next;
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    revalidate(next);
  };

  const onBlur = (name: Field) => {
    const all = validate(values, selected);
    setErrors((prev) => ({ ...prev, [name]: all[name] }));
  };

  const toggleProduct = (id: string) => {
    const next = selected.includes(id) ? selected.filter((p) => p !== id) : [...selected, id];
    setSelected(next);
    revalidate(values, next);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Block double clicks / repeat Enter presses while a submission is in flight.
    if (submittingRef.current) return;
    const found = validate(values, selected);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);

    if (!FORMS_ENABLED) {
      setStatus('not-connected');
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    submittingRef.current = true;
    setStatus('submitting');
    try {
      // Honeypot: real visitors never see or tick this box. Bots that do get a fake success
      // and nothing is sent. Web3Forms also checks the same field server-side.
      const botcheck = formRef.current?.querySelector<HTMLInputElement>('input[name="botcheck"]')?.checked ?? false;
      if (!botcheck) {
        const productNames = selected.map((id) => products.find((p) => p.id === id)?.name ?? id);
        const link = values.artworkLink.trim();
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: ACCESS_KEY,
            subject: `New quote request: ${values.company.trim()} (${values.fullName.trim()})`,
            from_name: `${site.name} website`,
            botcheck: false,
            // "name" and "email" are Web3Forms' standard fields; "email" also becomes the reply-to address.
            name: values.fullName.trim(),
            email: values.email.trim(),
            'Company name': values.company.trim(),
            'Phone number': values.phone.trim(),
            'Products of interest': productNames.join(', '),
            'Estimated quantity': values.quantity.trim() || 'Not specified',
            'Project details': values.details.trim(),
            'Artwork link': link ? (/^https?:\/\//i.test(link) ? link : `https://${link}`) : 'Not provided',
          }),
        });
        const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
        if (!res.ok || !json?.success) throw new Error(`Web3Forms error (HTTP ${res.status})`);
      }
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      submittingRef.current = false;
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const reset = () => {
    setValues(EMPTY);
    setSelected([]);
    setErrors({});
    setStatus('idle');
    formRef.current?.reset();
  };

  if (status === 'success') {
    return (
      <div className="qform__result qform__result--success" role="status" tabIndex={-1} ref={statusRef}>
        <p className="eyebrow">Enquiry received</p>
        <h3 className="h3">Thanks, {values.fullName.split(' ')[0]}. We have your enquiry.</h3>
        <p>
          Our team will review your project and be in touch at <strong>{values.email}</strong> to talk through options
          and your quote.
        </p>
        <Button variant="secondary" onClick={reset}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const errorList = (Object.keys(errors) as Field[]).filter((k) => errors[k]);
  const describe = (name: Field, hint?: boolean) =>
    [hint ? `${name}-hint` : null, errors[name] ? `${name}-error` : null].filter(Boolean).join(' ') || undefined;

  const text = (name: keyof Values, opts: { type?: string; autoComplete?: string; required?: boolean; inputMode?: 'tel' | 'email' | 'numeric' | 'url'; hint?: string }) => (
    <div className={`qform__field${errors[name] ? ' has-error' : ''}`}>
      <label htmlFor={name}>
        {LABELS[name]}
        {opts.required ? (
          <span className="qform__req" aria-hidden="true">*</span>
        ) : (
          <span className="qform__opt"> (optional)</span>
        )}
      </label>
      {opts.hint && (
        <p id={`${name}-hint`} className="qform__hint">
          {opts.hint}
        </p>
      )}
      <input
        id={name}
        name={name}
        type={opts.type ?? 'text'}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        required={opts.required}
        aria-required={opts.required}
        aria-invalid={!!errors[name]}
        aria-describedby={describe(name, !!opts.hint)}
        value={values[name]}
        onChange={onChange}
        onBlur={() => (opts.required || values[name].trim()) && onBlur(name)}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="qform__error">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form
      ref={formRef}
      className="qform"
      name="quote"
      method="POST"
      noValidate
      onSubmit={onSubmit}
      aria-describedby="qform-required-note"
    >
      {/* Spam honeypot (Web3Forms "botcheck"): hidden from people and screen readers. */}
      <p className="visually-hidden" aria-hidden="true">
        <label>
          Leave this unticked: <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <p id="qform-required-note" className="qform__note">
        Fields marked <span className="qform__req">*</span> are required.
      </p>

      {showSummary && errorList.length > 0 && (
        <div className="qform__summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <p>
            <strong>Please check {errorList.length === 1 ? 'one field' : `${errorList.length} fields`}:</strong>
          </p>
          <ul>
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${k === 'products' ? 'product-0' : k}`}>{LABELS[k]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="qform__row">
        {text('fullName', { autoComplete: 'name', required: true })}
        {text('company', { autoComplete: 'organization', required: true })}
      </div>
      <div className="qform__row">
        {text('email', { type: 'email', autoComplete: 'email', inputMode: 'email', required: true })}
        {text('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', required: true })}
      </div>

      <fieldset
        className={`qform__field qform__products${errors.products ? ' has-error' : ''}`}
        aria-describedby={describe('products', true)}
        aria-invalid={!!errors.products}
      >
        <legend>
          {LABELS.products}
          <span className="qform__req" aria-hidden="true">*</span>
          <span className="visually-hidden"> (required)</span>
        </legend>
        <p id="products-hint" className="qform__hint">
          Select all that apply.
        </p>
        <div className="qform__chips">
          {products.map((p, i) => {
            const checked = selected.includes(p.id);
            return (
              <label key={p.id} className={`qform__chip${checked ? ' is-checked' : ''}`}>
                <input
                  id={`product-${i}`}
                  type="checkbox"
                  value={p.id}
                  checked={checked}
                  onChange={() => toggleProduct(p.id)}
                />
                <span>{p.name}</span>
              </label>
            );
          })}
        </div>
        {errors.products && (
          <p id="products-error" className="qform__error">
            {errors.products}
          </p>
        )}
      </fieldset>

      {text('quantity', { inputMode: 'numeric', hint: 'A rough number is fine, e.g. 200 or 500–1,000.' })}

      <div className={`qform__field${errors.details ? ' has-error' : ''}`}>
        <label htmlFor="details">
          {LABELS.details}
          <span className="qform__req" aria-hidden="true">*</span>
        </label>
        <p id="details-hint" className="qform__hint">
          Tell us about your event or campaign, colours, decoration ideas and any deadlines.
        </p>
        <textarea
          id="details"
          name="details"
          rows={5}
          required
          aria-required
          aria-invalid={!!errors.details}
          aria-describedby={describe('details', true)}
          value={values.details}
          onChange={onChange}
          onBlur={() => onBlur('details')}
        />
        {errors.details && (
          <p id="details-error" className="qform__error">
            {errors.details}
          </p>
        )}
      </div>

      {text('artworkLink', {
        type: 'url',
        inputMode: 'url',
        autoComplete: 'off',
        hint: 'Share your logo or artwork via Google Drive, Dropbox or WeTransfer and paste the link here. Or send it later.',
      })}

      {status === 'not-connected' && (
        <div className="qform__result qform__result--info" role="status" tabIndex={-1} ref={statusRef}>
          <strong>Your details look good, but this form isn&apos;t connected yet.</strong>
          <p>
            This preview can&apos;t send enquiries. Nothing has been submitted. Please contact the team directly:{' '}
            {site.email} · {site.phone}.
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className="qform__result qform__result--error" role="alert" tabIndex={-1} ref={statusRef}>
          <strong>Sorry, your enquiry couldn&apos;t be sent.</strong>
          <p>
            Please check your connection and try again. If the problem continues, contact us at {site.email} or{' '}
            {site.phone}.
          </p>
        </div>
      )}

      <div className="qform__submit">
        <Button type="submit" size="lg" arrow disabled={status === 'submitting'} aria-disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Request my quote'}
        </Button>
        <p className="qform__privacy">We&apos;ll only use your details to respond to your enquiry.</p>
      </div>
    </form>
  );
}
