import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const MaterialDetail = () => {
    const { id } = useParams();

    const materials = {
        silk: {
            name: 'Mulberry Silk',
            origin: 'Jiangsu, China',
            fullDescription: 'The undisputed queen of textiles. Our Mulberry silk is cultivated under strict environmental controls in the Jiangsu province of China, resulting in exceptionally long, smooth fibers. When woven, it produces a fabric with a liquid-like drape, thermal regulating properties, and a luminous sheen that absorbs dyes with incredible depth. Each bolt is inspected for consistency and quality before being added to our collection.',
            features: ['Hypoallergenic', 'Temperature Regulating', 'Natural Luster', 'Tensile Strength'],
            image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '12-16 momme', width: '45 inches', care: 'Dry clean only' }
        },
        linen: {
            name: 'Belgian Linen',
            origin: 'Flanders, Belgium',
            fullDescription: 'Woven from flax grown in the unique damp soil and maritime climate of the Flanders region. Belgian linen is celebrated for its incredible breathability, strength that increases when wet, and the beautiful, relaxed patina it develops over years of wear and washing. This natural fiber is biodegradable and requires minimal water and pesticides to grow.',
            features: ['Highly Breathable', 'Moisture Wicking', 'Zero Waste Crop', 'Improves with Age'],
            image: 'https://images.unsplash.com/photo-1596756616428-2b8d00ee9bdf?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '150-200 GSM', width: '58 inches', care: 'Machine washable' }
        },
        cashmere: {
            name: 'Mongolian Cashmere',
            origin: 'Gobi Desert, Mongolia',
            fullDescription: 'Harvested only during the spring molting season from the undercoat of Capra hircus goats in the Gobi Desert. We source fibers exceeding 36mm in length and less than 15 microns in diameter, creating yarns that offer unparalleled softness and insulation without the bulk of traditional wools. Each goat produces only 150-200 grams of usable fiber annually.',
            features: ['Ultra Lightweight', 'Exceptional Insulation', 'Pill Resistant', 'Ethically Combed'],
            image: 'https://images.unsplash.com/photo-1610419131604-db5b5ca49a1d?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '12-14 microns', width: '52 inches', care: 'Hand wash cold' }
        },
        velvet: {
            name: 'Italian Velvet',
            origin: 'Como, Italy',
            fullDescription: 'Woven on traditional looms in the textile capital of Como. This plush velvet features a dense pile that creates rich depth of color and a luxurious hand feel. Perfect for evening wear and statement pieces, our Italian velvet maintains its structure while offering exceptional drape.',
            features: ['Dense Pile', 'Rich Color Depth', 'Drape Quality', 'Traditional Weaving'],
            image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '300-350 GSM', width: '54 inches', care: 'Dry clean only' }
        },
        wool: {
            name: 'Merino Wool',
            origin: 'New Zealand',
            fullDescription: 'Sourced from ethically raised Merino sheep in the pristine highlands of New Zealand. These ultra-fine fibers create a soft, breathable fabric that naturally regulates temperature and resists odors. Unlike traditional wool, Merino is soft enough to wear next to skin.',
            features: ['Moisture Management', 'Odor Resistant', 'Soft Hand', 'Sustainable'],
            image: 'https://images.unsplash.com/photo-1606170033648-5d55a3edf31e?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '180-220 GSM', width: '60 inches', care: 'Gentle machine wash' }
        },
        cotton: {
            name: 'Egyptian Cotton',
            origin: 'Nile Delta, Egypt',
            fullDescription: 'Grown in the fertile Nile Delta, Egyptian cotton features extra-long staple fibers that create exceptionally smooth, durable fabrics. Known for its breathability and ability to become softer with each wash, this premium cotton is perfect for both apparel and home textiles.',
            features: ['Extra Long Staple', 'Breathable', 'Durable', 'Softens Over Time'],
            image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c85?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '120-160 GSM', width: '60 inches', care: 'Machine washable' }
        },
        organza: {
            name: 'Silk Organza',
            origin: 'Lyon, France',
            fullDescription: 'A crisp, sheer fabric woven from fine silk threads in the historic textile mills of Lyon. This lightweight material holds its shape beautifully, making it ideal for structured garments and delicate overlays. The subtle sheen adds elegance to any design.',
            features: ['Crisp Structure', 'Sheer Quality', 'Shape Retention', 'Lightweight'],
            image: 'https://images.unsplash.com/photo-1551046777-ab6c1ebf9495?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '30-40 GSM', width: '44 inches', care: 'Dry clean only' }
        },
        tweed: {
            name: 'Harris Tweed',
            origin: 'Outer Hebrides, Scotland',
            fullDescription: 'Hand-woven by islanders in their homes using local wool. Each piece is unique, featuring traditional patterns and a robust texture that improves with age. Protected by Act of Parliament, authentic Harris Tweed must be woven in the Outer Hebrides.',
            features: ['Hand-Woven', 'Weather Resistant', 'Unique Patterns', 'Heritage Craft'],
            image: 'https://images.unsplash.com/photo-1558487661-9d4f0192cf64?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '400-500 GSM', width: '58 inches', care: 'Dry clean only' }
        },
        chiffon: {
            name: 'Silk Chiffon',
            origin: 'Paris, France',
            fullDescription: 'An ethereal, lightweight fabric with a slightly rough texture. Its delicate drape and subtle sheen make it perfect for flowing garments and romantic designs. Woven in Paris using traditional techniques passed down through generations.',
            features: ['Lightweight', 'Flowing Drape', 'Subtle Sheen', 'Delicate'],
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
            specs: { weight: '20-30 GSM', width: '44 inches', care: 'Hand wash cold' }
        }
    };

    const material = materials[id];

    if (!material) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-4">Material Not Found</h1>
                    <Link to="/materials" className="text-brand-gold hover:underline">Back to Materials</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-body pt-24">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
                <div className="flex items-center gap-2 text-xs text-black/40">
                    <Link to={ROUTES.HOME} className="hover:text-brand-gold">Home</Link>
                    <span>/</span>
                    <Link to="/materials" className="hover:text-brand-gold">Materials</Link>
                    <span>/</span>
                    <span className="text-brand-black">{material.name}</span>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                        <img
                            src={material.image}
                            alt={material.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <span className="text-xs text-brand-gold font-semibold tracking-wider uppercase mb-4">
                            Origin: {material.origin}
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-semibold text-brand-black mb-6 tracking-tight">
                            {material.name}
                        </h1>
                        <p className="text-lg text-black/60 leading-relaxed mb-8">
                            {material.fullDescription}
                        </p>

                        {/* Features */}
                        <div className="border-t border-black/10 pt-8 mb-8">
                            <h3 className="text-xs font-semibold tracking-wider uppercase text-brand-black mb-6">Signature Properties</h3>
                            <ul className="grid grid-cols-2 gap-4">
                                {material.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-black/60 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Specs */}
                        <div className="border-t border-black/10 pt-8 mb-8">
                            <h3 className="text-xs font-semibold tracking-wider uppercase text-brand-black mb-6">Specifications</h3>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <p className="text-xs text-black/40 uppercase mb-2">Weight</p>
                                    <p className="text-sm font-semibold">{material.specs.weight}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-black/40 uppercase mb-2">Width</p>
                                    <p className="text-sm font-semibold">{material.specs.width}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-black/40 uppercase mb-2">Care</p>
                                    <p className="text-sm font-semibold">{material.specs.care}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to={ROUTES.PRODUCTS}
                                className="flex-1 bg-brand-gold text-brand-black py-4 text-center text-sm font-semibold tracking-widest hover:bg-brand-black hover:text-brand-gold transition-colors"
                            >
                                SHOP PRODUCTS
                            </Link>
                            <Link
                                to={ROUTES.WHOLESALE}
                                className="flex-1 border-2 border-brand-black text-brand-black py-4 text-center text-sm font-semibold tracking-widest hover:bg-brand-black hover:text-white transition-colors"
                            >
                                REQUEST SAMPLE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialDetail;
