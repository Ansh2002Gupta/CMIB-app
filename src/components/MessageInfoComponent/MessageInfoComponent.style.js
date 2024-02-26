import {
  StyleSheet,
  Dimensions,
  Platform,
} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { width: WIDTH } = Dimensions.get("window");

const getMaxWidth = (currentBreakpoint) => {
  switch (currentBreakpoint) {
    case "lg":
      return "40vw";
    case "xl":
      return "45vw";
    case "md":
      return "35vw";
    case "sm":
      return "50vw";
    case "xs":
      return "70vw";
    default:
      return "50vw";
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },

  subContainer: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.backgroundColor,
    justifyContent: "center",
  },
  textSize: (currentBreakpoint) => ({
    fontSize: 14,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: getMaxWidth(currentBreakpoint),
      },
    }),
  }),
});

export default styles;
