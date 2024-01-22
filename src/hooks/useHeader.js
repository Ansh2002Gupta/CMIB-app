import { useContext } from "react";

import CookieAndStorageService from "../services/cookie-and-storage-service";
import { AuthContext } from "../globalContext/auth/authProvider";
import { UserProfileContext } from "../globalContext/userProfile/userProfileProvider";
import useLogoutAPI from "../services/apiServices/hooks/useLogoutAPI";
import useNavigateScreen from "../services/hooks/useNavigateScreen";
import { clearAuthAndLogout } from "../globalContext/auth/authActions";
import { resetUserDetails } from "../globalContext/userProfile/userProfileActions";
import { navigations } from "../constants/routeNames";

export const useHeader = () => {
  const { navigateScreen: navigate } = useNavigateScreen();
  const [, authDispatch] = useContext(AuthContext);
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const { handleUserLogout, isLoggingUserOut } = useLogoutAPI();

  const onLogout = async () => {
    await handleUserLogout({});
    await CookieAndStorageService.remove({ key: "auth" });
    authDispatch(clearAuthAndLogout());
    userProfileDispatch(resetUserDetails());
    navigate(navigations.LOGIN);
  };
  return {
    isLoggingUserOut,
    onLogout,
  };
};
