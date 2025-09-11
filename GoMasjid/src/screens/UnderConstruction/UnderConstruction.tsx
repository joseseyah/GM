import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HamburgerHeader from '../../common/HamburgerHeader';
import { useFocusEffect } from '@react-navigation/native';
import useSidebar from '../../hooks/useSidebar';
import SidebarMenu from '../../components/sidebar/SidebarMenu';
import { useSidebarVisibility } from '../../context/SidebarContext';

const UnderConstruction = ({navigation, route}: any) => {
  const [screenName, setScreenName] = useState<string | null>(null);
  useEffect(() => {
    closeSidebar();
    setScreenName(route?.params?.screenName)
  } , []);
  // // Use the sidebar hook
  const { isSidebarVisible, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
  const { setVisible } = useSidebarVisibility();
  // Handle back button press to close sidebar if open
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isSidebarVisible) {
          closeSidebar();
          return true;
        }
        return false;
      };

      const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        backHandlerSubscription.remove();
    }, [isSidebarVisible, closeSidebar])
  );

  useEffect(() => {
    setVisible(isSidebarVisible);
  }, [isSidebarVisible]);
    
  return (
    <>
      <SidebarMenu isVisible={isSidebarVisible} onClose={closeSidebar} />
      <SafeAreaView style={{ flex: 1 }}>
      <HamburgerHeader
        title="Under Construction"
        titleColor="#000"
        icon="black"
        toggleSidebar={() => {
          toggleSidebar();
        }}
      />
    
      <View style={styles.container}>
        <Text style={styles.title}>Under Construction</Text>
        <Text style={{}}>Did not completed {screenName} yet</Text>
      </View>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UnderConstruction;