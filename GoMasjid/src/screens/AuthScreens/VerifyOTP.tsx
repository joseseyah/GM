// screens/AuthScreens/VerifyOTP.tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { sendPasswordResetEmail, verifyEmailOTP } from '../../services/auth';
import { themeFont } from '../../styles/theme';

const { height, width } = Dimensions.get('screen');

type RouteParams = {
  email: string;
};

type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
};

const VerifyOTP = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { email } = route.params as RouteParams;
  
  // OTP is 4 digits according to your example
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Create refs for each input field
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const setInputRef = useCallback((ref: TextInput | null, index: number) => {
    inputRefs.current[index] = ref;
  }, []);
  
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = Array(4).fill(null); // Initialize with 4 refs
    setTimeout(() => {
      inputRefs.current[0]?.focus(); // Focus the first input
    }, 100); // slight delay helps if layout is not ready immediately
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length <= 1) { // Ensure only one character per input
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      
      // Auto-focus next input if value is entered
      if (text.length === 1 && index < 3) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 50); // slight delay to ensure the ref is mounted
      }
    }
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setError('');
    } catch (e) {
      setError('Failed to resend the code. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

// Update your handleVerifyOTP function in VerifyOTP.tsx
const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 4) {
      setError('Please enter all 4 digits of the code');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Use the verifyEmailOTP function
      const response = await verifyEmailOTP(email, otpValue);
      
      if (response.status === 'success') {
        // Console log to debug
        console.log('Navigation params:', { 
          email: response.email, 
          userId: response.user_id,
          otpCode: otpValue 
        });
        
        // Navigate with simpler params first
        navigation.navigate('ResetPassword', { 
          email: email,
          otp: otpValue
        });
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      setError('Failed to verify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Entypo name="chevron-left" size={24} color="#282828" />
          <Text style={styles.titleText}>Verify</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.titleHeader}>
          We have sent you a code on your email address.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.digitContainer}>
              <TextInput
                ref={ref => setInputRef(ref, index)}
                style={styles.digitInput}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                onKeyPress={e => handleBackspace(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            </View>
          ))}
        </View>
        
        <TouchableOpacity
          onPress={handleResendOTP}
          disabled={resendLoading}
          style={styles.resendContainer}>
          <Text style={styles.resendText}>
            {resendLoading ? 'Sending...' : "Didn't receive the code?"}
          </Text>
        </TouchableOpacity>
        
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyOTP}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 30,
  },
  titleText: {
    color: '#282828',
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
    fontSize: 18,
  },
  content: {
    paddingHorizontal: 10,
  },
  titleHeader: {
    fontFamily: themeFont.englishFont,
    fontSize: 18,
    fontWeight: '600',
    color: '#282828',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  digitContainer: {
    width: 70, // Wider input box
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50, // Changed from 25 to 10 for more rectangular shape
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  digitInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#282828',
  },
  resendContainer: {
    marginTop: 1,
    alignItems: 'flex-end', // Aligned to right side as in screenshot
    paddingRight: 10,
  },
  resendText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#282828',
    fontFamily: themeFont.englishFont,
  },
  errorText: {
    marginTop: 20,
    color: '#FD2F2F',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
  },
  buttonContainer: {
    marginTop: 50,
    // position: 'absolute',
    // bottom: 50,
    // left: 0,
    // right: 0,
    alignItems: 'center', // Center the button horizontally
    justifyContent: 'center',
  },
  button: {
    width: '40%',
    height: 45,
    backgroundColor: '#3DC8B2', // Base color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5EDBCB', // Lighter color for top-left highlight
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: themeFont.englishFont,
  },
});

export default VerifyOTP;
