import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      alignItems: "center",
      flexDirection: "row",
    },
    clickable: {
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
    },
    disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
    selected: {
      borderColor: colors.black,
      borderWidth: 1,
    },
  };
};

export default getStyles;
