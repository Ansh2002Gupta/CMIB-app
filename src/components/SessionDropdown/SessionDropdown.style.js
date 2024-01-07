import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  modalContent: (currentBreakpoint) => ({
    position: "absolute",
    top: 30,
    left: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    zIndex: 1,
    ...Platform.select({
      web: {
        width:
          currentBreakpoint === "md"
            ? "200%"
            : currentBreakpoint === "sm"
            ? "120%"
            : "100%",
      },
    }),
  }),
  option: {
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  optionTextStyle:{
    fontSize: 14,
    marginLeft: 2,
    borderWidth: 0,
  },
});

export default styles;
