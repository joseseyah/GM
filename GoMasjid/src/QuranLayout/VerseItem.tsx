import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReadQuranStyles as styles} from '../screens/QuranScreens/ReadQuran-Styles';
import {SettingsContext} from '../context/SettingsProvider';
import {Addbookmark, AddBookmarkGreen} from '../common/BookMark';
import {EightPointBurst} from '../common/Shapes';
import settingsStore from '../stores/settingsStore';
import playerStore from '../stores/playerStore';
import {handleShare} from '../services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import JuzHeader from './JuzHeader';
import SurahHeader from './SurahHeader';
import TajweedRenderer from './TajweedRenderer';
import BoxShadow from '../common/BoxShadow';
import { themeFont } from '../styles/theme';

import AddBookmarkSvg from '../assets/svgs/Icons=addBookmark.svg';
import VerseNumberSvg from '../assets/svgs/number.svg';


// const {height, width} = Dimensions.get('window');

export const VerseItem = React.memo(
  ({
    item,
    index,
    changeTrack,
    bookmarkAyat,
    verseTranslation,
    meta,
    tafsirModal,
    bookmarkIndex,
    type,
  }: any) => {
    const {
      verse_number,
      text_uthmani,
      tajweed_text,
      sajdah,
      verse_key,
      text_indopak,
      phonetic_transliterations,
    } = item;

    const {isPlaying, isBismillah, currentTrackId, isDownloading} =
      playerStore();
    const {arabicFontValue, englishFontValue, theme, arabicFont} =
      settingsStore();

    const {settings} = useContext(SettingsContext);
    const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
    const [isBookMarkedRemove, setIsBookMarkedRemove] =
      useState<boolean>(false);
    const [isHeader, setIsHeader] = useState(false);
    const [isJuzHeader, setIsJuzHeader] = useState(false);
    const [loader, setLoader] = useState<boolean>(false);

    // console.log("verseTranslation", verseTranslation);

    const handlePlayPausePress = useCallback(
      async (i: any) => {
        try {
          const checkFirstNumber = verse_key.split(':')[0] === '1';
          const itemIndex = checkFirstNumber ? i : i + 1;

          // If the current verse is playing, pause it
          if (currentTrackId === item?.verse_key && isPlaying) {
            // console.log("inside pause", currentTrackId, isPlaying);
            playerStore.setState({
              playFromItem: itemIndex,
              pausePlaying: true,
            });
            return;
          }
          playerStore.setState({
            playFromItem: itemIndex,
            pausePlaying: false,
            isDownloading: true,
          });
          setLoader(true);
        } catch (error) {
          console.error('Error in handlePlayPausePress:', error);
        }
      },
      [
        currentTrackId,
        isPlaying,
        isBismillah,
        item,
        verse_key,
        settings.reciter?.slug,
        type,
        meta,
        index,
        changeTrack,
      ],
    );

    const handleTafsirPress = useCallback(() => {
      console.log('curent track', currentTrackId, index);

      tafsirModal(index, false);
    }, [tafsirModal, index, item]);

    const handleVerseShare = () => {
      const arabicText = text_indopak;
      const translationText = verseTranslation[index] || '';
      handleShare(
        'Go Masjid Quran',
        null,
        `${'Go Masjid'}\nQuran Ayat ${meta.name} verse ${
          item?.verse_number
        }\n${arabicText}\n${translationText}`,
      );
    };

    useEffect(() => {
      if (!isDownloading) {
        setLoader(false);
      }
    }, [isDownloading]);

    useEffect(() => {
      if (meta?.type === 'juz') {
        setIsHeader(
          meta.divider_on_ayah.some((value: any) => verse_key === value),
        );
      } else {
        setIsHeader(false);
      }
    }, [isHeader]);

    useEffect(() => {
      if (meta?.type === 'surah') {
        setIsJuzHeader(
          meta.divider_on_ayah.some((value: any) => verse_key === value),
        );
      } else {
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
                showBismillah={verse_key == '9:1' ? false : true}
              />
            )}
          </>
        )}

        <View
          style={[
            item.sajdah == true
              ? styles.verseContainerSajadah
              : styles.verseContainer,
          ]}
          key={`${item?.verse_number}_${index}`}>
          <View
            style={[
              styles.verseInsideContainer,
              {
                backgroundColor:
                  (currentTrackId == item?.verse_key &&
                    isPlaying &&
                    !isBismillah) ||
                  (bookmarkIndex == index &&
                    isBookMarkedRemove == false &&
                    !isPlaying)
                    ? '#223F7A'
                    : '#F6F6F6',


              },
            ]}>
            {/* <BoxShadow
              themeMode={settings?.font?.theme}
              repeat={true}
              surahBtn={false}></BoxShadow> */}

            <View style={[styles.innerContainer]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <View style={{ width: 32, height: 32 }}>
                <VerseNumberSvg width={32} height={32} color="#223F7A" />
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#F4F4F4',
                      fontSize: 10,
                      fontWeight: '600',
                      fontFamily: themeFont.englishFont,
                      textAlign: 'center',
                    }}>
                    {item?.verse_number}
                  </Text>
                </View>
              </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 20,
                  }}>
                  <TouchableOpacity onPress={() => handlePlayPausePress(index)}>
                    {loader ? (
                      <ActivityIndicator size="small" color="#ADD9F7" />
                    ) : (
                      <Ionicons
                        name={
                          currentTrackId == item?.verse_key &&
                          isPlaying &&
                          !isBismillah
                            ? 'pause'
                            : 'play'
                        }
                        size={24}
                        color={
                          currentTrackId == item?.verse_key &&
                          isPlaying &&
                          !isBismillah
                            ? '#ADD9F7'
                            : '#ADD9F7'
                        }
                      />
                    )}
                  </TouchableOpacity>

                  {isBookMarked ||
                  (bookmarkIndex == index &&
                    isBookMarkedRemove == false &&
                    !isPlaying) ? (
                    <TouchableOpacity
                      onPress={() => {
                        console.log('Remove BookMarks ');
                        removeBookMark(item);
                        setIsBookMarkedRemove(true);
                      }}>
                      <MaterialIcons
                        name="bookmark"
                        size={24}
                        color="#ADD9F7"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                    onPress={() => {
                      bookmarkAyat(item, index, meta);
                      setIsBookMarked(true);
                    }}>
                    <AddBookmarkSvg width={24} height={24} fill="#ADD9F7" />
                  </TouchableOpacity>
                  )}

                  <TouchableOpacity onPress={() => handleVerseShare()}>
                    <MaterialCommunityIcons
                      name="share"
                      size={24}
                      color={
                        (currentTrackId == item?.verse_key &&
                          isPlaying &&
                          !isBismillah) ||
                        (bookmarkIndex == index &&
                          isBookMarkedRemove == false &&
                          !isPlaying)
                          ? '#ADD9F7'
                          : '#ADD9F7'
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleTafsirPress()}>
                    <MaterialIcons
                      name="menu-book"
                      size={24}
                      color={
                        (currentTrackId == item?.verse_key &&
                          isPlaying &&
                          !isBismillah) ||
                        (bookmarkIndex == index &&
                          isBookMarkedRemove == false &&
                          !isPlaying)
                          ? '#ADD9F7'
                          : '#ADD9F7'
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
                          (currentTrackId == item?.verse_key && isPlaying && !isBismillah) ||
                          (bookmarkIndex == index && isBookMarkedRemove == false && !isPlaying)
                            ? '#fff'
                            : '#000',

                          fontFamily:
                            settings?.font?.script == 'uthmani'
                              ? themeFont.uthmani
                              : themeFont.indoPak,
                        },
                      ]}>
                      {settings?.font?.script == 'uthmani'
                        ? text_uthmani
                        : text_indopak}
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
                        (currentTrackId == item?.verse_key &&
                          isPlaying &&
                          !isBismillah) ||
                        (bookmarkIndex == index &&
                          isBookMarkedRemove == false &&
                          !isPlaying)
                          ? '#fff'
                          : settings?.font?.theme == 'light'
                          ? // ? '#4C20AA'
                            '#000'
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
                          (currentTrackId == item?.verse_key &&
                            isPlaying &&
                            !isBismillah) ||
                          (bookmarkIndex == index &&
                            isBookMarkedRemove == false &&
                            !isPlaying)
                            ? '#fff'
                            : settings?.font?.theme == 'light'
                            ? '#000'
                            : '#fff',
                      },
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
                          (currentTrackId == item?.verse_key &&
                            isPlaying &&
                            !isBismillah) ||
                          (bookmarkIndex == index &&
                            isBookMarkedRemove == false &&
                            !isPlaying)
                            ? '#fff'
                            : settings?.font?.theme == 'light'
                            ? '#000'
                            : '#fff',
                          textAlign:(settings?.font?.trnslationLang == 'persian' || settings?.font?.trnslationLang == 'urdu')
                            ? 'right'
                            : 'left',
                      },
                    ]}>
                    {/* {verseTranslation?.[index] || ''} */}
                    {verseTranslation?.[index] ? (
                      verseTranslation?.[index]
                    ) : (
                      <ActivityIndicator size="small" color="#ADD9F7" />
                    )}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </>
    );
  },
);
