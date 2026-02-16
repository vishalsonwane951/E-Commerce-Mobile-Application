import React, { createContext, useState } from "react";
import { COLORS } from "../theme/colors"; // make sure you import your COLORS

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  // compute theme based on dark state
  const theme = dark ? COLORS.dark : COLORS.light;

  // toggle function
  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
