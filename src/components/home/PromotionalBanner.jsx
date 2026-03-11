import React from 'react';

/**
 * PromotionalBanner component with a premium glassmorphism aesthetic.
 */
const PromotionalBanner = ({
    title,
    subtitle,
    ctaText,
    ctaLink,
    image,
    className = ""
}) => {
    return (
        <div className={`relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-sm group ${className}`}>
            {/* Background Image with Parallax-like effect */}
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-40"></div>

            {/* Glassmorphism Content Card */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="max-w-xl w-full glass-premium p-8 sm:p-12 text-center transform transition-transform duration-700 hover:scale-[1.02]">
                    <span className="text-brand-gold text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase mb-4 block animate-fade-in">
                        Special Release
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed max-w-md mx-auto">
                        {subtitle}
                    </p>
                    <a
                        href={ctaLink}
                        className="inline-block bg-white text-brand-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-xl"
                    >
                        {ctaText}
                    </a>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 w-24 h-[1px] bg-white/20 hidden sm:block"></div>
            <div className="absolute bottom-8 right-8 w-24 h-[1px] bg-white/20 hidden sm:block"></div>
        </div>
    );
};

export default PromotionalBanner;
