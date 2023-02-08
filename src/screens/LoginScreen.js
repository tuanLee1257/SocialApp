import {useNavigation} from '@react-navigation/native';
import {Formik, validateYupSchema} from 'formik';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {onLogin} from '../firebase/auth';
import {AuthContex} from '../navigation/AuthProvider';
import {windowWidth} from '../utils/Dimentions';
import * as yup from 'yup';
import Colors from '../values/Colors';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invail email').required('Email is required!'),
  password: yup.string().min(6).required('Password is required!'),
});

function LoginScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => onLogin(values.email, values.password)}>
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
              Login
            </FormButton>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={{color: 'blue'}}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default LoginScreen;
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
