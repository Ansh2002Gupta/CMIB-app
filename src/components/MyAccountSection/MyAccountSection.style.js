import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: 50,
    overflow: "hidden",
    zIndex: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    cursor: "default",
  },
});

export default styles;
