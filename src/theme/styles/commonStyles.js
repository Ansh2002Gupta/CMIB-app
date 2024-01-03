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
  errorMessage: {
    color: colors.errorRed,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
  },
  contentContainer: {
    zIndex: 3,
  },
  middleContainer: {
    flex: 1,
  },
};

export const gridStyles = {
  xl: "1fr 1fr 1fr",
  lg: "1fr 1fr",
  md: "1fr 1fr",
  sm: "1fr 1fr",
};
export default commonStyles;
