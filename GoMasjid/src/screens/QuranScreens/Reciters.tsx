import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {SettingsContext} from '../../context/SettingsProvider';
import Accordion from '../../common/Accordion';
import { themeFont } from '../../styles/theme';
import allReciters from '../../common/meta/reciters.json'; 
import { recitersImg } from '../../common/meta/reciters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { prepareBismillahTrack, setupTrackPlayer } from '../../services/audio';
import TrackPlayer, {Event, useTrackPlayerEvents} from 'react-native-track-player';
import Header from '../../common/Header';
const {height, width} = Dimensions.get('window');
const Reciters = ({navigation, route}: any) => {
  const updateReciter = route?.params.updateReciter || {};
  // console.log("Received updateReciter:", updateReciter);
  const [recitersData, setRecitersData] = useState<any[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<any>({});
  const {settings, changeSettings, setSettings} = useContext(SettingsContext);
  const [playingReciter, setPlayingReciter] = useState<any>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  useEffect(() => {
    setSelectedReciter(settings.reciter);
    setRecitersData(allReciters);
  }, []);
  useEffect(() => {
    const initPlayer = async () => {
      try {
        await setupTrackPlayer();
      } catch (error) {
        // console.error('Error initializing player:', error);
      }
    };
    initPlayer();
  
    // Cleanup on unmount
    return () => {
      const cleanup = async () => {
        try {
          await TrackPlayer.reset();
        } catch (error) {
          // console.error('Error cleaning up player:', error);
        }
      };
      cleanup();
    };
  }, []);
  const selectReciter = (value: any) => {
    // console.log("selected", value);
    let setting = settings;
    setting.reciter = value;
    setSelectedReciter(value);
    changeSettings(setting);
    updateReciter(value.slug);
  };
  const playBismillah = async (reciter: any) => {
    // setIsPlaying(!isPlaying);
    setPlayingReciter(reciter.slug);
    prepareBismillahTrack(reciter);
    await TrackPlayer.setRate(settings.font.audioSpeed || 1);
    if (isPlaying) {
      setIsPlaying(false);
      await TrackPlayer.pause();
    } else{
      setIsPlaying(true);
      await TrackPlayer.play();
    }
    // isPlaying ? await TrackPlayer.pause() : await TrackPlayer.play();
  }
  useTrackPlayerEvents([Event.PlaybackQueueEnded, Event.RemotePause], async (event) => {
    switch (event.type) {
      case Event.RemotePause:
        setIsPlaying(false);
        setPlayingReciter(null);
        break;
      case Event.PlaybackQueueEnded:
        setIsPlaying(false);
        setPlayingReciter(null);
        break;
      default:
        break;
    }
  });
  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        title="All Reciters"
        titleColor="#000"
        iconColor="#000"
        onBack={() => navigation?.goBack()}
      />
      <ScrollView>
        {recitersData.map(
          (reciter: any, index: number) =>
            // reciter.show && (
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: '#A4A4A41A',
                  top: -10,
                }}
                key={index}>
                <Accordion
                isOpen={openAccordionIndex === index}
                onToggle={() => handleAccordionToggle(index)}
                  title={
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                      }}>
                      <View
                        style={{
                          backgroundColor: '#3DC8B2',
                          width: 55,
                          height: 55,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          borderWidth: 2,
                          borderColor: '#FFFFFF',
                        }}>
                        <View
                          style={{
                            position: 'absolute',
                            top: '3.0%',
                            left: '4.0%',
                          }}>
                          <Image
                            source={recitersImg[reciter.slug]}
                            style={{width: 48, height: 48, borderRadius: 34}}
                          />
                          {selectedReciter?.id == reciter.id && (
                            <View>
                              <Image
                                source={require('../../assets/images/quran/selectedReciter.png')}
                                style={{
                                  position: 'absolute',
                                  width: 24,
                                  height: 24,
                                  bottom: 1,
                                  right: -5,
                                }}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.CardText}>{reciter.name}</Text>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity  onPress={() => playBismillah(reciter)}>
                          <Ionicons
                            name={
                              reciter.slug == playingReciter && isPlaying
                                ? 'pause'
                                : 'play'
                            }
                            size={20}
                            color={'#3DC8B2'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  }>
                  <View style={styles.container}>
                    <Text
                      style={{
                        color: '#202020',
                        fontSize: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 10,
                        fontFamily: themeFont.englishFont,
                        fontWeight: '400',
                      }}>{reciter?.info}
                      {/* {reciter?.info &&
                        reciter?.info?.split(' ').slice(0, 45).join(' ')}{' '}
                      ... */}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 15,
                      }}>
                      <TouchableOpacity
                        style={styles.buttonDownload}
                        onPress={() => selectReciter(reciter)}>
                        <Text style={{textAlign: 'center', color: '#202020'}}>
                          {selectedReciter?.id == reciter.id
                            ? 'Unselect Reciter'
                            : 'Select'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Accordion>
              </View>
            // ),
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  container: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  recitersText: {
    color: '#8352EC',
    fontSize: 1,
    textAlign: 'right',
  },
  buttonDownload: {
    fontSize: 10,
    lineHeight: 11.73,
    fontFamily: themeFont.englishFont,
    fontWeight: '500',
    borderRadius: 10,
    backgroundColor: '#3DC8B2',
    width: '40%',
    padding: 10,
  },
  buttonDelete: {
    fontSize: 12,
    borderRadius: 5,
    backgroundColor: '#C0D3C6',
    width: '30%',
    padding: 5,
    marginLeft: 10,
  },
  img: {
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    height: height / 10,
    width: 85,
  },
  CardText: {
    color: '#202020',
    fontSize: 12.5,
    fontWeight: '600',
    flexWrap: 'wrap',
    width: width / 2,
    fontFamily: themeFont.englishFont,
    lineHeight: 18.28,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  topBarHeader: {
    flex: 1,
    marginLeft: 15,
    fontWeight: '600',
    color: '#202020',
    fontSize: 15,
    lineHeight: 17.6,
    fontFamily: themeFont.englishFont,
  },
});
export default Reciters;