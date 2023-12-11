import React, { useContext } from "react";
import { Navigate } from "../../routes";
import _ from "lodash";

import { AuthContext } from "../../globalContext/auth/authProvider";
import { navigations } from "../../constants/routeNames";

const DefaultRoute = () => {
  const [authState] = useContext(AuthContext);

  if (!_.isEmpty(authState)) {
    <Navigate to={navigations.LOGIN} replace />;
  }
  return <Navigate to={navigations.DASHBOARD} replace />;
};

export default DefaultRoute;
