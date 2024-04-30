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
      marginTop: 24,
      marginBottom: 24,
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    webContainerStyle: {
      backgroundColor: colors.white,
      gap: 32,
      flex: 1,
    },
    inputContainer: {
      flexDirection: "row",
    },
    dividerStyle: {
      height: 1,
      backgroundColor: colors.lightGrey,
      marginBottom: 24,
    },
    dropdownStyle: {
      minWidth: 96,
    },
    secondInput: {
      marginLeft: 24,
      flex: 2,
    },
    buttonContainer: {
      marginBottom: 16,
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
    customSaveButtonContainer: {
      bottom: 0,
    },
    webSignupFooter: {
      gap: 32,
    },
    formContainer: {
      flex: 1,
    },
    firstInput: {
      flex: 1,
    },
    removeButton: {
      marginBottom: 24,
    },
    contactPersonContainer: {
      marginBottom: 16,
    },
    disabledBtnstyle: {
      backgroundColor: colors.white,
      opacity: 0.5,
      ...Platform.select({
        web: {
          cursor: "not-allowed",
        },
      }),
    },
    note: {
      marginTop: 16,
      color: colors.darkGrey,
      fontStyle: "italic",
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
