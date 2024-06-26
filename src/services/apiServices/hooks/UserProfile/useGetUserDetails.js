import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import useHttpService from "../../../hooks/useHttpService";
import { SideBarContext } from "../../../../globalContext/sidebar/sidebarProvider";
import { UserProfileContext } from "../../../../globalContext/userProfile/userProfileProvider";
import { useHeader } from "../../../../hooks/useHeader";
import {
  setErrorGetingUserDetails,
  setIsGettingUserDetails,
  setUserDetails,
} from "../../../../globalContext/userProfile/userProfileActions";
import useGlobalSessionListApi from "../useGlobalSessionList";
import { setSelectedModule } from "../../../../globalContext/sidebar/sidebarActions";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import {
  moduleKeys,
  getAppModules,
} from "../../../../constants/sideBarHelpers";
import { CORE_USERS_PERMISSION } from "../../apiEndPoint";
import { navigations } from "../../../../constants/routeNames";
import { COMPANY, STATUS_CODES } from "../../../../constants/constants";

const useGetUserDetails = () => {
  const [, sideBarDispatch] = useContext(SideBarContext);
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const { onLogout } = useHeader();
  const location = useLocation();
  const navigate = useNavigate();

  const { Http } = useHttpService();

  const { getGlobalSessionList } = useGlobalSessionListApi();

  const getSelectedModule = ({
    firstAccessibleModuleName,
    accessibleModuleKeys,
    currentModules,
  }) => {
    const path = location.pathname.split("/");
    const moduleValues = Object.values(accessibleModuleKeys);
    let isTriedToAccessProtectedModule = false;
    if (path.length > 1 && moduleValues.includes(path[1])) {
      return {
        isTriedToAccessProtectedModule,
        moduleDetails: currentModules.find(
          (module) => module.key?.toLowerCase() === path[1]
        ),
      };
    }
    if (!moduleValues.includes(path?.[1])) {
      isTriedToAccessProtectedModule = true;
    }
    const moduleDetails = currentModules.find(
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
        const isMemberOrCandidate =
          res?.data?.user_type?.toLowerCase() !== COMPANY;
        // Setting the first accessible module
        const accessibleModuleKeys = Object.keys(res.data?.menu_items || {});
        const firstAccessibleModuleName = accessibleModuleKeys?.[0] || "";
        const { isTriedToAccessProtectedModule, moduleDetails } =
          getSelectedModule({
            firstAccessibleModuleName,
            accessibleModuleKeys,
            currentModules: getAppModules({ isMember: isMemberOrCandidate }),
          });
        await getGlobalSessionList(moduleDetails?.key);
        sideBarDispatch(setSelectedModule(moduleDetails));
        const activeModuleInPath = location.pathname?.split("/")?.[1];
        if (
          isTriedToAccessProtectedModule &&
          Object.values(moduleKeys)?.includes(activeModuleInPath)
        ) {
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
