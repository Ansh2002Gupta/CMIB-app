import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const getMaxWidth = (currentBreakpoint) => {
  switch (currentBreakpoint) {
    case "lg":
      return "200px";
    case "md":
      return "85px";
    case "sm":
      return "120px";
    case "xs":
      return "50px";
    default:
      return "250px";
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: colors.lightGrey,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  sessionText: (currentBreakpoint) => ({
    fontSize: 14,
    marginLeft: 2,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: getMaxWidth(currentBreakpoint),
      },
    }),
  }),
  iconDown: {
    height: 15,
    width: 15,
    marginLeft: 5,
  },
  sessionBarText: {
    fontSize: 14,
  },
});

export default styles;
