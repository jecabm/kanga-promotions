import { QuoteForm } from '../components/QuoteForm';
import { Reveal } from '../components/Reveal';
import { site } from '../data/content';
import './Quote.css';

export function Quote() {
  return (
    <section id="quote" className="section quote" aria-labelledby="quote-title">
      <div className="container quote__grid">
        <Reveal className="quote__intro">
          <p className="eyebrow">Request a quote</p>
          <h2 id="quote-title" className="h2">
            Let&apos;s put your brand <span className="u-gold-underline">out there.</span>
          </h2>
          <p className="lead muted">
            Tell us what you have in mind and our team will help you explore the right promotional merchandise for your
            business.
          </p>
          <ul className="quote__points" role="list">
            <li>Quote for one product or the full range</li>
            <li>Upload your logo now, or send it later</li>
            <li>Help choosing the right decoration</li>
          </ul>
          <div className="quote__contact">
            <p className="eyebrow">Prefer to talk?</p>
            <p>{site.phone}</p>
            <p>{site.email}</p>
          </div>
        </Reveal>

        <div className="quote__card">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
