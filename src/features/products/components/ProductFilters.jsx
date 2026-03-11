import React from 'react';

const ProductFilters = ({
  categories,
  sortOptions,
  availableColors,
  selectedCategory,
  selectedSort,
  priceRange,
  selectedColors,
  inStockOnly,
  searchQuery,
  onCategoryChange,
  onSortChange,
  onPriceChange,
  onColorsChange,
  onStockToggle,
  onSearchChange,
  onClearFilters,
  isOpen
}) => {
  const toggleColor = (hex) => {
    const newColors = selectedColors.includes(hex)
      ? selectedColors.filter(c => c !== hex)
      : [...selectedColors, hex];
    onColorsChange(newColors);
  };

  return (
    <aside className={`w-full lg:w-64 lg:sticky lg:top-24 h-fit shrink-0 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[2000px] mb-8' : 'max-h-0 lg:max-h-none'
      }`}>
      <div className="space-y-10 lg:space-y-12 pr-4">
        {/* Search */}
        <section>
          <div className="relative group">
            <input
              type="text"
              placeholder="Search archives..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-stone-50 border border-black/5 px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-colors pl-10"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-brand-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </section>

        {/* Categories */}
        <section>
          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/80 mb-5 pb-2 border-b border-black/10">
            Materials
          </h3>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`text-left text-xs font-semibold tracking-wide uppercase transition-all duration-200 px-3 py-2 rounded-sm ${selectedCategory === cat
                  ? 'text-brand-gold bg-brand-gold/5'
                  : 'text-black/40 hover:text-black/70 hover:bg-black/5'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Price Range */}
        <section>
          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/80 mb-5 pb-2 border-b border-black/10">
            Price Range (₦)
          </h3>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => onPriceChange({ ...priceRange, min: e.target.value })}
              className="w-full bg-stone-50 border border-black/5 px-3 py-2 text-xs focus:outline-none focus:border-brand-gold transition-colors"
            />
            <span className="text-black/20 text-xs">—</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => onPriceChange({ ...priceRange, max: e.target.value })}
              className="w-full bg-stone-50 border border-black/5 px-3 py-2 text-xs focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
        </section>

        {/* Colors */}
        <section>
          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/80 mb-5 pb-2 border-b border-black/10">
            Color Palette
          </h3>
          {availableColors.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {availableColors.map(color => (
                <button
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${selectedColors.includes(color.name)
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                    : 'border-black/10 text-black/50 hover:border-black/30 hover:text-black/70'
                    }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-black/30 italic">Loading colors...</p>
          )}
        </section>

        {/* Stock Status */}
        <section>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${inStockOnly ? 'bg-brand-gold' : 'bg-black/10'}`}>
              <input
                type="checkbox"
                className="hidden"
                checked={inStockOnly}
                onChange={(e) => onStockToggle(e.target.checked)}
              />
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${inStockOnly ? 'translate-x-4' : ''}`} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-black/60 group-hover:text-black transition-colors">
              In Stock Only
            </span>
          </label>
        </section>

        {/* Sort By */}
        <section>
          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/80 mb-5 pb-2 border-b border-black/10">
            Sort By
          </h3>
          <div className="flex flex-col gap-2">
            {sortOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={`text-left text-xs font-medium transition-colors duration-200 px-3 py-2 rounded-sm ${selectedSort === opt.value
                  ? 'text-brand-black bg-brand-gold/10 font-semibold'
                  : 'text-black/50 hover:text-black/80 hover:bg-black/5'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Clear Filters */}
        <button
          onClick={onClearFilters}
          className="w-full py-4 border border-black/10 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-brand-black hover:border-brand-black transition-all"
        >
          Reset All Filters
        </button>
      </div>
    </aside>
  );
};

export default ProductFilters;
