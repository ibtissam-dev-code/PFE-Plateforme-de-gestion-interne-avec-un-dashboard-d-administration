import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    console.log("1. LocalStorage initial theme is:", saved);
    return saved === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    console.log("2. Effect running. Current darkMode state is:", darkMode);
    
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem("theme", "dark");
      console.log("3. Added 'dark' class to <html>");
    } else {
      root.classList.remove('dark');
      localStorage.setItem("theme", "light");
      console.log("3. Removed 'dark' class from <html>");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);