import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext"; 

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
      <AppNavigator />
    </CartProvider>
    </ThemeProvider>
  );
}
