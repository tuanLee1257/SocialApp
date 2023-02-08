import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../values/Colors';

function HomeScreen(props) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          activeOpacity={0.5}
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Feather name="search" size={24} color={Colors.primary} />
          <Text style={{marginLeft: 10}}> Search </Text>
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('NewPostScreen')}
          activeOpacity={0.5}
          style={{marginRight: 20}}>
          <MaterialIcons name="post-add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <View></View>;
}

export default HomeScreen;
