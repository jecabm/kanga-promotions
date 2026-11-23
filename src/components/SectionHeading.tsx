import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, intro, className = '' }: Props) {
  return (
    <Reveal className={`section-heading ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h2">
        {title}
      </h2>
      {intro && <p className="lead muted">{intro}</p>}
    </Reveal>
  );
}
