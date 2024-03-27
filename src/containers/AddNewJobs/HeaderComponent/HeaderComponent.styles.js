import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    alignItems: "center",
    flex: 1,
  },
  textViewStyle: {
    paddingLeft: 0,
    paddingRight: 4,
    flex: 0.85,
  },
  textStyle: { fontSize: 16 },
  subTextStyle: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  jobDataProgressView: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 16,
  },
  iconStyle: {
    height: 14,
    width: 14,
    marginLeft: 12,
  },
  subTextViewStyle: {
    marginBottom: 24,
    marginTop: -12,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  progressViewStyle: {
    backgroundColor: colors.green,
    borderRadius: 11,
    height: 22,
    width: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  progressTextStyle: {
    fontSize: 12,
    color: colors.white,
  },
  fontSize12: {
    fontSize: 12,
  },
  webAddButtonStyle: {
    height: 44,
  },
});

export default styles;
