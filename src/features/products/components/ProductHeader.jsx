import React from 'react';

const ProductHeader = () => {
  return (
    <header className="relative h-[50vh] lg:h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden bg-brand-black">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558487661-9d4f0192cf64?q=80&w=2000&auto=format&fit=crop"
          alt="Textile backgrounds"
          className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/40 to-brand-black"></div>
      </div>

      <div className="relative z-10 px-6 max-w-5xl mx-auto space-y-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="h-[1px] w-12 bg-brand-gold/60"></div>
          <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Archive Collection</span>
          <div className="h-[1px] w-12 bg-brand-gold/60"></div>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-tight">
          The Master <span className="text-brand-gold italic font-display">Edit</span>
        </h1>
        <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Explore our world-renowned repository of exceptional textiles. Each piece is hand-curated from the finest mills globally.
        </p>
      </div>
    </header>
  );
};

export default ProductHeader;
