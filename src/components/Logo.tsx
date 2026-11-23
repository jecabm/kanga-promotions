import './Logo.css';

/**
 * Official Kanga Promotions logo (public/Kanga-Promotions-logo.png, 935x450).
 * The web address line at the bottom of the artwork is cropped off via CSS because
 * it is illegible at header size. On dark backgrounds the reversed artwork is used
 * (public/Kanga-Promotions-logo-reversed.png: transparent background, white "KANGA").
 */
export function Logo({ tone = 'ink', src: srcOverride }: { tone?: 'ink' | 'paper'; src?: string }) {
  const src = srcOverride ?? (tone === 'paper' ? '/Kanga-Promotions-logo-reversed.png' : '/Kanga-Promotions-logo.png');
  return (
    <span className={`logo logo--${tone}`}>
      <img
        className="logo__img"
        src={src}
        alt="Kanga Promotions"
        width={935}
        height={362}
        decoding="async"
      />
    </span>
  );
}
