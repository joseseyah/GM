import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  ImageBackground,
  Platform,
} from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {UserContext} from '../../context/UserProvider';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { themeFont } from '../../styles/theme';
import Header from '../../common/Header';
import { uploadImage } from '../../services/s3Upload';
import { addMasjidEvent } from '../../services/api';
import SuccessModal from '../../common/SuccessModal';

const {height, width} = Dimensions.get('window');
const AddEvent = ({route, props, navigation}: any) => {
  const {userInfo} = useContext(UserContext);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organiserName, setOrganiserName] = useState('');
  const [speakers, setSpeakers] = useState([
    { img_url: '', name: '' }
  ]);
  const [masjidId, setMasjidId] = useState<number>();

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    organiserName: '',
  });
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [evntdate, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startTimeStr, setStartTimeStr] = useState('');
  const [endTimeStr, setEndTimeStr] = useState('');
  const [startTimeStr24, setStartTimeStr24] = useState('');
  const [endTimeStr24, setEndTimeStr24] = useState('');
  const [eventDateString, setEventDateString] = useState('');
  const [speakerImages, setSpeakerImages] = useState<string[]>(['']);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' | 'time'
  const [selectedField, setSelectedField] = useState('');
  
  useEffect(() => {
    setMasjidId(route?.params?.masjidId);
  }, []);

  const createEvent = async () => {
    if (
      validatetitle() ||
      validatedescription() ||
      validateorganiserName() ||
      Object.values(errors).filter(x => x != '').length > 0
    ) {
      setError('please fill all details');
    } else {
      setLoading(true);
      setError('');
      let reqdata = {
        masjid_id: masjidId, 
        user_id: userInfo?.userId, 
        title: title, 
        description: description, 
        organiser_name: organiserName, 
        speakers: JSON.stringify(speakers), 
        picture: selectedImage, 
        date: evntdate, 
        start_time: startTimeStr24, 
        end_time: endTimeStr24
      };
      
      // console.log("data", reqdata);
      const userToken = userInfo?.userToken;
      if (masjidId !== undefined) {
        const event = await addMasjidEvent(masjidId, reqdata,userToken);
        if(event) {
          setLoading(false);
          setSuccessModal(true);
        }
      }
    }
  };

  const handleChangeArrayData = (key: string, value: string, index: number) => {
    setSpeakers(prevSpeakers =>
      prevSpeakers.map((speaker, i) =>
        i === index ? { ...speaker, [key]: value } : speaker
      )
    );
  };

  const addSpeakers = () => {
    setSpeakers(prevSpeakers => [
      ...prevSpeakers,
      {img_url: '',name: ''}
    ]);
  };
 
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
      const fileName = `event_${masjidId}_${file.fileName}`;

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

  const validatetitle = () => {
    if (title.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        title: 'Please Enter the Event Name',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, title: ''}));
      return false;
    }
  };
  const validatedescription = () => {
    if (description.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        description: 'Please Enter Description details',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, description: ''}));
      return false;
    }
  };

  const validateorganiserName = () => {
    if (organiserName.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        organiserName: 'Please Enter organiser Name',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, organiserName: ''}));
      return false;
    }
  };

  const validatedate = () => {
    if (eventDateString == '') {
      setErrors(prevState => ({
        ...prevState,
        date: 'Please Enter A Date for Event',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, date: ''}));
      return false;
    }
  };

  const validatestart_time = () => {
    if (startTimeStr == '') {
      setErrors(prevState => ({
        ...prevState,
        start_time: 'Please Enter Start Time of Event',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, start_time: ''}));
      return false;
    }
  };

  const validateend_time = () => {
    if (endTimeStr == '') {
      setErrors(prevState => ({
        ...prevState,
        end_time: 'Please Enter End Time of Event',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, end_time: ''}));
      return false;
    }
  };

  const validatespeakers = () => {
    const updatedSpeakers = speakers.map((speaker: { name: string; }) => {
      if (speaker.name.trim() === '') {
        return {
          ...speaker,
          error: 'Please Enter Speaker Name and Image',
        };
      } else {
        return {
          ...speaker,
          error: '',
        };
      }
    });
  };

  const selectSpeakerImage = (index: number) => {
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
      const fileName = `speaker_${masjidId}_${file.fileName}`;
      
      if(file) {
        try {
          setIsUploading(true);
          const data = await uploadImage({
            fileName: fileName,
            uri: file.uri,
            type: file.type
          }, Number(masjidId));
          
          const updatedImages = [...speakerImages];
          updatedImages[index] = data;
          setSpeakerImages(updatedImages);

          setSpeakers(prevSpeakers =>
            prevSpeakers.map((speaker, i) =>
              i === index ? { ...speaker, img_url: data } : speaker
            )
          );
          setIsUploading(false);
            
        } catch (error) {
          // console.error("Upload failed", error);
        }
      }
    });
  };

  const handleDateChange = (event: any, selectedValue?: Date, field?: string ) => {
    const currentField = field || selectedField;
    if (selectedValue) {
      if (currentField === 'date') {
        setDate(selectedValue);
        setEventDateString(selectedValue.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
      } else if (currentField === 'startTime') {
        setStartTime(selectedValue);
        setStartTimeStr24(selectedValue.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        setStartTimeStr(selectedValue.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      } else if (currentField === 'endTime') {
        setEndTime(selectedValue);
        setEndTimeStr24(selectedValue.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        setEndTimeStr(selectedValue.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      }
    }
    // setShowPicker(false); // Close modal after selection
  };

  const showPickerModal = (field: any, mode: any) => {
    setSelectedField(field);
    setPickerMode(mode);

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: (field === 'date') ? evntdate : (field === 'startTime' ? startTime : endTime),
        mode: mode,
        display: field === 'date' ? 'calendar' : 'clock',
        // onChange: handleDateChange,
        onChange: (event, selectedValue) => handleDateChange(event, selectedValue, field),
        minimumDate: field === 'date' ? new Date() : undefined,
      });
    } else {
      setShowPicker(true);
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/masjidAdminBackground.png')}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Header
          title="Add Event"
          titleColor="#FFF"
          iconColor="#FFF"
          onBack={() => navigation?.goBack()}
        />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(42, 42, 42, 0.5)']}
            start={{x: 0.05, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.buttonFavourite3}>
            {selectedImage && (
              <Image
                source={{uri: selectedImage}}
                style={{
                  width: '100%',
                  height: 128,
                  marginBottom: 20,
                  borderRadius: 20,
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
                style={{justifyContent: 'center', alignSelf: 'center'}}
              />
              <Text style={styles.buttonFavouriteText}>Upload Event Image</Text>
            </TouchableOpacity>
          </LinearGradient>
          {isUploading && <ActivityIndicator size="small" color="#FFF" />}
        </View>

        <ScrollView style={{height: '100%', flex: 1}}>
          <View style={styles.container1}>
            <Text style={[styles.eventTitle]}>Title</Text>
            <View style={styles.cardOne}>
              <TextInput
                value={title}
                onChangeText={value => setTitle(value)}
                placeholder="What is the name of your event?"
                placeholderTextColor={'#C7C7C7'}
                style={styles.dropText}
                autoFocus={true}
                onBlur={validatetitle}
              />
            </View>
            {errors && errors.title !== '' && (
              <Text style={styles.error}>{errors.title}</Text>
            )}
            <Text
              style={[styles.eventTitle]}>
              Description
            </Text>
            <View style={styles.DisCard}>
              <TextInput
                value={description}
                onChangeText={value => setDescription(value)}
                placeholder="What is your event about?"
                placeholderTextColor={'#C7C7C7'}
                style={styles.dropText}
                multiline={true}
                keyboardType="default"
                onBlur={validatedescription}
              />
            </View>
            {errors && errors.description !== '' && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <SafeAreaView style={[styles.container2, {marginTop: 20}]}>
              <View style={styles.gridContainer}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => { setSelectedField('date'); showPickerModal('date', 'date')}}>
                    <MaterialCommunityIcons
                      name="calendar"
                      size={23}
                      color="#3DC8B2"
                      style={{marginTop: 8}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { setSelectedField('date'); showPickerModal('date', 'date')}}>
                  <Text style={[styles.date,{marginLeft:3}]}>Date</Text>
                </TouchableOpacity>
                
                <View style={styles.inputContainer}>
                  <TouchableOpacity onPress={() => { setSelectedField('date'); showPickerModal('date', 'date')}}>
                    <TextInput
                      style={styles.input1}
                      value={eventDateString}
                      onBlur={validatedate}
                      placeholder="--/--/----"
                      placeholderTextColor="#C7C7C7"
                      onPress={() => showPickerModal('date', 'date')}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
            {errors && errors.date !== '' && (
              <Text style={styles.error}>{errors.date}</Text>
            )}

            <SafeAreaView style={styles.container2}>
              <View style={styles.gridContainer}>
                <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => showPickerModal('startTime', 'time')}>
                    <MaterialCommunityIcons
                      name="clock-time-three"
                      size={23}
                      color="#3DC8B2"
                      style={{marginTop: 8}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => showPickerModal('startTime', 'time')}>
                  <Text style={[styles.date, //{marginLeft: 15}
                  ]}>
                    Starting Time
                  </Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                  <TouchableOpacity onPress={() => { showPickerModal('startTime', 'time')}}>
                    <TextInput
                      style={styles.input1}
                      value={startTimeStr}
                      onChange={validatestart_time}
                      placeholder="00:00"
                      placeholderTextColor="#C7C7C7"
                      editable={false}
                      onPress={() => showPickerModal('startTime', 'time')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
            {errors && errors.start_time !== '' && (
              <Text style={styles.error}>{errors.start_time}</Text>
            )}
            <SafeAreaView style={styles.container2}>
              <View style={styles.gridContainer}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => showPickerModal('endTime', 'time')}>
                    <MaterialCommunityIcons
                      name="clock-time-three"
                      size={23}
                      color="#3DC8B2"
                      style={{marginTop: 8}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => showPickerModal('endTime', 'time')}>
                  <Text style={[styles.date, ]}>
                    Ending Time
                  </Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                  <TouchableOpacity onPress={() => showPickerModal('endTime', 'time')}>
                    <TextInput
                      style={styles.input1}
                      value={endTimeStr}
                      onChange={validateend_time}
                      placeholder="00:00"
                      placeholderTextColor="#C7C7C7"
                      editable={false}
                      onPress={() => showPickerModal('endTime', 'time')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            
            </SafeAreaView>
            {errors && errors.end_time !== '' && (
              <Text style={styles.error}>{errors.end_time}</Text>
            )}

            <Text
              style={[styles.eventTitle, {marginTop: Platform.OS === 'ios' ? 20 : 10}]}>
              Organiser Name
            </Text>
            <View style={styles.cardOne}>
              <TextInput
                value={organiserName}
                onChangeText={value =>
                  setOrganiserName(value)
                }
                placeholder="Organiser Name"
                placeholderTextColor="#C7C7C7"
                style={styles.dropText}
                onBlur={validateorganiserName}
              />
            </View>
            {errors && errors.organiserName !== '' && (
              <Text style={styles.error}>{errors.organiserName}</Text>
            )}
            
          </View>

          <View 
          style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: Platform.OS === 'ios' ? 20 : 0
          }}>
            <View style={{marginLeft: 13, marginVertical: 17
            }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 13,
                  fontWeight: '500',
                  lineHeight: 15.25,
                  fontFamily: themeFont.englishFont,
                }}>
                Add Speakers
              </Text>
            </View>
            <View> 
              <TouchableOpacity
                onPress={() => addSpeakers()}>
                  <MaterialCommunityIcons 
                    name="plus"
                    color={'#F4F4F4'}
                    size={25}
                    style={{paddingTop: 15,marginRight: 10}}
                  />
              </TouchableOpacity>
            </View> 
          </View>
          <View  >
          {speakers &&
            speakers.length > 0 &&
            speakers.map((speaker: any, index: any) => (
              <View key={index} style={{flexDirection: 'row',gap: 10,
              alignItems: 'center',}}>
                
                <View>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(42, 42, 42, 0.5)']}
                  start={{x: 0.05, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.buttonFavourite4}>
                  <TouchableOpacity onPress={() => selectSpeakerImage(index)}>
                    <MaterialCommunityIcons
                      name="camera-plus-outline"
                      size={22}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </LinearGradient>
                {speakerImages[index] && (
                  <Image
                    source={{uri: speakerImages[index]}}
                    style={{
                      width: 45,
                      height: 45,
                      marginBottom: 20,
                      top: 5,
                      left: 10,
                      borderRadius: 50,
                      position: 'absolute',
                      bottom: 10,
                      zIndex: -1,
                    }}
                  />
                )}
                {speaker.error !== '' && (
                  <Text style={styles.error}>{speaker.error}</Text>
                )}
                </View>

                <View style={styles.cardthree}>
                  <TextInput
                    style={{marginLeft: 16, fontSize: 13, color: '#787878', paddingVertical: Platform.OS === 'ios' ? 10 : 5}}
                    placeholder="Name of the speaker"
                    // autoFocus={true}
                    onChange={validatespeakers}
                    placeholderTextColor="#C7C7C7"
                    value={speaker.name}
                    onChangeText={value =>
                      handleChangeArrayData('name', value, index)
                    }
                  />
                </View>
              </View>
            ))}
        </View>
        {/* speaker end */}
          {loading && <ActivityIndicator size="large" color="#fff" />}
          <View>
            <TouchableOpacity style={styles.SubmitButton} onPress={createEvent}>
              <View
                style={{
                  borderRadius: 13.05,
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  alignSelf: 'center',
                  backgroundColor: '#3DC8B2',
                }}>
                <Text
                  style={{
                    color: '#F4F4F4',
                    alignSelf: 'center',
                    fontSize: 16.63,
                    fontWeight: '700',
                    lineHeight: 19.96,
                  }}>
                  Add Event
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {successModal && (
            <SuccessModal
              modalVisible={successModal}
              modalClose={() => {
                setSuccessModal(false);
                navigation.navigate('EventsStack', { screen: 'EventDashboard' })
              }}
              modalText="A New Event is Created"
              buttonText="OK"
            />
          )}

          {/* Modal for iOS */}
          {showPicker && Platform.OS === 'ios' && (
            <Modal transparent={true} animationType="slide" visible={showPicker}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Select {selectedField === 'date' ? 'Date' : 'Time'}</Text>
                  <DateTimePicker
                    value={selectedField === 'date' ? evntdate : selectedField === 'startTime' ? startTime : endTime}
                    mode={pickerMode}
                    display="spinner"
                    onChange={handleDateChange}
                    minimumDate={selectedField === 'date' ? new Date() : undefined}
                  />
                  <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.doneButton}>
                    <Text style={styles.doneText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 9,
    marginRight: 5,
    color: 'black',
  },
  buttonContainer: {
    flex: 1,
    height: 40,
  },
  input1: {
    height: '100%',
    paddingHorizontal: 8,
    marginLeft: 5,
    width: '95%',
    color: '#FFF',
    borderRadius: 18.21,
    textAlign: 'right',
  },
  button: {
    width: '90%',
  },

  date: {
    fontFamily: themeFont.englishFont,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 15.25,
    color: '#F4F4F4',
    marginLeft: 10,
  },

  eventTitle: {
    fontFamily: themeFont.englishFont,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 15.25,
    color: '#F4F4F4',
    marginLeft: 25,
    alignSelf: 'flex-start',
  },

  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: '#F5F5F5',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
    flex: 1
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  cardOne: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 20,
    width: '95%',
    height: '8%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  DisCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    width: '95%',
    height: 120,
    alignItems: 'flex-start',
  },
  SubmitButton: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 30,
    position: 'relative'
  },
  dropText: {
    color: '#787878',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12.9,
    width: '90%',
    // fontFamily: themeFont.englishFont,
    fontStyle: 'italic',
  },
  cardthree: {
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 18,
    width: '70%',
  },
  buttonFavouriteText: {
    padding: 10,
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  buttonFavourite3: {
    width: '100%',
    height: 128,
    color: 'black',
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
  },
  buttonFavourite4: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginLeft: 10,
    marginBottom: -15,
    alignItems: 'center',
    justifyContent: 'center',
    top: 5,
  },
  dateTimeText: { fontSize: 18, marginBottom: 10, fontFamily: themeFont.englishFont },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  doneButton: {
    marginTop: 10,
    padding: 10,
  },
  doneText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default AddEvent;