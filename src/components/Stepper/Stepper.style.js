import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const isWeb = Platform.OS.toLocaleLowerCase() === "web";

export const styles = StyleSheet.create({
  stepsContainer: {
    display: "flex",
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
  },
  circle: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.greyOne,
    borderRadius: 32,
    backgroundColor: colors.white,
    padding: 8,
    width: 24,
    height: 24,
    margin: 0,
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: isWeb ? 20 : "",
    justifyContent: "center",
  },
  activeCircle: {
    backgroundColor: colors.greenOne,
    color: colors.white,
    borderWidth: 2,
    borderStyle: "solid",
    boxShadow: isWeb ? "0px 2px 5px 0px rgba(20, 25, 26, 0.16)" : "",
  },
  doneCircle: {
    background: colors.greenOne,
    color: colors.greyTwo,
  },
  inActiveCircle: {
    color: colors.black,
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
  },
  activeLabel: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 600,
  },
  inActiveLabel: {
    color: colors.subHeadingGray,
  },
  verticalLabel: {
    position: "absolute",
    width: isWeb ? "max-content" : "auto",
    right: "115%",
    top: "35%",
  },
  line: {
    height: 0,
    borderStyle: "solid",
    borderColor: colors.greyOne,
    borderWidth: 6,
    borderRadius: 6,
  },
  horizontalLine: {
    position: "absolute",
    top: isWeb ? "calc(50% - 10px)" : "50%",
    left: isWeb ? "calc(50% + 40px)" : "50%",
    width: isWeb ? "calc(100% - 85px)" : "100%",
  },
  verticalLine: {
    height: 89,
    borderRadius: 0,
  },
  doneLine: {
    borderColor: colors.greenOne,
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
