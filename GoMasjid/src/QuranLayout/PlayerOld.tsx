import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SettingsContext } from '../context/SettingsProvider';
import { surahAudioFiles, JuzAudioFiles, JuzMapping } from '../common/meta/surahFiles';
import { JuzMappingData, SurahAudioData, BismillahJson } from '../types/quran';
import playerStore from '../stores/playerStore';
import TrackPlayer, { Capability, State, useTrackPlayerEvents, Event } from 'react-native-track-player';
import RNFS from 'react-native-fs';
import bismillahJson from '../common/meta/bismillah.json';
let isPlayerInitialized = false;
const typedSurahAudioFiles = surahAudioFiles as SurahAudioData;
const typedJuzAudioFiles = JuzAudioFiles as SurahAudioData;
const typedJuzMapping = JuzMapping as JuzMappingData;
const typedBismillahJson = bismillahJson as BismillahJson;
const Player = ({ metaData, type, trackChange }: any) => {
  const {settings, changeSettings} = useContext(SettingsContext);
  const [audioData, setAudioData] = useState<any[]>([]);
  const [reciter_slug, setReciterSlug] = useState(
    settings.reciter?.slug
  );
  const [currentSurahID, setCurrentSurahID] = useState(
    settings.player?.currentSurahID
  );
  const [currentPlayType, setCurrentPlayType] = useState(
    settings.player?.currentPlayType
  );
  const [play, setPlay] = useState<boolean>(false);
  const [juzMap, setJuzMap] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const wasPlaying = useRef(false);
  const {isPlaying, playFromItem, pausePlaying} = playerStore();
  const [fromBotttom, setFromBottom] = useState<boolean>(false);
  const events = [
    Event.PlaybackTrackChanged,
    Event.PlaybackState,
    Event.RemotePause,
    Event.RemotePlay,
    Event.PlaybackQueueEnded,
  ];
  useEffect(() => {
    setPlay(false);
    setCurrentSurahID(metaData.number);
    setCurrentPlayType(metaData.type);
    let setting = settings;
    setting.player.currentSurahID = metaData.number;
    setting.player.currentPlayType = metaData.type;
    changeSettings(setting);
    // console.log("metadata",metaData)
    // console.log("here on load", metaData.number, metaData.type);
  }, [metaData]);
  useEffect(() => {
    if(playFromItem != null){
      playerStore.setState({
        isPlaying: false,
      });
      togglePlay();
    }
  }, [playFromItem, pausePlaying])
  const setupTrackPlayer = async () => {
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
        // console.log('Player successfully initialized.');
      }
    } catch (error) {
      // console.error('Error setting up track player:', error);
      isPlayerInitialized = false;
      // throw error;
    }
  };
  useTrackPlayerEvents(events, event => {
    // console.log('changed from player', event.type);
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        getCurrentTrackData();
        setHasEnded(false);
        wasPlaying.current = true;
        break;
      case Event.RemotePause:
        togglePlay();
        playerStore.setState({ isPlaying: false });
        break;
      case Event.PlaybackQueueEnded:
        wasPlaying.current = false;
        setPlay(false);
        setHasEnded(true);
        playerStore.setState({
          isPlaying: false,
        });
        break;
      default:
        break;
    }
  });
  const getCurrentTrackData = async () => {
    try {
      const trackIndex = await TrackPlayer.getCurrentTrack();
      if (trackIndex !== null) {
        const trackObject = await TrackPlayer.getTrack(trackIndex);
        if (trackObject) {
          trackChange(trackObject);
          playerStore.setState({
            isPlaying: true,
            currentTrackId: trackObject.key,
            isBismillah: trackObject.isBismillah
          });
        } else {
          playerStore.setState({
            currentTrackId: '',
            isBismillah: false
          });
        }
      }
    } catch (error) {
      // console.error('Error getting current track data:', error);
    }
  };
  const togglePlay = async () => {
    setPlay(!play);
    // playerStore.setState({
    //   isPlaying: !play,
    // });
    // console.log(currentSurahID, currentPlayType, metaData?.number)
    if (currentSurahID === metaData?.number && currentPlayType === type) {
      handleDownload();
    }
    const state = await TrackPlayer.getState();
    await TrackPlayer.setRate(settings.font.audioSpeed || 1);
    try {
      if (hasEnded) {
        // If playback has ended, restart from the beginning
        // console.log("in has ended");
        await TrackPlayer.seekTo(0);
        await TrackPlayer.skip(0);
        await TrackPlayer.play();
        wasPlaying.current = true;
        return;
      }
      if (state === State.Playing) {
        // console.log("pausePlaying ",pausePlaying)
        await TrackPlayer.pause();
        wasPlaying.current = false;
        playerStore.setState({
          isPlaying: false,
        });
      } else {
        // console.log("in else pause playing");
        setIsLoading(true);
        
        if (state === State.Ready || state === State.Paused) {
          // playerStore.setState({
          //   isPlaying: true,
          // });
          // console.log("inside if ready");
          // console.log("ready state");
          // Check if we're starting a new surah/juz
          const queue = await TrackPlayer.getQueue();
          const currentTrack = await TrackPlayer.getCurrentTrack();
          if (playFromItem != null) {
            // console.log("playfrom is not null");
            if(fromBotttom) {
              setFromBottom(false);
            } else {
              await TrackPlayer.seekTo(playFromItem);
              await TrackPlayer.skip(playFromItem);
            }
          } else {
            // console.log("else playfrom is null");
            if (currentTrack === 0 && queue.length > 0) {
              console.log("inif");
              // If we're at the first track, ensure we start from the beginning
              await TrackPlayer.seekTo(0);
            }
          }
          playerStore.setState({
            isPlaying: true,
          });
          await TrackPlayer.play();
          wasPlaying.current = true;
        } else {
          // console.log("in else ended");
          playerStore.setState({
            isPlaying: true,
          });
          const queue = await TrackPlayer.getQueue();
          if (playFromItem > 0) {
            // console.log("playfrom is greater than 0");
            setTimeout(async () => {
              // if(queue.length > 0 || playFromItem <= queue.length) {
                // console.log("yes inside queue else", playFromItem);
                await TrackPlayer.seekTo(playFromItem);
                await TrackPlayer.skip(playFromItem);
                await TrackPlayer.play();
                wasPlaying.current = true;
              // } else{
              //   console.log("elssssss");
              // }
            }, 500);
          } else{
            // console.log("playfrom is not greater than 0");
            await TrackPlayer.seekTo(0);
            await TrackPlayer.play();
            wasPlaying.current = true;
          }
        }
        setFromBottom(false);
        setIsLoading(false);
      }
    } catch (error) {
      // console.error('Error toggling playback:', error);
      setIsLoading(false);
    }
  };
  const handleDownload = useCallback(async () => {
    if (!reciter_slug) {
      console.error('No reciter selected');
      return;
    }
    setupTrackPlayer();
    setIsLoading(true);
    try {
      const audioFiles = type === 'surah'
        ? typedSurahAudioFiles[metaData.number]?.[reciter_slug]
        : typedJuzAudioFiles[metaData.number]?.[reciter_slug];
      if (audioFiles?.verses) {
        setAudioData(audioFiles.verses);
        if (type === 'juz') {
          const juzMapData = typedJuzMapping[metaData.number];
          if (juzMapData?.verse_mappings) {
            setJuzMap(juzMapData.verse_mappings);
          }
        }
      }
    } catch (error) {
      console.error('Error in handleDownload:', error);
    } finally {
      setIsLoading(false);
    }
  }, [type, reciter_slug, metaData]);
  useEffect(() => {
    prepareAudioTracks();
  }, [audioData]);
  const downloadAudioFile = async (
    url: string,
    isBismillah: boolean,
  ): Promise<string> => {
    const cacheDir = isBismillah
      ? `${RNFS.DocumentDirectoryPath}/quranAudio/bismillah/${reciter_slug}`
      : `${RNFS.DocumentDirectoryPath}/quranAudio/${reciter_slug}/${type}/${metaData.number}`;
  
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
      // console.log(result);
      throw new Error(`Download failed with status: ${result.statusCode}`);
    } catch (error) {
      console.error('Error downloading audio file:', error);
      throw error;
    }
  };
  
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };
  
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  
  const prepareAudioTracks = async () => {
    
    try {
      if (!isPlayerInitialized) {
        await setupTrackPlayer();
      }
      
      // Reset the queue before adding new tracks
      await TrackPlayer.reset();
      // console.log(audioData.length);
  
      if(type != 'juz'){
        if (metaData?.number != 1 &&  metaData?.number != 9) {
  
          let verse_key = metaData?.number+':'+1;
          const bismillahURL = typedBismillahJson[reciter_slug];
          const cachedBismillah = await downloadAudioFile(
            bismillahURL,
            true
          );
          
          if (settings.player?.currentSurahID === metaData?.number && settings.player?.currentPlayType === type) {
            await TrackPlayer.add({
              key: verse_key,
              url: `file://${cachedBismillah}`,
              title: metaData.name,
              isBismillah: true,
            });
          }
        }
      }
      // console.log(metaData);
      let i = playFromItem ? playFromItem : 0;
      console.log("i",i)
      for (i; i < audioData.length; i++) {
        if (settings.player?.currentSurahID === metaData?.number && settings.player?.currentPlayType === type) {
          const verse_url = audioData[i];
          const cachedPath = await downloadAudioFile(verse_url, false);
          const verse_key = type === 'juz' ? juzMap[i] : `${metaData.number}:${i+1}`;
          
          if(type == 'juz'){
            if (verse_key !== "1:1" && (/:\s*1$/.test(verse_key)) && verse_key !== "9:1") {
              const bismillahURL = typedBismillahJson[reciter_slug];
              const cachedBismillah = await downloadAudioFile(
                bismillahURL,
                true
              );
            
              if (settings.player?.currentSurahID === metaData?.number && settings.player?.currentPlayType === type) {
                await TrackPlayer.add({
                  key: verse_key,
                  url: `file://${cachedBismillah}`,
                  title: metaData.name,
                  isBismillah: true,
                });
              }
            }
          }
          if (settings.player?.currentSurahID === metaData?.number && settings.player?.currentPlayType === type) {
            await TrackPlayer.add({
              key: verse_key,
              url: `file://${cachedPath}`,
              title: metaData.name,
              isBismillah: false,
            });
          }
          // console.log(settings.player?.currentSurahID, "and", metaData?.number)
          // console.log("downloading", verse_key);
        }
        // await TrackPlayer.setRate(settings.font.audioSpeed || 1);
      }
  
    } catch (error) {
      console.error('Error preparing audio tracks:', error);
      // throw error;
      // if (error.name === 'AbortError') {
      //   console.log('Audio preparation was cancelled');
      // } else {
      //   console.error('Error preparing audio tracks:', error);
      // }
    }
  };
  return (
    <View style={{ alignItems: 'center', gap: 5 }}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => skipToPrevious()}>
          <MaterialCommunityIcons
            name="skip-previous-outline"
            size={30}
            color="#8352EC"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerItem, styles.audioIconContainer]}
          onPress={() => {togglePlay(), setFromBottom(true)}}
          disabled={isLoading}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={28}
            color="#8352EC"
            style={{ marginLeft: isPlaying ? 0 : 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => skipToNext()}>
          <MaterialCommunityIcons
            name="skip-next-outline"
            size={30}
            color="#8352EC"
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: settings?.font?.theme == 'light' ? '#4C20AA' : '#ffffff',
          fontSize: 10,
        }}>
        {play ? 'Pause' : 'Listen'}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  footerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioIconContainer: {
    width: 53,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});
export default Player;