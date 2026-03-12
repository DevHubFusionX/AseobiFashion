import React, { createContext, useContext, useState, useMemo } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Calculate total using useMemo instead of useEffect
    const cartTotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cartItems]);

    const addToCart = (product, quantity = 1, color = null) => {
        setCartItems(prev => {
            const productId = product._id || product.id;
            const existingItemIndex = prev.findIndex(
                item => item._id === productId && item.selectedColor === color
            );

            if (existingItemIndex >= 0) {
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            }

            const colorImage = product.colorImages?.find(ci => ci.color === color);
            const itemImage = colorImage ? colorImage.image : product.image;

            return [...prev, { ...product, _id: productId, quantity, selectedColor: color, image: itemImage }];
        });

        setIsCartOpen(true);
    };

    const removeFromCart = (productId, color) => {
        setCartItems(prev => prev.filter(item => !(item._id === productId && item.selectedColor === color)));
    };

    const updateQuantity = (productId, color, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                (item._id === productId && item.selectedColor === color)
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const value = {
        cartItems,
        isCartOpen,
        cartTotal,
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        setIsCartOpen
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
