import { BackHandler, FlatList, Image, PermissionsAndroid, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import SidebarMenu from '../../components/sidebar/SidebarMenu'
import { useFocusEffect } from '@react-navigation/native';
import useSidebar from '../../hooks/useSidebar';
import HamburgerHeader from '../../common/HamburgerHeader';
import { themeFont } from '../../styles/theme';
import Geolocation from 'react-native-geolocation-service';
import {RestaurantCard} from './RestaurantCard';
import { fetchRestaurants } from '../../services/api';
import { useSidebarVisibility } from '../../context/SidebarContext';

interface Restaurant {
  // default: any;// change this to user following masjid value after auth completed
  masjidImageUrl: string | undefined;
  id: number;
  name: string;
  address: string;
  verified: boolean;
  latitude: number | null;
  longitude: number | null;
  is_primary: boolean | false;
}

const Resturants = ({route, navigation}: any) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  // Use the sidebar hook
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

      const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        backHandlerSubscription.remove();
    }, [isSidebarVisible, closeSidebar])
  );

  useEffect(() => {
    setVisible(isSidebarVisible);
  }, [isSidebarVisible]);

  const handleFetchRestaurants = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      console.log("latitude", latitude)
      console.log("longitude", longitude)
      const data = await fetchRestaurants(latitude, longitude);
      console.log(data.restaurants);
      if (!data.restaurants || (Array.isArray(data.restaurants) && data.restaurants.length === 0)) {
        setErrorMessage(data.message);
      } else {
        if (data.restaurants && data.restaurants.length > 0 ) {
          console.log("restaurants", data.restaurants);
          setRestaurants(data.restaurants);
          
        } else if (data && data.message){
          setErrorMessage(data.message);
        }
      }
    } catch (err) {
      setErrorMessage("Unable to fetch nearby restaurants. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        handleFetchRestaurants(latitude, longitude);
      },
      error => {
        // console.log(error.code, error.message);
        // setError('Failed to get location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Filtered restaurants based on search text
  const filteredRestaurants = restaurants?.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchText.toLowerCase())
  ) || [];
  
  const renderRestaurant = ({item}: {item: Restaurant}) => (   
    <RestaurantCard
      item={item}
      navigation={navigation}
      fav_screen={false}
    />
  );

  const renderSearchBar = () => (
    <View
      style={{
        borderRadius: 25,
        paddingVertical: 11,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        height: 30,
        width: '95%',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <TouchableOpacity onPress={() => 
          setSearchVisible(false)
          }>
          <Image
            source={require('../../assets/images/quran/megnifine.png')}
            style={{width: 15, height: 15}}
          />
        </TouchableOpacity>
        <TextInput
          style={{flex: 1, height: 40, marginLeft: 10, color: '#000'}}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );

  return (
    <>
    <SidebarMenu isVisible={isSidebarVisible} onClose={closeSidebar} />
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{flex: 1, flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={toggleSidebar}>
            <Image
              source={require('../../assets/images/hamburgerMenuDark.png')}
              style={{width: 24, height: 24}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {!searchVisible ? (
            <Text
              style={{
                fontSize: 15,
                color: '#282828',
                fontWeight: '600',
                lineHeight: 17,
                fontFamily: themeFont.englishFont,
              }}>
              Halal Restaurants
            </Text>
          ): <></>}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
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
        </View>
      </View>

      {errorMessage ? (
        <Text style={styles.loadingText}>{errorMessage}</Text>
      ) : loading ? (
        <Text style={styles.loadingText}>Loading restaurants...</Text>
      ) : (
        <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10}}
          data={searchText !== '' ? filteredRestaurants : restaurants}
          renderItem={renderRestaurant}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No restaurants found nearby</Text>
          }
        />
      )}
    </View>
    </>
  )
}

export default Resturants

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  topContainer: {
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    justifyContent: 'space-between',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    // marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
})