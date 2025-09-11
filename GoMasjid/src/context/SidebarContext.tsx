import React, { createContext, useContext, useState, useCallback } from 'react';

type SidebarVisibilityContextType = {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
};

const SidebarVisibilityContext = createContext<SidebarVisibilityContextType | undefined>(undefined);

export const SidebarVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const setVisible = useCallback((visible: boolean) => {
    setIsVisible(visible);
  }, []);

  return (
    <SidebarVisibilityContext.Provider value={{ isVisible, setVisible }}>
      {children}
    </SidebarVisibilityContext.Provider>
  );
};

export const useSidebarVisibility = () => {
  const context = useContext(SidebarVisibilityContext);
  if (!context) throw new Error('useSidebarVisibility must be used within SidebarVisibilityProvider');
  return context;
};
