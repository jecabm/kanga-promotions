import { Reveal } from '../components/Reveal';
import { benefits } from '../data/content';
import './Benefits.css';

export function Benefits() {
  return (
    <section id="merchandise" className="section section--ink benefits" aria-labelledby="benefits-title">
      <div className="container benefits__grid">
        <Reveal className="benefits__intro">
          <p className="eyebrow gold-mark">Why custom merchandise?</p>
          <h2 id="benefits-title" className="h2">
            More than a logo. <span className="gold-mark">A brand people remember.</span>
          </h2>
        </Reveal>

        <ol className="benefits__list" role="list">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} className="benefits__item" delay={i * 90}>
              <span className="benefits__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="benefits__title">{b.title}</h3>
              <p className="benefits__copy muted">{b.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
