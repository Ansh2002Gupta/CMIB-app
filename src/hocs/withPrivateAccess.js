import React, { useContext, useEffect } from "react";
import { useNavigate } from "../routes";
import _ from "lodash";

import { AuthContext } from "../globalContext/auth/authProvider";
import { navigations } from "../constants/routeNames";

function withPrivateAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
      if (_.isEmpty(authState)) {
        navigate(navigations.Login);
      }
    }, [authState]);

    if (_.isEmpty(authState)) {
      return null;
    }
    return <Component {...props} />;
  };
}

export default withPrivateAccess;
