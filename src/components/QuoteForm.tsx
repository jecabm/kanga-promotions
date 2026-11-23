import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { products, site } from '../data/content';
import { useQuote } from '../context/QuoteContext';
import { Button } from './Button';
import './QuoteForm.css';

/**
 * Quote form.
 * Posts to Netlify Forms (form name "quote", mirrored in index.html).
 * Submission is ONLY attempted when VITE_FORMS_ENABLED === 'true', so the page never
 * claims an enquiry was sent when no backend is connected.
 */
const FORMS_ENABLED = import.meta.env.VITE_FORMS_ENABLED === 'true';

const MAX_FILE_MB = 8;
const ACCEPTED = ['.pdf', '.ai', '.eps', '.svg', '.png', '.jpg', '.jpeg'];

type Field = 'fullName' | 'company' | 'email' | 'phone' | 'products' | 'quantity' | 'details' | 'artwork';
type Values = Record<'fullName' | 'company' | 'email' | 'phone' | 'quantity' | 'details', string>;
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
  artwork: 'Artwork upload',
};

const EMPTY: Values = { fullName: '', company: '', email: '', phone: '', quantity: '', details: '' };

function validate(v: Values, selected: string[], file: File | null): Errors {
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
  if (file) {
    const ext = '.' + (file.name.split('.').pop() ?? '').toLowerCase();
    if (!ACCEPTED.includes(ext)) e.artwork = `Please upload one of: ${ACCEPTED.join(', ')}.`;
    else if (file.size > MAX_FILE_MB * 1024 * 1024) e.artwork = `Files must be ${MAX_FILE_MB}MB or smaller.`;
  }
  return e;
}

export function QuoteForm() {
  const { selected, setSelected } = useQuote();
  const [values, setValues] = useState<Values>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const revalidate = (nextValues = values, nextSelected = selected, nextFile = file) => {
    // only update errors for fields that already show an error (avoids shouting while typing)
    const all = validate(nextValues, nextSelected, nextFile);
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
    const all = validate(values, selected, file);
    setErrors((prev) => ({ ...prev, [name]: all[name] }));
  };

  const toggleProduct = (id: string) => {
    const next = selected.includes(id) ? selected.filter((p) => p !== id) : [...selected, id];
    setSelected(next);
    revalidate(values, next);
  };

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    const all = validate(values, selected, f);
    setErrors((prev) => ({ ...prev, artwork: all.artwork }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values, selected, file);
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

    setStatus('submitting');
    try {
      const data = new FormData(formRef.current!);
      data.set('form-name', 'quote');
      data.set('products', selected.map((id) => products.find((p) => p.id === id)?.name ?? id).join(', '));
      if (!file) data.delete('artwork');
      const res = await fetch('/', { method: 'POST', body: data });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const reset = () => {
    setValues(EMPTY);
    setSelected([]);
    setFile(null);
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

  const text = (name: keyof Values, opts: { type?: string; autoComplete?: string; required?: boolean; inputMode?: 'tel' | 'email' | 'numeric'; hint?: string }) => (
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
        onBlur={() => opts.required && onBlur(name)}
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
      encType="multipart/form-data"
      noValidate
      onSubmit={onSubmit}
      aria-describedby="qform-required-note"
    >
      <input type="hidden" name="form-name" value="quote" />
      <input type="hidden" name="products" value={selected.join(', ')} />
      <p className="visually-hidden" aria-hidden="true">
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
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

      <div className={`qform__field${errors.artwork ? ' has-error' : ''}`}>
        <label htmlFor="artwork">
          {LABELS.artwork}
          <span className="qform__opt"> (optional)</span>
        </label>
        <p id="artwork-hint" className="qform__hint">
          Logo or artwork: PDF, AI, EPS, SVG, PNG or JPG, up to {MAX_FILE_MB}MB.
        </p>
        <div className="qform__file">
          <input
            id="artwork"
            name="artwork"
            type="file"
            accept={ACCEPTED.join(',')}
            aria-invalid={!!errors.artwork}
            aria-describedby={describe('artwork', true)}
            onChange={onFile}
          />
          <span className="qform__file-ui" aria-hidden="true">
            <span className="qform__file-btn">Choose file</span>
            <span className="qform__file-name">{file ? file.name : 'No file selected'}</span>
          </span>
        </div>
        {errors.artwork && (
          <p id="artwork-error" className="qform__error">
            {errors.artwork}
          </p>
        )}
      </div>

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
