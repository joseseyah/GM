import { ActivityIndicator, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/Header'
import { themeFont } from '../../styles/theme';
import { UserContext } from '../../context/UserProvider';
import { userReport } from '../../services/api';
import SuccessModal from '../../common/SuccessModal';
import ProfileConversation from '../../common/ProfileConversation';

const ReportUser = ({route, navigation}: any) => {
  const [reportText, setReportText] = useState('');
  const [errors, setErrors] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);
  const [successModal, setSuccessModal] = useState(false);
  const [questionId, setQuestionId] = useState<number>();
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    if (route?.params?.questionId) {
      setQuestionId(route.params.questionId);
      setProfile(route.params.profileData);
    }
  }, [route?.params?.questionId, route.params.profileData]); 

  const validatMsg = () => {
    if (reportText.trim() === '') {
      setErrors('Please Enter Something');
      return true;
    } else {
      setErrors('');
      return false;
    }
  };

  const sendReport = async () => {
  
    const isValid = validatMsg();
    if (isValid) {
      return;
    }
    setLoading(true);
    const data = {
      reason: reportText,
      question_id: questionId, 
      report_user_id: profile.id
    };
    const userToken = userInfo?.userToken;
    console.log(userToken)
    const update = await userReport(data, userToken);
    if(update) {
      setLoading(false);
      setSuccessModal(true);  
      setErrors('');
      setReportText('');
    }
  }

  return (
    <View style={styles.maincontainer}>
      <Header title="Report User" onBack={() => navigation.goBack()} titleColor='#000'/>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>
            Please tell use why are you reporting this user?
          </Text>
          
          <ProfileConversation profile={profile} />

          <View style={styles.inputField}>
            <TextInput
              value={reportText}
              onChangeText={value =>
                setReportText(value)
              }
              placeholder="Write your reason here..."
              multiline={true}
              placeholderTextColor="#C7C7C7"
              style={styles.textInput}
              onBlur={validatMsg}
            />
          </View>
          
          {errors!== '' && (
            <Text style={styles.error}>{errors}</Text>
          )}
        </View>

        {loading && <ActivityIndicator size="small" color="#000" style={{marginBottom: 10}}/>}
        <View>
          <TouchableOpacity
            onPress={sendReport}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                Send Report
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {successModal && (
        <SuccessModal
          modalVisible={successModal}
          modalClose={() => {
            setSuccessModal(false);
            navigation.navigate('ImamDashboardStack');
          }}
          modalText="This user has been reported."
          buttonText="Okay, go back to questions."
        />
      )}
    </View>
  )
};

export default ReportUser;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  label: {
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    fontSize: 14,
    lineHeight: 15,
    color: '#000',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  inputField: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingHorizontal: 15,
    marginVertical: 10,
    // width: '100%',
    // height: 'auto',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    fontFamily: themeFont.englishFont,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#C7C7C7',
  },
  textInput: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 13,
    width: '90%',
    // fontFamily: themeFont.englishFont,
    fontStyle: 'italic',
    color: '#000',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 10,
  },
  buttonContainer: {
    shadowRadius: 2,
    borderRadius: 11,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#3DC8B2',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: themeFont.englishFont
  },
});