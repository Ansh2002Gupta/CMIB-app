export const getStyles = (theme) => {
  const { colors } = theme;

  return {
    inputContainer: {
      flexDirection: "row",
    },
    contentContainerStyle: {
      marginTop: 24,
      flex: 1,
    },
    webContentContainer: {
      gap: 32,
      flex: 1,
    },
    registrationInput: {
      flex: 2,
    },
    partnerInput: {
      flex: 1,
      marginLeft: 24,
    },
    noInput: {
      marginLeft: 24,
      flex: 2,
    },
    codeInput: {
      flex: 1,
    },
    innerContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    smSignupContainer: {
      gap: 32,
    },
    signupContainer: {
      flex: 1,
      gap: 56,
    },
    signupFooterContainer: {
      gap: 32,
    },
    alreadyAccountContainer: {
      flexDirection: "row",
      alignSelf: "center",
    },
    alreadyAccountText: {
      fontSize: 14,
      color: colors.mediumGray,
    },
    customSaveButtonContainer: {
      marginBottom: 16,
    },
    formContainer: {
      flex: 1,
    },
  };
};

export const getResponsiveStyles = ({ str, currentBreakpoint, theme }) => {
  const style = getStyles(theme);

  switch (str) {
    case "signupContainer": {
      if (
        currentBreakpoint === "sm" ||
        currentBreakpoint === "xs" ||
        currentBreakpoint === "md"
      ) {
        return {
          ...style.signupContainer,
          ...style.smSignupContainer,
        };
      }
      return {
        ...style.signupContainer,
      };
    }
    default:
      return;
  }
};
