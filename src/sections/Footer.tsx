import { ButtonLink } from '../components/Button';
import { Logo } from '../components/Logo';
import { nav, products, site } from '../data/content';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer section--ink" aria-labelledby="footer-cta">
      <div className="container">
        <div className="footer__cta">
          <h2 id="footer-cta" className="display footer__cta-title">
            Ready to make your brand more memorable?
          </h2>
          <ButtonLink href="#quote" size="lg" arrow>
            Get a quote
          </ButtonLink>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo tone="paper" />
            <p className="muted">
              Custom printed promotional merchandise for Australian businesses. Stubby coolers to workwear, we put your
              brand on products people actually use.
            </p>
            <p className="footer__parent muted">
              Part of the wider Kanga family of businesses.{' '}
              <a href={site.parentUrl} target="_blank" rel="noopener noreferrer">
                Visit {site.parentName}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="footer__heading">Explore</p>
            <ul role="list">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href="#quote">Get a quote</a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="footer__heading">Products</p>
            <ul role="list">
              {products.map((p) => (
                <li key={p.id}>
                  <a href="#products">{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
