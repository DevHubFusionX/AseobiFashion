import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * LazyImage component for performance optimization.
 * Only loads the image when it enters the viewport and fades in smoothly.
 */
const LazyImage = ({
    src,
    alt,
    className,
    placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px', // Start loading 200px before it enters the viewport
    });

    return (
        <div ref={ref} className={`relative overflow-hidden bg-stone-100/50 ${className}`}>
            {inView && (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    {...props}
                />
            )}

            {/* Premium Skeleton/Loader Overlay */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-stone-100/30">
                    <div className="w-1/2 h-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent absolute inset-0 animate-shimmer"></div>
                    <div className="w-6 h-6 border-[1px] border-brand-gold/20 border-t-brand-gold rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default LazyImage;
