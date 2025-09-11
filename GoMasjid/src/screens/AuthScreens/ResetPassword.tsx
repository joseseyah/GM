// screens/AuthScreens/ResetPassword.tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { resetPassword } from '../../services/auth';
import { themeFont } from '../../styles/theme';

const { height, width } = Dimensions.get('screen');

type RouteParams = {
  email: string;
  otp: string;
  userId?: string;
};

type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  reset: (state: any) => void;
};

const ResetPassword = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const params = route.params as RouteParams;
  
  // Safely extract parameters with fallbacks
  const email = params?.email || '';
  const otp = params?.otp || '';
  
  console.log('ResetPassword received params:', params);
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    if (!password) {
      setError('Please enter a new password');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await resetPassword(email, otp, password);
      
      if (response.status === 'success') {
        Alert.alert(
          "Success",
          "Your password has been reset successfully.",
          [
            { 
              text: "Login now", 
              onPress: () => navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            }
          ]
        );
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['rgba(242, 242, 242, 1)', 'rgba(247, 247, 247, 1)']}
      start={{x: 0.05, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Entypo name="chevron-left" size={30} color="#282828" />
          <Text style={styles.titleText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.titleHeader}>
          Create a new password for your account
        </Text>

        {/* New Password Input */}
        <View style={styles.inputWrapper}>
          <View
            style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#C7C7C7"
            />
          </View>
        </View>
        
        {/* Confirm Password Input */}
        <View style={styles.inputWrapper}>
          <View
            style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="#C7C7C7"
            />
          </View>
        </View>
        
        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="close-sharp" size={20} color="#FD2F2F" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}>
        <View style={styles.buttonWrapper}>
          <View
            style={styles.buttonNeomorph}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 40,
  },
  titleText: {
    color: '#282828',
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
    fontSize: 15,
  },
  content: {
    paddingHorizontal: 10,
  },
  titleHeader: {
    fontFamily: themeFont.englishFont,
    fontSize: 16,
    fontWeight: '600',
    color: '#282828',
    lineHeight: 20,
    marginBottom: 20,
  },
  inputWrapper: {
    marginTop: 15,
  },
  inputContainer: {
    shadowRadius: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    height: 50,
    width: width - 50,
  },
  input: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#202020',
    height: '100%',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 5,
  },
  errorText: {
    color: '#FD2F2F',
    fontSize: 12,
    marginLeft: 5,
    fontFamily: themeFont.englishFont,
  },
  button: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonWrapper: {
    width: 200,
    height: 45,
  },
  buttonNeomorph: {
    borderRadius: 15,
    backgroundColor: '#3DC8B2',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16.63,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
  },
});

export default ResetPassword;