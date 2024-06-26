import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "../routes";
import { Platform } from "@unthinkable/react-core-components";

import CookieAndStorageService from "../services/cookie-and-storage-service";
import LoadingScreen from "../components/LoadingScreen";
import { AuthContext } from "../globalContext/auth/authProvider";
import { RouteContext } from "../globalContext/route/routeProvider";
import { UserProfileContext } from "../globalContext/userProfile/userProfileProvider";
import useGetUserDetails from "../services/apiServices/hooks/UserProfile/useGetUserDetails";
import { setLoginRedirectRoute } from "../globalContext/route/routeActions";
import { getQueryParamsAsAnObject } from "../utils/util";
import { urlService } from "../services/urlService";
import { navigations } from "../constants/routeNames";
import { REDIRECT_URL } from "../constants/constants";

function withPrivateAccess(Component) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [authState] = useContext(AuthContext);
    const [, routeDispatch] = useContext(RouteContext);
    const [userProfileDetails] = useContext(UserProfileContext);
    const { getUserDetails } = useGetUserDetails();

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
        if (
          (token || authState?.token) &&
          !Object.keys(userProfileDetails.userDetails)?.length
        ) {
          getUserDetails();
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
          redirectPath: urlService.getQueryStringValue(REDIRECT_URL) || "",
        })
      );
    }
    if (userProfileDetails.isGettingUserDetails) {
      return <LoadingScreen />;
    }
    if (
      userProfileDetails &&
      Object.keys(userProfileDetails.userDetails)?.length
    ) {
      return <Component {...props} />;
    }
    return null;
  };
}

export default withPrivateAccess;
