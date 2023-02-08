import React from 'react';
import {View} from 'react-native';
import FormButton from '../components/FormButton';
import {auth} from '../firebase/firebaseConfig';
import {getAuth, signOut} from 'firebase/auth';

function AccountScreen(props) {
  return (
    <View>
      <FormButton
        onPress={() =>
          signOut(auth)
            .then(() => {
              console.log(auth);
            })
            .catch(error => {
              // An error happened.
            })
        }
      />
    </View>
  );
}

export default AccountScreen;
