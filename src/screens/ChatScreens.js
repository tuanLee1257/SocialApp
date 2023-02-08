import {useNavigation} from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {setUserInfomation} from '../firebase/auth';
import {getMessages, sendMessage} from '../firebase/messages';
import {AuthContex} from '../navigation/AuthProvider';

function ChatScreens({route}) {
  const {user, setUser} = useContext(AuthContex);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const contact = route.params.contact;

  useLayoutEffect(() => {
    getMessages(setMessages, contact);
  }, []);

  const onSendMessage = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    sendMessage(messages, contact);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSendMessage(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: user.uid,
        avatar: user.photoURL,
      }}
    />
  );
}

export default ChatScreens;
