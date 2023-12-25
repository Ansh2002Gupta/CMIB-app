import React, { useContext,useState, useEffect } from "react";
import { Navigate } from "../../routes";
import { Platform } from "@unthinkable/react-core-components";

import { AuthContext } from "../../globalContext/auth/authProvider";
import { StorageService } from "../../services";
import { navigations } from "../../constants/routeNames";

const DefaultRoute = () => {
  const [authState] = useContext(AuthContext);
  const [navigationPath, setNavigationPath] = useState(null);

  useEffect(() => {
    async function checkAuthAndNavigate() {
      const token = await StorageService.get("auth");
      if (!token && !authState?.token) {
        console.log("LOGIN SCREEN loading !!!");
        setNavigationPath(navigations.LOGIN);
      } else {
        console.log("Dashboard SCREEN loading !!!");
        setNavigationPath(navigations.DASHBOARD);
      }
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
