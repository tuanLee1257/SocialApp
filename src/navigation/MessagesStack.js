import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChatScreens from '../screens/ChatScreens';
import MessagesScreen from '../screens/MessagesScreen';

const Stack = createStackNavigator();

function MessagesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="MessagesScreen"
      screenOptions={{
        title: () => null,
      }}>
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreens} />
    </Stack.Navigator>
  );
}

export default MessagesStack;
