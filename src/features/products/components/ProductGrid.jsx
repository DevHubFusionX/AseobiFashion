import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const ProductGrid = ({ products, onClearFilter, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-32 lg:py-48 text-center border-2 border-dashed border-black/10 rounded-lg">
        <span className="text-brand-gold text-4xl lg:text-5xl mb-6 block">✧</span>
        <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-brand-black mb-3">No Matching Archives</h3>
        <p className="text-black/50 text-sm max-w-md mx-auto leading-relaxed px-6">
          We are currently sourcing new materials in this category. Please check back soon or explore our other collections.
        </p>
        <button
          onClick={onClearFilter}
          className="mt-8 px-6 py-3 bg-brand-gold text-brand-black text-xs font-semibold uppercase tracking-wider hover:bg-brand-black hover:text-brand-gold transition-colors"
        >
          View All Products
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {products.map((product, index) => (
        product && product._id ? <ProductCard key={product._id} product={product} index={index} /> : null
      ))}
    </div>
  );
};

export default ProductGrid;
