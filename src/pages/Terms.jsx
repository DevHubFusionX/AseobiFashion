import React from 'react';
import SEO from '../components/common/SEO';

const Terms = () => {
    return (
        <div className="bg-white min-h-screen font-body pt-24 sm:pt-32 pb-20">
            <SEO
                title="Terms & Conditions | Moderate's Textile"
                description="Our standard terms and conditions for fabric purchasing, wholesale agreements, and global logistics."
            />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16">
                    <span className="text-brand-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Legal</span>
                    <h1 className="text-4xl font-semibold tracking-tight text-brand-black mb-4">Terms & Conditions</h1>
                    <p className="text-sm text-black/40 italic">Last updated: March 2026</p>
                </header>

                <div className="prose prose-sm sm:prose-base prose-stone max-w-none space-y-10 text-black/70 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-brand-black mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing or using the Moderate's Textile platform, you agree to be bound by these Terms and Conditions. Our services are provided to facilitate the ethical sourcing and trade of high-quality textiles.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-brand-black mb-4">2. Material Accuracy</h2>
                        <p>While we strive for absolute accuracy in our digital archives, variations in fiber color may occur due to screen settings and the natural batch-dyeing process of artisanal mills. We recommend requesting swatches for large projects.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-brand-black mb-4">3. Custom Sourcing & Milling</h2>
                        <p>Custom milling requests are subject to specific minimum order quantities (MOQs) and extended lead times. A non-refundable deposit is required for all bespoke weaving or dyeing operations.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-brand-black mb-4">4. Shipping & Logistics</h2>
                        <p>Moderate's Textile facilitates global delivery through premium logistics partners. Risk of loss passes to the purchaser upon handover to the carrier, unless otherwise specified in high-value trade agreements.</p>
                    </section>
                </div>

                <div className="mt-20 pt-10 border-t border-black/5 text-center">
                    <p className="text-xs text-black/30">Questions regarding our terms? <a href="/contact" className="text-brand-gold hover:underline">Contact Legal Dept</a></p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
