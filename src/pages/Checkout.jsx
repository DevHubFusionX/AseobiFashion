import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useCart } from '../hooks/useCart';
import ContactForm from '../features/checkout/components/ContactForm';
import ShippingForm from '../features/checkout/components/ShippingForm';
import OrderSummary from '../features/checkout/components/OrderSummary';
import { useCreateOrder } from '../hooks/useOrders';
import toast from 'react-hot-toast';

import { discountService } from '../services/discountService';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { mutateAsync: createOrder, isLoading: isCreating } = useCreateOrder();

    const [deliveryMethod, setDeliveryMethod] = useState('Delivery'); // 'Delivery' or 'Pickup'
    const [contactData, setContactData] = useState(null);
    const [shippingData, setShippingData] = useState(null);
    const [discount, setDiscount] = useState(null);

    const discountAmount = discount
        ? (discount.type === 'percentage' ? (cartTotal * discount.value / 100) : discount.value)
        : 0;

    const shipping = deliveryMethod === 'Delivery' ? 1500 : 0;
    const finalTotal = Math.max(0, cartTotal + shipping - discountAmount);

    const handleDiscountApply = async (code) => {
        if (!code) {
            setDiscount(null);
            return;
        }
        try {
            const result = await discountService.validateCode(code, cartTotal);
            setDiscount(result);
            toast.success('Discount applied!');
        } catch (error) {
            setDiscount(null);
            toast.error(error.message || 'Invalid discount code');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!contactData) {
            toast.error('Please fill in your contact information');
            return;
        }

        if (deliveryMethod === 'Delivery' && !shippingData) {
            toast.error('Please fill in your shipping address');
            return;
        }

        try {
            const orderData = {
                customerInfo: {
                    name: deliveryMethod === 'Delivery' ? `${shippingData.firstName} ${shippingData.lastName}` : contactData.name || 'Guest',
                    email: contactData.email,
                    phone: deliveryMethod === 'Delivery' ? shippingData.phone : contactData.phone
                },
                items: cartItems.map(item => ({
                    product: item.id || item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    color: item.selectedColor || null,
                    image: item.image || null
                })),
                deliveryMethod,
                shippingAddress: deliveryMethod === 'Delivery' ? {
                    street: shippingData.address,
                    city: shippingData.city,
                    state: shippingData.state || 'N/A',
                    country: shippingData.country || 'Nigeria',
                    zipCode: shippingData.postalCode || '00000'
                } : undefined,
                totalAmount: finalTotal
            };

            const createdOrder = await createOrder(orderData);

            // Redirect to WhatsApp
            openWhatsAppCheckout(createdOrder);

            // Clear cart and redirect to success
            clearCart();
            // navigate(ROUTES.ORDER_SUCCESS); // If we had this route, but WhatsApp opens in new tab
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error(error.response?.data?.message || 'Failed to process order');
        }
    };

    const openWhatsAppCheckout = (order) => {
        const businessNumber = '2348000000000'; // Replace with actual business number
        const lines = [];
        lines.push(`🛍️ *New Order: #${order._id.slice(-6).toUpperCase()}*`);
        lines.push('');
        lines.push(`👤 *Customer:* ${order.customerInfo.name}`);
        lines.push(`📞 *Phone:* ${order.customerInfo.phone}`);
        lines.push(`🚚 *Method:* ${order.deliveryMethod}`);

        if (order.deliveryMethod === 'Delivery') {
            lines.push(`📍 *Address:* ${order.shippingAddress.street}, ${order.shippingAddress.city}`);
        } else {
            lines.push(`📍 *Pickup:* [Store Location Details Here]`);
        }

        lines.push('');
        lines.push(`*Items:*`);
        order.items.forEach((item, idx) => {
            lines.push(`${idx + 1}. ${item.name} x${item.quantity} — ₦${(item.price * item.quantity).toLocaleString()}`);
        });

        if (discount) {
            lines.push('');
            lines.push(`🎁 *Discount Applied (${discount.code}):* -₦${discountAmount.toLocaleString()}`);
        }

        lines.push('');
        lines.push(`*Total Amount:* ₦${order.totalAmount.toLocaleString()}`);
        lines.push('');
        lines.push('Please confirm availability and share payment details. Thank you! 🙏');

        const message = encodeURIComponent(lines.join('\n'));
        const url = `https://wa.me/${businessNumber}?text=${message}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-[#FAFAFA] min-h-screen pt-24 pb-20 font-body text-brand-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12 border-b border-black/5 pb-6">
                    <Link to={ROUTES.HOME} className="flex items-center gap-2">
                        <img src="/Logo.svg" alt="Logo" className="w-5 h-5 object-contain invert" />
                        <span className="font-heading font-semibold text-xl tracking-tight text-brand-black">Favour</span>
                    </Link>
                    <span className="text-sm font-semibold tracking-widest uppercase text-black/40">Checkout</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="w-full lg:w-3/5">
                        {/* Delivery Method Toggle */}
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5 mb-8">
                            <h2 className="text-lg font-semibold tracking-tight mb-6 flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xs">0</span>
                                Delivery Method
                            </h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setDeliveryMethod('Delivery')}
                                    className={`flex-1 py-4 border ${deliveryMethod === 'Delivery' ? 'border-brand-gold bg-brand-gold/5 text-brand-gold' : 'border-black/10 text-black/40'} font-semibold tracking-widest text-xs transition-all`}
                                >
                                    DELIVERY
                                </button>
                                <button
                                    onClick={() => setDeliveryMethod('Pickup')}
                                    className={`flex-1 py-4 border ${deliveryMethod === 'Pickup' ? 'border-brand-gold bg-brand-gold/5 text-brand-gold' : 'border-black/10 text-black/40'} font-semibold tracking-widest text-xs transition-all`}
                                >
                                    PICKUP
                                </button>
                            </div>
                        </div>

                        <ContactForm onChange={setContactData} />

                        {deliveryMethod === 'Delivery' && (
                            <ShippingForm onChange={setShippingData} />
                        )}

                        <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5">
                            <h2 className="text-lg font-semibold tracking-tight mb-6 flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xs">
                                    {deliveryMethod === 'Delivery' ? '3' : '2'}
                                </span>
                                Payment & Confirmation
                            </h2>
                            <p className="text-sm text-black/60 mb-8">
                                Clicking the button below will initialize your order and open WhatsApp to finalize payment and delivery details with our team.
                            </p>

                            <button
                                type="button"
                                onClick={handleFormSubmit}
                                disabled={isCreating || cartItems.length === 0}
                                className="w-full bg-brand-black text-white py-4 rounded-none font-semibold tracking-widest text-sm hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isCreating ? 'PROCESSING...' : 'CONFIRM VIA WHATSAPP'}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </button>
                        </div>
                    </div>

                    <OrderSummary
                        cartItems={cartItems}
                        cartTotal={cartTotal}
                        shipping={shipping}
                        taxes={0}
                        onDiscountApply={handleDiscountApply}
                        discount={discount}
                    />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
