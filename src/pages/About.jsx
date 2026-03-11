import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import SEO from '../components/common/SEO';

const About = () => {
    return (
        <div className="bg-white min-h-screen font-body overflow-x-hidden">
            <SEO
                title="Our Legacy | Crafting Excellence"
                description="Discover the story behind Moderate's Textile. Our genesis, core values, and dedication to sourcing the world's most extraordinary fabrics."
            />
            {/* Hero / Statement Section */}
            <div className="relative h-[80vh] w-full flex items-center justify-center">
                {/* Background Image with Parallax feel */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/Hero-background.jpeg"
                        alt="Atelier workspace"
                        className="w-full h-full object-cover grayscale-[50%]"
                    />
                    <div className="absolute inset-0 bg-brand-black/40 mix-blend-multiply"></div>
                </div>

                {/* Overlay Content */}
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-8 drop-shadow-lg">
                        Weaving <span className="italic font-display text-brand-gold">Legacies</span>
                    </h1>
                    <p className="text-lg md:text-xl font-medium tracking-wide text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        Since our inception, Moderate's has been driven by a singular obsession: sourcing and supplying the most extraordinary textiles on earth.
                    </p>
                </div>
            </div>

            {/* The Origin Story - Split Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
                    <div className="w-full md:w-1/2 order-2 md:order-1">
                        <span className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">Our Genesis</span>
                        <h2 className="text-3xl md:text-4xl font-semibold text-brand-black mb-6 tracking-tight">
                            Born from a dissatisfaction with the ordinary.
                        </h2>
                        <div className="space-y-6 text-black/60 leading-relaxed text-lg">
                            <p>
                                Moderate's began as a small, private sourcing agency for bespoke tailors in London and Milan. We recognized a growing chasm in the market between mass-produced fabrics masquerading as luxury, and true, artisanal milling.
                            </p>
                            <p>
                                We bypass modern, high-speed power looms whenever possible, instead partnering with multi-generational family mills that still utilize vintage shuttle looms and natural, small-batch dyeing processes.
                            </p>
                            <p className="font-medium text-brand-black">
                                The result is fabric with soul, texture, and a lifespan measured in decades, not seasons.
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 order-1 md:order-2">
                        <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden rounded-sm group">
                            <img
                                src="/Hero-background.jpeg"
                                alt="Founder inspecting fabric"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Signature element overlay */}
                            <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 bg-white p-6 shadow-xl w-3/4 max-w-[280px]">
                                <h4 className="font-display italic text-2xl text-brand-black mb-2">"Quality is never an accident."</h4>
                                <div className="w-8 h-[1px] bg-brand-gold mb-2"></div>
                                <span className="text-xs font-semibold tracking-widest text-black/40 uppercase">The Founders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values - Horizontal Scroll aesthetic */}
            <div className="bg-brand-black text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Our Pillars of Craft</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {/* Value 1 */}
                        <div className="border-t border-white/20 pt-8 group">
                            <div className="text-brand-gold font-display text-4xl mb-6 opacity-50 group-hover:opacity-100 transition-opacity">01</div>
                            <h3 className="text-xl font-semibold mb-4 tracking-wide">Provenance</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                We know the origin of every thread. From the high-altitude pastures of Mongolia to the flax fields of Flanders, we deal in absolute traceability.
                            </p>
                        </div>
                        {/* Value 2 */}
                        <div className="border-t border-brand-gold pt-8 group transform md:-translate-y-8">
                            <div className="text-brand-gold font-display text-4xl mb-6 opacity-50 group-hover:opacity-100 transition-opacity">02</div>
                            <h3 className="text-xl font-semibold mb-4 tracking-wide">Patience</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                True luxury cannot be rushed. We champion slow weaving techniques, allowing resting periods for yarns to ensure maximum structural integrity.
                            </p>
                        </div>
                        {/* Value 3 */}
                        <div className="border-t border-white/20 pt-8 group">
                            <div className="text-brand-gold font-display text-4xl mb-6 opacity-50 group-hover:opacity-100 transition-opacity">03</div>
                            <h3 className="text-xl font-semibold mb-4 tracking-wide">Progressive Sustainability</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                Beyond just "eco-friendly," we invest in regenerative agricultural practices that actually improve the soil from which our natural fibers grow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Atelier / Studio Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">The Studio</span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-brand-black mb-6 tracking-tight">
                        Designed for Creators
                    </h2>
                    <p className="text-black/60 leading-relaxed">
                        Whether you are an independent designer or a global fashion house, our platform is built to support your creative vision with uncompromised material quality.
                    </p>
                </div>

                {/* Studio Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 aspect-[4/3] bg-stone-100 overflow-hidden rounded-sm">
                        <img src="/Hero-background.jpeg" alt="Fabric swatches" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="col-span-1 aspect-[3/4] md:aspect-auto md:h-full bg-stone-200 overflow-hidden rounded-sm">
                        <img src="/Hero-background.jpeg" alt="Tailoring shears" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="col-span-1 aspect-[3/4] md:aspect-auto md:h-full bg-stone-300 overflow-hidden rounded-sm relative flex items-center justify-center p-6 text-center">
                        {/* Text block replacing an image in the grid */}
                        <div className="absolute inset-0 bg-brand-black opacity-90"></div>
                        <div className="relative z-10">
                            <p className="text-brand-gold font-display italic text-xl mb-4">"The foundation of luxury."</p>
                            <Link to={ROUTES.SHOP} className="text-xs text-white font-semibold tracking-widest uppercase border-b border-white/30 hover:border-brand-gold transition-colors pb-1">
                                View Collections
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
