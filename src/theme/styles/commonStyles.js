import { Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const commonStyles = {
  headerContainer: {
    top: 0,
    zIndex: 1,
    backgroundColor: colors.white,
    ...(Platform.OS === 'web' ? { position: "sticky" } : {}),
  },
};

export default commonStyles;