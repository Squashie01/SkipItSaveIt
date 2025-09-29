import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES } from '../theme';

export const ThemeContext = createContext({
  theme: THEMES.LIGHT,
  toggleTheme: () => {},
  isDarkMode: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || THEMES.LIGHT;
    setTheme(savedTheme);
    setIsDarkMode(savedTheme === THEMES.DARK);
  }, []);

  // Save theme to localStorage and update state
  const toggleTheme = () => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);
    setIsDarkMode(newTheme === THEMES.DARK);
    localStorage.setItem('theme', newTheme);
    
    // Update the HTML class for dark mode
    if (newTheme === THEMES.DARK) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
