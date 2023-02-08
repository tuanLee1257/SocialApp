import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

function FormInput({errorText, description, ...props}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        {...props}
        selectionColor={Colors.primary}
        underlineColor="transparent"
        mode="outlined"
        activeOutlineColor={Colors.primary}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

export default FormInput;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {},
  description: {
    fontSize: 13,
    color: Colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: Colors.error,
    paddingTop: 8,
  },
});
