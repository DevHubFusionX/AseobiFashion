import React from 'react';

const Shop = () => {
    return (
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Explore Our Fabrics</h1>
            <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                {['All Fabrics', 'Silk', 'Cotton', 'Linen', 'Wool', 'Synthetics'].map((cat) => (
                    <button key={cat} className="whitespace-nowrap px-6 py-2 rounded-full border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                        {cat}
                    </button>
                ))}
            </div>
            <p className="text-gray-500 text-center py-12">Shop page - Use Products page for full catalog</p>
        </div>
    );
};

export default Shop;
