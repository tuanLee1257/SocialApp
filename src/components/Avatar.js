import React from 'react';
import {Image} from 'react-native';

const avatarHeight = 48;
const avatarWidth = 48;

function Avatar({uri}) {
  return (
    <Image
      source={{uri: uri}}
      style={{
        width: avatarWidth,
        height: avatarHeight,
        borderRadius: avatarHeight / 2,
      }}
    />
  );
}

export default Avatar;
