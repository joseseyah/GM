import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { themeFont } from '../styles/theme';
import moment from 'moment';
import { UserContext } from '../context/UserProvider';

const Conversation = ({ messages }: any) => {
  const { userInfo } = useContext(UserContext);

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, []);

  const renderMessage = (message: any) => {
    const isUser = message.role === userInfo.role;

    return (
      <View
        key={message.conversation_id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.otherMessage
        ]}
      >
        <View style={styles.userMessage}>
          <View
            style={[
              styles.messageBubble,
              isUser ? styles.userBubble : styles.otherBubble
            ]}
          >
            <Text style={isUser ? styles.userText : styles.otherText}>
              {message.message}
            </Text>
          </View>
          <View style={isUser ? styles.userTail : styles.otherTail} />
        </View>
        <Text style={[styles.timestamp,{alignSelf: isUser? 'flex-end': 'flex-start' }]}>{moment(message.created_at).fromNow()}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
    >
      {messages.map(renderMessage)}
      {/* {messages.map(renderMessage).reverse()} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    // paddingHorizontal: 20,
    paddingVertical: 10
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '85%',
  },
  messageBubble: {
    borderRadius: 15,
    padding: 15,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  userText: {
    color: 'black',
    fontSize: 14,
    fontFamily: themeFont.englishFont,
    lineHeight: 20,
    fontWeight: Platform.OS === 'ios' ? '500' : '600'
  },
  otherText: {
    color: 'white',
    fontSize: 14,
    fontFamily: themeFont.englishFont,
    lineHeight: 20
  },
  timestamp: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 5,
    fontFamily: themeFont.englishFont,
    marginRight: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    position: 'relative',
    marginRight: 15,
  },
  userBubble: {
    backgroundColor: '#FFF',
    borderBottomRightRadius: 0,
    padding: 12,
    maxWidth: '80%',
    position: 'relative',
    borderColor: '#E5E5EA',
    borderWidth: 1,
  },
  otherBubble: {
    backgroundColor: '#4C20AA',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  userTail: {
    position: 'absolute',
    right: -7,
    bottom: 0,
    width: 10,
    height: 8,
    backgroundColor: '#FFF',
    // transform: [{ rotate: '90deg' }],
    // borderTopLeftRadius: 15,
    borderColor: '#E5E5EA',
    // borderWidth: 2,
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderTopRightRadius: 10,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
  otherTail: {
    position: 'absolute',
    left: -7,
    bottom: 0,
    width: 10,
    height: 10,
    backgroundColor: '#4C20AA',
    // borderBottomLeftRadius: 15,
    transform: [{ rotate: '90deg' }],
    borderBottomLeftRadius: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
});

export default Conversation;