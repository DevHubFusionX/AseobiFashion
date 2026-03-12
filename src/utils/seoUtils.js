// SEO utility functions for the Aseobi clothing and materials business

export const seoConfig = {
  siteName: "Aseobi",
  siteUrl: "https://moderatestextile.com",
  defaultTitle: "Premium Aseobi Materials & Nigerian Traditional Clothing | Aseobi",
  defaultDescription: "Discover Aseobi - Premium Aseobi materials, traditional Nigerian clothing, and authentic African fabrics. Your one-stop shop for quality Aseobi and traditional wear.",
  defaultImage: "/og-image.jpg",
  twitterHandle: "@aseobi",
  keywords: {
    primary: ["aseobi materials", "nigerian clothing", "traditional african fabrics", "aseobi styles", "african fashion"],
    secondary: ["ankara fabrics", "lace materials", "george wrapper", "traditional wear", "nigerian fashion", "african textiles"],
    brand: ["Aseobi", "Aseobi fashion", "nigerian fabric supplier", "aseobi specialist"]
  }
};

// Generate page-specific SEO data
export const generatePageSEO = (pageType, data = {}) => {
  const baseConfig = {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    keywords: [...seoConfig.keywords.primary, ...seoConfig.keywords.secondary].join(", "),
    image: seoConfig.defaultImage,
    type: "website"
  };

  switch (pageType) {
    case 'home':
      return {
        ...baseConfig,
        title: "Premium Aseobi Materials & Nigerian Clothing | Aseobi",
        description: "Shop the finest Aseobi materials and traditional Nigerian clothing. Premium African fabrics, ankara, lace, and george wrappers. Quality guaranteed with fast delivery across Nigeria.",
        keywords: "aseobi materials, nigerian clothing, african fabrics, ankara, lace materials, george wrapper, traditional wear, nigerian fashion, aseobi styles",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": seoConfig.siteName,
          "url": seoConfig.siteUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${seoConfig.siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }
      };

    case 'product':
      return {
        ...baseConfig,
        title: `${data.name} | Premium ${data.category} | Aseobi Materials`,
        description: `${data.description} Premium ${data.category} Aseobi material from Aseobi. Authentic Nigerian fabric with exceptional quality and vibrant colors.`,
        keywords: `${data.name}, ${data.category}, aseobi material, nigerian fabric, african clothing, ${data.material}, ${seoConfig.keywords.primary.join(", ")}`,
        type: "product",
        image: data.images?.[0] || seoConfig.defaultImage,
        product: data,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "image": data.images || [seoConfig.defaultImage],
          "brand": {
            "@type": "Brand",
            "name": seoConfig.siteName
          },
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "NGN",
            "availability": data.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": seoConfig.siteName
            }
          },
          "category": data.category,
          "material": data.material,
          "aggregateRating": data.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating,
            "reviewCount": data.reviewCount || 1
          } : undefined
        }
      };

    case 'collection':
      return {
        ...baseConfig,
        title: `${data.category} Collection | Premium ${data.category} Aseobi | Aseobi`,
        description: `Explore our exclusive ${data.category} collection featuring premium Aseobi materials and traditional Nigerian clothing. Discover authentic ${data.category} fabrics for special occasions.`,
        keywords: `${data.category}, ${data.category} aseobi, nigerian ${data.category}, traditional ${data.category}, african fabrics, ${seoConfig.keywords.primary.join(", ")}`,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${data.category} Aseobi Collection`,
          "description": `Premium ${data.category} Aseobi materials and Nigerian clothing`,
          "url": `${seoConfig.siteUrl}/products?category=${encodeURIComponent(data.category)}`
        }
      };

    case 'about':
      return {
        ...baseConfig,
        title: `About Us | Aseobi - Premium Aseobi Specialists`,
        description: "Learn about Aseobi's heritage in Nigerian fashion, our commitment to authentic Aseobi materials, and our dedication to quality African fabrics and traditional clothing.",
        keywords: "about Aseobi, aseobi specialists, nigerian fashion heritage, african fabric experts, traditional clothing specialists",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Aseobi",
          "description": "Premium Aseobi specialists with expertise in Nigerian traditional clothing"
        }
      };

    case 'wholesale':
      return {
        ...baseConfig,
        title: `Wholesale Aseobi Materials | Bulk Nigerian Fabrics | Aseobi`,
        description: "Professional wholesale Aseobi materials for retailers, designers, and fashion houses. Bulk Nigerian fabrics, ankara, lace, and traditional materials at competitive prices.",
        keywords: "wholesale aseobi, bulk nigerian fabrics, wholesale ankara, bulk lace materials, aseobi suppliers, wholesale african fabrics",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Wholesale Aseobi Materials",
          "description": "Professional wholesale Nigerian fabrics and Aseobi materials",
          "provider": {
            "@type": "Organization",
            "name": seoConfig.siteName
          }
        }
      };

    case 'contact':
      return {
        ...baseConfig,
        title: `Contact Us | Aseobi - Aseobi Specialists`,
        description: "Contact Aseobi for inquiries about Aseobi materials, Nigerian clothing, wholesale options, or custom fabric solutions. Expert consultation available.",
        keywords: "contact Aseobi, aseobi inquiries, nigerian fabric consultation, wholesale contact, aseobi specialist support"
      };

    default:
      return baseConfig;
  }
};

// Generate breadcrumb structured data
export const generateBreadcrumbs = (path) => {
  const pathSegments = path.split('/').filter(segment => segment);
  const breadcrumbs = [
    { name: 'Home', url: seoConfig.siteUrl }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({
      name,
      url: `${seoConfig.siteUrl}${currentPath}`
    });
  });

  return breadcrumbs;
};

// Generate FAQ structured data for Aseobi business
export const generateFAQStructuredData = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate organization structured data for Aseobi business
export const generateOrganizationData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoConfig.siteName,
    "url": seoConfig.siteUrl,
    "logo": `${seoConfig.siteUrl}/Logo.svg`,
    "description": "Premium Aseobi materials and Nigerian traditional clothing specialists",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-XXX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Yoruba", "Igbo", "Hausa"]
    },
    "sameAs": [
      "https://instagram.com/aseobi",
      "https://facebook.com/aseobi",
      "https://whatsapp.com/channel/aseobi"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NG",
      "addressRegion": "Lagos"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    }
  };
};

// SEO performance optimization helpers
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  // Preload critical fonts
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.as = 'font';
  fontPreload.type = 'font/woff2';
  fontPreload.crossOrigin = 'anonymous';
  fontPreload.href = '/fonts/primary-font.woff2';
  document.head.appendChild(fontPreload);

  // Preload hero image
  const heroImagePreload = document.createElement('link');
  heroImagePreload.rel = 'preload';
  heroImagePreload.as = 'image';
  heroImagePreload.href = '/Hero-background.jpeg';
  document.head.appendChild(heroImagePreload);
};

// Generate meta tags for social sharing
export const generateSocialMeta = (data) => {
  return {
    'og:title': data.title,
    'og:description': data.description,
    'og:image': data.image,
    'og:url': data.url,
    'og:type': data.type || 'website',
    'og:site_name': seoConfig.siteName,
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': data.image,
    'twitter:site': seoConfig.twitterHandle
  };
};

// URL optimization helpers
export const generateCleanURL = (title, id) => {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return `${cleanTitle}-${id}`;
};

export const generateCanonicalURL = (path) => {
  return `${seoConfig.siteUrl}${path}`;
};

// Aseobi-specific SEO keywords
export const aseobiKeywords = {
  materials: ["aseobi materials", "nigerian fabrics", "ankara", "lace", "george wrapper", "adire", "aso oke"],
  clothing: ["nigerian clothing", "traditional wear", "african dresses", "aseobi styles", "nigerian fashion"],
  occasions: ["wedding aseobi", "party wear", "traditional ceremonies", "cultural events", "special occasions"],
  colors: ["vibrant colors", "traditional patterns", "african prints", "colorful fabrics"],
  quality: ["premium quality", "authentic materials", "durable fabrics", "high-quality aseobi"]
};