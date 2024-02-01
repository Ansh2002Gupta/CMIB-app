import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "../../routes";

import CookieAndStorageService from "../../services/cookie-and-storage-service";
import { AuthContext } from "../../globalContext/auth/authProvider";
import { navigations } from "../../constants/routeNames";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";

const DefaultRoute = () => {
  const [authState] = useContext(AuthContext);
  const [navigationPath, setNavigationPath] = useState(null);
  const [userProfileDetails] = useContext(UserProfileContext);

  useEffect(() => {
    async function checkAuthAndNavigate() {
      const token = await CookieAndStorageService.get({ key: "auth" });
      if (!token && !authState?.token) {
        setNavigationPath(navigations.LOGIN);
        return;
      }
      setNavigationPath(navigations.DASHBOARD);
    }

    checkAuthAndNavigate();
  }, [authState]);

  // If navigationPath is not null, navigate to the corresponding route
  if (navigationPath) {
    return <Navigate to={navigationPath} replace />;
  }

  // Render nothing or a loading spinner until navigationPath is determined
  return null; // or return <LoadingIndicator />;
};

export default DefaultRoute;
