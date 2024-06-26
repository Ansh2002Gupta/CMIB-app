import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
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
  };
};

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

export default getStyles;
