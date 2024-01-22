import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

export const styles = StyleSheet.create({
  headerContainerStyle: {
    marginTop: 24,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: "flex-end",
  },
  headerTextStyle: {
    color: colors.darkBlue,
    fontSize: 14,
    lineHeight: 20,
  },
  iconBar: {
    alignSelf: "center",
    margin: 16,
  },
  formHeaderStyle: {
    color: colors.black,
    fontSize: 18,
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
  lgStepperContainer: {
    flex: 3,
    alignItems: "flex-end",
    marginTop: 148,
  },
  stepperContainer: {
    flex: 3.5,
    alignItems: "flex-end",
    marginTop: 148,
  },
  stepperParentContainer: {
    marginTop: 24,
  },
  resetStepperParentContainer: {
    marginTop: 0,
  },
  resetContainerFlex: {
    flex: 0.1,
  }
});

export const getResponsiveStyles = ({ str, currentBreakpoint }) => {
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
        return { ...styles.resetStepperParentContainer, ...styles.resetContainerFlex };
      }
      return {
        ...styles.stepperContainer,
      };
    }
    default:
      return {};
  }
};
