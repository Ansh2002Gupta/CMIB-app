import { useContext } from "react";

import { AuthContext } from "../globalContext/auth/authProvider";
import { clearAuthAndLogout } from "../globalContext/auth/authActions";

export const useHeader = () => {
  const [, authDispatch] = useContext(AuthContext);
  const onLogout = () => {
    authDispatch(clearAuthAndLogout());
  };
  return {
    onLogout,
  };
};
