import './PhotoPlaceholder.css';

interface Props {
  /** art-direction brief for the photographer / image generator */
  brief: string;
  tone: string;
  label: string;
}

/**
 * Clearly labelled placeholder for photography that has not been supplied yet.
 * Replace with an optimised <img loading="lazy"> once assets exist (see docs/IMAGE-ASSETS.md).
 */
export function PhotoPlaceholder({ brief, tone, label }: Props) {
  return (
    <div className="photo-ph" style={{ background: tone }} role="img" aria-label={`Photo placeholder: ${label}`}>
      <span className="photo-ph__badge">Photo placeholder</span>
      <p className="photo-ph__brief">{brief}</p>
    </div>
  );
}
