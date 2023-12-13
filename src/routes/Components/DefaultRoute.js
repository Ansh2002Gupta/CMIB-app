import React, { useContext } from "react";
import { Navigate } from "../../routes";
import _ from "lodash";
import { Platform } from "@unthinkable/react-core-components";

import { AuthContext } from "../../globalContext/auth/authProvider";
import { navigations } from "../../constants/routeNames";
import { StorageService } from "../../services";

const DefaultRoute = () => {
  const [authState] = useContext(AuthContext);

  if (Platform.OS.toLowerCase() === "web") {
    StorageService.get("auth").then((token) => {
      if (!token && authState?.token) {
        return <Navigate to={navigations.LOGIN} replace />;
      }
    });

    return <Navigate to={navigations.DASHBOARD} replace />;
  } else {
    return <Navigate to={navigations.LOGIN} replace />;
  }
};

export default DefaultRoute;
