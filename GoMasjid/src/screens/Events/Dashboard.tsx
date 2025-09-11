import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { themeFont } from '../../styles/theme';
import { useFocusEffect } from '@react-navigation/native';
import { getMasjidEvents, getEvents } from '../../services/api';
import Header from '../../common/Header';
import Geolocation from 'react-native-geolocation-service';
import { useSidebarVisibility } from '../../context/SidebarContext';

const {height, width} = Dimensions.get('window');

const Eventdashboard = ({props, route, navigation}: any) => {
  const [eventsData, setEventsData] = useState<any>([]);
  const [registeredEvents, setRegisterEvents] = useState<any>([]);
  const {userInfo} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const { setVisible } = useSidebarVisibility();

  useFocusEffect(
    React.useCallback(() => {
      requestLocationPermission();
    }, [])
  );

  useEffect(() => {
    requestLocationPermission();
    setVisible(false);
  }, []);

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
        handleFetchEvents(latitude, longitude);
      },
      error => {
        // console.log(error.code, error.message);
        // setError('Failed to get location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleFetchEvents = async (latitude: number, longitude: number) => {
    console.log('Latitudeee:', latitude);
    console.log('Longitude:', longitude);
    console.log('User Info:', userInfo?.userToken);
    const events_data = await getEvents(latitude, longitude, userInfo?.userToken);
    console.log('Events Data:', events_data);
    setEventsData(events_data?.events || []);
    setRegisterEvents(events_data?.registered_events || []);
    setLoading(false);
  }

  const renderItem = ({item: EventData, index}: any) => (
    <View
      style={{
        width: '48%',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        flexGrow: 1,
        flex: 1,
      }}>
      <View
        style={{
          borderRadius: 22,
          backgroundColor: 'white',
          paddingVertical: 5,
          marginBottom: 10,
          minHeight: height / 6,
        }}>
        <View style={styles.container1}>
          <View>
            <Text style={styles.MehfilText}>{EventData.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
              gap: 3,
            }}>
            <MaterialCommunityIcons name="calendar" size={21} color="#3DC8B2" />
            <Text style={styles.DateIdtext}>
              {EventData?.date &&
                moment(EventData?.date).format('Do MMM, YYYY')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <MaterialIcons name="location-pin" size={21} color="#3DC8B2" />
            <Text style={styles.masjidtext}>{EventData.location}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Viewbuttontext}
              onPress={() =>
                navigation.navigate('EventsStack', { screen: 'EventInfo', params: { eventId: EventData.id, isRegister: false } })
              }>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.buttonText}>Register Now</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={25}
                  color="#474747"
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Header title="My Events" onBack={() => navigation.goBack()} titleColor='#000'/>
        <View style={{ flex: 0.8 }}>
          <Text
            style={{
              fontFamily: themeFont.englishFont,
              fontWeight: Platform.OS === 'ios' ? '600' : '700',
              fontSize: 13.5,
              lineHeight: 18.28,
              letterSpacing: 0.09,
              paddingLeft: 25,
              marginVertical: 0,
              color: '#000'
            }}>
            You’re going to...
          </Text>
          {registeredEvents.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingBottom: 20}}>
              {registeredEvents.map((EventData: any, index: number) => (
                <View style={{marginLeft: 10}} key={index}>
                  <View
                    style={{
                      borderRadius: 22,
                      backgroundColor: 'white',
                      paddingVertical: 5,
                      marginTop: 10,
                      paddingHorizontal: 5,
                      width: width / 1.5,
                    }}>
                    <View style={styles.container}>
                      <Image
                        style={{
                          height: height / 8,
                          width: '100%',
                          borderRadius: 11,
                          alignSelf: 'center',
                          resizeMode: 'cover',
                        }}
                        source={{
                          uri: EventData?.picture,
                        }}
                      />
                      <View style={{marginVertical: 5}}>
                        <Text style={styles.MehfilText}>{EventData.title}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          marginBottom: 5,
                        }}>
                        <MaterialCommunityIcons
                          name="calendar"
                          size={21}
                          color="#3DC8B2"
                        />
                        <Text style={styles.DateIdtext}>
                          {EventData?.date &&
                            moment(EventData?.date).format(
                              'Do MMM, YYYY',
                            )}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                        }}>
                        <MaterialIcons
                          name="location-pin"
                          size={21}
                          color="#3DC8B2"
                        />
                        <Text style={styles.masjidplacetext}>
                          {EventData.location}
                        </Text>
                      </View>

                      <View>
                        <TouchableOpacity
                          style={styles.Viewbuttontext}
                          onPress={() =>
                            navigation.navigate('EventsStack', { screen: 'EventInfo', params: { eventId: EventData.id, isRegister: true } })
                          }>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={styles.buttonText}>See details</Text>
                            <MaterialCommunityIcons
                              name="arrow-right"
                              size={25}
                              color="#474747"
                              style={{alignSelf: 'center'}}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: 25,
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#202020',
                  fontSize: 12,
                  marginVertical: 10,
                  flexWrap: 'wrap',
                  textAlign: 'center',
                }}>
                You have not registered for any event yet
              </Text>
            </View>
          )}
        </View>
        
      {loading ? (
        <ActivityIndicator size="large" color="#283025" />
      ) : (
        <View
          style={{
            justifyContent: 'center', flex: 1
          }}>
          <Text
            style={{
              fontFamily: themeFont.englishFont,
              fontWeight: Platform.OS === 'ios' ? '600' : '700',
              fontSize: 13.5,
              lineHeight: 18.28,
              letterSpacing: 0.09,
              paddingLeft: 25,
              textAlign: 'left',
              color: '#000',
              paddingBottom: 10
            }}>
            All Events
          </Text>
          {eventsData.length > 0 ? (
            <FlatList
              data={eventsData}
              renderItem={renderItem}
              keyExtractor={(item, index) => `event-${index}`}
              numColumns={2} // This makes the grid 2x2
              contentContainerStyle={{
                // paddingVertical: 10,
                paddingHorizontal: 10,
                // justifyContent: 'center',
                flexGrow: 1,
              }}
              columnWrapperStyle={{justifyContent: 'center'}}
              ListFooterComponent={<View style={{ height: 80 }} />}
            />
          ) : userInfo?.followedMasjid_id ? (
             <Text style={styles.noevents}>No events.</Text>
          ) : (
            <Text style={styles.noevents}>
              Please follow a masjid to view all events.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    marginHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  container: {
    marginRight: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
  },
  container1: {
    marginRight: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  MehfilText: {
    color: '#282828',
    fontSize: 13,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontFamily: themeFont.englishFont,
    marginVertical: 10,
    lineHeight: 15.25,
  },
  masjidtext: {
    flex: 1,
    color: '#A7A7A7',
    fontSize: 11,
    fontWeight: '400',
    fontFamily: themeFont.englishFont,
    alignSelf: 'center',
    lineHeight: 10.56,
    overflow: 'hidden',
  },
  masjidplacetext: {
    color: '#A7A7A7',
    fontSize: 11,
    fontWeight: '400',
    fontFamily: themeFont.englishFont,
    alignSelf: 'center',
    lineHeight: 10.56,
    flex: 1
  },
  DateIdtext: {
    color: '#A7A7A7',
    fontSize: 11,
    fontWeight: '400',
    fontFamily: themeFont.englishFont,
    alignSelf: 'center',
    lineHeight: 10.56,
  },
  Viewbuttontext: {
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#474747',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: themeFont.englishFont,
    lineHeight: 15.25,
    textAlign: 'left',
    alignSelf: 'center',
  },
  noevents: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#C7C7C7',
  }
});

export default Eventdashboard;