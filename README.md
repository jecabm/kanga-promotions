# Kanga Promotions: Landing Page

Marketing landing page for **Kanga Promotions**, custom printed promotional merchandise for Australian businesses.
Built with React 18, Vite 5 and TypeScript. No UI framework and no runtime CMS.

- Design system and brand rationale: [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md)
- Image shot list and specs: [`docs/IMAGE-ASSETS.md`](docs/IMAGE-ASSETS.md)

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to /dist
npm run preview    # serve the production build
```

## Project structure

```
src/
  components/   reusable UI (Button, Header, Logo, ProductArt, ProductCard, QuoteForm…)
  sections/     page sections in page order (Hero, Products, Benefits…, Footer)
  data/         ALL copy and content (content.ts) + types
  context/      quote selection state ("Enquire now" pre-selects products)
  styles/       design tokens + base styles
docs/           design system, image asset list
```

To edit copy, products, FAQs or contact details, change `src/data/content.ts`.

## Quote form

The form posts to **Netlify Forms** (form name `quote`, with a hidden copy in `index.html` so Netlify detects it at deploy time).

- `VITE_FORMS_ENABLED=true` is set in `netlify.toml`, so the form submits on Netlify.
- Locally, and anywhere without that flag, the form **validates but does not pretend to send**. It shows a "not connected yet" notice instead.
- Success is only shown after a real `2xx` response. Network or server failures show an error state.
- File uploads are limited to 8MB (Netlify's limit) and to PDF/AI/EPS/SVG/PNG/JPG.

After the first deploy, open **Netlify → Site configuration → Forms**, enable form detection, then redeploy. Set up email notifications under **Forms → Form notifications**.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial Kanga Promotions landing page"
git branch -M main
git remote add origin https://github.com/<your-org>/kanga-promotions.git
git push -u origin main
```

`.env` files are git-ignored. Only `.env.example` is committed, and it contains no secrets.

## Deploy to Netlify

1. Netlify → **Add new site → Import an existing project →** choose the GitHub repo.
2. Build settings come from `netlify.toml` (`npm run build`, publish `dist`, Node 20).
3. Deploy, then enable Forms (see above) and redeploy.

### Custom subdomain (e.g. `promotions.yourdomain.com.au`)

1. Netlify → **Domain management → Add a domain** → enter the subdomain.
2. At your DNS provider, add a **CNAME** record: `promotions` → `<your-site>.netlify.app`.
3. Wait for DNS, then Netlify provisions HTTPS automatically.
4. Update the canonical and `og:url` in `index.html` to the live URL.

## Before launch checklist

- [x] Official logo in place (`public/Kanga-Promotions-logo.png`)
- [ ] Optional: supply a reversed/white logo for dark backgrounds (footer currently uses a light plate)
- [ ] Replace SVG mockups and photo placeholders with real imagery (`docs/IMAGE-ASSETS.md`)
- [ ] Add confirmed phone and email in `src/data/content.ts`
- [ ] Add `public/og-image.jpg` and uncomment the OG image tags
- [ ] Set the real canonical URL in `index.html`
- [ ] Submit a test enquiry on the deployed site and confirm it arrives
