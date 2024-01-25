import { StyleSheet } from "@unthinkable/react-core-components";

import commonStyles from "../../theme/styles/commonStyles";

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    flexDirection: "row",
    flex: 1,
  },
  webInnerContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    display: "flex",
    gap: 48,
    alignSelf: "center",
    width: "100%",
  },
  webSubContainer: {
    width: "65%",
    alignItems: "flex-start",
    height: "100%",
  },
  width900pxOrLessContainer: {
    width: "75%",
  },
  smScreenContainer: {
    alignSelf: "center",
    width: "70%",
  },
  largeScreenContainer: {
    width: "56%",
  },
  extraSmallScreenContainer: {
    width: "90%",
    alignSelf: "center",
  },
  signUpWebContainer: {
    display: "flex",
    width: "45%",
    alignSelf: "flex-start",
    marginBottom: 48,
  },
});

export const getResponsiveStyles = ({ str, currentBreakpoint }) => {
  switch (str) {
    case "signUpWebContainer": {
      if (currentBreakpoint === "lg") {
        return {
          ...commonStyles.commonWebContainer,
          ...style.signUpWebContainer,
          ...style.largeScreenContainer,
        };
      }
      if (currentBreakpoint === "md") {
        return {
          ...commonStyles.commonWebContainer,
          ...style.signUpWebContainer,
          ...style.width900pxOrLessContainer,
        };
      }
      if (currentBreakpoint === "sm") {
        return {
          ...commonStyles.commonWebContainer,
          ...style.signUpWebContainer,
          ...style.smScreenContainer,
        };
      }
      if (currentBreakpoint === "xs") {
        return {
          ...commonStyles.commonWebContainer,
          ...style.signUpWebContainer,
          ...style.extraSmallScreenContainer,
        };
      }
      return {
        ...commonStyles.commonWebContainer,
        ...style.signUpWebContainer,
      };
    }
    default:
      return;
  }
};
