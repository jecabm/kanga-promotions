import { useEffect, useRef, useState } from 'react';
import { nav } from '../data/content';
import { ButtonLink } from './Button';
import { Logo } from './Logo';
import './Header.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 900 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header__bar">
        <a href="#top" className="header__logo" aria-label="Kanga Promotions, back to top" onClick={close}>
          <Logo tone="paper" src="/Kanga%20Promotions%20white.svg" />
        </a>

        <nav className="header__nav" aria-label="Main">
          <ul role="list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href="#quote" className="header__cta">
          Get a quote
        </ButtonLink>

        <button
          ref={toggleRef}
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="header__burger" aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className="header__panel" hidden={!open}>
        <nav aria-label="Mobile">
          <ul role="list">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  <span className="header__panel-n">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href="#quote" size="lg" arrow onClick={close}>
          Get a quote
        </ButtonLink>
      </div>
    </header>
  );
}
