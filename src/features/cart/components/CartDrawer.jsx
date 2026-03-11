import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { ROUTES } from '../../../constants/routes';

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    // Close when clicking outside (on the backdrop)
    const handleBackdropClick = (e) => {
        if (e.target.id === 'cart-backdrop') {
            toggleCart();
        }
    };

    
    return (
        <>
            {/* Backdrop */}
            <div
                id="cart-backdrop"
                onClick={handleBackdropClick}
                className={`fixed inset-0 bg-brand-black/60 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[200] transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 bg-white shrink-0">
                    <h2 className="text-xl font-semibold font-heading text-brand-black tracking-tight flex items-center gap-3">
                        Your Cart
                        <span className="bg-brand-gold/10 text-brand-gold text-xs px-2 py-0.5 rounded-full font-bold">
                            {cartItems.length}
                        </span>
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors group"
                    >
                        <svg className="w-5 h-5 text-black/50 group-hover:text-brand-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content - Scrollable List */}
                <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center px-4">
                            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-brand-black mb-2">Your cart is empty</h3>
                            <p className="text-sm text-black/50 mb-8 max-w-[250px]">
                                Discover our premium collections and start your next masterpiece.
                            </p>
                            <button
                                onClick={toggleCart}
                                className="text-brand-gold font-semibold text-sm tracking-widest border-b border-brand-gold pb-1 hover:text-brand-black hover:border-brand-black transition-colors"
                            >
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item, index) => (
                                <div key={`${item._id}-${item.selectedColor}-${index}`} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-black/5">
                                    {/* Item Image */}
                                    <div className="w-24 h-28 bg-stone-100 rounded-md overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex flex-col flex-1 py-1">
                                        <div className="flex justify-between items-start gap-4 mb-1">
                                            <h4 className="font-semibold text-brand-black truncate pr-4 text-sm">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item._id, item.selectedColor)}
                                                className="text-black/30 hover:text-red-500 transition-colors shrink-0"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs px-2 py-0.5 bg-brand-gold/10 text-brand-gold rounded-full font-semibold">{item.selectedColor}</span>
                                            <span className="text-xs text-black/50 font-medium">₦{item.price.toLocaleString()} / {item.unit || 'yard'}</span>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            {/* Quantity Adjuster */}
                                            <div className="flex items-center border border-black/10 rounded-md bg-[#FAFAFA]">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.selectedColor, item.quantity - 1)}
                                                    className="px-3 py-1 text-black/50 hover:text-brand-black hover:bg-black/5 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.selectedColor, item.quantity + 1)}
                                                    className="px-3 py-1 text-black/50 hover:text-brand-black hover:bg-black/5 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Item Subtotal */}
                                            <span className="font-semibold text-brand-black">
                                                ₦{(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - Checkout Action */}
                {cartItems.length > 0 && (
                    <div className="px-6 py-6 bg-white border-t border-black/5 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10 relative">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-black/50 font-medium">Subtotal</span>
                            <span className="text-2xl font-semibold text-brand-black">₦{cartTotal.toLocaleString()}</span>
                        </div>

                        <p className="text-xs text-black/40 text-center mb-6">
                            Shipping, taxes, and discounts calculated at checkout.
                        </p>

                        <Link
                            to="/checkout"
                            onClick={toggleCart}
                            className="w-full bg-brand-gold text-brand-black py-4 rounded-none font-semibold tracking-widest text-sm hover:bg-brand-black hover:text-brand-gold transition-colors flex items-center justify-center gap-2 group"
                        >
                            SECURE CHECKOUT
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
