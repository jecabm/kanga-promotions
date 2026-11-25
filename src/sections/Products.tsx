import type { CSSProperties } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { products } from '../data/content';
import './Products.css';

/** Editorial rhythm: spans on a 12-col grid so rows never repeat the same layout. */
const spans = [7, 5, 4, 4, 4];

export function Products() {
  return (
    <section id="products" className="section" aria-labelledby="products-title">
      <div className="container">
        <div className="products__head">
          <SectionHeading
            id="products-title"
            eyebrow="The range"
            title={
              <>
                Merchandise that makes your brand <span className="u-gold-underline">stand out.</span>
              </>
            }
            intro="Practical promotional products, customised with your logo and designed to keep your business visible."
          />
          <p className="products__disclaimer">
            Product images are illustrated concept mockups using fictional example brands, shown to demonstrate
            different printing and customisation styles.
          </p>
        </div>

        <div className="products__grid">
          {products.map((p, i) => (
            <Reveal
              key={p.id}
              className="products__cell"
              style={{ '--span': spans[i] } as CSSProperties}
              delay={(i % 3) * 80}
            >
              <ProductCard product={p} feature={spans[i] >= 7} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
