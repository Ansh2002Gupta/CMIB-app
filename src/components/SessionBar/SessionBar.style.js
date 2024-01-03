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
    cursor: "pointer",
  },
  sessionText: (currentBreakpoint) => ({
    fontWeight: "600",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    cursor: "pointer",
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth:
          currentBreakpoint === "lg"
            ? "200px"
            : currentBreakpoint === "md"
            ? "40px"
            : currentBreakpoint === "sm"
            ? "120px"
            : currentBreakpoint === "sx"
            ? "50px"
            : "250px",
      },
    }),
  }),
});

export default styles;
