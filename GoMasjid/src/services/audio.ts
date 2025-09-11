import RNFS from 'react-native-fs';
import TrackPlayer, { Capability, State } from 'react-native-track-player';
import type { BismillahJson } from '../types/quran';
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
    // console.error('Error setting up track player:', error);
    isPlayerInitialized = false;
    throw error;
}
};

export const downloadAudioFile = async (
  url: string,
  reciter_slug: string
): Promise<string> => {
  const cacheDir = `${RNFS.DocumentDirectoryPath}/quranAudio/bismillah/${reciter_slug}`;

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
    // console.error('Error downloading audio file:', error);
    throw error;
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
      reciter?.slug
    );
    
    await TrackPlayer.add({
      key: `${reciter?.id}`,
      url: `file://${cachedBismillah}`,
      title: `${reciter?.name}`,
      isBismillah: true,
    });

  } catch (error) {
    // console.error('Error preparing audio tracks:', error);
    throw error;
  }
};