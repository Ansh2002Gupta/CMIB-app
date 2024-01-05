import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";

const getFontFamily = (fontWeight) => {
  return fontWeight === "600" ? "GeneralSans-Semibold" : "GeneralSans-Medium";
};

const style = {
  textStyle: (fontWeight) => ({
    fontSize: 12,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : getFontFamily(fontWeight),
    color: colors.black,
    fontWeight: fontWeight,
  }),
};

export default style;
