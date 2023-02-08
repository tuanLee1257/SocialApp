import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {auth, database} from '../firebase/firebaseConfig';
import AppStack from './AppStack';
import {AuthContex} from './AuthProvider';
import AuthStack from './AuthStack';
import {ActivityIndicator, View} from 'react-native';
import {setUserInfomation} from '../firebase/auth';

function Routes(props) {
  const {user, setUser} = useContext(AuthContex);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    });
    setIsLoading(false);
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Routes;
