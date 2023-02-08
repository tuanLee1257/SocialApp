import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext, useEffect, useState} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AccountScreen from '../screens/AccountScreen';
import NotificationScreen from '../screens/NotificationScreen';

import Colors from '../values/Colors';

import HomeStack from './HomeStack';
import MessagesStack from './MessagesStack';

const Tab = createBottomTabNavigator();

function AppStack(props) {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: () => null,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MessagesStack"
        component={MessagesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="message" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: () => null,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountScreen}
        options={{
          title: () => null,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default AppStack;
