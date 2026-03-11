import React from 'react';

const QuantitySelector = ({ quantity, unit, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-center border border-black/10 rounded-none bg-[#FAFAFA] h-14">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="px-6 h-full text-black/50 hover:text-brand-black hover:bg-black/5 transition-colors text-lg"
      >
        -
      </button>
      <span className="font-semibold w-16 text-center text-base">
        {quantity} {unit}{quantity > 1 ? 's' : ''}
      </span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="px-6 h-full text-black/50 hover:text-brand-black hover:bg-black/5 transition-colors text-lg"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
