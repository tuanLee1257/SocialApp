import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {windowWidth} from '../utils/Dimentions';
import Colors from '../values/Colors';
import {AuthContex} from '../navigation/AuthProvider';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {database} from '../firebase/firebaseConfig';

import {addContact} from '../firebase/channels';
import Avatar from '../components/Avatar';
import {StyleSheet} from 'react-native';
import {searchUserFirebase} from '../firebase/search';

function SearchScreen(props) {
  const navigation = useNavigation();
  const [inputSearch, setInputSearch] = useState();
  const [searchUser, setSearchUer] = useState([]);
  const {user, setUser} = useContext(AuthContex);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}>
            <MaterialIcons name="arrow-back-ios" size={20} />
          </TouchableOpacity>
          <TextInput
            onChangeText={text => {
              setInputSearch(text);
            }}
            autoFocus={true}
            style={{
              backgroundColor: Colors.screen,
              borderRadius: 17,
              height: 40,
              width: windowWidth * 0.85,
              marginLeft: 10,
              paddingHorizontal: 20,
            }}
          />
        </View>
      ),
    });
  }, []);

  useLayoutEffect(() => {
    searchUserFirebase(setSearchUer, inputSearch, user);
  }, [inputSearch]);

  return (
    <View>
      <FlatList
        data={searchUser}
        renderItem={({item, index}) => (
          <TouchableOpacity key={index} onPress={() => addContact(item, user)}>
            <SearchUser searchUser={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default SearchScreen;

function SearchUser({searchUser}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Avatar uri={searchUser.profile_picture} />
        <View style={{alignSelf: 'center', marginLeft: 20}}>
          <Text style={styles.username}>{searchUser.username}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  underName: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
});
