import { useContext } from "react";
import { useLocation } from "react-router";

import Http from "../../../http-service";
import { SideBarContext } from "../../../../globalContext/sidebar/sidebarProvider";
import { UserProfileContext } from "../../../../globalContext/userProfile/userProfileProvider";
import useNavigateScreen from "../../../hooks/useNavigateScreen";
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
import { navigations } from "../../../../constants/routeNames";
import { STATUS_CODES } from "../../../../constants/constants";
import { CORE_USERS_PERMISSION } from "../../apiEndPoint";

const useGetUserDetails = () => {
  const [, sideBarDispatch] = useContext(SideBarContext);
  const [, userProfileDispatch] = useContext(UserProfileContext);
  const { onLogout } = useHeader();
  const location = useLocation();
  const { navigateScreen: navigate } = useNavigateScreen();

  const getSelectedModule = ({ firstAccessibleModuleName, moduleKeys }) => {
    const path = location.pathname.split("/");
    const moduleValues = Object.values(moduleKeys);
    if (!moduleValues?.includes(path?.[1])) {
      return modules.find((module) => module.key?.toLowerCase() === path[1]);
    }
    return modules.find(
      (module) =>
        module.key?.toLowerCase() === firstAccessibleModuleName?.toLowerCase()
    );
  };

  const navigateToFirstAccessibleModule = (userData) => {
    const path = location.pathname.split("/");
    const moduleKeys = Object.keys(userData?.menu_items || {});
    const moduleValues = Object.values(moduleKeys);
    const firstAccessibleModuleName = moduleKeys?.[0] || "";
    const selectedModuleDetails = getSelectedModule({
      firstAccessibleModuleName,
      moduleKeys,
    });
    if (selectedModuleDetails) {
      sideBarDispatch(setSelectedModule(selectedModuleDetails));
      sideBarDispatch(setSelectedSession(selectedModuleDetails?.session?.[0]));
      if (!moduleValues?.includes(path?.[1]))
        navigate(
          `/${firstAccessibleModuleName}/${navigations.MODULE_LANDING_PAGE}`
        );
    }
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
        navigateToFirstAccessibleModule(res.data);
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
