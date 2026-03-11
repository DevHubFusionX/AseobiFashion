import React from 'react';

const ProductSpecs = ({ details = [] }) => {
  if (details.length === 0) return null;
  
  return (
    <div className="border-t border-black/10 pt-6 sm:pt-8">
      <h3 className="font-semibold text-sm sm:text-base uppercase tracking-widest text-black/70 mb-4 sm:mb-6">Specifications</h3>
      <ul className="space-y-2 sm:space-y-3">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-2 sm:gap-3 text-black/60 text-sm sm:text-base">
            <span className="text-brand-gold mt-1">✦</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSpecs;
