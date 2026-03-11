import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import WhatsAppFAB from '../utils/WhatsAppFAB';
import ScrollToTop from '../utils/ScrollToTop';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppFAB />
            <MobileBottomNav />
        </div>
    );
};

export default MainLayout;
