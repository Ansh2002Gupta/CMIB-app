import React from 'react';
import {Image, View} from '@unthinkable/react-core-components';
import {useTheme} from '@unthinkable/react-theme';

function AuthImage() {
  const icons = useTheme('icons');
  const {logo} = icons;
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#282C34',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Image source={logo} width="100%" />
    </View>
  );
}

AuthImage.propTypes = {};

export default AuthImage;
