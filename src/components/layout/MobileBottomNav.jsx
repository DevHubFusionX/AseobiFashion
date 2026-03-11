import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCart } from '../../context/CartContext';

const MobileBottomNav = () => {
    const location = useLocation();
    const { toggleCart, cartCount } = useCart();

    const navItems = [
        {
            name: 'Home',
            path: ROUTES.HOME,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Archives',
            path: ROUTES.PRODUCTS,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            )
        },
        {
            name: 'Search',
            path: '/search',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100] animate-slideUp">
            <nav className="bg-brand-black/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 shadow-2xl flex items-center justify-between pointer-events-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-brand-gold' : 'text-white/40 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                        </Link>
                    );
                })}

                {/* Cart Item */}
                <button
                    onClick={toggleCart}
                    className="relative flex flex-col items-center gap-1 text-white/40 hover:text-brand-gold transition-colors"
                >
                    <div className="relative">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-black text-[9px] font-black rounded-full flex items-center justify-center border border-brand-black animate-bounceIn">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
                </button>
            </nav>
        </div>
    );
};

export default MobileBottomNav;
