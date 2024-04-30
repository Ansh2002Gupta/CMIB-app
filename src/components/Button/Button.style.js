import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    disabledBtn: {
      opacity: 0.5,
      backgroundColor: colors.darkGrey,
      cursor: Platform.OS.toLowerCase() === "web" ? "default" : "",
    },
  };
};

export default getStyles;
