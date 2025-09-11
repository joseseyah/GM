import { View, TouchableOpacity, SafeAreaView, ActivityIndicator, FlatList, Modal, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { SettingsContext } from '../../context/SettingsProvider';
import { ReadQuranStyles as styles } from './ReadQuran-Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import SurahHeader from '../../QuranLayout/SurahHeader';
import JuzHeader from '../../QuranLayout/JuzHeader';
import { VerseItem } from '../../QuranLayout/VerseItem';
import Tafsir from './Tafsir';
import Footer from '../../QuranLayout/Footer';
import SettingScreens from './SettingScreen';
import PageView from '../../QuranLayout/PageView';
import {storeBookmarkData, storeLastReadAyah} from '../../services/AsyncServices';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import playerStore from '../../stores/playerStore';
import {loadTranslationJsonFile, loadTafsirJsonFile} from '../../services/fileCache';
import { juzFiles, surahFiles } from '../../common/meta/surahFiles';

import BookmarkSvg from '../../assets/svgs/Icons=bookmark.svg';


const ReadQuran = ({ navigation, route, props }: any) => {
  const { settings, changeSettings } = useContext(SettingsContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [verses, setVerses] = useState<any>([]);
  const [headerMeta, setHeaderMeta] = useState<any>([]);
  const [translation_slug, setTranslationSlug] = useState(
    settings.font?.translation_slug,
  );
  const [show_translation, setTranslationShow] = useState(
    settings.font?.displayEnglish,
  );
  const [tafsir_slug, setTafsirSlug] = useState(
    settings.font?.tafsir_slug,
  );
  const [verseTranslation, setverseTranslation] = useState<any>([]);
  const [verseTafsir, setVerseTafsir] = useState<any>([]);
  const [tafsirData, setTafsirData] = useState({ html: '' });
  const [type, setType] = useState<any>();
  const flatListRef = useRef<FlatList<any>>(null);
  const listRef = useRef<ScrollView>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [gomodalVisible, setGoModalVisible] = useState(false);
  const [quranView, setQuranView] = useState(
    settings.font?.quranView
  );
  const [theme, updateTheme] = useState(
    settings.font?.theme
  );
  const [bookmarkIndex, setBookmarkIndex] = useState<any>(null);
  const [reciter_slug, setReciterSlug] = useState(settings.reciter.slug);
  const [currentTrack, setCurrentTrack] = useState<any>();
  const {isPlaying, isDownloading} = playerStore();
  const itemPositions = useRef({}); 
  const [showSettings, setShowSettings] = useState(false);
  const [tafsirKey, setTafsirKey] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      const focusTime = Date.now(); // Record start time when screen is focused

      return () => {
        const endTime = Date.now(); // Record end time when screen loses focus
        const newEngagementTime = (endTime - focusTime) / 1000; // Calculate new engagement time in seconds

        // Retrieve the existing engagement time, add the new time, and save back to AsyncStorage
        const updateEngagementTime = async () => {
          try {
            const existingTime = await AsyncStorage.getItem('quranEngagementTime');
            const totalTime = existingTime
              ? parseFloat(existingTime) + newEngagementTime
              : newEngagementTime;

            // Save the updated total engagement time
            await AsyncStorage.setItem('quranEngagementTime', totalTime.toString());
            console.log(`Total engagement time updated: ${totalTime} seconds`);
          } catch (error) {
            console.error('Error updating engagement time:', error);
          }
        };

        updateEngagementTime();
      };
    }, [])
  );
   
  // Save the last visible index to AsyncStorage
    const handleViewableItemsChanged = ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const lastVisible = viewableItems[viewableItems.length - 1];

        const LastReadAyah = {
          verse_key: lastVisible.item.verse_key,
          verse_number: lastVisible.item.verse_number,
          type: type || '',
          LastReadAyahScrollIndex: lastVisible.index,
          surahTitle: headerMeta?.name,
          id: headerMeta.number
        };
        storeLastReadAyah(LastReadAyah)
      }
    };

  useEffect(() => {
    const { id, type, verse_key, bookmarkScrollIndex } = route.params || {};
    const hasBookmarkNavigate = bookmarkScrollIndex;
    const { font, bookmarkNavigate } = settings;

    setType(route.params.type);
    if (type == 'surah') {
      getSurahData(route.params.id, type);
    } else if (type === 'juz') {
      getJuzData(route.params.id, type);
    } else if (bookmarkNavigate?.type === 'surah') {
      getSurahData(bookmarkNavigate?.id, type);
    } else {
      getJuzData(bookmarkNavigate?.id, type);
    }

    if (hasBookmarkNavigate) {
      setBookmarkIndex(hasBookmarkNavigate);
      setLoader(true); 
      const timeout = setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: hasBookmarkNavigate, animated: true });
          setLoader(false); 
        }
      }, 500);
      return () => clearTimeout(timeout);
    }    

  }, []);

  useEffect(() => {
    const loadTafsirData = async () => {
      if (verses.length > 0) {
        const id = route.params.id;
        const tafsirJson = await loadTafsirJsonFile(tafsir_slug, type, id);
        setVerseTafsir(tafsirJson?.verses);
        setTafsirData(tafsirJson?.verses[0]);
        
        playerStore.setState({
          playFromItem: null,
          pausePlaying: false, 
          isPlaying: false

        });
      }
    };
    loadTafsirData();
  }, [verses]);

  useEffect(() => {
    const loadTranslationData = async () => {
      const id = route.params.id;
      const transJson = await loadTranslationJsonFile(translation_slug, type, id);
      setverseTranslation(transJson?.verses);
    };
    loadTranslationData();
  }, [translation_slug, show_translation, verses]);

  const tafsirModal = (id: any, isModal = false) => {
    setTafsirData(verseTafsir[id]);
    setModalVisible(true);
    const tafsir_key = verses[id].verse_key;
    setTafsirKey(tafsir_key);
  }

  const loadSurah = (id: string | number) => {
    return surahFiles[id];
  }

  const loadJuz = (id: string | number) => {
    return juzFiles[id];
  }

  const getSurahData = async (id: any, type: string) => {
    try {
      const surahJson = loadSurah(id);
      let chapterData = verses || [];
      chapterData = surahJson?.verses;

      setVerses(chapterData);
      if (settings?.font?.displayEnglish) {
        const transJson = await loadTranslationJsonFile(translation_slug, type, id);
        setverseTranslation(transJson?.verses);
      }
      setHeaderMeta(surahJson.meta);

    } catch (error) {
    }
  };
  const getJuzData = async (id: any, type: string) => {
    try {
      const juzJson = loadJuz(id);
      let chapterData = verses || [];
      chapterData = juzJson?.verses;

      setVerses(chapterData);
      setHeaderMeta(juzJson.meta);
      if (settings?.font?.displayEnglish) {
        const transJson = await loadTranslationJsonFile(translation_slug, type, id);
        setverseTranslation(transJson?.verses);
      }
    } catch (error) {
    }
  };
  const bookmarkAyat = (item: any, index: number, details: any) => {
    const bookmarkData = {
      verse_key: item.verse_key,
      verse_number: item.verse_number,
      revelation_place: details.revelation_place,
      date: new Date(),
      type: type || '',
      offset: item?.offset,
      translations: verseTranslation[index],
      script: (settings?.font?.script) == "uthmani" ? item.text_uthmani : item.text_indopak,
      bookmarkScrollIndex: index,
      surahTitle: details?.name,
      id: details.number,
      verses_count: details.total_ayah
    };
    storeBookmarkData(bookmarkData);
  };

  const chevronColor = settings?.font?.theme === 'light' ? '#202020' : '#F4F4F4';
  const renderItem = useMemo(() => {
    return ({ item, index }: any) => {
      return (
        <VerseItem
          item={item}
          index={index}
          changeTrack={null}
          bookmarkAyat={bookmarkAyat}
          meta={headerMeta}
          verseTranslation={verseTranslation}
          tafsirModal={tafsirModal}
          bookmarkIndex={bookmarkIndex}
          type={type}
        />
      );
    };

  }, [[headerMeta, verseTranslation, type, bookmarkAyat]]);

  const scrollOnAudio = (id: any) => {
    if(!isDownloading) {
      let f = verses.findIndex((x: any) => x.verse_key == id.key);
      // console.log('id++', id, f);
      if (f === -1) {
        return;
      }
      setCurrentTrack(verses[f]);
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: f,
        viewPosition: 0.5,
      });
    }
  };
  
  const handleScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
    }) => {
    if(bookmarkIndex) {

      setLoader(true);
      if(isPlaying) {
        return;
      }
      const offset = info.highestMeasuredFrameIndex * info.averageItemLength;

      flatListRef?.current?.scrollToOffset({
        offset: offset,
        animated: true,
      });

      setTimeout(() => {
        flatListRef?.current?.scrollToIndex({
          index: info.index,
          animated: true,
          viewPosition: 0.5,
        });
        setLoader(false);
      }, 500);
    }
  };
  const navigateReciter = () => {
    navigation.navigate('QuranStack', { screen: 'Reciters', params: { updateReciter: (newReciter: React.SetStateAction<string>) => setReciterSlug(newReciter), } });
  };
  return (
    <>
      <LinearGradient
        colors={
          theme == 'light'
            ? ['rgba(242, 242, 242, 1)', 'rgba(247, 247, 247, 1)']
            : ['#282828', '#282828']
        }
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0, 0.85]}
        style={styles.container}>
        <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20,
          }}>
          <Entypo name="chevron-left" size={30} color={chevronColor} />
        </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 10,
              marginRight: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('QuranStack', { screen: 'Bookmark' });
              }}>
              <BookmarkSvg width={20} height={35} fill="#376BB7" />

            </TouchableOpacity>
          </View>
        </View>
        {loader && <ActivityIndicator size="large" color="#283025" />}

        {verses && (
          <>
            {quranView === 'list' ? (
              <SafeAreaView key={quranView} style={{ flex: 1, marginBottom: 100 }}>
                <View
                  style={{
                    // backgroundColor: 'white', // Ensure the background color matches the app theme
                    // paddingVertical: 10,
                    zIndex: 10,
                    // height: 120,
                  }}>
                  {type === 'surah' ? (
                    <SurahHeader
                      meta={headerMeta}
                      isJuz={false}
                      showBismillah={headerMeta?.number == 9 ? false : true}
                    />
                  ) : (
                    <JuzHeader
                      meta={headerMeta}
                      isSurah={false}
                    />
                  )}
                </View>
                
                <FlatList
                  data={verses}
                  style={{
                    display: 'flex',
                  }}
                  ref={flatListRef}
                  windowSize={10}
                  initialNumToRender={10} 
                  maxToRenderPerBatch={10}
                  disableVirtualization={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  onScrollToIndexFailed={handleScrollToIndexFailed} 
                  onViewableItemsChanged={handleViewableItemsChanged}
                  viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                  extraData={verseTranslation}
                />
              </SafeAreaView>
            ) : (
              <PageView verses={verses} sHeader={headerMeta} listRef={listRef} itemPositions={itemPositions} />
            )}
          </>
        )}
      </LinearGradient>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Tafsir close={() => setModalVisible(false)} data={tafsirData} tafsirKey={tafsirKey}/>
          </View>
        </View>
      </Modal>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={gomodalVisible}
          onRequestClose={() => {
            setGoModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            </View>
          </View>
        </Modal>
      </View>
      {showSettings && (
        <SettingScreens 
          visible={showSettings}
          onClose={() => setShowSettings(false)}
          navigateReciter={navigateReciter} 
          updateTransltorSlug={setTranslationSlug} 
          updateShowTranslation={setTranslationShow} 
          updateQuranView={setQuranView} 
          updateAppTheme={updateTheme}
        />
      )}
      <View style={styles.listStyles}>
        <Footer
          metaData={headerMeta}
          trackChange={(id: any) => scrollOnAudio(id)}
          tafseer={() => setModalVisible(true)}
          type={type}
          settingsModal={() => setShowSettings(true)}
        />
      </View>
    </>
  )
}
export default ReadQuran;