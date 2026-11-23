import { ButtonLink } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { steps } from '../data/content';
import './HowItWorks.css';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section how" aria-labelledby="how-title">
      <div className="container">
        <SectionHeading id="how-title" eyebrow="How it works" title="From your logo to your merchandise." />

        <ol className="how__steps" role="list">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} className="how__step" delay={i * 110}>
              <span className="how__n" aria-hidden="true">
                {s.n}
              </span>
              <p className="how__label">Step {s.n}</p>
              <h3 className="h3 how__title">{s.title}</h3>
              <p className="muted">{s.copy}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="how__cta">
          <p>Ready when you are. Tell us what you have in mind.</p>
          <ButtonLink href="#quote" size="lg" arrow>
            Start my quote
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
