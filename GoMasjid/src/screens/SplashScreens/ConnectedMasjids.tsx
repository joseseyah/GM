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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15386C',
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: themeFont.englishFont,
  },
  logoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    margin: 8,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: width * 0.8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  continueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: '#000000',
    borderRadius: 30,
    width: width * 0.8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
