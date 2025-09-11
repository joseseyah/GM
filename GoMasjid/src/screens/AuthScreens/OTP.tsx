import React, { useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeFont } from '../../styles/theme';

const {width, height} = Dimensions.get('screen');

type Props = {
  phoneNumber: string;
  handleSubmit: (otp: string) => Promise<void>;
  goBack: () => void;
  onResend: () => Promise<void>;
};

const OTP = ({phoneNumber, handleSubmit, goBack, onResend}: Props) => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await onResend(); // Call the resend OTP function
      setError('');
    } catch (e) {
      setError('Failed to resend the code. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerify = async () => {
    console.log('otp', otp);
    if (otp === '') {
      setError('Please enter valid OTP');
    } else if (otp.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
    } else {
      setError('');
      setLoading(true);
      try {
        await handleSubmit(otp);
      } catch (error) {
        setError('Failed to verify OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={goBack}
          style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Entypo name="chevron-left" size={30} color="#282828" />
          <Text style={styles.titleText}>Verify</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 40,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.titleHeader}>
            Please enter the code sent to your phone number {phoneNumber} to
            verify your account
          </Text>

          <View style={{paddingTop: 15, width: '100%', height: 'auto'}}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: 'white',
                paddingVertical: 10,
              }}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="123456"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
                keyboardType="numeric"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleResend}
            disabled={resendLoading}
            style={{marginTop: 10, alignItems: 'flex-end'}}>
            <Text style={{fontSize: 12, fontWeight: '400', color: '#3DC8B2'}}>
              {resendLoading ? 'Resending...' : "Didn't receive the code?"}
            </Text>
          </TouchableOpacity>
          {error !== '' && (
            <View style={styles.errorContainer}>
              <Ionicons name="close-sharp" size={20} color="#FD2F2F" />
              <Text style={styles.error}>{error}</Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        disabled={loading}>
        <View
          style={{
            borderRadius: 15,
            backgroundColor: '#3DC8B2',
            paddingVertical: 11,
            paddingHorizontal: 45,
            flexDirection: 'row',
            gap: 5,
          }}>
          {loading && <ActivityIndicator size="small" color="#fff" />}
          <Text style={styles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#F4F4F4',
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleText: {
    color: '#282828',
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#464444',
  },
  titleHeader: {
    textAlign: 'left',
    fontFamily: themeFont.englishFont,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 15,
    color: '#282828',
    lineHeight: 20,
  },
  titleFooter: {
    fontSize: 13,
    paddingTop: 15,
    color: '#000000',
  },
  button: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    fontFamily: themeFont.englishFont,
    fontStyle: 'normal',
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 15,
    shadowColor: '#000',
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 30,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  inputContainer: {
    height: 'auto',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 18.21,
    paddingLeft: 18,
    marginBottom: 10,
    shadowRadius: 5,
  },
});

export default OTP;