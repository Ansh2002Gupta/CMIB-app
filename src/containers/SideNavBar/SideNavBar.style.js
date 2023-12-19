import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  sideBar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.darkBlueShade,
    zIndex: 2,
    height: "100%",
  },
  overLay: {
    backgroundColor: "transparent",
    zIndex: 1,
    height: height,
  },
});

export default styles;
