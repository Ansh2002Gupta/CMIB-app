import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const isWeb = Platform.OS.toLocaleLowerCase() === "web";

const styles = StyleSheet.create({
  outerContainer: {
    width: 144,
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.white,
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 16,
    boxShadow: isWeb ? `0px 2px 5px 0px ${colors.greyThree}` : "",
    ...Platform.select({
      android: {
        transform: [{ rotate: "-90deg" }],
      },
      ios: {
        transform: [{ rotate: "-90deg" }],
      },
    }),
  },
  dataInfo: {
    color: "pink",
    fontSize: 40,
  },
  textInfo: {
    fontSize: 14,
  },
  dataTextWrapper: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
  },
});

export const getDataTextStyling = (textColor) => {
  return {
    color: textColor,
    fontSize: 40,
  };
};

export const setCustomPosition = (customPosition) => {
  return {
    position: "absolute",
    ...styles.outerContainer,
    ...customPosition,
  };
};

export const getStylesAsPerWidth = (currentBreakpoint, styleKey) => {
  switch (currentBreakpoint.trim().toLowerCase()) {
    case "xs":
      if (styleKey === "outerContainer") {
        return {
          ...styles.outerContainer,
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
