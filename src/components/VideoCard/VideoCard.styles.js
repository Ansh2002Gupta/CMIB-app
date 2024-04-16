import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackWithMinorOpacity,
    height: "100%",
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  playIconBoxStyles: {},
  playIconStyles: {
    width: 50,
    height: 50,
  },
});

export default styles;
