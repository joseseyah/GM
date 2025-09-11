import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import Accordion from '../../common/Accordion';
import Header from '../../common/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { themeFont } from '../../styles/theme';
import { useFocusEffect } from '@react-navigation/native';
import { getImaam, getUserQuestions } from '../../services/api';
import { UserContext } from '../../context/UserProvider';
const {height, width} = Dimensions.get('window');

const UserQuestions = ({ props, route, navigation }: any) => {
  const [QuestionData, setQuestionData] = useState([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const { userInfo } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserQuestion = async () => {
        const questions = await getUserQuestions(userInfo?.userId, userInfo.userToken);
        setQuestionData(questions);
      };
      fetchUserQuestion();
    }, [])
  );

  const shareQuestionAnswer = async (title: any, question: any, answer: any) => {
    try {
      await Share.share({
        message: `Title:${title}\n\nQuestion: ${question}\n\nAnswer: ${answer}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const goToConversation = async (questionId: number, imam_id: string) => {
    let profileData = {};
    if(imam_id == userInfo.FollowedImamId) {
      profileData = {
        id: userInfo.followingImamData?.imam_id,
        name: userInfo.followingImamData?.imam_name,
        img: userInfo.followingImamData?.profile_picture_url,
        masjid_name: userInfo.followingImamData?.masjid_name,
      }
    } else {
      const imaam = await getImaam(parseInt(imam_id));
      profileData = {
        id: imaam.imam_id,
        name: imaam.imam_name,
        img: imaam.profile_picture_url,
        masjid_name: imaam.masjid_name,
      }
    }
    navigation.navigate('ConversationScreen', {
      question_id: questionId,
      profileData: profileData,
    });
  };
  
  return (
    <>
      <View style={styles.maincontainer}>
        <Header
          title="Your Questions"
          onBack={() => navigation?.goBack()}
          titleColor='#000'
        />

        <ScrollView contentContainerStyle={{paddingBottom: 200}} style={{
            marginBottom: 20,
            marginHorizontal: 10
          }}>
          {QuestionData.length > 0 ? (
            QuestionData.map((data: any, index: number) => (
              <View style={styles.accordionContainer} key={`quest-${index}`}>
                <Accordion
                  title={
                    <View style={styles.accordionTitleContainer}>
                      <Text style={styles.accordionTitleText}>
                        {data.title}
                      </Text>
                    </View>
                  }
                  isOpen={openAccordionIndex === index}
                  onToggle={() => handleAccordionToggle(index)}
                >
                  <View style={styles.accordionContent}>
                    <Text style={styles.accordionInnerText}>
                    Question: {data.question_text}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.answerText}>
                      {(data?.answer != null) ? data.answer : "Waiting for Imam to respond"}
                    </Text>
                  </View>

                  <View style={{marginBottom: 15, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <View>
                      {(data?.answer != null) &&
                        <View style={{flexDirection: 'row'}}>
                          <Text style={[styles.answerText, {color:'#4617A9'}]}>Answered by </Text>
                          <Text style={[styles.answerText, {color:'#4617A9'}]}>
                            {data.imam_name}
                          </Text>
                        </View>
                      }
                    </View>
                          
                    <TouchableOpacity
                      onPress={() =>
                        shareQuestionAnswer(
                          data.title,
                          data.question_text,
                          data?.answer,
                        )
                      }>
                      <Fontisto name="share-a" size={14} color={'#3DC8B2'} style={{  }} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={styles.SubmitButton} 
                    // onPress={() => navigation.navigate('ConversationScreen', {
                    //   question_id: data.id, profileData: profileData
                    // })}>
                    onPress={() => goToConversation(data.id, data.imam_id)}>
                    <View
                      style={{
                        shadowRadius: 2,
                        borderRadius: 13,
                        paddingHorizontal: 50,
                        paddingVertical: 10,
                        alignSelf: 'center',
                        backgroundColor: '#4617A9',
                        width: '100%',
                        marginVertical: 20,
                      }}>
                      <Text
                        style={{
                          color: '#F4F4F4',
                          alignSelf: 'center',
                          fontSize: 14,
                          fontWeight: '700',
                          lineHeight: 20,
                        }}>
                        View Conversation
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Accordion>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>
              No data available.
            </Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  accordionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA40',
    // marginHorizontal: 10,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  accordionTitleText: {
    fontFamily: themeFont.englishFont,
    fontSize: 13,
    color: '#585858',
    fontWeight: '500',
    lineHeight: 15.25,
    letterSpacing: -0.25,
    textAlign: 'justify',
  },
  accordionContent: {
    paddingTop: -10,
  },
  accordionInnerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 11,
    color: '#585858',
    fontWeight: '400',
    lineHeight: 14.3,
    textAlign: 'justify',
  },
  answerText: {
    fontSize: 11,
    color: '#727272',
    fontFamily: themeFont.englishFont,
    fontWeight: '400',
    lineHeight: 14.3,
    marginTop:5
  },
  noDataText: {
    fontFamily: themeFont.englishFont,
    fontSize: 12,
    color: '#C7C7C7',
    textAlign: 'center',
    marginVertical: 35,
  },
  selectedCategoryIcon: {
    tintColor: '#FFF',
  },
  selectedCategory: {
    backgroundColor: '#3DC8B2',
  },
  faqImg: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 19.1,
    height: 16.73,
    top: 15,
  },
  faqIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    top: 15,
  },
  iconTitle: {
    fontFamily: themeFont.englishFont,
    fontSize: 10,
    fontWeight: '500',
    alignSelf: 'center',
    lineHeight: 10
  },
  catContainer: {
    backgroundColor: '#FFF',
    width: 48,
    height: 48,
    borderRadius: 27.2,
    marginBottom: 10
  },
  SubmitButton: {
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
    borderTopColor: '#AAAAAA40',
    borderTopWidth: 1,
  },
});

export default UserQuestions;