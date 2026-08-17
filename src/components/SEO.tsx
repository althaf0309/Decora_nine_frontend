import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  /** Optional JSON-LD structured data object(s) for rich results. */
  jsonLd?: object | object[];
}

const SITE = 'Decora Nine Interiors';

export const SEO = ({
  title,
  description,
  keywords = 'interior designers in Bangalore, interior design Bangalore, home interiors, office interiors, modular kitchen, commercial interior design',
  image = '/gallery/living.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  jsonLd,
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE}`;
    document.title = fullTitle;

    const meta: Record<string, { name?: string; property?: string; content: string }> = {
      description: { name: 'description', content: description },
      keywords: { name: 'keywords', content: keywords },
      'og:site_name': { property: 'og:site_name', content: SITE },
      'og:title': { property: 'og:title', content: fullTitle },
      'og:description': { property: 'og:description', content: description },
      'og:image': { property: 'og:image', content: image },
      'og:url': { property: 'og:url', content: url },
      'og:type': { property: 'og:type', content: type },
      'twitter:title': { name: 'twitter:title', content: fullTitle },
      'twitter:description': { name: 'twitter:description', content: description },
      'twitter:image': { name: 'twitter:image', content: image },
      'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
    };

    Object.values(meta).forEach(attrs => {
      const sel = attrs.name ? `meta[name="${attrs.name}"]` : `meta[property="${attrs.property}"]`;
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        if (attrs.name) el.setAttribute('name', attrs.name);
        if (attrs.property) el.setAttribute('property', attrs.property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', attrs.content);
    });

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url.split('#')[0]);

    // JSON-LD structured data
    const id = 'seo-jsonld';
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, image, url, type, jsonLd]);

  return null;
};

/** Shared LocalBusiness / Organization schema for the whole site. */
export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesigner',
  name: 'Decora Nine Interiors',
  description:
    'Interior design and execution firm in Bangalore for residential, commercial, office, café and restaurant spaces.',
  image: 'https://decoranine.alzsolution.com/gallery/living.jpg',
  url: 'https://decoranine.alzsolution.com',
  telephone: '+91-6366876887',
  email: 'decoranine@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '13/4, 3rd Cross, 2nd Main, New Extension, Madiwala',
    addressLocality: 'Bangalore',
    postalCode: '560068',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  areaServed: 'Bangalore and South India',
  sameAs: [
    'https://www.instagram.com/decora_nine',
    'https://www.facebook.com/share/19Tca69ZKk/',
  ],
};
