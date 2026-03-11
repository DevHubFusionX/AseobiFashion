import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing meta tags across the application.
 * Provides a premium, non-generic approach to SEO.
 */
const SEO = ({
    title,
    description,
    image,
    url,
    type = 'website'
}) => {
    const siteName = "Moderate's Textile";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = "Favour by Moderate's Textile - Luxury fabrics and premium wholesale textiles. Explore our exclusive collections.";
    const defaultImage = "/og-image.jpg"; // Placeholder for branded OG image
    const defaultUrl = window.location.origin;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <link rel="canonical" href={url || defaultUrl + window.location.pathname} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content={url || defaultUrl + window.location.pathname} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* Theme Color for mobile browsers */}
            <meta name="theme-color" content="#c5a059" />
        </Helmet>
    );
};

export default SEO;
