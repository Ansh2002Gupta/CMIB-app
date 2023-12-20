import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  sideBar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.darkBlueShade,
    zIndex: 2,
  },
  overLay: {
    backgroundColor: "transparent",
    zIndex: 1,
    width: width,
    height: height,
  },
});

export default styles;
