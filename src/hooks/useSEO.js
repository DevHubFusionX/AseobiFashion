import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { generatePageSEO, generateBreadcrumbs } from '../utils/seoUtils';

/**
 * Custom hook for managing SEO data across different pages
 * Automatically generates appropriate SEO data based on page type and content
 */
export const useSEO = (pageType, data = {}) => {
  const location = useLocation();
  
  const seoData = useMemo(() => {
    const baseSEO = generatePageSEO(pageType, data);
    const breadcrumbs = generateBreadcrumbs(location.pathname);
    
    return {
      ...baseSEO,
      breadcrumbs,
      url: `https://moderatestextile.com${location.pathname}${location.search}`
    };
  }, [pageType, data, location]);
  
  return seoData;
};

/**
 * Hook for product-specific SEO optimization
 */
export const useProductSEO = (product) => {
  const location = useLocation();
  
  const seoData = useMemo(() => {
    if (!product) return generatePageSEO('product', {});
    
    const productSEO = generatePageSEO('product', {
      name: product.name,
      description: product.description,
      category: product.category,
      material: product.material,
      price: product.price,
      images: product.images,
      inStock: product.inStock,
      rating: product.rating,
      reviewCount: product.reviewCount
    });
    
    const breadcrumbs = [
      { name: 'Home', url: 'https://moderatestextile.com' },
      { name: 'Products', url: 'https://moderatestextile.com/products' },
      { name: product.category, url: `https://moderatestextile.com/products?category=${encodeURIComponent(product.category)}` },
      { name: product.name, url: `https://moderatestextile.com${location.pathname}` }
    ];
    
    return {
      ...productSEO,
      breadcrumbs,
      url: `https://moderatestextile.com${location.pathname}`
    };
  }, [product, location]);
  
  return seoData;
};

/**
 * Hook for collection/category-specific SEO optimization
 */
export const useCollectionSEO = (category, products = []) => {
  const location = useLocation();
  
  const seoData = useMemo(() => {
    const collectionSEO = generatePageSEO('collection', { category });
    
    const breadcrumbs = [
      { name: 'Home', url: 'https://moderatestextile.com' },
      { name: 'Products', url: 'https://moderatestextile.com/products' },
      { name: category, url: `https://moderatestextile.com${location.pathname}${location.search}` }
    ];
    
    // Enhanced description with product count
    const enhancedDescription = products.length > 0 
      ? `${collectionSEO.description} Browse ${products.length} premium ${category} items.`
      : collectionSEO.description;
    
    return {
      ...collectionSEO,
      description: enhancedDescription,
      breadcrumbs,
      url: `https://moderatestextile.com${location.pathname}${location.search}`
    };
  }, [category, products, location]);
  
  return seoData;
};

/**
 * Generate FAQ structured data for SEO
 */
export const useFAQSEO = (faqs) => {
  const seoData = useMemo(() => {
    const faqStructuredData = {
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
    
    return {
      title: "Frequently Asked Questions | Moderate's Textile",
      description: "Find answers to common questions about Aseobi materials, Nigerian clothing, shipping, returns, and more at Moderate's Textile.",
      keywords: "aseobi faq, nigerian clothing questions, fabric care, shipping info, returns policy",
      structuredData: faqStructuredData
    };
  }, [faqs]);
  
  return seoData;
};

/**
 * Generate local business structured data for contact/about pages
 */
export const useLocalBusinessSEO = (businessInfo = {}) => {
  const seoData = useMemo(() => {
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Moderate's Textile",
      "description": "Premium Aseobi materials and Nigerian traditional clothing specialists",
      "url": "https://moderatestextile.com",
      "telephone": businessInfo.phone || "+234-XXX-XXX-XXXX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessInfo.address || "",
        "addressLocality": businessInfo.city || "Lagos",
        "addressRegion": businessInfo.state || "Lagos State",
        "addressCountry": "NG"
      },
      "geo": businessInfo.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": businessInfo.coordinates.lat,
        "longitude": businessInfo.coordinates.lng
      } : undefined,
      "openingHours": businessInfo.hours || [
        "Mo-Fr 09:00-18:00",
        "Sa 09:00-16:00"
      ],
      "priceRange": "$$",
      "servesCuisine": "Nigerian Fashion",
      "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
      }
    };
    
    return {
      structuredData: localBusinessData
    };
  }, [businessInfo]);
  
  return seoData;
};