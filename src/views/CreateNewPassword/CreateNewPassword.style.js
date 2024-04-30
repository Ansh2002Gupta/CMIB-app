const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainView: {
      flex: 1,
    },
    container: {
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor: colors.white,
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
      padding: 16,
      marginTop: 0,
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      marginLeft: -16,
      marginRight: -16,
      marginTop: 24,
    },
    submitView: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    backToLoginText: {
      textAlign: "center",
      marginTop: 16,
      marginBottom: 16,
      fontSize: 14,
      color: colors.darkBlue,
    },
    bullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.lightGrey,
      marginRight: 10,
    },
    bulletText: {
      fontSize: 14,
      color: colors.gray,
    },
    validationText: {
      marginBottom: 8,
      fontSize: 14,
      color: colors.black,
    },
    validationView: {
      flexDirection: "row",
      marginTop: 5,
    },
    scrollViewContainerStyle: {
      justifyContent: "space-between",
      flexGrow: 1,
    },
    passwordFieldsErrorContainer: {
      marginTop: 16,
    },
    passwordFieldsErrorText: {
      color: colors.errorRed,
      fontSize: 14,
    },
    requirementsPoints: {
      marginBottom: 0,
    },
    erroInputStyle: {
      paddingBottom: 0,
    },
    inputStyle: {
      paddingBottom: 40,
    },
    // web view related styles
    webView: {
      mainView: {
        margin: 0,
      },
      headerTextContainer: {
        marginTop: 0,
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
      headerNameText: {
        color: colors.darkGrey,
        fontSize: 16,
        lineHeight: 24,
      },
      headerNameText900: {
        fontSize: 14,
      },
      inputTextBox: {
        backgroundColor: colors.white,
        marginTop: 0,
      },
      erroInputStyle: {
        paddingBottom: 10,
      },
      passwordRequirements: {
        color: colors.gray,
        fontSize: 14,
        lineHeight: 22,
      },
      companyView: {
        backgroundColor: colors.white,
        marginTop: 40,
      },
      requirementsPoints: (currentBreakpoint) => ({
        display: "grid",
        gridTemplateColumns: currentBreakpoint === "sm" ? "1fr" : "1fr 1fr",
        gridRowGap: currentBreakpoint === "sm" ? 0 : 16,
      }),
    },
    ErrorStyle: {
      paddingTop: 4,
    },
    backButtonStyle: {
      justifyContent: "center",
    },
  };
};

export default getStyles;
