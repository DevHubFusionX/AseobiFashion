import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#050505] text-white flex font-body selection:bg-brand-gold/30">
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-500 w-full ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-20'}`}>
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 lg:hidden text-white/60 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-white/40 truncate max-w-[150px] md:max-w-none">Management Console</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-bold tracking-wider uppercase truncate max-w-[120px]">
                                {localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')).email.split('@')[0] : 'ADMIN'}
                            </span>
                            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">Authorized</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                            <span className="text-brand-gold font-bold text-xs">
                                {localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')).email[0].toUpperCase() : 'A'}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="p-4 md:p-8 lg:p-12 flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto animate-fadeIn">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
