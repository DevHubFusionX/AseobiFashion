import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const Hero = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative">
            {/* Mobile Background Image */}
            <div className="lg:hidden absolute inset-0 -mx-6 -mt-32 h-[calc(100%+8rem)]">
                <img
                    src="/Hero-background.jpeg"
                    alt="Premium Textile Assortment"
                    className="w-full h-full object-cover grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/70 to-brand-black"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
                {/* Left Typography & CTAs */}
                <div className="lg:w-1/2 relative z-10 w-full py-12 sm:py-16 lg:py-0">
                    {/* Subtle glowing orb in background */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>



                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold text-white leading-[1.05] tracking-tight mb-6 sm:mb-8">
                        Weave Your <br className="hidden sm:block" />
                        <span className="relative inline-block mt-2">
                            <span className="relative z-10 text-brand-gold italic">Masterpiece.</span>
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-brand-gold/20 -rotate-2"></span>
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10 max-w-lg leading-relaxed font-normal">
                        Source the finest fabrics from around the globe. Premium silks, rich velvets, and organic cottons curated exclusively for fashion houses and independent designers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12">
                        <Link to={ROUTES.SHOP} className="bg-brand-gold text-brand-black px-6 sm:px-8 py-4 sm:py-5 rounded-none font-semibold text-xs sm:text-sm tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 sm:gap-3 group">
                            SHOP MATERIALS
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                        <Link to="#" className="px-6 sm:px-8 py-4 sm:py-5 rounded-none border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all text-center">
                            ORDER SAMPLES
                        </Link>
                    </div>

                    {/* Quick material categories */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6 border-t border-white/10 pt-6 sm:pt-8">
                        <span className="text-[10px] sm:text-[11px] text-white/40 tracking-widest uppercase font-semibold">Popular:</span>
                        <div className="flex flex-wrap gap-4 sm:gap-5">
                            {['Silk', 'Velvet', 'Linen', 'Cotton'].map(mat => (
                                <Link key={mat} to="#" className="text-xs sm:text-sm text-white/70 hover:text-brand-gold transition-colors font-semibold relative group">
                                    {mat}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Image Composition - Hidden on Mobile */}
                <div className="hidden lg:block lg:w-1/2 relative w-full h-[650px]">
                    <div className="relative w-full max-w-[500px] h-full ml-auto">
                        {/* Decorative Gold Frame */}
                        <div className="absolute inset-0 border border-brand-gold/30 translate-x-4 -translate-y-4 rounded-tr-[100px] rounded-bl-[100px]"></div>

                        {/* Main Image */}
                        <div className="absolute inset-0 rounded-tr-[100px] rounded-bl-[100px] overflow-hidden bg-stone-900 border border-white/10 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay z-10 pointer-events-none"></div>
                            <img
                                src="/Hero-background.jpeg"
                                alt="Premium Textile Assortment"
                                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 hover:scale-[1.05]"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
