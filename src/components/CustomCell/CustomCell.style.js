import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    flexDirection: "row",
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
