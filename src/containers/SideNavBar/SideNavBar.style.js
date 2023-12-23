import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  SideBarmd: {
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
});

export default styles;
