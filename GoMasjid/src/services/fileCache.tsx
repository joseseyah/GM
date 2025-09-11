import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
// import url from '../common/data/translation/en-haleem/juz/1.json'

export const loadTranslationJsonFile = async (translation_slugi: string, type: string, id: number) => {
  const filePath = `data/translation/${translation_slugi}/${type}/${id}.json`;
  try {
    if (Platform.OS === 'android') {
      // For Android, directly read from assets
      const content = await RNFS.readFileAssets(filePath, 'utf8');
      // console.log('content', content)
      return JSON.parse(content);
    } else {
      // For iOS
      const content = await RNFS.readFile(`${RNFS.MainBundlePath}/${filePath}`, 'utf8');
      // console.log('content', content)
      return JSON.parse(content);
    }
  } catch (error) {
    // console.error(`Error loading ${filePath}:`, error);
    // throw error;
  }
};

// export const loadQuranJsonFile = async (id: number, type: string) => {
//   const filePath = `data/${type}/${id}.json`;
//   try {
//     if (Platform.OS === 'android') {
//       const content = await RNFS.readFileAssets(filePath, 'utf8');
//       return JSON.parse(content);
//     } else {
//       const content = await RNFS.readFile(`${RNFS.MainBundlePath}/${filePath}`, 'utf8');
//       return JSON.parse(content);
//     }
//   } catch (error) {
//     // console.error(`Error loading ${filePath}:`, error);
//     throw error;
//   }
// };

export const loadTafsirJsonFile = async (tafsir_slug: string, type: string, id: number) => {
  const filePath = `data/tafsir/${tafsir_slug}/${type}/${id}.json`;
  try {
    if (Platform.OS === 'android') {
      const content = await RNFS.readFileAssets(filePath, 'utf8');
      return JSON.parse(content);
    } else {
      const content = await RNFS.readFile(`${RNFS.MainBundlePath}/${filePath}`, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    // console.error(`Error loading ${filePath}:`, error);
    // throw error;
  }
};

// export const loadAudioJsonFile = async (reciter_slugi: string, type: string, id: number) => {
//   const filePath = `data/audio/${reciter_slugi}/${type}/${id}.json`;
//   try {
//     if (Platform.OS === 'android') {
//       const content = await RNFS.readFileAssets(filePath, 'utf8');
//       return JSON.parse(content);
//     } else {
//       const content = await RNFS.readFile(`${RNFS.MainBundlePath}/${filePath}`, 'utf8');
//       return JSON.parse(content);
//     }
//   } catch (error) {
//     // console.error(`Error loading ${filePath}:`, error);
//     // throw error;
//   }
// };

// export const loadAudioJuzMapJsonFile = async (id: number) => {
//   const filePath = `data/audio/juz-mapping/${id}.json`;
//   try {
//     if (Platform.OS === 'android') {
//       const content = await RNFS.readFileAssets(filePath, 'utf8');
//       return JSON.parse(content);
//     } else {
//       const content = await RNFS.readFile(`${RNFS.MainBundlePath}/${filePath}`, 'utf8');
//       return JSON.parse(content);
//     }
//   } catch (error) {
//     // console.error(`Error loading ${filePath}:`, error);
//     // throw error;
//   }
// };

export const DuasData = async (uri: string) => {
  const filePath = `data/dua/subCats/${uri}.json`;
  try {
    if (Platform.OS === 'android') {
      const content = await RNFS.readFileAssets(filePath, 'utf8');
      return JSON.parse(content);
    } else {
      const content = await RNFS.readFile(`${RNFS.MainBundlePath}/${filePath}`, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    // console.error(`Error loading ${filePath}:`, error);
    // throw error;
  }
};

export const DuaCatData = async (catId: number) => {
  const filePath = `data/dua/cat${catId}.json`;
  try {
    if (Platform.OS === 'android') {
      const content = await RNFS.readFileAssets(filePath, 'utf8');
      return JSON.parse(content);
    } else {
      const content = await RNFS.readFile(`${RNFS.MainBundlePath}/${filePath}`, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    // console.error(`Error loading ${filePath}:`, error);
    // throw error;
  }
};