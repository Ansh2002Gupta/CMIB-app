import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "../routes";
import { Platform } from "@unthinkable/react-core-components";

import CookieAndStorageService from "../services/cookie-and-storage-service";
import { AuthContext } from "../globalContext/auth/authProvider";
import { RouteContext } from "../globalContext/route/routeProvider";
import { setLoginRedirectRoute } from "../globalContext/route/routeActions";
import { getQueryParamsAsAnObject } from "../utils/util";
import { navigations } from "../constants/routeNames";
import { REDIRECT_URL } from "../constants/constants";

function withPrivateAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, routeDispatch] = useContext(RouteContext);
    const [searchParams] = useSearchParams();
    const isWebPlatform = Platform.OS.toLowerCase() === "web";

    useEffect(() => {
      CookieAndStorageService.get({ key: "auth" }).then((token) => {
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

    if (
      window &&
      window.ReactNativeWebView &&
      isWebPlatform &&
      location.pathname === navigations.JOBS
    ) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          path: navigations.JOBS,
          data: getQueryParamsAsAnObject(location.search),
          redirectPath: searchParams.get(REDIRECT_URL) || "",
        })
      );
    }

    return <Component {...props} />;
  };
}

export default withPrivateAccess;
