import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Materials = () => {
    const [visibleCount, setVisibleCount] = useState(8);
    const loadMoreRef = useRef(null);

    const allMaterials = [
        {
            id: 'silk',
            name: 'Mulberry Silk',
            origin: 'Jiangsu, China',
            description: 'The undisputed queen of textiles. Our Mulberry silk is cultivated under strict environmental controls, resulting in exceptionally long, smooth fibers.',
            features: ['Hypoallergenic', 'Temperature Regulating', 'Natural Luster', 'Tensile Strength'],
            image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2000&auto=format&fit=crop',
        },
        {
            id: 'linen',
            name: 'Belgian Linen',
            origin: 'Flanders, Belgium',
            description: 'Woven from flax grown in the unique damp soil and maritime climate of the Flanders region. Belgian linen is celebrated for its incredible breathability.',
            features: ['Highly Breathable', 'Moisture Wicking', 'Zero Waste Crop', 'Improves with Age'],
            image: 'https://images.unsplash.com/photo-1596756616428-2b8d00ee9bdf?q=80&w=2000&auto=format&fit=crop',
        },
        {
            id: 'cashmere',
            name: 'Mongolian Cashmere',
            origin: 'Gobi Desert, Mongolia',
            description: 'Harvested only during the spring molting season from the undercoat of Capra hircus goats. Ultra-fine fibers create unparalleled softness.',
            features: ['Ultra Lightweight', 'Exceptional Insulation', 'Pill Resistant', 'Ethically Combed'],
            image: 'https://images.unsplash.com/photo-1610419131604-db5b5ca49a1d?q=80&w=2000&auto=format&fit=crop',
        },
        {
            id: 'velvet',
            name: 'Italian Velvet',
            origin: 'Como, Italy',
            description: 'Woven on traditional looms in the textile capital of Como. This plush velvet features a dense pile that creates rich depth of color.',
            features: ['Dense Pile', 'Rich Color Depth', 'Drape Quality', 'Traditional Weaving'],
            image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=2000&auto=format&fit=crop',
        },
        {
            id: 'wool',
            name: 'Merino Wool',
            origin: 'New Zealand',
            description: 'Sourced from ethically raised Merino sheep in the pristine highlands of New Zealand. These ultra-fine fibers create a soft, breathable fabric.',
            features: ['Moisture Management', 'Odor Resistant', 'Soft Hand', 'Sustainable'],
            image: 'https://images.unsplash.com/photo-1606170033648-5d55a3edf31e?q=80&w=2000&auto=format&fit=crop',
        },
        {
            id: 'cotton',
            name: 'Egyptian Cotton',
            origin: 'Nile Delta, Egypt',
            description: 'Grown in the fertile Nile Delta, Egyptian cotton features extra-long staple fibers that create exceptionally smooth, durable fabrics.',
            features: ['Extra Long Staple', 'Breathable', 'Durable', 'Softens Over Time'],
            image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c85?q=80&w=2000&auto=format&fit=crop',
        },
        {
            id: 'organza',
            name: 'Silk Organza',
            origin: 'Lyon, France',
            description: 'A crisp, sheer fabric woven from fine silk threads. This lightweight material holds its shape beautifully.',
            features: ['Crisp Structure', 'Sheer Quality', 'Shape Retention', 'Lightweight'],
            image: 'https://images.unsplash.com/photo-1551046777-ab6c1ebf9495?q=80&w=2000&auto=format&fit=crop',
        },
        {
            id: 'tweed',
            name: 'Harris Tweed',
            origin: 'Outer Hebrides, Scotland',
            description: 'Hand-woven by islanders in their homes using local wool. Each piece is unique, featuring traditional patterns.',
            features: ['Hand-Woven', 'Weather Resistant', 'Unique Patterns', 'Heritage Craft'],
            image: 'https://images.unsplash.com/photo-1558487661-9d4f0192cf64?q=80&w=2000&auto=format&fit=crop',
        },
        {
            id: 'chiffon',
            name: 'Silk Chiffon',
            origin: 'Paris, France',
            description: 'An ethereal, lightweight fabric with a slightly rough texture. Its delicate drape and subtle sheen make it perfect for flowing garments.',
            features: ['Lightweight', 'Flowing Drape', 'Subtle Sheen', 'Delicate'],
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
        }
    ];

    const materialsData = allMaterials.slice(0, visibleCount);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < allMaterials.length) {
                setVisibleCount(prev => Math.min(prev + 4, allMaterials.length));
            }
        }, { threshold: 0.5 });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [visibleCount]);

    return (
        <div className="bg-white min-h-screen font-body">

            {/* Hero */}
            <div className="bg-brand-black text-white py-24 sm:py-32 md:py-40 px-6 relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1558487661-9d4f0192cf64?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">Our Directory</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
                        The Master <span className="text-brand-gold italic font-display">Materials</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
                        An uncompromising dedication to provenance. We travel the globe to source fibers from the regions where they have been perfected over centuries.
                    </p>
                </div>
            </div>

            {/* Materials Grid */}
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {materialsData.map((material, idx) => (
                        <Link
                            key={material.id}
                            to={`/materials/${material.id}`}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                                <img
                                    src={material.image}
                                    alt={material.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-500"></div>
                            </div>
                            <div>
                                <span className="text-[10px] text-brand-gold font-semibold tracking-wider uppercase block mb-2">
                                    {material.origin}
                                </span>
                                <h3 className="text-base sm:text-lg font-semibold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                                    {material.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-black/50 line-clamp-2 leading-relaxed">
                                    {material.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Infinite Scroll Trigger */}
                {visibleCount < allMaterials.length && (
                    <div ref={loadMoreRef} className="py-16 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
                        <p className="text-sm text-black/40 mt-4">Loading more materials...</p>
                    </div>
                )}
            </div>

            {/* Footer Callout */}
            <div className="py-20 px-6 text-center border-t border-black/5 bg-[#FAFAFA]">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Need expert sourcing?</h2>
                <p className="text-black/60 mb-8 max-w-md mx-auto text-sm sm:text-base">
                    If you require a specific blend or custom milling, our sourcing agents are available for consultation.
                </p>
                <Link
                    to={ROUTES.WHOLESALE}
                    className="inline-block bg-brand-gold text-brand-black px-8 py-4 text-sm font-semibold tracking-widest hover:bg-brand-black hover:text-brand-gold transition-colors"
                >
                    CONTACT WHOLESALE
                </Link>
            </div>
        </div>
    );
};

export default Materials;
