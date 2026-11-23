import { Reveal } from '../components/Reveal';
import { faqs } from '../data/content';
import './Faq.css';

export function Faq() {
  return (
    <section className="section section--white faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <Reveal className="faq__intro">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h2">
            Good questions.
          </h2>
          <p className="muted">
            Every project is a little different. If your question needs a specific answer, our team will confirm the
            details with you. <a href="#quote">Ask us directly</a>.
          </p>
        </Reveal>

        <div className="faq__list">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq__item" open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <p className="faq__a muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
