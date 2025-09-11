import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Platform, TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { UserContext } from '../../context/UserProvider';

type SocialLoginProps = {
  navigation: any;
  setSuccess: (message: string) => void;
  setError: (message: string) => void;
  setLoading: (loading: boolean) => void;
};

// Helper function to decode JWT and extract Apple ID
const decodeAppleIdentityToken = (token: string) => {
  try {
    const payload = token.split('.')[1];
    // React Native compatible base64 decoding
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    
    // Use atob for base64 decoding (available in React Native)
    const decoded = atob(padded);
    const decodedPayload = JSON.parse(decoded);
    return decodedPayload;
  } catch (error) {
    console.error('Error decoding Apple identity token:', error);
    return null;
  }
};

const SocialLogin = ({ navigation, setSuccess, setError, setLoading }: SocialLoginProps) => {
  const { setUserInfo, setIsAuthenticated, updateUserInfoAndAuthenticate } = useContext(UserContext);
  const [deviceToken, setDeviceToken] = useState('');

  // Configure GoogleSignin once when component mounts
  useEffect(() => {
    const getDeviceToken = async () => {
      // try {
      //   if (Platform.OS === 'ios') {
      //     const authStatus = await messaging().requestPermission();
      //   }
      //   const token = await messaging().getToken();
      //   setDeviceToken(token);
      //   // Store token for later use
      //   await AsyncStorage.setItem('deviceToken', token);
      // } catch (error) {
      //   console.error('Error getting device token:', error);
      //   setDeviceToken('');
      // }
    };
    
    getDeviceToken();
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: '416819165099-bnmu0ni20qk4phkfs43m33bpvlnlf8kg.apps.googleusercontent.com',
      offlineAccess: false,
      forceCodeForRefreshToken: true,
      // iosClientId: Platform.OS === 'ios' ? '416819165099-10jv6m4cfrlume7ojgfobdqlko09itub.apps.googleusercontent.com' : undefined,
      iosClientId: '416819165099-10jv6m4cfrlume7ojgfobdqlko09itub.apps.googleusercontent.com',
    });
  };

  const processLogin = async (provider: 'google' | 'facebook' | 'apple', data: any) => {
    try {
      setLoading(true);
      
      let requestData;
      
      if (provider === 'google') {
        requestData = {
          provider: 'google',
          email: data.data?.user.email,
          secret_key: 'TRENCH8485868987',
          name: data.data?.user.name,
          platform: Platform.OS,
          device_token: deviceToken
        };
      } else if (provider === 'facebook') {
        requestData = {
          provider: 'facebook',
          access_token: data.accessToken,
          secret_key: 'TRENCH8485868987',
          platform: Platform.OS,
          device_token: deviceToken
        };
      } else if (provider === 'apple') {
        requestData = {
          provider: 'apple',
          identity_token: data.identityToken,
          nonce: data.nonce,
          email: data.email,
          name: data.name,
          apple_id: data.apple_id, // Add Apple ID to the request
          is_private_email: data.is_private_email, // Add private email flag
          secret_key: 'TRENCH8485868987',
          platform: Platform.OS,
          device_token: deviceToken
        };
      }
      
      console.log(`Sending ${provider} login data to server:`, requestData);
      
      const response = await fetch('https://admin.gomasjid.co.uk/processlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      const responseData = await response.json();
      console.log(`${provider} login server response:`, responseData);
      
      if (responseData.status !== 'success') {
        throw new Error(responseData.message || `Failed to process ${provider} login`);
      }
      
      // Store the auth token
      await AsyncStorage.setItem('authToken', responseData.token);
      
      // Create user object from server response
      const userInfo: {
        userId: any;
        emailAddress: any;
        userName: any;
        loginFrom: 'google' | 'facebook' | 'apple';
        role: any;
        userToken: any;
        platform: any;
        masjids?: any; 
        masjidAdmin?: any; 
        favorites?: any;
        following_masjid_id?: any;
        following_imam_id?: any;
        photoURL?: any;
      } = {
        userId: responseData.user.id,
        emailAddress: responseData.user.email,
        userName: responseData.user.name,
        loginFrom: provider,
        role: responseData.user.role,
        userToken: responseData.token,
        platform: Platform.OS,
      };

      // Add masjids data if available
      if (responseData.user.masjids_data) {
        userInfo.masjids = responseData.user.masjids_data;
        
        // Format masjidAdmin for backward compatibility
        userInfo.masjidAdmin = responseData.user.masjids_data.map((masjid: any) => ({
          masjidId: masjid.masjid_id,
          masjidName: masjid.masjid_name,
          masjidLogo: masjid.masjid_logo,
        }));
      }
      
      // Add additional user data
      userInfo.favorites = responseData.user.favorite_masjids;
      userInfo.following_masjid_id = responseData.user.following_masjid_id;
      userInfo.following_imam_id = responseData.user.following_imam_id;
      
      if (responseData.user.avatar) {
        userInfo.photoURL = responseData.user.avatar;
      }

      // Update user context and authenticate
      updateUserInfoAndAuthenticate(userInfo);
      
      // Set context values
      setIsAuthenticated(true);

      console.log(navigation);
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeStack' }],
      });
  
    } catch (error:any) {
      console.error(`${provider} login processing error:`, error);
      setError(`Error processing ${provider} login: ${error.message}`);
      setLoading(false);
      throw error;
    }
  };

  const onFacebookButtonPress = async () => {
    try {
      setLoading(true);
      console.log("Starting Facebook login...");
      
      // Reset the Facebook login state first
      console.log("Logging out from previous session...");
      await LoginManager.logOut();
      
      // Add a small delay to ensure logout is complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log("Attempting Facebook login with permissions...");
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
      console.log("Facebook login result:", result);
      
      if (result.isCancelled) {
        console.log("Login cancelled by user");
        setLoading(false);
        setError('Login was cancelled');
        return;
      }
      
      if (result.error) {
        console.log("Login error:", result.error);
        throw new Error(`Facebook login error: ${result.error}`);
      }
      
      console.log("Login permissions granted:", result);
      console.log("Granted permissions:", result.grantedPermissions);
      console.log("Declined permissions:", result.declinedPermissions);
      
      // Add delay before getting access token
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get access token
      const data = await AccessToken.getCurrentAccessToken();
      
      if (!data) {
        throw new Error('Failed to obtain access token');
      }
      
      console.log("Access token obtained successfully!");
      console.log("=== TOKEN DEBUG INFO ===");
      console.log("Full token:", data.accessToken);
      console.log("Token length:", data.accessToken.length);
      console.log("Token expires at:", new Date(data.expirationTime).toISOString());
      console.log("Token permissions:", data.permissions);
      console.log("Token declined permissions:", data.declinedPermissions);
      console.log("User ID:", data.userID);
      console.log("App ID:", data.applicationID);
      console.log("Access token source:", data.accessTokenSource);
      console.log("========================");
      
      // Test the token locally first
      console.log("Testing token with Facebook Graph API...");
      try {
        const testResponse = await fetch(`https://graph.facebook.com/me?access_token=${data.accessToken}`);
        const testData = await testResponse.json();
        console.log("Facebook API test result:", testData);
        
        if (testData.error) {
          console.log("Token validation failed:", testData.error);
          throw new Error(`Token validation failed: ${testData.error.message}`);
        } else {
          console.log("Token validation successful! User:", testData);
        }
      } catch (validationError) {
        console.error("Token validation error:", validationError);
        throw new Error(`Token validation failed: ${validationError.message}`);
      }
      
      // Process the login with the server
      await processLogin('facebook', data);
      
    } catch (error) {
      console.error('Facebook Login Error:', error);
      console.error('Error stack:', error.stack);
      
      // Provide more specific error messages
      let errorMessage = 'Unknown error occurred';
      
      if (error.message?.includes('network connection was lost')) {
        errorMessage = 'Network connection lost. Please check your internet connection and try again.';
      } else if (error.message?.includes('No network connection')) {
        errorMessage = 'No internet connection. Please check your network and try again.';
      } else if (error.message?.includes('User cancelled') || error.message?.includes('cancelled')) {
        errorMessage = 'Login was cancelled';
      } else if (error.message?.includes('access token')) {
        errorMessage = 'Failed to get login credentials. Please try again.';
      } else if (error.message?.includes('Token validation failed')) {
        errorMessage = error.message; // Keep the specific validation error
      } else if (error.message?.includes("The operation couldn't be completed")) {
        errorMessage = 'Facebook login failed. Please make sure you have the Facebook app installed or try again.';
      } else {
        errorMessage = `Facebook login failed: ${error.message || 'Unknown error'}`;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      setLoading(true);
      
      // Check if Play Services are available (Android only)
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({ 
          showPlayServicesUpdateDialog: true 
        });
      }
      
      // Sign out first to make sure we don't have any cached sessions
      await GoogleSignin.signOut();
      
      // Perform sign-in
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);

      // Process the login with the server
      await processLogin('google', userInfo);
      
    } catch (error:any) {
      setLoading(false);
      console.error('Google Sign-In Error:', error);
      
      // Handle specific error codes
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Sign in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError('Sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Play services are not available or outdated');
      } else if (error.code === 'DEVELOPER_ERROR') {
        setError('Google Sign-In configuration error. Please check your credentials.');
        Alert.alert(
          'Configuration Error',
          'There is a problem with the Google Sign-In configuration. This usually means the OAuth client ID is incorrect or the package name doesn\'t match.'
        );
      } else {
        setError(`Error while logging in with Google: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const onAppleButtonPress = async () => {
    // Apple Sign-In is only available on iOS
    if (Platform.OS !== 'ios') {
      setError('Apple Sign-In is only available on iOS devices');
      return;
    }
  
    try {
      setLoading(true);
      
      // Perform the apple sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
  
      // Get the credentials
      const { identityToken, nonce, email, fullName } = appleAuthRequestResponse;
      
      if (!identityToken) {
        throw new Error('Apple Sign-In failed: No identity token returned');
      }

      // Decode the identity token to get the Apple ID (sub) and email
      const decodedToken = decodeAppleIdentityToken(identityToken);
      const appleId = decodedToken?.sub;
      const tokenEmail = decodedToken?.email; // Get email from JWT token
      
      console.log('Decoded Apple Token:', decodedToken);
      console.log('Apple ID (sub):', appleId);
      console.log('Email from response:', email);
      console.log('Email from token:', tokenEmail);
  
      // Format the name from the fullName object
      let name = '';
      if (fullName) {
        name = [fullName.givenName, fullName.familyName].filter(Boolean).join(' ');
      }

      // Determine which email to use
      // Priority: response email -> JWT token email
      // Both will be the same (either real email or private relay email)
      let finalEmail = email || tokenEmail;
      
      // Check if user is using "Hide My Email" feature
      const isPrivateEmail = finalEmail && finalEmail.includes('@privaterelay.appleid.com');
      
      console.log('Final email to use:', finalEmail);
      console.log('Is private relay email:', isPrivateEmail);

      // Check if this is a returning user (no email/name provided in response)
      // If so, try to get stored user data
      let storedEmail = finalEmail;
      let storedName = name;
      
      if (!storedEmail && !storedName && appleId) {
        // Try to get stored user data from AsyncStorage for returning users
        try {
          const storedAppleData = await AsyncStorage.getItem(`apple_user_${appleId}`);
          if (storedAppleData) {
            const parsed = JSON.parse(storedAppleData);
            storedEmail = parsed.email;
            storedName = parsed.name;
            console.log('Retrieved stored Apple user data:', parsed);
          }
        } catch (error) {
          console.log('No stored Apple user data found');
        }
      } else if ((storedEmail || storedName) && appleId) {
        // Store user data for future logins (only if we have new data)
        try {
          await AsyncStorage.setItem(`apple_user_${appleId}`, JSON.stringify({
            email: storedEmail,
            name: storedName,
            apple_id: appleId
          }));
          console.log('Stored Apple user data for future logins');
        } catch (error) {
          console.log('Failed to store Apple user data');
        }
      }
      
      // Create the data object to send to processLogin
      const appleLoginData = {
        identityToken,
        nonce,
        email: storedEmail,
        name: storedName,
        apple_id: appleId,
        is_private_email: isPrivateEmail // Add flag to indicate if using private relay
      };

      console.log('Apple login data to process:', appleLoginData);
      
      // Process the login with the server
      await processLogin('apple', appleLoginData);
      
    } catch (error:any) {
      console.error('Apple Login Error:', error);
      
      if (error.code === appleAuth.Error.CANCELED) {
        setError('Sign in was cancelled');
      } else {
        setError(`Error while logging in with Apple: ${error.message || 'Unknown error'}`);
      }
      
      setLoading(false);
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <TouchableOpacity
        style={{ paddingEnd: 10 }}
        onPress={onGoogleButtonPress}>
        <Image
          style={{ width: 18, height: 18, marginRight: 0 }}
          source={require('../../assets/images/google.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingEnd: 10 }}
        onPress={onFacebookButtonPress}>
        <Image
          style={{ width: 18, height: 18, marginRight: 0 }}
          source={require('../../assets/images/Facbook.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <TouchableOpacity
          style={{ paddingEnd: 10 }}
          onPress={onAppleButtonPress}>
          <Image
            style={{ width: 18, height: 18, marginRight: 0 }}
            source={require('../../assets/images/apple.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SocialLogin;