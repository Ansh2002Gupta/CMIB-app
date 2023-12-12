import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "../routes";
import _ from "lodash";
import { Platform } from "@unthinkable/react-core-components";

import { AuthContext } from "../globalContext/auth/authProvider";
import { navigations } from "../constants/routeNames";
import { EXIT_WEBVIEW } from "../constants/constants";

function withPublicAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();

    if (
      Platform.OS.toLowerCase() !== "web" &&
      location.pathname === navigations.LOGIN
    ) {
      window.postMessage(EXIT_WEBVIEW);
    }

    useEffect(() => {
      if (!_.isEmpty(authState)) {
        navigate(navigations.DASHBOARD);
      }
    }, []);

    return <Component {...props} />;
  };
}

export default withPublicAccess;
