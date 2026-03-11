import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    // Calculate total whenever items change
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
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
