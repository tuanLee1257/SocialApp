import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../values/Colors';
import Avatar from './Avatar';
import StatusDot from './StatusDot';

function Contact({contact, type}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Avatar uri={contact.profile_picture} />
        <View style={{alignSelf: 'center', marginLeft: 20}}>
          <Text style={styles.username}>{contact.username}</Text>
          <Text style={styles.underName}>Latest message</Text>
        </View>
      </View>
      <StatusDot status="online" />
    </View>
  );
}

export default Contact;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  underName: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
});
