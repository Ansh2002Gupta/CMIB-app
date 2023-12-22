import colors from "../../assets/colors";

export const styles = {
  headerContainerStyle: {
    marginTop: 24,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  headerTextStyle: {
    textAlign: "right",
    color: colors.darkBlue,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    fontFamily: "GeneralSans-Semibold",
  },
  iconBar: {
    alignSelf: "center",
    margin: 16,
  },
  formHeaderStyle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: 24,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  innerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  webIconBar: {
    transform: "rotate(90deg)",
  },
  webStepperContainer: {
    flexDirection: "row-reverse",
  },
  lgStepperContainer: {
    flex: 2.5,
  },
  stepperContainer: {
    flex: 3.5,
  },
};

export const getResponsiveStyles = ({str, currentBreakpoint}) => {
  switch (str) {
    case "steperContainer": {
      if (currentBreakpoint === "lg") {
        return {
          ...styles.lgStepperContainer,
        };
      }
      if (currentBreakpoint === "md") {
        return {
          ...styles.lgStepperContainer,
        };
      }
      if (currentBreakpoint === "xs" || currentBreakpoint === "sm") {
        return;
      }
      return {
        ...styles.stepperContainer,
      };
    }
    default:
      return;
  }
};
