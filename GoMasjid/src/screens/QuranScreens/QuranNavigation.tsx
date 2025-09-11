import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {JuzData} from '../../common/meta/JuzData';
import {AllChaptersData} from '../../common/meta/AllChaptersData';
import {SettingsContext} from '../../context/SettingsProvider';
import {
  JuzAudioFiles,
  surahAudioFiles,
  JuzMapping,
} from '../../common/meta/surahFiles';

// import playerStore from '../../stores/playerStore';
import {themeFont} from '../../styles/theme';
import Feather from 'react-native-vector-icons/Feather';
import bismillahJson from '../../common/meta/bismillah.json';
import type {
  BismillahJson,
  SurahAudioData,
  JuzMappingData,
  Surah,
  Juz,
  UIState,
  AppData,
  QuranNavigationProps
} from '../../types/quran';
import { prepareAudioTracks, checkDownload } from '../../services/audioDownload';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BoxShadow from '../../common/BoxShadow';

import NumberSvg from '../../assets/svgs/number.svg';
import MeccaSvg from '../../assets/svgs/Icons=mecca.svg';
import MedinaSvg from '../../assets/svgs/Icons=medina.svg';



// Type assertions for imported data
const typedSurahAudioFiles = surahAudioFiles as SurahAudioData;
const typedJuzAudioFiles = JuzAudioFiles as SurahAudioData;
const typedJuzMapping = JuzMapping as JuzMappingData;
const typedBismillahJson = bismillahJson as BismillahJson;



const QuranNavigation = ({navigation}: any) => {
  const [surahs, setSurahs] = useState<any>([]);
  const [juzData, setJuzData] = useState<any[]>([]);
  const [selected, setSelected] = useState('surah');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [audioData, setAudioData] = useState<any[]>([]);
  const playerBarRef = useRef<boolean>(false);
  const [juzMap, setJuzMap] = useState<any[]>([]);
  const {settings, changeSettings} = useContext(SettingsContext);
  const [reciter_slug, setReciterSlug] = useState(settings.reciter?.slug);

  const MeccaImage = require('../../assets/images/quran/kabba.png');
  const MadinaImage = require('../../assets/images/quran/Medina.png');
  const [downloadingId, setDownloadingId] = useState<number>(); 
  const [downloadingType, setDownloadingType] = useState<string>();
  const [downloadedSurahItems, setDownloadedSurahItems] = useState<{ [key: number]: { id: number, type: string } }>({});
  const [downloadedJuzItems, setDownloadedJuzItems] = useState<{ [key: number]: { id: number, type: string } }>({});

  const QuranListCard = ({ item, index, isLast, selected, navigation, downloadingId, downloadingType, downloadedItems, handleDownload }) => {
    const isSurah = selected === 'surah';
    const isDownloaded = downloadedItems[item.id]?.type === selected;
  
    return (
      <TouchableOpacity
        style={[styles.CardFirst, isLast && { paddingBottom: 100 }]}
        onPress={() =>
          navigation.navigate('QuranPagesStack', {
            screen: 'ReadQuran',
            params: { ...item, type: selected },
          })
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
        <View style={{ marginRight: 10 }}>
          <NumberSvg width={28.45} height={29.48} color="#223F7A" />
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#F4F4F4',
                fontSize: 9.97,
                fontWeight: '600',
                fontFamily: themeFont.englishFont,
                textAlign: 'center',
              }}
            >
              {item.id}
            </Text>
          </View>
        </View>

  
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12.5,
                fontWeight: '600',
                color: '#282828',
                fontFamily: themeFont.englishFont,
                lineHeight: 18.28,
                ...(isSurah ? { maxWidth: '70%' } : { marginLeft: 15 }),
              }}
            >
              {isSurah ? `Surah ${item?.name_simple}` : item?.name_simple}
            </Text>
            <Text
              style={{
                fontSize: isSurah ? 22 : 11,
                lineHeight: isSurah ? 32 : 12.9,
                color: '#C7C7C7',
                fontFamily: isSurah ? themeFont.indoPak : themeFont.englishFont,
                fontWeight: isSurah ? '400' : '400',
                ...(isSurah ? { maxWidth: '70%' } : { marginLeft: 15 }),
              }}
            >
              {isSurah ? `سورة ${item?.name_arabic}` : `${item?.verses_count} Verses`}
            </Text>
          </View>
  
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '10%',
              justifyContent: 'center',
              ...(isSurah && { marginTop: -20, marginRight: 20 }),
            }}
          >
            <TouchableOpacity onPress={() => handleDownload(item.id)}>
              {downloadingId === item.id && downloadingType === selected ? (
                <Animatable.View animation="rotate" iterationCount="infinite" duration={800}>
                  <AntDesign name="reload1" size={20} color="#2FA491" />
                </Animatable.View>
              ) : isDownloaded ? (
                <Feather name="check-circle" size={20} color="#2FA491" />
              ) : (
                <Feather name="download-cloud" size={20} color="#2FA491" />
              )}
            </TouchableOpacity>
          </View>
  
          {isSurah && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '20%',
                justifyContent: 'flex-end',
                marginTop: -20,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: '#C7C7C7',
                  fontFamily: themeFont.englishFont,
                  marginRight: 10,
                }}
              >
                {item.verses_count} verses
              </Text>
              {item.revelation_place === 'makkah' ? (
                <MeccaSvg width={22} height={22} />
              ) : (
                <MedinaSvg width={22} height={22} />
              )}

            </View>
          )}
  
          {!isSurah && (
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  color: '#C7C7C7',
                  fontFamily: themeFont.indoPak,
                  lineHeight: 28.92,
                }}
              >
                {item?.name_arabic}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  

  const handleDownload = useCallback(async (id: number) => {
      if (!reciter_slug) {
        // console.error('No reciter selected');
        return;
      }
      setDownloadingId(id); 
      setDownloadingType(selected);
      try {
        const audioData = selected === 'surah' 
          ? typedSurahAudioFiles[id]?.[reciter_slug]
          : typedJuzAudioFiles[id]?.[reciter_slug];
  
        if (audioData?.verses) {
          setAudioData(audioData.verses);
          
          if (selected === 'juz') {
            const juzMapData = typedJuzMapping[id];
            if (juzMapData?.verse_mappings) {
              setJuzMap(juzMapData.verse_mappings);
            }
          }
  
          await prepareAudioTracks(
            audioData.verses,
            selected === 'juz' ? typedJuzMapping[id].verse_mappings : [],
            id,
            reciter_slug,
            selected === 'juz' ? 'juz' : 'surah',
          );

          if(selected === 'juz' ) {
            setDownloadedJuzItems((prev: any) => ({
              ...prev,
              [id]: { id: id, type: 'juz' }
            }));
          } else {
            setDownloadedSurahItems(prev => ({
              ...prev,
              [id]: { id: id, type: 'surah' }
            }));
          }
          // setDownloadedItems((prev) => new Set(prev).add(id));
          setDownloadingId(0); 
          setDownloadingType('');
        }
      } catch (error) {
        console.error('Error in handleDownload:', error);
      }
    }, [selected, reciter_slug]);
  
    // Effects
    useEffect(() => {
      setSurahs(AllChaptersData);
      setJuzData(JuzData);
    }, []);

  useEffect(() => {
    const checkAllDownloads = async () => {
      if (surahs) {
        for (let i = 0; i < surahs.length; i++) {
          const downloadedCount = await checkDownload(
            'surah',
            surahs[i].id,
            reciter_slug
          );
          
          // console.log("downloaded count:", downloadedCount);
          
          if(downloadedCount > 0) {
            if (downloadedCount === surahs[i].verses_count) { 
              setDownloadedSurahItems(prev => ({
                ...prev,
                [surahs[i].id]: { id: surahs[i].id, type: 'surah' }
              }));
            }
          }
        }
      }

      if (juzData) {
        for (let i = 0; i < juzData.length; i++) {
          const downloadedCount = await checkDownload(
            'juz',
            juzData[i].id,
            reciter_slug
          );
          
          // console.log("downloaded count:", downloadedCount);
          
          if(downloadedCount > 0) {
            if (downloadedCount === juzData[i].verses_count) { 
              setDownloadedSurahItems(prev => ({
                ...prev,
                [juzData[i].id]: { id: juzData[i].id, type: 'juz' }
              }));
            }
          }
        }
      }
    };
  
    checkAllDownloads();
  }, [surahs, juzData]);
  
  const renderSearchBar = () => (
    <View
      style={{
        borderRadius: 25,
        paddingVertical: 11,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        flex: 1,
        height: 36,
      }}>
    {/* <View style={{position: 'relative',
      borderRadius: 20, paddingVertical: 16, marginVertical: 10}}>
      <BoxShadow themeMode={'light'} repeat={true}></BoxShadow> */}
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <TouchableOpacity onPress={() => setSearchVisible(false)}>
          <Image
            source={require('../../assets/images/quran/megnifine.png')}
            style={{width: 15, height: 15}}
          />
        </TouchableOpacity>
        <TextInput
          style={{flex: 1, height: 40, marginLeft: 10,color: '#000'}}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );

  const renderSurahButton = () => (
    <TouchableOpacity
      style={
        selected !== 'surah'
          ? [
              styles.buttonSurah,
              {
                flex: 1,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]
          : [
              styles.buttonSurah,
              {width: '70%', backgroundColor: '#4C20AA', marginHorizontal: 13},
            ]
      }
      onPress={() => setSelected('surah')}>
      <View
        style={{
          borderRadius: 15,
          paddingVertical: 11,
          paddingHorizontal: 20,
        }}>
        {/* <View style={{position: 'relative',
          borderRadius: 20}}>
        <BoxShadow themeMode={'light'} repeat={false} surahBtn={selected !== 'surah'
          ? true : false} shadowWidth={selected !== 'surah'
            ? false : true}></BoxShadow>
        <View style={{paddingVertical: 11,
          paddingHorizontal: 20}}> */}
        <Image
          source={
            selected === 'surah'
              ? require('../../assets/images/quran/quranIcon.png')
              : require('../../assets/images/quran/quranIconPurpule.png')
          }
          resizeMode="cover"
          style={{
            height: 24,
            width: 24,
            marginBottom: selected === 'surah' ? 15 : 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: -5,
          }}>
          <Text
            style={
              selected !== 'surah'
                ? [
                    styles.buttonSurahText,
                    {color: '#4C20AA', marginHorizontal: -5},
                  ]
                : [styles.buttonSurahText, {color: '#FFF'}]
            }>
            Surah
          </Text>
          {selected === 'surah' && (
            <Text
              style={{
                fontSize: 10,
                fontFamily: themeFont.englishFont,
                fontWeight: '400',
                color: '#FFF',
                lineHeight: 11.73,
                alignSelf: 'center',
              }}>
              114 Surahs
            </Text>
          )}
        </View>
        {/* </View>
      </View> */}
      </View>
    </TouchableOpacity>
  );

  const renderJuzButton = () => (
    <TouchableOpacity
      style={
        selected !== 'juz'
          ? [
              styles.buttonSurah,
              {
                flex: 1,
                borderRadius: 15.69,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
              },
            ]
          : [
              styles.buttonSurah,
              {
                width: '70%',
                backgroundColor: '#4C20AA',
                borderRadius: 15.69,
                marginHorizontal: 13,
              },
            ]
      }
      onPress={() => setSelected('juz')}>
      <View
        style={{
          borderRadius: 15,
          paddingVertical: 11,
          paddingHorizontal: 20,
        }}>
        <Image
          source={
            selected === 'surah'
              ? require('../../assets/images/quran/juzzIcon.png')
              : require('../../assets/images/quran/juzzIcongreen.png')
          }
          resizeMode="contain"
          style={{height: 24, width: 24}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text
            style={
              selected !== 'juz'
                ? [styles.buttonJuzzText, {color: '#4C20AA'}]
                : [styles.buttonJuzzText, {color: '#FFF'}]
            }>
            Juzz
          </Text>
          {selected === 'juz' && (
            <View>
              <Text
                style={{
                  fontSize: 10,
                  color: '#FFF',
                  fontFamily: themeFont.englishFont,
                  fontWeight: '400',
                  lineHeight: 11.73,
                  textAlign: 'right',
                }}>
                30 Juzz
              </Text>
            </View>
          )}
        </View>
        {/* </View>
      </View> */}
      </View>
    </TouchableOpacity>
  );

  const renderTopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={
        () => navigation.navigate('QuranStack', { screen: 'QuranDashboard' })
        }>
        <Entypo name="chevron-left" size={30} color="#282828" />
      </TouchableOpacity>
      {!searchVisible && <Text style={styles.title}>Quran Navigation</Text>}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 20,
        }}>
        {searchVisible ? (
          renderSearchBar()
        ) : (
          <TouchableOpacity onPress={() => setSearchVisible(true)}>
            <Image
              source={require('../../assets/images/quran/megnifine.png')}
              style={{width: 18, height: 18}}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('QuranStack', { screen: 'Bookmark' })}>
          <Image
            source={require('../../assets/images/quran/IconsBookMark.png')}
            style={{width: 16, height: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const flatListRef = useRef(null);

  useEffect(() => {
    setSurahs(AllChaptersData);
    setJuzData(JuzData);
  }, []);

  // Filtered surahs based on search text
  const filteredSurahs = surahs.filter(surah =>
    surah.name_simple.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Filtered juzData based on search text
  const filteredJuzData = juzData.filter(juz =>
    juz.name_simple.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Render the filtered surahs or juz based on selected
  const renderFilteredData = () => {
    if (searchText !== '') {
      if (selected === 'surah') {
        return (
          <FlatList
            data={filteredSurahs}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.CardFirst}
                key={item.name}
                onPress={() => {
                  // console.log('navigation', item);
                  navigation.navigate('QuranPagesStack', { screen: 'ReadQuran' , params: {
                    ...item, type: 'surah'
                  }});
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/quran/quranVector.png')}
                    style={{
                      width: 28.45,
                      height: 29.48,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <Text
                      style={{
                        color: '#F4F4F4',
                        fontSize: 9.97,
                        lineHeight: 11.69,
                        fontWeight: '600',
                        fontFamily: themeFont.englishFont,
                        textAlign: 'center',
                      }}>
                      {item.id}
                    </Text>
                  </ImageBackground>

                  <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontWeight: '600',
                        color: '#282828',
                        lineHeight: 18.28,
                        fontFamily: themeFont.englishFont,
                        maxWidth: '70%',
                      }}>
                      Surah {item?.name_simple}
                    </Text>
                    <Text
                      style={{
                        fontSize: 22,
                        lineHeight: 32,
                        color: '#C7C7C7',
                        fontFamily: themeFont.indoPak,
                        fontWeight: '400',
                        maxWidth: '70%'
                      }}>
                      سورة {item?.name_arabic}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: -20,
                      marginRight: 20,
                      width: '10%',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity onPress={() => handleDownload(item.id)}>
                      {downloadingId === item.id && downloadingType === 'surah' ? (
                        <Animatable.View animation="rotate" iterationCount="infinite" duration={800}>
                          <AntDesign name="reload1" size={20} color="#2FA491" />
                        </Animatable.View>
                      ) : downloadedSurahItems[item.id] && downloadedSurahItems[item.id].type === 'surah' ? ( 
                        // Show check icon after downloaded
                        <Feather name="check-circle" size={20} color="#2FA491" />
                      ) : ( 
                        // Show download icon initially
                        <Feather name="download-cloud" size={20} color="#2FA491" />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: -20,
                      marginRight: 20,
                      width: '20%',
                      justifyContent: 'flex-end'
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#C7C7C7',
                        fontFamily: themeFont.englishFont,
                        marginRight: 10,
                      }}>
                      {item.verses_count} verses
                    </Text>
                    <Image
                      source={
                        item.revelation_place === 'makkah'
                          ? MeccaImage
                          : MadinaImage
                      }
                      style={{
                        height: 22,
                        width: 22,
                        alignItems: 'center',
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      } else if (selected === 'juz') {
        return (
          <FlatList
            data={filteredJuzData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.CardFirst}
                key={item.id}
                onPress={() =>
                  navigation.navigate('QuranPagesStack', { screen: 'ReadQuran' , params: {
                    ...item, type: 'juz'
                  }})
                }>
                <View>
                  <ImageBackground
                    source={require('../../assets/images/quran/hexagon.png')}
                    style={{
                      width: 27.47,
                      height: 29.48,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#F4F4F4',
                        fontSize: 9.97,
                        fontFamily: themeFont.englishFont,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      {item.id}
                    </Text>
                  </ImageBackground>
                </View>

                <View
                style={
                  {
                    flex: 1
                  }
                }>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontWeight: '600',
                      color: '#282828',
                      justifyContent: 'center',
                      lineHeight: 18.28,
                      marginLeft: 15,
                      fontFamily: themeFont.englishFont,
                    }}>
                    {item?.name_simple}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '400',
                      lineHeight: 12.9,
                      color: '#B5B5B5',
                      marginLeft: 15,
                      justifyContent: 'center',
                      fontFamily: themeFont.englishFont,
                    }}>
                    {item?.verses_count} Verses
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    marginTop: -20,
                    width: '10%',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity onPress={() => handleDownload(item.id)}>
                    {downloadingId === item.id && downloadingType === 'juz' ? (
                      <Animatable.View animation="rotate" iterationCount="infinite" duration={800}>
                        <AntDesign name="reload1" size={20} color="#2FA491" />
                      </Animatable.View>
                    ) : downloadedJuzItems[item.id] && downloadedJuzItems[item.id].type === 'juz' ? ( 
                    // ) : downloadedItems.has(item.id) ? ( 
                      // Show check icon after downloaded
                      <Feather name="check-circle" size={20} color="#2FA491" />
                    ) : ( 
                      // Show download icon initially
                      <Feather name="download-cloud" size={20} color="#2FA491" />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '400',
                        color: '#C7C7C7',
                        justifyContent: 'center',
                        fontFamily: themeFont.indoPak,
                        lineHeight: 28.92,
                      }}>
                      {item?.name_arabic}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
  {/* Toggle Buttons */}
  {!searchVisible && (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 30,
            backgroundColor: selected === 'surah' ? '#193766' : '#F1F1F1',
          }}
          onPress={() => setSelected('surah')}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: selected === 'surah' ? '#FFFFFF' : '#000000',
              fontFamily: themeFont.englishFont,
            }}
          >
            Surah
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 30,
            backgroundColor: selected === 'juz' ? '#193766' : '#F1F1F1',
          }}
          onPress={() => setSelected('juz')}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: selected === 'juz' ? '#FFFFFF' : '#000000',
              fontFamily: themeFont.englishFont,
            }}
          >
            Juzz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )}

    
  
{!searchVisible && (
  <FlatList
    data={selected === 'surah' ? surahs : JuzData}
    keyExtractor={(item) => item.id.toString()}
    scrollEnabled={false}
    renderItem={({ item, index }) => (
      <QuranListCard
        item={item}
        index={index}
        isLast={index === (selected === 'surah' ? surahs.length - 1 : JuzData.length - 1)}
        selected={selected}
        navigation={navigation}
        downloadingId={downloadingId}
        downloadingType={downloadingType}
        downloadedItems={selected === 'surah' ? downloadedSurahItems : downloadedJuzItems}
        handleDownload={handleDownload}
      />
    )}
  />
)}
    </View>
  );
  
};
export default QuranNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 0, 
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  

  title: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '600',
    color: '#202020',
    fontSize: 15,
    lineHeight: 17.6,
    marginLeft: 10,
  },
  topBar: {
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSurah: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#193766', // active color (deep blue)
    marginRight: 8,
  },
  
  buttonJuzz: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#F1F1F1', // inactive grey background
  },
  

  magnifineIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonSurahText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
    color: '#FFF', // for active (Surah)
  },
  
  buttonJuzzText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
    color: '#000', // for inactive (Juzz)
  },
  

  buttonJuzzOne: {
    width: 106,
    height: 78.44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonGoTo: {
    width: 106,
    height: 40,
    backgroundColor: '#8352EC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonGoToText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  titleQuick: {
    marginHorizontal: 5,
    marginLeft: 16,
    color: '#8E7D7D',
    fontSize: 14,
    fontWeight: '400',
  },

  buttonAlKahf: {
    width: 89,
    height: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#1995AD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAlKahfText: {
    color: '#1995AD',
    fontSize: 12,
    fontWeight: '300',
  },

  buttonMaryam: {
    width: 89,
    height: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#1995AD',

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMaryamText: {
    color: '#1995AD',
    fontSize: 12,
    fontWeight: '300',
  },

  buttonYasin: {
    width: 89,
    height: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#1995AD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonYasinText: {
    color: '#1995AD',
    fontSize: 12,
    fontWeight: '300',
  },

  buttonBookMark: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  CardFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#4C20AA1A',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    minHeight: 90, // ensure equal height visually
  },

  CardFirst1: {
    flexDirection: 'row',
    borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4C20AA1A',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 5,
    paddingLeft: 70,
  },

  SurahTitle: {
    fontSize: 8,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listStyles: {
    marginTop: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});


