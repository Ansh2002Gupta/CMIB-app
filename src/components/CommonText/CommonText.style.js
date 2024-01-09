import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";

const getFontFamily = (fontWeight) => {
  switch (fontWeight) {
    case "400": {
      return "GeneralSans-Regular";
    }
    case "500": {
      return "GeneralSans-Medium";
    }
    case "600": {
      return "GeneralSans-Semibold";
    }
    case "bold": {
      return "GeneralSans-Semibold";
    }
    case "700": {
      return "GeneralSans-Bold";
    }
    default: {
      return "GeneralSans-Medium";
    }
  }
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
