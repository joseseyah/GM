// MosqueCarousel.js
import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Linking,
  ScrollView,
  Modal,
  Platform,
  ToastAndroid,
  Clipboard,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FastImage from '@d11/react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { CommonActions } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';



// Layout and screen structure
import { screenLayoutStyles } from '../../styles/masjids/screenlayout';
import { SheetManager } from 'react-native-actions-sheet';


// Sections (top to bottom)
import { headerStyles } from '../../styles/masjids/header';
import { masjidDetailsStyles } from '../../styles/masjids/details';
import { prayerTimesStyles } from '../../styles/masjids/prayertimes';
import { facilitiesStyles } from '../../styles/masjids/facilities';
import { buttonStyles } from '../../styles/masjids/buttons';

import Prayertimes from "../HomeScreens/Prayertimes";
import Facilities from './Facilities'; // adjust the path accordingly

import Entypo from 'react-native-vector-icons/Entypo';
import {themeFont} from '../../styles/theme';
import MasjidInfoTabs from './MasjidInfoTabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from '../../common/Toast';
import {AddUserFavMasjid, fetchMasjidDetails, RemoveUserFavMasjid} from '../../services/api';
import { UserContext } from '../../context/UserProvider';
import { removeFavouriteMasjidsData, storeFavouriteMasjidsData } from '../../services/AsyncServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const {width, height} = Dimensions.get('window');

interface Masjid {
  id: number;
  name: string;
  about: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: string;
  verified: boolean;
  masjidLogo: string;
  is_primary: boolean;
  masjidImages: string[];
  masjidCoverImage: string;
  contact_numbers: string[];
  website: string;
  facilities: string[];
  claimed_by?: number | null;
  prayerTimes: Array<{
    name: string;
    start: string;
    jamaat: string;
  }>;
  opening_hours: {
    openingTime: string;
    closingTime: string;
  };
  DonationInfo: [{
    bank_name: string;
    SortCode: string;
    AccountNumber: string;
  }];
  masjidInfo: {
    masjidfacilities: string[];
    PrayerTimes: {};
    events: {}[];
  };
  masjidImamInfo: {
    imam_id: number;
    name: string;
    image: string;
  };
}
const MasjidDetailsScreen = ({navigation, route}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [masjid, setmasjid] = useState<Masjid>();
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [masjidId, setMasjidId] = useState<number>();
  const [unclaimPopup, setUnclaimPopup] = useState(false);
  const {userInfo, isAuthenticated, updateUserInfo} = useContext(UserContext);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

    
  const handleFetchMasjidDetails = async (masjidId: any) => {
    try {
      setLoading(true);
      console.log('Fetching masjid:', masjidId);
  
      const data = await fetchMasjidDetails(masjidId);
      console.log('Masjid data:', data);
      setmasjid(data);

      const shortName = data.name.split(' ')[0];
      const saved = await AsyncStorage.getItem('CustomLocations');
  
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[shortName]) {
          setAlreadyAdded(true);
        } else {
          setAlreadyAdded(false);
        }
      } else {
        setAlreadyAdded(false);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error fetching masjid details:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleAddPrayerTimes = async () => {
    if (!masjid) return;
  
    const prev = await AsyncStorage.getItem('CustomLocations');
    const saved = prev ? JSON.parse(prev) : {};
  
    const name = masjid.name.split(' ')[0]; // e.g. "Oldham"
  
    const salahTiming = Object.entries(masjid.masjidInfo.PrayerTimes)
      .filter(([name]) => dailyPrayers.includes(name))
      .map(([name, { Adhan, Jamaah }]: any) => ({
        name: name.toLowerCase(),
        azan: Adhan,
        iqama: Jamaah,
      }));
  
    saved[name] = { salah_timing: salahTiming };
  
    await AsyncStorage.setItem('CustomLocations', JSON.stringify(saved));
    showToast('Prayer times added to Home');
    EventRegister.emit('refreshCustomLocations');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'HomeStack',
          state: {
            routes: [
              {
                name: 'MainTabs',
                state: {
                  routes: [
                    {
                      name: 'Home',
                      params: { selectedLocation: name },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    });  
  };

  useEffect(() => {
    setMasjidId(route?.params?.masjidId);
    handleFetchMasjidDetails(route?.params?.masjidId);

    const checkFavourite = async () => {
      try {
        const data = await AsyncStorage.getItem('Favourite_Masjid');
        if (data) {
          const asyncData = JSON.parse(data);
          if (Array.isArray(asyncData)) {
            const exists = asyncData.some(
              (Favourite_Masjid: any) => Favourite_Masjid.id === route?.params?.masjidId,
            );
            setIsFavourite(exists);
          }
        }
      } catch (error) {
      }
    };

    checkFavourite();
  }, []);

  // Notification alert
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      setToastMessage(message);
      setToastVisible(true);
    }
  };

  const makeFavourite = async () => {
    const newIsFavourite = !isFavourite;
    setIsFavourite(newIsFavourite);

    try {
      const favMasjid = {
        address: masjid?.address,
        contact: masjid?.contact_numbers[0] || '',
        distance: masjid?.distance || '',
        id: masjidId,
        latitude: masjid?.latitude,
        longitude: masjid?.longitude,
        masjidImageUrl: masjid?.masjidLogo || '',
        masjid_imam_id: masjid?.masjidImamInfo?.imam_id || 0,
        name: masjid?.name,
        verified: masjid?.verified || false,
        is_primary: userInfo?.followedMasjid_id && (route?.params?.masjidId.toString() === userInfo?.followedMasjid_id.toString()) ? true : false,
      };
      console.log('here', favMasjid);
      console.log('isPrimary', isAuthenticated);
      if (newIsFavourite) {
        await storeFavouriteMasjidsData(favMasjid);
        if (isAuthenticated) {
          if (masjidId !== undefined) {
            const userToken = userInfo?.userToken;
            const addUserMasjid = await AddUserFavMasjid(masjidId, userToken);
            if (addUserMasjid) {
              console.log('Favourite_Masjid_user_loggedin');
            }
          }
        }
      } else {
        await removeFavouriteMasjidsData(favMasjid);
        if (isAuthenticated) {
          if (masjidId !== undefined) {
            const userToken = userInfo?.userToken;
            const addUserMasjid = await RemoveUserFavMasjid(masjidId, userToken);
            if (addUserMasjid) {
              console.log('Favourite_Masjid_user_loggedin');
            }
          }
        }
      }
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
  };

  const getHijriDateString = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const dailyPrayers = ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"];

  const callPhoneNumber = () => {
    const phone = masjid?.contact_numbers?.[0];
    if (!phone) return;
  
    const phoneUrl = `tel:${phone}`;
    Linking.openURL(phoneUrl).catch(err =>
      console.error('Failed to open phone dialer:', err)
    );
  };
  

  const openInMaps = () => {
    if (!masjid?.address) return;
  
    const query = encodeURIComponent(masjid.address);
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${query}`,
      android: `geo:0,0?q=${query}`,
    });
  
    if (url) {
      Linking.openURL(url).catch(err => console.error('Failed to open maps:', err));
    }
  };
  

  return (
    <GestureHandlerRootView style={screenLayoutStyles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={screenLayoutStyles.scrollContainer}>
        
        {/* Header */}
        <View style={headerStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>



        <TouchableOpacity onPress={() => {
          if (masjid) {
            SheetManager.show('more_sheet', {
              payload: { masjid },
            });
          }
        }}>
          <Feather name="more-vertical" size={22} color="#000" />
        </TouchableOpacity>

      </View>

  
        {/* Masjid Info */}
        <View style={masjidDetailsStyles.masjidDetails}>
          {masjid?.masjidLogo && (
            <Image
              source={{ uri: masjid.masjidLogo }}
              style={masjidDetailsStyles.masjidLogo}
            />
          )}

          <Text style={masjidDetailsStyles.masjidName}>{masjid?.name}</Text>
          <TouchableOpacity onPress={openInMaps}>
            <Text style={[masjidDetailsStyles.masjidAddress, { color: '#2563EB', textDecorationLine: 'underline' }]}>
              {masjid?.address}
            </Text>
          </TouchableOpacity>


          {masjid?.contact_numbers?.[0] && (
            <TouchableOpacity onPress={callPhoneNumber}>
              <Text style={[masjidDetailsStyles.contactText, { color: '#2563EB', textDecorationLine: 'underline' }]}>
                {masjid.contact_numbers[0]}
              </Text>
            </TouchableOpacity>
          )}


          {masjid?.website && (
            <TouchableOpacity onPress={() => Linking.openURL(masjid.website)}>
              <Text style={masjidDetailsStyles.websiteLink}>
                {masjid.website}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Date & Prayer Times */}
        <View style={prayerTimesStyles.dateWrapper}>
          <Text style={prayerTimesStyles.dateText}>{getHijriDateString()}</Text>
        </View>

        {masjid?.masjidInfo?.PrayerTimes && (
          <Prayertimes
            viewType="mosque"
            currentSalah=""
            salahTiming={Object.entries(masjid.masjidInfo.PrayerTimes)
              .filter(([name]) => dailyPrayers.includes(name))
              .map(([name, { Adhan, Jamaah }]: any) => ({
                name,
                azan: Adhan,
                iqama: Jamaah,
              }))
            }
            setModalVisible={setModalVisible}
          />
        )}

  
        {Array.isArray(masjid?.masjidInfo?.masjidfacilities) && masjid.masjidInfo.masjidfacilities.length > 0 && (
          <View style={facilitiesStyles.container}>
            <Text style={facilitiesStyles.sectionTitle}>Facilities</Text>
            <Facilities
              masjidInfo={masjid.masjidInfo}
              type={masjid?.claimed_by ? 'claimed' : 'unclaimed'}
            />
          </View>
        )}

        {/* Add Prayer Times Button */}
        {masjid?.masjidInfo?.PrayerTimes &&
          Object.keys(masjid.masjidInfo.PrayerTimes).length > 0 &&
          !alreadyAdded && (
            <View style={buttonStyles.buttonWrapper}>
              <TouchableOpacity style={buttonStyles.addButton} onPress={handleAddPrayerTimes}>
                <Text style={buttonStyles.addButtonText}>Add Prayer Times</Text>
              </TouchableOpacity>
            </View>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
  
};

export default MasjidDetailsScreen;