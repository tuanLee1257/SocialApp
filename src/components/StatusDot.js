import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Colors from '../values/Colors';

function StatusDot({status}) {
  return (
    <Octicons
      name="dot-fill"
      size={16}
      color={status == 'offline' ? Colors.offline : Colors.online}
    />
  );
}

export default StatusDot;
