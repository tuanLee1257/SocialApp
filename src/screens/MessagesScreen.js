import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';

import {AuthContex} from '../navigation/AuthProvider';

import Contact from '../components/Contact';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {database} from '../firebase/firebaseConfig';
import {getContactInfo} from '../firebase/channels';

function MessagesScreen(props) {
  const {user, setUser} = useContext(AuthContex);
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Recent Chats',
      headerTitleStyle: {
        color: Colors.textPrimary,
      },
    });
  }, []);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'channels');
    const q = query(
      collectionRef,
      where('members', 'array-contains', user.uid),
    );

    const unsubribe = onSnapshot(q, snapShot => {
      snapShot.docs.map(async doc => {
        const userProfile = await getContactInfo(doc.data().members, user);

        contacts.push({
          contactId: doc.id,
          createAt: doc.data().createAt,
          username: doc.data().name,
          profile_picture: doc.data().image,
          members: doc.data().members,
          user: userProfile,
        });
      });
    });
    return unsubribe;
  }, []);

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen', {contact: item})}>
            <Contact contact={item.user} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default MessagesScreen;
