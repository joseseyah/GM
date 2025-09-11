import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import theme, { themeFont } from '../../styles/theme';
import {removeDuaBookMark, storeDuaBookmarkData} from '../../services/AsyncServices';
// import BoxShadow from '../../common/BoxShadow';
import DuaPlayer from './DuaPlayer';
// import { DuasData } from '../../common/meta/DuaFiles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import playerStore from '../../stores/playerStore';
import {DuasData} from '../../services/fileCache';
import Header from '../../common/Header';

const Dua = ({route, navigation}: any) => {
  const {duaCategoryName, title, iconInfo, uri, subCatId, catId} =
    route.params;

  const [playerBar, setPlayerBar] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>();
  const [DuaData, setDuaData] = useState<any>([]);
  const [heartStates, setHeartStates] = useState<number[]>([]);
  const [playerData, setPlayerData] = useState<any>();
  const {duaPlaying} = playerStore();

  const loadDuas = async () => {
    // return DuasData[uri];
    const dua_data = await DuasData(uri);
    setDuaData(dua_data);
  }

  useEffect(() => {
    loadDuas();
    // const dua_data = loadDuas();
    // setDuaData(dua_data);
  }, [uri]);

  useEffect(() => {
    AsyncStorage.getItem('Dua_bookmark').then((data: any) => {
      let asyncData = JSON.parse(data) || [];
      console.log('asyncData', asyncData);
      if (asyncData && asyncData.length > 0) {
        subCatId
        // const ids = asyncData.map((dua: { duaId: any; }) => dua.duaId);
        const ids = asyncData.map((dua: {
          duaCat: any;
          duaSubCat: any; duaId: any; 
        }) => {
          if(dua.duaSubCat === subCatId && dua.duaCat === catId) {
            return dua.duaId;
          }
        });
        setHeartStates(ids);
      }
    });
  }, []);

  const getDuaBookmarkData = (duaItem: any, addData: boolean) => {
    const DuaBookmarkData = {
      ...duaItem,
      duaId: duaItem.duaId,
      title: title,
      englishTranslation: duaItem.englishTranslation,
      duaCategoryName: duaCategoryName,
      arabicVerse: duaItem.arabicVerse,
      iconInfo: iconInfo,
      duaSubCat: subCatId,
      duaCat: catId,
      reference: duaItem.reference
    };
    // console.log("duabookmark", DuaBookmarkData);
    if(addData) {
      storeDuaBookmarkData(DuaBookmarkData);
    } else {
      removeDuaBookMark(DuaBookmarkData);
    }
  };

  const toggleHeart = (index: number, duaItem: any) => {
    const newHeartStates = [...heartStates];
    let addData;
    let f = newHeartStates.findIndex((id) => id === duaItem.duaId);
    if (f === -1) {
      newHeartStates.push(duaItem.duaId);
      addData = true;
    } else {
      newHeartStates.splice(f, 1);
      addData = false;
    }
    console.log('newHeartStates', newHeartStates);
    console.log('heartStates', heartStates);

    setHeartStates(newHeartStates);
    getDuaBookmarkData(duaItem, addData);
  };

  // const scrollOnAudio = (id: any) => {
  //   // getCurrentTrackData();
  //   let f = DuaData.findIndex((x: any) => x.duaId == id.key);
  //   // console.log('id', id, f);
  //   setCurrentTrack(id);
  //   // setCurrentTrack(verses[f]);
  //   // flatListRef.current?.scrollToIndex({
  //   //   animated: true,
  //   //   index: f,
  //   //   viewPosition: 0.5,
  //   // });
  // };

  
  const changeTrack = async (id: any, url: any, duaId: number) => {
    if (currentTrack === duaId && duaPlaying) {
      setPlayerBar(true);
      playerStore.setState({
        duaPlaying: false,
        stopPlaying: true
      });
    } else {
      setPlayerBar(true);
      playerStore.setState({
        stopPlaying: false
      });
      const dua_data = {
        duaId: duaId,
        duaUrl: url,
        duaTitle: title
      }
      // console.log(dua_data);
      setPlayerData(dua_data);
      setCurrentTrack(duaId)
    }
  };

  const shareDua = async (duaItem: { arabicVerse: any; transliteration: any; englishTranslation: any; reference: any; }) => {
    try {
      const result = await Share.share({
        message: `${duaItem.arabicVerse}\n\n${duaItem.transliteration}\n\n${duaItem.englishTranslation}\n\n${duaItem.reference}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          title=""
          titleColor="#000"
          iconColor="#000"
          onBack={() => navigation?.goBack()}
        />

        <View style={{flexDirection: 'row', gap: 15, marginBottom: 10}}>
          <View style={styles.insetShadow}>
            <View style={styles.header}>
              <View style={{top: 18, left: 19}}>
                {iconInfo && iconInfo.iconSet === 'MaterialCommunityIcons' ? (
                  <MaterialCommunityIcons
                    name={iconInfo.iconName}
                    color={iconInfo.iconColor}
                    size={iconInfo.iconSize}
                  />
                ) : iconInfo ? (
                  <MaterialIcons
                    name={iconInfo.iconName}
                    color={iconInfo.iconColor}
                    size={iconInfo.iconSize}
                  />
                ) : null}
                <Text style={styles.headerText}>{duaCategoryName}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('DuaBookmark')}
            style={{
              width: '20%',
              height: 46,
              justifyContent: 'center',
              alignItems: 'center',
              top: 20,
            }}>
            <MaterialCommunityIcons name="heart" size={30} color="#3DC8B2" />
            <Text
              style={{
                fontFamily: themeFont.englishFont,
                fontWeight: Platform.OS === 'ios' ? '400' : '600', 
                fontSize: 10,
                // lineHeight: 9.38,
                textAlign: 'center',
                color: '#000',
                marginTop: 5,
              }}>
              All Favourite Duas
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.verseContainer}>
            {DuaData &&
              DuaData?.data?.map((duaItem: any, index: number) => (
                <View key={`duaItemKey-${index}`} 
                  style={{
                    position: 'relative', 
                    marginTop: 15,
                    borderColor: '#E0E5EC',
                    borderWidth: 1,
                    borderRadius: 15
                  }}>
                  {/* <BoxShadow themeMode={'light'} repeat={true} surahBtn={false}></BoxShadow> */}
                  <View 
                  style={{
                    position: 'relative', 
                    paddingVertical: 10, 
                    paddingHorizontal: 10,
                  }}>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 15,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={styles.numberContaier}>
                          <Text style={styles.numberStyle}>
                            {/* {duaItem.duaId} */}
                            {duaItem.url !== '' && (
                              <TouchableOpacity
                                onPress={() => changeTrack(index, duaItem.url, duaItem.duaId)}>
                                <FontAwesome5
                                  name={
                                    currentTrack === duaItem.duaId && duaPlaying
                                      ? 'pause'
                                      : 'play'
                                  }
                                  size={20}
                                  color="#3DC8B2"
                                />
                              </TouchableOpacity>
                            )}
                          </Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                          <Text style={styles.textBreakfast}>{title}</Text>
                        </View>
                      </View>
                      <View style={styles.textContainer}>
                        <Text
                          style={[styles.textStyle, {fontFamily: themeFont.indoPak}]}>
                          {duaItem.arabicVerse}
                        </Text>
                      </View>

                      <Text style={styles.translateText}>
                        {duaItem.transliteration}
                      </Text>

                      <Text style={styles.translateText}>
                        {duaItem.englishTranslation}
                      </Text>

                      <Text style={styles.textSubtitle}>
                        {duaItem.reference}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        gap: 10,
                        marginBottom: 15,
                        marginRight: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => toggleHeart(index, duaItem)}>
                        <MaterialCommunityIcons
                          name={heartStates.includes(duaItem.duaId) ? 'heart' : 'cards-heart-outline'}
                          size={20}
                          color="#3DC8B2"
                        />
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={() => getDuaBookmarkData(duaItem)}>
                        <MaterialCommunityIcons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color="#3DC8B2" />
                      </TouchableOpacity> */}

                      <TouchableOpacity onPress={() => shareDua(duaItem)}>
                        <MaterialCommunityIcons
                          name="share"
                          size={20}
                          color="#3DC8B2"
                        />
                      </TouchableOpacity>
                    </View>
                </View>
                </View>
              ))}
          </View>
        </ScrollView>
        {playerBar && (
          <DuaPlayer
            playerData={playerData}
            playerClose={() => {
              setPlayerBar(false);
              playerStore.setState({
                duaPlaying: false,
                stopPlaying: true
              });
              console.log('playerClose', playerStore.getState());
              console.log('playerData', playerData);
            }}
            
            // trackChange={scrollOnAudio}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  topBar: {
    paddingVertical: 15,
    // paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarHeader: {
    // flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: theme.colors.primary,
    fontSize: 22,
    // lineHeight: 25.83,
    marginHorizontal: 65,
  },
  textBreakfast: {
    color: '#202020',
    fontSize: 12,
    // lineHeight: 11.73,
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
  },
  textSubtitle: {
    fontSize: 12,
    // lineHeight: 11.73,
    fontWeight: Platform.OS === 'ios' ? '400' : '600', 
    color: '#282828',
    marginBottom: 10,
    fontFamily: themeFont.englishFont,
    // marginTop: 0,
    // marginVertical: 10,
  },
  verseContainer: {
    // borderBottomColor: 'rgba(123, 128, 173, 0.35)',
    // borderBottomWidth: 0.8,
    // marginVertical: 10,
    // width: 314.45,
    // height: 137.06,
  },
  textContainer: {
    marginTop: 24,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingRight: 20,
    paddingLeft: 10,
  },
  textStyle: {
    paddingVertical: 10,
    color: '#282828',
    fontFamily: themeFont.indoPak,
    flexShrink: 1,
    textAlign: 'right',
    fontWeight: Platform.OS === 'ios' ? '400' : '600', 
    fontSize: 20,
    // lineHeight: 28.62,
  },
  arabicTextStyle: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    fontSize: 20,
    color: theme.colors.primary,
    fontFamily: themeFont.indoPak,
    flexShrink: 1,
  },
  translateText: {
    alignSelf: 'flex-start',
    // textAlign: 'justify',
    fontSize: 13,
    fontWeight: Platform.OS === 'ios' ? '400' : '600', 
    fontFamily: themeFont.englishFont,
    color: '#282828',

    // lineHeight: 11.73,
    marginBottom: 10,
  },
  listStyles: {
    // marginTop: 60,
  },
  numberContaier: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberStyle: {
    // fontFamily: 'SFProDisplay-Regular',
    // color: '#fff',
    // fontSize: 16,
    marginTop: 10,
    marginRight: 15,
  },
  overlayView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  footerContainer: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  // footerItem: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.colors.backgroundcard,
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  insetShadow: {
    flex: 1,
    width: '80%',
    height: 80,
    borderRadius: 15,
    backgroundColor: '#4C20AA',
  },

  insetShadow1: {
    // width: 314.45,
    // height: 137.06,
    // justifyContent: 'center',
    flex: 1,

    borderRadius: 15.69,
  },

  header: {
    // flexDirection: 'row',
  },
  headerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 12.5,
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    // lineHeight: 18.28,
    letterSpacing: 0.09,
    color: '#FFFFFF',
    top: 8,
    left: 1,
  },
});

export default Dua;
