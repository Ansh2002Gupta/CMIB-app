import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const isWeb = Platform.OS.toLocaleLowerCase() === "web";

export const styles = StyleSheet.create({
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
    backgroundColor: colors.greenOne,
    borderWidth: 2,
    borderStyle: "solid",
    boxShadow: isWeb ? "0px 2px 5px 0px rgba(20, 25, 26, 0.16)" : "",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(20, 25, 26, 0.16)",
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
    background: colors.greenOne,
    borderColor: colors.greenOne,
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
    fontWeight: "600",
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
    fontWeight: "500",
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
    width: isWeb ? "max-content" : "100%",
    right: "125%",
    top: "20%",
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
    borderColor: colors.greenOne,
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
});

export const getAppropriateStyle = ({
  fieldName,
  stepValue,
  getStepStatus,
}) => {
  switch (fieldName) {
    case "circle": {
      let styleName = "";
      if (getStepStatus(stepValue) === "active") styleName = "activeCircle";
      if (getStepStatus(stepValue) === "done") styleName = "doneCircle";
      if (getStepStatus(stepValue) === "inActive") styleName = "inActiveCircle";
      return styles[styleName];
    }
    case "circleText": {
      let styleName = "";
      if (getStepStatus(stepValue) === "active") styleName = "activeCircleText";
      if (getStepStatus(stepValue) === "done") styleName = "doneCircleText";
      if (getStepStatus(stepValue) === "inActive")
        styleName = "inActiveCircleText";
      return styles[styleName];
    }
    case "label": {
      let styleName = "";
      if (getStepStatus(stepValue) === "active") styleName = "activeLabel";
      if (getStepStatus(stepValue) === "inActive") styleName = "inActiveLabel";
      return styles[styleName];
    }
    case "line": {
      let styleName = "";
      if (getStepStatus(stepValue) === "done") styleName = "doneLine";
      return styles[styleName];
    }
    default: {
      return {};
    }
  }
};
