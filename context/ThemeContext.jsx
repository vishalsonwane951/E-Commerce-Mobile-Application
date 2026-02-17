import React, { createContext, useState, useEffect } from "react";
import { COLORS } from "../theme/colors";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get device theme preference
  const colorScheme = Appearance.getColorScheme();

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Listen for device theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Optionally update theme when device theme changes
      // Uncomment the next line if you want to follow device theme
      // setDark(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themePreference');
      if (savedTheme !== null) {
        setDark(JSON.parse(savedTheme));
      } else {
        // Use device theme as default if no saved preference
        setDark(colorScheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
      // Fallback to device theme
      setDark(colorScheme === 'dark');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !dark;
    setDark(newTheme);
    
    try {
      await AsyncStorage.setItem('themePreference', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const setTheme = async (themeMode) => {
    setDark(themeMode === 'dark');
    try {
      await AsyncStorage.setItem('themePreference', JSON.stringify(themeMode === 'dark'));
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const theme = dark ? COLORS.dark : COLORS.light;

  // Add theme utilities
  const themeUtils = {
    isDark: dark,
    isLight: !dark,
    colors: theme,
    // Helper function to get color based on theme
    getColor: (lightColor, darkColor) => dark ? darkColor : lightColor,
    // Helper for status bar style
    getStatusBarStyle: () => dark ? 'light-content' : 'dark-content',
    // Helper for bar style
    getBarStyle: () => dark ? 'light' : 'dark',
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        dark, 
        setDark, 
        toggleTheme, 
        setTheme,
        theme,
        ...themeUtils,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme (optional but recommended)
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};