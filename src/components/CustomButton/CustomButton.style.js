import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  defaultBtnStyles: {
    maxHeight: 56,
    padding: 17,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignContent: "center",
    color: colors.black,
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  greenBtn: {
    backgroundColor: colors.green,
    color: colors.white,
  },
  whiteText: {
    color: colors.white,
  },
  iconRightStyle: {
    marginRight: 8,
    top: 8,
  },
  iconLeftStyle: {
    marginLeft: 8,
  },
  btnText: {
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-SemiBold",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  containerStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default styles;
