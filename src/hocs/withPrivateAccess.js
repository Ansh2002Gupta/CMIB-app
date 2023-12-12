import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "../routes";
import _ from "lodash";
import { Platform } from "@unthinkable/react-core-components";

import { AuthContext } from "../globalContext/auth/authProvider";
import { RouteContext } from "../globalContext/route/routeProvider";
import { getQueryParamsAsAnObject } from "../utils/util";
import { navigations } from "../constants/routeNames";
import { setLoginRedirectRoute } from "../globalContext/route/routeActions";
import { EXIT_WEBVIEW } from "../constants/constants";

function withPrivateAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, routeDispatch] = useContext(RouteContext);

    if (
      Platform.OS.toLowerCase() !== "web" &&
      location.pathname === navigations.JOBS
    ) {
      window.postMessage({
        message: EXIT_WEBVIEW,
        data: getQueryParamsAsAnObject(location.search),
      });
    }

    useEffect(() => {
      if (_.isEmpty(authState)) {
        routeDispatch(
          setLoginRedirectRoute({
            loginRedirectRoute: `${location.pathname}${
              location.search.length ? location.search : ""
            }`,
          })
        );
        navigate(navigations.LOGIN);
      }
    }, [authState]);

    return <Component {...props} />;
  };
}

export default withPrivateAccess;
