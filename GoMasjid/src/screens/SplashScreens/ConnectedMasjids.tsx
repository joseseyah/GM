import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { themeFont } from '../../styles/theme';
import styles from '../../styles/SplashScreens/ConnectedMasjids';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  ConnectedMasjids: undefined;
  AuthStack: undefined;
  Mission: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ConnectedMasjids'>;
};

export const ConnectedMasjids = ({ navigation }: Props) => {
  const handleContinue = () => {
    navigation.navigate('Mission');
  };

  const handleSkip = async () => {
    await markAsNotFirstTime();
    navigation.replace('AuthStack');
  };

  const markAsNotFirstTime = async () => {
    try {
      await AsyncStorage.setItem('firstTimeUser', JSON.stringify({ firstTime: false }));
    } catch (error) {
      console.error('Error saving first time user status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masjids Who Have{'\n'}Connected With Us</Text>

      <View style={styles.logoGrid}>
        {Array.from({ length: 18 }).map((_, i) => (
          <View key={i} style={styles.circle} />
        ))}
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip To Login</Text>
      </TouchableOpacity>
    </View>
  );
};
