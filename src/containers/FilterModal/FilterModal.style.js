import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  customerInnerContainerStyle: {
    paddingTop: 16,
    paddingBottom: 16,
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
    width: "50%",
    borderRightWidth: 1,
    borderColor: colors.lightGrey,
  },
  rightSection: {
    width: "50%",
  },
  bottomSection: {
    width: "100%",
    borderTopWidth: 1,
    padding: 16,
    paddingBottom: 0,
    borderColor: colors.lightGrey,
  },
  buttonWebStyle: {
    alignItems: "flex-end",
  },
  subContainerStyle: {
    width: "50%",
  },
  buttonMobileStyle: {
    marginBottom: 30,
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
    marginRight: 16,
  },
  renderCheckButton: {
    flexDirection: "row",
    paddingTop: 16,
    paddingLeft: 16,
    justifyContent: "center",
  },
  renderOptionCatigory: {
    height: 300,
  },
});

export default styles;
