import { ProductArt } from '../components/ProductArt';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { gallery } from '../data/content';
import './Inspiration.css';

export function Inspiration() {
  return (
    <section className="section section--ink inspo" aria-labelledby="inspo-title">
      <div className="container">
        <div className="inspo__head">
          <SectionHeading
            id="inspo-title"
            eyebrow="Inspiration"
            title={
              <>
                Imagine what we <span className="gold-mark">can create.</span>
              </>
            }
          />
          <p className="inspo__aside muted">
            Different colours, decoration techniques and logo placements. Every brand gets merchandise that looks like
            its own. All brands shown are fictional concept examples.
          </p>
        </div>

        <ul className="inspo__grid" role="list">
          {gallery.map((g, i) => (
            <Reveal as="li" key={i} className={`inspo__tile inspo__tile--${g.size}`} delay={(i % 4) * 70}>
              <figure style={{ background: g.art.backdrop }}>
                <ProductArt
                  className="inspo__art"
                  art={g.art}
                  label={`${g.note}: ${g.technique} example for the fictional brand ${g.art.brand.name}`}
                />
                <figcaption>
                  <span className="inspo__tech">{g.technique}</span>
                  <span className="inspo__note">{g.note}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
