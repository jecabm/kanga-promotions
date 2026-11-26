import type { Artwork, ExampleBrand, Product } from './types';

/* ------------------------------------------------------------------
 * FICTIONAL example brands. These are NOT Kanga Promotions customers.
 * They exist only to demonstrate different branding applications.
 * ------------------------------------------------------------------ */
export const brands = {
  redDirt: { name: 'Red Dirt Drilling', mark: 'drop' },
  granite: { name: 'Granite Ridge', mark: 'mountain' },
  ironbark: { name: 'Ironbark Civil', mark: 'hex' },
  bluegum: { name: 'Bluegum Electrical', mark: 'bolt' },
  saltbush: { name: 'Saltbush Coffee', mark: 'bean' },
  coastline: { name: 'Coastline Surf Co', mark: 'wave' },
  wattle: { name: 'Wattle & Pine', mark: 'leaf' },
  spinifex: { name: 'Spinifex Fest', mark: 'sun' },
  southernCross: { name: 'Southern Cross', mark: 'star' },
  ember: { name: 'Ember & Oak', mark: 'flame' },
} satisfies Record<string, ExampleBrand>;

export const site = {
  name: 'Kanga Promotions',
  tagline: 'Your Brand. On Everything.',
  /** Preferred (canonical) origin. Keep in sync with index.html, robots.txt and sitemap.xml. */
  url: 'https://www.kangapromotions.com.au/',
  parentName: 'Kanga Lifting',
  parentUrl: 'https://www.kangalifting.com.au/',
  // TODO: replace placeholders with confirmed contact details
  phone: '[Phone number to be confirmed]',
  email: '[Email address to be confirmed]',
  location: 'Australia-wide',
};

export const nav = [
  { label: 'Merchandise', href: '#merchandise' },
  { label: 'Products', href: '#products' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#quote' },
];

export const products: Product[] = [
  {
    id: 'stubby-coolers',
    name: 'Custom Stubby Coolers',
    description: 'The Aussie classic. Bold wraparound prints that turn every cold one into a brand moment.',
    technique: 'Full-colour wrap',
    art: { kind: 'stubby', body: '#1e3a7b', accent: '#f2c14e', ink: '#fff6df', brand: brands.southernCross, pattern: 'stripes', backdrop: 'var(--set-butter)' },
    photo: { src: '/stubby-cooler.webp', alt: 'Custom printed stubby coolers with full-colour wraparound branding' },
  },
  {
    id: 'air-fresheners',
    name: 'Printed Air Fresheners',
    description: 'Die-cut to shape and printed both sides. Your logo on the dashboard of every work ute.',
    technique: 'Die-cut, double-sided',
    art: { kind: 'freshener', body: '#c2461d', accent: '#f6c453', ink: '#fff3e2', brand: brands.redDirt, backdrop: 'var(--set-sky)' },
    photo: { src: '/air-freshener.webp', alt: 'Custom printed die-cut air fresheners with client logos' },
  },
  {
    id: 'towels',
    name: 'Custom Towels',
    description: 'A big canvas for big artwork. Beach, gym and golf towels with large-format printing.',
    technique: 'Sublimation print',
    art: { kind: 'towel', body: '#f4efe4', accent: '#1f6f8b', ink: '#16485a', brand: brands.coastline, pattern: 'stripes', backdrop: 'var(--set-blush)' },
    photo: { src: '/towels.webp', alt: 'Custom printed towels with large-format branding' },
  },
  {
    id: 'mugs',
    name: 'Mugs',
    description: 'A daily desk companion. Colourful illustrations, contrast handles and wraparound designs.',
    technique: 'Ceramic print',
    art: { kind: 'mug', body: '#fbf7ef', accent: '#d9693f', ink: '#3b2a20', brand: brands.saltbush, pattern: 'dots', backdrop: 'var(--set-sage)' },
    photo: { src: '/mugs.webp', alt: 'Custom printed ceramic mugs with branded designs', zoom: 1.3 },
  },
  {
    id: 'drink-bottles',
    name: 'Drink Bottles',
    description: 'Insulated and reusable, with clean minimal branding or laser-engraved logos.',
    technique: 'Laser engraved',
    art: { kind: 'bottle', body: '#e9e6df', accent: '#c9c4b8', ink: '#16324f', brand: brands.bluegum, pattern: 'split', backdrop: 'var(--set-graphite)' },
    photo: { src: '/water-bottle.webp', alt: 'Custom branded insulated drink bottles', zoom: 1.3 },
  },
];

/** Hero mosaic: deliberately different colourways from the product cards. */
export const heroTiles: { art: Artwork; caption: string }[] = [
  {
    art: { kind: 'mug', body: '#1b1b1d', accent: '#f8ad00', ink: '#f8ad00', brand: brands.spinifex, backdrop: 'var(--set-terracotta)' },
    caption: 'Black mug, gold print',
  },
  {
    art: { kind: 'stubby', body: '#0f6d6a', accent: '#ffd6c2', ink: '#ffffff', brand: brands.coastline, pattern: 'full', backdrop: 'var(--set-sky)' },
    caption: 'Wraparound stubby cooler',
  },
  {
    art: { kind: 'bottle', body: '#f2b8a8', accent: '#e58f7b', ink: '#5a2618', brand: brands.saltbush, backdrop: 'var(--set-mint)' },
    caption: 'Matte drink bottle',
  },
  {
    art: { kind: 'cap', body: '#f1ece2', accent: '#d2492a', ink: '#d2492a', brand: brands.ember, pattern: 'full', backdrop: 'var(--set-cobalt)' },
    caption: 'Printed two-tone cap',
  },
];

export const benefits = [
  {
    title: 'Stay visible',
    copy: 'Put your brand into everyday moments and keep your business top of mind.',
  },
  {
    title: 'Make connections',
    copy: 'Corporate promotional gifts give customers, employees and business partners something practical and memorable.',
  },
  {
    title: 'Promote your business',
    copy: 'Turn events, campaigns and everyday interactions into opportunities to showcase your brand.',
  },
];

export const industries = [
  {
    id: 'mining',
    name: 'Mining & Resources',
    copy: 'Site-ready gear crews will use every shift.',
    ideas: ['Hi-vis workwear', 'Insulated bottles', 'Stubby coolers'],
    photo: 'Crew in branded hi-vis at a remote mine site, golden-hour light, red earth.',
    tone: '#7a3b1d',
  },
  {
    id: 'construction',
    name: 'Construction & Engineering',
    copy: 'Branding that turns up on site, every day.',
    ideas: ['Caps & beanies', 'Workwear', 'Keyrings'],
    photo: 'Site team on a construction deck wearing branded caps, cranes in background.',
    tone: '#3b4a5a',
  },
  {
    id: 'industrial',
    name: 'Industrial & Trade',
    copy: 'Useful gear for the workshop and the ute.',
    ideas: ['Air fresheners', 'Mugs', 'Hand sanitisers'],
    photo: 'Workshop bench with branded mug and air freshener hanging in a ute cabin.',
    tone: '#2e4a3c',
  },
  {
    id: 'corporate',
    name: 'Corporate & Events',
    copy: 'Expo packs, onboarding kits and client gifts.',
    ideas: ['Tote bags', 'Towels', 'Welcome packs'],
    photo: 'Expo stand with branded totes, bottles and towels neatly styled on a table.',
    tone: '#3d2f55',
  },
];

export const steps = [
  {
    n: '01',
    title: 'Tell us what you need',
    copy: 'Choose your preferred merchandise and tell us about your project.',
  },
  {
    n: '02',
    title: 'Customise your branding',
    copy: 'Provide your logo or artwork and discuss your preferred options with our team.',
  },
  {
    n: '03',
    title: 'Get your merchandise',
    copy: 'Receive a quote and confirm your order. Production and delivery details will be confirmed with you.',
  },
];

/** Inspiration gallery. Each tile shows a different technique, placement and colourway. */
export const gallery: { art: Artwork; technique: string; note: string; size: 'tall' | 'wide' | 'square' | 'large' }[] = [
  {
    art: { kind: 'towel', body: '#ffcf5a', accent: '#e8553a', ink: '#2a1a12', brand: brands.spinifex, pattern: 'dots', backdrop: 'var(--set-cobalt)' },
    technique: 'Sublimation',
    note: 'Edge-to-edge festival towel',
    size: 'large',
  },
  {
    art: { kind: 'apparel', body: '#f4f1ea', accent: '#1e1e1e', ink: '#1e1e1e', brand: brands.saltbush, pattern: 'full', backdrop: 'var(--set-blush)' },
    technique: 'Screen print',
    note: 'Centre-chest café tee',
    size: 'tall',
  },
  {
    art: { kind: 'keyring', body: '#1c3d5a', accent: '#8fc3e0', ink: '#8fc3e0', brand: brands.bluegum, backdrop: 'var(--set-butter)' },
    technique: 'Pad print',
    note: 'Tradie keyring tag',
    size: 'square',
  },
  {
    art: { kind: 'freshener', body: '#2b3a2f', accent: '#b9c6a5', ink: '#f1ead8', brand: brands.wattle, backdrop: 'var(--set-blush)' },
    technique: 'Die-cut',
    note: 'Botanical air freshener',
    size: 'square',
  },
  {
    art: { kind: 'bag', body: '#1f1f1f', accent: '#3a3a3a', ink: '#f8ad00', brand: brands.granite, backdrop: 'var(--set-sand)' },
    technique: 'Foil print',
    note: 'Black tote, gold foil',
    size: 'wide',
  },
  {
    art: { kind: 'mug', body: '#2f4fa8', accent: '#ffffff', ink: '#ffffff', brand: brands.southernCross, backdrop: 'var(--set-lilac)' },
    technique: 'Colour glaze',
    note: 'Cobalt mug, white handle',
    size: 'square',
  },
  {
    art: { kind: 'cap', body: '#ff8a1f', accent: '#1f2a44', ink: '#1f2a44', brand: brands.ironbark, backdrop: 'var(--set-mint)' },
    technique: 'Embroidery',
    note: 'Hi-vis cap, woven patch',
    size: 'square',
  },
  {
    art: { kind: 'sanitiser', body: '#fde7df', accent: '#c2461d', ink: '#fff3e2', brand: brands.redDirt, backdrop: 'var(--set-sage)' },
    technique: 'Custom label',
    note: 'Site-pack sanitiser',
    size: 'square',
  },
];

export const faqs = [
  {
    q: 'Can I customise products with my company logo?',
    a: 'Yes. Customising products with your logo is what we do. Branding options depend on the product, so our team will talk you through what suits each item.',
  },
  {
    q: 'Can I order different quantities?',
    a: 'Quantities vary by product and decoration method. Tell us roughly how many you need in the quote form and we will confirm what is possible.',
  },
  {
    q: 'Can I provide my own artwork?',
    a: 'Yes. You can include a link to your logo or artwork (Google Drive, Dropbox or WeTransfer) with your enquiry, or send it once we’re in touch. Vector files (AI, EPS, SVG or PDF) usually give the best results, but send what you have and our team will let you know if anything else is needed.',
  },
  {
    q: 'Are there minimum order quantities?',
    a: 'Minimums differ between products and printing methods. Our team will confirm any minimum order quantities when preparing your quote.',
  },
  {
    q: 'How long does production take?',
    a: 'Timeframes depend on the products, quantities and decoration involved. If you have a deadline, include it in your enquiry and our team will confirm production and delivery timing with you.',
  },
  {
    q: 'Can I request a quote for multiple products?',
    a: 'Absolutely. Select as many products as you like in the quote form and we will come back to you with options across the full range.',
  },
];
