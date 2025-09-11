import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import {themeFont} from '../../styles/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../common/Header';
import {getImamQuestions, imamAnswerQuestion} from '../../services/api';
import {UserContext} from '../../context/UserProvider';
import { handleDirection } from '../../common/utils';
import SuccessModal from '../../common/SuccessModal';
import Conversation from '../../common/Conversation';

interface Masjid {
  id: number;
  name: string;
  masjid_logo: string;
  unanswered_questions: number;
}

const ImamDashboard = ({navigation, route}: any) => {
  const [selectedMasjid, setSelectedMasjid] = useState(1);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [questions, setQuestions] = useState({});
  const [sendAnsText, setSendAnsText] = useState('');
  const {userInfo,isAuthenticated} = useContext(UserContext);

  const FetchImamQuestions = async () => {
    setLoading(true);
    // fetch questions
    const userToken = userInfo?.userToken;
    const data = await getImamQuestions(userToken);
    const dataa = {
      masjid: [
        {
          id: 1,
          name: 'Oldham Central Masjid and Islamic Centre',
          masjid_logo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          unanswered_questions: 2,
        },
        {
          id: 2,
          name: 'Masjid Name',
          masjid_logo: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          unanswered_questions: 0,
        },
      ],
      questions: {
        '1': [
          {
            question_id: "23",
            question: 'Question Title1',
            description: 'Question discription 1',
            unanswered_questions: true,
            answer: '',
            answer_by_super_admin: false,
          },
          {
            question_id: "24",
            question: 'Question Title 2',
            description: 'Question discription 2',
            unanswered_questions: true,
            answer: '',
            answer_by_super_admin: false,
          },
          {
            question_id: "25",
            question: 'Question Title',
            description: 'Question discription',
            unanswered_questions: false,
            answer: 'Lorem ipsum',
            answer_by_super_admin: true,
            Conversation_user_profile:{
              id: 1,
              name: 'John Doe',
              img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
              masjid_name: "Masjid Name",
            }
          },
        ],
        '2': [
          {
            question_id: "26",
            question: 'Question Title1',
            description: 'Question discription 1',
            unanswered_questions: false,
            answer: 'Lorem ipsum',
            answer_by_super_admin: false,
          },
          {
            question_id: "27",
            question: 'Question Title',
            description: 'Question discription',
            unanswered_questions: false,
            answer: 'Lorem ipsum',
            answer_by_super_admin: false,
          },
        ],
      },
    };
    setMasjids(data.masjid);
    setQuestions(data.questions);
    if (data.masjid && data.masjid.length > 0) {
      // setSelectedMasjid(data.masjid[0].id); // Set to first masjid's ID
      console.log('Selected Masjid ID:', data.masjid[0].id);
    }
    setLoading(false);
  };
  useEffect(() => {
    FetchImamQuestions();
    console.log('Masjid screen mounted');
  }, []);

  useEffect(() => {
    console.log("masjid id: ", route)
    setSelectedMasjid(Number(route?.params?.masjidId));
  }, [route?.params?.masjidId]);

  const handleAnswerImam = async (question_id:any, answer_text: any,index:number, user_profile:any) => {
    let reqData = {
      question_id: question_id,
      answer_text: answer_text
    };
    // console.log('item data', questions[selectedMasjid][index]);
    
    if (isAuthenticated) {
      const userToken = userInfo?.userToken;
      const imamAnswer = await imamAnswerQuestion(reqData, userToken);
      if (imamAnswer) {
        console.log('successfully answered');
        questions[selectedMasjid][index].answer = answer_text;
        questions[selectedMasjid][index].unanswered_questions = false;
        setQuestions({...questions});
        setSendAnsText('');
        setSuccessModal(true);
        navigation.navigate('AskImaamStack', { screen: 'ConversationScreen',params: { question_id: question_id, profileData: user_profile} });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Your Questions" onBack={() => navigation.goBack()} titleColor='#000'/>
      <View style={{flex: 1}}>
        <View style={{height: 150}}> 
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}>
            {masjids.map(masjid => (
              <TouchableOpacity
                key={masjid.id}
                style={[
                  styles.tab,
                  styles.card,
                  selectedMasjid === masjid?.id && styles.selectedTab,
                ]}
                onPress={() => setSelectedMasjid(masjid.id)}>
                {masjid.masjid_logo ? (
                  <Image
                    // source={require('../../assets/images/GM_app_icon.png')}
                    source={{uri: masjid.masjid_logo}}
                    style={styles.masjidLogo}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: '#3DC8B2',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 30,
                        fontWeight: Platform.OS === 'ios' ? '500' : '600',
                        color: '#FFF',
                      }}>
                      {masjid.name.charAt(0)}
                    </Text>
                  </View>
                )}
                <Text style={styles.tabText}>{masjid.name}</Text>
                <View style={styles.questionBadge}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      marginBottom: 38,
                    }}
                    source={
                      masjid.unanswered_questions > 0
                        ? require('../../assets/images/Imamicon_red.png')
                        : require('../../assets/images/Imamicon.png')
                    }
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.questionCount,
                      masjid.unanswered_questions > 0
                        ? styles.redText
                        : styles.greenText,
                    ]}>
                    {masjid.unanswered_questions}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {questions && (
          <View style={{flex: 1}}>
            <FlatList style={{marginBottom: 40}}
              data={questions[selectedMasjid] || []}
              keyExtractor={(item, index) => item.question_id.toString()}
              renderItem={({item, index}) => (
                <View style={styles.questionItem}>
                  <TouchableOpacity
                    onPress={() =>
                      setExpandedQuestion(expandedQuestion === item.question_id ? null : item.question_id)
                    }
                    style={styles.questionHeader}>
                    <Text
                      style={[
                        styles.questionText,
                        item.unanswered_questions
                          ? {color: '#3DC8B2'}
                          : {color: '#474747'},
                      ]}>
                      Question: {item.question}
                    </Text>
                    <AntDesign
                      name={expandedQuestion === item.question_id ? 'up' : 'down'}
                      size={18}
                      color="#00BFA6"
                    />
                  </TouchableOpacity>

                  {expandedQuestion === item.question_id && (
                    <View style={styles.expandedContent}>
                      {item.description !== '' && (
                        <Text style={styles.descriptionText}>
                          {item.description}
                        </Text>
                      )}
                      {item.answer !== '' ? (
                        <>
                          <Text style={styles.answerText}>
                            Answer: {item.answer}
                          </Text>
                          <Text style={styles.answerbyText}>
                            Answered by{' '}
                            {item.answer_by_super_admin ? 'Super Admin' : 'Me'}
                          </Text>
                          <TouchableOpacity
                            style={styles.viewButton}
                            onPress={() => { navigation.navigate('AskImaamStack', { screen: 'ConversationScreen',params: { question_id: item.question_id, profileData: item.conversation_user_profile} }); }}
                          >
                            <Text style={styles.viewButtonText}>
                              View Conversation
                            </Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <TextInput
                            style={styles.input}
                            placeholder="Send answer"
                            placeholderTextColor="#666"
                            value={sendAnsText}
                            onChangeText={setSendAnsText}
                          />
                          <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => handleAnswerImam(item.question_id,sendAnsText,index, item.conversation_user_profile)}>
                            <FontAwesome name="send" size={20} color="#4617A9" />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  )}
                </View>
              )}
            />
          </View>
        )}
      </View>

      {successModal && (
        <SuccessModal
          modalVisible={successModal}
          modalClose={() => {
            setSuccessModal(false);
            // navigation.navigate('EventDashboard', { masjidId: masjidId })
            // navigation.goBack();
          }}
          // onPress={() => navigation.navigate('AskImaamStack', { screen: 'ConversationScreen',params: { question_id: item.question_id, profileData: item.Conversation_user_profile } })}           
          modalText="Your answer has been sent to the user. Thank you!"
          buttonText="See your answer"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    paddingHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 80 : 60
  },
  tabContainer: {
    // flex: 0.3,
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 80,
  },
  tab: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    borderWidth: 2,
    borderColor: '#00BFA6',
  },
  tabText: {
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    color: '#333',
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
  },
  questionItem: {
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#AAAAAA40',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  questionText: {
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontFamily: themeFont.englishFont,
  },
  expandedContent: {marginTop: 10},
  descriptionText: {
    color: '#585858',
    marginBottom: 10,
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '400' : '500',
    position: 'relative',
  },
  answerText: {
    color: '#474747',
    marginBottom: 10,
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '400' : '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    fontFamily: themeFont.englishFont
  },
  card: {
    width: 170,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  masjidLogo: {
    width: 50,
    height: 50,
    marginBottom: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  questionBadge: {
    position: 'absolute',
    top: 5,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionCount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 3,
    // position: 'absolute',
    top: -18,
  },
  redText: {
    color: '#FD2F2F',
  },
  greenText: {
    color: '#3DC8B2',
  },
  answerbyText: {
    color: '#4617A9',
    marginBottom: 10,
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '400' : '500',
  },
  viewButton: {
    backgroundColor: '#4617A9',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
  },
  sendButton: {
    position: 'absolute',
    right: 10,
    bottom: Platform.OS === 'ios' ? 10 : 15,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ImamDashboard;
