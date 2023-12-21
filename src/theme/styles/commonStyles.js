import { Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const commonStyles = {
  webViewContainer:{
    flex:1,
  },
  headerContainer: {
    top: 0,
    zIndex: 1,
    backgroundColor: colors.white,
    ...(Platform.OS === "web" ? { position: "sticky" } : {}),
  },
  bottomBar: { 
    position: "absolute", 
    bottom: 0, 
    left: 0, 
    right: 0 
  },
  rightSectionStyle:{
    flex: 4 
  },
};

export default commonStyles;