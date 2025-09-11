import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Initial user context - cleaned up unnecessary fields
export const initUserContext = {
  userInfo: {
    userId: '',
    userName: '',
    email: '',
    loginFrom: '',
    role: '',
    photoURL: '',
    phoneNumber: '',
    newAccount: true,
    masjidAdmin: [],
    masjids: [],
    userToken: '',
    deviceToken: '',
    platform: Platform.OS,
    followedMasjid_id: '',
    FollowedImamId: '',
    followingImamData: [],
    notifications_meta: {
      announcements: false,
      events: false,
      azan: false,
      app_update: false,
    }
  },
  setUserInfo: (data: any) => {},
  isAuthenticated: false,
  setIsAuthenticated: (data: any) => {},
  isLoaded: false,
  setIsLoaded: (p0: boolean) => {},
  updateUserInfo: (data: any) => {},
  setisMasjidadmin: (data: any) => {},
  ismasjidadmin: false,
  updateUserInfoAndAuthenticate: (data: any) => Promise.resolve(),
};

export const UserContext = createContext(initUserContext);

export function UserProvider({children}: any) {
  const [userInfo, setUserInfo] = useState(initUserContext?.userInfo);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ismasjidadmin, setisMasjidadmin] = useState(false);

  const verifySession = async () => {
    try {
      // Check for authentication token
      const authToken = await AsyncStorage.getItem('authToken');

       //privious code
      // First check if there's a direct authentication flag
      // const authFlag = await AsyncStorage.getItem('isAuthenticated');

      // console.log("userprovider" + authFlag);
//       if (authFlag === 'true') {
//         console.log("Found explicit authentication flag");
//       }
      
      // Get user info from storage
      const userInfoStr = await AsyncStorage.getItem('userInfo');
      
      if (userInfoStr) {
        const asyncData = JSON.parse(userInfoStr);

        if (asyncData.userId) {
          setUserInfo(asyncData);
          setIsAuthenticated(true);
          
          // Check if user is masjid_admin or imam
          if (asyncData.role === 'masjid_admin' || asyncData.role === 'imam' || 
              (asyncData.masjidAdmin && asyncData.masjidAdmin.length > 0)) {
            setisMasjidadmin(true);
            
          } else {
            setisMasjidadmin(false);
          }
        } else {
          setIsAuthenticated(false);
        }
        // console.log('SETTINGS data', asyncData);
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoaded(true);
      
    } catch (error) {
      console.log('Verify session error:', error);
      setIsAuthenticated(false);
      setIsLoaded(true);
    }
  };

  // Combined function for updating user info and authentication state
  const updateUserInfoAndAuthenticate = async (data: any) => {
    console.log('update user info and authenticate', data);
    try {
      // Clean up any unnecessary fields
      const cleanedData = {
        userId: data.userId || '',
        userName: data.userName || '',
        email: data.email || '',
        role: data.role || '',
        photoURL: data.photoURL || '',
        phoneNumber: data.phoneNumber || '',
        newAccount: data.newAccount !== undefined ? data.newAccount : true,
        userToken: data.userToken || '',
        masjids: data.masjids || [],
        masjidAdmin: data.masjidAdmin || [],
        followedMasjid_id : data.followedMasjid_id || '',
        FollowedImamId: data.FollowedImamId || '',
        deviceToken: data.deviceToken || '',
      };
      
      // Process masjids_data if available
      if (data.masjids && Array.isArray(data.masjids)) {
        // Ensure backward compatibility with masjidAdmin format
        if (!cleanedData.masjidAdmin || !Array.isArray(cleanedData.masjidAdmin) || cleanedData.masjidAdmin.length === 0) {
          cleanedData.masjidAdmin = data.masjids.map((masjid: any) => ({
            masjidId: masjid.masjid_id,
            masjidName: masjid.masjid_name,
            masjidLogo: masjid.masjid_logo,
          }));
        }
      }

      if (data.following_masjid_id) {
        await AsyncStorage.setItem('followedMasjid_id', JSON.stringify(data.following_masjid_id));
        cleanedData.followedMasjid_id = JSON.stringify(data.following_masjid_id);
      }
      if (data.favorites && Array.isArray(data.favorites)) {
        await AsyncStorage.setItem('Favourite_Masjid', JSON.stringify(data.favorites));
      }
      
      if (data.following_imam_id) {
        await AsyncStorage.setItem('FollowedImamId', JSON.stringify(data.following_imam_id));
        cleanedData.FollowedImamId = JSON.stringify(data.following_imam_id);
      }

      await AsyncStorage.setItem('userInfo', JSON.stringify(cleanedData));
      await AsyncStorage.setItem('isAuthenticated', 'true');
      setUserInfo(cleanedData);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Error updating user info and authentication:', error);
      return false;
    }
  };

  const changeSettings = (data: any) => {
    setSettings(data);
    AsyncStorage.setItem('settings', JSON.stringify(data));
  };
  
  const updateUserInfo = (data: any) => {
    setUserInfo(data);
    AsyncStorage.setItem('userInfo', JSON.stringify(data));
  };

  useEffect(() => {
    verifySession();
  }, []);

  const userContext: any = {
    ...initUserContext,
    userInfo,
    setUserInfo,
    isAuthenticated,
    setIsAuthenticated,
    isLoaded,
    setIsLoaded,
    ismasjidadmin,
    setisMasjidadmin,
    changeSettings,
    updateUserInfo,
    updateUserInfoAndAuthenticate,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}