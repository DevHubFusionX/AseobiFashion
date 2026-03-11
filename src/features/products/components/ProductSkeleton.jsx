import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="group animate-pulse">
            <div className="relative aspect-[4/5] bg-gray-200 rounded-sm mb-4"></div>
            <div className="space-y-2 px-1">
                <div className="flex justify-between items-start">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                <div className="flex gap-1 mt-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-gray-100"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
