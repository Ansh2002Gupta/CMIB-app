import { Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const commonStyles = {
  headerContainer: {
    top: 0,
    zIndex: 1,
    backgroundColor: colors.white,
    ...(Platform.OS === "web" ? { position: "sticky" } : {}),
  },
};

export const gridStyles = {
  xl: "1fr 1fr 1fr",
  lg: "1fr 1fr",
  md: "1fr 1fr",
  sm: "1fr 1fr",
};

export default commonStyles;
