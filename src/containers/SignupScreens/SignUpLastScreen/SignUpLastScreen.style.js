import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

export const style = StyleSheet.create({
  headerText: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    fontWeight: "600",
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
    gap: 32,
    flex: 1,
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
  customContainerStyle: {
    marginBottom: 16,
  },
});

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
