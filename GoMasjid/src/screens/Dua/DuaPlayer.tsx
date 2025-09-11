import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  useProgress,
  Event,
  Capability,
  State,
} from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { themeFont } from '../../styles/theme';
import RNFS from 'react-native-fs';
import playerStore from '../../stores/playerStore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

let isPlayerInitialized = false;

const DuaPlayer = ({playerData, playerClose}: any) => {
  const {position, duration} = useProgress(50);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const {duaPlaying, stopPlaying} = playerStore();

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

  useEffect(() => {
    handlePlayPausePress();
  }, [playerData]);

  useEffect(() => {
    setSliderValue(position / duration);
  }, [position, duration]);

  useEffect(() => {
    if(stopPlaying) {
    togglePlayPause();
    TrackPlayer.pause();
    }
  }, [stopPlaying, duaPlaying])

  const togglePlayPause = async () => {
    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      setIsPlaying(!isPlaying);
      playerStore.setState({
        duaPlaying: !isPlaying,
      });
    } catch (error) {
      // console.error('Error toggling play/pause:', error);
    }
  };

  const handlePlayPausePress = useCallback(async () => {
    try {
      if (!isPlayerInitialized) {
        await setupTrackPlayer();
      }

      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        await TrackPlayer.pause();
        setIsPlaying(false);
        playerStore.setState({
          duaPlaying: false,
        });
        return;
      }
        
      await TrackPlayer.reset();

      setIsPlaying(true);
      playerStore.setState({
        duaPlaying: true,
      });
  
      // Get audio URL for the current verse
      const audioUrl = playerData?.duaUrl;
  
      if (audioUrl) {
        const cachedPath = await downloadAudioFile(audioUrl);
  
        await TrackPlayer.add({
          id: playerData?.duaId,
          url: `file://${cachedPath}`,
          title: playerData?.duaTitle
        });
        
        // Start playback
        await TrackPlayer.play();
      }
    } catch (error) {
      // console.error('Error in handlePlayPausePress:', error);
    }
  }, [playerData]);

  const downloadAudioFile = async (url: string): Promise<string> => {
    const cacheDir = `${RNFS.DocumentDirectoryPath}/duaAudio`;
  
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
      // console.error('Error downloading audio file:', error);
      throw error;
    }
  };

  useEffect(() => {
    const onPlaybackComplete = async () => {
      // console.log("ended track")
        setIsPlaying(false);
        playerStore.setState({
          duaPlaying: false,
        });
    };

    const playbackListener = TrackPlayer.addEventListener(Event.PlaybackQueueEnded, onPlaybackComplete);

    return () => {
      playbackListener.remove();
    };
}, []);

  return (
    <View style={styles.playerContainer}>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={() => { playerClose(); TrackPlayer.reset();}}>
          <Ionicons
            name="close"
            size={25}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.trackTitle}>{playerData?.duaTitle}</Text>
      <View style={styles.controlsContainer}>
        {/* <TouchableOpacity style={styles.controlButton} onPress={skipToPrevious}>
          <MaterialIcons name="skip-previous" size={30} color="#3DC8B2" />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={togglePlayPause}>
          <FontAwesome5
            name={isPlaying ? 'pause' : 'play'}
            size={25}
            color="#3DC8B2"
          />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.controlButton} onPress={skipToNext}>
          <MaterialIcons name="skip-next" size={30} color="#3DC8B2" />
        </TouchableOpacity> */}
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={value => TrackPlayer.seekTo(value)}
          minimumTrackTintColor="#3DC8B2"
          maximumTrackTintColor="#fff"
          style={styles.slider}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {moment.utc(position * 1000).format('mm:ss')}
          </Text>
          <Text style={styles.timeText}>
            {moment.utc(duration * 1000).format('mm:ss')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: '#4C20AA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // marginTop: 20,
    marginBottom: height / 20,
    borderRadius: 15,
  },
  trackTitle: {
    color: '#F4F4F4',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: themeFont.englishFont,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
  },
  controlButton: {
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  slider: {
    width: width - 80,
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 80,
    marginTop: 5,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
  },
    closeIcon: {
    position: 'absolute',
    right: 15,
    top: 10
  },
});

export default DuaPlayer;