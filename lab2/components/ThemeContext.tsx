import React, { createContext, useState, useContext, ReactNode } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const defaultContextValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
