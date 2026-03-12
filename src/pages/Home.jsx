import React, { useEffect } from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import TrustMarquee from '../components/home/TrustMarquee';
import FeaturedProducts from '../features/products/components/FeaturedProducts';
import PromotionalBanner from '../components/home/PromotionalBanner';
import Newsletter from '../components/home/Newsletter';
import { generatePageSEO } from '../utils/seoUtils';
import { trackAseobiEvents } from '../utils/seoTracking';

const Home = () => {
    const seoData = generatePageSEO('home');
    
    useEffect(() => {
        // Track homepage visit for SEO analytics
        trackAseobiEvents.browseCategory('homepage');
        
        // Add structured data for Aseobi business
        const aseobiStructuredData = {
            "@context": "https://schema.org",
            "@type": ["ClothingStore", "OnlineStore"],
            "name": "Aseobi",
            "description": "Premium Aseobi fashion and traditional Nigerian clothing store",
            "url": "https://moderatestextile.com",
            "telephone": "+234-XXX-XXX-XXXX",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG",
                "addressRegion": "Lagos State"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Aseobi Fashion Catalog",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Product",
                            "name": "Aseobi Materials",
                            "category": "Traditional Nigerian Clothing"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Product",
                            "name": "Ankara Fabrics",
                            "category": "African Fashion"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Product",
                            "name": "Lace Materials",
                            "category": "Nigerian Fashion"
                        }
                    }
                ]
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://moderatestextile.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };
        
        // Add the structured data to the page
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(aseobiStructuredData);
        document.head.appendChild(script);
        
        return () => {
            // Cleanup
            document.head.removeChild(script);
        };
    }, []);
    
    return (
        <div className="bg-brand-black min-h-screen pt-32 overflow-hidden font-body">
            <SEO
                title="Premium Aseobi Fashion & Nigerian Clothing | Aseobi"
                description="Discover the finest Aseobi fashion styles and materials in Nigeria. Shop premium Aseobi designs, traditional Nigerian clothing, and authentic African fabrics. Fast delivery nationwide."
                keywords="aseobi fashion, aseobi materials, nigerian clothing, aseobi styles, traditional wear, african fashion, aseobi designs, nigerian fabric, ankara, lace materials"
                structuredData={seoData.structuredData}
            />
            
            {/* SEO-optimized content sections */}
            <div className="sr-only">
                <h1>Premium Aseobi Fashion & Traditional Nigerian Clothing</h1>
                <p>Welcome to Aseobi, Nigeria's premier destination for authentic aseobi fashion and traditional clothing. Shop premium aseobi materials, ankara fabrics, lace designs, and traditional Nigerian wear.</p>
            </div>
            
            {/* Hero Section */}
            <Hero />

            {/* Ticker / Marquee for E-commerce Trust */}
            <TrustMarquee />

            {/* Promotional Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
                <PromotionalBanner
                    title="Premium Aseobi Collection 2024"
                    subtitle="Discover our latest collection of authentic Nigerian fabrics. Hand-selected premium Aseobi materials perfect for weddings, parties, and traditional ceremonies. Shop the finest Aseobi fashion styles."
                    ctaText="Shop Aseobi Fashion"
                    ctaLink="/products?category=Aseobi"
                    image="/luxury_velvet_banner.png"
                />
            </div>

            {/* Featured Products Gallery - Light Theme Transition */}
            <FeaturedProducts />

            {/* Newsletter Subscription */}
            <Newsletter />
            
            {/* SEO Content Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose Our Aseobi Fashion Collection?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            At Aseobi, we specialize in premium <strong>aseobi fashion</strong> and traditional Nigerian clothing. 
                            Our carefully curated collection features authentic <strong>aseobi materials</strong> perfect for every special occasion.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-3">Authentic Aseobi Styles</h3>
                            <p className="text-gray-600">
                                Traditional and modern <strong>aseobi designs</strong> that celebrate Nigerian culture and fashion heritage.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-3">Premium Quality Materials</h3>
                            <p className="text-gray-600">
                                Hand-selected <strong>Nigerian fabrics</strong> including Ankara, Lace, George, and Adire materials.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-3">Fast Nigeria Delivery</h3>
                            <p className="text-gray-600">
                                Quick and reliable delivery of your <strong>aseobi fashion</strong> orders across all Nigerian states.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
