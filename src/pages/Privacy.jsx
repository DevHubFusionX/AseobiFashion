import React from 'react';
import SEO from '../components/common/SEO';

const Privacy = () => {
    return (
        <div className="bg-white min-h-screen font-body pt-24 sm:pt-32 pb-20">
            <SEO
                title="Privacy Policy | Data Integrity"
                description="Moderate's Textile commitment to protecting your creative data and personal information."
            />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16">
                    <span className="text-brand-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Confidentiality</span>
                    <h1 className="text-4xl font-semibold tracking-tight text-brand-black mb-4">Privacy Policy</h1>
                    <p className="text-sm text-black/40 italic">Last updated: March 2026</p>
                </header>

                <div className="prose prose-sm sm:prose-base prose-stone max-w-none space-y-10 text-black/70 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-brand-black mb-4">1. Data Collection</h2>
                        <p>We collect information necessary to facilitate your textile sourcing journey, including trade credentials, shipment addresses, and material preferences. We do not sell your data to third-party marketplaces.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-brand-black mb-4">2. Creative Confidentiality</h2>
                        <p>We recognize that your sourcing choices are part of your creative intellectual property. Information regarding bespoke or custom-milled textiles is held in strict confidence within our production team.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-brand-black mb-4">3. Security Standards</h2>
                        <p>Moderate's Textile employs industrial-grade encryption for all financial transactions and cloud-based storage of trade documents.</p>
                    </section>
                </div>

                <div className="mt-20 pt-10 border-t border-black/5 text-center">
                    <p className="text-xs text-black/30">Privacy concerns? <a href="/contact" className="text-brand-gold hover:underline">Contact Data Protection Officer</a></p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
