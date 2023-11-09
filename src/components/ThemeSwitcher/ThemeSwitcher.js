import React from 'react';
import {Image, TouchableOpacity} from '@unthinkable/react-core-components';
import {
  useTheme,
  useColorMode,
} from '@unthinkable/react-theme';

function ThemeSwitcher() {
  const {colorMode, setColorMode} = useColorMode();
  const icons = useTheme('icons');
  const {sun, moon} = icons;

  return (
    <TouchableOpacity
      style={{width: 48, height: 48, padding: 15}}
      onPress={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}>
      <Image
        source={colorMode === 'dark' ? moon : sun}
        style={{width: '100%', height: '100%'}}
      />
    </TouchableOpacity>
  );
}

export default ThemeSwitcher;
