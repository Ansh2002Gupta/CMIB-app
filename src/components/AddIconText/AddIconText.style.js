import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const style = StyleSheet.create({
  addDesignationTextStyle: {
    color: colors.darkBlue,
    marginLeft: 8,
    alignItem: "center",
    lineHeight: 20,
  },
  customCardComponentStyle: {
    backgroundColor: colors.secondaryGrey,
    flexDirection: "row",
    paddingTop: 16,
    paddingRight: 14,
    paddingLeft: 14,
    paddingBottom: 16,
    alignItem: "center",
  },
  imageStyle: {
    height: 20,
    width: 20,
  },
});

export default style;
