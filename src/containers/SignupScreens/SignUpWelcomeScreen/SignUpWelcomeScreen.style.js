import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

export const style = StyleSheet.create({
  formHeaderStyle: {
    color: colors.black,
    fontSize: 18,
    marginBottom: 24,
    paddingTop: 24,
  },
  contentContainerStyle: {
    flex: 1,
  },
  customButtonContainer: {
    marginBottom: 16,
  },
  innerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  signUpSubContainer: {
    flex: 1,
  },
  webFormHeaderStyle: {
    paddingTop: 0,
  },
  signupFooterContainer: {
    gap: 32,
  },
  smSignupContainer: {
    gap: 32,
  },
  signupContainer: {
    flex: 1,
    gap: 56,
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
