import React, {useContext} from 'react';
import {IntlProvider} from 'react-intl';
import {MediaQueryProvider, ThemeProvider} from '@unthinkable/react-theme';

import intl from './locale';
import {LocaleContext} from './globalContext/locale/localeProviders';

import theme from './theme';
import {Router, Routes} from './routes';

function App() {
  const [localeState] = useContext(LocaleContext);
  const {
    base: {breakpoints},
  } = theme;

  return (
      <MediaQueryProvider breakpoints={breakpoints}>
        <ThemeProvider {...theme}>
          <IntlProvider
            messages={intl[localeState?.locale]}
            locale={localeState?.locale}
            defaultLocale="en">
            <Router>
              <Routes />
            </Router>
          </IntlProvider>
        </ThemeProvider>
      </MediaQueryProvider>
  );
}

export default App;
