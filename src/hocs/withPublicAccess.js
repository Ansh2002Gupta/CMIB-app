import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "../routes";
import { Platform } from "@unthinkable/react-core-components";

import CookieAndStorageService from "../services/cookie-and-storage-service";
import { AuthContext } from "../globalContext/auth/authProvider";
import { urlService } from "../services/urlService";
import { navigations } from "../constants/routeNames";
import { REDIRECT_URL } from "../constants/constants";

function withPublicAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();

    const isWebPlatform = Platform.OS.toLowerCase() === "web";

    const location = useLocation();
    if (
      window &&
      window.ReactNativeWebView &&
      isWebPlatform &&
      location.pathname === navigations.LOGIN
    ) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          path: navigations.LOGIN,
          redirectPath: urlService.getQueryStringValue(REDIRECT_URL) || "",
        })
      );
    }

    useEffect(() => {
      CookieAndStorageService.get({ key: "auth" }).then((token) => {
        if (authState?.token || token) {
          navigate(navigations.REDIRECT);
        }
      });
    }, []);

    return <Component {...props} />;
  };
}

export default withPublicAccess;
