import { ButtonLink } from '../components/Button';
import { products } from '../data/content';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">Custom promotional products · Australia</p>
          <h1 id="hero-title" className="display hero__title">
            <span className="hero__line">Your brand.</span>{' '}
            <span className="hero__line">
              On <mark className="hero__mark">everything.</mark>
            </span>
          </h1>
          <div className="hero__text">
            <p className="lead">Make your brand memorable with custom printed promotional merchandise.</p>
            <p className="muted">
              From stubby coolers and air fresheners to towels, drinkware and apparel, put your logo on products
              people actually use.
            </p>
          </div>
          <div className="hero__actions">
            <ButtonLink href="#quote" size="lg" arrow>
              Get a quote
            </ButtonLink>
            <ButtonLink href="#products" size="lg" variant="secondary">
              Explore products
            </ButtonLink>
          </div>
        </div>

        <figure className="hero__photo">
          <img
            src="/merch.webp"
            alt="Branded promotional products: custom printed stubby coolers, pens, air fresheners and swing tags"
            width={1200}
            height={896}
            decoding="async"
            {...{ fetchpriority: 'high' }}
          />
        </figure>
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track">
          {[0, 1].map((dup) => (
            <span key={dup} className="hero__ticker-group">
              {products.map((p) => (
                <span key={p.id}>
                  {p.name}
                  <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
