import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
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
});

export default styles;
