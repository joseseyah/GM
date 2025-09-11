import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { themeFont } from '../../styles/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.82;
const BUTTON_WIDTH = width * 0.9;

type RootStackParamList = {
  Mission: undefined;
  AuthStack: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Mission'>;
};

const Mission = ({ navigation }: Props) => {
  const handleContinue = async () => {
    await markAsNotFirstTime();
    navigation.replace('AuthStack');
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
      <Text style={styles.title}>Our Mission</Text>

      <View style={styles.card}>
        <View style={styles.feature}>
          <FontAwesome5 name="pound-sign" size={24} color="#1A452F" style={styles.icon} />
          <View style={styles.textBlock}>
            <Text style={styles.featureTitle}>Free For Everyone</Text>
            <Text style={styles.featureDesc}>
              Access all features without any cost — our mission is to serve the community, not profit from it.
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <FontAwesome5 name="ban" size={24} color="#1A452F" style={styles.icon} />
          <View style={styles.textBlock}>
            <Text style={styles.featureTitle}>Ad-Free</Text>
            <Text style={styles.featureDesc}>
              Enjoy a clean, distraction-free experience with no third-party advertisements.
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <FontAwesome5 name="lock" size={24} color="#1A452F" style={styles.icon} />
          <View style={styles.textBlock}>
            <Text style={styles.featureTitle}>Privacy Focused</Text>
            <Text style={styles.featureDesc}>
              We respect your data. No tracking, no selling — your privacy is our priority.
            </Text>
          </View>
        </View>
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

export default Mission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15386C',
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    fontFamily: themeFont.englishFont,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 294,
    height: 446,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 40,
    justifyContent: 'flex-start',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  icon: {
    marginRight: 18,
    marginTop: 3,
  },
  textBlock: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 18,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: BUTTON_WIDTH,
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
    width: BUTTON_WIDTH,
    paddingVertical: 15,
    alignItems: 'center',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

