import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";

const style = {
  headerContainer: {
    marginTop: 24,
  },
  heading: {
    color: colors.black,
    fontSize: 28,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General Sans"
        : "GeneralSans-Semibold",
    fontWeight: "600",
  },
  secondHeading: {
    color: colors.darkGrey,
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General Sans"
        : "GeneralSans-Medium",
    lineHeight: 20,
    marginTop: 8,
  },
};

export default style;
