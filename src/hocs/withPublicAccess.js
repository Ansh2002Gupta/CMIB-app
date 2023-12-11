import React, { useContext, useEffect } from "react";
import _ from "lodash";

import { useNavigate } from "../routes";
import { AuthContext } from "../globalContext/auth/authProvider";
import { navigations } from "../constants/routeNames";

function withPublicAccess(Component) {
  return (props) => {
    const [authState] = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
      if (!_.isEmpty(authState)) {
        navigate(navigations.LOGIN);
      }
    }, []);

    if (!_.isEmpty(authState)) {
      return null;
    }
    return <Component {...props} />;
  };
}

export default withPublicAccess;
