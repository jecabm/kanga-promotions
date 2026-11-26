import { faqs, site } from '../data/content';

/**
 * Schema.org JSON-LD for search engines. Only facts already published on the site belong here.
 * Do not add an address, phone, email, opening hours or reviews until they are confirmed and
 * shown on the page. Once they are, Organization can gain `contactPoint` / `address`.
 */
const orgId = `${site.url}#organization`;

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: site.name,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}Kanga-Promotions-logo.png`,
        width: 935,
        height: 450,
      },
      slogan: site.tagline,
      description:
        'Custom printed promotional products and branded merchandise for Australian businesses, including stubby coolers, air fresheners, towels, mugs and drink bottles.',
      areaServed: { '@type': 'Country', name: 'Australia' },
      parentOrganization: { '@type': 'Organization', name: site.parentName, url: site.parentUrl },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'en-AU',
      publisher: { '@id': orgId },
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

// Escape "<" so answer text can never close the script tag early.
const json = JSON.stringify(graph).replace(/</g, '\\u003c');

export function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
