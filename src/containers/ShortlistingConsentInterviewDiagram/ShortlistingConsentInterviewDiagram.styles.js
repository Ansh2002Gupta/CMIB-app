import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const isWeb = Platform.OS.toLocaleLowerCase() === "web";

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    marginBottom: 50,
    ...Platform.select({
      android: {
        transform: [{ rotate: "90deg" }],
      },
      ios: {
        transform: [{ rotate: "90deg" }],
      },
    }),
  },
  rectangle: {
    position: "relative",
    display: "flex",
    width: 400,
    height: 400,
    backgroundColor: colors.init_background,
  },
  borderSegment: {
    position: "absolute",
    borderWidth: 1,
  },
  line: {
    position: "relative",
    display: "flex",
    width: 600,
    height: 1,
    backgroundColor: colors.white,
  },
  topFirstHalf: {
    top: 0,
    left: 0,
    width: "50%",
    borderColor: colors.extraDarkPurple,
    borderTopWidth: 1,
  },
  topSecondHalf: {
    top: 0,
    right: 0,
    width: "50%",
    borderColor: colors.glowingPurple,
    borderTopWidth: 1,
  },
  bottomFirstHalf: {
    bottom: 0,
    left: 0,
    width: "50%",
    borderColor: colors.extraDarkPurple,
    borderBottomWidth: 1,
  },
  bottomSecondHalf: {
    bottom: 0,
    right: 0,
    width: "50%",
    borderColor: colors.medicineBlue,
    borderBottomWidth: 1,
  },
  leftFirstHalf: {
    top: 0,
    left: 0,
    height: "50%",
    borderColor: colors.darkBlue,
    borderLeftWidth: 1,
  },
  leftSecondHalf: {
    bottom: 0,
    left: 0,
    height: "50%",
    borderColor: colors.darkBlue,
    borderLeftWidth: 1,
  },
  rightFirstHalf: {
    top: 0,
    right: 0,
    height: "50%",
    borderColor: colors.glowingPurple,
    borderRightWidth: 1,
  },
  rightSecondHalf: {
    bottom: 0,
    right: 0,
    height: "50%",
    borderColor: colors.medicineBlue,
    borderRightWidth: 1,
  },
  tempBox1: {
    width: 200,
    height: 200,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: colors.glowingPurple,
    borderRightColor: colors.glowingPurple,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderStyle: "solid",
    borderTopRightRadius: 50,
    position: "absolute",
    top: 0,
    right: 0,
  },
  tempBox2: {
    width: 200,
    height: 200,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomColor: colors.medicineBlue,
    borderRightColor: colors.medicineBlue,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderStyle: "solid",
    borderBottomRightRadius: 50,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  firstLineSegment: {
    borderColor: colors.hotPink,
    width: "33.33%",
    top: 0,
    left: 0,
  },
  secondLineSegment: {
    borderColor: colors.ambientOrange,
    width: "33.33%",
    top: 0,
    left: "33.33%",
  },
  thirdLineSegment: {
    borderColor: colors.paleYellow,
    width: "33.33%",
    top: 0,
    left: "66.66%",
  },
  dataCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
    fontSize: 14,
    fontWeight: 600,
  },
  dataCircle1: {
    backgroundColor: colors.glowingPurple,
    position: "absolute",
    top: -15,
    right: 29,
    ...Platform.select({
      android: {
        transform: [{ rotate: "-90deg" }],
      },
      ios: {
        transform: [{ rotate: "-90deg" }],
      },
    }),
  },
  dataCircle2: {
    backgroundColor: colors.medicineBlue,
    position: "absolute",
    bottom: -15,
    right: 29,
    ...Platform.select({
      android: {
        transform: [{ rotate: "-90deg" }],
      },
      ios: {
        transform: [{ rotate: "-90deg" }],
      },
    }),
  },
});

export const getStylesAsPerWidth = (currentBreakpoint, styleKey) => {
  switch (currentBreakpoint) {
    case "xs":
      if (styleKey === "outerContainer") {
        return {
          ...styles.outerContainer,
          ...{
            overflow: "visible",
            marginTop: 100,
            transform: "rotate(90deg)",
          },
        };
      } else if (styleKey === "dataCircle1" || styleKey === "dataCircle2") {
        return {
          ...styles[styleKey],
          ...{
            transform: "rotate(-90deg)",
          },
        };
      }
    case "sm":
      if (styleKey === "outerContainer") {
        return {
          ...styles.outerContainer,
          ...{
            overflow: "visible",
            marginTop: 100,
            transform: "rotate(90deg)",
          },
        };
      } else if (styleKey === "dataCircle1" || styleKey === "dataCircle2") {
        return {
          ...styles[styleKey],
          ...{
            transform: "rotate(-90deg)",
          },
        };
      }
    default:
      return {
        ...styles[styleKey],
      };
  }
};

export default styles;
