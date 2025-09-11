import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { sendPasswordResetEmail } from '../../services/auth';

type ForgotNavigationProp = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
};

const Forgot = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<ForgotNavigationProp>();
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await sendPasswordResetEmail(email);
      setSuccessMsg(response.message);
      navigation.navigate('VerifyOTP', { email });
    } catch (error) {
      setLoading(false);
      setMessage('Error while sending code. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/gm_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        If you forgot your password, please enter your email address below and we’ll send you a verification code to reset your password.
      </Text>

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#C7C7C7"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {message ? <Text style={styles.error}>{message}</Text> : null}
      {successMsg ? <Text style={styles.success}>{successMsg}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSendResetEmail}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#173C85" />
        ) : (
          <Text style={styles.buttonText}>Send Code</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#173C85',
    padding: 30,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  logo: {
    width: 180,
    height: 60,
    alignSelf: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 18.36,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#F2F2F2',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#173C85',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#173C85',
    fontSize: 15,
    fontWeight: '700',
  },
  error: {
    color: '#FD2F2F',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  success: {
    color: '#3DC8B2',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  backText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default Forgot;
