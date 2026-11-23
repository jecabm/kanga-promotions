import type { MarkKind } from '../data/types';

interface BrandMarkProps {
  kind: MarkKind;
  /** centre x / y in parent SVG units */
  x: number;
  y: number;
  /** rendered size in parent SVG units */
  size: number;
  fg: string;
  bg?: string;
  /** draw the mark inside a filled badge circle */
  badge?: boolean;
}

/**
 * Simple marks for FICTIONAL example customer brands.
 * Drawn in a 100x100 box, then positioned/scaled into the product artwork.
 */
export function BrandMark({ kind, x, y, size, fg, bg = 'transparent', badge }: BrandMarkProps) {
  const s = size / 100;
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${s})`} aria-hidden="true">
      {badge && <circle cx="50" cy="50" r="50" fill={fg} />}
      <MarkShape kind={kind} fg={badge ? bg : fg} bg={badge ? fg : bg} />
    </g>
  );
}

function MarkShape({ kind, fg, bg }: { kind: MarkKind; fg: string; bg: string }) {
  switch (kind) {
    case 'mountain':
      return (
        <>
          <path d="M10 76 L38 28 L52 50 L63 34 L90 76 Z" fill={fg} />
          <path d="M38 28 L46 42 L40 40 L34 46 L31 40 Z" fill={bg} opacity="0.9" />
        </>
      );
    case 'sun':
      return (
        <>
          <path d="M22 64 A28 28 0 0 1 78 64 Z" fill={fg} />
          {[-60, -30, 0, 30, 60].map((a) => (
            <rect key={a} x="48" y="14" width="4" height="12" fill={fg} transform={`rotate(${a} 50 64)`} />
          ))}
          <rect x="14" y="70" width="72" height="5" fill={fg} />
          <rect x="26" y="80" width="48" height="4" fill={fg} />
        </>
      );
    case 'wave':
      return (
        <>
          <path d="M10 44 Q22 30 34 44 T58 44 T82 44 T94 40" fill="none" stroke={fg} strokeWidth="7" strokeLinecap="round" />
          <path d="M10 62 Q22 48 34 62 T58 62 T82 62 T94 58" fill="none" stroke={fg} strokeWidth="7" strokeLinecap="round" />
          <circle cx="72" cy="22" r="8" fill={fg} />
        </>
      );
    case 'bolt':
      return <path d="M58 8 L24 56 H46 L38 92 L76 40 H54 Z" fill={fg} />;
    case 'leaf':
      return (
        <>
          <path d="M50 8 C82 28 82 70 50 92 C18 70 18 28 50 8 Z" fill={fg} />
          <path d="M50 22 V84 M50 46 L36 36 M50 60 L64 50 M50 70 L38 62" stroke={bg} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      );
    case 'hex':
      return (
        <>
          <path d="M50 6 L88 28 V72 L50 94 L12 72 V28 Z" fill={fg} />
          <path d="M50 26 L69 37 V63 L50 74 L31 63 V37 Z" fill="none" stroke={bg} strokeWidth="6" />
        </>
      );
    case 'drop':
      return (
        <>
          <path d="M50 8 C50 8 80 46 80 64 A30 30 0 0 1 20 64 C20 46 50 8 50 8 Z" fill={fg} />
          <path d="M34 66 A16 16 0 0 0 50 82" fill="none" stroke={bg} strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case 'star':
      return (
        <>
          <Star cx={50} cy={20} r={10} fill={fg} />
          <Star cx={24} cy={50} r={9} fill={fg} />
          <Star cx={74} cy={46} r={9} fill={fg} />
          <Star cx={50} cy={82} r={12} fill={fg} />
          <Star cx={62} cy={62} r={5} fill={fg} />
        </>
      );
    case 'bean':
      return (
        <>
          <ellipse cx="50" cy="50" rx="30" ry="40" fill={fg} transform="rotate(-24 50 50)" />
          <path d="M60 16 C38 34 62 62 40 84" fill="none" stroke={bg} strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case 'flame':
      return (
        <>
          <path d="M50 6 C58 30 82 40 78 66 C75 84 62 94 50 94 C36 94 22 84 22 64 C22 46 36 40 38 22 C46 30 46 40 46 44 C52 36 54 22 50 6 Z" fill={fg} />
          <path d="M50 58 C56 66 62 70 60 80 C58 86 54 88 50 88 C44 88 40 84 40 78 C40 70 48 66 50 58 Z" fill={bg} />
        </>
      );
  }
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return <polygon points={pts.join(' ')} fill={fill} />;
}
