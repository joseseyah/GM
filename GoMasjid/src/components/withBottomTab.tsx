// components/withBottomTab.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTabNavigation } from '../context/TabNavigationContext';
import ModularBottomTab from './ModularBottomTab';

/**
 * Higher Order Component that adds bottom tab navigation to any component
 * @param Component The component to wrap
 * @param tabType The tab that should be active
 */
const withBottomTab = (Component: React.ComponentType<any>, tabType?: 'Home' | 'Mosques' | 'Explore' | 'Quran' | 'Profile') => {
  return (props: any) => {
    const { setActiveTab } = useTabNavigation();
    
    // Set the active tab when component mounts
    React.useEffect(() => {
      if (tabType) {
        setActiveTab(tabType);
      }
    }, []);
    
    return (
      <View style={styles.container}>
        <Component {...props} />
        <ModularBottomTab />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default withBottomTab;