//TODO: Add the current Login code here. Currently these files are just for reference
import { Platform } from "@unthinkable/react-core-components";

const isWeb = Platform.OS === "web";

export const getStyles = (theme) => {
  const { colors } = theme;

  return {
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
      cursor: "pointer",
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
      justifyContent: "space-between",
    },
    forgotPasswordText: {
      fontSize: 14,
      color: colors.darkBlue,
      cursor: "pointer",
      fontWeight: "600",
    },
    loginButtonView: { marginTop: 32, cursor: "pointer" },
    accountView: {
      marginTop: 24,
      justifyContent: "center",
      flexDirection: "row",
      gap: 4,
    },
    newAccountText: {
      textDecorationLine: "none",
      color: colors.darkBlue,
      fontSize: 14,
      fontWeight: "600",
      cursor: "pointer",
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
      marginHorizontal: 30,
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: 16,
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
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 20,
        fontFamily: "General Sans",
      },
      createNewAccountText: {
        color: colors.darkBlue,
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 20,
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
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 20,
        textDecoration: "none",
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
        fontFamily: "General Sans",
        fontSize: 40,
        fontStyle: "normal",
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
        fontFamily: "General Sans",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 24,
        textTransform: "capitalize",
      },
      inputTextBox: {
        background: "#FFF",
        fontFamily: "General Sans",
        marginTop: 0,
      },
      rememberMeText: {
        fontFamily: "General Sans",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 20,
        cursor: "pointer",
        margin: 0,
      },
      selectedSectionHeading: {
        color: colors.black,
        fontFamily: "General Sans",
        textAlign: "center",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        cursor: "pointer",
      },
      subHeadingText: {
        color: colors.darkGrey,
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 24,
        fontFamily: "General sans",
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
        fontFamily: "General Sans",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
        cursor: "pointer",
      },
    },
    errorView: {
      alignItems: "center",
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.errorBackground,
      marginTop: 10,
    },
    errorText: {
      fontSize: 14,
      color: colors.errorRed,
      fontWeight: "500",
      fontFamily: isWeb ? "General Sans" : "GeneralSans-SemiBold",
    },
    FollowUsIconsStyle: { marginTop: 32, marginBottom: 20 },
  };
};

export const getResponsiveStyles = ({ str, currentBreakpoint, theme }) => {
  const styles = getStyles(theme);
  const width1800pxOrLess = currentBreakpoint !== "xxl";
  const width900pxOrLess =
    currentBreakpoint === "xs" || currentBreakpoint === "sm";

  switch (str) {
    case "label.cmib": {
      if (width900pxOrLess) {
        return {
          ...styles.webView.headerText,
          ...styles.webView.headerText900px,
        };
      }
      if (width1800pxOrLess) {
        return {
          ...styles.webView.headerText,
          ...styles.webView.headerText1800px,
        };
      }
      return styles.webView.headerText;
    }
    case "label.cmibText": {
      if (width900pxOrLess) {
        return {
          ...styles.webView.subHeadingText,
          ...styles.webView.subHeadingText900px,
        };
      }
      return styles.webView.subHeadingText;
    }
    default: {
      return {};
    }
  }
};
