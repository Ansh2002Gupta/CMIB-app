import { Platform } from "@unthinkable/react-core-components";

import { STEPPER_STATE } from "../../constants/constants";

const isWeb = Platform.OS.toLocaleLowerCase() === "web";

export const getStyles = (theme) => {
  const { colors } = theme;

  return {
    stepsContainer: {
      display: "flex",
      flexDirection: "row",
    },
    stepperVertical: {
      flexDirection: "column",
    },
    step: {
      textAlign: "center",
      flex: 1,
      cursor: isWeb ? "default" : "",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    circleLabel: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    },
    circle: {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: colors.greyOne,
      borderRadius: 32,
      backgroundColor: colors.white,
      width: 24,
      height: 24,
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    activeCircle: {
      backgroundColor: colors.green,
      borderWidth: 2,
      borderStyle: "solid",
      boxShadow: isWeb ? `0px 2px 5px 0px ${colors.greyThree}` : "",
      ...Platform.select({
        ios: {
          shadowColor: colors.greyThree,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 5,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    doneCircle: {
      background: colors.green,
      borderColor: colors.green,
    },
    inActiveCircle: {
      color: colors.black,
    },
    activeOrPendingCircle: {
      width: 30,
      height: 30,
    },
    circleText: {
      fontSize: 14,
    },
    activeCircleText: {
      color: colors.white,
    },
    doneCircleText: {
      color: colors.greyTwo,
    },
    inActiveCircleText: {
      color: colors.black,
    },
    label: {
      fontSize: 16,
    },
    activeLabel: {
      color: colors.black,
      fontSize: 18,
      fontWeight: "600",
    },
    inActiveLabel: {
      color: colors.subHeadingGray,
    },
    verticalLabel: {
      position: "absolute",
      right: "125%",
      top: "15%",
      width: 170,
      textAlign: "end",
    },
    horizontalLabel: {
      marginTop: 16,
    },
    line: {
      height: 0,
      borderStyle: "solid",
      borderColor: colors.greyOne,
      borderWidth: 4,
      borderRadius: 6,
    },
    horizontalLine: {
      position: "absolute",
      left: "55%",
      width: "90%",
    },
    horizontalLineTop: {
      top: "17%",
    },
    verticalLine: {
      height: 89,
      borderRadius: 0,
    },
    doneLine: {
      borderColor: colors.green,
    },
    onlyActiveLabelBox: {
      display: "flex",
      justifyContent: "center",
      marginTop: 16,
    },
    onlyActiveLabel: {
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      color: colors.black,
    },
  };
};

export const getAppropriateStyle = ({
  fieldName,
  stepValue,
  getStepStatus,
  theme,
}) => {
  const isStepperActive = getStepStatus(stepValue) === STEPPER_STATE.ACTIVE;
  const isStepperDone = getStepStatus(stepValue) === STEPPER_STATE.DONE;
  const isStepperInActive = getStepStatus(stepValue) === STEPPER_STATE.INACTIVE;

  const styles = getStyles(theme);

  switch (fieldName) {
    case "circle": {
      let styleName = "";
      if (isStepperActive) styleName = "activeCircle";
      if (isStepperDone) styleName = "doneCircle";
      if (isStepperInActive) styleName = "inActiveCircle";
      return styles[styleName];
    }
    case "circleText": {
      let styleName = "";
      if (isStepperActive) styleName = "activeCircleText";
      if (isStepperDone) styleName = "doneCircleText";
      if (isStepperInActive) styleName = "inActiveCircleText";
      return styles[styleName];
    }
    case "label": {
      let styleName = "";
      if (isStepperActive) styleName = "activeLabel";
      if (isStepperInActive) styleName = "inActiveLabel";
      return styles[styleName];
    }
    case "line": {
      let styleName = "";
      if (isStepperDone) styleName = "doneLine";
      return styles[styleName];
    }
    default: {
      return {};
    }
  }
};
