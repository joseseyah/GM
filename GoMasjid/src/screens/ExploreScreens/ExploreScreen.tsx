import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler, ImageBackground, Dimensions, Platform, Linking } from 'react-native';
import { themeFont } from '../../styles/theme';
import SidebarMenu from '../../components/sidebar/SidebarMenu';
import HamburgerHeader from '../../common/HamburgerHeader';
import { useFocusEffect } from '@react-navigation/native';
import useSidebar from '../../hooks/useSidebar';
import ExploreItems from './ExploreItems';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { useSidebarVisibility } from '../../context/SidebarContext';

const {width, height} = Dimensions.get('window');
const ExploreScreen = ({navigation}: any) => {
  
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

  const openCommunityLink = async () => {
    const url = 'https://www.facebook.com/gomasjidapp/';
    await Linking.openURL(url);
    // const supported = await Linking.canOpenURL(url);
    // if (supported) {
    //   await Linking.openURL(url);
    // } else {
    //   // console.log(url);
    // }
  };

  return (
    <>
    <SidebarMenu isVisible={isSidebarVisible} onClose={closeSidebar} />
    <ImageBackground
      style={styles.imageStyle}
      source={require('../../assets/images/quran/QuranDashboardBackground.png')}
      resizeMode="cover">
      <View style={styles.container}>
        <HamburgerHeader
          title="Explore"
          titleColor="#FFF"
          icon="white"
          toggleSidebar={() => {
            toggleSidebar();
          }}
        />

        <View style={styles.exploreContainer}>
          {ExploreItems.map(item => (
            <TouchableOpacity
              key={item?.id}
              onPress={() => { item.title === 'Community' ? openCommunityLink() : (item.stack ? navigation.navigate(item.stack as never, { screen: item.screen } as never) : null)}}
              style={styles.exploreBox}
              > 
              <Image
                source={item?.img}
                style={{
                  maxHeight: 50,
                  maxWidth: 50,
                }}
              />
              <Text
                style={{
                  fontFamily: themeFont.englishFont,
                  fontSize: 11,
                  fontWeight: '500',
                  lineHeight: 12.32,
                  textAlign: 'center',
                  color: '#FFF'
                }}>
                {item?.title}
              </Text>
              
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    paddingHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
  },
  exploreContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: Platform.OS === 'ios' ? 20 : 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreBox: {
    // borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 20,
    height: 100,
    width: 100,
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#FFF',
    borderWidth: 1,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    borderRadius: 15,
    // borderBottomWidth: 0,
    overflow: 'hidden'
  },
});

export default ExploreScreen;