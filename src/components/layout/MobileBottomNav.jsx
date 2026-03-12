import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCart } from '../../hooks/useCart';

const MobileBottomNav = () => {
    const location = useLocation();
    const { toggleCart, cartCount } = useCart();

    const navItems = [
        {
            name: 'Home',
            path: ROUTES.HOME,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Shop',
            path: ROUTES.SHOP,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            name: 'Products',
            path: ROUTES.PRODUCTS,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            name: 'Search',
            path: ROUTES.SEARCH,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-[100] animate-slideUp">
            <nav className="bg-brand-black/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl flex items-center justify-between pointer-events-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${isActive 
                                ? 'text-brand-gold bg-brand-gold/10' 
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {item.icon}
                            <span className="text-[9px] font-bold uppercase tracking-wider">{item.name}</span>
                        </Link>
                    );
                })}

                {/* Cart Item */}
                <button
                    onClick={toggleCart}
                    className="relative flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-white/50 hover:text-brand-gold hover:bg-white/5 transition-all duration-200"
                >
                    <div className="relative">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-black text-[8px] font-black rounded-full flex items-center justify-center border border-brand-black animate-bounceIn">
                                {cartCount > 9 ? '9+' : cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider">Cart</span>
                </button>
            </nav>
        </div>
    );
};

export default MobileBottomNav;