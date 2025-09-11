import { ActivityIndicator, Alert, ImageBackground, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/Header'
import { themeFont } from '../../styles/theme'
import DocumentPicker, { DocumentPickerResponse } from '@react-native-documents/picker';
import Feather from 'react-native-vector-icons/Feather'
// import RNFS from 'react-native-fs';
import { UserContext } from '../../context/UserProvider';
import { updateSalahTime } from '../../services/api';
import SuccessModal from '../../common/SuccessModal';

const UpdateSalahTime = ({route, navigation}: any) => {
  const [salahTimeCSV, setSalahTimeCSV] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [masjidId, setMasjidId] = useState<number>();
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState<any>();
  const [successModal, setSuccessModal] = useState(false);
  const [file, setFile] = useState<DocumentPickerResponse[] | null>(null);

  useEffect(() => {
    setMasjidId(route?.params?.masjid_id);
  }, []);

  const salahTimeUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv],
      });

      setSalahTimeCSV(res[0]?.name || ''); // Extract the file name or set an empty string if unavailable
      // console.log('File selected:', res);
      // const filePath = res[0].uri;
      // const fileContent = await RNFS.readFile(filePath, 'utf8');
      // console.log("content", fileContent);
      setFile(res);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'File selection was cancelled');
      } else {
        Alert.alert('Error', 'Unknown error occurred');
      }
    }
  };

  const updateMasjidSalah = async () => {
    if (!file) {
      Alert.alert('Error', 'No file selected');
      return;
    }
    if(file) {
      const userToken = userInfo?.userToken;

      const fileObj = file[0]; 
      // Convert iOS file path
      let realPath = fileObj.uri;
      if (Platform.OS === 'ios') {
        realPath = realPath.replace('file://', ''); // Remove file:// for iOS
      }

      const formData = new FormData();
      formData.append('salah_csv', {
        uri: realPath,
        type: fileObj.type || 'text/csv',
        name: fileObj.name || 'upload.csv',
      });
      
      const masjidUpdate = await updateSalahTime(Number(masjidId), formData, userToken);

      if(masjidUpdate) {
        setLoading(false);
        setSuccessModal(true);
      }
    }
  };

  const downloadFile = () => {
    const url = "https://admin.gomasjid.co.uk/assets/salah/salah_timing.csv";
    Linking.openURL(url);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/masjidAdminBackground.png')}
      style={{ flex: 1 }}
      resizeMode="cover">
      <View style={styles.maincontainer}>
        <Header
          title="Update Salah Time"
          titleColor="#FFF"
          iconColor="#FFF"
          onBack={() => navigation?.goBack()}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Upload Salah Timings (CSV)</Text>
          <Text style={styles.subTitle}>Upload a CSV file containing Salah timings in the correct format.</Text>
          <View style={{}}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={salahTimeUpload}
              activeOpacity={0.7}>
              <Text style={styles.placeholderText}>
                {salahTimeCSV ? salahTimeCSV : 'Upload Salah Time CSV'}
              </Text>

              {!isUploading ? (
                <Feather
                  name="upload"
                  size={25}
                  color="#c7c7c7"
                />
              ) : (
                <ActivityIndicator size="small" color="#000" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              onPress={downloadFile}
              disabled={false}>
              <View style={styles.dbuttonContainer}>
                <Text style={styles.buttonText}>
                  Download Sample CSV
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {loading && <ActivityIndicator size="large" color="#fff" />}
          <View>
            <TouchableOpacity
              onPress={updateMasjidSalah}
              disabled={false}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                  Update Salah Timing
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {successModal && (
        <SuccessModal
          modalVisible={successModal}
          modalClose={() => {
            setSuccessModal(false);
            navigation.goBack();
          }}
          modalText="Salah Timing Updated Successfully"
          buttonText="OK"
        />
      )}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    flex: 1, 
  },
  container: {
    flex: 1, 
  },
  title: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
    marginBottom: 0,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '500',
    fontFamily: themeFont.englishFont,
    marginBottom: 0,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'center',
    backgroundColor: '#3DC8B2',
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
  },
  dbuttonContainer: {
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'center',
    backgroundColor: '#3DC8B2',
  },
  buttonText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: themeFont.englishFont
  },
});

export default UpdateSalahTime;