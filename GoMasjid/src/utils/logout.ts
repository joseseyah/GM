import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { initUserContext } from '../context/UserProvider';

export const handleLogout = async (
  navigation: any,
  setUserInfo: (data: any) => void,
  setIsAuthenticated: (status: boolean) => void,
  onClose?: () => void
) => {
  try {
    await AsyncStorage.multiRemove([
      'userInfo',
      'authToken',
      'isAuthenticated',
      'Favourite_Masjid',
    ]);

    setUserInfo(initUserContext.userInfo);
    setIsAuthenticated(false);

    if (onClose) onClose();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      })
    );
  } catch (error) {
    console.error('Logout error:', error);
  }
};
