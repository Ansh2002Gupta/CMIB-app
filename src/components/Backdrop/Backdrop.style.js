import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    backdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: Platform.OS.toLowerCase() === "web" ? "100vh" : 100,
      zIndex: 20,
      backgroundColor: colors.trueBlack,
      opacity: 0.75,
    },
  };
};

export default getStyles;
