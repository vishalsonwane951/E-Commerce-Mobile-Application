import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD CART FROM STORAGE
  ========================== */
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.log("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  /* =========================
     SAVE CART TO STORAGE
  ========================== */
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loading]);

  /* =========================
     ADD TO CART
  ========================== */
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /* =========================
     REMOVE ITEM
  ========================== */
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  /* =========================
     UPDATE QUANTITY
  ========================== */
  const updateQuantity = (id, type) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === id) {
          if (type === "inc") {
            return { ...item, quantity: item.quantity + 1 };
          }

          if (type === "dec") {
            if (item.quantity === 1) {
              // If quantity becomes 0 → remove item
              return null;
            }
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      }).filter(Boolean) // remove null items
    );
  };

  /* =========================
     CLEAR CART
  ========================== */
  const clearCart = () => {
    setCart([]);
  };

  /* =========================
     TOTAL PRICE
  ========================== */
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
