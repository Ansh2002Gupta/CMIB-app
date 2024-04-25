import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";

const { height } = Dimensions.get("window");

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      width: "100%",
    },
    sideBarMd: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 2,
      width: "50%",
    },
    sideBar: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 2,
      width: "80%",
    },
    overLay: {
      backgroundColor: "transparent",
      zIndex: 1,
      height: height,
    },
  };
};

export default getStyles;
