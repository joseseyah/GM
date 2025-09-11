import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import {Switch} from 'react-native-gesture-handler';
import { themeFont } from '../../styles/theme';
import Header from '../../common/Header';
import { CreateMasjidAnnouncement } from '../../services/api';
import SuccessModal from '../../common/SuccessModal';

const AddAnnouncement = ({route, props, navigation}: any) => {
  const [title, setTitle] = useState<any>();
  const [discription, setDiscription] = useState<any>();
  const [Announcedby, setAnnouncedby] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {userInfo} = useContext(UserContext);
  const [successModal, setSuccessModal] = useState(false);
  const [masjidId, setMasjidId] = useState<number>();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    if(userInfo?.role == 'masjid_admin') {
      setMasjidId(route?.params.masjidId);
      setAnnouncedby(userInfo?.userName);
    }
  }, []);

  const handlePressOutside = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  const AddNewAnnouncement = async () => {
    if (!title || !discription) {
      setError('please fill Subject and Description');
    } else {
      setLoading(true);
      setError('');
      
      let reqData = {
        masjid_id: masjidId, 
        user_id: userInfo?.userId, 
        subject: title, 
        body: discription,
        pubdate: new Date().getTime(),
        notify: toggleCheckBox,
        status: 'active'
      };
      // console.log('reqData', reqData);
      const userToken = userInfo?.userToken;
      if (masjidId !== undefined) {
        const createAnnouncement = await CreateMasjidAnnouncement(masjidId, reqData,userToken);
        if(createAnnouncement) {
          setLoading(false);
          setSuccessModal(true);
        }
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/masjidAdminBackground.png')}
          style={{flex: 1}}>
          <View style={styles.container}>
            <Header
              title="Add Announcements"
              titleColor="#FFF"
              iconColor="#FFF"
              onBack={() => navigation?.goBack()}
            />
            <View>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 13,
                  fontWeight: '500',
                  lineHeight: 15.25,
                  fontFamily: themeFont.englishFont,
                  paddingLeft: 20,
                  marginTop: 15,
                }}>
                Subject
              </Text>
              <View style={styles.cardOne}>
                <TextInput
                  style={{
                    fontSize: 12,
                    width: '100%',
                    fontWeight: '500',
                    color: '#666161',
                    fontStyle: 'italic',
                    paddingHorizontal: 10,
                    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
                  }}
                  placeholder="Write a title for your announcement"
                  placeholderTextColor="#C7C7C7"
                  value={title}
                  onChangeText={setTitle}
                  keyboardType="ascii-capable"
                />
              </View>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 13,
                  fontWeight: '500',
                  lineHeight: 15.25,
                  fontFamily: themeFont.englishFont,
                  paddingLeft: 20,
                  marginTop: 15,
                }}>
                Description
              </Text>
              <View style={styles.DisCard}>
                <TextInput
                  placeholder="What is the announcement about?"
                  placeholderTextColor="#C7C7C7"
                  value={discription}
                  onChangeText={setDiscription}
                  keyboardType="ascii-capable"
                  style={{
                    fontSize: 11,
                    fontWeight: '500',
                    color: '#666161',
                    fontStyle: 'italic',
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    width: '100%',
                  }}
                  multiline={true}
                />
              </View>
              <View style={styles.cardTwo}>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: themeFont.englishFont,
                    lineHeight: 14.3,
                    fontWeight: '400',
                    color: '#FFF',
                  }}>
                  Posted by {Announcedby}
                </Text>
                {/* <TextInput
                  placeholder="Announced by"
                  value={Announcedby}
                  onChangeText={setAnnouncedby}
                  keyboardType="ascii-capable"
                  style={{
                    fontSize: 11,
                    fontWeight: '400',
                    color: '#FFF',
                    width: width,
                    marginLeft: 5,
                  }}
                /> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <Switch
                  value={toggleCheckBox}
                  onValueChange={c => setToggleCheckBox(c)}
                  trackColor={{false: '#727272', true: '#3DC8B2'}}
                  thumbColor={toggleCheckBox ? '#F3F3F3' : '#F3F3F3'}
                  ios_backgroundColor="#727272"
                  style={{transform: [{scale: Platform.OS === 'ios' ? 0.6 : 1}]}}
                />
                <Text style={{marginLeft: 10, fontSize: 13, color: '#FFF'}}>
                  Notify all masjid followers
                </Text>
              </View>
              <Text style={styles.errorText}>{error}</Text>
            </View>
            {loading && <ActivityIndicator size="large" color="#fff" />}
          </View>
          <>
            <TouchableOpacity style={styles.SubmitButton} onPress={AddNewAnnouncement}>
              <View 
                style={{
                  borderRadius: 13,
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  alignSelf: 'center',
                  backgroundColor: '#3DC8B2',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    alignSelf: 'center',
                    fontSize: 16.63,
                    fontWeight: '700',
                    lineHeight: 19.96,
                    fontFamily: themeFont.englishFont,
                  }}>
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </>
          {successModal && (
            <SuccessModal
              modalVisible={successModal}
              modalClose={() => {
                setSuccessModal(false);
                navigation.goBack();
              }}
              modalText="Announcement has been successfully added"
              buttonText="OK"
            />
          )}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: 20,
  },
  cardOne: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    width: '100%',
    // height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  DisCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
    height: '30%',
  },
  SubmitButton: {
    marginBottom: 50,
  },
  cardTwo: {
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 15,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddAnnouncement;