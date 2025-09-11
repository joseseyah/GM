import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler, Platform } from 'react-native';
import { themeFont } from '../styles/theme';
import { useFocusEffect } from '@react-navigation/native';
import useSidebar from '../hooks/useSidebar';
import SidebarMenu from '../components/sidebar/SidebarMenu';

const HamburgerHeader = ({ title, titleColor, icon, navigation, toggleSidebar }: any) => {

  // // Use the sidebar hook
  // const { isSidebarVisible, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
  
  // // Handle back button press to close sidebar if open
  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       if (isSidebarVisible) {
  //         closeSidebar();
  //         return true;
  //       }
  //       return false;
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, [isSidebarVisible, closeSidebar])
  // );

  return (
    <>
    {/* <SidebarMenu isVisible={isSidebarVisible} onClose={closeSidebar} /> */}
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={toggleSidebar}>
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          source={ icon === 'white' 
            ? require('../assets/images/hamburgerMenu.png')
            : require('../assets/images/HamburgerMenuBlack.png')}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={[styles.topBarHeader, {color: titleColor}]}>{title}</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  topBarHeader: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    lineHeight: 17,
    fontFamily: themeFont.englishFont,
  },
});
export default HamburgerHeader;
