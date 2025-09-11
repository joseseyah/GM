// Types and Interfaces
interface BismillahJson {
  'abdulbaset-mujawwad': string;
  'abdulbaset-murattal': string;
  'sudais': string;
  'shatri': string;
  'rifai': string;
  'alafasy': string;
  'minshawi-murattal': string;
  'shuraym': string;
  [key: string]: string; // Index signature for dynamic access
}

// interface RecitersImg {
//   'abdulbaset-mujawwad': string;
//   'abdulbaset-murattal': string;
//   'sudais': string;
//   'shatri': string;
//   'rifai': string;
//   'alafasy': string;
//   'minshawi-murattal': string;
//   'shuraym': string;
//   [key: string]: string; // Index signature for dynamic access
// }

interface AudioVerse {
  meta: {
    id: number;
    name: string;
    slug: string;
  };
  verses: string[];
}

interface ReciterData {
  [key: string]: AudioVerse;
}

interface SurahAudioData {
  [key: number]: ReciterData;
}

interface JuzMappingData {
  [key: number]: {
    verse_mappings: string[];
  };
}

// interface SurahFiles {
//   [key: number]: {
//     verse_mappings: string[];
//   };
// }
// interface JuzFiles {
//   [key: number]: {
//     verse_mappings: string[];
//   };
// }
// interface TranslationFiles {
//   [key: number]: {
//     [key: string]: string[];
//   };
// }

// interface TranslationJuzFiles {
//   [key: number]: {
//     [key: string]: string[];
//   };
// }

// interface TafsirFiles {
//   [key: number]: {
//     [key: string]: string[];
//   };
// }
// interface TafsirJuzFiles {
//   [key: number]: {
//     [key: string]: string[];
//   };
// }

interface TranslatedName {
  language_name: string;
  name: string;
}

interface Surah {
  number: number;
  revelation_place: 'makkah' | 'madinah';
  name: string;
  total_ayah: number;
  translated_name: TranslatedName;
}

interface Juz {
  number: number;
  name: string;
  total_ayah: number;
  translated_name: TranslatedName;
}

interface UIState {
  searchVisible: boolean;
  searchText: string;
  selected: 'surah' | 'juz';
}

interface AppData {
  surahs: Surah[];
  juzData: Juz[];
  audioData: string[];
  juzMap: string[];
}

interface QuranNavigationProps {
  navigation: any; // Ideally should be typed with proper navigation type
}

export type {
  BismillahJson,
  AudioVerse,
  ReciterData,
  SurahAudioData,
  JuzMappingData,
  TranslatedName,
  Surah,
  Juz,
  UIState,
  AppData,
  QuranNavigationProps,
  // RecitersImg
  // SurahFiles,
  // JuzFiles,
  // TranslationFiles,
  // TranslationJuzFiles,
  // TafsirFiles,
  // TafsirJuzFiles
};