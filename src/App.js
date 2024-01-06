import React, { useContext } from "react";
import { Router, Routes } from "./routes";
import { IntlProvider } from "react-intl";
import { MediaQueryProvider, ThemeProvider } from "@unthinkable/react-theme";

import { LocaleContext } from "./globalContext/locale/localeProviders";
import intl from "./locale";
import appConfig from "./constants/appConfig";
import theme from "./theme";

function App() {
  const [localeState] = useContext(LocaleContext);
  const {
    base: { breakpoints },
  } = theme;

  // useEnsureBaseName(); // Please uncomment this if you want to redirect the user to the "/app" subdomain from a route that doesn't include word 'app' in it. Kept it commented as it will redirect the user to the /app subdomain even when the user wants to view the CMS or other sub domains

  return (
    <MediaQueryProvider breakpoints={breakpoints}>
      <ThemeProvider {...theme}>
        <IntlProvider
          messages={intl[localeState?.locale]}
          locale={localeState?.locale}
          defaultLocale="en"
        >
          <Router basename={appConfig.ROUTER_BASE_NAME}>
            <Routes />
          </Router>
        </IntlProvider>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}

export default App;
