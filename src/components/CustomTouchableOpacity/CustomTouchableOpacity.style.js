import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    button: {
      flexDirection: "row",
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
    },
    disabledButton: {
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "not-allowed" } : {}),
    },
  };
};

export default getStyles;
