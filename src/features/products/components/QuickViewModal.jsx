import React from 'react';
import { useCart } from '../../../context/CartContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const [selectedColor, setSelectedColor] = React.useState(product.colors?.[0]);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const allImages = [product.image];
    if (product?.colorImages && product.colorImages.length > 0) {
        product.colorImages.forEach(ci => {
            if (ci.image && ci.image !== product.image) {
                allImages.push(ci.image);
            }
        });
    }
    const images = allImages.filter(Boolean);

    React.useEffect(() => {
        if (selectedColor && product.colorImages) {
            const colorImage = product.colorImages.find(ci => ci.color === selectedColor);
            if (colorImage) {
                const index = images.indexOf(colorImage.image);
                if (index !== -1) {
                    setCurrentImageIndex(index);
                }
            } else {
                setCurrentImageIndex(0);
            }
        }
    }, [selectedColor, product]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!isOpen) return null;

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1, selectedColor);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm animate-fadeIn"
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-4xl overflow-hidden rounded-sm shadow-2xl flex flex-col md:flex-row h-full max-h-[80vh] md:h-auto animate-slideUp">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur hover:bg-white transition-colors rounded-full text-brand-black shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left: Image Section */}
                <div className="md:w-1/2 h-64 md:h-auto bg-stone-100 relative group">
                    <img
                        src={images[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                                            currentImageIndex === idx ? 'bg-brand-gold w-4' : 'bg-white/60 hover:bg-white'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Right: Details Section */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-2">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold">
                            {product.tag || 'Luxury Collection'}
                        </span>
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-brand-black mb-4">
                        {product.name}
                    </h2>

                    <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-black/5">
                        <span className="text-2xl font-bold text-brand-black">₦{product.price.toLocaleString()}</span>
                        <span className="text-sm text-black/40 font-medium">/ yard</span>
                    </div>

                    <p className="text-sm leading-relaxed text-black/50 mb-8 font-normal">
                        {product.description}
                    </p>

                    <div className="space-y-6 mb-10">
                        {/* Color Selection */}
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">
                                Select Color
                            </span>
                            <div className="flex gap-2 flex-wrap">
                                {product.colors?.map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 text-xs font-semibold rounded-sm transition-all ${
                                            selectedColor === color
                                                ? 'bg-brand-gold text-brand-black'
                                                : 'bg-black/5 text-black/60 hover:bg-black/10'
                                        }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-brand-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors duration-300 rounded-sm"
                        >
                            Add to Cart
                        </button>
                        <a
                            href={`/product/${product._id}`}
                            className="text-center text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 hover:text-brand-black transition-colors py-2"
                        >
                            View Full Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
