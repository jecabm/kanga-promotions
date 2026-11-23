# Required image assets

The site currently uses **illustrated SVG mockups** (`src/components/ProductArt.tsx`) and **labelled photo placeholders** (`src/components/PhotoPlaceholder.tsx`). Nothing links to external or random image URLs.

Replace these with real photography or approved mockups when available.

## Format guidelines
- Export **AVIF + WebP** (JPG fallback), sRGB.
- Product squares: 1600×1600. Feature cards: 2000×1375. Industry portraits: 1200×1600.
- Keep each file under ~250KB. Use `loading="lazy"` and `decoding="async"` on everything below the hero, and `fetchpriority="high"` on the first hero image.
- Use **fictional or approved** customer branding only. Don't put the Kanga Promotions logo on every product.

## Brand
| File | Notes |
|---|---|
| `public/brand/kanga-promotions.svg` | Official logo (replaces placeholder in `Logo.tsx`) |
| `public/brand/kanga-promotions-reversed.svg` | Light version for dark footer |
| `public/og-image.jpg` | 1200×630 social share image, then uncomment OG tags in `index.html` |

## Hero mosaic (4)
1. Black ceramic mug, gold illustrated print, gold handle, on a terracotta set
2. Teal wraparound stubby cooler with an abstract graphic, on a sky-blue set
3. Matte blush drink bottle with a small minimalist logo, on a mint set
4. Two-tone cream/red cap with a printed front logo, on a cobalt set

## Product cards (10). Each with a different backdrop and print style
| # | Product | Direction |
|---|---|---|
| 01 | Stubby cooler | Navy with gold stripes, full-colour wrap, butter set |
| 02 | Air freshener | Die-cut round, double-sided red/gold print, hanging string, sky set |
| 03 | Towel | Cream beach towel, teal stripes, large-format artwork, blush set |
| 04 | Mug | White mug, coloured handle, playful illustration, sage set |
| 05 | Drink bottle | Stone stainless bottle, laser-engraved logo, graphite set |
| 06 | Hand sanitiser | Pump bottle, custom green label, mint set |
| 07 | Cap | Stone cap, dark brim, embroidered patch, terracotta set |
| 08 | Workwear | Hi-vis orange/navy shirt with reflective tape, chest logo, sand set |
| 09 | Tote bag | Natural canvas, large screen print, lilac set |
| 10 | Keyring | Bottle-opener or acrylic tag, pad print, cobalt set |

## Industries (4)
- Mining & Resources: crew in branded hi-vis at a remote site, golden hour, red earth
- Construction & Engineering: site team on a deck in branded caps, cranes behind
- Industrial & Trade: workshop bench with a branded mug, air freshener in a ute cabin
- Corporate & Events: expo stand with totes, bottles and towels styled on a table

## Inspiration gallery (8)
Sublimated festival towel · screen-printed café tee · pad-printed keyring · die-cut botanical air freshener · black tote with gold foil · cobalt glazed mug with white handle · embroidered hi-vis cap · custom-label sanitiser.
