import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import HomeScreen from '../screens/HomeScreen';
import NewPostScreen from '../screens/NewPostScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        title: () => null,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
