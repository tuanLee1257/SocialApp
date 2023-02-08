import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../values/Colors';

function FormButton({mode, color, style, ...props}) {
  return (
    <Button
      style={[
        styles.button,
        mode === 'outlined' && {backgroundColor: Colors.surface},
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      buttonColor={color}
      {...props}
    />
  );
}

export default FormButton;
const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
