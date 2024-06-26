import React, { useContext, useEffect, useState } from "react";
import { Router, Routes } from "./routes";
import { IntlProvider } from "react-intl";
import { MediaQueryProvider, ThemeProvider } from "@unthinkable/react-theme";
import { Platform } from "@unthinkable/react-core-components";
import SplashScreen from "./components/SpashScreen";

import { LocaleContext } from "./globalContext/locale/localeProviders";
import intl from "./locale";
import appConfig from "./constants/appConfig";
import theme from "./theme";

function App() {
  const [localeState] = useContext(LocaleContext);
  const {
    base: { breakpoints },
  } = theme;
  const [hideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (Platform.OS.toLowerCase() !== "web") {
      hideSplash && SplashScreen.hide();
    }
  }, [hideSplash]);

  // useEnsureBaseName(); // Please uncomment this if you want to redirect the user to the "/app" subdomain from a route that doesn't include word 'app' in it. Kept it commented as it will redirect the user to the /app subdomain even when the user wants to view the CMS or other sub domains

  const webProps =
    Platform.OS === "web" ? { basename: appConfig.ROUTER_BASE_NAME } : {};

  return (
    <MediaQueryProvider breakpoints={breakpoints}>
      <ThemeProvider {...theme}>
        <IntlProvider
          messages={intl[localeState?.locale]}
          locale={localeState?.locale}
          defaultLocale="en"
        >
          <Router {...webProps}>
            <Routes />
          </Router>
        </IntlProvider>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}

export default App;
