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

The form sends enquiries to **[Web3Forms](https://web3forms.com)**, which emails them to the address verified on the Web3Forms account. No backend is needed.

- Set `VITE_WEB3FORMS_ACCESS_KEY` in **Netlify → Site configuration → Environment variables**, then redeploy. For local testing, put it in `.env.local` (see `.env.example`).
- Without the key, the form **validates but does not pretend to send**. It shows a "not connected yet" notice instead.
- Success is only shown after Web3Forms confirms the submission. Network or server failures show an error state.
- Spam protection: a hidden `botcheck` honeypot plus Web3Forms' own server-side spam filtering.
- File attachments are a paid Web3Forms feature, so the form asks for an optional **artwork link** (Google Drive, Dropbox, WeTransfer) instead of an upload.

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
