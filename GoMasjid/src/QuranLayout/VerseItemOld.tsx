import React, {useState, useCallback, useContext, useEffect, useRef} from 'react';
import {Text, View, TouchableOpacity, Dimensions, Modal, StyleSheet, ImageBackground, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReadQuranStyles as styles} from '../screens/QuranScreens/ReadQuran-Styles';
import { SettingsContext } from '../context/SettingsProvider';
import {
  Addbookmark,
  AddBookmarkGreen,
} from '../common/BookMark';
import {EightPointBurst} from '../common/Shapes';
import settingsStore from '../stores/settingsStore';
import playerStore from '../stores/playerStore';
import {handleShare} from '../services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import JuzHeader from './JuzHeader';
import SurahHeader from './SurahHeader';
import TrackPlayer, {useTrackPlayerEvents, Event} from 'react-native-track-player';
import { downloadAudioFile} from '../services/audioDownload';
import { surahAudioFiles, JuzAudioFiles, JuzMapping } from '../common/meta/surahFiles';
import { JuzMappingData, SurahAudioData } from '../types/quran';
import TajweedRenderer from './TajweedRenderer';
import BoxShadow from '../common/BoxShadow';

const {height, width} = Dimensions.get('window');

const typedSurahAudioFiles = surahAudioFiles as SurahAudioData;
const typedJuzAudioFiles = JuzAudioFiles as SurahAudioData;

export const VerseItem = React.memo(
  ({item, index, changeTrack, bookmarkAyat, verseTranslation, meta, tafsirModal, bookmarkIndex, type}: any) => {
    const { verse_number, text_uthmani, tajweed_text, sajdah, verse_key, text_indopak, phonetic_transliterations } = item;

    const {isPlaying, isBismillah, currentTrackId} = playerStore();
    const {arabicFontValue, englishFontValue, theme, arabicFont} = settingsStore();

    const {settings} = useContext(SettingsContext);
    const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
    const [isBookMarkedRemove, setIsBookMarkedRemove] = useState<boolean>(false);
    const [isHeader, setIsHeader] = useState(false);
    const [isJuzHeader, setIsJuzHeader] = useState(false);
    // const [audioData, setAudioData] = useState<any[]>([]);
    // const [allAudioFiles, setAllAudioFiles] = useState<any[]>([]);
    const [juzMap, setJuzMap] = useState<any[]>([]);
    const [lastPlayedIndex, setLastPlayedIndex] = useState<number>(0);


    // single play ayah
    // const handlePlayPausePress = useCallback(async () => {
    //   try {
    //     // If the current verse is playing, pause it
    //     if (currentTrackId === item?.verse_key && isPlaying && !isBismillah) {
    //       await TrackPlayer.pause();
    //       return;
    //     }
    
    //     // Prepare single verse track
    //     await TrackPlayer.reset();
    
    //     // Get audio URL for the current verse
    //     const audioUrl = type === 'surah'
    //       ? typedSurahAudioFiles[meta.number]?.[settings.reciter?.slug]?.verses[index]
    //       : typedJuzAudioFiles[meta.number]?.[settings.reciter?.slug]?.verses[index];
    
    //     if (audioUrl) {
    //       const cachedPath = await downloadAudioFile(
    //         audioUrl,
    //         settings.reciter?.slug,
    //         false,
    //         type,
    //         meta
    //       );
    
    //       await TrackPlayer.add({
    //         key: verse_key,
    //         url: `file://${cachedPath}`,
    //         title: meta.name,
    //         isBismillah: false,
    //       });
    
    //       // Start playback
    //       await TrackPlayer.play();
          
    //       // Update track info if callback exists
    //       if (changeTrack) {
    //         const trackObject = {
    //           key: verse_key,
    //           isBismillah: false,
    //         };
    //         changeTrack(trackObject);
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error in handlePlayPausePress:', error);
    //   }
    // }, [
    //   currentTrackId,
    //   isPlaying,
    //   isBismillah,
    //   item,
    //   verse_key,
    //   settings.reciter?.slug,
    //   type,
    //   meta,
    //   index,
    //   changeTrack
    // ]);
    

    const handlePlayPausePress = useCallback(async (i: any) => {
      try {
        
        const checkFirstNumber = verse_key.split(":")[0] === "1";
        const itemIndex = checkFirstNumber ? i : i+1;

        // If the current verse is playing, pause it
        if (currentTrackId === item?.verse_key && isPlaying) {
          // console.log("inside pause", currentTrackId, isPlaying);
          playerStore.setState({
            playFromItem: itemIndex,
            pausePlaying: true
          });
          return;
        }
        playerStore.setState({
          playFromItem: itemIndex,
          pausePlaying: false
        })

      } catch (error) {
        console.error('Error in handlePlayPausePress:', error);
      }
    }, [
      currentTrackId,
      isPlaying,
      isBismillah,
      item,
      verse_key,
      settings.reciter?.slug,
      type,
      meta,
      index,
      changeTrack
    ]);

    const handleTafsirPress = useCallback(() => {
      console.log('curent track', currentTrackId, index);

      tafsirModal(index, false);
    }, [
      tafsirModal,
      index,
      item,
    ]);
  
    const handleVerseShare = () => {
      const arabicText = text_indopak;
      const translationText = verseTranslation[index] || '';
      handleShare(
        'Go Masjid Quran',
        null,
        `${'Go Masjid'}\nQuran Ayat ${
          meta.name
        } verse ${item?.verse_number}\n${arabicText}\n${translationText}`,
      );
    };
    
    // useEffect(() => {
    //   // Set the state to true after 10 seconds
    //   const timer = setTimeout(() => {
    //     setIsBookMarkedRemove(true);
    //   }, 10000);

    //   return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
      if(meta?.type === 'juz'){
        setIsHeader(meta.divider_on_ayah.some((value: any) => verse_key === value));
      } else{
        setIsHeader(false);
      }
    }, [isHeader]);

    useEffect(() => {
      if(meta?.type === 'surah'){
        setIsJuzHeader(meta.divider_on_ayah.some((value: any) => verse_key === value));
      } else{
        setIsJuzHeader(false);
      }
    }, [isJuzHeader]);

    async function removeBookMark(item: any) {
    //   let a = await removeQuranBookmarkData(item);
        //   console.log('aaaaaaaa', a);
          // getBookmarkData();
    }

    return (
      <>
        {meta?.type === 'surah' && meta?.divider && (
          <>
          {isJuzHeader && (
            <JuzHeader meta={meta?.divider_meta[verse_key]} isSurah={true} />
          )}
          </>
        )}
        {meta?.type === 'juz' && meta?.divider && (
          <>
          {isHeader && (
            <SurahHeader 
            meta={meta?.divider_meta[verse_key]} 
            isJuz={true} 
            showBismillah={verse_key == '9:1' ? false : true}/>
          )}
          </>
        )}
        
        <View
          style={[
            item.sajdah == true  ? styles.verseContainerSajadah : styles.verseContainer, 
          ]}
          key={`${item?.verse_number}_${index}`}>
            <View style={[styles.verseInsideContainer, 
              {backgroundColor: (currentTrackId == item?.verse_key && isPlaying && !isBismillah) || (bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying ) 
                ? '#4C20AA'
                : settings?.font?.theme == 'light'
                ? 'transparent'
                : '#202020'
              }
            ]}>
              {/* <BoxShadow themeMode={settings?.font?.theme} repeat={true} surahBtn={false}></BoxShadow> */}
              
              <View style={[styles.innerContainer]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <EightPointBurst number={item?.verse_number} />
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 20,
                  }}>
                  <TouchableOpacity
                    // onPress={handlePlayPausePress(index)}
                    onPress={() => handlePlayPausePress(index)}
                  >
                    <Ionicons
                      name={
                        currentTrackId == item?.verse_key && isPlaying && !isBismillah
                          ? 'pause'
                          : 'play'
                      }
                      size={24}
                      color={
                        currentTrackId == item?.verse_key && isPlaying && !isBismillah
                          ? '#3DC8B2'
                          : '#3DC8B2'
                      }
                    />
                  </TouchableOpacity>

                { (isBookMarked || bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying)? 
                (
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Remove BookMarks ")
                      removeBookMark(item);
                      setIsBookMarkedRemove(true);
                    }}>
                      <MaterialIcons
                        name="bookmark"
                        size={24}
                        color="#3DC8B2"
                      />
                  </TouchableOpacity>
                )
                :  <TouchableOpacity
                      onPress={() => {
                        // console.log("Add BookMarks ")
                        bookmarkAyat(item, index, meta);
                        // console.log(item, index, meta)
                        // console.log("--------")
                        
                        setIsBookMarked(true);
                      }}>
                        <AddBookmarkGreen width={24} height={24} />
                    </TouchableOpacity>
                }

                  <TouchableOpacity onPress={() => handleVerseShare()}>
                  
                    <MaterialCommunityIcons
                      name="share"
                      size={24}
                      color={
                        (currentTrackId == item?.verse_key && isPlaying && !isBismillah) || (bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying)
                          ? '#3DC8B2'
                          : '#3DC8B2'
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleTafsirPress()}>
                    <MaterialIcons
                      name="menu-book"
                      size={24}
                      color={
                        (currentTrackId == item?.verse_key && isPlaying && !isBismillah) || (bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying) 
                          ? '#3DC8B2'
                          : '#3DC8B2'
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              {!settings?.font?.displayTajweed && (
                <>
                <View style={styles.textContainer}>
                    <Text
                        style={[
                        styles.textStyle,
                        {
                            fontSize: arabicFontValue,
                            color:
                            (currentTrackId == item?.verse_key && isPlaying && !isBismillah) || (bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying)
                                ? '#fff'
                                : settings?.font?.theme == 'light'
                                ? '#4C20AA'
                                : '#fff',
                        },
                        ]}>
                        {(settings?.font?.script) == "uthmani" ? text_uthmani : text_indopak}

                    </Text>
                </View>
                </>
              )}
              
              {settings?.font?.displayTajweed && (
                <>
                <View style={styles.textContainer}>
                  <TajweedRenderer
                    tajweedText={tajweed_text}
                    arabicFont={arabicFont}
                    arabicFontValue={arabicFontValue}
                    textColor={
                      (currentTrackId == item?.verse_key && isPlaying && !isBismillah) || 
                      (bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying)
                        ? '#fff'
                        : settings?.font?.theme == 'light'
                          // ? '#4C20AA' 
                          ? '#000'
                          : '#fff'
                    }
                  />
                </View>
                </>
              )}

              {settings?.font?.displayTransliteration && (
                <>
                  <Text
                  style={[
                    {
                      paddingBottom: 10,
                      fontSize: englishFontValue,
                      color:
                        (currentTrackId == item?.verse_key && isPlaying && !isBismillah) || (bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying)
                          ? '#fff'
                          : settings?.font?.theme == 'light'
                          ? '#4C20AA'
                          : '#fff',
                    }
                    ]}>
                      {phonetic_transliterations}
                    </Text>
                </>
              )}

              {settings?.font?.displayEnglish && (
                <>
                  <Text
                  style={[
                    {
                      fontSize: englishFontValue,
                      color:
                        (currentTrackId == item?.verse_key && isPlaying && !isBismillah) || (bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying)
                          ? '#fff'
                          : settings?.font?.theme == 'light'
                          ? '#4C20AA'
                          : '#fff',
                    }
                    ]}>
                      {verseTranslation[index]}
                    </Text>
                </>
              )}
              </View>
              {/* </ImageBackground> */}
            </View>
        </View>
        
      </>
    );
  },
);