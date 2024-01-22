import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const isWeb = Platform.OS.toLowerCase() === "web";
const webPointer = isWeb ? { cursor: "pointer" } : {};

const style = {
  container: {
    backgroundColor: colors.white,
    paddingRight: 16,
    paddingLeft: 16,
  },
  activeStyle: {
    paddingTop: 16,
    borderBottomWidth: 3,
    borderColor: colors.green,
    zIndex: 1,
    marginBottom: -1,
  },
  topTabs: {
    width: "50%",
    ...webPointer,
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
  },
  rememberMeText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.darkBlue,
    ...webPointer,
  },
  loginButtonView: {
    marginTop: 32,
    ...webPointer,
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
    ...webPointer,
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
  minHeight: {
    minHeight: 500,
  },
  gapForWebView: {
    gap: 24,
  },
  marginBottom: {
    marginBottom: 0,
  },
  forgotButtonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  // Web view related Styles
  webView: {
    activeTab: {
      marginBottom: -2,
      zIndex: 1,
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
      lineHeight: 20,
      ...webPointer,
    },
    errorMessage: {
      marginTop: 2,
      color: colors.errorRed,
    },
    forgotPasswordText: {
      fontSize: 14,
      lineHeight: 20,
      ...webPointer,
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
      backgroundColor: colors.white,
      marginTop: 0,
    },
    rememberMeText: {
      fontSize: 14,
      lineHeight: 20,
      margin: 0,
      ...webPointer,
    },
    selectedSectionHeading: {
      color: colors.black,
      textAlign: "center",
      fontSize: 16,
      ...webPointer,
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
      ...webPointer,
    },
  },
  loginHeaderText: {
    fontSize: 28,
    color: colors.black,
  },
};

export default style;
