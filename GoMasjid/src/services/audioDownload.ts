import RNFS from 'react-native-fs';
import type { BismillahJson } from '../types/quran';
import bismillahJson from '../common/meta/bismillah.json';
const typedBismillahJson = bismillahJson as BismillahJson;

export const downloadAudioFile = async (
  url: string,
  reciter_slug: string,
  isBismillah: boolean,
  selected: 'surah' | 'juz' | '',
  meta: number
): Promise<string> => {
  const cacheDir = isBismillah
    ? `${RNFS.DocumentDirectoryPath}/quranAudio/bismillah/${reciter_slug}`
    : `${RNFS.DocumentDirectoryPath}/quranAudio/${reciter_slug}/${selected}/${meta}`;

  try {
    const exists = await RNFS.exists(cacheDir);
    if (!exists) {
      await RNFS.mkdir(cacheDir);
    }

    const fileName = url.split('/').pop();
    if (!fileName) throw new Error('Invalid URL');
    
    const filePath = `${cacheDir}/${fileName}`;
    const fileExists = await RNFS.exists(filePath);
    
    if (fileExists) return filePath;

    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
    }).promise;

    if (result.statusCode === 200) {
      return filePath;
    }
    console.log(result);
    throw new Error(`Download failed with status: ${result.statusCode}`);
  } catch (error) {
    console.error('Error downloading audio file:', error);
    throw error;
  }
};

export const prepareAudioTracks = async (
  audioData: string[],
  juzMap: string[],
  meta: number,
  reciter_slug: string,
  selected: 'surah' | 'juz',
) => {
  try {
    for (let i = 0; i < audioData.length; i++) {
      const verse_url = audioData[i];
      const cachedPath = await downloadAudioFile(verse_url, reciter_slug, false, selected, meta);
      const verse_key = selected === 'juz' ? juzMap[i] : `${meta}:${i+1}`;

      if (
        selected === 'juz' &&
        verse_key !== '1:1' &&
        /:\s*1$/.test(verse_key) &&
        verse_key !== '9:1'
      ) {
        const bismillahURL = typedBismillahJson[reciter_slug];
        const cachedBismillah = await downloadAudioFile(
          bismillahURL,
          reciter_slug,
          true,
          selected,
          meta
        );
        // console.log(cachedBismillah);
      }
      
      // console.log("downloading", cachedPath);
      
    }

  } catch (error) {
    console.error('Error preparing audio tracks:', error);
    throw error;
  }
};

export const checkDownload = async (
  selected: 'surah' | 'juz' | '',
  id: number,
  reciter_slug: string,
) => {

  const cacheDir = `${RNFS.DocumentDirectoryPath}/quranAudio/${reciter_slug}/${selected}/${id}`;
  try {
    const exists = await RNFS.exists(cacheDir);
    if (!exists) {
      return 0;
    }

    const files = await RNFS.readDir(cacheDir);

    const downloadedCount = files.length;
    // console.log("length", downloadedCount);
    return downloadedCount;
  } catch (error) {
    console.error('Error preparing audio tracks:', error);
    throw error;
  }
};