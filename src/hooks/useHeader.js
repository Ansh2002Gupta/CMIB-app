import { useContext } from "react";

import { clearAuthAndLogout } from "../globalContext/auth/authActions";
import { AuthContext } from "../globalContext/auth/authProvider";

export const useHeader = () => {
  const [, authDispatch] = useContext(AuthContext);
  const onLogout = () => {
    authDispatch(clearAuthAndLogout());
  };
  return {
    onLogout,
  };
};
