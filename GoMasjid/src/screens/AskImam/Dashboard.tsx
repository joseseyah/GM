import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Share,
  BackHandler,
  Platform,
} from 'react-native';
import { UserContext } from '../../context/UserProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Accordion from '../../common/Accordion';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { themeFont } from '../../styles/theme';
import HamburgerHeader from '../../common/HamburgerHeader';
import { useFocusEffect } from '@react-navigation/native';
import { getImaam, getUserQuestions } from '../../services/api';
import { FaqCategories } from '../../common/meta/FAQCategories';
import SidebarMenu from '../../components/sidebar/SidebarMenu';
import useSidebar from '../../hooks/useSidebar';
import { useSidebarVisibility } from '../../context/SidebarContext';

const Dashboard = ({ props, route, navigation }: any) => {
  const [imamData, setImaamData] = useState<any>();
  const { userInfo, updateUserInfo } = useContext(UserContext);
  const [userQuestionsData, setUserQuestionsData] = useState<any>([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  const handleLoginNavigation = () => {
    navigation.navigate('AuthStack');
  };

  // useEffect (() => {
  //   updateUserInfo({...userInfo, FollowedImamId: 3});
  //   console.log(userInfo?.FollowedImamId)
  // });

  useFocusEffect(
    React.useCallback(() => {
      const fetchImam = async () => {
        if (userInfo?.FollowedImamId) {
          // console.log(userInfo?.FollowedImamId, "imam id");
          const imaam = await getImaam(parseInt(userInfo?.FollowedImamId));
          console.log(imaam, "imam");
          setImaamData(imaam);
          updateUserInfo({...userInfo, followingImamData: imaam});
          // console.log("updatea imama", userInfo);
        }
      };
      fetchImam();
    }, [userInfo?.FollowedImamId])
  );

  useEffect(() => {
    const fetchData = async () => {
      if(userInfo?.userId) {
        const questions = await getUserQuestions(userInfo?.userId, userInfo.userToken);
        console.log(questions, "quesj");
        if(questions) {
        setUserQuestionsData(questions);
        } else {
          setUserQuestionsData([]);
        }
      }
    };
    fetchData();
  }, []);

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

  // // Use the sidebar hook
  const { isSidebarVisible, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
  const { setVisible } = useSidebarVisibility();
  
  // Handle back button press to close sidebar if open
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isSidebarVisible) {
          closeSidebar();
          return true;
        }
        return false;
      };

      const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        backHandlerSubscription.remove();
    }, [isSidebarVisible, closeSidebar])
  );

  useEffect(() => {
    setVisible(isSidebarVisible);
  }, [isSidebarVisible]);
  
  return (
    <>
    <SidebarMenu isVisible={isSidebarVisible} onClose={closeSidebar} />
    <View style={styles.maincontainer}>
      <HamburgerHeader
        title="Ask Imam"
        titleColor="#000"
        icon="black"
        toggleSidebar={() => {
          toggleSidebar();
        }}
      />
      <View>
        <View
          style={{
            borderRadius: 15,
            backgroundColor: '#4617A9',
            paddingBottom: 12,
            paddingHorizontal: 15,
            gap: 5,
          }}>
          <View style={styles.card}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                {imamData ? (
                  <>
                    <Image
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 41.37,
                        borderWidth: 1,
                        borderColor: '#FFF',
                      }}
                      source={{ uri: imamData?.profile_picture_url, cache: 'force-cache' }}
                      resizeMode="cover"
                    />
                    <View>
                      <Text
                        style={{
                          color: '#FFF',
                          fontSize: 12.5,
                          fontWeight: '600',
                          lineHeight: 18.28,
                          letterSpacing: 0.09,
                          marginLeft: 10,
                          marginTop: 5,
                          textTransform: 'capitalize',
                        }}>
                        Ask Imam {imamData.imam_name}
                      </Text>
                      <Text
                        style={{
                          color: '#C7C7C7',
                          fontSize: 10,
                          lineHeight: 11.7,
                          fontFamily: themeFont.englishFont,
                          marginLeft: 10,
                        }}>
                        {imamData?.masjid_name}
                      </Text>
                      <View style={styles.searchBoxContainer}>
                        <Text
                          style={{
                            color: '#F4F4F4',
                            textAlign: 'right',
                            fontWeight: '500',
                            fontSize: 13,
                            lineHeight: 15.25,
                            fontFamily: themeFont.englishFont,
                          }}>
                          Send your Question
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('AskQuestion', {
                              imamData: imamData
                            })
                          }>
                          <AntDesign
                            name="arrowright"
                            size={20}
                            color="#3DC8B2"
                            style={styles.searchIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : userInfo?.followedMasjid_id && userInfo?.userId ? (
                  <View style={{ width: '100%', paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MasjidStack', { screen: 'Masjid' })}>
                      <Text
                        style={{
                          color: '#F4F4F4',
                          fontSize: 15,
                          fontWeight: '600',
                          lineHeight: 17.6,
                          textAlign: 'center'
                        }}>
                        No Imam present
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : userInfo?.userId ? (
                  <View style={{ width: '100%', paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MasjidStack', { screen: 'Masjid' })}>
                      <Text
                        style={{
                          color: '#F4F4F4',
                          fontSize: 15,
                          fontWeight: '600',
                          lineHeight: 17.6,
                          textAlign: 'center'
                        }}>
                        Follow a mosque
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) :
                  <View style={{ width: '100%', paddingVertical: 10 }}>
                    <Text
                      style={{
                        color: '#F4F4F4',
                        fontSize: 15,
                        fontWeight: '600',
                        lineHeight: 17.6,
                      }}>
                      Want clarity on something?
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '300',
                          fontFamily: themeFont.englishFont,
                          lineHeight: 11.73,
                          color: '#C7C7C7',
                          marginTop: 5,
                        }}>
                        Log in now to enable this feature
                      </Text>
                      <TouchableOpacity onPress={handleLoginNavigation}>
                        <AntDesign
                          name="arrowright"
                          size={24}
                          color={'#3DC8B2'}
                          style={{
                            marginLeft: 20,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>
            </View>
          </View>
        </View>

        <View>
          {imamData && (userInfo?.followedMasjid_id && userInfo?.userId) ?
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                paddingTop: 5,
                paddingLeft: 15,
                paddingBottom: 0,
              }}>
              {/* <Text
                style={{
                  fontFamily: themeFont.englishFont,
                  fontWeight: '400',
                  fontSize: 10,
                  lineHeight: 11.73,
                  color: '#727272',
                  marginTop: 5,
                }}>
                Choose a different imam?
              </Text> */}
              <TouchableOpacity
              onPress={() => navigation.navigate('ChangeImam')}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    fontFamily: themeFont.englishFont,
                    fontWeight: '400',
                    fontSize: 10,
                    lineHeight: 11.73,
                    color: '#727272',
                    marginTop: 5,
                  }}>
                  Choose a different imam
                </Text>
              </TouchableOpacity>
            </View>
            : null}
        </View>

      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 30,
            marginHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: themeFont.englishFont,
              fontWeight: '600',
              fontSize: 15,
              lineHeight: 17.6,
              color: '#202020',
            }}>
            Frequently Asked Questions
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <Text
              style={{
                color: '#3DC8B2',
                fontWeight: '500',
                fontSize: 10,
                fontFamily: themeFont.englishFont,
                lineHeight: 12,
                alignSelf: 'center',
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
          style={{
            marginBottom: 20,
            marginHorizontal: 10,
            marginTop: -10,
          }}>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            {FaqCategories &&
              FaqCategories.map((faq: any, index: number) => (
                <View key={`faq-${index}`}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(faq.route)}
                    >
                    <View style={{
                      backgroundColor: '#FFF',
                      width: 48,
                      height: 48,
                      borderRadius: 27.2,
                      marginBottom: 10
                    }}>
                      {faq.imgSrc ? (
                        <Image
                          source={faq.imgSrc}
                          resizeMode="cover"
                          style={styles.faqImg}/>
                      ) : ( faq.iconSet === 'MaterialCommunityIcons' ? (
                        <MaterialCommunityIcons
                          name={faq.iconName}
                          color={faq.iconColor}
                          size={faq.iconSize}
                          style={styles.faqIcon}
                        />
                      ) : ( faq.iconSet === 'MaterialIcons' ? (
                        <MaterialIcons
                          name={faq.iconName}
                          color={faq.iconColor}
                          size={faq.iconSize}
                          style={styles.faqIcon}
                        />
                      ) : (
                        <FontAwesome5
                          name={faq.iconName}
                          color={faq.iconColor}
                          size={faq.iconSize}
                          style={styles.faqIcon}
                        />
                      )))}
                    </View>
                    <View>
                      <Text style={styles.iconTitle}>{faq.title}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
          
        </ScrollView>

        {imamData ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              marginBottom: 10,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: themeFont.englishFont,
                fontWeight: '600',
                fontSize: 15,
                lineHeight: 17.6,
                color: '#202020',
              }}>
              Your Questions
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserQuestions');
              }}>
              <Text
                style={{
                  color: '#3DC8B2',
                  fontWeight: '500',
                  fontSize: 10,
                  fontFamily: themeFont.englishFont,
                  lineHeight: 11.73,
                  alignSelf: 'center',
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {userQuestionsData.length == 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#c1c1c1',
              }}>
              No Questions yet
            </Text>
          </View>
        )}
        {userQuestionsData.length > 0 && ( userQuestionsData?.map((data: any, index: number) => (
          <View style={styles.accordionContainer} key={data.id}>
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
                <Text style={styles.accordionInnerText}>Question:&nbsp;{data.question_text}</Text>
              </View>
              <View style={styles.card1}>
                <Text
                  style={{
                    fontSize: 11,
                    color: '#727272',
                    fontFamily: themeFont.englishFont,
                    fontWeight: '400',
                    lineHeight: 14.3,
                  }}>
                    {(data?.answer != null) ? data.answer : "Waiting for Imam to respond"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                {(data?.answer != null) ?
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '400',
                      lineHeight: 11.73,
                      color: '#4617A9',
                      textTransform: 'capitalize',
                    }}>
                    {`Answered by Imam ${data?.imam_name || ''
                      }`}
                  </Text> : <Text></Text>}
                <TouchableOpacity
                  onPress={() =>
                    shareQuestionAnswer(
                      data.title,
                      data.question_text,
                      data?.answer,
                    )
                  }>
                  <Fontisto name="share-a" size={14} color={'#3DC8B2'} style={{ textAlign: 'right', }} />
                </TouchableOpacity>
              </View>
            </Accordion>
          </View>
        ))
      )}
      </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  card: {
    marginTop: 10,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  card1: {
    // backgroundColor: '#FFFFFF',
    marginTop: -10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 15,
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
  },
  NextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    borderRadius: 15,
    backgroundColor: '#8352EC',
    width: '50%',
    paddingVertical: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    // height: 59,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 10,
    justifyContent: 'center',
  },
  searchIcon: {
    marginLeft: 10,
  },
  accordionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA40',
    marginHorizontal: 10,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitleText: {
    fontFamily: themeFont.englishFont,
    fontSize: 13,
    color: '#585858',
    fontWeight: '500',
    lineHeight: 15.25,
    letterSpacing: -0.25,
  },
  accordionContent: {
    paddingTop: -10,
    paddingBottom: 5,
  },
  accordionInnerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 11,
    color: '#585858',
    fontWeight: '500',
    lineHeight: 14.3,
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
    // lineHeight: 12,
    color: '#000',
  }
});

export default Dashboard;