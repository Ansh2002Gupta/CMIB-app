import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";
const style = {
  textStyle: {
    fontSize: 16,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    fontWeight: "500",
    color: colors.white,
  },
};

export default style;
