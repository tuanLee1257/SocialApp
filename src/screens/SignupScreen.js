import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {onSignup} from '../firebase/auth';
import {windowWidth} from '../utils/Dimentions';
import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  email: yup.string().email('Invail email').required('Email is required!'),
  password: yup.string().min(6).required('Password is required!'),
  username: yup.string().required('Username is required'),
});

function SignupScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: '', username: ''}}
        validationSchema={SignupSchema}
        onSubmit={values =>
          onSignup(values.email, values.password, values.username)
        }>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isValid,
        }) => (
          <View style={styles.form}>
            <FormInput
              label="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              autoCapitalize="none"
            />
            {errors.username ? (
              <Text style={{color: Colors.error, fontSize: 13}}>
                {errors.username}
              </Text>
            ) : null}
            <FormInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            {errors.email ? (
              <Text style={{color: Colors.error, fontSize: 13}}>
                {errors.email}
              </Text>
            ) : null}
            <FormInput
              label="Password"
              returnKeyType="done"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={{color: Colors.error, fontSize: 13}}>
                {errors.password}
              </Text>
            ) : null}
            <FormButton
              mode="contained"
              onPress={handleSubmit}
              color={isValid ? Colors.primary : 'gray'}>
              Sign up
            </FormButton>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={{color: 'blue'}}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  form: {
    width: windowWidth * 0.8,
  },
});
