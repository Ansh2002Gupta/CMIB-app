import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    top: 30,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  option: {
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  optionTextStyle: (currentBreakpoint) => ({
    fontSize: 12,
    marginLeft: 2,
    borderWidth: 0,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth:
          currentBreakpoint === "md"
            ? "80px"
            : currentBreakpoint === "sm"
            ? "150px"
            : "100%",
      },
    }),
  }),
});

export default styles;
