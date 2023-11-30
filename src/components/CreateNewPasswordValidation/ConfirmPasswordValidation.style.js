import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";

const style = {
  bulletText: {
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    color: colors.gray,
  },
  validationText: {
    marginBottom: 8,
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    color: colors.black,
    fontWeight: "500",
  },
  validationView: { flexDirection: "row", marginTop: 5 },
  bulletIconStyle: { width: 6, height: 6, borderRadius: 5, margin: 5 },
};
export default style;
