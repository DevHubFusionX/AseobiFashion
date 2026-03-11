import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuickViewModal from './QuickViewModal';
import LazyImage from '../../../components/common/LazyImage';

const ProductCard = ({ product, index }) => {
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(product.image);
    const [hoveredColor, setHoveredColor] = useState(null);

    const handleColorHover = (color) => {
        const colorImage = product.colorImages?.find(ci => ci.color === color);
        if (colorImage) {
            setHoveredImage(colorImage.image);
            setHoveredColor(color);
        }
    };

    const handleColorLeave = () => {
        setHoveredImage(product.image);
        setHoveredColor(null);
    };

    return (
        <>
            <Link to={`/product/${product._id}`} className={`group cursor-pointer flex flex-col ${index === 1 ? 'lg:mt-16' : ''}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 w-full group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 rounded-sm">
                    {product.tag && (
                        <div className="absolute top-4 left-4 z-20 bg-brand-gold text-brand-black text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-none shadow-sm">
                            {product.tag}
                        </div>
                    )}

                    {hoveredColor && (
                        <div className="absolute top-4 right-4 z-20 bg-brand-black/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                            {hoveredColor}
                        </div>
                    )}

                    <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsQuickViewOpen(true);
                            }}
                            className="bg-white text-brand-black px-6 py-3 rounded-full text-xs font-semibold tracking-widest hover:bg-brand-gold hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl"
                        >
                            QUICK VIEW
                        </button>
                    </div>

                    <LazyImage
                        src={hoveredImage}
                        alt={product.name}
                        className="w-full h-full transition-all duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Product Info — clean, breathable hierarchy */}
                <div className="flex flex-col flex-grow pt-4 sm:pt-5">
                    {/* Name */}
                    <h3 className="text-sm sm:text-base font-semibold text-brand-black tracking-tight group-hover:text-brand-gold transition-colors line-clamp-1 mb-1">
                        {product.name}
                    </h3>

                    {/* Category */}
                    <span className="text-[10px] font-medium text-black/35 uppercase tracking-widest mb-2 sm:mb-3">
                        {product.category}
                    </span>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-3 sm:mb-4">
                        <span className="text-base sm:text-lg font-semibold text-brand-black">₦{product.price.toLocaleString()}</span>
                        <span className="text-[10px] text-black/30 font-medium">/yd</span>
                    </div>

                    {/* Color Swatches — compact pills */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-black/5">
                            {product.colors.slice(0, 4).map((color, i) => (
                                <span
                                    key={i}
                                    className="text-[9px] sm:text-[10px] px-2 py-0.5 border border-black/8 rounded-full text-black/50 cursor-pointer hover:border-brand-gold/40 hover:text-brand-gold hover:bg-brand-gold/5 transition-all"
                                    title={color}
                                    onMouseEnter={() => handleColorHover(color)}
                                    onMouseLeave={handleColorLeave}
                                >
                                    {color}
                                </span>
                            ))}
                            {product.colors.length > 4 && (
                                <span className="text-[9px] sm:text-[10px] px-2 py-0.5 text-black/30">
                                    +{product.colors.length - 4}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Link>

            <QuickViewModal
                product={product}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />
        </>
    );
};

export default ProductCard;
