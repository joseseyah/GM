import { Platform } from 'react-native';
import {create} from 'zustand';

const settingsStore = create<{
  showSettingScreen: boolean;
  theme: string;
  arabicFontValue: number;
  englishFontValue: number;
  showTranslation: boolean;
  quranView: 'list' | 'page' | string;
  brightness: number;
  audioAutoScroll: boolean;
  audioSpeed: any;
  arabicFont: any;
  setTheme: (theme: string) => void;
  setQuranView: (theme: string) => void;
}>((set, get) => ({
  showSettingScreen: false,
  theme: 'light',
  quranView: 'list',
  arabicFontValue: 30,
  englishFontValue: 12,
  brightness: 1,
  showTranslation: true,
  audioAutoScroll: true,
  audioSpeed: 1,
  // arabicFont: 'Al-Qalam-Quran',
  arabicFont: Platform.OS === 'ios' ? 'AlQuran IndoPak by QuranWBW' : 'IndoPak',
  setTheme: (theme: string) => {
    // console.log('this is the setting store +');

    set({
      theme: theme,
    });
  },
  setQuranView: (view: string) => {
    // console.log("set quranview");
    set({
      quranView: view,
    });
    // console.log(view)
  },
}));

export default settingsStore;
