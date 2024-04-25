import { Platform } from "@unthinkable/react-core-components";

const iconStyle = {
  height: 20,
  width: 20,
};

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    zoomInfoContainer: {
      marginTop: 32,
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
    },
    sliderBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flex: 1,
    },
    zoomIcon: {
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
      ...iconStyle,
    },
    disabledIcon: {
      ...iconStyle,
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "default" } : {}),
    },
    zoomSlider: {
      flex: 1,
    },
    percentageText: {
      fontSize: 14,
      minWidth: 36,
    },
  };
};

export default getStyles;
