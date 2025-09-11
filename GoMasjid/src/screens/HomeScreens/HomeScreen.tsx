import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  BackHandler,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { themeFont } from '../../styles/theme';
import HamburgerHeader from '../../common/HamburgerHeader';
import { useFocusEffect } from '@react-navigation/native';
import useSidebar from '../../hooks/useSidebar';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import { userDashboard } from '../../services/api';
import { UserContext } from '../../context/UserProvider';
import SidebarMenu from '../../components/sidebar/SidebarMenu';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MosquesIcon } from '../../components/icons';
// import { ScrollView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import PushNotifications from './PushNotifications';
import LinearGradient from 'react-native-linear-gradient';
import {formattedHijri} from '../../common/HijriDate';
import AlertModal from '../../common/AlertModal';
import { useSidebarVisibility } from '../../context/SidebarContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { EventRegister } from 'react-native-event-listeners';



import styles from '../../styles/home/homescreen'
import { NavigationMenu } from "./lasthird";
import { Heading } from "./Headings";
import { Graphic } from "./graphic";
import PrayerTimes from "./Prayertimes";

import { SheetManager } from 'react-native-actions-sheet';
import QiblaSheet from './qibla';
import { RefreshControl } from 'react-native';

import LocationSwitcher from './LocationSwitcher';
import AsyncStorage from '@react-native-async-storage/async-storage';



import { getLocalPrayerTimes } from '../../services/prayercalculation';

const { width, height } = Dimensions.get('window');


const HomeScreen = ({ navigation, route }: any) => {

  const [adhanTimes, setAdhanTimes] = useState<any>(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [bgImage, setBgImage] = useState<any>(null);
  const [salahData, setSalahData] = useState<any>([]);
  const [currentSalah, setCurrentSalah] = useState<string>('');
  const [nextSalah, setNextSalah] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('');
  const [bgColors, setBgColors] = useState<any>(['#FFF', '#FFF']);
  const [salahBgColor, setSalahBgColor] = useState<string>('');
  const {userInfo} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [azanSwitch, setAzanSwitch] = useState<any>({});
  const [city, setCity] = useState<string>('United Kingdom');
  const [loginModal, setLoginModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [locations, setLocations] = useState<string[]>(['Location']);
  const [selectedLocation, setSelectedLocation] = useState<string>('Location');
  const [customPrayerTimes, setCustomPrayerTimes] = useState<any>({});

  useEffect(() => {
    if(salahData) {
      findNextSalah();
      const interval = setInterval(findNextSalah, 1000);
      return () => clearInterval(interval);
    }
  }, [salahData]);

  useEffect(() => {
    const init = async () => {
      await loadCustomLocations();
  
      if (route?.params?.selectedLocation) {
        setSelectedLocation(route.params.selectedLocation);
      }
    };
    init();
  }, [route?.params?.selectedLocation]);

  useEffect(() => {
    const listener = EventRegister.addEventListener('refreshCustomLocations', async () => {
      await loadCustomLocations();
    });
  
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);
  
  
  

  useEffect(() => {
    if(userInfo.userName === 'Guest') {
      setLoginModal(true);
    }
  }, [userInfo.userName]);

  const loadCustomLocations = async () => {
    const saved = await AsyncStorage.getItem('CustomLocations');
    if (saved) {
      const parsed = JSON.parse(saved);
      const names = Object.keys(parsed);
      setLocations(['Location', ...names]);
      setCustomPrayerTimes(parsed);
    }
  };

  const handleKaabaPress = () => {
    console.log("Opening Qibla via useSheet hook");
    // qiblaSheet?.present();
  };
  
  
  const findNextSalah = () => {
    const now = moment();
    const salahTiming = salahData.salah_timing || [];
  
    if (!adhanTimes || !Array.isArray(salahTiming) || salahTiming.length === 0) return;
  
    const fajr = moment(salahTiming.find(s => s.name === "fajr")?.azan, "HH:mm");
    const zuhr = moment(salahTiming.find(s => s.name === "zuhr")?.azan, "HH:mm");
    const midnight = moment(adhanTimes.midnight, "HH:mm");
    const lastThird = moment(adhanTimes.lastThird, "HH:mm");
    const sunrise = moment(adhanTimes.sunrise, "HH:mm");
  
    // 🌙 Highlight special phases
    if (now.isSameOrAfter(midnight) && now.isBefore(lastThird)) {
      setCurrentSalah("midnight");
      setNextSalah("last third");
      setTimeLeft(formatTimeDiff(lastThird, now));
      return;
    }
  
    if (now.isSameOrAfter(lastThird) && now.isBefore(fajr)) {
      setCurrentSalah("last third");
      setNextSalah("fajr");
      setTimeLeft(formatTimeDiff(fajr, now));
      return;
    }
  
    if (now.isSameOrAfter(sunrise) && now.isBefore(zuhr)) {
      setCurrentSalah("sunrise");
      setNextSalah("zuhr");
      setTimeLeft(formatTimeDiff(zuhr, now));
      return;
    }
  
    // 🕌 Normal Salah loop
    for (let i = 0; i < salahTiming.length; i++) {
      const salah = salahTiming[i];
      const salahTime = moment(salah.azan, 'HH:mm');
  
      if (salahTime.isAfter(now)) {
        const previousSalah = i === 0 ? salahTiming[salahTiming.length - 1] : salahTiming[i - 1];
        setCurrentSalah(previousSalah.name);
        setNextSalah(salah.name);
        setTimeLeft(formatTimeDiff(salahTime, now));
        return;
      }
    }
  
    // ⏰ After Isha: wrap to next day
    const first = salahTiming[0];
    const last = salahTiming[salahTiming.length - 1];
    const tomorrowAzan = moment(first.azan, 'HH:mm').add(1, 'day');
  
    setCurrentSalah(last.name);
    setNextSalah(first.name);
    setTimeLeft(formatTimeDiff(tomorrowAzan, now));
  };
  
  const formatTimeDiff = (target: moment.Moment, now: moment.Moment) => {
    const diff = moment.duration(target.diff(now));
    return `${String(diff.hours()).padStart(2, '0')}h:${String(diff.minutes()).padStart(2, '0')}m:${String(diff.seconds()).padStart(2, '0')}s`;
  };
  

  useFocusEffect(
    React.useCallback(() => {
      requestLocationPermission();
    }, [userInfo.userToken])
  );

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted === 'granted') {
          getLocation();
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'GoMasjid needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        }
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
    
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
        
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getCityFromCoords(latitude, longitude);
        handleFetchData(latitude, longitude);
  
        // 🌙 Calculate adhan-js times
        const times = getLocalPrayerTimes(latitude, longitude);
        setAdhanTimes(times);
      },
      error => {
        console.warn("Location error", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  

  const handleFetchData = async (latitude: number, longitude: number) => {
    const data = await userDashboard(latitude, longitude, userInfo?.userToken);
    setSalahData(data || []);
    setLoading(false);
  };

  const getCityFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.hamlet ||
        'Unknown';

      setCity(city);
    } catch (error) {
      console.warn('Error getting city:', error);
    }
  };

  const handleDeleteLocation = async (locationToDelete: string) => {
    const saved = await AsyncStorage.getItem('CustomLocations');
    if (!saved) return;
  
    const parsed = JSON.parse(saved);
    delete parsed[locationToDelete];
    await AsyncStorage.setItem('CustomLocations', JSON.stringify(parsed));
  
    // Update state
    const updatedNames = Object.keys(parsed);
    setLocations(['Location', ...updatedNames]);
    setCustomPrayerTimes(parsed);
  
    // If currently selected one was deleted, revert to 'Location'
    if (selectedLocation === locationToDelete) {
      setSelectedLocation('Location');
    }
  };
  


  // // Use the sidebar hook
  const { isSidebarVisible, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
  const { setVisible } = useSidebarVisibility();

  // Handle back button press to close sidebar if open
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isSidebarVisible) {
          closeSidebar();
          return true;
        }
        return false;
      };

      // BackHandler.addEventListener('hardwareBackPress', onBackPress);
      const backHandlerSubscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () =>
        // BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      backHandlerSubscription.remove();
    }, [isSidebarVisible, closeSidebar])
  );

  useEffect(() => {
    setVisible(isSidebarVisible);
  }, [isSidebarVisible]);

  const handleSwitchesChange = useCallback((data: any) => {
    setAzanSwitch(data);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getCityFromCoords(latitude, longitude);
        handleFetchData(latitude, longitude);
        const times = getLocalPrayerTimes(latitude, longitude);
        setAdhanTimes(times);
        setRefreshing(false);
      },
      error => {
        console.warn("Location error", error);
        setRefreshing(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);
  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#282828"
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >

            {/* Header */}
            <View style={styles.header}>
              <Heading
                currentSalah={currentSalah}
                timeLeft={timeLeft}
                nextSalah={nextSalah}
                onKaabaPress={handleKaabaPress}
              />
            </View>

            <Graphic />
  
            {/* Location Switcher */}
            <View style={{ alignItems: 'center' }}>
              <LocationSwitcher
                locations={locations}
                selected={selectedLocation}
                onSelect={setSelectedLocation}
                onDelete={handleDeleteLocation}
              />
            </View>



  
            {/* Date Row */}
            <View style={styles.dateRow}>
              <Text style={styles.dateText}>
                {moment().format("D MMM")}, {formattedHijri}
              </Text>
            </View>
  
            {/* Prayer Times */}
            <PrayerTimes
              viewType={selectedLocation === 'Location' ? 'location' : 'mosque'}
              currentSalah={currentSalah}
              salahTiming={
                selectedLocation === 'Location'
                  ? salahData.salah_timing
                  : customPrayerTimes[selectedLocation]?.salah_timing || []
              }
              setModalVisible={setModalVisible}
              adhanTimes={adhanTimes}
            />


            <NavigationMenu
              currentTime={moment()}
              sunriseTime={moment(adhanTimes.sunrise, "HH:mm")}
              midnightTime={moment(adhanTimes.midnight, "HH:mm")}
              lastThirdTime={moment(adhanTimes.lastThird, "HH:mm")}
              dhuhrTime={moment(
                salahData?.salah_timing?.find(s => s.name === "zuhr")?.azan || "12:00",
                "HH:mm"
              )}
            />


          </ScrollView>
        </View>
      )}
  
      {/* Push Notifications Modal */}
      <PushNotifications
        modalVisible={modalVisible}
        PrayerTimingsData={salahData.salah_timing}
        setModalVisible={setModalVisible}
        onSwitchesChange={handleSwitchesChange}
      />
  
      {/* Login Modal */}
      {loginModal && (
        <AlertModal
          modalVisible={loginModal}
          modalClose={() => setLoginModal(false)}
          modalText="Login to access all features of GoMasjid"
          buttonText1="Login"
          buttonText2="Not Now"
          actionHandle={() => {
            navigation.navigate("AuthStack", { screen: "Login" });
            setLoginModal(false);
          }}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
