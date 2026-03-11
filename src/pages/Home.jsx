import React from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import TrustMarquee from '../components/home/TrustMarquee';
import FeaturedProducts from '../features/products/components/FeaturedProducts';
import PromotionalBanner from '../components/home/PromotionalBanner';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
    return (
        <div className="bg-brand-black min-h-screen pt-32 overflow-hidden font-body">
            <SEO
                title="Premium Textile Archive"
                description="Moderate's Textile - Sourcing and supplying the most extraordinary luxury fabrics on earth. Discover our curated collections."
            />
            {/* Hero Section */}
            <Hero />

            {/* Ticker / Marquee for E-commerce Trust */}
            <TrustMarquee />

            {/* Promotional Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
                <PromotionalBanner
                    title="The Venetian Velvet Series"
                    subtitle="Our latest archive from the historic mills of Northern Italy. Hand-dyed deep emerald weaves for extraordinary silhouettes."
                    ctaText="Explore Archive"
                    ctaLink="/products?category=Velvet"
                    image="/luxury_velvet_banner.png"
                />
            </div>

            {/* Featured Products Gallery - Light Theme Transition */}
            <FeaturedProducts />

            {/* Newsletter Subscription */}
            <Newsletter />
        </div>
    );
};

export default Home;
