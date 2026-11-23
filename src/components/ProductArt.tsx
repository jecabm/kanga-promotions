import { useId } from 'react';
import type { Artwork } from '../data/types';
import { BrandMark } from './BrandMark';

interface ProductArtProps {
  art: Artwork;
  /** accessible description, e.g. "Navy stubby cooler printed with ..." */
  label: string;
  className?: string;
}

/**
 * Illustrated product mockup used as a stand-in for product photography.
 * Every instance can carry a different fictional brand, colourway and print style.
 * Swap for <img> photography when assets are available (see docs/IMAGE-ASSETS.md).
 */
export function ProductArt({ art, label, className }: ProductArtProps) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid meet">
      <Drawing art={art} uid={uid} />
    </svg>
  );
}

const FONT = "'Archivo Variable', 'Arial Narrow', sans-serif";

function BrandText({
  x,
  y,
  size,
  maxWidth,
  fill,
  text,
  weight = 800,
  spacing = 0.06,
}: {
  x: number;
  y: number;
  size: number;
  maxWidth: number;
  fill: string;
  text: string;
  weight?: number;
  spacing?: number;
}) {
  const estimated = text.length * size * (0.62 + spacing);
  const fit = estimated > maxWidth;
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontFamily={FONT}
      fontWeight={weight}
      fontSize={size}
      letterSpacing={`${spacing}em`}
      textAnchor="middle"
      {...(fit ? { textLength: maxWidth, lengthAdjust: 'spacingAndGlyphs' } : {})}
    >
      {text.toUpperCase()}
    </text>
  );
}

const Shadow = ({ cx, cy, rx }: { cx: number; cy: number; rx: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.085} fill="#000" opacity="0.18" />
);

const Highlight = ({ x, y, h }: { x: number; y: number; h: number }) => (
  <rect x={x} y={y} width="9" height={h} rx="4.5" fill="#fff" opacity="0.22" />
);

function Confetti({ color, seed = 1 }: { color: string; seed?: number }) {
  const pts = [
    [138, 150, 5],
    [246, 152, 4],
    [150, 262, 4],
    [238, 268, 6],
    [128, 208, 3],
    [256, 206, 3],
  ];
  return (
    <>
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={x + ((seed * 7 * i) % 9)} cy={y} r={r} fill={color} opacity={0.85} />
      ))}
    </>
  );
}

function Drawing({ art, uid }: { art: Artwork; uid: string }) {
  const { kind, body, accent, ink, brand, pattern = 'none' } = art;
  const clip = `clip-${uid}`;

  switch (kind) {
    /* ---------------- MUG ---------------- */
    case 'mug':
      return (
        <g>
          <Shadow cx={196} cy={322} rx={108} />
          <path d="M268 166 h16 a44 44 0 0 1 0 104 h-16" fill="none" stroke={accent} strokeWidth="20" strokeLinecap="round" />
          <path d="M110 116 h162 v180 a24 24 0 0 1 -24 24 h-114 a24 24 0 0 1 -24 -24 z" fill={body} />
          <rect x="110" y="112" width="162" height="12" rx="3" fill={accent} />
          <rect x="250" y="124" width="22" height="190" fill="#000" opacity="0.05" />
          <Highlight x={122} y={136} h={160} />
          {pattern === 'dots' && <Confetti color={accent} />}
          <BrandMark kind={brand.mark} x={191} y={206} size={78} fg={ink} bg={body} />
          <BrandText x={191} y={278} size={17} maxWidth={130} fill={ink} text={brand.name} />
        </g>
      );

    /* ---------------- BOTTLE ---------------- */
    case 'bottle':
      return (
        <g>
          <defs>
            <clipPath id={clip}>
              <path d="M172 94 h56 l26 36 v196 a26 26 0 0 1 -26 26 h-56 a26 26 0 0 1 -26 -26 v-196 z" />
            </clipPath>
          </defs>
          <Shadow cx={200} cy={354} rx={78} />
          <path d="M184 50 v-14 a16 16 0 0 1 32 0 v14" stroke={ink} strokeWidth="8" fill="none" />
          <rect x="166" y="46" width="68" height="50" rx="8" fill={ink} />
          <g clipPath={`url(#${clip})`}>
            <rect x="140" y="90" width="120" height="270" fill={body} />
            {pattern === 'split' && <rect x="140" y="268" width="120" height="100" fill={accent} />}
            <rect x="236" y="90" width="24" height="270" fill="#000" opacity="0.07" />
          </g>
          <Highlight x={158} y={140} h={180} />
          <BrandMark kind={brand.mark} x={200} y={196} size={44} fg={ink} bg={body} />
          <BrandText x={200} y={238} size={11} maxWidth={88} fill={ink} text={brand.name} spacing={0.18} weight={700} />
        </g>
      );

    /* ---------------- STUBBY COOLER ---------------- */
    case 'stubby':
      return (
        <g>
          <defs>
            <clipPath id={clip}>
              <path d="M135 108 v196 a65 14 0 0 0 130 0 v-196 z" />
            </clipPath>
          </defs>
          <Shadow cx={200} cy={322} rx={88} />
          <g clipPath={`url(#${clip})`}>
            <rect x="130" y="100" width="140" height="230" fill={body} />
            {pattern === 'stripes' && (
              <>
                <rect x="130" y="134" width="140" height="16" fill={accent} />
                <rect x="130" y="156" width="140" height="5" fill={accent} />
                <rect x="130" y="262" width="140" height="5" fill={accent} />
                <rect x="130" y="273" width="140" height="16" fill={accent} />
              </>
            )}
            {pattern === 'full' && (
              <>
                <circle cx="150" cy="300" r="70" fill={accent} opacity="0.9" />
                <circle cx="268" cy="132" r="48" fill={accent} opacity="0.55" />
              </>
            )}
            <rect x="244" y="100" width="26" height="230" fill="#000" opacity="0.1" />
            <rect x="135" y="100" width="12" height="230" fill="#fff" opacity="0.1" />
          </g>
          <ellipse cx="200" cy="108" rx="65" ry="14" fill={accent} />
          <ellipse cx="200" cy="106" rx="54" ry="10" fill="#b9bec5" />
          <ellipse cx="200" cy="104" rx="54" ry="9" fill="#dde0e4" />
          <rect x="190" y="98" width="20" height="6" rx="3" fill="#a3a8af" />
          <BrandMark kind={brand.mark} x={200} y={192} size={46} fg={ink} bg={body} />
          <BrandText x={200} y={240} size={19} maxWidth={112} fill={ink} text={brand.name} />
        </g>
      );

    /* ---------------- TOWEL ---------------- */
    case 'towel':
      return (
        <g>
          <defs>
            <clipPath id={clip}>
              <rect x="96" y="58" width="208" height="284" rx="3" />
            </clipPath>
          </defs>
          <Shadow cx={200} cy={352} rx={122} />
          <g clipPath={`url(#${clip})`}>
            <rect x="90" y="50" width="220" height="300" fill={body} />
            {pattern === 'stripes' &&
              [96, 132, 250, 286].map((x, i) => (
                <rect key={x} x={x} y="50" width={i % 3 === 0 ? 18 : 6} height="300" fill={accent} />
              ))}
            {pattern === 'dots' &&
              Array.from({ length: 6 }).flatMap((_, r) =>
                Array.from({ length: 5 }).map((__, c) => (
                  <circle key={`${r}-${c}`} cx={110 + c * 45 + (r % 2) * 22} cy={74 + r * 52} r="5" fill={accent} opacity="0.55" />
                )),
              )}
            <path d="M96 300 L304 220 V342 H96 Z" fill="#000" opacity="0.06" />
          </g>
          {[...Array(18)].map((_, i) => (
            <rect key={i} x={100 + i * 11.5} y="342" width="3" height="10" fill={body} opacity="0.9" />
          ))}
          <BrandMark kind={brand.mark} x={200} y={176} size={124} fg={ink} bg={body} />
          <BrandText x={200} y={282} size={28} maxWidth={170} fill={ink} text={brand.name} />
        </g>
      );

    /* ---------------- HAND SANITISER ---------------- */
    case 'sanitiser':
      return (
        <g>
          <Shadow cx={200} cy={352} rx={74} />
          <path d="M194 62 h54 v13 h-40 v18 h-14 z" fill={ink} />
          <rect x="192" y="90" width="16" height="30" fill={ink} />
          <rect x="174" y="116" width="52" height="28" rx="5" fill={ink} />
          <rect x="140" y="140" width="120" height="208" rx="22" fill={body} />
          <rect x="146" y="176" width="108" height="166" rx="18" fill={accent} opacity="0.18" />
          <Highlight x={150} y={156} h={160} />
          <rect x="156" y="184" width="88" height="128" rx="4" fill={accent} />
          <BrandMark kind={brand.mark} x={200} y={226} size={50} fg={ink} bg={accent} />
          <BrandText x={200} y={276} size={11} maxWidth={72} fill={ink} text={brand.name} spacing={0.12} />
          <BrandText x={200} y={296} size={7.5} maxWidth={72} fill={ink} text="Hand sanitiser" weight={600} spacing={0.24} />
        </g>
      );

    /* ---------------- CAP ---------------- */
    case 'cap':
      return (
        <g>
          <Shadow cx={200} cy={318} rx={124} />
          <path d="M96 254 C96 150 150 112 200 112 C250 112 304 150 304 254 Z" fill={body} />
          <path
            d="M200 114 V254 M200 114 C160 140 140 190 136 254 M200 114 C240 140 260 190 264 254"
            stroke="#000"
            opacity="0.16"
            fill="none"
            strokeWidth="2"
          />
          <path d="M96 254 C96 150 150 112 200 112 C170 130 130 170 124 254 Z" fill="#fff" opacity="0.08" />
          <circle cx="200" cy="113" r="7" fill={accent} />
          <path d="M82 250 C140 236 260 236 318 250 C328 270 300 302 200 304 C100 302 72 270 82 250 Z" fill={accent} />
          <path d="M92 262 C150 252 250 252 308 262" stroke="#000" opacity="0.15" strokeWidth="2" fill="none" />
          {pattern === 'full' ? (
            <BrandMark kind={brand.mark} x={200} y={192} size={70} fg={ink} bg={body} />
          ) : (
            <>
              <rect x="156" y="164" width="88" height="62" rx="8" fill={ink} />
              <rect x="161" y="169" width="78" height="52" rx="5" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3 3" />
              <BrandMark kind={brand.mark} x={200} y={195} size={38} fg={accent} bg={ink} />
            </>
          )}
        </g>
      );

    /* ---------------- APPAREL / WORKWEAR ---------------- */
    case 'apparel': {
      const shirt =
        'M148 72 L96 92 L52 158 L96 190 L114 166 V344 H286 V166 L304 190 L348 158 L304 92 L252 72 C240 98 160 98 148 72 Z';
      return (
        <g>
          <defs>
            <clipPath id={clip}>
              <path d={shirt} />
            </clipPath>
          </defs>
          <Shadow cx={200} cy={352} rx={112} />
          <g clipPath={`url(#${clip})`}>
            <rect x="40" y="60" width="320" height="300" fill={body} />
            {pattern === 'hivis' && (
              <>
                <rect x="40" y="60" width="320" height="150" fill={accent} />
                <rect x="40" y="226" width="320" height="16" fill="#d9dce1" />
                <rect x="40" y="300" width="320" height="16" fill="#d9dce1" />
              </>
            )}
            <rect x="268" y="60" width="90" height="300" fill="#000" opacity="0.07" />
          </g>
          <path d="M148 72 C160 98 240 98 252 72" fill="none" stroke={pattern === 'hivis' ? body : accent} strokeWidth="8" />
          {pattern === 'full' ? (
            <>
              <BrandMark kind={brand.mark} x={200} y={196} size={96} fg={ink} bg={body} />
              <BrandText x={200} y={284} size={20} maxWidth={150} fill={ink} text={brand.name} />
            </>
          ) : (
            <>
              <BrandMark kind={brand.mark} x={246} y={138} size={34} fg={ink} bg={body} />
              <BrandText x={246} y={172} size={8.5} maxWidth={62} fill={ink} text={brand.name} spacing={0.1} />
            </>
          )}
        </g>
      );
    }

    /* ---------------- TOTE BAG ---------------- */
    case 'bag':
      return (
        <g>
          <Shadow cx={200} cy={356} rx={118} />
          <path d="M150 150 V112 a50 50 0 0 1 100 0 V150" stroke={accent} strokeWidth="13" fill="none" strokeLinecap="round" />
          <rect x="96" y="140" width="208" height="212" rx="3" fill={body} />
          <rect x="96" y="140" width="208" height="14" fill="#000" opacity="0.07" />
          <path d="M96 140 L130 352 H96 Z" fill="#000" opacity="0.04" />
          <BrandMark kind={brand.mark} x={200} y={232} size={104} fg={ink} bg={body} />
          <BrandText x={200} y={322} size={18} maxWidth={160} fill={ink} text={brand.name} />
        </g>
      );

    /* ---------------- AIR FRESHENER ---------------- */
    case 'freshener':
      return (
        <g>
          <path d="M200 22 V102" stroke={ink} strokeWidth="2.5" />
          <path d="M186 22 a14 10 0 0 1 28 0" stroke={ink} strokeWidth="2.5" fill="none" />
          <circle cx="208" cy="230" r="116" fill="#000" opacity="0.14" />
          <rect x="178" y="90" width="44" height="30" rx="8" fill={body} />
          <circle cx="200" cy="222" r="116" fill={body} />
          <circle cx="200" cy="104" r="5" fill="#000" opacity="0.35" />
          <circle cx="200" cy="222" r="102" fill="none" stroke={accent} strokeWidth="6" />
          {pattern === 'full' && <path d="M98 240 A102 102 0 0 0 302 240 Z" fill={accent} opacity="0.9" />}
          <BrandMark kind={brand.mark} x={200} y={196} size={96} fg={ink} bg={body} />
          <BrandText x={200} y={286} size={20} maxWidth={150} fill={ink} text={brand.name} />
        </g>
      );

    /* ---------------- KEYRING ---------------- */
    case 'keyring':
      return (
        <g transform="rotate(-8 200 90)">
          <defs>
            <clipPath id={clip}>
              <rect x="148" y="138" width="104" height="194" rx="26" />
            </clipPath>
          </defs>
          <circle cx="200" cy="86" r="36" fill="none" stroke="#a7acb4" strokeWidth="8" />
          <circle cx="200" cy="86" r="36" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" strokeDasharray="30 200" />
          <rect x="192" y="116" width="16" height="28" rx="8" fill="none" stroke="#8d939b" strokeWidth="5" />
          <rect x="154" y="146" width="104" height="194" rx="26" fill="#000" opacity="0.18" />
          <rect x="148" y="138" width="104" height="194" rx="26" fill={body} />
          <circle cx="200" cy="160" r="9" fill="#000" opacity="0.3" />
          {pattern === 'split' && <rect x="148" y="270" width="104" height="62" fill={accent} clipPath={`url(#${clip})`} />}
          <rect x="148" y="138" width="104" height="194" rx="26" fill="none" stroke="#000" strokeOpacity="0.06" strokeWidth="2" />
          <BrandMark kind={brand.mark} x={200} y={222} size={62} fg={ink} bg={body} />
          <BrandText x={200} y={300} size={12} maxWidth={80} fill={pattern === 'split' ? body : ink} text={brand.name} />
        </g>
      );
  }
}
