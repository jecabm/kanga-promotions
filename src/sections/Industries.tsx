import { PhotoPlaceholder } from '../components/PhotoPlaceholder';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { industries } from '../data/content';
import './Industries.css';

export function Industries() {
  return (
    <section className="section section--white" aria-labelledby="industries-title">
      <div className="container">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries"
          title="Made for businesses that make things happen."
          className="industries__head"
        />
        <ul className="industries__grid" role="list">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.id} className="industry" delay={i * 90}>
              <div className="industry__media">
                <PhotoPlaceholder brief={ind.photo} tone={ind.tone} label={ind.name} />
              </div>
              <h3 className="h3 industry__name">{ind.name}</h3>
              <p className="muted">{ind.copy}</p>
              <ul className="industry__ideas" role="list" aria-label={`Popular for ${ind.name}`}>
                {ind.ideas.map((idea) => (
                  <li key={idea}>{idea}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
