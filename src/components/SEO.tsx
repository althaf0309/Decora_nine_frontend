import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({ 
  title, 
  description, 
  keywords = 'interior design, interiors, decorating, furniture',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website'
}: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = `${title} | Decora Nine Interiors`;

    // Update meta tags
    const metaTags = {
      description: { name: 'description', content: description },
      keywords: { name: 'keywords', content: keywords },
      'og:title': { property: 'og:title', content: title },
      'og:description': { property: 'og:description', content: description },
      'og:image': { property: 'og:image', content: image },
      'og:url': { property: 'og:url', content: url },
      'og:type': { property: 'og:type', content: type },
      'twitter:title': { name: 'twitter:title', content: title },
      'twitter:description': { name: 'twitter:description', content: description },
      'twitter:image': { name: 'twitter:image', content: image },
      'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
    };

    Object.entries(metaTags).forEach(([key, attrs]) => {
      let element = document.querySelector(`meta[${attrs.name ? 'name' : 'property'}="${attrs.name || attrs.property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (attrs.name) element.setAttribute('name', attrs.name);
        if (attrs.property) element.setAttribute('property', attrs.property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', attrs.content);
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, keywords, image, url, type]);

  return null;
};
