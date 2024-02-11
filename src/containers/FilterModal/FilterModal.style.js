import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  customerInnerContainerStyle: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  headerSection: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 16,
    paddingTop: 0,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  headerText: {
    fontSize: 16,
  },
  clearAll: {
    fontSize: 14,
  },
  leftSection: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "50%",
    borderRightWidth: 1,
    borderColor: colors.lightGrey,
  },
  rightSection: {
    width: "50%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  bottomSection: {
    width: "100%",
    borderTopWidth: 1,
    padding: 16,
    paddingBottom: 0,
    borderColor: colors.lightGrey,
  },
  middleSectionWeb: {
    minHeight: 278,
  },
  middleSectionStyle: {
    height: 278,
  },
  arrowRight: {
    height: 16,
    width: 16,
    position: "absolute",
    right: 0,
  },
  renderCheckButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
    paddingTop: 16,
    alignItems: "center",
  },
});

export default styles;
