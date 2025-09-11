import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {UserContext} from '../../context/UserProvider';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BlurView} from '@react-native-community/blur';
import {SafeAreaView} from 'react-native-safe-area-context';
import { themeFont } from '../../styles/theme';
import { DeleteMasjidAnnouncement, getMasjidAnnouncement } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../common/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Announcement = ({route, navigation}: any) => {
  const [announcements, setAnnouncements] = useState<any>([]);
  const [masjidId, setMasjidId] = useState<number>();
  const {userInfo} = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<number | null>();

  useEffect(() => {
    setMasjidId(route?.params?.masjidId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMasjidAnnouncement = async () => {
        if (masjidId !== undefined) {
          const announcementData = await getMasjidAnnouncement(masjidId);
          setAnnouncements(announcementData?.announcements);
        }
      };
      fetchMasjidAnnouncement();
    }, [masjidId])
  );

  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleDeleteConfirmation = (id: number) => {
    setSelectedAnnouncementId(id);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedAnnouncementId) {
      const userToken = userInfo?.userToken;
      await DeleteMasjidAnnouncement(selectedAnnouncementId, userToken);
      setAnnouncements((prevAnnouncements: any[]) =>
        prevAnnouncements.filter((announcement: any) => announcement.id !== selectedAnnouncementId),
      );
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAnnouncementId(null);
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/masjidAdminBackground.png')}
        style={{flex: 1}}
        resizeMode="cover">
        <View style={styles.maincontainer}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            {/* <Header
              title="Announcements"
              titleColor="#FFF"
              iconColor="#FFF"
              onBack={() => navigation?.goBack()}
            /> */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{flexDirection: 'row', gap: 20}}>
                <Entypo name="chevron-left" size={30} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.topBarHeader}>Announcements</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddAnnouncement', {masjidId: masjidId})
                }>
                <MaterialCommunityIcons
                  name="plus"
                  color={'#F4F4F4'}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              {announcements && announcements.length > 0 ? (
                announcements.map((announcementsData: any, index: number) => (
                  <View key={`announce-${index}`}
                    style={{
                      flexDirection: 'row',
                      marginVertical: 10,
                    }}>
                    <LinearGradient
                      colors={[
                        'rgba(255, 255, 255, 0.25)',
                        'rgba(42, 42, 42, 0.15)',
                      ]}
                      start={{x: 0.01, y: 5}}
                      end={{x: 0.03, y: 0.1}}
                      style={styles.insetShadow}
                    >
                      <View style={styles.cardOne}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: '#FFF',
                            lineHeight: 15.25,
                            fontFamily: themeFont.englishFont,
                            marginBottom: 10,
                          }}>
                          {announcementsData.subject}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '400',
                            color: '#C7C7C7',
                            lineHeight: 11.73,
                            fontFamily: themeFont.englishFont,
                            textAlign: 'justify',
                            maxWidth: 227,
                          }}>
                          {announcementsData.body}
                        </Text>
                      </View>
                    </LinearGradient>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 20,
                      }}
                      onPress={() =>
                        handleDeleteConfirmation(announcementsData.id)
                      }>
                      <Image
                        source={require('../../assets/images/trashCan.png')}
                        style={{width: 24, height: 24}}
                      />
                    </TouchableOpacity>
                  </View>
              ))) : (
                <SafeAreaView
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: '#E1E1E1',
                      }}>
                      No announcements
                    </Text>
                  </View>
                </SafeAreaView>
              )}
            </View>
          </View>
          {isModalVisible && (
            <Modal
              transparent={true}
              visible={isModalVisible}
              animationType="slide"
              onRequestClose={handleCancel}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>
                    Are you sure you want to delete it?
                  </Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={handleDelete}>
                      <Text style={styles.modalButtonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButtonCancel}
                      onPress={handleCancel}>
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  maincontainer: {
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
    flex: 1,
  },
  topBar: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '600',
    color: '#FFF',
    fontSize: 15,
    lineHeight: 17.6,
    marginLeft: 20,
  },
  cardOne: {
    borderRadius: 9.04,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  DisCard: {
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
    width: '100%',
  },
  insetShadow: {
    flex: 1,
    maxWidth: 290,
    borderColor: '#FFFFFF99',
    borderRadius: 9.04,
    borderWidth: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    maxWidth: 200,
    fontWeight: '500',
    lineHeight: 19,
    fontFamily: themeFont.englishFont,
    color: '#282828',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#3DC8B2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  modalButtonText: {
    fontFamily: themeFont.englishFont,
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 14.08,
  },
  modalButtonCancel: {
    backgroundColor: '#C7C7C7',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
});

export default Announcement;