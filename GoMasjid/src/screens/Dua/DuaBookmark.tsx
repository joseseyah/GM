import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Share,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import theme, { themeFont } from '../../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BoxShadow from '../../common/BoxShadow';
import Header from '../../common/Header';

const { height } = Dimensions.get('window');

const DuaBookmark = ({ route, navigation }: any) => {
  const [duaBookMarkData, setDuaBookMarkData] = useState<any[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('Dua_bookmark').then((data: any) => {
      let asyncData = JSON.parse(data) || [];
      if (asyncData && asyncData.length > 0) {
        setDuaBookMarkData(asyncData);
        // console.log('set book mark', asyncData);
      } else {
        setDuaBookMarkData([]);
      }
    });
  }, []);

  const removeDuaBookMark = async (bookmarkData: any) => {
    try {
      // Get bookmarked data from AsyncStorage
      let asyncData = await AsyncStorage.getItem('Dua_bookmark');
      let bookmarkedData = JSON.parse(asyncData ?? '[]');
  
      bookmarkedData = bookmarkedData.filter(
        (bookmark: any) => !(bookmark.duaId === bookmarkData.duaId && bookmark.duaCat === bookmarkData.duaCat && bookmark.duaSubCat === bookmarkData.duaSubCat)
      );
  
      // Update AsyncStorage
      await AsyncStorage.setItem('Dua_bookmark', JSON.stringify(bookmarkedData));
      setDuaBookMarkData(bookmarkedData);
    } catch (error) {
      // console.error('Failed to remove bookmark', error);
    }
  };  

  const shareDua = async (duabookmark: any) => {
    try {
      const shareContent = {
        duaname: duabookmark.duaCategoryName,
        title: duabookmark.title,
        message: `${duabookmark.arabicVerse}\n\n${duabookmark.englishTranslation}`,
      };
      const result = await Share.share(shareContent);
      if (result.action === Share.sharedAction) {
        // console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // console.log('Share cancelled');
      }
    } catch (error) {
      // console.error('Failed to share dua', error.message);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.mainContainer}>
        <Header
          title="Favourites"
          titleColor="#000"
          iconColor="#000"
          onBack={() => navigation?.goBack()}
        />
        <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.insetShadow}>
              <View style={{ top: 18, left: 19 }}>
                <MaterialCommunityIcons
                  name="heart"
                  size={24}
                  color="#3DC8B2"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.headerText}>Favourite Duas</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: '#F4F4F4',
                      lineHeight: 11.73,
                      fontFamily: themeFont.englishFont,
                      top: 12,
                      right: 35,
                    }}>
                    All Favourite Duas
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          {(duaBookMarkData || []).map((duabookmark: any, index: number) => (
            <React.Fragment key={duabookmark.duaId}> 
              <View
                style={{
                  alignItems: 'center',
                  borderColor: '#E0E5EC',
                  borderWidth: 1,
                  borderRadius: 15
                }}>
                <TouchableOpacity
                  style={styles.CardOne}
                  key={index}
                  onPress={() =>
                    navigation.navigate('DuaScreen', {
                      // data: duabookmark.data,
                      duaCategoryName: duabookmark.duaCategoryName,
                      title: duabookmark.title,
                      // englishTranslation: duabookmark.englishTranslation,
                      subCatId: duabookmark.duaSubCat,
                      catId: duabookmark.duaCat,
                      uri: duabookmark.duaCat+'-'+duabookmark.duaSubCat,
                      iconInfo: duabookmark.iconInfo,
                      // duaId: duabookmark.duaId, 
                    })
                  }>
                  <View style={{
                    position: 'relative',
                    marginTop: 15,
                  }}>
                    {/* <BoxShadow themeMode={'light'} repeat={true} surahBtn={false}></BoxShadow> */}
                    <View style={{
                      paddingVertical: 20,
                      paddingHorizontal: 20,
                      width: '100%'
                    }}>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            marginBottom: 10,
                          }}>
                          <Text style={styles.nameText}>
                            {duabookmark.duaCategoryName}
                          </Text>
                        </View>
                        {/* <View style={{flexDirection: 'row'}}>
                        <Text style={styles.nameText}>{duabookmark.title}</Text>
                      </View> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontFamily: themeFont.indoPak,
                              fontSize: 20,
                              fontWeight: '400',
                              lineHeight: 28.62,
                              textAlign: 'right',
                              color: '#282828',
                            }}>
                            {duabookmark.arabicVerse}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                          }}>
                          <Text
                            style={{
                              alignSelf: 'flex-start',
                              textAlign: 'justify',
                              fontSize: 13,
                              fontWeight: '400',
                              fontFamily: themeFont.englishFont,
                              color: '#282828',
                            }}>
                            {duabookmark.englishTranslation}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          gap: 10,
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => removeDuaBookMark(duabookmark)}>
                          <AntDesign name="heart" color="#3DC8B2" size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => shareDua(duabookmark)}>
                          <MaterialCommunityIcons
                            name="share"
                            color="#3DC8B2"
                            size={25}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: height,
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  mainContainer: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'left',
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    color: '#282828',
    fontSize: 15,
    marginTop: 23,
    marginLeft: 15,
    fontFamily: themeFont.englishFont,
    lineHeight: 17.6,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  topBar: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  nameText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    color: '#202020',
    lineHeight: 14.09,
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },

  CardOne: {
    width: '100%',
    backgroundColor: theme.colors.backgroundcard,
    borderRadius: 15,
  },

  insetShadow: {
    flex: 1,
    width: '100%',
    height: 80,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#4C20AA',
  },
  headerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 12.5,
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    lineHeight: 18.28,
    letterSpacing: 0.09,
    color: '#FFFFFF',
    top: 8,
    left: 1,
  },
});
export default DuaBookmark;
