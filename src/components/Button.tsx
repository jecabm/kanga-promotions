import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

interface Common {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
}

function classes(variant: Variant, size: Size, extra?: string) {
  return ['btn', `btn--${variant}`, `btn--${size}`, extra].filter(Boolean).join(' ');
}

const Arrow = () => (
  <svg className="btn__arrow" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </a>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
