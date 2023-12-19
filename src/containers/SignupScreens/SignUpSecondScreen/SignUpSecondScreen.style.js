import colors from "../../../assets/colors";

export const style = {
  inputContainer: {
    flexDirection: "row",
  },
  contentContainerStyle: {
    marginTop: 24,
    marginBottom: 24,
    flex: 1,
  },
  webContentContainer: {
    gap: 32,
    flex: 1,
  },
  registrationInput: {
    flex: 1
  },
  partnerInput: {
    marginLeft: 24,
    maxWidth: 100
  },
  noInput: {
    marginLeft: 24,
    flex: 1
  },
  codeInput: {
    maxWidth: 100
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
  loginHere: {
    color: colors.darkBlue,
    fontSize: 14,
    alignSelf: "center",
    fontWeight: "600",
    cursor: "pointer",
  },
  customSaveButtonContainer: {
    bottom: 0,
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
