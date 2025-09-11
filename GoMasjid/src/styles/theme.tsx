import { Platform } from "react-native";

export const theme = {
  colors: {
    primary: '#184A2C',
    backgroundcard: '#F3F3F3',
    backgroundbutton: '#F5F5F5',
  },
  fonts: {
    // primary: 'Raleway',
    // secondary: 'Roboto',
    primary: 'WorkSans-Regular',
    secondary: 'WorkSans-Regular',
  },
  fontweight: {
    Railwaybold: '700',
    Railwaymedium: '600',
    Railwayregular: '500',
    Railwaynormalone: '400',
    Railwaynormal: '300',
  },

  style: {
    textAlign: 'justify',
  },
};
export const themeFont = {
  arabicFont: 'Al-Qalam-Quran',
  englishFont:  'Raleway-Bold',
  uthmani: Platform.OS === 'ios' ? 'KFGQPC Uthman Taha Naskh' : 'Uthmani',
  indoPak: Platform.OS === 'ios' ? 'AlQuran IndoPak by QuranWBW' : 'IndoPak',
}; 
export default theme;
