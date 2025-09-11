import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { themeFont } from '../../styles/theme';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  WalkThrough: undefined;
  ConnectedMasjids: undefined;
  AuthStack: undefined;
  HomeStack: undefined;
};

type WalkThroughScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WalkThrough'>;

type Props = {
  navigation: WalkThroughScreenNavigationProp;
};

const WalkThroughScreen = ({ navigation }: Props) => {
  const handleNext = () => {
    navigation.navigate('ConnectedMasjids');
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
      <Text style={styles.title}>Welcome To Go Masjid</Text>

      <View style={styles.card}>
        <View style={styles.feature}>
          <FontAwesome5 name="mosque" size={26} color="#1A452F" style={styles.icon} />
          <View>
            <Text style={styles.featureTitle}>Prayer Times</Text>
            <Text style={styles.featureDesc}>Connect to your Local masjid’s prayer times</Text>
          </View>
        </View>

        <View style={styles.feature}>
          <FontAwesome5 name="book-open" size={24} color="#1A452F" style={styles.icon} />
          <View>
            <Text style={styles.featureTitle}>Quran</Text>
            <Text style={styles.featureDesc}>Read and listen to the Holy Quran</Text>
          </View>
        </View>

        <View style={[styles.feature, { marginBottom: 0 }]}>
          <FontAwesome5 name="hand-pointer" size={26} color="#1A452F" style={styles.icon} />
          <View>
            <Text style={styles.featureTitle}>User-Friendly Interface</Text>
            <Text style={styles.featureDesc}>Take advantage of the easy-to-use user interface</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip To Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalkThroughScreen;

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
    marginRight: 15,
    marginTop: 5,
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
    maxWidth: width * 0.55,
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
