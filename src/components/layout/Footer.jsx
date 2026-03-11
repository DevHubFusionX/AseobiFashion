import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const Footer = () => {
    return (
        <footer className="bg-brand-black text-white pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-12 border-t border-white/10 relative z-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">

                {/* Top Section: Brand & Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/10 pb-8 sm:pb-12 lg:pb-16 mb-8 sm:mb-12 lg:mb-16 gap-8 lg:gap-12">
                    <div className="max-w-md">
                        <Link to={ROUTES.HOME} className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 relative group inline-flex">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-brand-gold/30 flex items-center justify-center relative bg-brand-black z-10 overflow-hidden">
                                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-500"></div>
                                <img src="/Logo.svg" alt="Moderate's Textile Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain z-10" />
                            </div>
                            <span className="font-heading font-semibold text-xl sm:text-2xl tracking-tight text-white group-hover:text-brand-gold transition-colors duration-300">
                                Moderate's
                            </span>
                        </Link>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-normal">
                            Curating the world's finest textiles for uncompromising designers and luxury fashion houses.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto">
                        <h4 className="text-brand-gold font-semibold tracking-widest text-[10px] sm:text-xs uppercase mb-3 sm:mb-4">Join the Atelier</h4>
                        <div className="flex flex-col sm:flex-row w-full lg:w-[400px] gap-2 sm:gap-0">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 text-white px-4 sm:px-6 py-3 sm:py-4 w-full focus:outline-none focus:border-brand-gold/50 transition-colors text-xs sm:text-sm rounded-none"
                            />
                            <button className="bg-brand-gold text-brand-black px-6 sm:px-8 py-3 sm:py-4 font-semibold tracking-widest text-xs sm:text-sm hover:bg-white transition-colors shrink-0">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Compact Links - Hidden on Mobile, Show on Desktop */}
                <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
                    <div>
                        <h4 className="text-white font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                            Collections
                        </h4>
                        <ul className="space-y-3 sm:space-y-4">
                            {['Imperial Silks', 'Venetian Velvets', 'Organic Cottons', 'Belgian Linens'].map(link => (
                                <li key={link}>
                                    <Link to={ROUTES.PRODUCTS} className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                            Services
                        </h4>
                        <ul className="space-y-3 sm:space-y-4">
                            <li><Link to={ROUTES.MATERIALS} className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">Bespoke Sourcing</Link></li>
                            <li><Link to={ROUTES.WHOLESALE} className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">Wholesale Accounts</Link></li>
                            <li><Link to={ROUTES.WHOLESALE} className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">Order Samples</Link></li>
                            <li><Link to={ROUTES.ABOUT} className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">Consultation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                            Company
                        </h4>
                        <ul className="space-y-3 sm:space-y-4">
                            <li><Link to={ROUTES.ABOUT} className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">Our Heritage</Link></li>
                            <li><Link to={ROUTES.FAQ} className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">Knowledge Base</Link></li>
                            <li><Link to={ROUTES.CONTACT} className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                            Connect
                        </h4>
                        <ul className="space-y-3 sm:space-y-4">
                            {['Instagram', 'Pinterest', 'LinkedIn', 'Twitter'].map(link => (
                                <li key={link}>
                                    <a href="#" className="text-white/50 hover:text-brand-gold text-xs sm:text-sm transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Mobile Quick Links */}
                <div className="sm:hidden flex flex-wrap gap-4 justify-center mb-8">
                    <Link to={ROUTES.PRODUCTS} className="text-white/60 hover:text-brand-gold text-xs transition-colors">Products</Link>
                    <Link to={ROUTES.CONTACT} className="text-white/60 hover:text-brand-gold text-xs transition-colors">Contact</Link>
                    <Link to={ROUTES.FAQ} className="text-white/60 hover:text-brand-gold text-xs transition-colors">FAQ</Link>
                    <Link to={ROUTES.ABOUT} className="text-white/60 hover:text-brand-gold text-xs transition-colors">About</Link>
                </div>

                {/* Bottom Section: Legal & Copyright */}
                <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-white/30 text-[10px] sm:text-xs text-center md:text-left">
                        &copy; {new Date().getFullYear()} Moderate's Textile. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                        <Link to={ROUTES.PRIVACY} className="text-white/30 hover:text-white/70 text-[10px] sm:text-xs transition-colors">Privacy</Link>
                        <Link to={ROUTES.TERMS} className="text-white/30 hover:text-white/70 text-[10px] sm:text-xs transition-colors">Terms</Link>
                        <Link to={ROUTES.CONTACT} className="text-white/30 hover:text-white/70 text-[10px] sm:text-xs transition-colors">Support</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
