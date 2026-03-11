import React, { useState } from 'react';

const Wholesale = () => {
    const [formStep, setFormStep] = useState(1);

    const benefits = [
        {
            title: 'Volume Pricing',
            desc: 'Access tiered pricing structures designed specifically for designers, ateliers, and boutiques.',
            icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
        },
        {
            title: 'Dedicated Account Manager',
            desc: 'A single point of contact for sourcing, custom milling requests, and logistics tracking.',
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        {
            title: 'Priority Sampling',
            desc: 'Complimentary seasonal swatch books and expedited strike-offs for custom dyeing.',
            icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
        }
    ];

    const handleNext = (e) => {
        e.preventDefault();
        setFormStep(2);
    };

    return (
        <div className="bg-brand-black min-h-screen text-white font-body pt-24 sm:pt-32 pb-16 sm:pb-24 relative overflow-hidden">
            <SEO
                title="Wholesale & Trade Portal"
                description="Apply for a Moderate's Textile trade account. Access volume pricing, dedicated support, and priority sampling for your business."
            />
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Sequence */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20 md:mb-32">
                    <span className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">B2B Trade Portal</span>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight mb-4 sm:mb-6">
                        Partner with <span className="italic font-display text-brand-gold">Excellence</span>
                    </h1>
                    <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                        We supply the world's most discerning fashion houses, interior designers, and bespoke tailors. Apply for a trade account to access our complete inventory and exclusive services.
                    </p>
                </div>

                <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-start">

                    {/* Left: Value Proposition - Shows Second on Mobile */}
                    <div className="w-full lg:w-1/2 space-y-8 sm:space-y-12">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex gap-4 sm:gap-6 items-start group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-gold transition-colors duration-500">
                                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={benefit.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-white/50 leading-relaxed text-sm">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}

                        <div className="pt-6 sm:pt-8 border-t border-white/10 mt-6 sm:mt-8">
                            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/40 mb-4">Minimum Order Quantities</p>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                                    <p className="text-xl sm:text-2xl font-semibold text-brand-gold mb-1">50<span className="text-xs sm:text-sm text-white/50 ml-1">yds</span></p>
                                    <p className="text-xs text-white/60">Stocked Fabrics</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                                    <p className="text-xl sm:text-2xl font-semibold text-brand-gold mb-1">300<span className="text-xs sm:text-sm text-white/50 ml-1">yds</span></p>
                                    <p className="text-xs text-white/60">Custom Milling & Dyeing</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Application Form - Shows First on Mobile */}
                    <div className="w-full lg:w-1/2 bg-white/5 p-6 sm:p-8 md:p-12 rounded-sm border border-white/10 backdrop-blur-sm relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                            <div
                                className="h-full bg-brand-gold transition-all duration-500 ease-out"
                                style={{ width: formStep === 1 ? '50%' : '100%' }}
                            ></div>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Trade Application</h2>
                        <p className="text-white/50 text-xs sm:text-sm mb-6 sm:mb-8">Step {formStep} of 2 — {formStep === 1 ? 'Company Details' : 'Purchasing Intent'}</p>

                        <form className="space-y-5 sm:space-y-6">
                            {formStep === 1 ? (
                                <div className="animate-[fadeIn_0.5s_ease-out]">
                                    <div className="space-y-4 sm:space-y-5">
                                        <div>
                                            <label className="block text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">Company Name *</label>
                                            <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/20" placeholder="e.g. Atelier Maison" required />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">Business Type *</label>
                                            <select className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer">
                                                <option className="bg-brand-black text-white">Fashion Brand / Label</option>
                                                <option className="bg-brand-black text-white">Interior Design Studio</option>
                                                <option className="bg-brand-black text-white">Bespoke Tailor</option>
                                                <option className="bg-brand-black text-white">Other</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">First Name *</label>
                                                <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-brand-gold transition-colors" required />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">Last Name *</label>
                                                <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-brand-gold transition-colors" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">Work Email *</label>
                                            <input type="email" className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-brand-gold transition-colors" required />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className="w-full bg-brand-gold text-brand-black py-3 sm:py-4 font-semibold tracking-widest text-xs sm:text-sm hover:bg-white transition-colors mt-6 sm:mt-8"
                                    >
                                        CONTINUE TO STEP 2
                                    </button>
                                </div>
                            ) : (
                                <div className="animate-[fadeIn_0.5s_ease-out]">
                                    <div className="space-y-4 sm:space-y-5">
                                        <div>
                                            <label className="block text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">Primary Material Interest *</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                                {['Silk', 'Linen', 'Wool/Cashmere', 'Cotton', 'Blends', 'Custom Milling'].map(mat => (
                                                    <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                                                        <input type="checkbox" className="w-4 h-4 accent-brand-gold border-white/20 bg-transparent" />
                                                        <span className="text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">{mat}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <label className="block text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">Estimated Annual Volume (Yards)</label>
                                            <select className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer">
                                                <option className="bg-brand-black text-white">Less than 500 yds</option>
                                                <option className="bg-brand-black text-white">500 - 2,000 yds</option>
                                                <option className="bg-brand-black text-white">2,000 - 10,000 yds</option>
                                                <option className="bg-brand-black text-white">10,000+ yds</option>
                                            </select>
                                        </div>
                                        <div className="pt-4">
                                            <label className="block text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">Additional Information</label>
                                            <textarea rows="3" className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-white/20" placeholder="Tell us about your brand or specific project needs..."></textarea>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                                        <button
                                            type="button"
                                            onClick={() => setFormStep(1)}
                                            className="w-full sm:w-1/3 border border-white/20 text-white py-3 sm:py-4 font-semibold tracking-widest text-xs sm:text-sm hover:bg-white/5 transition-colors"
                                        >
                                            BACK
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.preventDefault(); alert('Application Submitted (Demo Mode)'); }}
                                            className="w-full sm:w-2/3 bg-brand-gold text-brand-black py-3 sm:py-4 font-semibold tracking-widest text-xs sm:text-sm hover:bg-white transition-colors"
                                        >
                                            SUBMIT APPLICATION
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Wholesale;
