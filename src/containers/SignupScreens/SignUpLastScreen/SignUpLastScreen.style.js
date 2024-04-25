import { Platform } from "@unthinkable/react-core-components";

export const getStyles = (theme) => {
  const { colors } = theme;

  return {
    headerText: {
      color: colors.black,
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 24,
    },
    contentContainerStyle: {
      flex: 1,
      paddingTop: 24,
    },
    extraSmallContainer: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    mainContainerStyle: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: colors.backgroundColor,
    },
    seperator: {
      height: 1,
      backgroundColor: colors.lightGrey,
      marginBottom: 24,
    },
    inputContainer: {
      flexDirection: "row",
    },
    infoStyle: {
      marginTop: -16,
      marginBottom: 24,
      color: colors.darkGrey,
      fontSize: 14,
      lineHeight: 24,
    },
    secondInput: {
      marginLeft: 24,
      flex: 1,
    },
    webContentContainer: {
      backgroundColor: colors.white,
      gap: 20,
      flex: 1,
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
      bottom: 0,
    },
    formContainer: {
      marginBottom: 48,
      flex: 1,
    },
    customContainerStyle: {
      marginBottom: 16,
    },
    imageContainer: {
      marginBottom: 48,
    },
    labelBox: {
      ...Platform.select({
        web: {
          display: "inline-block",
        },
      }),
    },
    labelStar: {
      marginLeft: 4,
      color: colors.red,
      fontSize: 18,
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
