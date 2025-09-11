import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeFont} from '../../styles/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {
  handleDirection,
  handleMobilePress,
  isPlaceOpen,
  shareMessage,
} from '../../common/utils';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MasjidInfoTabs from './MasjidInfoTabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {height, width} = Dimensions.get('window');

interface Masjid {
  distance: string;
  is_primary: boolean;
  masjidImageUrl: string;
  id: number;
  name: string;
  address: string;
  verified: boolean;
  latitude: number | null;
  longitude: number | null;
  masjidCoverImage: string | null;
  contact_numbers: string[];
  website: string;
  opening_hours: {
    openingTime: string;
    closingTime: string;
  };
  masjidInfo: {
    events: any;
    masjidfacilities: {
      FemalePrayingArea: boolean;
      Parking: boolean;
      DisabledAccess: boolean;
      EducationalCentre: boolean;
      AblutionArea: boolean;
      CommunityHall: boolean;
      Library: boolean;
      FuneralServices: boolean;
      CounselingServices: boolean;
      ChildrenPlayArea: boolean;
      Cafeteria: boolean;
    };
  };
}

const MasjidDetails = ({navigation, route, props}: any) => {
  const [loading, setLoading] = useState(false);
  const [masjid, setmasjid] = useState<Masjid[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const handleFetchMasjidDetails = async (user_id: number) => {
    try {
      setLoading(true);
      // const data = await fetchUsermasjid({ user_id });
      const data = [
        {
          id: 4,
          name: 'East London Mosque',
          address: '82-92 Whitechapel Road, London E1 1JQ, United Kingdom',
          latitude: 51.515356,
          longitude: -0.065335,
          distance: '4.41 km',
          verified: true,
          masjidImageUrl:
            '',
          is_primary: false,
          masjidCoverImage:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          contact_numbers: ['020 7650 3000', '+44 141 429 3132'],
          website: 'https://gomasid.co.uk/',
          opening_hours: {
            openingTime: '06:00 AM',
            closingTime: '10:00 PM',
          },
          masjidInfo: {
            masjidfacilities: [
              'FemalePrayingArea',
              'PrayerHall',
              'AblutionArea',
              'Toilets',
              'MinbarMihrab',
              'AdhanSystem',
              'Library',
              'EducationalCentre',
              'Madrasa',
              'NikahServices',
              'FuneralServices',
              'CommunityHall',
              'ZakatCollection',
              'FoodBank',
              'CounselingService',
              'ChildrenPlayArea',
              'Parking',
              'Cafeteria',
              'LiveStreaming',
              'DisabledAccess',
            ],
            // masjidfacilities: [
            //   "FemalePrayingArea",
            //   "Parking",
            //   "DisabledAccess",
            //   "EducationalCentre",
            //   "AblutionArea",
            //   "CommunityHall",
            //   "Library",
            //   "FuneralServices",
            //   "CounselingServices",
            //   "ChildrenPlayArea",
            //   "Cafeteria"],
            PrayerTimes: {
              Fajr: {
                Adhan: '5:30 AM',
                Jamaah: '5:45 AM',
              },
              Sunrise: '7:12 AM',
              Dhuhr: {
                Adhan: '12:05 PM',
                Jamaah: '12:30 PM',
              },
              Asr: {
                Adhan: '2:36 PM',
                Jamaah: '3:00 PM',
              },
              Maghrib: {
                Adhan: '4:58 PM',
                Jamaah: '5:10 PM',
              },
              Isha: {
                Adhan: '6:24 PM',
                Jamaah: '6:45 PM',
              },
              Jumuah: {
                Adhan: '',
                Jamaah1: '',
                Jamaah2: '',
              },
            },
            events: [
              {
                id: 1,
                title: 'Event 1',
                date: '2024-03-25',
                image_url:
                  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                description: 'This is a test event',
                location: 'East London Mosque',
                time: '10:00 AM',
                registration: true,
                registration_link: 'https://www.eastlondonmosque.org.uk/',
              },
              {
                id: 2,
                title: 'Event 2',
                date: '2024-02-26',
                image_url:
                  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                description: 'This is a test event2',
                location: 'East London Mosque',
                time: '10:00 AM',
                registration: false,
                registration_link: 'https://www.eastlondonmosque.org.uk/',
              },
            ],
          },
        },
      ];
      setmasjid(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMasjidDetails(1);
    // console.log("masjid", masjid)
  }, []);

  return (
    <View style={styles.container}>
      {/* {error ? (
            <Text style={styles.errorText}>{error}</Text>
        ) : loading ? (
            <Text style={styles.loadingText}>Loading masjid...</Text>
        ) : ( */}
      {/* // userInfo?.userName === 'Guest' ? ( */}

      <ImageBackground
        style={[styles.imageStyle, {}]}
        source={require('../../assets/images/quran/QuranDashboardBackground.png')}
        // source={masjidBackgroundImage ?? defaultMasjidBackgroundImage}
        resizeMode="cover">
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="chevron-left" size={30} color="#F4F4F4" />
            <Text style={styles.titleText}>Info</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.content}>
            <View style={styles.transparentContainer}>
              <View style={styles.transparentContainerIconHeader}>
                {masjid[0]?.masjidImageUrl ? (
                  <Image
                    source={{uri: masjid[0]?.masjidImageUrl}}
                    style={{
                      width: 124,
                      height: 124,
                      borderRadius: 13,
                      resizeMode: 'cover',
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 123.61,
                      height: 123.61,
                      borderRadius: 12.56,
                      backgroundColor: '#3DC8B2',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 41.98,
                        fontWeight: '500',
                        color: '#FFF',
                        alignItems: 'center',
                      }}>
                      {masjid[0]?.name.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.masjidNameContainer}>
                <View style={styles.masjidInnerContianer}>
                  <Text style={[styles.masjidNameText, {textAlign: 'center'}]}>
                    {masjid[0]?.name}&nbsp;
                    {masjid[0]?.verified && (
                      <Image
                        source={require('../../assets/images/Verified.png')}
                        style={{
                          width: 13.33,
                          height: 16,
                          alignSelf: 'center',
                        }}
                      />
                    )}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.infoText,
                      {color: '#727272', paddingTop: 5, alignSelf: 'center'},
                    ]}>
                    {masjid[0]?.distance} away
                  </Text>
                </View>
              </View>

              <FlatList
                contentContainerStyle={{
                  // flexGrow: 1,
                  paddingBottom: 50,
                }}
                ListHeaderComponent={
                  <View
                    style={{
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      // paddingHorizontal: 10,
                    }}>
                    {/* <TouchableOpacity
                      style={styles.heartIcon}
                      // onPress={() => makeFavourite()}
                      onPress={handlefollow}>
                      <Entypo
                        name={isFavourite ? 'heart' : 'heart-outlined'}
                        size={20}
                        color={isFavourite ? '#3DC8B2' : '#FFFFFF'}
                      />
                    </TouchableOpacity> */}

                    <View>
                      <View style={styles.masjidContactDetails}>
                        {masjid[0]?.contact_numbers &&
                          masjid[0].contact_numbers.map((number, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.infoContainer}
                              onPress={() => handleMobilePress(number)}>
                              <Feather name="phone" color="#3DC8B2" size={15} />
                              <Text style={styles.infoText}>{number}</Text>
                            </TouchableOpacity>
                          ))}
                        {masjid[0]?.website !== null &&
                          masjid[0]?.website !== '' && (
                            <TouchableOpacity
                              onPress={() =>
                                Linking.openURL(masjid[0]?.website)
                              }
                              style={styles.infoContainer}>
                              <Feather name="globe" color="#3DC8B2" size={15} />
                              <Text style={styles.infoText}>
                                {masjid[0]?.website}
                              </Text>
                            </TouchableOpacity>
                          )}
                        <View style={styles.infoContainer}>
                          <Feather name="clock" color="#3DC8B2" size={15} />
                          <Text style={{color: '#3DC8B2'}}>
                            {isPlaceOpen(
                              masjid[0]?.opening_hours?.openingTime || '',
                              masjid[0]?.opening_hours?.closingTime || '',
                            )
                              ? 'Open Now'
                              : 'Closed Now'}
                          </Text>
                          <Text style={styles.infoText}>
                            {masjid[0]?.opening_hours?.openingTime} -{' '}
                            {masjid[0]?.opening_hours?.closingTime}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            handleDirection(
                              masjid[0].latitude,
                              masjid[0].longitude,
                            )
                          }
                          style={styles.infoContainer}>
                          <Feather name="map" color="#3DC8B2" size={15} />
                          <Text style={styles.infoText}>Check Directions</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* {userInfo?.userName === 'Guest' ? null : ( */}
                    <>
                      {/* {imamdata?.Imam_Name && ( */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                          gap: 15,
                        }}>
                        <View
                          style={{
                            borderWidth: 1.5,
                            borderColor: '#F4F4F4',
                            borderRadius: 50,
                          }}>
                          <Image
                            // source={{uri: imamdata?.Imam_img}}
                            source={{
                              uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                            }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                            }}
                            resizeMode="cover"
                          />
                        </View>
                        <TouchableOpacity
                          // onPress={handleAskImamPress}
                          style={{justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                              lineHeight: 14,
                              color: '#F4F4F4',
                            }}>
                            Want clarity on something?
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 5,
                              gap: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: '400',
                                lineHeight: 11.73,
                                color: '#B4B4B4',
                                alignSelf: 'center',
                              }}>
                              Ask Imam&nbsp;Imam_Name
                              {/* {imamdata?.Imam_Name} */}
                            </Text>
                            <AntDesign
                              name="arrowright"
                              size={15}
                              color={'#3DC8B2'}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      {/* )} */}
                    </>
                    {/* )} */}

                    <View style={{marginTop: 10}}>
                      <MasjidInfoTabs
                        masjidInfo={masjid[0]?.masjidInfo}
                        eventsData={masjid[0]?.masjidInfo.events}
                        type="verified"
                      />
                    </View>
                  </View>
                }
                data={[]} // Empty array since all content is inside ListHeaderComponent
                renderItem={null}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: -25,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#3DC8B2',
                    paddingVertical: 11,
                    paddingHorizontal: 45,
                    flexDirection: 'row',
                    gap: 5,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                  // onPress={isLoading ? null : handlefollow}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#F4F4F4',
                        fontFamily: themeFont.englishFont,
                        fontWeight: '700',
                        lineHeight: 17.02,
                        fontSize: 14.18,
                      }}>
                      {/* {isLoading ? (
                          <ActivityIndicator
                            size="small"
                            color="#FFF"
                            style={{alignItems: 'center'}}
                          /> // Display the ActivityIndicator when loading
                        ) : ( */}
                      <Text style={{}}>
                        {/* {followed ? 'Unfavourite' : 'Favourite'} */}
                        Favourite
                      </Text>
                      {/* )} */}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.shareIcon}
                onPress={() =>
                  shareMessage(
                    `Masjid Name:${masjid[0].name}\n\n Location:${masjid[0].address} - \n\n Check out this masjid in the GoMasjid App`,
                  )
                }>
                <Feather name="upload" size={20} color="#3DC8B2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      {/* )} */}
    </View>
  );
};

export default MasjidDetails;

const styles = StyleSheet.create({
  imageStyle: {
    width: width,
    height: height,
    flex: 1,
  },
  test: {
    // backgroundColor: 'rgba(0,0, 0, 0.5)',
    flex: 1,
    // padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    marginLeft: 20,
  },

  titleText: {
    color: '#F4F4F4',
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 17.6,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  masjidNameText: {
    color: '#ffffff',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: themeFont.englishFont,
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 17.6,
    marginTop: 10,
  },
  masjidContactDetails: {
    marginTop: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
  },
  infoText: {
    color: '#EAEAEA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: themeFont.englishFont,
    lineHeight: 14.08,
    flexWrap: 'wrap',
    maxWidth: width,
  },
  content: {
    // display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    // width: '100%',
    height: '95%',
    alignItems: 'center',
  },
  transparentContainer: {
    maxWidth: width - 60,
    height: height - height * 0.35,
    backgroundColor: 'rgba(0, 0, 0, 0.72)', //0.62
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  transparentContainerIconHeader: {
    marginTop: -80,
    display: 'flex',
    justifyContent: 'center',
  },
  masjidNameContainer: {
    marginTop: 10,
    marginBottom:5
  },
  masjidInnerContianer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  shareIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: '#FFF',
  },
});
