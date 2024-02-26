import React, { useContext, useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { navigations } from "../../constants/routeNames";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { USER_TYPE_CANDIDATE } from "../../constants/constants";

const RedirectToAccessedModule = () => {
  const [sideBarState] = useContext(SideBarContext);
  const [userProfileDetails] = useContext(UserProfileContext);
  const role = userProfileDetails?.userDetails?.user_type?.toLowerCase();

  const { navigateScreen } = useNavigateScreen();

  useEffect(() => {
    if (sideBarState?.selectedModule?.key) {
      const moduleKey = sideBarState.selectedModule.key;
      const moduleRoute =
        role === USER_TYPE_CANDIDATE
          ? navigations.ROUND_ONE
          : navigations.MODULE_LANDING_PAGE;

      navigateScreen(`/${moduleKey}/${moduleRoute}`);
    }
  }, [sideBarState?.selectedModule]);

  return <View></View>;
};

export default RedirectToAccessedModule;
