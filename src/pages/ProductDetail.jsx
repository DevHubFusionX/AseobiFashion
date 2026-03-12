import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useCart } from '../hooks/useCart';
import { useProduct, useProducts } from '../hooks/useProducts';
import ImageGallery from '../features/products/components/ImageGallery';
import ColorSelector from '../features/products/components/ColorSelector';
import QuantitySelector from '../features/products/components/QuantitySelector';
import ProductSpecs from '../features/products/components/ProductSpecs';
import ProductCard from '../features/products/components/ProductCard';
import SEO from '../components/common/SEO';

// Design intent: non-generic product page with asymmetric split, sticky info, airy whitespace, and calm microinteractions.
// We keep logic intact and focus on layout, typography, and interaction affordances.

const ProductDetail = () => {
    const { id } = useParams();
    const { data: productData, isLoading, error } = useProduct(id);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');

    const product = productData;

    const colorOptions = useMemo(() => {
        return product?.colors?.map(color => ({ hex: color, name: color })) || [];
    }, [product?.colors]);
    
    const [selectedImage, setSelectedImage] = useState(product?.image);

    const allImages = [product?.image];
    const imageToColorMap = { [product?.image]: product?.colors?.[0] };

    if (product?.colorImages && product.colorImages.length > 0) {
        product.colorImages.forEach(ci => {
            if (ci.image && ci.image !== product.image) {
                allImages.push(ci.image);
                imageToColorMap[ci.image] = ci.color;
            }
        });
    }
    const images = allImages.filter(Boolean);

    React.useEffect(() => {
        if (colorOptions.length > 0 && !selectedColor) {
            setSelectedColor(colorOptions[0].hex);
        }
    }, [colorOptions, selectedColor]);

    React.useEffect(() => {
        if (selectedColor && product?.colorImages) {
            const colorImage = product.colorImages.find(ci => ci.color === selectedColor);
            if (colorImage) {
                setSelectedImage(colorImage.image);
            } else {
                setSelectedImage(product.image);
            }
        }
    }, [selectedColor, product]);

    const handleImageClick = (clickedImage) => {
        const color = imageToColorMap[clickedImage];
        if (color) {
            setSelectedColor(color);
            setSelectedImage(clickedImage);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedColor);
    };

    if (!product && !isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <p className="text-red-600 mb-3">Product not found</p>
                    <Link to={ROUTES.PRODUCTS} className="inline-block text-brand-black border border-black/10 hover:border-brand-gold/50 hover:text-brand-gold px-4 py-2 text-xs tracking-widest uppercase transition-colors">Back to Products</Link>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-12 h-12 border-[3px] border-black/10 border-t-brand-gold rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-black/50 text-sm tracking-wide">Loading product…</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <p className="text-red-600 mb-2">Error loading product</p>
                    <p className="text-black/50 text-xs">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 font-body text-brand-black">
            <SEO
                title={product?.name}
                description={product?.description}
                image={product?.image}
                type="product"
            />
            {/* Breadcrumbs: quiet, minimalist to avoid crowding hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
                <nav className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-widest uppercase text-black/40">
                    <Link to={ROUTES.HOME} className="hover:text-brand-gold transition-colors">Home</Link>
                    <span className="text-black/20">/</span>
                    <Link to={ROUTES.SHOP} className="hover:text-brand-gold transition-colors">{product?.category || 'Collection'}</Link>
                    <span className="text-black/20">/</span>
                    <span className="text-brand-black/70 truncate max-w-[50vw]">{product?.name}</span>
                </nav>
            </div>

            {/* Core layout: asymmetrical split with vertical gallery rail and sticky info panel */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-start">
                {/* Media column: spans 7 on large for visual dominance */}
                <div className="lg:col-span-7">
                    <div className="group relative rounded-sm overflow-hidden border border-black/5 bg-[#F8F8F8]">
                        {/* ImageGallery is assumed to render a main image with thumbnails. We wrap it to provide unified styling. */}
                        <ImageGallery images={images} productName={product?.name} selectedImage={selectedImage} onImageClick={handleImageClick} />
                        {/* Subtle gradient overlay for depth */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.02] via-transparent to-transparent"></div>
                    </div>
                    {/* Micro trust row under gallery for rhythm */}
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] sm:text-xs text-black/70">
                        {[
                            {
                                label: 'Secure Payment', icon: (
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                )
                            },
                            {
                                label: '24/7 Support', icon: (
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                )
                            },
                            {
                                label: 'Global Delivery', icon: (
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                )
                            },
                            {
                                label: 'Quality Verified', icon: (
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                )
                            },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded border border-black/5 bg-white/80 backdrop-blur-sm">
                                {item.icon}
                                <span className="font-semibold uppercase tracking-wider">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info column: sticky to keep actions visible */}
                <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
                    <header className="space-y-2">
                        <h1 className="text-[28px] sm:text-4xl md:text-[44px] leading-tight font-semibold tracking-[-0.02em]">{product?.name}</h1>
                        <div className="flex items-center gap-3 text-black/60">
                            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest bg-black/5 px-2.5 py-1 rounded">{product?.category}</span>
                            <span aria-hidden className="text-black/20">•</span>
                            <span className="text-xs">SKU: {product?._id?.slice(-6).toUpperCase()}</span>
                        </div>
                    </header>

                    <div className="text-2xl sm:text-[28px] font-semibold text-brand-black">
                        <span className="text-brand-gold">₦{product?.price?.toLocaleString()}</span>
                        <span className="text-xs sm:text-sm text-black/50 font-medium ml-2">/ yard</span>
                    </div>

                    {/* Description with balanced measure for readability */}
                    <p className="text-black/70 leading-relaxed text-[15px] sm:text-base max-w-prose">{product?.description}</p>

                    {/* Social Sharing */}
                    <div className="flex items-center gap-4 pt-2">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30">Share:</span>
                        <div className="flex gap-4">
                            {[
                                {
                                    name: 'Instagram', icon: (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    ), url: `https://instagram.com/share?url=${window.location.href}`
                                },
                                {
                                    name: 'Twitter', icon: (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                    ), url: `https://twitter.com/intent/tweet?url=${window.location.href}&text=Discover%20this%20archived%20textile%20at%20Moderate's%20Textile:%20${product?.name}`
                                },
                                {
                                    name: 'Facebook', icon: (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                    ), url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
                                }
                            ].map(platform => (
                                <a
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black/20 hover:text-brand-gold transition-colors"
                                    aria-label={`Share on ${platform.name}`}
                                >
                                    {platform.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Color selector */}
                    <div className="pt-2">
                        <ColorSelector
                            colors={colorOptions}
                            selectedColor={selectedColor}
                            onColorChange={setSelectedColor}
                        />
                    </div>

                    {/* Quantity + CTA block: tactile interactions */}
                    <div className="space-y-3">
                        <button
                            onClick={handleAddToCart}
                            className="group w-full h-14 sm:h-16 border border-black/10 bg-brand-gold text-brand-black rounded-sm font-semibold tracking-widest text-[12px] sm:text-sm flex items-center justify-center gap-3 transition-all duration-200 hover:bg-brand-black hover:text-brand-gold shadow-[0_10px_30px_rgba(197,160,89,0.25)] active:scale-[0.99]"
                        >
                            <span className="translate-y-[0.5px]">Add to cart</span>
                            <span className="text-brand-black/40 group-hover:text-brand-gold/40">|</span>
                            <span>₦{(product?.price * quantity).toLocaleString()}</span>
                        </button>
                        <QuantitySelector
                            quantity={quantity}
                            unit="yard"
                            onQuantityChange={setQuantity}
                        />
                    </div>

                    {/* Specs / details area: progressive disclosure keeps UI calm */}
                    <div className="pt-2 border-t border-black/5">
                        <ProductSpecs details={product?.details} />
                    </div>

                    {/* Shipping / returns note */}
                    <div className="grid grid-cols-2 gap-3 text-[11px] text-black/70">
                        <div className="rounded-sm border border-black/5 p-3 bg-white/90">Ships worldwide in 3–7 days</div>
                        <div className="rounded-sm border border-black/5 p-3 bg-white/90">Free returns within 14 days</div>
                    </div>
                </aside>
            </div>

            {/* Related products with measured whitespace to close the page */}
            <RelatedProducts category={product?.category} currentProductId={product?._id} />
        </div>
    );
};

const RelatedProducts = ({ category, currentProductId }) => {
    const { data: productsData, isLoading } = useProducts({ category, limit: 10 });
    const products = productsData?.filter(p => p._id !== currentProductId).slice(0, 4) || [];

    if (isLoading || products.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-16">
            <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-brand-black">Related archives</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-black/10 via-black/5 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {products.map((p, idx) => (
                    <ProductCard key={p._id} product={p} index={idx} />
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;
