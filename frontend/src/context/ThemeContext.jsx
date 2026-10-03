import { createContext, useContext, useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'teamup-theme';
const ThemeContext = createContext(null);

function getInitialTheme() {
 const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
 return storedTheme === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
 const [theme, setTheme] = useState(getInitialTheme);

 useEffect(() => {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.style.colorScheme = theme;
 }, [theme]);

 const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

 return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
 const context = useContext(ThemeContext);
 if (!context) throw new Error('useTheme must be used within ThemeProvider');
 return context;
}