import { Dimensions, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const { height: deviceHeight } = Dimensions.get("window");

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
    width: "45%",
    alignSelf: "center",
    marginTop: 48,
    zIndex: 1,
    boxShadow: "0px 4px 32px 0px rgba(97, 108, 130, 0.04)",
    justifyContent: "center",
  },
  mainView: {
    flex: 1,
    display: "flex",
  },
  columnStyle: (WIDTH = "15%") => ({
    width: WIDTH,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
  }),
  largeModalContainer: (keyboardHeight) => ({
    maxHeight: keyboardHeight * 2.2,
  }),
  buttonStyle: { maxHeight: 44 },
  customContainerStyle: {
    paddingBottom: Platform.OS === "android" ? 0 : 22,
    maxHeight: Platform.OS === "web" ? 44 : "auto",
    justifyContent: "flex-end",
  },
  modalInnerContainer: {
    ...Platform.select({
      ios: {
        maxHeight: deviceHeight / 1.5,
      },
      android: {
        maxHeight: deviceHeight / 2,
      },
      web: {
        height: deviceHeight * 0.7,
      },
    }),
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightGrey,
    marginTop: 24,
    marginBottom: 24,
  },
};

export const gridStyles = {
  xl: "1fr 1fr 1fr",
  lg: "1fr 1fr",
  md: "1fr 1fr",
  sm: "1fr 1fr",
};

export const baseChipStyle = {
  textAlign: "center",
  marginRight: 16,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 2,
  paddingBottom: 2,
};

export const fontFamily =
  Platform.OS.toLowerCase() === "web" ? "General sans" : "GeneralSans-Medium";

export default commonStyles;
