import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "../routes";

import { AuthContext } from "../globalContext/auth/authProvider";
import { RouteContext } from "../globalContext/route/routeProvider";
import { StorageService } from "../services";
import { setLoginRedirectRoute } from "../globalContext/route/routeActions";
import { getQueryParamsAsAnObject } from "../utils/util";
import { navigations } from "../constants/routeNames";
import { EXIT_WEBVIEW } from "../constants/constants";

function withPrivateAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, routeDispatch] = useContext(RouteContext);

    useEffect(() => {
      StorageService.get("auth").then((token) => {
        if (!authState?.token && !token) {
          routeDispatch(
            setLoginRedirectRoute({
              loginRedirectRoute: `${location.pathname}${
                location.search.length ? location.search : ""
              }`,
            })
          );
          navigate(navigations.LOGIN);
        }
      });
    }, []);

    // TODO: Need to refactor and test the below code.
    if (window && location.pathname === navigations.JOBS) {
      window.postMessage({
        message: EXIT_WEBVIEW,
        data: getQueryParamsAsAnObject(location.search),
      });
    }

    return <Component {...props} />;
  };
}

export default withPrivateAccess;
