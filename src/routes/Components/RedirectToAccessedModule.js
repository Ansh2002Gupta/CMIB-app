import React, { useContext, useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useNavigateScreen from "../../services/hooks/useNavigateScreen";
import { navigations } from "../../constants/routeNames";

const RedirectToAccessedModule = () => {
  const [sideBarState] = useContext(SideBarContext);

  const { navigateScreen } = useNavigateScreen();

  useEffect(() => {
    if (sideBarState?.selectedModule?.key) {
      navigateScreen(
        `/${sideBarState.selectedModule.key}/${navigations.MODULE_LANDING_PAGE}`
      );
    }
  }, [sideBarState?.selectedModule]);

  return <View></View>;
};

export default RedirectToAccessedModule;
