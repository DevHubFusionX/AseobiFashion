import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { toggleCart, cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'PRODUCTS', path: ROUTES.PRODUCTS },
        { name: 'COLLECTIONS', path: ROUTES.SHOP },
        { name: 'WHOLESALE', path: ROUTES.WHOLESALE },
        { name: 'ABOUT', path: ROUTES.ABOUT },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${isScrolled
                ? 'bg-brand-black shadow-2xl py-2 border-brand-black'
                : 'bg-brand-black border-white/5 py-3'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center relative font-body">

                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to={ROUTES.HOME} className="group relative">
                            <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-brand-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center relative z-10">
                                    <img src="/Logo.svg" alt="Aseobi Logo" className="w-full h-full object-contain filter drop-shadow-2xl brightness-110" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10 text-white">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative group py-4"
                            >
                                <span className={`text-xs font-semibold tracking-wider transition-all duration-300 ${location.pathname === link.path ? 'text-brand-gold' : 'text-white/70 group-hover:text-brand-gold'}`}>
                                    {link.name}
                                </span>
                                <span className={`absolute bottom-2 left-0 w-full h-[1px] bg-brand-gold transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100 ${location.pathname === link.path ? 'scale-x-100' : ''}`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Area: Actions */}
                    <div className="flex items-center gap-3 sm:gap-4 text-white font-semibold">
                        <Link to="/search" className="p-2 text-white/50 hover:text-brand-gold transition-colors" aria-label="Search products">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </Link>
                        <button onClick={toggleCart} className="relative group p-2 text-white/50 hover:text-brand-gold transition-colors" aria-label="Open shopping cart">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            {cartCount > 0 && (
                                <div className="absolute top-1 right-1 w-4 h-4 bg-brand-gold text-[10px] font-bold text-brand-black rounded-full flex items-center justify-center border border-brand-black transform scale-100 group-hover:scale-110 transition-transform shadow-lg">
                                    {cartCount}
                                </div>
                            )}
                        </button>

                        <Link to={ROUTES.WHOLESALE} className="hidden md:flex relative overflow-hidden group bg-brand-gold text-brand-black px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-wider hover:bg-white transition-all duration-300 active:scale-95 shadow-lg shadow-brand-gold/20">
                            <span className="relative z-10 flex items-center gap-2">
                                GET QUOTE
                                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </span>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-1.5 text-white/60 hover:text-brand-gold"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isMobileMenuOpen ? "M6 18L18 6M6 6l18 18" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-6 pb-6' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-6 border-t border-white/10 pt-6 px-2 font-body">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-semibold tracking-wider text-white hover:text-brand-gold transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to={ROUTES.WHOLESALE} onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-brand-gold text-brand-black py-4 rounded-full text-xs font-semibold tracking-widest mt-4 shadow-xl shadow-brand-gold/20 text-center block">
                            GET QUOTE
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
