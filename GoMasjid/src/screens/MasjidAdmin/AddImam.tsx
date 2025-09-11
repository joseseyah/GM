import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
  Platform,
  Modal,
} from 'react-native';
import Header from '../../common/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { themeFont } from '../../styles/theme';
import { uploadImage } from '../../services/s3Upload';
import Feather from 'react-native-vector-icons/Feather';
import { UserContext } from '../../context/UserProvider';
import SuccessModal from '../../common/SuccessModal';
import { addMasjidImam, getCountryCodes } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const qualificationData = ['Imam','Qari','Mufti','Aalim'];
const languagesData = ['English', 'Arabic', 'Urdu', 'Bengali', 'French', 'German', 'Hindi'];

const AddImam = ({route, navigation}: any) => {
  const [imamName, setImamName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [qualification, setQualification] = useState('');
  const [language, setLanguages] = useState<string[]>([]);
  const [masjidId, setMasjidId] = useState<number>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const {userInfo} = useContext(UserContext);
  const [successModal, setSuccessModal] = useState(false);
  const [countryCode, setCountryCode] = useState('44');
  const [allCountryCodes, setAllCountryCodes] = useState([{phone: '', country_code: ''}]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCountryCodes = async () => {
        const codes = await getCountryCodes();
        setAllCountryCodes(codes);
      };
      fetchCountryCodes();
    }, [])
  );

  useEffect(() => {
    setMasjidId(route?.params?.masjidId);
  }, []);

  const [errors, setErrors] = useState({
    imamName: '',
    contactNumber: '',
    qualification: ''
  });

  const selectImageAndUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel || response.errorCode || response.errorMessage) return;

      const file = response.assets[0];

      // console.log('File:', file);
      const fileType = file.type;
      const fileExtension = fileType ? fileType.split("/")[1] : '';
      const fileName = `imam_${masjidId}_${file.fileName}`;

      if (file.uri) {
        setSelectedImage(file.uri);
      }
      
      if(file) {
        try {
          setIsUploading(true);
          const data = await uploadImage({
            fileName: fileName,
            uri: file.uri,
            type: file.type
          }, Number(masjidId));
          
          setSelectedImage(data);
          setIsUploading(false);
            
        } catch (error) {
          // console.error("Upload failed", error);
        }
      }
    });
  };

  const validateImam_Name = () => {
    if (imamName.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        imamName: 'Please Enter Imam Name',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, imamName: ''}));
      return false;
    }
  };
  const validateContact_Number = () => {
    contactNumber.trim();

    if (contactNumber === '') {
      setErrors(prevState => ({
        ...prevState,
        contactNumber: 'Please Enter Contact Number',
      }));
      return true;
    } else if (!/^\d{10,15}$/.test(contactNumber)) {
      setErrors(prevState => ({
        ...prevState,
        contactNumber: 'Contact Number must be between 10 and 15 digits',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, contactNumber: ''}));
      return false;
    }
  };

  // const validateQualification = () => {
  //   if (qualification.trim() === '') {
  //     setErrors(prevState => ({
  //       ...prevState,
  //       qualification: 'Please Enter Qualification',
  //     }));
  //     return true;
  //   } else {
  //     setErrors(prevState => ({...prevState, qualification: ''}));
  //     return false;
  //   }
  // };
  
  const validatePassword = () => {
    const passwordTrim = password.trim();
    if (passwordTrim === '') {
      setPasswordError('Please enter the password');
      return true;
    } else if (passwordTrim.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return true;
    } else {
      setPasswordError('');
      return false;
    }
  };
  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      return true;
    } else {
      setEmailError('');
      return false;
    }
  };

  const toggleView = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    if (isSubmitting) {
      return;
    }
    if (
      validateImam_Name() ||
      validateContact_Number() ||
      validatePassword() ||
      validateEmail() ||
      Object.values(errors).filter(x => x !== '').length > 0
    ) {
      // console.log('sssssh');
    } else {
      setIsSubmitting(true);
      setLoading(true);

      let data = {
        masjid_id: masjidId, 
        imam_name: imamName, 
        imam_number: contactNumber,
        imam_email: email,
        password: password,
        qualification: qualification,
        languages: JSON.stringify(language),
        profile_url: selectedImage,
        country_code: countryCode
      };
      console.log(data);
      const userToken = userInfo?.userToken;
      if (masjidId !== undefined) {
        const addImam = await addMasjidImam(masjidId, data,userToken);
        if(addImam) {
          setLoading(false);
          setSuccessModal(true);
        }
      }
    }

  };

  return (
    <ImageBackground
      source={require('../../assets/images/masjidAdminBackground.png')}
      style={{flex: 1}}>
      <View style={styles.maincontainer}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.container}>
            <Header
              title="Add Imam"
              titleColor="#FFF"
              iconColor="#FFF"
              onBack={() => navigation?.goBack()}
            />
            <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 0,
              }}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.1)', 'rgba(42, 42, 42, 0.5)']}
                start={{x: 0.05, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.buttonFavourite4}>
                {selectedImage && (
                  <Image
                    source={{uri: selectedImage}}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50, 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                )}
                <TouchableOpacity
                  onPress={selectImageAndUpload}
                  style={{position: 'absolute', zIndex: 2}}>
                  <MaterialCommunityIcons
                    name="camera-plus-outline"
                    size={25}
                    color="#FFF"
                  />
                </TouchableOpacity>
              </LinearGradient>
              {isUploading && <ActivityIndicator size="small" color="#FFF" />}
            </View>

            <Text style={styles.cardTitle}>Name</Text>
            <View style={styles.cardOne}>
              <TextInput
                value={imamName}
                onChangeText={value => setImamName(value)}
                placeholder="What is the name of the person? "
                style={styles.dropText}
                autoFocus={true}
                onBlur={validateImam_Name}
              />
            </View>
            {errors && errors.imamName !== '' && (
              <Text style={styles.error}>{errors.imamName}</Text>
            )}
            <Text style={styles.cardTitle}>Email</Text>
            <View style={styles.DisCard}>
              <TextInput
                value={email}
                onChangeText={value => setEmail(value)}
                placeholder="abc@hotmail.com"
                keyboardType="email-address"
                style={styles.dropText}
                onBlur={validateEmail}
              />
            </View>
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            <Text style={styles.cardTitle}>Password</Text>
            <View style={styles.inputPassword}>
              <TextInput
                onChangeText={value => setPassword(value)}
                style={{fontSize: 11, fontStyle: 'italic',color: '#000000',padding:0}}
                onChange={validatePassword}
                onBlur={validatePassword}
                placeholder="Password"
                placeholderTextColor={'#C7C7C7'}
                value={password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={toggleView}>
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={18}
                  color="#C7C7C7"
                  style={{marginRight: 5, textAlign: 'center', alignItems: 'center'}}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.error}>{passwordError}</Text>
            ) : null}

            <Text style={styles.cardTitle}>Number</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 5,
              zIndex: 100 // This ensures the dropdown appears on top of other elements
            }}>
              <View style={{position: 'relative'}}>
                <TouchableOpacity 
                  style={{
                    width: 70,
                    height: 40,
                    backgroundColor: '#FFFFFF',
                    borderTopLeftRadius: 18.21,
                    borderBottomLeftRadius: 18.21,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20
                  }}
                  onPress={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}>
                  <Text style={{color: '#000000', fontSize: 11}}>+{countryCode}</Text>
                  <Entypo 
                    name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} 
                    color="#000000" 
                    size={11} 
                  />
                </TouchableOpacity>
                
                {/* Dropdown menu */}
                {isCountryDropdownOpen && (
                  <View style={{
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    width: 80,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 18,
                    zIndex: 1000
                  }}>
                    {allCountryCodes.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          borderBottomWidth: index < allCountryCodes.length - 1 ? 0.5 : 0,
                          borderBottomColor: '#E5E5E5',
                          alignItems: 'center'
                        }}
                        onPress={() => {
                          setCountryCode(item.phone);
                          setIsCountryDropdownOpen(false);
                        }}>
                        <Text style={{color: '#000000', fontSize: 12}}>{item.country_code}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.phoneField}>
                <TextInput
                  value={contactNumber}
                  placeholder="Contact Number"
                  style={styles.dropText}
                  keyboardType="phone-pad"
                  onChangeText={value => {
                    const numericValue = value.replace(/[^0-9]/g, '');
                    setContactNumber(numericValue);
                  }}
                  maxLength={15}
                  onBlur={validateContact_Number}
                />
              </View>
            </View>
            {errors && errors.contactNumber !== '' && (
              <Text style={styles.error}>{errors.contactNumber}</Text>
            )}

            <View style={styles.qualifyContainer}>
              <Text style={styles.cardTitle}>Languages</Text>
              <TouchableOpacity
                onPress={() => { setIsLangDropdownOpen(!isLangDropdownOpen); setIsDropdownOpen(false)}}
                style={styles.dropContainer}>
                <Text style={styles.dropText}>
                  {language
                    ? `${language}`
                    : 'Languages'}
                </Text>
                <Feather
                  name={
                    isLangDropdownOpen ? 'chevron-up' : 'chevron-down'
                  }
                  size={20}
                  color="#2FA491"
                  style={{marginLeft: 0}} 
                />
              </TouchableOpacity>
              {language.length > 0 && (
              <View style={styles.langContainer}>
                {language.map((item, index) => (
                  <Text style={styles.langTag} key={index}>{item}</Text>
                ))}
              </View>
              )}
              {isLangDropdownOpen && (
                <View style={styles.dropdownContainer}>
                  {languagesData.map((item, index) => (
                    <View key={index}>
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setIsLangDropdownOpen(false);
                          setLanguages(prevSelected => 
                          prevSelected.includes(item)
                            ? prevSelected.filter(lang => lang !== item) 
                            : [...prevSelected, item] 
                          );
                        }}
                        style={styles.option}>
                        <Text style={styles.optionText}>{item}</Text>
                        {language.includes(item) && (
                          <Feather name="check" size={20} color="#2FA491" />
                        )}
                      </TouchableOpacity>
                      {index !== languagesData.length - 1 && <View style={styles.separator} />}
                    </View>
                  ))}
                </View>
              )}
            </View>
          
            <View style={styles.qualifyContainer}>
              <Text style={styles.cardTitle}>Qualification</Text>
              <TouchableOpacity
                onPress={() => {setIsDropdownOpen(!isDropdownOpen); setIsLangDropdownOpen(false)}}
                style={styles.dropContainer}>
                <Text style={styles.dropText}>
                  {qualification
                    ? `${qualification}`
                    : 'What qualifications does he have?'}
                </Text>
                <Feather
                  name={
                    isDropdownOpen ? 'chevron-up' : 'chevron-down'
                  }
                  size={20}
                  color="#2FA491"
                  style={{marginLeft: 0}} 
                />
              </TouchableOpacity>
              {isDropdownOpen && (
                <View style={styles.dropdownContainer}>
                  {qualificationData.map((item, index) => (
                    <View key={index}>
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setQualification(item);
                          setIsDropdownOpen(false);
                          // validateQualification();
                        }}
                        style={styles.option}>
                        <Text style={styles.optionText}>{item}</Text>
                        {qualification === item && (
                          <Feather name="check" size={20} color="#2FA491" />
                        )}
                      </TouchableOpacity>
                      {index !== languagesData.length - 1 && <View style={styles.separator} />}
                    </View>
                  ))}
                </View>
              )}
            </View>
            {errors.qualification ? <Text style={{ color: 'red' }}>{errors.qualification}</Text> : null}
            {loading && <ActivityIndicator size="large" color="#fff" />}
            
          </View>

          {successModal && (
            <SuccessModal
              modalVisible={successModal}
              modalClose={() => {
                setSuccessModal(false);
                navigation.goBack();
              }}
              modalText="Imam has been successfully added"
              buttonText="OK"
            />
          )}
          </View>
        </ScrollView>
        <View style={{}}>
          <TouchableOpacity
            onPress={submit}
            disabled={isSubmitting}>
            <View style={styles.buttonContainer}>
              <Text
                style={styles.buttonText}>
                Add Imam
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    // position: 'relative',
    flex: 1,
  },
  cardOne: {
    fontSize:15,
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    width: '90%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#000000'
  },
  DisCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    width: '90%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  phoneField: {
    backgroundColor: '#FFF',
    // borderRadius: 18,
    borderTopRightRadius: 18,
    borderBottomEndRadius: 18,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    width: '70%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  inputPassword: {
    backgroundColor: '#FFF',
    color: '#000000',
    borderRadius: 18,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '400',
    width: '100%',
    lineHeight: 12.9,
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonFavourite4: {
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
  cardTitle: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '500',
    lineHeight: 15.25,
    fontFamily: themeFont.englishFont,
    marginLeft: 25,
    marginBottom: 0,
    marginTop: 10,
  },
  qualifyContainer: {
    // width: '100%',
  },
  Text: {
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontSize: 14,
    color: '#202020',
  },
  dropdownContainer: {
    backgroundColor: 'transparent',
    marginTop: 5,
    width: '90%', 
    maxHeight: 250, 
    overflow: 'hidden',
    alignSelf: 'center',
  },
  option: {
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropContainer: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingLeft: 10,
    paddingRight: 30,
    marginTop: 5,
    marginBottom: 5,
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    width: '100%',
    lineHeight: 12,
  },
  langContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 10,
    gap: 10,
    width: '90%',
    flexWrap: 'wrap'
  },
  langTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.34)',
    color: '#fff',
    alignItems: 'center',
    alignSelf: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    marginVertical: 2, 
    width: '90%',
    alignSelf: 'center'
  },
  buttonContainer: {
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'center',
    backgroundColor: '#3DC8B2',
    marginTop: 20,
    maxWidth: '100%',
    marginBottom: 50,
    // position: 'absolute',
    // bottom: 20,
    // left: 20,
    // right: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: themeFont.englishFont
  },
});

export default AddImam;