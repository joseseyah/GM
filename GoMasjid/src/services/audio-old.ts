import RNFS from 'react-native-fs';
import TrackPlayer, { Capability, State } from 'react-native-track-player';
import type { Surah, Juz, BismillahJson } from '../types/quran';
import bismillahJson from '../common/meta/bismillah.json';
const typedBismillahJson = bismillahJson as BismillahJson;
let isPlayerInitialized = false;

export const setupTrackPlayer = async () => {
  try {
    if (!isPlayerInitialized) {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            compactCapabilities: [Capability.Play, Capability.Pause],
        });
        isPlayerInitialized = true;
        console.log('Player successfully initialized.');
    }
} catch (error) {
    console.error('Error setting up track player:', error);
    isPlayerInitialized = false;
    throw error;
}
};

export const downloadAudioFile = async (
  url: string,
  reciter_slug: string,
  isBismillah: boolean,
  selected: 'surah' | 'juz' | '',
  meta: Surah | Juz | ''
): Promise<string> => {
  const cacheDir = isBismillah
    ? `${RNFS.DocumentDirectoryPath}/quranAudio/bismillah/${reciter_slug}`
    : `${RNFS.DocumentDirectoryPath}/quranAudio/${reciter_slug}/${selected}/${meta.number}`;

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

export const skipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

export const skipToNext = async () => {
  await TrackPlayer.skipToNext();
};

export const prepareAudioTracks = async (
  audioData: string[],
  juzMap: string[],
  meta: Surah | Juz,
  reciter_slug: string,
  selected: 'surah' | 'juz',
  addToTrack: boolean
) => {
  try {
    if (!isPlayerInitialized) {
      await setupTrackPlayer();
    }

    // Reset the queue before adding new tracks
    await TrackPlayer.reset();

    // Add first track immediately and start downloading others
    const firstVerse = audioData[0];
    const firstVerseKey = selected === 'juz' ? juzMap[0] : `${meta.number}:1`;

    if(selected != 'juz'){
      if (meta.number !== 1 &&  meta.number !== 9) {

        const bismillahURL = typedBismillahJson[reciter_slug];
        const cachedBismillah = await downloadAudioFile(
          bismillahURL,
          reciter_slug,
          true,
          selected,
          meta
        );
        if(addToTrack) {
          await TrackPlayer.add({
            key: firstVerseKey,
            url: `file://${cachedBismillah}`,
            title: meta.name,
            isBismillah: true,
          });
        }
      }
    }

    // Handle bismillah for first verse if needed
    if (
      selected === 'juz' &&
      firstVerseKey !== '1:1' &&
      /:\s*1$/.test(firstVerseKey) &&
      firstVerseKey !== '9:1'
    ) {
      const bismillahURL = typedBismillahJson[reciter_slug];
      const cachedBismillah = await downloadAudioFile(
        bismillahURL,
        reciter_slug,
        true,
        selected,
        meta
      );
      
      if(addToTrack) {
        await TrackPlayer.add({
          key: firstVerseKey,
          url: `file://${cachedBismillah}`,
          title: meta.name,
          isBismillah: true,
        });
      }
    }

    // Add and download first track
    const firstTrackPath = await downloadAudioFile(firstVerse, reciter_slug, false, selected, meta);
    if(addToTrack) {
      await TrackPlayer.add({
        key: firstVerseKey,
        url: `file://${firstTrackPath}`,
        title: meta.name,
        isBismillah: false,
      });
    }

    // Start downloading remaining tracks in the background
    downloadRemainingTracks(
      audioData.slice(1),
      juzMap.slice(1),
      meta,
      reciter_slug,
      selected,
      addToTrack
    );

  } catch (error) {
    console.error('Error preparing audio tracks:', error);
    throw error;
  }
};

const downloadRemainingTracks = async (
  remainingAudioData: string[],
  remainingJuzMap: string[],
  meta: Surah | Juz,
  reciter_slug: string,
  selected: 'surah' | 'juz',
  addToTrack: boolean
) => {
  try {
    let index = 1; // Start from 1 since we already handled index 0
    
    for (const audioUrl of remainingAudioData) {
      const verse_key = selected === 'juz' 
        ? remainingJuzMap[index - 1] 
        : `${meta.number}:${index + 1}`;

      // Handle bismillah for subsequent verses if needed
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
        
        if(addToTrack) {
          await TrackPlayer.add({
            key: verse_key,
            url: `file://${cachedBismillah}`,
            title: meta.name,
            isBismillah: true,
          });
        }
      }

      const cachedPath = await downloadAudioFile(audioUrl, reciter_slug, false, selected, meta);
      if(addToTrack) {
        await TrackPlayer.add({
          key: verse_key,
          url: `file://${cachedPath}`,
          title: meta.name,
          isBismillah: false,
        });
      }

      index++;
    }
  } catch (error) {
    console.error('Error downloading remaining tracks:', error);
  }
};

export const prepareBismillahTrack = async (
  reciter: string[],
) => {
  try {
    
    await TrackPlayer.reset()
    const bismillahURL = typedBismillahJson[reciter?.slug];
    const cachedBismillah = await downloadAudioFile(
      bismillahURL,
      reciter?.slug,
      true,
      '',
      ''
    );
    
    await TrackPlayer.add({
      key: `${reciter?.id}`,
      url: `file://${cachedBismillah}`,
      title: `${reciter?.name}`,
      isBismillah: true,
    });

  } catch (error) {
    console.error('Error preparing audio tracks:', error);
    throw error;
  }
};