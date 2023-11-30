import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";

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
    zIndex: "11",
    marginBottom: "-1px",
  },
  topTabs: {
    width: "50%",
    cursor: "pointer",
  },
  inActiveStyle: {
    paddingTop: 16,
    borderColor: colors.lightGrey,
    borderBottomWidth: "0px",
  },
  topTabsText: {
    textAlign: "center",
    color: colors.darkGrey,
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
  },
  activeTopTabsText: {
    textAlign: "center",
    color: colors.black,
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Semibold",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  companyView: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
  },
  forgotPasswordView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rememberMeText: {
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    color: colors.black,
    lineHeight: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Semibold",
    color: colors.darkBlue,
    cursor: "pointer",
    fontWeight: "600",
  },
  loginButtonView: { marginTop: 32, cursor: "pointer" },
  accountView: {
    marginTop: 24,
    justifyContent: "center",
    flexDirection: "row",
    gap: "4px",
  },
  newAccountText: {
    textDecorationLine: "none",
    color: colors.darkBlue,
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Semibold",
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
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
  },
  followUsImageView: {
    marginHorizontal: 30,
    flex: "1",
    justifyContent: "end",
  },
  minHeight: { minHeight: "50vh" },
  gapForWebView: { gap: "24px" },
  // Web view related Styles
  webView: {
    activeTab: {
      borderBottom: `3px solid ${colors.green}`,
      marginBottom: "-2px",
      zIndex: "10",
    },
    backGroundColor: {
      backgroundColor: colors.white,
    },
    extraMargin: {
      marginTop: "56px",
    },
    dontHaveAccountText: {
      color: colors.gray,
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "20px",
      fontFamily: "General Sans",
    },
    createNewAccountText: {
      color: colors.darkBlue,
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "20px",
      cursor: "pointer",
      textDecoration: "none",
    },
    errorMessage: {
      fontFamily: "General sans",
      fontWeight: "500",
      marginTop: 2,
      color: colors.errorRed,
    },
    forgotPasswordText: {
      fontFamily: "General Sans",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "20px",
      textDecoration: "none",
      cursor: "pointer",
    },
    headerContainer: {
      marginTop: "0px",
    },
    subHeaderContainer: {
      marginTop: "16px",
    },
    headerText: {
      color: colors.black,
      fontFamily: "General Sans",
      fontSize: "40px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
      letterSpacing: "-2px",
    },
    headerText1800px: {
      fontSize: "36px",
    },
    headerText900px: {
      fontSize: "32px",
    },
    headerTextContainer: {
      marginTop: "0px",
    },
    inputLabelText: {
      color: colors.black,
      fontFamily: "General Sans",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "24px",
      textTransform: "capitalize",
    },
    inputTextBox: {
      background: "#FFF",
      fontFamily: "General Sans",
      marginTop: "0px",
    },
    loginText: {
      cursor: "pointer",
      fontFamily: "General Sans",
    },
    rememberMeText: {
      fontFamily: "General Sans",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "20px",
      cursor: "pointer",
      margin: "0px",
    },
    selectedSectionHeading: {
      color: colors.black,
      fontFamily: "General Sans",
      textAlign: "center",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
      letterSpacing: "0.1px",
      cursor: "pointer",
    },
    subHeadingText: {
      color: colors.lightGrey,
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "24px",
      fontFamily: "General sans",
    },
    subHeadingText900px: {
      fontSize: "14px",
    },
    tabsBottomGreyLine: {
      marginLeft: "0px",
      marginRight: "0px",
    },
    unSelectedSectionHeading: {
      color: "#616C82",
      textAlign: "center",
      fontFamily: "General Sans",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "normal",
      letterSpacing: "0.1px",
      cursor: "pointer",
    },
  },
};

export default style;
