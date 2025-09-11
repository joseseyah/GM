// context/TabNavigationContext.tsx
import React, { createContext, useContext, useState } from 'react';

type TabType = 'Home' | 'Mosques' | 'Explore' | 'Quran' | 'Profile';

type TabNavigationContextType = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  showBottomTab: boolean;
  setShowBottomTab: (show: boolean) => void;
};

const defaultState: TabNavigationContextType = {
  activeTab: 'Home',
  setActiveTab: () => {},
  showBottomTab: true,
  setShowBottomTab: () => {},
};

export const TabNavigationContext = createContext<TabNavigationContextType>(defaultState);

export const TabNavigationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [showBottomTab, setShowBottomTab] = useState(true);

  return (
    <TabNavigationContext.Provider value={{ 
      activeTab, 
      setActiveTab,
      showBottomTab,
      setShowBottomTab
    }}>
      {children}
    </TabNavigationContext.Provider>
  );
};

export const useTabNavigation = () => useContext(TabNavigationContext);