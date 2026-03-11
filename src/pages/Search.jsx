import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../features/products/components/ProductCard';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const allProducts = [
        {
            id: 1,
            name: "Luminous Silk Crepe",
            description: "A lightweight, fluid silk with a soft crepe texture, perfect for evening wear.",
            price: 145.00,
            unit: "yard",
            colors: ["#ffffff", "#000000", "#c5a059", "#7c1c1c"],
            image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop",
            tag: "Bestseller",
            category: "Silk"
        },
        {
            id: 2,
            name: "Midnight Velvet",
            description: "Plush, dense velvet with an obsidian sheen for dramatic evening tailoring.",
            price: 210.00,
            unit: "yard",
            colors: ["#0a0a0a", "#1a1a2e", "#2e1a1a"],
            image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1000&auto=format&fit=crop",
            category: "Velvet"
        },
        {
            id: 3,
            name: "Heritage Cashmere Blend",
            description: "Ultra-soft woven cashmere and fine wool blend for structuring luxury outerwear.",
            price: 325.00,
            unit: "yard",
            colors: ["#dfc18d", "#d4d4d4", "#5e5e5e"],
            image: "https://images.unsplash.com/photo-1610419131604-db5b5ca49a1d?q=80&w=1000&auto=format&fit=crop",
            tag: "New Arrival",
            category: "Wool"
        },
        {
            id: 4,
            name: "Organic Linen Weave",
            description: "Crisp, lightweight linen ideal for summer tailoring and relaxed resort wear.",
            price: 85.00,
            unit: "yard",
            colors: ["#fafafa", "#e5e5e5", "#bfa373"],
            image: "https://images.unsplash.com/photo-1596756616428-2b8d00ee9bdf?q=80&w=1000&auto=format&fit=crop",
            category: "Linen"
        },
        {
            id: 5,
            name: "Golden Organza Silk",
            description: "Sheer, stiff silk organza with a subtle golden shimmer for structural overlays.",
            price: 110.00,
            unit: "yard",
            colors: ["#c5a059", "#dfc18d"],
            image: "https://images.unsplash.com/photo-1551046777-ab6c1ebf9495?q=80&w=1000&auto=format&fit=crop",
            category: "Silk"
        },
        {
            id: 6,
            name: "Brushed Merino Wool",
            description: "Medium-weight suiting wool with a brushed finish for an incredibly soft hand.",
            price: 180.00,
            unit: "yard",
            colors: ["#000000", "#333333", "#4a4a4a"],
            image: "https://images.unsplash.com/photo-1606170033648-5d55a3edf31e?q=80&w=1000&auto=format&fit=crop",
            category: "Wool"
        }
    ];

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return [];
        
        const query = searchQuery.toLowerCase();
        return allProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <div className="bg-white min-h-screen font-body pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6 sm:px-8">
                {/* Search Header */}
                <div className="mb-12">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brand-black mb-6">Search Products</h1>
                    
                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, category, or description..."
                            className="w-full px-6 py-4 pr-12 border-2 border-black/10 rounded-lg focus:border-brand-gold focus:outline-none text-sm transition-colors"
                            autoFocus
                        />
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Results */}
                {searchQuery.trim() === '' ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-brand-black mb-2">Start Your Search</h3>
                        <p className="text-black/50 text-sm max-w-md mx-auto">
                            Enter keywords to find the perfect textile for your project
                        </p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <>
                        <p className="text-sm text-black/50 font-semibold uppercase tracking-wider mb-8">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'} Found
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 border-2 border-dashed border-black/10 rounded-lg">
                        <span className="text-brand-gold text-4xl mb-6 block">✧</span>
                        <h3 className="text-xl font-semibold text-brand-black mb-3">No Results Found</h3>
                        <p className="text-black/50 text-sm max-w-md mx-auto mb-6">
                            We couldn't find any products matching "{searchQuery}"
                        </p>
                        <Link to="/products" className="inline-block px-6 py-3 bg-brand-gold text-brand-black text-xs font-semibold uppercase tracking-wider hover:bg-brand-black hover:text-brand-gold transition-colors">
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
