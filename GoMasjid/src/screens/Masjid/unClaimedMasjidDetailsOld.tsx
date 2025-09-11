import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  SafeAreaView,
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
import PrayerTimes from './PrayerTimes';
const {height, width} = Dimensions.get('window');

interface Masjid {
  distance: string;
  is_primary: boolean;
  masjidImageUrl: string | undefined;
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

const unClaimedMasjidDetails = ({navigation, route, props}: any) => {
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
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          is_primary: false,
          masjidCoverImage:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          contact_numbers: ['020 7650 3000', '+44 141 429 3132'],
          website: 'https://www.eastlondonmosque.org.uk/',
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
    <SafeAreaView style={styles.container}>
      {/* {error ? (
            <Text style={styles.errorText}>{error}</Text>
        ) : loading ? (
            <Text style={styles.loadingText}>Loading masjid...</Text>
        ) : ( */}
      {/* // userInfo?.userName === 'Guest' ? ( */}

      <View style={{flex: 1}}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="chevron-left" size={30} color="#282828" />
            <Text style={styles.titleText}>Info</Text>
          </TouchableOpacity>
        </View>

        {/* <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={true}> */}
        <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 50,
        }}
            ListHeaderComponent={
          <View style={{marginTop: 5, 
            }}>
            <View>
              <Image
                source={{
                  uri:
                    masjid && masjid.length > 0
                      ? masjid[0].masjidCoverImage
                      : '',
                }}
                style={{
                  width: 123.61,
                  height: 123.61,
                  borderRadius: 12.56,
                  resizeMode: 'cover',
                }}
              />
              <View>
                <Text style={styles.masjidNameText}>{masjid[0]?.name}</Text>
              </View>
            </View>
            <View>
              <Text
                style={[styles.infoText, {color: '#727272', paddingTop: 5}]}>
                {masjid[0]?.distance} away
              </Text>
            </View>

            <View style={{justifyContent: 'center'}}>
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
                {masjid[0]?.website !== null && masjid[0]?.website !== '' && (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(masjid[0]?.website)}
                    style={styles.infoContainer}>
                    <Feather name="globe" color="#3DC8B2" size={15} />
                    <Text style={styles.infoText}>{masjid[0]?.website}</Text>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      handleDirection(masjid[0].latitude, masjid[0].longitude)
                    }
                    style={styles.infoContainer}>
                    <Feather name="map" color="#3DC8B2" size={15} />
                    <Text style={styles.infoText}>Check Directions</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginLeft: 150}}
                    // onPress={() => makeFavourite()}
                  >
                    <Entypo 
                      name={isFavourite ? 'heart' : 'heart-outlined'}
                      size={20}
                      color={isFavourite ? '#3DC8B2' : '#3DC8B2'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginRight: 20}}
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

            <View style={{marginTop: 10, 
            // height: 300, 
            width: width - 50

            }}>
              <MasjidInfoTabs
                masjidInfo={masjid[0]?.masjidInfo}
                eventsData={masjid[0]?.masjidInfo.events}
                type="unclaimed"
              />
            </View>
          </View>
        // </ScrollView>
      }
      data={[]} // Empty array since all content is inside ListHeaderComponent
      renderItem={null}
    />

        <View style={styles.bottomButton}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#3DC8B2',
                paddingVertical: 11,
                paddingHorizontal: 45,
                flexDirection: 'row',
                gap: 5,
                width: width * 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#F4F4F4',
                  fontSize: 16.63,
                  fontWeight: '700',
                  lineHeight: 19.96,
                  fontFamily: themeFont.englishFont,
                  textAlign: 'center',
                }}>
                Claim
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: '#FFF',
                borderRadius: 25,
                paddingVertical: 28,
                paddingHorizontal: 25,
                alignItems: 'center',
                width: width / 1.3,
              }}>
              <Text
                style={{
                  marginBottom: 15,
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: '500',
                  fontFamily: themeFont.englishFont,
                  maxWidth: 200,
                }}>
                {/* if user not loged in */}
                Please Register Yourself.
                {/* else */} Do you want to claim this masjid?
              </Text>
              <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    backgroundColor: '#3DC8B2',
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                  // onPress={handleClaimConfirm}
                >
                  <Text
                    style={{
                      color: '#F4F4F4',
                      fontSize: 14,
                      fontWeight: '600',
                      lineHeight: 14.08,
                      fontFamily: themeFont.englishFont,
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    backgroundColor: '#C7C7C7',
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                  onPress={() => setModalVisible(false)}>
                  <Text
                    style={{
                      color: '#F4F4F4',
                      fontSize: 14,
                      fontWeight: '600',
                      lineHeight: 14.08,
                      fontFamily: themeFont.englishFont,
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* )} */}
    </SafeAreaView>
  );
};

export default unClaimedMasjidDetails;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingHorizontal: 15,
  //   marginHorizontal: 25,
  //   marginVertical: 10,
  //   // paddingTop: 40,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginHorizontal: 25,
    marginVertical: 10,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 20,
    // marginHorizontal: -10,
  },

  titleText: {
    color: '#282828',
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
    color: '#282828',
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
    // marginLeft: 20,
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    // width: width - 200,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
  },
  infoText: {
    color: '#282828',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: themeFont.englishFont,
    lineHeight: 14.08,
    flexWrap: 'wrap',
    maxWidth: width,
  },
});
