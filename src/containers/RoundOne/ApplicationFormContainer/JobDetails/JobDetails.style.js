import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../../assets/colors";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
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
  MultiRowPhoneStyle: {
    backgroundColor: colors.backgroundColor,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  detailHeadingTextStyle: {
    fontSize: 16,
    fontWeight: "600",
  },
  addDesignationTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.darkBlue,
    marginLeft: 8,
  },
  designationTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
    alignItem: "center",
  },
  selectionProcessStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
  },
  bottomMargin: {
    marginBottom: 16,
    marginRight: 16,
    marginLeft: 16,
  },
  bondIfAnyView: {
    marginBottom: 16,
  },
  checkBoxStyle: { marginTop: 16 },
  ctcTextInputStyle: { marginTop: 24 },
  containerGridStyle: () => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  }),
  monthlyCustomCardStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
  yearlyCustomCardStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 24,
  },
  bondIfAnyText: { fontSize: 16, fontWeight: "600" },
  customToggleStyle: {
    paddingTop: 12,
    marginBottom: 12,
    paddingBottom: 12,
    marginRight: 24,
  },
  bondCustomInputStyle: {
    marginRight: 24,
  },
  selectionProcessTextStyle: {
    marginBottom: 8,
  },
  customStyleCompensation: { marginRight: 24 },
});

export default styles;
