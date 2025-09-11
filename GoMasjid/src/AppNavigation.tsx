import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

// Auth Screens
import Forgot from './screens/AuthScreens/Forgot';
import Login from './screens/AuthScreens/Login';
import LoginSignUp from './screens/AuthScreens/LoginSignUp';
import RegisterAccount from './screens/AuthScreens/RegisterAccount';

// Import BottomTabNavigator

// Splash Screens
import Splash from './screens/SplashScreens/Splash';
import WalkThroughScreen from './screens/SplashScreens/WalkThroughScreen';
import { ConnectedMasjids } from './screens/SplashScreens/ConnectedMasjids';
import Mission from './screens/SplashScreens/Mission';



// Context
import { UserContext } from './context/UserProvider';
import { AskImaamStack, DuaStack, EventsStack, ImamDashboardStack, MasjidAdminStack, MasjidStack, PagesStack, QuranPagesStack, ResturantStack } from './navigation/AppStack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import ResetPassword from './screens/AuthScreens/ResetPassword';
import VerifyOTP from './screens/AuthScreens/VerifyOTP';

import { ZakaatWithTab } from './navigation/AppStack';
import VerifyMobileOTP from './screens/AuthScreens/VerifyMobileOTP';

import { QuranStack } from './navigation/AppStack';



enableScreens();

// Define the types for our navigation stacks
export type RootStackParamList = {
  Splash: undefined;
  WalkThrough: undefined;
  ConnectedMasjids: undefined;
  Mission: undefined;
  AuthStack: undefined;
  HomeStack: undefined;
  Login: undefined;
  RegisterAccount: undefined;
  Forgotpassword: undefined;
  WalkThroughScreen: undefined;
  LoginSignUp: undefined;
  VerifyMobileOTP: undefined;
  VerifyOTP: undefined;
  ResetPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Auth Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="LoginSignUp" component={LoginSignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegisterAccount" component={RegisterAccount} />
      <Stack.Screen name="VerifyMobileOTP" component={VerifyMobileOTP} />
      <Stack.Screen name="Forgotpassword" component={Forgot} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="WalkThroughScreen" component={WalkThroughScreen} />
    </Stack.Navigator>
  );
};

// Home navigator contains both app stack and other screens that should be accessible after login
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};


function AppNavigation(): React.JSX.Element {
  const { isLoaded, isAuthenticated, setIsAuthenticated, setUserInfo } = useContext(UserContext);
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Check authentication status and first-time user status on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Check user authentication
        const userInfoStr = await AsyncStorage.getItem('userInfo');
        if (userInfoStr) {
          const userData = JSON.parse(userInfoStr);
          setUserInfo(userData);
          setIsAuthenticated(true);
        }

        // Check if it's first time using the app
        const firstTimeUser = await AsyncStorage.getItem('firstTimeUser');
        setIsFirstTime(firstTimeUser === null);
        
        setIsReady(true);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsReady(true);
      }
    };

    if (isLoaded) {
      checkStatus();
    }
  }, [isLoaded, setIsAuthenticated, setUserInfo]);

  if (!isReady || !isLoaded) {
    // Return a minimal wrapper while we're checking status
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="WalkThrough" component={WalkThroughScreen} />
          <Stack.Screen name="ConnectedMasjids" component={ConnectedMasjids} />
          <Stack.Screen name="Mission" component={Mission} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="QuranPagesStack" component={QuranPagesStack} />
          <Stack.Screen name="MasjidAdminStack" component={MasjidAdminStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
  
}

export default AppNavigation;