import { StyleSheet, Dimensions } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
  pieChartContiner: { gap: 24, flexDirection: "row", flexWrap: "wrap" },
});

export default styles;
