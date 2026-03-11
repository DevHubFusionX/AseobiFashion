import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import ProductCard from './ProductCard';

import { useProducts } from '../../../hooks/useProducts';

const FeaturedProducts = () => {
    const { data: productsData, isLoading } = useProducts({ limit: 6 });
    const products = productsData?.slice(0, 6) || [];

    if (isLoading) {
        return (
            <section className="bg-white text-brand-black pt-32 pb-40">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </section>
        );
    }

    if (!products.length) return null;

    return (
        <section className="bg-white text-brand-black pt-32 pb-40 relative z-10 -mt-[1px]">
            {/* Decorative soft top border connection */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-black to-transparent opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-16 lg:mb-20 gap-6 sm:gap-8">
                    <div className="max-w-2xl">
                        <span className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-3 sm:mb-4 block">The Gallery</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-4 sm:mb-6">Explore the <br /><span className="italic font-light">Signature Series.</span></h2>
                        <p className="text-black/60 font-normal leading-relaxed text-sm sm:text-base lg:text-lg">Every fabric tells a story of craftsmanship. Dive into our highest-rated materials, hand-picked for their uncompromising texture and durability.</p>
                    </div>
                    <Link to={ROUTES.PRODUCTS} className="text-brand-black font-semibold text-xs sm:text-sm tracking-widest border-b-2 border-brand-black/20 pb-2 hover:border-brand-gold hover:text-brand-gold transition-all shrink-0">
                        VIEW ALL INVENTORY
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-x-12 lg:gap-y-16">
                    {products.map((product, index) => (
                        <ProductCard key={product._id} product={product} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedProducts;
