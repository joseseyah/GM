import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Platform, Image } from 'react-native';
import { themeFont } from '../../styles/theme';
import Conversation from '../../common/Conversation';
import ProfileConversation from '../../common/ProfileConversation';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../context/UserProvider';
import { getQuestionConversation, sendConversationMsg } from '../../services/api';
import Header from '../../common/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AlertModal from '../../common/AlertModal';

const ConversationScreen = ({ props, route, navigation }: any) => {
  const [questionId, setQuestionId] = useState<number>();
  const [messages, setMessages] = useState<any>([]);
  const [profile, setProfile] = useState<any>();
  const { userInfo } = useContext(UserContext);
  const [loadingMsgs, setLoadingMsgs] = useState(true);
  const [msg, setMsg] = useState<string>();
  const [alertModal, setAlertModal] = useState(false);

  useEffect(() => {
    if (route?.params?.question_id) {
      setQuestionId(route.params.question_id);
      setProfile(route.params.profileData);
    }
  }, [route?.params?.question_id, route.params.profileData]); 

  useFocusEffect(
    React.useCallback(() => {
      setLoadingMsgs(true);
      const fetchConversation = async () => {
        if (!questionId) return; 
        const conversation = await getQuestionConversation(questionId, userInfo?.userToken);
        setMessages(conversation?.conversation || []);
        setLoadingMsgs(false);
      };
      fetchConversation();
    }, [questionId])
  );

  const sendMsg = async () => {
    if(msg != '') {
      let data = {
        question_id: questionId, 
        sender_id: userInfo.userId,
        message: msg,
        role: userInfo.role
      };
      const userToken = userInfo?.userToken;
      // console.log(data);
      const ask = await sendConversationMsg(data,userToken);
      if(ask) {
        const newReply = {
          conversation_id: Date.now().toString(), // Temporary ID
          created_at: Date.now(), 
          message: msg,
          role: userInfo.role, 
          sender_id: userInfo?.userId 
        };
        setMessages((prev: any) => [...prev, newReply]);
        setMsg('');
      }
    }
  }

  const reportUser = async () => {
    navigation.navigate('ImamDashboardStack', { screen: 'ReportUser', params: { profileData: profile, questionId: questionId } }) 
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
      <Header title={userInfo.role === 'imam' ? `Question#${questionId}` : "Ask Imam"} onBack={() => navigation.goBack()} titleColor='#000'/>
      {userInfo.role === 'imam' && (
        <TouchableOpacity style={styles.headerstyle} onPress={() => setAlertModal(true)}>
          <MaterialIcons name="report-gmailerrorred" size={20} color="#FD2F2F" />
        </TouchableOpacity>
      )}

      <ProfileConversation profile={profile} />

      {loadingMsgs ? (
        <Text>Loading...</Text>
      ) : messages.length > 0 ? (
        <Conversation messages={messages} />
      ) : (
        <Text>No Conversation</Text>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder={userInfo.role === 'imam' ? "Send answer" : "Ask question"}
          placeholderTextColor="#A0A0A0"
          value={msg}
          onChangeText={setMsg}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMsg}>
          <FontAwesome name="send" size={20} color="#3DC8B2" />
        </TouchableOpacity>
      </View>

      {alertModal && (
        <AlertModal
          modalVisible={alertModal}
          modalClose={() => {
            setAlertModal(false);
          }}
          modalText="Are you sure you want to report this user?"
          buttonText1="Yes"
          buttonText2="Cancel"
          actionHandle={() => {
            reportUser(); 
          }}
        />
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  secondContainer: {
    marginBottom: Platform.OS === 'ios' ? 100 : 60,
    position: 'relative',
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    // backgroundColor: '#FFF',
    // borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // marginRight: 10,
    fontSize: 16,
    fontFamily: themeFont.englishFont
  },
  sendButton: {
    // backgroundColor: '#FFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: themeFont.englishFont
  },
  headerstyle: {
    position: 'absolute',
    right: 10,
    top: Platform.OS === 'ios' ? 40 : 10,
    padding: 20
  }
});

export default ConversationScreen;