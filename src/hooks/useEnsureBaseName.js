import { Platform } from "@unthinkable/react-core-components";

import appConfig from "../constants/appConfig";

const useEnsureBaseName = () => {
  if (Platform.OS.toLowerCase() === "web") {
    if (!window.location.pathname.includes(appConfig.ROUTER_BASE_NAME)) {
      window.history.replaceState(
        "",
        "",
        appConfig.ROUTER_BASE_NAME + window.location.pathname
      );
    }
  }
};

export default useEnsureBaseName;
