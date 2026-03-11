import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();

    const menuItems = [
        {
            name: 'Overview',
            path: '/admin',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            name: 'Archives',
            path: '/admin/products',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            name: 'Orders',
            path: '/admin/orders',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            name: 'Collections',
            path: '/admin/collections',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            name: 'Marketing',
            path: ROUTES.ADMIN_DISCOUNTS,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
            )
        },
        {
            name: 'Audience',
            path: ROUTES.ADMIN_NEWSLETTER,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];

    return (
        <aside className={`fixed top-0 left-0 h-full bg-[#0a0a0a] border-r border-white/5 transition-all duration-500 z-50 overflow-hidden flex flex-col 
            ${isOpen ? 'w-72 translate-x-0' : 'w-20 lg:translate-x-0 -translate-x-full'} 
            lg:fixed`}>
            {/* Sidebar Header */}
            <div className="h-24 flex items-center px-6 mb-8 mt-2">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 shrink-0">
                        <img src="/Logo.svg" alt="Admin" className="w-full h-full object-contain brightness-125" />
                    </div>
                    {isOpen && (
                        <div className="flex flex-col animate-fadeIn">
                            <span className="text-sm font-black tracking-[0.3em] text-white">FAVOUR</span>
                            <span className="text-[9px] font-bold text-brand-gold tracking-[0.2em] uppercase">Control Panel</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-sm transition-all duration-300 group ${isActive
                                ? 'bg-brand-gold text-brand-black shadow-lg shadow-brand-gold/10'
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className={`${isActive ? 'text-brand-black' : 'text-brand-gold/60 group-hover:text-brand-gold'} transition-colors`}>
                                {item.icon}
                            </span>
                            {isOpen && (
                                <span className="text-xs font-bold uppercase tracking-widest animate-fadeIn">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center gap-4 px-4 py-3.5 text-white/40 hover:text-white transition-colors"
                >
                    <svg className={`w-5 h-5 transition-transform duration-500 ${!isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    {isOpen && <span className="text-xs font-bold uppercase tracking-widest">Collapse</span>}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
