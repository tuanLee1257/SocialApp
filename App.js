import React from 'react';
import {Button} from 'react-native';
import {TextInput} from 'react-native';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Provider from './src/navigation';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

function App(props) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider />
    </GestureHandlerRootView>
  );
}

export default App;
