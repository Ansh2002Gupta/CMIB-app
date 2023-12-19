import colors from "../../../assets/colors";

export const style = {
  headerText: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    fontWeight: "600",
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
    flex: 1,
  },
  buttonContainer: {
    paddingLeft: 16,
    paddingRight: 16,
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
};

export const getResponsiveStyles = ({ str, currentBreakpoint }) => {
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
