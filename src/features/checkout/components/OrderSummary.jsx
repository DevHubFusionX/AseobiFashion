import React from 'react';

const OrderSummary = ({ cartItems, cartTotal, shipping, taxes = 0, onDiscountApply, discount }) => {
  const [discountCode, setDiscountCode] = React.useState('');
  const [isApplying, setIsApplying] = React.useState(false);

  const discountAmount = discount
    ? (discount.type === 'percentage' ? (cartTotal * discount.value / 100) : discount.value)
    : 0;

  const finalTotal = cartTotal + shipping + taxes - discountAmount;

  const handleApplyDiscount = async () => {
    if (!discountCode) return;
    setIsApplying(true);
    try {
      await onDiscountApply(discountCode);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="w-full lg:w-2/5 lg:sticky lg:top-8 bg-white p-8 rounded-sm shadow-sm border border-black/5">
      <h2 className="text-lg font-semibold tracking-tight mb-6">Order Summary</h2>
      <div className="space-y-4 mb-6 border-b border-black/5 pb-6 max-h-[400px] overflow-y-auto pr-2">
        {cartItems.length === 0 ? (
          <p className="text-sm text-black/50">Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-16 h-20 bg-stone-100 shrink-0 relative border border-black/5">
                <span className="absolute -top-2 -right-2 bg-brand-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {item.quantity}
                </span>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <h4 className="font-semibold text-sm text-brand-black truncate">{item.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-brand-gold/10 text-brand-gold rounded-full font-semibold">{item.selectedColor}</span>
                  <span className="text-xs text-black/50">₦{item.price.toLocaleString()} / {item.unit || 'yard'}</span>
                </div>
                <span className="text-sm font-semibold text-brand-black text-right mt-1">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Discount Code Input */}
      <div className="mb-6 pb-6 border-b border-black/5">
        <label className="block text-[10px] font-semibold tracking-widest text-black/40 uppercase mb-3">Discount Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            placeholder="ENTER CODE"
            className="flex-1 bg-stone-50 border border-black/5 px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-colors"
          />
          <button
            onClick={handleApplyDiscount}
            disabled={isApplying || !discountCode}
            className="bg-brand-black text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-brand-gold transition-colors disabled:opacity-50"
          >
            {isApplying ? '...' : 'APPLY'}
          </button>
        </div>
        {discount && (
          <div className="mt-3 flex items-center justify-between bg-brand-gold/5 border border-brand-gold/10 px-3 py-2">
            <span className="text-[10px] font-bold text-brand-gold tracking-widest">{discount.code} APPLIED</span>
            <button onClick={() => onDiscountApply(null)} className="text-brand-gold hover:text-brand-black">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3 text-sm mb-6 pb-6 border-b border-black/5">
        <div className="flex justify-between items-center text-black/60">
          <span>Subtotal</span>
          <span className="font-medium text-brand-black">₦{cartTotal.toLocaleString()}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-brand-gold font-medium">
            <span>Discount ({discount.value}{discount.type === 'percentage' ? '%' : ''})</span>
            <span>-₦{discountAmount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-black/60">
          <span>Estimated Shipping</span>
          <span className="font-medium text-brand-black">₦{cartTotal > 0 ? shipping.toLocaleString() : '0'}</span>
        </div>
        {taxes > 0 && (
          <div className="flex justify-between items-center text-black/60">
            <span>Estimated Taxes</span>
            <span className="font-medium text-brand-black">₦{taxes.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-end">
        <span className="font-semibold text-brand-black">Total</span>
        <div className="text-right">
          <span className="text-[10px] text-black/40 mr-2">NGN</span>
          <span className="text-2xl font-bold text-brand-black">₦{cartTotal > 0 ? (finalTotal > 0 ? finalTotal : 0).toLocaleString() : '0'}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
