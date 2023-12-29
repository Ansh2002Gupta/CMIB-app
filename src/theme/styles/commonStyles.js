import { Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const commonStyles = {
  webViewContainer: {
    flex: 1,
  },
  headerContainer: {
    top: 0,
    zIndex: 10,
    backgroundColor: colors.white,
    ...(Platform.OS === "web" ? { position: "sticky" } : {}),
  },
  contentContainer: {
    zIndex: 3,
  },
  middleContainer: {
    flex: 1,
  },
};

export default commonStyles;
