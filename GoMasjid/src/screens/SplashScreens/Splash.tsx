import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { UserContext } from '../../context/UserProvider';
import { refreshAppData } from '../../services/api';
import styles from '../../styles/SplashScreens/Splash';

type RootStackParamList = {
  Splash: undefined;
  WalkThrough: undefined;
  AuthStack: undefined;
  HomeStack: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const Splash = ({ navigation }: Props) => {
  const { isLoaded, isAuthenticated, userInfo, updateUserInfo } = useContext(UserContext);

  useEffect(() => {
    if (!isLoaded) return;
    updateAdminInfo();
    const timer = setTimeout(() => {
      navigateToNextScreen();
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const updateAdminInfo = async () => {
    if (userInfo?.userId) {
      const updater = await refreshAppData(userInfo?.userToken);
      if (updater?.user.role === 'masjid_admin' || updater?.user.role === 'imam') {
        const masjidAdminData = updater?.user.masjids_data.map((masjid: any) => ({
          masjidId: masjid.masjid_id,
          masjidName: masjid.masjid_name,
          masjidLogo: masjid.masjid_logo,
        }));
        updateUserInfo({
          ...userInfo,
          masjidAdmin: masjidAdminData,
          masjids: masjidAdminData,
          role: updater.user.role,
        });
      }
    }
  };

  const navigateToNextScreen = async () => {
    try {
      const firstTimeUserData = await AsyncStorage.getItem('firstTimeUser');
      const firstTimeUser = firstTimeUserData === null;

      if (firstTimeUser) {
        navigation.replace('WalkThrough');
      } else {
        if (isAuthenticated) {
          navigation.replace('HomeStack');
        } else {
          navigation.replace('AuthStack');
        }
      }
    } catch (error) {
      console.error('Error navigating from splash:', error);
      navigation.replace('AuthStack');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/gm_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;
