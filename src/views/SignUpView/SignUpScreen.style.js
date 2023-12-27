import commonStyles from "../../theme/styles/commonStyles";

export const style = {
  container: {
    flex: 1,
  },
  webContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    gap: 48,
    alignSelf: "center",
    width: "100%",
  },
  webSubContainer: {
    flex: 5.5,
    alignItems: "flex-start",
    height: "100%",
  },
  width900pxOrLessContainer: {
    width: "65%",
  },
  smScreenContainer: {
    alignSelf: "center",
    width: "65%",
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
    minHeight: "70vH",
    marginBottom: 48
  },
};

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
