import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  mainView: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    paddingRight: 16,
    paddingLeft: 16,
  },
  activeStyle: {
    paddingTop: 16,
    borderBottomWidth: 3,
    borderColor: colors.green,
    zIndex: 11,
    marginBottom: -1,
  },
  topTabs: {
    width: "50%",
    ...(Platform.OS.toLowerCase() === 'web' ? { cursor: 'pointer' } : {}),
  },
  inActiveStyle: {
    paddingTop: 16,
    borderColor: colors.lightGrey,
    borderBottomWidth: 0,
  },
  topTabsText: {
    textAlign: "center",
    color: colors.darkGrey,
    fontSize: 14,
  },
  activeTopTabsText: {
    textAlign: "center",
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  companyView: {
    backgroundColor: colors.backgroundColor,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    justifyContent: "space-between",
    flexGrow: 1,
  },
  forgotPasswordView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rememberMeText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.darkBlue,
    fontWeight: "600",
    ...(Platform.OS.toLowerCase() === 'web' ? { cursor: 'pointer' } : {}),
  },
  loginButtonView: {
    marginTop: 32,
    cursor: "pointer",
  },
  accountView: {
    marginTop: 24,
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  newAccountText: {
    color: colors.darkBlue,
    fontSize: 14,
    fontWeight: "600",
    ...(Platform.OS.toLowerCase() === 'web' ? { cursor: 'pointer' } : {}),
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
  },
  accountText: {
    color: colors.darkGrey,
    fontSize: 14,
  },
  followUsImageView: {
    paddingBottom: 16,
    paddingTop: 32,
  },
  minHeight: { minHeight: 500 },
  gapForWebView: { gap: 24 },

  // Web view related Styles
  webView: {
    activeTab: {
      borderBottom: `3px solid ${colors.green}`,
      marginBottom: -2,
      zIndex: 10,
    },
    backGroundColor: {
      backgroundColor: colors.white,
    },
    extraMargin: {
      marginTop: 56,
    },
    dontHaveAccountText: {
      color: colors.gray,
      fontSize: 14,
      lineHeight: 20,
    },
    createNewAccountText: {
      color: colors.darkBlue,
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
      cursor: "pointer",
    },
    errorMessage: {
      marginTop: 2,
      color: colors.errorRed,
    },
    forgotPasswordText: {
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
      cursor: "pointer",
    },
    headerContainer: {
      marginTop: 0,
    },
    subHeaderContainer: {
      marginTop: 16,
    },
    headerText: {
      color: colors.black,
      fontSize: 40,
      fontWeight: "600",
      letterSpacing: -2,
    },
    headerText1800px: {
      fontSize: 36,
    },
    headerText900px: {
      fontSize: 32,
    },
    headerTextContainer: {
      marginTop: 0,
    },
    inputLabelText: {
      color: colors.black,
      fontSize: 14,
      lineHeight: 24,
      textTransform: "capitalize",
    },
    inputTextBox: {
      background: colors.white,
      marginTop: 0,
    },
    loginText: {
      ...(Platform.OS.toLowerCase() === 'web' ? { cursor: 'pointer' } : {}),
    },
    rememberMeText: {
      fontSize: 14,
      lineHeight: 20,
      cursor: "pointer",
      margin: 0,
    },
    selectedSectionHeading: {
      color: colors.black,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
      cursor: "pointer",
    },
    subHeadingText: {
      color: colors.darkGrey,
      fontSize: 16,
      lineHeight: 24,
    },
    subHeadingText900px: {
      fontSize: 14,
    },
    tabsBottomGreyLine: {
      marginLeft: 0,
      marginRight: 0,
    },
    unSelectedSectionHeading: {
      color: colors.darkGrey,
      textAlign: "center",
      fontSize: 16,
      cursor: "pointer",
    },
  },
};

export default style;
