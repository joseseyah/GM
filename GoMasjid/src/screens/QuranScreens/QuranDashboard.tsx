import React, {useContext, useEffect, useState} from 'react';

import { InteractionManager } from 'react-native';
import { Surah } from '../../types/quran';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  BackHandler,
  ImageBackground,
  Share,
  SafeAreaView,
  Platform,
  TextInput,
} from 'react-native';
import {themeFont} from '../../styles/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {SettingsContext} from '../../context/SettingsProvider';
import allReciters from '../../common/meta/reciters.json';
import {recitersImg} from '../../common/meta/reciters';
import { getRandomAyah } from '../../services/Quran';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AllChaptersData} from '../../common/meta/AllChaptersData';
import { handleShare } from '../../services';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styling from '../../styles/quran/dashboard'
import QuranNavigation from './QuranNavigation';

import BismillahSvg from '../../assets/svgs/bismillah.svg';





const {width, height} = Dimensions.get('window');

// Number of verses in each Surah
const surahVerseCounts = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98,
  135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
  54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11,
  11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25,
  22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6,
  3, 5, 4, 5, 6,
];

const QuranDashboard = ({navigation}: any) => {
  const {settings, changeSettings} = useContext(SettingsContext);
  const [recitersData, setRecitersData] = useState<any[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<any>({});
  const [reciter_slug, setReciterSlug] = useState(settings.reciter.slug);
  const [randomAyah, setRandomAyah] = useState<any>();
  const [ayahInfo, setAyahInfo] = useState<any>();
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  const [quranEngagementTime, setQuranEngagementTime] = useState<number>(null);
  const [LastReadAyah, setLastReadAyah] = useState<any>({});
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const [searchResults, setSearchResults] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [showSearchBar, setShowSearchBar] = useState(false);




  // const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // console.log("Reciter Updated:", reciter_slug);
      setSelectedReciter(settings.reciter);
    }
  }, [isFocused, reciter_slug]);

  useEffect(() => {
    setRecitersData(allReciters);
    setSelectedReciter(settings.reciter);

    const fetchLastReadAyah = async () => {
      try {
        const lastReadAyahData = await AsyncStorage.getItem('LastReadAyah');
        if (lastReadAyahData !== null) {
          const parsedData = JSON.parse(lastReadAyahData); 
          setLastReadAyah(parsedData);
          console.log(`Retrieved lastReadAyahData: ${lastReadAyahData}`);
          // console.log(parsedData?.surahTitle)
        } else {
          console.log('No lastReadAyahData found');
        }
      } catch (error) {
        console.error('Error retrieving lastReadAyahData:', error);
      }
    };

    const fetchEngagementTime = async () => {
      try {
        const time = await AsyncStorage.getItem('quranEngagementTime');
        if (time !== null) {
          const seconds = time ? parseFloat(time) : 0;
          setQuranEngagementTime(seconds); 
          console.log(`Retrieved engagement time: ${time} seconds`);
        } else {
          console.log('No engagement time found');
        }
      } catch (error) {
        console.error('Error retrieving engagement time:', error);
      }
    };

    InteractionManager.runAfterInteractions(() => {
      fetchLastReadAyah();
      fetchEngagementTime();
    });
    

    // Function to fetch and store new random ayah
    const fetchAndStoreRandomAyah = async () => {
      const data = await getRandomAyah();
      if (data) {
        const verse = data?.data?.verse;
        
        if (verse?.translations?.[0]?.text) {
          // Create a new object with the updated value
          const updatedVerse = {
            ...verse,
            translations: [
              {
                ...verse.translations[0],
                text: verse.translations[0].text.replace(/<\/?[^>]+(>|$)/g, ''), // Remove HTML tags
              },
              ...verse.translations.slice(1), // Keep other translations if any
            ],
          };
          // Set the updated object in the state
          setRandomAyah(updatedVerse);
        } else {
          setRandomAyah(verse);
        }
        const temp = verse?.verse_key;
        const stringParts = temp.split(':');
        const surah = AllChaptersData.find(x => x.id == stringParts[0]);
        setAyahInfo({
          no: stringParts[0],
          surah: surah?.name_simple,
          ayah: stringParts[1],
        });

        // Store in AsyncStorage
        const timestamp = Date.now();
        setLastUpdated(timestamp);
        await AsyncStorage.setItem(
          'randomAyah',
          JSON.stringify({verse, timestamp}),
        );

      }
    };

    // Function to check if stored ayah is older than 24 hours
    const checkStoredAyah = async () => {
      const storedAyah = await AsyncStorage.getItem('randomAyah');
      if (storedAyah) {
        const {verse, timestamp} = JSON.parse(storedAyah);
        const hoursDifference = (Date.now() - timestamp) / (1000 * 60 * 60);
        if (hoursDifference >= 24) {
          // Fetch new random ayah if older than 24 hours
          fetchAndStoreRandomAyah();
        } else {
          // Set the stored ayah
          setRandomAyah(verse);
          const temp = verse?.verse_key;
          const stringParts = temp.split(':');
          const surah = AllChaptersData.find(x => x.id == stringParts[0]);
          setAyahInfo({
            no: stringParts[0],
            surah: surah?.name_simple,
            ayah: stringParts[1],
          });
        }
      } else {
        // Fetch new random ayah if none stored
        fetchAndStoreRandomAyah();
      }
    };
    checkStoredAyah();
    // fetchAndStoreRandomAyah()
    
  }, []);


  const handleVerseShare = () => {
    const arabicText = randomAyah?.text_indopak;
    const translationText = randomAyah?.translations[0].text.replace(/<\/?[^>]+(>|$)/g, '') || '';
    handleShare(
      'Go Masjid Quran',
      null,
      `Surah ${ayahInfo?.no}. ${ayahInfo?.surah}, Ayah ${ayahInfo?.ayah}\n${arabicText}\n${translationText}`,
    );
  };
  
  const formatTime = (secondsInput: number) => {
    const totalSeconds = Math.round(secondsInput);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    let formattedParts = [];
  
    if (hours > 0) {
      formattedParts.push({ value: hours, unit: 'hr' });
    }
    if (minutes > 0) {
      formattedParts.push({ value: minutes, unit: 'min' });
    }
    
    // show seconds if no other units are present
    if (seconds > 0 || formattedParts.length === 0) {
      if (hours <= 0 && minutes <= 0){
      formattedParts.push({ value: seconds, unit: 'sec' });
      }
    }
  
    return formattedParts;
  };
  function DisplayQuranEngagementTime(seconds: number) {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      seconds = 0; 
    }
    const timeParts = formatTime(seconds);
  
    return (
      <View style={{flexDirection: 'row', marginRight: 18}}>
        {timeParts.map((part, index) => (
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            }} key={index}>
            <Text style={styles.engagementTimeText}>{part.value}</Text>
            <Text style={styles.engagementTimeUnit}> {part.unit}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Call resetEngagementTime after updating state
  const resetEngagementTime = async () => {
    try {
      setQuranEngagementTime(0);
      await AsyncStorage.setItem('quranEngagementTime', '0');
    } catch (error) {
      console.error('Error resetting engagement time:', error);
    }
  };

  const handleSurahSearch = (text: string) => {
    const query = text.toLowerCase();
    const filtered = AllChaptersData
      .filter(surah =>
        surah.name_simple.toLowerCase().includes(query)
      )
      .map(surah => ({
        number: surah.id,
        revelation_place: surah.revelation_place,
        name: surah.name_simple,
        total_ayah: surah.verses_count,
        translated_name: {
          language_name: 'english',
          name: surah.translated_name?.name || '',
        }
      }));
  
    setSearchResults(filtered);
  };
  
  


  // Function to calculate the completion percentage
  const calculateCompletion = (surahNumber: number, verseNumber: number) => {
    if (
      isNaN(surahNumber) ||
      isNaN(verseNumber) ||
      surahNumber < 1 ||
      surahNumber > 114 ||
      verseNumber < 1 ||
      verseNumber > surahVerseCounts[surahNumber - 1]
    ) {
      return 0; // Return 0% if the inputs are invalid
    }

    // Calculate total verses read up to the current position
    const totalVersesRead =
      surahVerseCounts.slice(0, surahNumber - 1).reduce((acc, count) => acc + count, 0) + verseNumber;

    const totalVerses = surahVerseCounts.reduce((acc, count) => acc + count, 0);

    // Calculate the completion percentage
    return ((totalVersesRead / totalVerses) * 100).toFixed(1);
  };

  // Use useEffect to update the completion percentage when LastReadAyah changes
  useEffect(() => {

    if (LastReadAyah && LastReadAyah.verse_key && LastReadAyah.verse_number) {
      const [surah, verse] = LastReadAyah.verse_key.split(':').map(Number);
      const percentage = calculateCompletion(surah, parseInt(LastReadAyah.verse_number));
      setCompletionPercentage(percentage);
    }
  }, [LastReadAyah]);

  return (
    <SafeAreaView style={styling.container}>
      <ScrollView contentContainerStyle={styling.scrollContainer} keyboardShouldPersistTaps="handled">
        
        {/* Header Row */}
        <View style={styling.headerRow}>
          <Text style={styling.title}>Holy Quran</Text>
  
          {/* Toggle Search Icon */}
          {!showSearchBar && (
            <TouchableOpacity
            onPress={() => setShowSearchBar(true)}
            style={styles.searchIconButton}
          >
            <FontAwesome name="search" size={20} color="#000" />
          </TouchableOpacity>
          
          )}
        </View>
  
        {/* Search Bar */}
        {showSearchBar && (
          <View style={styles.searchBarContainer}>
            <FontAwesome name="search" size={18} color="#888" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Surah"
              placeholderTextColor="#999"
              value={searchQuery}
              autoFocus
              onChangeText={(text) => {
                setSearchQuery(text);
                handleSurahSearch(text);
              }}
            />
            <TouchableOpacity onPress={() => {
              setSearchQuery('');
              setShowSearchBar(false);
            }}>
              <Text style={{ color: '#888', fontSize: 14, marginLeft: 8 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
  
        {/* Bismillah SVG */}
        <View style={styling.bismillahWrapper}>
          <BismillahSvg width={250} height={80} fill="#223F7A" />
        </View>
  
        {/* Quran Navigation (Surah / Juzz toggle) */}
        <QuranNavigation navigation={navigation} />
  
        {/* Search Results */}
        {searchQuery.length > 0 && (
          <View style={styles.searchResultsContainer}>
            {searchResults.length > 0 ? (
              searchResults.map((surah) => (
                <TouchableOpacity
                  key={surah.number}
                  style={styles.searchResultItem}
                  onPress={() => {
                    setSearchQuery('');
                    setShowSearchBar(false);
                    navigation.navigate('SurahScreen', { surahId: surah.number });
                  }}
                >
                  <View>
                    <Text style={styles.searchResultText}>
                      {surah.number}. {surah.name}
                    </Text>
                    <Text style={styles.searchResultSubText}>
                      {surah.translated_name.name} • {surah.total_ayah} Ayahs • {surah.revelation_place.charAt(0).toUpperCase() + surah.revelation_place.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.searchNoResult}>No surah found</Text>
            )}
          </View>
        )}
  
      </ScrollView>
    </SafeAreaView>
  );
  
  
  
  
};

export default QuranDashboard;

const styles = StyleSheet.create({
  searchResultSubText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  
  searchBarContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F1F1F1',
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  marginVertical: 10,
  marginHorizontal: 10,
},
searchIconButton: {
  width: 40,
  height: 40,
  borderRadius: 30,
  backgroundColor: '#F1F1F1',
  justifyContent: 'center',
  alignItems: 'center',
},


searchInput: {
  flex: 1,
  fontSize: 16,
  color: '#333',
},

searchResultsContainer: {
  paddingHorizontal: 20,
  marginTop: 10,
},

searchResultItem: {
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#E0E0E0',
},

searchResultText: {
  fontSize: 16,
  color: '#333',
},

searchNoResult: {
  fontSize: 14,
  color: '#888',
  marginTop: 10,
  fontStyle: 'italic',
},

  frame: {
    width: 200,
    height: 80,
  },
  topBar: {
    // paddingVertical: 15,
    paddingVertical: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    paddingBottom: 20,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
  },
  header: {
    color: '#F4F4F4',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    lineHeight: 17.6,
    fontFamily: themeFont.englishFont,
  },
  dashboard: {
    fontSize: 30,
    marginTop: 25,
    fontWeight: 'bold',
    color: '#1995AD',
    textAlign: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: '#3DC8B2',
    fontSize: 22,
    marginRight: 40,
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.31)',
  },

  quranCard: {
    width: 164.24,
    maxHeight: 64.25,
    aspectRatio: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.34)',
  },

  cardOne: {
    width: 123.78,
    maxHeight: 64.25,
    aspectRatio: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.34)',
    height: '100%'
  },

  cardOnejj: {
    width: '48%',
    padding: 15,
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
    alignSelf: 'center',
    height: '100%',
  },
  cardThree: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.34)',
  },
  cardFour: {
    flexWrap: 'wrap',
    marginVertical: 10,
    paddingVertical: 15,
    maxWidth: '100%',
    paddingBottom: 50,
  },
  recitersCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  reciterHeader: {
    color: '#F4F4F4',
    fontSize: 15,
    lineHeight: 17.6,
    fontFamily: themeFont.englishFont,
    fontWeight: '600',
  },
  quran_buttonText: {
    color: '#F4F4F4',
    fontSize: 12.5,
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
    lineHeight: 18.28,
    letterSpacing: 0.09,
  },
  lastRead: {
    color: '#F4F4F4',
    fontSize: 11,
    fontWeight: '400',
    fontFamily: themeFont.englishFont,
    lineHeight: 14.3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  clockIcon: {
    marginRight: 10,
  },
  playIcon: {
    marginRight: 12,
    marginLeft: 5,
  },

  refresh_button: {
    position: 'absolute',
    top: 0,
    right: -75,
  },
  buttonText: {
    color: '#184A2C',
  },
  textStyle: {
    color: '#FFF',
    fontFamily: themeFont.indoPak,
    fontWeight: '400',
    lineHeight: 28.92,
    fontSize: 20,
    textAlign: 'center',
    columnGap: 10,
    marginTop: 10,
  },
  translateText: {
    fontWeight: '400',
    color: '#FFF',
    fontSize: 10,
    lineHeight: 14.3,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 5,
  },
engagementTimeText:{
  color: '#FFF',
  fontSize: 33,
  lineHeight: 39,
  fontFamily: themeFont.englishFont,
  textAlign: 'left',
  fontWeight: '700',
},
engagementTimeUnit:{
  color: '#FFF',
  fontFamily: themeFont.englishFont,
  fontSize: 10,
  fontWeight: '600',
  lineHeight: 11.46,
  top: -6,
  marginRight: 3,
}
});