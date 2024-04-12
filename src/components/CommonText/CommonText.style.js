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
  container: {
    ...Platform.select({
      web: {
        flexShrink: "unset",
        flexWrap: "wrap",
        wordBreak: "break-word",
      },
    }),
  },
  textStyle: (fontWeight) => ({
    fontSize: 12,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : getFontFamily(fontWeight),
    color: colors.black,
    fontWeight: fontWeight,
  }),
  horizontalLine: (color) => ({
    borderTopWidth: 1,
    width: "100%",
    color,
  }),
  mandotaryView: { flex: 1, flexDirection: "row" },
};

export default style;
