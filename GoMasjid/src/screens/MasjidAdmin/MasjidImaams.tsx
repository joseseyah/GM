import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  ImageBackground,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../../context/UserProvider';
import { themeFont } from '../../styles/theme';
import { useFocusEffect } from '@react-navigation/native';
import { DeleteMasjidImaam, getMasjidImaams } from '../../services/api';

const MasjidImaams = ({route, navigation}: any) => {
  const [imaamData, setImaamData] = useState<any>([]);
  const [imamToDelete, setImamToDelete] = useState<number | null>(null);
  const [modalVisible, setIsModalVisible] =
    useState(false);
  const [masjidId, setMasjidId] = useState<number>();
  const {userInfo} = useContext(UserContext);

  useEffect(() => {
    setMasjidId(route?.params?.masjidId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMasjidImams = async () => {
        if (masjidId !== undefined) {
          const imaamsList = await getMasjidImaams(masjidId);
          setImaamData(imaamsList?.imams);
          console.log(imaamsList?.imams, "imaam list");
        }
      };
      fetchMasjidImams();
    }, [masjidId])
  );

  const handleDelete = async () => {
    if (imamToDelete) {
    const userToken = userInfo?.userToken;
      await DeleteMasjidImaam(imamToDelete, userToken, Number(masjidId));
      setImaamData((prevAnnouncements: any[]) =>
        prevAnnouncements.filter((imaam: any) => imaam.imam_id !== imamToDelete),
      );
      setIsModalVisible(false);
    }
  };

  const showDeleteConfirmation = (imam: number) => {
    // console.log(imam,"ima")
    setImamToDelete(imam);
    setIsModalVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setImamToDelete(null);
    setIsModalVisible(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/masjidAdminBackground.png')}
      style={{flex: 1}}>
      <View style={styles.maincontainer}>
        <ScrollView>
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', gap: 20}}>
              <Entypo name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.topBarHeader}>List of Imams</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddImam', {masjidId: masjidId})
              }>
              <MaterialCommunityIcons
                name="plus"
                color={'#F4F4F4'}
                size={25}
              />
            </TouchableOpacity>
          </View>
          {imaamData ?
          imaamData.map((Imam: any, index: number) => (
            <View key={Imam.imam_id}
              style={{
                flexDirection: 'row',
                gap: 20,
              }}>
              <LinearGradient
                colors={[
                  'rrgba(255, 255, 255, 0.25)',
                  'rgba(255, 255, 255, 0.25)',
                ]}
                start={{x: 0.05, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.card}>
                <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', paddingHorizontal: 10}}>  
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 7,
                    }}
                    source={
                      Imam?.imam_photo
                      ? { uri: Imam?.imam_photo }
                      : require('../../assets/images/accountSetting.png')
                    }
                    resizeMode="cover"
                  />
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#fff',
                        marginBottom: 3,
                      }}>
                      {Imam?.imam_name}
                    </Text>
                    {Imam?.bio && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#C7C7C7',
                        marginBottom: 3,
                      }}>
                      {Imam?.bio}
                    </Text>
                    )}

                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#C7C7C7',
                        marginBottom: 3,
                      }}>
                      Email:{Imam.imam_email}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#C7C7C7',
                        marginBottom: 3,
                      }}>
                      Phone:{Imam.imam_phone}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
              <TouchableOpacity
                onPress={() => showDeleteConfirmation(Imam.imam_id)}
                style={styles.deleteIcon}>
                <Image
                  source={require('../../assets/images/trashCan.png')}
                  style={{width: 25, height: 25, marginTop: 20}}
                />
              </TouchableOpacity>
            </View>
          )) : (
            // <ActivityIndicator size="small" color="#3DC8B2" />
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
                No Imams
              </Text>
            </View>
          )}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: themeFont.englishFont,
                    fontWeight: '500',
                    lineHeight: 19,
                    color: '#202020',
                    textAlign: 'center',
                  }}>
                  Are you sure you want to remove him?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={hideDeleteConfirmation}
                    style={{
                      backgroundColor: '#C7C7C7',
                      borderRadius: 11.82,
                      paddingVertical: 9.45,
                      paddingHorizontal: 18.91,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 14.18,
                        lineHeight: 16.64,
                        fontFamily: themeFont.englishFont,
                        fontWeight: '500',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDelete}
                    style={{
                      backgroundColor: '#3DC8B2',
                      borderRadius: 11.82,
                      paddingVertical: 9.45,
                      paddingHorizontal: 18.91,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 14.18,
                        lineHeight: 16.64,
                        fontFamily: themeFont.englishFont,
                        fontWeight: '500',
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 80 : 60
  },
  topBar: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '600',
    color: '#FFF',
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    lineHeight: 17.6,
  },
  card: {
    maxWidth: '100%',
    flex: 1,
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#FFFFFF99',
    borderWidth: 0.5,
  },
  modalContainer: {
    maxWidth: 250,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deleteIcon: {
    justifyContent: 'center',
    marginRight: 10
  },
});

export default MasjidImaams;
