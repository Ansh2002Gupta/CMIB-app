import { StyleSheet, Dimensions } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  viewOtherText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
});

export default styles;
