import React, { createContext, useState } from "react";
import { COLORS } from "../theme/colors"; 
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const theme = dark ? COLORS.dark : COLORS.light;

  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
