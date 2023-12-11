import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";
const style = {
  buttonStyle: {
    height: 56,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    // bottom: 16,
    cursor: "pointer",
  },
  disableButtonStyle: {
    opacity: 0.5,
  },
  titleStyle: {
    fontSize: 16,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General Sans"
        : "GeneralSans-Semibold",
    color: colors.white,
    margin: 8,
    fontWeight: "600",
  },
};

export default style;
