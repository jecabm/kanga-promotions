import type { Product } from '../data/types';
import { useQuote } from '../context/QuoteContext';
import { ProductArt } from './ProductArt';
import './ProductCard.css';

interface Props {
  product: Product;
  index: number;
  total: number;
  feature?: boolean;
}

export function ProductCard({ product, index, total, feature }: Props) {
  const { preselect } = useQuote();
  const { art } = product;
  const titleId = `product-${product.id}`;

  return (
    <article className={`pcard${feature ? ' pcard--feature' : ''}`} aria-labelledby={titleId}>
      <div className="pcard__media" style={{ background: product.photo ? '#e6e2d8' : art.backdrop }}>
        <span className="pcard__index">
          {String(index + 1).padStart(2, '0')}
          <span aria-hidden="true">/{total}</span>
        </span>
        <span className="pcard__tag">{product.technique}</span>
        {product.photo ? (
          <img
            className="pcard__photo"
            src={product.photo.src}
            alt={product.photo.alt}
            loading="lazy"
            decoding="async"
            style={product.photo.zoom ? ({ '--photo-zoom': product.photo.zoom } as React.CSSProperties) : undefined}
          />
        ) : (
          <ProductArt
            className="pcard__art"
            art={art}
            label={`${product.name} mockup with example branding for the fictional brand ${art.brand.name}`}
          />
        )}
      </div>
      <div className="pcard__body">
        <h3 id={titleId} className="h3">
          {product.name}
        </h3>
        <p className="pcard__copy muted">{product.description}</p>
        <a
          className="pcard__link"
          href="#quote"
          onClick={() => preselect(product.id)}
          aria-label={`Enquire now about ${product.name}`}
        >
          Enquire now
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </a>
      </div>
    </article>
  );
}
