import { useEffect } from 'react';
import { BUSINESS } from '../utils/business';

const SITE_URL = 'https://r-mcleaningservice.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/hero-man-cleaning-window.jpg`;

/**
 * Enterprise SEO & Structured Data (JSON-LD) Component
 * Injects:
 * 1. Title & Meta descriptions
 * 2. Geo tags (Region, Placename, ICBM Coordinates)
 * 3. OpenGraph & Twitter Cards
 * 4. Canonical URL
 * 5. Schema.org LocalBusiness / CleaningService
 * 6. Schema.org FAQPage (Rich SERP snippets)
 * 7. Schema.org BreadcrumbList
 */
const SEO = ({
  title,
  description,
  canonical,
  image,
  type = 'website',
  faqs = [],
  breadcrumbs = [],
  city,
  localities = [],
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title
      ? `${title} | R M Home Cleaning`
      : 'R M Home Cleaning | 4.9★ House & Deep Cleaning Service in Chandigarh Tricity';
    document.title = fullTitle;

    // Helper to set or create meta tags
    const setMeta = (name, content, attr = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const cleanDesc =
      description ||
      'R M Home Cleaning — 4.9★ rated House & Deep Cleaning Service in Sector 50, Chandigarh. Open 24 Hours. Deep cleaning, kitchen, bathroom, sofa & carpet cleaning across Chandigarh, Mohali, Zirakpur, Panchkula & Tricity. Call 096460 78122.';

    const pageUrl = canonical ? `${SITE_URL}${canonical}` : window.location.href;
    const shareImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE;

    // Standard Meta
    setMeta('description', cleanDesc);
    setMeta(
      'keywords',
      'cleaning service in mohali, cleaning service in zirakpur, cleaning service in chandigarh, cleaning service in panchkula, cleaning service in tricity, house cleaning service, deep cleaning near me, sofa dry cleaning chandigarh, kitchen cleaning mohali, bathroom cleaning zirakpur, home cleaning panchkula'
    );
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'R M Home Cleaning');

    // Geo Meta Tags for Google Local Ranking
    const geoPlace = city ? `${city}, Tricity, India` : 'Chandigarh, Mohali, Panchkula, Zirakpur, India';
    setMeta('geo.region', 'IN-CH');
    setMeta('geo.placename', geoPlace);
    setMeta('geo.position', '30.7046;76.7179');
    setMeta('ICBM', '30.7046, 76.7179');

    // OpenGraph
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', cleanDesc, 'property');
    setMeta('og:url', pageUrl, 'property');
    setMeta('og:image', shareImage, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', 'R M Home Cleaning', 'property');
    setMeta('og:locale', 'en_IN', 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', cleanDesc);
    setMeta('twitter:image', shareImage);

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', pageUrl);

    // Schema.org Structured Data
    const allAreasServed =
      localities.length > 0
        ? localities
        : [
            'Sector 50 Chandigarh',
            'Chandigarh (Sectors 1-60)',
            'Mohali (Phases 1-11, Aerocity, IT City)',
            'Zirakpur (VIP Road, Dhakoli, Baltana)',
            'Panchkula (Sectors 1-28, MDC)',
            'Kharar',
            'SAS Nagar',
          ];

    // LocalBusiness / CleaningService Schema
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': ['CleaningService', 'LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': `${SITE_URL}/#business`,
      name: city ? `R M Home Cleaning - ${city}` : 'R M Home Cleaning',
      alternateName: 'RM House & Deep Cleaning Services Chandigarh',
      url: pageUrl,
      logo: `${SITE_URL}/rm-logo.jpg`,
      image: shareImage,
      telephone: `+91${BUSINESS.phone}`,
      priceRange: 'Contact for Free Custom Quote',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Net Banking, Credit Card',
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address,
        addressLocality: city === 'Mohali' || city === 'SAS Nagar' ? 'Mohali' : city === 'Panchkula' ? 'Panchkula' : 'Chandigarh',
        addressRegion: city === 'Panchkula' ? 'Haryana' : city === 'Mohali' ? 'Punjab' : 'Chandigarh',
        postalCode: '160047',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 30.7046,
        longitude: 76.7179,
      },
      hasMap: BUSINESS.googleMapsUrl,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '18',
        bestRating: '5',
        worstRating: '1',
      },
      areaServed: allAreasServed.map((area) => ({
        '@type': 'AdministrativeArea',
        name: area,
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'House & Deep Cleaning Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full Home Deep Cleaning',
              description: 'Top-to-bottom deep cleaning for 1, 2, 3, 4 BHK flats, kothis and independent floors.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Modular Kitchen Deep Cleaning',
              description: 'Exhaust degreasing, chimney oil stain removal, tiles, slab, and cabinets scrubbing.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bathroom Descaling & Deep Cleaning',
              description: 'Hard water scale descaling, chrome fixture buffing, and antibacterial scrubbing.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sofa & Carpet Shampooing',
              description: 'Deep injection-extraction fabric and leather shampooing with stain removal.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Floor Machine Scrubbing',
              description: 'Single-disc heavy scrubbing for marble, mosaic, and vitrified tiles.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Water Tank Cleaning',
              description: 'Hygienic sludge extraction and antibacterial wash for underground and overhead tanks.',
            },
          },
        ],
      },
    };

    // Inject LocalBusiness Schema
    let businessScript = document.getElementById('schema-local-business');
    if (!businessScript) {
      businessScript = document.createElement('script');
      businessScript.id = 'schema-local-business';
      businessScript.type = 'application/ld+json';
      document.head.appendChild(businessScript);
    }
    businessScript.text = JSON.stringify(localBusinessSchema);

    // FAQPage Schema (Triggers Rich SERP Accordions)
    let faqScript = document.getElementById('schema-faq');
    if (faqs && faqs.length > 0) {
      if (!faqScript) {
        faqScript = document.createElement('script');
        faqScript.id = 'schema-faq';
        faqScript.type = 'application/ld+json';
        document.head.appendChild(faqScript);
      }
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      };
      faqScript.text = JSON.stringify(faqSchema);
    } else if (faqScript) {
      faqScript.remove();
    }

    // BreadcrumbList Schema
    let breadcrumbScript = document.getElementById('schema-breadcrumbs');
    if (breadcrumbs && breadcrumbs.length > 0) {
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'schema-breadcrumbs';
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((bc, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: bc.name,
          item: bc.item.startsWith('http') ? bc.item : `${SITE_URL}${bc.item}`,
        })),
      };
      breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }

    return () => {
      // Clean up dynamic script tags on unmount to avoid stale schema on page switches
      const bEl = document.getElementById('schema-local-business');
      if (bEl) bEl.remove();
      const fEl = document.getElementById('schema-faq');
      if (fEl) fEl.remove();
      const bcEl = document.getElementById('schema-breadcrumbs');
      if (bcEl) bcEl.remove();
    };
  }, [title, description, canonical, image, type, faqs, breadcrumbs, city, localities]);

  return null;
};

export default SEO;
