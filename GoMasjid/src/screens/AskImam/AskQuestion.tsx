import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Switch,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import Header from '../../common/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { themeFont } from '../../styles/theme';
import { FaqCategories } from '../../common/meta/FAQCategories';
import Feather from 'react-native-vector-icons/Feather';
import { AskImamQuestion } from '../../services/api';
import SuccessModal from '../../common/SuccessModal';

const AskQuestion = ({props, route, navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<any>();
  const [Question, setQuestion] = useState<string>('');
  const {userInfo} = useContext(UserContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [postquestion, setPostquestion] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [imamData, setImaamData] = useState<any>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const submit = async () => {
    if (!title.trim() || !category || !Question.trim()) {
      setError('Please fill all details');
    } else {
      setLoading(true);
      setError('');
      const scope = toggleCheckBox ? 'public' : 'private'
      let data = {
        questionTitle: title, 
        questionText: Question,
        categoryId: category.id,
        scope: scope,
        imamId: imamData.imam_id,
        user_id: userInfo.userId
      };
      const userToken = userInfo?.userToken;
      // console.log(data);
      const ask = await AskImamQuestion(data,userToken);
      if(ask) {
        setLoading(false);
        setPostquestion(true);
      }
    }
  };

  useEffect(() => {
    if (route.params) {
      setImaamData(route.params.imamData);
    }
  }, [route.params]);

  return (
    <>
      <View style={styles.maincontainer}>
        <Header title="Ask Imam" onBack={() => navigation.goBack()} titleColor='#000'/>
        <ScrollView style={{flex: 1, backgroundColor: '#F5F5F5', marginBottom: 40}}>
          <View
            style={{
              borderRadius: 15,
              backgroundColor: '#4C20AA',
              paddingVertical: 10,
              paddingHorizontal: 20,
              gap: 5,
              height: 75,
            }}>
            <Text
              style={{
                color: '#F4F4F4',
                fontSize: 15,
                fontFamily: themeFont.englishFont,
                lineHeight: 17.6,
                fontWeight: Platform.OS === 'ios' ? '600' : '700',
                maxWidth: 252,
              }}>
              You might find your question in FAQs
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: '#C7C7C7',
                  fontSize: 10,
                  lineHeight: 12,
                  fontWeight: Platform.OS === 'ios' ? '400' : '600',
                }}>
                See public answers by Imams
              </Text>
              <TouchableOpacity
                style={{bottom: 15}}
                onPress={() => navigation.navigate('FAQ')}>
                <AntDesign name="arrowright" size={25} color={'#F4F4F4'} />
              </TouchableOpacity>
            </View>
          </View>

          {imamData ? (
          <View>
            <Image
              source={{ uri: imamData?.profile_picture_url, cache: 'force-cache' }}
              style={{
                width: 72,
                height: 72,
                alignSelf: 'center',
                backgroundColor: '#FFF',
                marginTop: 40,
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
            <Text
              style={{
                alignSelf: 'center',
                color: '#282828',
                fontSize: 20,
                marginTop: 10,
                fontWeight: Platform.OS === 'ios' ? '600' : '700',
                fontFamily: themeFont.englishFont,
                lineHeight: 25,
              }}>Imam {imamData.imam_name}</Text>
            <Text
              style={{
                alignSelf: 'center',
                color: '#727272',
                fontSize: 10,
                fontWeight: Platform.OS === 'ios' ? '400' : '600',
                fontFamily: themeFont.englishFont,
                lineHeight: 11.7,
                marginTop: 6,
              }}>
              {imamData?.masjid_name}
            </Text>
          </View>
          ) : (
            <ActivityIndicator size="small" color="#3DC8B2" />
          )}

          <View style={styles.cardOne}>
            <TextInput
              placeholder="Title for your question"
              placeholderTextColor={'#C7C7C7'}
              value={title}
              onChangeText={t => setTitle(t)}
              style={styles.dropText}></TextInput>
          </View>

          <View style={{marginVertical: 10}}>
            <TouchableOpacity
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              style={styles.dropContainer}>
              <Text style={styles.dropText}>
                {category
                  ? `${category.title}`
                  : 'Select a Category'}
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
                {FaqCategories.map((item, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setCategory(item);
                        setIsDropdownOpen(false);
                      }}
                      style={styles.option}>
                      <Text style={styles.optionText}>{item.title}</Text>
                      {/* {category.id === item.id && (
                        <Feather name="check" size={20} color="#2FA491" />
                      )} */}
                    </TouchableOpacity>
                    {index !== FaqCategories.length - 1 && <View style={styles.separator} />}
                  </View>
                ))}
              </View>
            )}
          </View>  

          <View style={styles.cardthree}>
            <TextInput
              placeholder="Type your question here..."
              placeholderTextColor={'#C7C7C7'}
              value={Question}
              onChangeText={setQuestion}
              style={styles.dropText1}
              multiline
            />
          </View>

          <View style={{maxWidth: 254.65}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
                paddingTop: 8,
                paddingBottom: 8,
              }}>
              <Image
                source={require('../../assets/images/lightBulb.png')}
                style={{width: 22.27, height: 20.97}}
              />
              <Text style={styles.caution}>
                Keep your questions precise and clear.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/lightBulb.png')}
                style={{width: 22.27, height: 20.97}}
              />
              <Text style={styles.caution}>
                Keep in mind your questions are reviewed by our team and then
                sent to the Imam.
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>

            <Text
              style={{
                marginLeft: 10,
                color: '#3DC8B2',
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 20,
              }}>
              Make this question visible to everyone
            </Text>
            <Switch
              value={toggleCheckBox}
              onValueChange={c => setToggleCheckBox(c)}
              trackColor={{false: '#767577', true: '#3DC8B2'}} // Custom colors for the track
              thumbColor={isSwitchEnabled ? '#FFF' : '#FFF'} // Custom color for the thumb
              ios_backgroundColor="#3e3e3e" // Background color for iOS
              style={styles.switch}
            />
          </View>
          {error ? (
            <Text
              style={{
                color: '#FD2F2F',
                fontFamily: themeFont.englishFont,
                fontSize: 13,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              {error}
            </Text>
          ) : null}

          {loading && <ActivityIndicator size="large" color="#fff" />}
          <View>
            <TouchableOpacity style={styles.sendBtn} onPress={submit}>
              <View
                style={{
                  borderRadius: 13,
                  backgroundColor: '#4C20AA',
                  paddingVertical: 11,
                  paddingHorizontal: 20,
                  gap: 5,
                }}>
                <Text style={styles.sendBtnText}>Send Question</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {postquestion && (
        <SuccessModal
          modalVisible={postquestion}
          modalClose={() => {
            setPostquestion(false);
            navigation.goBack();
          }}
          // modalTitle="Thank you"
          modalText="Your question has been sent to the Imam. Please, wait for the imam to respond."
          buttonText="See my questions"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  cardOne: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 5,
    marginTop: 20,
    marginBottom: 5,
    color: '#C7C7C7',
    fontSize: 12,
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    transform: [{scale: Platform.OS === 'ios' ? 0.5 : 1}] // Scale down the Switch to 70% of its original size
  },
  dropText: {
    color: '#727272',
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    marginLeft: 17,
    width: '100%',
    lineHeight: 12.9,
    fontFamily: themeFont.englishFont,
  },
  caution: {
    fontFamily: themeFont.englishFont,
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    lineHeight: 13.18,
    color: '#C7C7C7',
  },
  cardthree: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    paddingHorizontal: 15,
  },
  dropText1: {
    color: '#727272',
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    width: '100%',
    lineHeight: 12.9,
    fontFamily: themeFont.englishFont,
  },
  sendBtn: {
    marginTop: 30,
    borderRadius: 13,
    alignItems: 'center',
    alignSelf: 'center',
  },
  sendBtnText: {
    color: '#F4F4F4',
    fontSize: 16.63,
    lineHeight: 19.96,
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
    borderRadius: 25,
    padding: 20,
  },
  button: {
    marginTop: 15,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F4F4F4',
    fontSize: 16.63,
    fontWeight: '700',
    textAlign: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    marginTop: 5,
    maxHeight: 200, 
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: 10
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
    marginVertical: 5,
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    color: '#727272',
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    width: '100%',
    lineHeight: 12,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    marginVertical: 2, 
    alignSelf: 'center'
  },
});

export default AskQuestion;