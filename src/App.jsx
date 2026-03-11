import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './lib/queryClient';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import MainLayout from './components/layout/MainLayout';
import { ROUTES } from './constants/routes';
import { CartProvider } from './context/CartContext';
import CartDrawer from './features/cart/components/CartDrawer';
import ScrollToTop from './components/utils/ScrollToTop';
import WhatsAppFAB from './components/utils/WhatsAppFAB';
import ErrorBoundary from './components/common/ErrorBoundary';

import './assets/styles/App.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Collections = lazy(() => import('./pages/Collections'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Wholesale = lazy(() => import('./pages/Wholesale'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Search = lazy(() => import('./pages/Search'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'));

// Admin pages
const AdminLayout = lazy(() => import('./features/admin/components/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminCollections = lazy(() => import('./pages/admin/Collections'));
const AdminDiscounts = lazy(() => import('./pages/admin/Discounts'));
const AdminNewsletter = lazy(() => import('./pages/admin/NewsletterSubscribers'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-black">
    <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes with Main Layout */}
              <Route element={<MainLayout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.SHOP} element={<Collections />} />
                <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
                <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                <Route path={ROUTES.WHOLESALE} element={<Wholesale />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.PRODUCTS} element={<Products />} />
                <Route path={ROUTES.SEARCH} element={<Search />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route path={ROUTES.FAQ} element={<FAQ />} />
                <Route path={ROUTES.TERMS} element={<Terms />} />
                <Route path={ROUTES.PRIVACY} element={<Privacy />} />
                <Route path="*" element={
                  <div className="py-40 text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <Link to={ROUTES.HOME} className="text-brand-gold hover:underline">Go back home</Link>
                  </div>
                } />
              </Route>

              {/* Admin Routes - Isolated & Protected */}
              <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />

              <Route path="/admin" element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                </Suspense>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="collections" element={<AdminCollections />} />
                <Route path="discounts" element={<AdminDiscounts />} />
                <Route path="newsletter" element={<AdminNewsletter />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </Suspense>
          <CartDrawer />
          <Toaster position="top-right" />
        </CartProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
