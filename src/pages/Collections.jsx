import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useCollections } from '../hooks/useCollections';
import SEO from '../components/common/SEO';

const Collections = () => {
    const { data: collections = [], isLoading } = useCollections();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setTimeout(() => {
                setEmail('');
                setSubscribed(false);
            }, 3000);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-black/50">Loading collections...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAFA] min-h-screen font-body pt-24 md:pt-28 pb-24 md:pb-32">
            <SEO
                title="The Archives | Collections"
                description="Explore our curated archives of the world's finest textiles. From Cashmere to Silk, discover materials meticulously crafted for excellence."
            />

            {/* Cinematic Hero */}
            <div className="relative h-[60vh] sm:h-[70vh] w-full flex flex-col justify-end pb-16 sm:pb-24 md:pb-32 px-6 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/Hero-background.jpeg"
                        alt="Collections Hero"
                        className="w-full h-full object-cover grayscale-[20%]"
                    />
                    {/* Deep rich gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black/20"></div>
                    {/* Subtle noise texture */}
                    <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full text-white">
                    <div className="max-w-3xl">
                        <span className="text-brand-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4 sm:mb-6 block">The Archives</span>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 sm:mb-8">
                            Curated <br className="hidden sm:block" /><span className="text-brand-gold italic font-display pr-2 sm:pr-4">Collections</span>
                        </h1>
                        <p className="text-sm sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed border-l-2 border-brand-gold pl-4 sm:pl-6">
                            Explore our seasonal edits and thematic gatherings of the world's finest textiles. Each archive is meticulously crafted to inspire your next masterpiece.
                        </p>
                    </div>
                </div>
            </div>

            {/* Asymmetrical Interlocking Grid Layout */}
            <div className="max-w-[1400px] mx-auto px-6 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-24">
                <div className="flex flex-col gap-6 sm:gap-8 md:gap-16">

                    {/* Collection 1 & 2 - Side by Side Uneven */}
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-center">
                        <Link
                            to={`${ROUTES.PRODUCTS}?category=${collections[0].category}`}
                            className="w-full md:w-[60%] group relative overflow-hidden bg-stone-100 h-[400px] sm:h-[500px] md:h-[700px] block"
                        >
                            <img src={collections[0].image} alt={collections[0].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                            <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/60 transition-colors duration-700"></div>
                            <div className="absolute inset-0 p-6 sm:p-8 md:p-16 flex flex-col justify-end text-white">
                                <div className="transform translate-y-4 sm:translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-display italic mb-3 sm:mb-4">{collections[0].title}</h2>
                                    <p className="text-white/80 max-w-sm text-sm sm:text-base md:text-lg">{collections[0].description}</p>
                                    <div className="w-12 h-[1px] bg-brand-gold mt-4 sm:mt-6 group-hover:w-24 transition-all duration-700"></div>
                                </div>
                            </div>
                        </Link>

                        <div className="w-full md:w-[40%] flex flex-col justify-center">
                            <div className="max-w-md mx-auto md:ml-0 md:mr-auto py-8 sm:py-12 px-6 md:px-8">
                                <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4 block">Archive 02</span>
                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-brand-black mb-4 sm:mb-6 tracking-tight">{collections[1].title}</h2>
                                <p className="text-black/60 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{collections[1].description}</p>
                                <Link to={`${ROUTES.PRODUCTS}?category=${collections[1].category}`} className="inline-block border-b border-brand-black pb-1 text-xs sm:text-sm font-semibold tracking-widest uppercase hover:text-brand-gold hover:border-brand-gold transition-colors">
                                    Discover Cashmere
                                </Link>
                            </div>
                            <Link
                                to={`${ROUTES.PRODUCTS}?category=${collections[1].category}`}
                                className="w-full group relative overflow-hidden bg-stone-200 h-[300px] sm:h-[400px] block mt-6 sm:mt-8 md:mt-0"
                            >
                                <img src={collections[1].image} alt={collections[1].title} className="absolute inset-0 w-full h-full object-cover grayscale-[30%] transition-transform duration-[2s] group-hover:scale-105" />
                            </Link>
                        </div>
                    </div>

                    {/* Collection 3 & 4 - Overlapping Editorial */}
                    <div className="relative mt-8 sm:mt-16 md:mt-32 pb-16 sm:pb-24">
                        {/* Background Block col 3 */}
                        <div className="w-full md:w-[70%] bg-brand-black text-white p-8 sm:p-12 md:p-24 relative overflow-hidden ml-auto">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                            <div className="relative z-10 md:w-1/2 ml-auto">
                                <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-6 block">Evening Attire</span>
                                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display italic mb-4 sm:mb-6">{collections[2].title}</h2>
                                <p className="text-white/70 leading-relaxed text-sm sm:text-base md:text-lg mb-8 sm:mb-10">{collections[2].description}</p>
                                <Link to={`${ROUTES.PRODUCTS}?category=${collections[2].category}`} className="inline-flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand-gold group">
                                    <span>View Collection</span>
                                    <div className="w-8 h-[1px] bg-brand-gold group-hover:w-16 transition-all duration-500"></div>
                                </Link>
                            </div>
                        </div>

                        {/* Foreground Image Overlap col 4 */}
                        <Link
                            to={`${ROUTES.PRODUCTS}?category=${collections[3].category}`}
                            className="static md:absolute top-1/2 left-0 transform md:-translate-y-1/2 w-[90%] md:w-[45%] h-[400px] sm:h-[500px] md:h-[800px] group overflow-hidden block mx-auto md:mx-0 -mt-12 sm:-mt-16 md:mt-0 shadow-2xl"
                        >
                            <img src={collections[3].image} alt={collections[3].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12 text-white">
                                <span className="bg-white text-brand-black px-3 py-1 text-xs font-bold tracking-widest uppercase mb-3 sm:mb-4 inline-block shadow-sm">Bespoke</span>
                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight">{collections[3].title}</h2>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Newsletter Promo Banner */}
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mt-16 sm:mt-32 md:mt-48">
                <div className="bg-brand-black text-white p-8 sm:p-12 md:p-20 text-center rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/Hero-background.jpeg')] bg-cover bg-center mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">Archive Access</h3>
                        <p className="text-white/60 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base md:text-lg">
                            Join our private newsletter to receive exquisite fabric swatches, early access to new collections, and industry insights.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email Address"
                                required
                                disabled={subscribed}
                                className="flex-1 bg-white/5 border border-white/20 px-6 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors text-white placeholder:text-white/40 disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={subscribed}
                                className="bg-brand-gold text-brand-black px-8 py-4 text-sm font-semibold tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {subscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Collections;
