import { Dimensions, StyleSheet } from 'react-native';
import { themeFont } from '../../styles/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
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