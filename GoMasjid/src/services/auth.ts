// services/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

// Base API URL
const API_URL = 'https://admin.gomasjid.co.uk';

export const getPlatformInfo = () => {
  return {
    platform: Platform.OS, // 'ios' or 'android'
  };
};

// User sign in with email and password
export const signin = async (email: string, password: string, deviceToken: string) => {
  try {
    const platformInfo = getPlatformInfo();
    
    const response = await axios.post(`${API_URL}/processlogin`, {
      email_or_phone: email,
      password,
      platform: platformInfo.platform,
      deviceToken: deviceToken
    });
    
    if (response.data.status === 'success') {
      // Store token
      await AsyncStorage.setItem('authToken', response.data.token);
      return response.data;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (phoneNumber: string, otp: string) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, {
      phone: phoneNumber,
      otp
    });
    
    if (response.data.status === 'success') {
      await AsyncStorage.setItem('authToken', response.data.token);
      return response.data;
    } else {
      throw new Error(response.data.message || 'OTP verification failed');
    }
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
};

// Get user data
export const getUserData = async (userId: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Get user data error:', error);
    throw error;
  }
};

// User sign up
export const signup = async (name: string, email: string, phone: string, password: string, phone_code: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      phone,
      phone_code,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Register user data
export const userRegister = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('User registration error:', error);
    throw error;
  }
};

// Facebook sign in for iOS
export const facebookIosSignUp = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/facebook-ios`);
    return response.data;
  } catch (error) {
    console.error('Facebook iOS login error:', error);
    throw error;
  }
};

// Facebook sign in for Android
export const facebookAndroidSignUp = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/facebook-android`);
    return response.data;
  } catch (error) {
    console.error('Facebook Android login error:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, {
      provider: "forgot_password",
      secret_key: "TRENCH8485868987",
      email: email
    });
    return response.data;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

export const verifyEmailOTP = async (email: string, otpCode: string) => {
  try {
    const response = await axios.post(`${API_URL}/verify-email`, {
      provider: "verify_email",
      secret_key: "TRENCH8485868987",
      email: email,
      otp_code: otpCode
    });
    console.log("Email verification", email, otpCode);
    console.log("Verify email response:", response);
    
    // Check if verification was successful
    if (response.data.status === 'success') {
      // Return the response data which includes email and user_id
      return response.data;
    } else {
      throw new Error(response.data.message || 'Email verification failed');
    }
  } catch (error) {
    console.error('Email verification error:', error);
    throw error;
  }
};

// Add this to your services/auth.ts file
export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, {
      provider: "change_password",
      secret_key: "TRENCH8485868987",
      email: email,
      new_password: newPassword
    });
    
    console.log("Reset password response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Password reset error details:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      });
    }
    console.error('Password reset error:', error);
    throw error;
  }
};

// Log out user
export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    
    // Remove token and user data from storage
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('isAuthenticated');
    
    // Call logout API if needed
    if (token) {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove data locally even if API call fails
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('isAuthenticated');
    return true;
  }
};

// services/auth.ts (add this function)
export const verifyMobileOTP = async (phone: string, otpCode: string, deviceToken: string) => {
  try {
    const platformInfo = getPlatformInfo();
    
    const response = await fetch('https://admin.gomasjid.co.uk/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: 'verify_phone',
        secret_key: 'TRENCH8485868987',
        email_or_phone: phone,
        otp: otpCode,
        platform: platformInfo.platform,
        deviceToken: deviceToken
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error verifying mobile OTP:', error);
    throw error;
  }
};

// Add this function for sending initial OTP to mobile
export const signinWithPhone = async (email_or_phone: string, deviceToken: string) => {
  try {
    const platformInfo = getPlatformInfo();
    
    const response = await fetch('https://admin.gomasjid.co.uk/processlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email_or_phone,
        platform: platformInfo.platform,
        deviceToken: deviceToken
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error sending OTP to mobile:', error);
    throw error;
  }
};

export const sendMobileOTP = async (mobileNumber: string) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, {
      provider: "mobile_verification",
      secret_key: "TRENCH8485868987",
      phone: mobileNumber
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending mobile OTP:', error);
    throw error;
  }
};

export const resendMobileOTP = async (mobileNumber: string) => {
  try {
    // Using the same endpoint as sendMobileOTP
    const response = await axios.post(`${API_URL}/send-mobile-otp`, {
      provider: "mobile_verification",
      secret_key: "TRENCH8485868987",
      phone: mobileNumber,
      resend: true
    });
    
    return response.data;
  } catch (error) {
    console.error('Error resending mobile OTP:', error);
    throw error;
  }
};

// export const verifyMobileOTP = async (mobileNumber: string, otp: string) => {
//   try {
//     const response = await axios.post(`${API_URL}/verify-mobile`, {
//       provider: "verify_mobile",
//       secret_key: "TRENCH8485868987",
//       phone: mobileNumber,
//       otp_code: otp
//     });
    
//     return response.data;
//   } catch (error) {
//     console.error('Error verifying mobile OTP:', error);
//     throw error;
//   }
// };

export const registerVerifiedUser = async (name: string, email: string, mobileNumber: string, password: string) => {
  try {
    // Using the same endpoint as your existing signup function
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      phone: mobileNumber,
      password,
      verified: true // Add this flag to indicate the mobile has been verified
    });
    
    return response.data;
  } catch (error) {
    console.error('Error registering verified user:', error);
    throw error;
  }
};

export const guestLogin = async (deviceToken: string) => {
  try {
    const platformInfo = getPlatformInfo();
    
    const response = await axios.post(`${API_URL}/guest-login`, {
      type: 'guest',
      deviceToken: deviceToken,
      platform: platformInfo.platform,
    });
    
    if (response.data.status === 'success') {
      return response.data;
    } 
  } catch (error) {
    // console.error('Guest login error:', error);
    // throw error;
  }
};