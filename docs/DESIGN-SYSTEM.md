# Kanga Promotions: Brand Analysis & Design System

## 1. Brand analysis (parent: kangalifting.com.au)

| Observed on Kanga Lifting | What it signals | How Kanga Promotions uses it |
|---|---|---|
| Kanga Gold `#F8AD00` kangaroo line-mark | Recognition, energy | **Kept** as the single accent colour, so the family link is obvious |
| Heavy, italic, all-caps wordmark | Strength, movement | **Echoed** in the wide, heavy Archivo display type and the skewed gold "everything." highlight |
| Charcoal `#222` / `#3F3F3F`, white backgrounds | Industrial, technical | **Shifted** to a warm ink `#15130F` on catalogue paper `#F5F0E6`, so it feels softer and more editorial |
| Open Sans, dense Shopify catalogue grid | Utility, compliance | **Replaced** with editorial layouts, generous whitespace and varied grids |
| Product shots on white | Specification | **Replaced** with coloured photography sets, a different backdrop per product |

The result is clearly part of the Kanga family, but reads as a creative merchandise brand rather than an industrial supplier.

## 2. Colour

**Website palette** (brand UI only):

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#15130F` | Primary: text, dark sections, footer |
| `--paper` | `#F5F0E6` | Secondary: page background |
| `--paper-2` | `#EBE4D6` | Recessed surfaces (quote section, CTA panels) |
| `--white` | `#FFFDF8` | Raised surfaces (industries, FAQ, inputs) |
| `--gold` | `#F8AD00` | Accent: CTAs, highlights, markers. Always paired with ink text, never gold text on paper |
| `--ink-3` | `#5A554C` | Secondary text on paper (passes WCAG AA) |
| `--eucalypt` | `#2E5A4C` | Success state |
| `--error` | `#B3261E` | Errors and required markers |

**Product showcase sets** (photography backdrops only, *not* brand colours): terracotta, sky, sage, blush, sand, cobalt, mint, graphite, lilac, butter. The products themselves use each fictional customer's own colours, so **the brand palette is never forced onto merchandise.**

## 3. Typography

| Style | Font | Settings |
|---|---|---|
| Display (H1) | Archivo Variable | wdth 112, weight 850, uppercase, line-height 0.88 |
| H2 | Archivo Variable | wdth 108, weight 800, uppercase, `clamp(2.2rem, 5vw, 4.6rem)` |
| H3 | Archivo Variable | wdth 100, weight 750, `clamp(1.35rem, 1.9vw, 1.75rem)` |
| Eyebrow / labels | Archivo Variable | 0.75rem, weight 650, tracking 0.16em, uppercase, leading rule |
| Body | Instrument Sans Variable | 17px / 1.6 |
| Lead | Instrument Sans Variable | `clamp(1.125rem, 1.4vw, 1.3rem)` |

Both fonts are self-hosted via `@fontsource-variable`, so there are no third-party font requests.

## 4. Spacing, grid & breakpoints

- 4px base scale: `--s-1` (4px) through `--s-10` (128px). Section padding is `clamp(4.5rem, 10vw, 9rem)`.
- Container max 1360px, fluid gutter `clamp(1rem, 3.2vw, 2.5rem)`.
- 12-column grid for products, with spans varied per row (7/5, 4/4/4, 5/7, 4/4/4) so no two rows repeat.
- Breakpoints: **640** (large phone), **900** (tablet: nav collapses), **1000/1200** (desktop layouts).

## 5. Components

- **Buttons:** primary (gold/ink), secondary (outlined ink, inverts on dark), ghost. 48px minimum height (56px large), 2px radius, uppercase display type, arrow nudges on hover, visible focus ring.
- **Navigation:** sticky translucent header. Below 900px it becomes a full-screen panel with large numbered links, focus moves into the panel, and Esc closes it.
- **Product card:** large photo set, index chip (01/10), technique chip, name, copy, and an "Enquire now" link that pre-selects the product in the quote form.
- **Forms:** 52px inputs, 1.5px borders, a gold focus halo, inline errors with icon, an error summary that receives focus, selectable product chips, and a styled file drop.
- **Corners:** 2–4px only. No pill shapes, no heavy gradients, minimal icons.

## 6. Motion

Fade-up on scroll (700ms, ease-out, once per element), a gentle float on hero products, and a slow product ticker. All motion is disabled under `prefers-reduced-motion`.

## 7. Wireframe & conversion strategy

```
[Header: logo · nav · GET A QUOTE]               ← CTA always visible
[Hero: headline + copy + 2 CTAs | product mosaic]
[Ticker: product names]
[Products: editorial 12-col grid, Enquire → form] ← CTA x10, preselects product
[Why merch: 3 numbered benefits on ink]
[Industries: 4 staggered photo columns]
[How it works: 3 steps + "Start my quote" panel] ← CTA
[Inspiration: masonry gallery by technique]
[FAQ: honest answers, link to form]             ← CTA
[Quote form: sticky intro | form card]          ← conversion point
[Footer: giant final CTA + links]               ← CTA
```

Hierarchy: the hero states the promise, the products show breadth, the benefits and industries build relevance, the steps remove friction, and the gallery inspires. The form is short, with only 6 required fields and an optional upload.

## 8. Optional: Sanity CMS (proposal, not implemented)

All content lives in `src/data/content.ts`, so the site works without a CMS. If the team wants to edit products, the gallery or FAQs without a developer:

- Schemas: `product` (name, slug, description, technique, image, order), `galleryItem`, `faq`, `industry`, `siteSettings` (contact details).
- Fetch at **build time** with a Netlify build hook triggered by a Sanity webhook, so there is no runtime API cost and Core Web Vitals stay fast.
- Use the Sanity image CDN for responsive `srcset` images.
- Keep the project ID and dataset in Netlify environment variables. A read-only token is only needed for private datasets.
