const screenContainerWidth = {
  maxWidth: 600,
  marginBottom: 30,
};

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainView: {
      flex: 1,
      justifyContent: "center",
    },
    container: {
      backgroundColor: colors.white,
      paddingRight: 0,
      paddingLeft: 0,
    },
    mobContainer: {
      paddingRight: 16,
      paddingLeft: 16,
    },
    webFontFamily: {
      fontFamily: "General Sans",
    },
    forgotHeaderText: {
      fontSize: 40,
    },
    forgotHeaderContainer: {
      marginTop: 0,
    },
    customSubHeading: {
      fontSize: 16,
      color: colors.subHeadingGray,
    },
    width900pxOrCustomSubHeading: {
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
      paddingTop: 24,
      paddingRight: 16,
      paddingLeft: 16,
    },
    firstTextInput: { marginTop: 8 },
    width900pxOrWebEmailInput: {
      marginTop: 16,
    },
    webEmailInput: {
      marginTop: 56,
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      marginLeft: -16,
      marginRight: -16,
      marginTop: 24,
    },
    submitView: { padding: 16, flex: 1, justifyContent: "flex-end" },
    backToLoginText: {
      fontSize: 14,
      color: colors.darkBlue,
    },
    whiteBackground: {
      backgroundColor: colors.white,
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: 0,
    },
    grayBackground: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
      marginTop: 0,
    },
    webSubmitView: {
      backgroundColor: colors.white,
      flex: 1,
      justifyContent: "flex-end",
    },
    customTextInput: {
      borderRadius: 12,
    },
    customAsteriskStyle: {
      color: colors.red,
    },
    footerImage: {
      position: "absolute",
      bottom: 0,
    },
    width900pxOrLessSubmitBtn: {
      height: 44,
    },
    width900pxOrLessForgotHeading: {
      fontSize: 30,
    },
    width1200pxOrLessForgotHeading: {
      fontSize: 34,
    },
    commonScreenContainers: {
      width: "75% ",
      ...screenContainerWidth,
    },
    forgotPasswordWebContainer: {
      flex: 0.9,
      ...screenContainerWidth,
      maxHeight: 780,
    },
    headerText: {
      fontSize: 28,
    },
    backButtonStyle: {
      marginTop: 24,
    },
    backToLoginContainer: {
      justifyContent: "center",
      flexDirection: "row",
    },
    contentContainerStyle: {
      marginTop: 24,
      flex: 1,
    },
  };
};

export default getStyles;
