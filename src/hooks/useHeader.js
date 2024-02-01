import { useContext } from "react";
import { useNavigate } from "../routes";

import CookieAndStorageService from "../services/cookie-and-storage-service";
import { AuthContext } from "../globalContext/auth/authProvider";
import { LogoutContext } from "../globalContext/logout/logoutProvider";
import { UserProfileContext } from "../globalContext/userProfile/userProfileProvider";

import useLogoutAPI from "../services/apiServices/hooks/useLogoutAPI";
import { clearAuthAndLogout } from "../globalContext/auth/authActions";
import { resetUserDetails } from "../globalContext/userProfile/userProfileActions";
import { setLogoutToast } from "../globalContext/logout/logoutActions";
import { navigations } from "../constants/routeNames";

export const useHeader = () => {
  const navigate = useNavigate();
  const [, authDispatch] = useContext(AuthContext);
  const [, userProfileDispatch] = useContext(UserProfileContext);
  const [, setLogoutDispatch] = useContext(LogoutContext);

  const { handleUserLogout, isLoggingUserOut } = useLogoutAPI();

  const onLogout = async (logoutToastData) => {
    await handleUserLogout({});
    await CookieAndStorageService.remove({ key: "auth" });
    authDispatch(clearAuthAndLogout());
    userProfileDispatch(resetUserDetails());
    !!logoutToastData && setLogoutDispatch(setLogoutToast(logoutToastData));
    navigate(navigations.LOGIN);
  };
  return {
    isLoggingUserOut,
    onLogout,
  };
};
