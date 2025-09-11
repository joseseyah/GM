import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme, {themeFont} from '../../styles/theme';
import Header from '../../common/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImage} from '../../services/s3Upload';
import Feather from 'react-native-vector-icons/Feather';
import {UserContext} from '../../context/UserProvider';
import {ClaimMasjidReq} from '../../services/api';
import SuccessModal from '../../common/SuccessModal';

const ClaimMasjid = ({navigation, route}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [masjidSelectPopup, setMasjidSelectPopup] = useState(false);
  const [loading, setLoading] = useState<any>();
  const [successModal, setSuccessModal] = useState(false);
  const [error, setError] = useState<any>();
  const [masjidDataIdSaved, setMasjidDataIdSaved] = useState<any>();
  const {userInfo, isAuthenticated} = useContext(UserContext);
  const [claimInProgress, setClaimInProgress] = useState(false);
  const [idProofImg, setIdProofImg] = useState('');
  const [idProofImgName, setIdProofImgName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [masjidId, setMasjidId] = useState<number>();
  const [userId, setuserId] = useState('');
  const [affProofImg, setAffProofImg] = useState('');
  const [affProofImgName, setAffProofImgName] = useState('');
  const [isUploadingAffImg, setIsUploadingAffImg] = useState(false);

  useEffect(() => {
    console.log('cmmm----', route.params);
    setMasjidId(route?.params?.id);
    setName(userInfo?.userName);
    setEmail(userInfo?.email);
    setNumber(userInfo?.phoneNumber);
    setuserId(userInfo?.userId);
  }, []);

  const handleTextChange = (text: string) => {
    // Allow only numbers and '+' for international dialing
    const formatted = text.replace(/[^0-9+]/g, '');
    setNumber(formatted);
  };

  const handleClaimProcess = async (mID: any) => {
    // setSuccessModal(true);
    let reqData = {
      UserName: name,
      email: email,
      ContactPerson: number,
      masjidId: mID,
      userId: userInfo.userId,
      idProofImg: idProofImg,
      affProofImg: affProofImg,
      createdDate: new Date(),
    };
    console.log('Claim Meta', reqData);
    if (isAuthenticated) {
      const userToken = userInfo?.userToken;
      const claimMasjidReq = await ClaimMasjidReq(mID, reqData, userToken);
      if (claimMasjidReq) {
        console.log('successfully claimMasjidReq');
      }
    }

    setMasjidSelectPopup(true);
  };

  const claimProcess = () => {
    if (!number) {
      setError('Contact number is mandatory for claim process.');
      return;
    }
    if (!idProofImg) {
      setError('Proof of ID is mandatory for claim process.');
      return;
    }
    if (!affProofImg) {
      setError('Proof of Affiliation is mandatory for claim process.');
      return;
    }
    if (!claimInProgress) {
      setClaimInProgress(true);

      console.log('masjid_id', masjidId);
      handleClaimProcess(masjidId);
    }
  };

  const idProofImgUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (
        response.didCancel ||
        response.errorCode ||
        response.errorMessage ||
        !response.assets?.[0]
      )
        return;

      const file = response.assets[0];

      // console.log('File:', file);
      const fileType = file.type;
      const fileExtension = fileType ? fileType.split('/')[1] : '';
      const fileName = `claim_mid${masjidId}_uid${userId}_idproof_${file.fileName}`;
      setIdProofImgName(file.fileName ? file.fileName : 'try Again');

      if (file.uri) {
        setIdProofImg(file.uri);
      }

      if (file) {
        try {
          setIsUploading(true);
          const data = await uploadImage(
            {
              fileName: fileName,
              uri: file.uri,
              type: file.type,
            },
            Number(masjidId),
          );

          setIdProofImg(data);
          setIsUploading(false);
        } catch (error) {
          // console.error("Upload failed", error);
        }
      }
    });
  };

  const affProofImgUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (
        response.didCancel ||
        response.errorCode ||
        response.errorMessage ||
        !response.assets?.[0]
      )
        return;

      const file = response.assets[0];

      // console.log('File:', file);
      const fileType = file.type;
      const fileExtension = fileType ? fileType.split('/')[1] : '';
      const fileName = `claim_mid${masjidId}_uid${userId}_affProof_${file.fileName}`;
      setAffProofImgName(file.fileName ? file.fileName : 'try Again');

      if (file.uri) {
        setAffProofImg(file.uri);
      }

      if (file) {
        try {
          setIsUploadingAffImg(true);
          const data = await uploadImage(
            {
              fileName: fileName,
              uri: file.uri,
              type: file.type,
            },
            Number(masjidId),
          );

          setAffProofImg(data);
          setIsUploadingAffImg(false);
        } catch (error) {
          // console.error("Upload failed", error);
        }
      }
    });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{flex:1}}>
          <Header title="Claim Masjid" onBack={() => navigation.goBack()} titleColor='#000' />
          <View style={{justifyContent: 'center', gap: 50}}>
            <View style={{}}>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Text style={styles.textInfo}>
                  I am an administrative authority of this masjid, and I have
                  explicit permission to create an account on its behalf.
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  editable={false} // Disables input field
                  selectTextOnFocus={false} // Prevents selection
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  editable={false} // Disables input field
                  selectTextOnFocus={false} // Prevents selection
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Contact number"
                  value={number}
                  maxLength={15}
                  onChangeText={handleTextChange}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                />
              </View>

              <View>
                <TouchableOpacity
                  style={styles.imginputContainer}
                  onPress={idProofImgUpload}
                  activeOpacity={0.7}>
                  <Text style={styles.placeholderText}>
                    {idProofImgName ? idProofImgName : 'Proof of ID'}
                  </Text>

                  {!isUploading ? (
                    <MaterialCommunityIcons
                      name="camera-plus-outline"
                      size={25}
                      color="#c7c7c7"
                    />
                  ) : (
                    <ActivityIndicator size="small" color="#000" />
                  )}
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.imginputContainer}
                  onPress={affProofImgUpload}
                  activeOpacity={0.7}>
                  <Text style={styles.placeholderText}>
                    {affProofImgName
                      ? affProofImgName
                      : 'Proof of Affiliation with this mosque'}
                  </Text>

                  {!isUploadingAffImg ? (
                    <Feather name="upload" size={25} color="#c7c7c7" />
                  ) : (
                    <ActivityIndicator size="small" color="#000" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            
            <View>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginVertical: 6,
                  }}>
                  <Text style={styles.text}>By continuing, you agree to our</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://gomasjid.co.uk/privacy-policy/')
                  }>
                  <Text style={styles.termsText}>Terms and conditions</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 20,
                    textAlign: 'center',
                    marginVertical: 12,
                  }}>
                  {error}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                {claimInProgress ? (
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: '#3DC8B2',
                      paddingVertical: 11,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      width: '70%',
                      gap: 5,
                      alignSelf: 'center',
                      // position: 'absolute',
                      // top: 310,
                    }}>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={
                          () => setSuccessModal(true)
                          // navigation.goBack()
                        }>
                        <Text style={styles.buttonText}>
                          Your claim is in pending
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: '#3DC8B2',
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      gap: 5,
                      width: '70%',
                      alignSelf: 'center',
                      // position: 'absolute',
                      // top: 310,
                    }}>
                    <TouchableOpacity style={styles.button} onPress={claimProcess}>
                      <Text style={styles.buttonText}>Start Claim Process</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    
      {masjidSelectPopup && (
        <SuccessModal
          modalVisible={masjidSelectPopup}
          modalClose={() => {
            setMasjidSelectPopup(false);
            navigation.goBack();
          }}
          modalText="Thank you! Your claim request has been sent. GoMasjid team will get in touch
              with you to complete the process."
          buttonText="OK"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F4F4F4',
    fontWeight: '700',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60
  },
  container: {
    marginHorizontal: 15,
    
  },

  inputContainer: {
    width: '90%',
    paddingVertical: 10,
    height: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    paddingLeft: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    // font: theme.fonts.primary,
    fontWeight: '700',
    color: '#000000',
    fontFamily: theme.fonts.primary,
    marginHorizontal: 60,
  },

  textInfo: {
    fontSize: 12,
    fontFamily: themeFont.englishFont,
    color: '#282828',
    // lineHeight: 11.95,
    marginHorizontal: 15,
    fontWeight: '400',
  },

  text: {
    textAlign: 'center',
    flex: 1,
    fontSize: 13,
    // lineHeight: 11.95,
    color: '#000000',
    fontFamily: themeFont.englishFont,
    // marginTop: 6,
    fontWeight: '400',
  },

  termsText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17.61,
    color: '#282828',
    fontFamily: themeFont.englishFont,
    textTransform: 'capitalize',
  },

  input: {
    width: '100%',
    borderRadius: 15,
    marginTop: 1,
    fontFamily: themeFont.englishFont,
    fontStyle: 'normal',
    backgroundColor: '#FFF',
  },
  button: {
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
  },
  inputPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 1,
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
  },
  buttonImg: {
    width: 100,
    height: 100,
    color: 'black',
    borderRadius: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
    borderWidth: 0.5,
    borderColor: '#FFFFFF99',
    position: 'relative',
  },
  imginputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 18.21,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  placeholderText: {
    fontSize: 14,
    color: '#c7c7c7',
    flex: 1,
    fontFamily: themeFont.englishFont,
  },
});

export default ClaimMasjid;
