import React, {useContext} from 'react';
import {Image, TouchableOpacity} from '@unthinkable/react-core-components';
import {useTheme} from '@unthinkable/react-theme';

import {LocaleContext} from './../../globalContext/locale/localeProviders';
import {setLocale} from './../../globalContext/locale/localeActions';

function useLocaleSwitcher() {
  const [localeState, localeDispatch] = useContext(LocaleContext);

  const toggleLocale = () => {
    const newLocale = localeState.locale === 'en' ? 'fr' : 'en';
    localeDispatch(setLocale(newLocale));
  };

  return {
    locale: localeState.locale,
    toggleLocale,
  };
}

function LocaleSwitcher() {
  const {toggleLocale, locale} = useLocaleSwitcher();
  const icons = useTheme('icons');
  const {flagFr, flagUk} = icons;

  return (
    <TouchableOpacity
      style={{width: 48, height: 48, padding: 15}}
      onPress={toggleLocale}>
      <Image
        source={locale === 'en' ? flagUk : flagFr}
        style={{width: '100%', height: '100%'}}
      />
    </TouchableOpacity>
  );
}

export default LocaleSwitcher;
