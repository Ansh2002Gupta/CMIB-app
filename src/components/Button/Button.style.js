import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  disabledBtn: {
    backgroundColor: colors.disabledBtn,
    cursor: Platform.OS.toLowerCase() === "web" ? "default" : "",
  },
});

export default styles;