import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";
const style = {
  textStyle: {
    fontSize: 12,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    fontWeight: "500",
    color: colors.black,
  },
};

export default style;
