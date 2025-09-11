import React, {useEffect, useState, useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Share,
  Platform,
  ActivityIndicator
} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import moment from 'moment';
import { themeFont } from '../../styles/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getEventDetails, userUnRegisterEvent, userRegisterEvent } from '../../services/api';
import Header from '../../common/Header';
import AlertModal from '../../common/AlertModal';
import SuccessModal from '../../common/SuccessModal';

const EventInfo = ({ props, route, navigation }: any) => {
  interface eventInfo {
    id: any;
    picture?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    speakers?: string[];
    title?: string;
    description?: string;
    date?: string;
  }
  const [eventsData, setEventsData] = useState<eventInfo>({
    id: null,
    picture: '',
    start_time: '',
    end_time: '',
    location: '',
    speakers: [],
    title: '',
    description: '',
    date: '',
  });
  const [successModal, setSuccessModal] = useState(false);
  const {userInfo,} = useContext(UserContext);
  const [eventId, setEventId] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [isRegister, setIsRegister] = useState(true);
  const [speakers, setSpeakers] = useState([]);
  const [alertModal, setAlertModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    if (route?.params?.eventId) {
      setEventId(route.params.eventId);
      setIsRegister(route.params.isRegister);
    }
  }, [route?.params?.eventId]); 

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const fetchEvent = async () => {
        if (!eventId) return; 
        const event = await getEventDetails(eventId);
        // console.log('Event Details:', event);
        setEventsData(event || []);
        setSpeakers(JSON.parse(event?.speakers) || []);
        setLoading(false);
      };
      fetchEvent();
    }, [eventId])
  );

  const handleShare = async () => {
    try {
      const result = await Share.share({
        title: eventsData.title,
        // url: eventsData.picture,
        message: `Event Name: ${eventsData.title}\n\n Event description: ${eventsData.description} \n\n Event location: ${eventsData.location} \n\n Download App Go Masjid to Register to Event`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log(`Shared via ${result.activityType}`);
        } else {
          // console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('Dismissed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UnregisterEvent = async () => {
    if (!eventId) return; 
    const unregister = await userUnRegisterEvent(eventId, parseInt(userInfo?.userId) ,userInfo?.userToken);
    if(unregister) {
      setSuccessModal(true);
      setModalText('You have successfully cancelled your registration for this event.');
    }
  }

  const RegisterEvent = async () => {
    if (!eventId) return; 
    const registerevent = await userRegisterEvent(eventId, parseInt(userInfo?.userId), userInfo?.userToken);
    if(registerevent) {
      setSuccessModal(true);
      setModalText('You have successfully registered for the event');
    }
  }

  return (
    <ScrollView style={{backgroundColor: '#F4F4F4'}}>
      <View style={styles.maincontainer}>
        <Header title="Event Details" onBack={() => navigation.goBack()} titleColor='#000'/>
        {loading ? (
          <ActivityIndicator size="large" color="#283025" />
        ) : (
          <>
          {eventsData?.picture && (
            <View style={styles.ImgContainer}>
              <Image
                source={{ uri: eventsData?.picture, cache: 'force-cache' }}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}
                resizeMode="cover"
              />
            </View>
          )}
          <View style={styles.detailsContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 15,
                  fontSize: 15,
                  fontWeight: Platform.OS === 'ios' ? '600' : '700',
                  color: '#202020',
                  fontFamily: themeFont.englishFont,
                  lineHeight: 18,
                }}>
                {eventsData?.title}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#A7A7A7',
                  fontSize: 12,
                  fontWeight: Platform.OS === 'ios' ? '400' : '500',
                  fontFamily: themeFont.englishFont,
                  marginTop: 20,
                  lineHeight: 13,
                  textAlign: 'justify',
                  marginBottom: 10,
                }}>
                {eventsData.description}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                gap: 10,
              }}>
                <View>
                {speakers &&
                  speakers.map((Speaker: any, index: number) => (
                    <View key={`eventSpeakerImage-${index}`}>
                    {Speaker.name != '' && (
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginTop: 5,
                          gap: 10,
                        }}
                        key={`eventSpeakerImage-${index}`}>
                        {!Speaker.img_url && (
                          <Image
                            source={require('../../assets/images/imam6.png')}
                            style={{height: 40, width: 40}}
                            resizeMode="cover"
                            borderRadius={50}
                          />
                        )}
                        {Speaker?.img_url != '' && (
                          <Image
                            source={{uri: Speaker?.img_url,cache: 'force-cache',}}
                            style={{height: 40, width: 40}}
                            resizeMode="cover"
                            borderRadius={50}
                          />
                        )}
                        
                        <Text style={{marginTop: 8, color: '#000000'}}>Speaker:&nbsp;
                          {Speaker.name}
                        </Text>
                      </View>
                    )}
                    </View>
                  ))}
              </View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                gap: 10,
              }}>
              <MaterialCommunityIcons
                name="clock-time-three"
                size={20}
                color="#3DC8B2"
              />
              <Text
                style={{
                  color: '#202020',
                  fontSize: 13,
                  lineHeight: 15,
                  fontFamily: themeFont.englishFont,
                }}>
                {eventsData.start_time} - {eventsData.end_time}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                gap: 10,
              }}>
              <MaterialCommunityIcons name="calendar" size={20} color="#3DC8B2" />
              <Text
                style={{
                  color: '#202020',
                  fontSize: 13,
                  lineHeight: 15,
                  fontFamily: themeFont.englishFont,
                }}>
                {eventsData?.date &&
                  moment(eventsData?.date).format(
                    'Mo MMM, YYYY',
                  )}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                gap: 10,
              }}>
              <MaterialIcons name="location-pin" size={20} color="#3DC8B2" />
              <Text
                style={{
                  color: '#202020',
                  fontSize: 13,
                  lineHeight: 15,
                  fontFamily: themeFont.englishFont,
                }}>
                {eventsData.location}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleShare}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                gap: 10,
              }}>
              <Feather name="share" size={20} color="#3DC8B2" />
              <Text
                style={{
                  color: '#202020',
                  fontSize: 13,
                  lineHeight: 15,
                  fontFamily: themeFont.englishFont,
                }}>
                Invite your family and friends
              </Text>
            </TouchableOpacity>

            <View>
              {isRegister && (
                <TouchableOpacity style={styles.registeredButton}
                  onPress={() => {
                    setAlertModal(true);
                  }}>
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: '#4C20AA',
                      paddingVertical: 11,
                      paddingHorizontal: 45,
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <Text
                      style={{
                        color: '#F4F9F0',
                        fontSize: 16.63,
                        fontWeight: '700',
                        fontFamily: themeFont.englishFont,
                        lineHeight: 19.96,
                        textAlign: 'center',
                      }}>
                      Cancel Registration
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {!isRegister && (
                <TouchableOpacity
                  style={styles.registeredButton}
                  onPress={() => {
                    userInfo?.userId == null || userInfo?.userId == ''
                      ? setLoginModal(true)
                      : RegisterEvent();
                  }}>
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: '#4C20AA',
                      paddingVertical: 11,
                      paddingHorizontal: 45,
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <Text
                      style={{
                        color: '#F4F9F0',
                        fontSize: 16.63,
                        fontWeight: '700',
                        fontFamily: themeFont.englishFont,
                        lineHeight: 19.96,
                        textAlign: 'center',
                      }}>
                      Register
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
        </View>
        </>
        )}
      </View>
      {alertModal && (
        <AlertModal
          modalVisible={alertModal}
          modalClose={() => {
            setAlertModal(false);
          }}
          modalText="Are you sure you want to cancel your registration?"
          buttonText1="Yes"
          buttonText2="Cancel"
          actionHandle={() => {
            UnregisterEvent(); 
          }}
        />
      )}

      {loginModal && (
        <AlertModal
          modalVisible={loginModal}
          modalClose={() => {
            setLoginModal(false);
          }}
          modalText="Do you want to log in to register for this event?"
          buttonText1="Yes"
          buttonText2="No"
          actionHandle={() => {
            navigation.navigate('AuthStack', { screen: 'Login'});
            setLoginModal(false);
          }}
        />
      )}

      {successModal && (
        <SuccessModal
          modalVisible={successModal}
          modalClose={() => {
            setSuccessModal(false);
            navigation.goBack();
          }}
          modalText={modalText}
          buttonText="OK"
        />
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  registeredButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 10,
  },
  ImgContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    backgroundColor: '#C4C4C4',
  }
});
export default EventInfo;
