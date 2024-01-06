import { useContext } from "react";

import Storage from "../services/storage-service";
import { AuthContext } from "../globalContext/auth/authProvider";
import { clearAuthAndLogout } from "../globalContext/auth/authActions";
import useNavigateScreen from "../services/hooks/useNavigateScreen";
import { navigations } from "../constants/routeNames";

export const useHeader = () => {
  const { navigateScreen: navigate } = useNavigateScreen();

  const [, authDispatch] = useContext(AuthContext);

  const onLogout = async () => {
    authDispatch(clearAuthAndLogout());
    navigate(navigations.LOGIN);
    await Storage.remove("auth");
    // TODO: Also include the logout API call here and then use this method in the LogoutModal's Logout button too.
  };
  return {
    onLogout,
  };
};
