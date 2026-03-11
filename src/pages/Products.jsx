import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductHeader from '../features/products/components/ProductHeader';
import ProductFilters from '../features/products/components/ProductFilters';
import ProductGrid from '../features/products/components/ProductGrid';
import { useInfiniteProducts, useFilterOptions } from '../hooks/useProducts';
import { useInView } from 'react-intersection-observer';
import SEO from '../components/common/SEO';

const Products = () => {
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category');
    const { ref, inView } = useInView();

    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All');
    const [selectedSort, setSelectedSort] = useState('newest');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedColors, setSelectedColors] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [categoryFromUrl]);

    // Fetch dynamic filter options from the database
    const { data: filterOptions } = useFilterOptions();

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteProducts({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        sort: selectedSort,
        minPrice: priceRange.min || undefined,
        maxPrice: priceRange.max || undefined,
        colors: selectedColors.length > 0 ? selectedColors.join(',') : undefined,
        inStock: inStockOnly || undefined,
        search: searchQuery || undefined,
        limit: 12
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    // Dynamic categories from DB, with 'All' prepended
    const categories = useMemo(() => {
        const dbCategories = filterOptions?.categories || [];
        return ['All', ...dbCategories];
    }, [filterOptions]);

    // Dynamic colors from DB — displayed as name-based pills, not hex swatches
    const availableColors = useMemo(() => {
        const dbColors = filterOptions?.colors || [];
        return dbColors.map(name => ({ name, hex: name }));
    }, [filterOptions]);

    const sortOptions = [
        { label: 'Newest Arrivals', value: 'newest' },
        { label: 'Price: Low → High', value: 'price-asc' },
        { label: 'Price: High → Low', value: 'price-desc' },
        { label: 'Most Popular', value: 'popular' },
    ];

    const products = data?.pages.flatMap(page => page.data) || [];
    const totalCount = data?.pages[0]?.total || 0;

    const handleClearFilters = () => {
        setSelectedCategory('All');
        setPriceRange({ min: '', max: '' });
        setSelectedColors([]);
        setInStockOnly(false);
        setSearchQuery('');
        setSelectedSort('newest');
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading products</p>
                    <p className="text-black/50 text-sm">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-body">
            <SEO
                title={selectedCategory === 'All' ? 'Shop All Products' : `Luxury ${selectedCategory} Fabrics`}
                description={`Browse our premium collection of ${selectedCategory === 'All' ? 'textiles' : selectedCategory + ' fabrics'}. High-quality materials for designers and boutiques.`}
            />
            <ProductHeader />

            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="lg:hidden w-full flex items-center justify-between bg-brand-black text-white px-6 py-4 mb-6 rounded-sm"
                >
                    <span className="text-sm font-semibold tracking-wider uppercase">Filters & Sort</span>
                    <svg className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    <ProductFilters
                        categories={categories}
                        sortOptions={sortOptions}
                        availableColors={availableColors}
                        selectedCategory={selectedCategory}
                        selectedSort={selectedSort}
                        priceRange={priceRange}
                        selectedColors={selectedColors}
                        inStockOnly={inStockOnly}
                        searchQuery={searchQuery}
                        onCategoryChange={(cat) => {
                            setSelectedCategory(cat);
                            setIsFilterOpen(false);
                        }}
                        onSortChange={(sort) => {
                            setSelectedSort(sort);
                            setIsFilterOpen(false);
                        }}
                        onPriceChange={setPriceRange}
                        onColorsChange={setSelectedColors}
                        onStockToggle={setInStockOnly}
                        onSearchChange={setSearchQuery}
                        onClearFilters={handleClearFilters}
                        isOpen={isFilterOpen}
                    />

                    <main className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 lg:mb-16">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brand-black mb-1">
                                    {selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}
                                </h2>
                                <p className="text-[10px] text-black/40 font-bold uppercase tracking-[0.2em]">
                                    {totalCount} {totalCount === 1 ? 'Archive' : 'Archives'} Found
                                </p>
                            </div>

                            {(selectedCategory !== 'All' || selectedColors.length > 0 || inStockOnly || searchQuery || priceRange.min || priceRange.max) && (
                                <button
                                    onClick={handleClearFilters}
                                    className="text-[10px] font-bold tracking-[0.15em] uppercase text-black/30 hover:text-brand-gold transition-colors flex items-center gap-2"
                                >
                                    <span>Clear All Filters</span>
                                    <span className="text-sm">×</span>
                                </button>
                            )}
                        </div>

                        <ProductGrid
                            products={products}
                            selectedCategory={selectedCategory}
                            onClearFilter={handleClearFilters}
                            isLoading={isLoading}
                        />

                        {/* Load More Trigger */}
                        <div ref={ref} className="mt-12 py-8 flex justify-center">
                            {isFetchingNextPage ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">Loading more archives...</p>
                                </div>
                            ) : hasNextPage ? (
                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">Scroll for more</p>
                            ) : products.length > 0 ? (
                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">End of collection</p>
                            ) : null}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
