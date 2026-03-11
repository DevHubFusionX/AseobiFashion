import React, { useState } from 'react';
import SEO from '../components/common/SEO';

const FAQ = () => {
    const faqData = [
        {
            category: "Sourcing & Quality",
            questions: [
                {
                    q: "How do you source your textiles?",
                    a: "We partner directly with heritage mills in Italy, Scotland, and Japan. Our sourcing team visits each loom house to verify artisanal techniques and ethical labor practices."
                },
                {
                    q: "Are your fabrics authentic natural fibers?",
                    a: "Yes. We specialize in pure Silk, Cashmere, Linen, and Virgin Wool. Each archive is certified for fiber content and material integrity."
                }
            ]
        },
        {
            category: "Shipping & Delivery",
            questions: [
                {
                    q: "Do you ship internationally?",
                    a: "We offer secure global shipping to over 50 countries. Transit times typically range from 3–7 business days via our premium logistics partners."
                },
                {
                    q: "How are fabrics packaged?",
                    a: "To prevent creasing and damage, all fabrics are meticulously rolled on industrial-grade tubes and wrapped in protective, moisture-resistant archival paper."
                }
            ]
        },
        {
            category: "Wholesale & Business",
            questions: [
                {
                    q: "Do you offer wholesale pricing?",
                    a: "Yes, we provide tiered pricing for designers, ateliers, and boutiques. Please visit our Wholesale page to apply for a trade account."
                },
                {
                    q: "Can I request custom milling?",
                    a: "For large-scale projects (300+ yards), we can facilitate custom dyeing and weaving patterns through our partner mills."
                }
            ]
        }
    ];

    const [openIndex, setOpenIndex] = useState("0-0");

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-[#FAFAFA] min-h-screen font-body pt-24 sm:pt-32 pb-20">
            <SEO
                title="FAQ | Knowledge Base"
                description="Common questions about Moderate's Textile sourcing, shipping, quality standards, and wholesale opportunities."
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-brand-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Knowledge Base</span>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-black mb-6">Common Inquiries</h1>
                    <div className="w-12 h-[2px] bg-brand-gold mx-auto"></div>
                </div>

                <div className="space-y-16">
                    {faqData.map((section, sIdx) => (
                        <div key={sIdx} className="space-y-6">
                            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-black/30 border-b border-black/5 pb-4">{section.category}</h2>
                            <div className="space-y-4">
                                {section.questions.map((item, qIdx) => {
                                    const index = `${sIdx}-${qIdx}`;
                                    const isOpen = openIndex === index;
                                    return (
                                        <div key={index} className="border border-black/5 bg-white rounded-sm overflow-hidden transition-all duration-300">
                                            <button
                                                onClick={() => toggleAccordion(index)}
                                                className="w-full flex items-center justify-between p-6 text-left group"
                                            >
                                                <span className={`text-sm sm:text-base font-semibold transition-colors ${isOpen ? 'text-brand-gold' : 'text-brand-black group-hover:text-brand-gold'}`}>
                                                    {item.q}
                                                </span>
                                                <svg
                                                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-gold' : 'text-black/20'}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <div
                                                className={`transition-all duration-500 ease-in-out px-6 ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                                            >
                                                <p className="text-sm sm:text-base text-black/60 leading-relaxed border-t border-black/5 pt-4">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Direct Assistance CTA */}
                <div className="mt-24 p-8 sm:p-12 bg-brand-black text-white text-center rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4">Still have questions?</h3>
                        <p className="text-white/60 mb-8 text-sm sm:text-base">Our concierge team is standing by to provide personalized assistance.</p>
                        <a href="/contact" className="inline-block border-b border-brand-gold pb-1 text-xs font-bold tracking-widest uppercase text-brand-gold hover:text-white hover:border-white transition-colors">
                            Contact Concierge
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
