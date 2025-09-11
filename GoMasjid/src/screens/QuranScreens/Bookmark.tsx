import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Share,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {removeQuranBookmarkData} from '../../services/AsyncServices';
import {SettingsContext} from '../../context/SettingsProvider';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeFont } from '../../styles/theme';
import Header from '../../common/Header';
// import BoxShadow from '../../common/BoxShadow';

const {height, width} = Dimensions.get('window');

const Bookmark = ({navigation}: any) => {
  const [bookMarkData, setBookMarkData] = useState<any>([]);
  const {settings, changeSettings} = useContext(SettingsContext);
  const [surahTitle, setSurahTitle] = useState<string>('');


  useEffect(() => {
    getBookmarkData();
    // getLastReadBookmark();
  }, []);

  const getBookmarkData = () => {
    AsyncStorage.getItem('quran_bookmarks').then((data: any) => {
      let asyncData = JSON.parse(data) || [];
      if (asyncData && asyncData.length > 0) {
        console.log('bookmark saved successfully', asyncData);
        setBookMarkData(asyncData);
      }
    });
  };

  const removeBookMark = async (BookmarkData: any) => {
    let a = await removeQuranBookmarkData(BookmarkData);
    // console.log('aaaaaaaa', a);

    getBookmarkData();
  };

  const navigateChapter = (bookmark: any) => {
    let a = settings;
    a.bookmarkNavigate = bookmark;
    console.log('book mark navigate+', bookmark);
    changeSettings(a);
    navigation.navigate('ReadQuran', {
      verse_key: bookmark.verse_key,
      verse_number: bookmark.verse_number,
      id: bookmark.id,
      type: bookmark.type,
      bookmarkScrollIndex: bookmark.bookmarkScrollIndex
    });
  };

  const shareSurah = (bookmark: any) => {
    Share.share({
      message: `Check out Surah ${surahTitle} ${bookmark?.verse_key} ${bookmark.script} ${bookmark?.translations} from the Quran!`,
    });
  };

  return (
    <View style={styles.Container}>
      <Header
        title="My Bookmarks"
        titleColor="#000"
        iconColor="#000"
        onBack={() => navigation?.goBack()}
      />
      <ScrollView style={{marginBottom: 0}}>
        {bookMarkData.map((bookmark: any, index: number) => (
          
          <View key={index} style={{position: 'relative', borderColor: '#E0E5EC',
            borderWidth: 1,
            borderRadius: 20, paddingVertical: 18, marginVertical: 10}}>
            {/* <BoxShadow themeMode={'light'} repeat={true}></BoxShadow> */}
            <TouchableOpacity
              style={styles.CardOne}
              onPress={() => {
                console.log('clicked++', bookmark);
                navigateChapter(bookmark);
                
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: '#282828',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: '500',
                      lineHeight: 13,
                      fontFamily: themeFont.englishFont,
                      marginLeft: 50,
                    }}>
                    {bookmark.surahTitle},&nbsp;Ayat&nbsp;
                    {bookmark?.verse_key}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 10, marginVertical: 5}}>
                  <TouchableOpacity onPress={() => removeBookMark(bookmark)}>
                    <Ionicons name="bookmark" color={'#3DC8B2'} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => shareSurah(bookmark)}>
                    <Fontisto name="share-a" color={'#3DC8B2'} size={19} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{}}>
                <View>
                  <View style={{}}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#4617A9',
                          fontSize: 16,
                          lineHeight: 23,
                          fontWeight: '500',
                          fontFamily: themeFont.indoPak,
                        }}>
                        {bookmark?.script}
                      </Text>
                    </View>

                    <View style={{marginTop: 10}}>
                      <Text
                        style={{
                          textAlign: 'justify',
                          color: '#4617A9',
                          fontFamily: themeFont.englishFont,
                          fontSize: 12,
                        }}>
                        {bookmark?.translations}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    // height: height,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 140 : 60
  },
  topBarHeader: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#202020',
    fontSize: 15,
    marginLeft: 15,
    lineHeight: 17.6,
    fontFamily: themeFont.englishFont,
  },
  topBar: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  verseText: {fontSize: 12, fontWeight: '400', color: '#4C20AA'},
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4C20AA',
    textAlign: 'center',
    marginLeft: 50,
    flexWrap: 'wrap',
    width: width / 3,
  },
  pageVerseText: {
    color: '#8352EC',
    textAlign: 'center',
  },
  pageText: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    color: '#4C20AA',
    marginLeft: 30,
    marginBottom: 8,
  },
  bookmarkDescText: {
    fontSize: 8,
    fontWeight: '400',
    color: '#4C20AA',
    marginLeft: 90,
  },
  pageVerseNumberText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4C20AA',
    marginLeft: 55,
    marginTop: 2,
  },

  CardOne: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 5
  },

  TimeButton: {
    alignItems: 'center',
    borderWidth: 1.2,
    width: width / 7,
    borderRadius: 5,
    padding: 1,
    borderColor: '#4C20AA',
    marginBottom: 2,
  },
});
export default Bookmark;