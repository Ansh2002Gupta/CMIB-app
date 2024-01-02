import { Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = {
  defaultBtnStyles: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
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
  btnText: {
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
  },
};

export default styles;
