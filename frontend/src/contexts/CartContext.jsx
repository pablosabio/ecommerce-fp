import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    // Initialize cart items from local storage if available
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to local storage whenever cart items change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            // Check if the item already exists in the cart
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // If it exists, update the quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity,
                };
                return updatedItems;
            } else {
                // Add new item to the cart
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Update item quantity
    const updateQuantity = (productId, quantity) => {
        setCartItems(prevItems => 
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate total

    const subtotal = cartItems.reduce((total, item) => 
        total + (item.price * item.quantity), 0
    );

    return (
        <CartContext.Provider 
          value={{ 
            cartItems,
            setCartItems,
            addToCart, 
            removeFromCart, 
            updateQuantity,
            clearCart,
            subtotal 
          }}
        >
          {children}
        </CartContext.Provider>
      );
    };