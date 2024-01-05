import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../../assets/colors";

const styles = StyleSheet.create({
  mainView: {},
  customCardComponentStyle: {
    marginTop: 16,
    backgroundColor: colors.secondaryGrey,
    flexDirection: "row",
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  MultiRowStyle: {
    backgroundColor: colors.backgroundColor,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  detailHeadingTextStyle: {
    fontSize: 16,
    fontWeight: "600",
  },
  addDesignationStyle: {},
  addDesignationTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.darkBlue,
    marginLeft: 8,
  },
});

export default styles;
