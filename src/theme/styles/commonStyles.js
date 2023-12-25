import { Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const commonStyles = {
  webViewContainer: {
    flex: 1,
  },
  headerContainer: {
    top: 0,
    zIndex: 0,
    backgroundColor: colors.white,
    ...(Platform.OS === "web" ? { position: "sticky" } : {}),
  },
  middleContainer: {
    flex: 1,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  rightSectionStyle: {
    flex: 8,
  },
  leftSectionStyle:{
    flex:2
  },
  topSectionStyle: {
    flex: 1,
  },
  bottomSectionStyle: {
    flex: 9,
  },
  modalStyle:{
    justifyContent: "flex-start",
    margin: 0,
  }
};

export default commonStyles;
