import { useState, useCallback } from 'react';

export function useSidebar() {
  // Use a regular state instead of useRef to ensure component re-renders
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Make sure to use useCallback for these functions
  const openSidebar = useCallback(() => {
    console.log('Opening sidebar'); // For debugging
    setIsSidebarVisible(true);
  }, []);

  const closeSidebar = useCallback(() => {
    console.log('Closing sidebar'); // For debugging
    setIsSidebarVisible(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    console.log('Toggling sidebar, current state:', isSidebarVisible); // For debugging
    setIsSidebarVisible(prevState => !prevState);
  }, [isSidebarVisible]); // Include isSidebarVisible in dependencies

  return {
    isSidebarVisible,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };
}

export default useSidebar;