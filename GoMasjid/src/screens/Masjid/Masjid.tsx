import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback, use, useRef} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {fetchMasjidDB, fetchMasjids} from '../../services/api';
import { MasjidCard } from './MasjidCard';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import SearchBar from '../../components/SearchBar';
import { SheetManager } from 'react-native-actions-sheet';


const GOOGLE_API_KEY = 'AIzaSyCiTTGycmjIVUlPmYVG30Bsf-Ntm4UrbcQ';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


interface Masjid {
  id: number;
  name: string;
  address: string;
  verified: boolean;
  latitude: number | null;
  longitude: number | null;
  is_primary: boolean | false;
  masjidImageUrl: string | undefined;
  masjidLogo?: string;
}


const Masjid = React.memo(({navigation, route, props}: any) => {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [searchMasjids, setSearchMasjids] = useState<Masjid[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchErrMsg, setSearchErrMsg] = useState<string | null>(null);
  const [searchMasjidData, setSearchMasjidData] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');

  
  const ref = useRef<any>('');
  const handleFetchMasjids = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      setErrorMessage(null);
  
      const data = await fetchMasjids({ latitude, longitude });
  
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setErrorMessage("No mosques found nearby");
      } else if (data && data.length > 0) {
        // Map logo field (adjust key as needed based on actual API response)
        const transformed = data.map((masjid: any) => ({
          ...masjid,
          masjidLogo: masjid.logo || masjid.masjidLogo || '', // fallback mapping
        }));
  
        console.log("masjids (transformed):", transformed);
        setMasjids(transformed);
      } else if (data && data.message) {
        setErrorMessage(data.message);
      }
    } catch (err) {
      setErrorMessage("Unable to fetch nearby mosques. Please try again later.");
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
        setLocation({latitude, longitude});
        handleFetchMasjids(latitude, longitude);
        reverseGeocode(latitude, longitude);
      },
      error => {
        // console.log(error.code, error.message);
        // setError('Failed to get location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;
  
        const cityComponent =
          addressComponents.find((component: any) =>
            component.types.includes('locality')
          ) ||
          addressComponents.find((component: any) =>
            component.types.includes('postal_town')
          ) ||
          addressComponents.find((component: any) =>
            component.types.includes('administrative_area_level_2')
          ) ||
          addressComponents.find((component: any) =>
            component.types.includes('sublocality')
          );
  
        const cityName = cityComponent?.long_name || 'Unknown Location';
        setCity(cityName);
      } else {
        console.warn('Geocoding error:', data.status);
        setCity('Unknown Location');
      }
    } catch (err) {
      console.error('Reverse geocoding failed:', err);
      setCity('Unknown Location');
    }
  };
  
  

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Filtered masjids based on search text
  const filteredMasjids = masjids?.filter(masjid => 
    masjid.name.toLowerCase().includes(searchText.toLowerCase())
  ) || [];
  

  const renderMasjid = ({item}: {item: Masjid}) => (   
  <MasjidCard
    item={item}
    navigation={navigation}
    fav_screen={false}
  />
  );

  const renderSearchBar = () => (
    <View style={{ flex: 1, width: '85%', justifyContent: 'center', top: -40, left: 30 }}>
      <GooglePlacesAutocomplete
        placeholder="Search mosque or masjid"
        minLength={2}
        fetchDetails={true}
        debounce={300}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps="always" 
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          types: 'mosque',
          keyword: 'mosque',
        }}
        predefinedPlaces={[]}
        textInputProps={{
          onFocus: () => {}, 
          placeholderTextColor: '#999',
        }}
        onFail={(err) => { console.log('Places API Error:', err);}}
        onNotFound={() => {console.warn('No places found'); setSearchErrMsg('No Masjid found');}}
        onPress={async (data, details = null) => {
          if (details?.geometry?.location) {
            const data = {
              name: details.name,
              address: details.formatted_address || '',
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng, 
              url: details.url || '',
            }

            const masjid = await fetchMasjidDB(data);
            console.log('Fetched Masjid:', masjid);
            if(masjid) {
              setSearchMasjids(masjid);
              setSearchMasjidData(true);
              setSearchVisible(false);
              setSearchErrMsg(null);
              setErrorMessage(null);
            } else {
              setSearchVisible(false);
              setSearchMasjidData(false);
              setSearchErrMsg(details.name+' not registered with GoMasjid.');
              setErrorMessage(null);
            }
          
          } else {
            setSearchVisible(false);
            setSearchMasjidData(false);
            setSearchErrMsg('No details received for the selected place.');
          }
        }}
        styles={{
          textInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 30,
            paddingHorizontal: 12,
            marginTop: 8,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 2, 
            borderWidth: 2,
            borderColor: '#1D3F84',
          },
          textInput: {
            flex: 1,
            height: 44,
            color: '#000',
            fontSize: 15,
            paddingHorizontal: 8,
          },
          description: {
            color: '#000',
            fontSize: 14,
          },
          listView: {
            maxHeight: 500,
            backgroundColor: '#fff',
            borderRadius: 12,
            marginTop: 6,
            borderWidth: 1,
            borderColor: '#EAEAEA',
            elevation: 2,
          },
          row: {
            paddingVertical: 12,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0',
          },
        }}
        
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Mosques</Text>
        <TouchableOpacity
          onPress={() => SheetManager.show('search_sheet')}
          style={styles.headerIconButton}
        >
          <FontAwesome5 name="search" size={18} color="#223F7A" />
        </TouchableOpacity>

      </View>
      {/* Location Row */}

      <View style={styles.locationRow}>
        <FontAwesome5 name="map-marker-alt" size={14} color="#202020" style={styles.locationIcon} />
        <Text style={styles.locationText}>{city || 'Loading...'}</Text>
      </View>

      {/* Search */}
      {/* {searchVisible && renderSearchBar()} */}

      
  
      {/* Content */}
      {errorMessage ? (
        <Text style={styles.loadingText}>{errorMessage}</Text>
      ) : loading ? (
        <Text style={styles.loadingText}>Loading masjids...</Text>
      ) : (
        <>
          {searchErrMsg && (
            <Text style={styles.loadingText}>{searchErrMsg}</Text>
          )}
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 10,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
            data={searchMasjidData ? searchMasjids : masjids}
            renderItem={renderMasjid}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No masjids found nearby</Text>
            }
          />
        </>
      )}
  
      {/* Clear search on background tap */}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setSearchVisible(false);
          setSearchMasjidData(false);
        }}
      />
    </View>
  );
});

export default Masjid;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 28,
    marginBottom: 16,
  },
  
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'System',
  },
  
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8EDF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },

  screenTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },

  searchIconContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#F4F4F4',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#000',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  
  

  locationIcon: {
    marginRight: 6,
  },

  locationText: {
    fontSize: 14,
    color: '#202020',
    fontWeight: '500',
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
  },

  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
});
