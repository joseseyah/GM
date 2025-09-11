import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { themeFont } from '../styles/theme';

const initUserContext = {
  settings: {
    // masjid: {
    //   name: '',
    //   location: '',
    //   id: '',
    // },
    font: {
      arabicSize: 30,
      arabicFamily: themeFont.indoPak,
      englishSize: 12,
      englishFamily: 20,
      displayEnglish: true,
      displayArabic: true,
      script: 'indopak',
      translation: 20,
      translation_slug: 'en-sahih-international',
      tafsir: 'ibn-kathir',
      tafsir_slug: 'en-tafsir-ibn-kathir',
      displayTafsir: false,
      quranView: 'list',
      audioSpeed: 1,
      theme: 'light',
      displayTajweed: false,
      displayTransliteration: false,
      trnslationLang: 'english'
    },
    reciter: {
      id: 7,
      name: 'Mishari Rashid al-`Afasy',
      slug: 'alafasy',
    },
    bookmarkNavigate: {
      id: '',
      verse_key: '',
      type: '',
      name: '',
      offset: '',
      ayatNumber: 1,
      bookmarkScrollIndex: 1
    },
    player : {
      currentSurahID: 0,
      currentPlayType: ''
    }
  },
  setSettings: (data: any) => {},
  isLoaded: false,
  setIsLoaded: () => {},
  changeSettings: (data: any) => {},
};

export const SettingsContext = createContext(initUserContext);

export function SettingsProvider({children}: any) {
  const [settings, setSettings] = useState(initUserContext.settings);
  const [isLoaded, setIsLoaded] = useState(false);

  const verifySession = async () => {
    try {
      const data = await AsyncStorage.getItem('settings');
      let asyncData;
      
      // Safely parse the JSON data or use default
      try {
        asyncData = data ? JSON.parse(data) : null;
      } catch (parseError) {
        console.log('Error parsing settings JSON:', parseError);
        asyncData = null;
      }
      
      // If no data was found or parsing failed, use default settings
      if (!asyncData) {
        asyncData = { ...initUserContext.settings };
        await AsyncStorage.setItem('settings', JSON.stringify(asyncData));
      }
      
      // Ensure all required properties exist in the settings object
      if (!asyncData.font) {
        asyncData.font = { ...initUserContext.settings.font };
      }
      
      // Initialize theme if not present
      if (!asyncData.font.theme) {
        asyncData.font.theme = 'light';
        asyncData.font.quranView = 'list';
      }
      
      // CRITICAL: Ensure reciter object exists to prevent "Cannot read property 'slug' of undefined" error
      if (!asyncData.reciter) {
        asyncData.reciter = { ...initUserContext.settings.reciter };
      }
      
      // Ensure bookmarkNavigate exists
      if (!asyncData.bookmarkNavigate) {
        asyncData.bookmarkNavigate = { ...initUserContext.settings.bookmarkNavigate };
      }
      
      // Ensure player exists
      if (!asyncData.player) {
        asyncData.player = { ...initUserContext.settings.player };
      }
      
      // Save the validated settings back to AsyncStorage
      await AsyncStorage.setItem('settings', JSON.stringify(asyncData));
      
      // Update state with validated settings
      setSettings(asyncData);
      console.log('SETTINGS data loaded successfully');
      setIsLoaded(true);
    } catch (error) {
      console.log('Verify session error:', error);
      // On error, use default settings
      setSettings(initUserContext.settings);
      await AsyncStorage.setItem('settings', JSON.stringify(initUserContext.settings));
      setIsLoaded(true);
    }
  };

  const changeSettings = (data: any) => {
    // Validate incoming data
    if (!data) {
      console.log('Empty settings data provided, using defaults');
      AsyncStorage.setItem('settings', JSON.stringify(initUserContext.settings));
      setSettings(initUserContext.settings);
      return;
    }
    
    // Create a new settings object with validated data
    const newSettings = { ...data };
    
    // Ensure all required properties exist
    if (!newSettings.reciter) {
      newSettings.reciter = { ...initUserContext.settings.reciter };
    }
    
    if (!newSettings.bookmarkNavigate) {
      newSettings.bookmarkNavigate = { ...initUserContext.settings.bookmarkNavigate };
    }
    
    if (!newSettings.player) {
      newSettings.player = { ...initUserContext.settings.player };
    }
    
    // Update state and save to AsyncStorage
    setSettings(newSettings);
    AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    console.log('Settings updated successfully');
  };

  useEffect(() => {
    verifySession();
  }, []);

  const userContext: any = {
    ...initUserContext,
    settings,
    setSettings,
    isLoaded,
    setIsLoaded,
    changeSettings,
  };

  return (
    <SettingsContext.Provider value={userContext}>
      {children}
    </SettingsContext.Provider>
  );
}
