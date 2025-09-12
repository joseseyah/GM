import { Dimensions, StyleSheet } from 'react-native';
import { themeFont } from '../../styles/theme';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
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