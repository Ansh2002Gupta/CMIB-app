import { Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const commonStyles = {
  headerContainer: {
    top: 0,
    zIndex: 1,
    backgroundColor: colors.white,
    ...(Platform.OS === "web" ? { position: "sticky" } : {}),
  },
  errorMessage: {
    color: colors.errorRed,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
  },
};

export default commonStyles;
