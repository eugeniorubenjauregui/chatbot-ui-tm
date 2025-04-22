// src/contexts/ThemeContext.js
import React, { createContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, redTheme } from '../themes/theme';

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [themeName, setThemeName] = useState('light');

  // Accept a theme parameter and update state accordingly
  const toggleTheme = (newThemeName) => {
    setThemeName(newThemeName);
  };

  // Determine which theme object to use based on themeName
  const theme =
    themeName === 'light'
      ? lightTheme
      : themeName === 'dark'
      ? darkTheme
      : redTheme; // defaults to redTheme if not light or dark

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeName }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};