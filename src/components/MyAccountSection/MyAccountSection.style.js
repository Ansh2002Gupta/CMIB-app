import { StyleSheet, Dimensions } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: 30,
    overflow: "hidden",
    zIndex: 3,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    cursor:"default"
  },
  overlay:{
    position: "absolute",
    right: -10,
    top: 0,
    overflow: "hidden",
    zIndex: 2,
    backgroundColor:"transparent",
    height,
    width,
  }
});

export default styles;
