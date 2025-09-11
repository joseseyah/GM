import React, {createContext, useState} from 'react';
import defaultTheme from '../styles/theme';

export const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = ({children}: any) => {
  const [theme, setTheme] = useState<any>(defaultTheme);

  const updateTheme = (updatedTheme: any) => {
    setTheme(updatedTheme);
  };

  const ThemeContextValue: any = {
    theme,
    updateTheme,
  };
  return (
    <ThemeContext.Provider value={ThemeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
