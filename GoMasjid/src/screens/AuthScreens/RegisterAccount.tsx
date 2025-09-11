import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Linking } from 'react-native';

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
// @ts-ignore
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../context/UserProvider';
import { guestLogin, signup, userRegister } from '../../services/auth';
import { themeFont } from '../../styles/theme';
import SocialLogin from './SocialLogin';
import { useFocusEffect } from '@react-navigation/native';
import { getCountryCodes } from '../../services/api';
import { isValidPhoneNumber } from 'libphonenumber-js';

const categories = [
  { title: 'UK', value: '+44' },
  { title: 'USA', value: '+1' },
  { title: 'IND', value: '+91' },
  { title: 'PAK', value: '+92' },
];
const phoneRegex =
  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const { height, width } = Dimensions.get('window');

const RegisterScreen = ({navigation, route}: any) => {
  const deviceToken = route.params?.deviceToken || '';
  console.log("Device Token:", deviceToken);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setUserInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconPassword, setShowconPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
  });
  const [isFocused, setIsFocused] = useState(false);
  const [countryCode, setCountryCode] = useState('44');
  const [allCountryCodes, setAllCountryCodes] = useState([{phone: '', country_code: ''}]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCountryCodes = async () => {
        const codes = await getCountryCodes();
        setAllCountryCodes(codes);
      };
      fetchCountryCodes();
    }, [])
  );

  const checkEmailExistence = async (email : any) => {
    try {
      // This would typically be an API call to check if email exists
      // For now, just return false
      return false;
    } catch (error) {
      console.error('Error checking email existence: ', error);
      return false;
    }
  };

  const handleRegistration = async () => {
    // Validate all fields
    validateName();
    validateEmail();
    validatePhone(number);
    validatePassword();
    confirmValidatePassword();
  
    // Check if there are any validation errors
    if (
      name === '' ||
      email === '' ||
      number === '' ||
      password === '' ||
      confirmPassword === '' ||
      Object.values(errors).some(error => error !== '')
    ) {
      console.log("Validation failed");
      return;
    }
  
    // Confirm passwords match
    if (password !== confirmPassword) {
      setErrors(prevState => ({
        ...prevState,
        confirmPassword: 'Passwords do not match'
      }));
      return;
    }
  
    // All validations passed, proceed with signup
    setLoading(true);
    setError('');
    
    try {
      // Send phone number and phone_code separately
      const response = await signup(name, email, number, password, countryCode);
      
      console.log("Registration response:", response);
      
      if (response && response.status === "success") {
        setSuccess('Registration successful!');
        
        // Show alert that verification link has been sent
        Alert.alert(
          "Success",
          "Verification link has been sent to your email!",
          [
            { text: "OK", onPress: () => {
              // Navigate back to login screen after alert is dismissed
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }}
          ]
        );
      } else {
        setError(response?.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Error during registration:', error);
      
      if (error.response) {
        // Server responded with an error
        setError(error.response.data?.message || 'Registration failed');
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateName = () => {
    if (name.trim() === '') {
      setErrors(prevState => ({...prevState, name: 'Please Enter A Name'}));
    } else {
      setErrors(prevState => ({...prevState, name: ''}));
    }
  };

  const validateEmail = () => {
    if (email.trim() === '') {
      setErrors(prevState => ({...prevState, email: 'Please Enter An Email'}));
    } else if (!emailRegex.test(email)) {
      setErrors(prevState => ({
        ...prevState,
        email: 'Please Enter A Valid Email',
      }));
    } else {
      setErrors(prevState => ({...prevState, email: ''}));
    }
  };

  const validatePhone = (number: string ) => {
    // if (number === '' || !phoneRegex.test(countryCode + number)) {
    //   setErrors(prevState => ({
    //     ...prevState,
    //     number: 'Please enter a phone number',
    //   }));
    const phone = `+${countryCode}${number}`;
    if (!isValidPhoneNumber(phone)) {
      setErrors(prevState => ({
        ...prevState,
        number: 'Invalid phone number',
      }));
    } else {
      setIsFocused(false);
      setErrors(prevState => ({...prevState, number: ''}));
    }
  };

  const validatePassword = () => {
    if (password.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        password: 'Please Enter Password',
      }));
    } else if (password.length < 8) {
      setErrors(prevState => ({
        ...prevState,
        password: 'Password must be at least 8 characters long',
      }));
    } else {
      setErrors(prevState => ({...prevState, password: ''}));
    }
  };

  const confirmValidatePassword = () => {
    if (confirmPassword.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        confirmPassword: 'Please enter confirm password',
      }));
    } else if (password !== confirmPassword) {
      setErrors(prevState => ({
        ...prevState,
        confirmPassword: 'Password do not match',
      }));
    } else {
      setErrors(prevState => ({...prevState, confirmPassword: ''}));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleView = () => {
    setShowPassword(!showPassword);
  };

  const toggleView2 = () => {
    setShowconPassword(!showconPassword);
  };

  const asGuest = () => {
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
    
    setUserInfo(setData);
    AsyncStorage.setItem('userInfo', JSON.stringify(setData));
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeStack' }],
    });
  };

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
  
      {/* Scrollable form section */}
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
  
          
  
          <View style={styles.formWrapper}>
            <View style={styles.transparentContainer}>
              <Text style={styles.title}>Create an account</Text>

              <View style={styles.signinContainer}>
                <Text style={styles.signinText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.signinLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
  
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#C7C7C7"
                  keyboardType="ascii-capable"
                  autoFocus={true}
                  onChangeText={text => setName(text)}
                  onBlur={validateName}
                />
              </View>
              {errors.name !== '' && <Text style={styles.error}>{errors.name}</Text>}
  
              <View style={styles.phoneRow}>
                <View style={styles.countryCodeDropdown}>
                  <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)} style={styles.dropdownButton}>
                    <Text style={styles.dropdownText}>+{countryCode}</Text>
                    <Entypo
                      name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
                      color="#000"
                      size={11}
                    />
                  </TouchableOpacity>
  
                  {isDropdownOpen && (
                    <View style={styles.dropdownMenu}>
                      {allCountryCodes.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setCountryCode(item.phone);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{item.country_code}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
  
                <View style={styles.input1}>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#C7C7C7"
                    keyboardType="phone-pad"
                    maxLength={15}
                    value={number}
                    onChangeText={text => {
                      setNumber(text);
                      validatePhone(text);
                    }}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                  />
                </View>
              </View>
              {errors.number !== '' && <Text style={styles.error}>{errors.number}</Text>}
  
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#C7C7C7"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  onBlur={validateEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email !== '' && <Text style={styles.error}>{errors.email}</Text>}
  
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#C7C7C7"
                  value={password}
                  secureTextEntry={!showPassword}
                  onChangeText={text => setPassword(text)}
                  onBlur={validatePassword}
                />
                <TouchableOpacity onPress={toggleView} style={styles.eyeIcon}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={16}
                    color="#C7C7C7"
                  />
                </TouchableOpacity>
              </View>
              {errors.password !== '' && <Text style={styles.error}>{errors.password}</Text>}
  
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#C7C7C7"
                  value={confirmPassword}
                  secureTextEntry={!showconPassword}
                  onChangeText={text => setConfirmPassword(text)}
                  onBlur={confirmValidatePassword}
                />
                <TouchableOpacity onPress={toggleView2} style={styles.eyeIcon}>
                  <Ionicons
                    name={showconPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={16}
                    color="#C7C7C7"
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword !== '' && <Text style={styles.error}>{errors.confirmPassword}</Text>}
  
              {error !== '' && <Text style={styles.generalError}>{error}</Text>}
  
              <TouchableOpacity
                style={[styles.button, styles.signupButton]}
                onPress={handleRegistration}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#173C85" />
                ) : (
                  <Text style={styles.signupButtonText}>Continue</Text>
                )}
              </TouchableOpacity>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By signing up you agree to Go Masjid's{' '}
                  <Text
                    style={styles.linkText}
                    onPress={() => Linking.openURL('https://gomasjid.com/terms')}
                  >
                    Terms & Conditions
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={styles.linkText}
                    onPress={() => Linking.openURL('https://gomasjid.com/privacy')}
                  >
                    Privacy Policy
                  </Text>.
                </Text>
              </View>
  
              <View style={styles.orContainer}>
                <Text style={styles.orText}>Or</Text>
  
                <TouchableOpacity style={[styles.button, styles.appleButton]}>
                  <Text style={styles.socialButtonText}>Sign In With Apple</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={[styles.button, styles.googleButton]}>
                  <Text style={styles.socialButtonText}>Sign In With Google</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={[styles.button, styles.facebookButton]}>
                  <Text style={styles.socialButtonText}>Sign In With Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
  
          <View style={styles.spacer} />
  
          <Text style={styles.success}>{success}</Text>
        </View>
      </ScrollView>
    </View>
  );
  
  
};

const styles = StyleSheet.create({
  fixedLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#173C85',
    paddingTop: 60,
    paddingBottom: 10,
    zIndex: 10,
  },
  
  rootContainer: {
    flex: 1,
    backgroundColor: '#173C85', // solid blue background
  },
    button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
  },
  signupButtonText: {
    color: '#173C85',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#173C85',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
  formWrapper: {
    width: '100%',
  },
  transparentContainer: {
    width: '100%',
    paddingHorizontal:0,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 18.36,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    marginBottom: 15,
    flexDirection: 'row', // 👈 ADD THIS
    alignItems: 'center',  // 👈 AND THIS
  },
  
  input: {
    color: '#000000',
    fontSize: 16,
    flex: 1,
  },
  phoneRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    zIndex: 100,
  },
  input1: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeDropdown: {
    position: 'relative',
  },
  dropdownButton: {
    width: 70,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18.21,
    borderBottomLeftRadius: 18.21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dropdownText: {
    color: '#000000',
    fontSize: 11,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
    alignItems: 'center',
  },
  dropdownItemText: {
    color: '#000000',
    fontSize: 12,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  
  error: {
    color: '#FD2F2F',
    marginVertical: 2,
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 9,
    textShadowColor: 'rgba(255, 255, 255, 0.33)',
    textShadowRadius: 10,
  },
  generalError: {
    color: '#FD2F2F',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'center',
  },
  signin: {
    marginRight: 10,
    marginLeft: 15,
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: themeFont.englishFont,
  },
  guestText: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 10.95,
    fontWeight: '400',
    fontFamily: themeFont.englishFont,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
  labelContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
    fontFamily: themeFont.englishFont,
  },
  underline: {
    textDecorationLine: 'underline',
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
    fontFamily: themeFont.englishFont,
    marginLeft: 5,
  },
  label: {
    color: 'blue',
    marginLeft: 5,
  },
  spacer: {
    top: 100,
  },
  success: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signinText: {
    color: '#FFFFFF',
  },
  signinLink: {
    marginLeft: 5,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
    marginBottom: 20, // or even 25 if you want more space
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
  termsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 14,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#FFFFFF',
  },
  
  
  
});


export default RegisterScreen;