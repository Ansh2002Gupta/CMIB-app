import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

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
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 2,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth:
          currentBreakpoint === "lg"
            ? "200px"
            : currentBreakpoint === "md"
            ? "10px"
            : currentBreakpoint === "sm"
            ? "90px"
            : currentBreakpoint === "sx"
            ? "50px"
            : "250px",
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