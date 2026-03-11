import React from 'react';

const TrustMarquee = () => {
    return (
        <div className="w-full border-y border-white/10 bg-brand-black mt-32 overflow-hidden py-5 relative z-20">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>

            <div className="flex whitespace-nowrap animate-marquee items-center w-[200%]">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center justify-around w-full shrink-0">
                        <span className="text-brand-gold/50 text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase px-8">Organic Cottons</span>
                        <span className="text-white/20 text-[10px]">✦</span>
                        <span className="text-brand-gold/50 text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase px-8">Italian Silks</span>
                        <span className="text-white/20 text-[10px]">✦</span>
                        <span className="text-brand-gold/50 text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase px-8">Rich Velvets</span>
                        <span className="text-white/20 text-[10px]">✦</span>
                        <span className="text-brand-gold/50 text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase px-8">French Lace</span>
                        <span className="text-white/20 text-[10px]">✦</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustMarquee;
