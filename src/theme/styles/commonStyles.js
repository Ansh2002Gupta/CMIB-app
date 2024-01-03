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
  commonWebContainer: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    padding: 40,
    width: "32%",
    alignSelf: "center",
    marginTop: 48,
    zIndex: 1,
    boxShadow: "0px 4px 32px 0px rgba(97, 108, 130, 0.04)",
    justifyContent: "center"
  },
};

export default commonStyles;
