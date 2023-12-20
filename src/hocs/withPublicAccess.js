import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "../routes";

import { AuthContext } from "../globalContext/auth/authProvider";
import { StorageService } from "../services";
import { navigations } from "../constants/routeNames";
import { EXIT_WEBVIEW } from "../constants/constants";

function withPublicAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();

    // TODO: Need to refactor and test the below code.
    const location = useLocation();
    if (window && location.pathname === navigations.LOGIN) {
      window.postMessage(EXIT_WEBVIEW);
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
