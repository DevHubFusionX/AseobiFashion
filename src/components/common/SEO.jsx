import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Enhanced SEO Component for Aseobi clothing and materials business.
 * Provides comprehensive SEO optimization for Nigerian traditional fashion e-commerce.
 */
const SEO = ({
    title,
    description,
    image,
    url,
    type = 'website',
    keywords,
    author,
    structuredData,
    noIndex = false,
    noFollow = false,
    product,
    breadcrumbs
}) => {
    const siteName = "Aseobi";
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Aseobi Materials & Nigerian Traditional Clothing`;
    const defaultDescription = "Discover Aseobi - Premium Aseobi materials, traditional Nigerian clothing, and authentic African fabrics. Your one-stop shop for quality Aseobi, Ankara, Lace, and traditional wear.";
    const defaultImage = "/og-image.jpg";
    const defaultUrl = typeof window !== 'undefined' ? window.location.origin : 'https://moderatestextile.com';
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : defaultUrl);
    
    const defaultKeywords = "aseobi materials, nigerian clothing, traditional african fabrics, ankara, lace materials, george wrapper, aseobi styles, african fashion, nigerian fashion, traditional wear";
    
    // Generate structured data for different page types
    const generateStructuredData = () => {
        if (structuredData) return structuredData;
        
        const baseData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteName,
            "url": defaultUrl,
            "logo": `${defaultUrl}/Logo.svg`,
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
                "addressCountry": "NG"
            },
            "areaServed": {
                "@type": "Country",
                "name": "Nigeria"
            }
        };
        
        if (product) {
            return {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": product.images?.[0] || defaultImage,
                "brand": {
                    "@type": "Brand",
                    "name": siteName
                },
                "offers": {
                    "@type": "Offer",
                    "price": product.price,
                    "priceCurrency": "NGN",
                    "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                    "seller": {
                        "@type": "Organization",
                        "name": siteName
                    }
                },
                "category": product.category,
                "material": product.material,
                "additionalProperty": [
                    {
                        "@type": "PropertyValue",
                        "name": "Style",
                        "value": "Traditional Nigerian"
                    },
                    {
                        "@type": "PropertyValue",
                        "name": "Origin",
                        "value": "African"
                    }
                ]
            };
        }
        
        if (breadcrumbs) {
            return {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": crumb.name,
                    "item": crumb.url
                }))
            };
        }
        
        return baseData;
    };
    
    const robotsContent = `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta name="author" content={author || siteName} />
            <meta name="robots" content={robotsContent} />
            <link rel="canonical" href={currentUrl} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="en_NG" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />
            <meta name="twitter:site" content="@aseobi" />
            <meta name="twitter:creator" content="@aseobi" />
            
            {/* Additional SEO Meta Tags */}
            <meta name="theme-color" content="#c5a059" />
            <meta name="msapplication-TileColor" content="#c5a059" />
            <meta name="application-name" content={siteName} />
            <meta name="apple-mobile-web-app-title" content={siteName} />
            <meta name="format-detection" content="telephone=no" />
            
            {/* Geographic and Language Tags */}
            <meta name="geo.region" content="NG" />
            <meta name="geo.country" content="Nigeria" />
            <meta name="language" content="English" />
            <meta name="content-language" content="en-NG" />
            
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(generateStructuredData())}
            </script>
            
            {/* Preconnect to external domains for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://api.moderatestextile.com" />
        </Helmet>
    );
};

export default SEO;
