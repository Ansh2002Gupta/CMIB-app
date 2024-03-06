import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";

import Http from "../../../http-service";
import { SideBarContext } from "../../../../globalContext/sidebar/sidebarProvider";
import { UserProfileContext } from "../../../../globalContext/userProfile/userProfileProvider";
import { useHeader } from "../../../../hooks/useHeader";
import {
  setErrorGetingUserDetails,
  setIsGettingUserDetails,
  setUserDetails,
} from "../../../../globalContext/userProfile/userProfileActions";
import {
  setSelectedModule,
  setSelectedSession,
} from "../../../../globalContext/sidebar/sidebarActions";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import { modules } from "../../../../constants/sideBarHelpers";
import { CORE_USERS_PERMISSION } from "../../apiEndPoint";
import { navigations } from "../../../../constants/routeNames";
import { STATUS_CODES } from "../../../../constants/constants";

const useGetUserDetails = () => {
  const [, sideBarDispatch] = useContext(SideBarContext);
  const [, userProfileDispatch] = useContext(UserProfileContext);
  const { onLogout } = useHeader();
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedModule = ({ firstAccessibleModuleName, moduleKeys }) => {
    const path = location.pathname.split("/");
    const moduleValues = Object.values(moduleKeys);
    let isTriedToAccessProtectedModule = false;
    if (path.length > 1 && moduleValues.includes(path[1])) {
      return {
        isTriedToAccessProtectedModule,
        moduleDetails: modules.find(
          (module) => module.key?.toLowerCase() === path[1]
        ),
      };
    }
    if (!moduleValues.includes(path?.[1])) {
      isTriedToAccessProtectedModule = true;
    }
    const moduleDetails = modules.find(
      (module) =>
        module.key?.toLowerCase() === firstAccessibleModuleName?.toLowerCase()
    );
    return { isTriedToAccessProtectedModule, moduleDetails };
  };

  const getUserDetails = async () => {
    try {
      userProfileDispatch(setIsGettingUserDetails(true));
      userProfileDispatch(setErrorGetingUserDetails(""));
      const res = await Http.get(CORE_USERS_PERMISSION);
      userProfileDispatch(setIsGettingUserDetails(false));
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        userProfileDispatch(setUserDetails(res.data));

        // Setting the first accessible module
        const moduleKeys = Object.keys(res.data?.menu_items || {});
        const firstAccessibleModuleName = moduleKeys?.[0] || "";
        const { isTriedToAccessProtectedModule, moduleDetails } =
          getSelectedModule({
            firstAccessibleModuleName,
            moduleKeys,
          });
        sideBarDispatch(setSelectedModule(moduleDetails));
        sideBarDispatch(setSelectedSession(moduleDetails?.session?.[0]));
        if (isTriedToAccessProtectedModule) {
          navigate(
            `/${firstAccessibleModuleName}/${navigations.MODULE_LANDING_PAGE}`
          );
        }
        return;
      }
      userProfileDispatch(
        setErrorGetingUserDetails(GENERIC_GET_API_FAILED_ERROR_MESSAGE)
      );
      onLogout();
    } catch (err) {
      onLogout();
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      userProfileDispatch(setErrorGetingUserDetails(errorMessage));
    }
  };

  return { getUserDetails };
};

export default useGetUserDetails;
