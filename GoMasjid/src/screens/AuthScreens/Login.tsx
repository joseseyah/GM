import messaging from '@react-native-firebase/messaging';
import React, { useContext, useEffect, useState, useRef, forwardRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../context/UserProvider';
import { signin, signinWithPhone, guestLogin } from '../../services/auth';
import SocialLogin from './SocialLogin';
import firebase from '@react-native-firebase/app';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { useFocusEffect } from '@react-navigation/native';
import { getCountryCodes } from '../../services/api';

const { height, width } = Dimensions.get('screen');

type SocialLoginRefType = {
  onGoogleButtonPress: () => void;
  onFacebookButtonPress: () => void;
  onAppleButtonPress: () => void;
};


const Login = ({ navigation }: { navigation: any }) => {
  const [identifier, setIdentifier] = useState(''); // Can be email or phone
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [errors, setErrors] = useState({
    identifier: '',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const { setIsAuthenticated, updateUserInfoAndAuthenticate } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPhoneInput, setIsPhoneInput] = useState(false);
  const [allCountryCodes, setAllCountryCodes] = useState([] as { code: string }[]);
  
  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  const socialLoginRef = useRef<SocialLoginRefType>(null);


  useFocusEffect(
    React.useCallback(() => {
      const fetchCountryCodes = async () => {
        const codes = await getCountryCodes();
        setAllCountryCodes(codes);
      };
      fetchCountryCodes();
    }, [])
  );
  
  // const COUNTRY_CODES: CountryCode[] = ['GB', 'IN', 'US', 'PK', 'DE', 'FR', 'CA', 'AU', 'BD'];
  const COUNTRY_CODES: CountryCode[] = allCountryCodes.map(c => c.code as CountryCode);

  const isEmail = (text: string): boolean => {
    return emailRegex.test(text);
  };

  const isPhoneNumber = (text: string): boolean => {
    // return phoneRegex.test(text);
   
    // const phoneNumber = parsePhoneNumberFromString(text, 'GB'); // Default region, fallback if no +
    // return phoneNumber ? phoneNumber.isValid() : false;
    for (const country of COUNTRY_CODES) {
      const phoneNumber = parsePhoneNumberFromString(text, country);
      if (phoneNumber?.isValid()) return true;
    }
    return false;
  };

  // Check if input is a phone number and update state
  const checkInputType = (text: string) => {
    setIdentifier(text);
    setIsPhoneInput(isPhoneNumber(text));
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  // Function to get Firebase Cloud Messaging token
  const getDeviceToken = async () => {
    try {
      if (Platform.OS === 'android') {
        await messaging().hasPermission();
      }

      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();

        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        console.log('Authorization status:', authStatus);

        if (!enabled) {
          console.warn('Push notification permission not granted');
          return;
        }
      }
      console.log('Device token:', messaging().getToken());
      const token = await messaging().getToken();
      console.log('Device token:', token);
      setDeviceToken(token);
      await AsyncStorage.setItem('deviceToken', token);
    } catch (error) {
      console.error('Error getting device token:', error);
      setDeviceToken('');
    }
  };

  const handleLogin = () => {
    getDeviceToken();
    setErrors({ identifier: '', password: '' });
    
    if (!identifier) {
      setErrors(prev => ({ ...prev, identifier: 'Email or phone number is required' }));
      return;
    }
    
    if (!password && !isPhoneInput) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Check if identifier is email or phone
    if (isPhoneInput) {
      // Login with phone (OTP flow)
      signinWithPhone(identifier, deviceToken)
        .then((response) => {
          setLoading(false);
          if (response.status === 'success') {
            navigation.navigate('VerifyMobileOTP', { 
              phoneNumber: identifier,
              deviceToken: deviceToken
            });
          } else {
            setError(response.message || 'Failed to send verification code');
          }
        })
        .catch(error => {
          console.error('Error in phone login:', error);
          setLoading(false);
          setError('Failed to process your request. Please try again.');
        });
    } else {
      // Login with email and password
      signin(identifier, password, deviceToken)
        .then((response) => {
          if (response.status === 'success') {
            handleSuccessfulLogin(response);
          } else {
            setError(response.message || 'Login failed. Please check your credentials.');
            setLoading(false);
          }
        })
        .catch(handleLoginError);
    }
  };

  const handleSuccessfulLogin = (response: any) => {
    // Process user data
    const userData = {
      userId: response.user.id,
      userName: response.user.name,
      emailAddress: response.user.email,
      email: response.user.email,
      role: response.user.role,
      userToken: response.token,
      loginFrom: isEmail(identifier) ? 'email' : 'phone',
      newAccount: false,
      deviceToken: deviceToken,
    };
    
    // Add masjids data if available
    if (response.user.masjids_data) {
      userData.masjids = response.user.masjids_data;
      
      // Format masjidAdmin for backward compatibility
      userData.masjidAdmin = response.user.masjids_data.map((masjid: any) => ({
        masjidId: masjid.masjid_id,
        masjidName: masjid.masjid_name,
        masjidLogo: masjid.masjid_logo,
      }));
    }
    
    // Add additional user data
    userData.favorites = response.user.favorite_masjids;
    userData.following_masjid_id = response.user.following_masjid_id;
    userData.following_imam_id = response.user.following_imam_id;
    
    if (!isEmail(identifier)) {
      userData.phoneNumber = identifier;
    }
    
    if (response.user.avatar) {
      userData.photoURL = response.user.avatar;
    }
    
    // Update user context and authenticate
    updateUserInfoAndAuthenticate(userData);
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeStack' }],
    });
  };

  const handleLoginError = (error: any) => {
    console.log('Login error:', error);
    setLoading(false);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Login failed';
      setError(errorMessage);
    } else if (error.message) {
      setError(error.message);
    } else {
      setError('Network error. Please check your connection and try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const asGuest = async () => {
    let userId = null;
    guestLogin(deviceToken)
      .then((response) => {
        setLoading(false);
        if (response.status === 'success') {
          userId = response.user_id;
        }
      })
      .catch(error => {
        setLoading(false);
        setError('Failed to process your request. Please try again.');
      }
    );

    let setData = {
      userId: userId,
      userName: 'Guest',
      emailAddress: '',
      email: '',
      phoneNumber: '',
      role: 'guest',
      loginFrom: 'guest',
      newAccount: true,
      followedMasjid_id: null,
      FollowedImamId: null,
      userToken: '',
      masjids: [],
      masjidAdmin: [],
      deviceToken: deviceToken
    };
    // Use the combined function to update user info and authenticate
    await updateUserInfoAndAuthenticate(setData);
    setIsAuthenticated(false);
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeStack' }],
    });
  };

  useEffect(() => {
    if (success) {
      setModalVisible(true);
    }
  }, [success]);


  return (
    <View style={styles.rootContainer}>
      {/* Fixed Logo at the top */}
      <View style={styles.fixedLogoContainer}>
        <Image
          source={require('../../assets/images/gm_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
  
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              
              <Text style={styles.title}>Log in</Text>
  
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't Have An Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterAccount', { deviceToken })}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
  
              <View style={styles.formContainer}>
                <View style={styles.inputContainer1}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#999"
                    value={identifier}
                    onChangeText={checkInputType}
                    autoCapitalize="none"
                    keyboardType={isPhoneInput ? 'phone-pad' : 'email-address'}
                  />
                </View>
  
                {!isPhoneInput && (
                  <View style={styles.inputContainer1}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#999"
                      value={password}
                      secureTextEntry={!showPassword}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                      <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#000"
                      />
                    </TouchableOpacity>
                  </View>
                )}
  
                {!isPhoneInput && (
                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => navigation.navigate('Forgotpassword')}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}
  
                <TouchableOpacity
                  style={[styles.button, styles.loginButton]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#173C85" />
                  ) : (
                    <Text style={styles.loginButtonText}>
                      {isPhoneInput ? 'Send Code' : 'Sign In'}
                    </Text>
                  )}
                </TouchableOpacity>

                <View style={styles.orContainer}>
                  <Text style={styles.orText}>Or</Text>

                  <SocialLogin
                    ref={socialLoginRef}
                    navigation={navigation}
                    setSuccess={setSuccess}
                    setError={setError}
                    setLoading={setLoading}
                    deviceToken={deviceToken}
                  />

  
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      style={[styles.button, styles.appleButton]}
                      onPress={() => socialLoginRef.current?.onAppleButtonPress()}>
                      <Text style={styles.socialButtonText}>Sign In With Apple</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={[styles.button, styles.googleButton]}
                    onPress={() => socialLoginRef.current?.onGoogleButtonPress()}>
                    <Text style={styles.socialButtonText}>Sign In With Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.facebookButton]}
                    onPress={() => socialLoginRef.current?.onFacebookButtonPress()}>
                    <Text style={styles.socialButtonText}>Sign In With Facebook</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
  
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#173C85',
  },
  fixedLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#173C85',
    paddingTop: 60,
    paddingBottom: 10,
    zIndex: 10,
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 18.36,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signupText: {
    color: '#FFFFFF',
  },
  signupLink: {
    marginLeft: 5,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer1: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: '#000000',
    fontSize: 16,
    flex: 1,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
  },
  loginButtonText: {
    color: '#173C85',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  orText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 10,
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  guestContainer: {
    marginTop: 20,
  },
  guestText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});





export default Login;