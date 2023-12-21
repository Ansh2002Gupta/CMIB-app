import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "../routes";
import { Platform } from "@unthinkable/react-core-components";

import { AuthContext } from "../globalContext/auth/authProvider";
import { StorageService } from "../services";
import { navigations } from "../constants/routeNames";

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
        })
      );
    }

    useEffect(() => {
      StorageService.get("auth").then((token) => {
        if (authState?.token || token) {
          navigate(navigations.DASHBOARD);
        }
      });
    }, []);

    return <Component {...props} />;
  };
}

export default withPublicAccess;
