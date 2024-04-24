import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../../../assets/colors";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  twoMainSTyle: { backgroundColor: colors.backgroundColor },
  mainContainer: {
    flexDirection: "row",
    padding: 24,
    gap: 16,
  },
  customCardComponentStyle: {
    marginTop: 16,
    backgroundColor: colors.secondaryGrey,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 0,
    borderRadius: 8,
  },
  responsiveStyle: {
    flexDirection: "column",
    width: "100%",
    padding: 24,
    gap: 16,
  },
  MultiRowPhoneStyle: {
    backgroundColor: colors.backgroundColor,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  addDesignationTextStyle: {
    fontSize: 14,
    color: colors.darkBlue,
    marginLeft: 8,
  },
  selectionProcessStyle: {
    fontSize: 16,
    color: colors.black,
  },
  overseasContainerStyles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  dropdownInputStyle: {
    minWidth: 300,
  },
  bottomMargin: {
    marginBottom: 16,
  },
  bondIfAnyView: {
    marginBottom: 16,
  },
  checkBoxStyle: {
    marginTop: 16,
  },
  ctcTextInputStyle: {
    marginTop: 24,
  },
  containerGridStyle: (columnCount) => ({
    display: "grid",
    gridTemplateColumns: columnCount || "1fr 1fr 1fr",
  }),
  monthlyCustomCardStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    justifyContent: "space-between",
    flexWrap: "wrap",
    overflowX: "auto",
  },
  yearlyCustomCardStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 24,
    overflowX: "auto",
  },
  bondIfAnyText: {
    fontSize: 16,
  },
  customToggleStyle: {
    paddingTop: 20,
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
  customStyleCompensation: {
    marginRight: 24,
  },
  addDesignationView: {},
  customLabelStyle: {
    color: colors.darkGrey,
  },
  bondMobileStyle: {
    width: "50%",
    display: "flex",
  },
  customOuterContianer: {
    backgroundColor: colors.backgroundColor,
    color: colors.black,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 0,
  },
  scrollViewStyle: {
    backgroundColor: colors.backgroundColor,
    paddingTop: 16,
  },
  actionBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    padding: 24,
    backgroundColor: colors.backgroundColor,
  },
  rightSection: {
    flexDirection: "row",
    gap: 8,
  },
  buttonStyle: { maxHeight: 44, maxWidth: 80 },
  buttonTwoStyle: { maxHeight: 44, maxWidth: 150 },
  backButtonStyle: {
    fontSize: 14,
  },
  configurableStyle: {
    backgroundColor: undefined,
    marginRight: 0,
    flex: undefined,
    display: undefined,
  },
  componentContainer: {
    borderWidth: 1,
    margin: 0,
    alignItems: "stretch",
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainerStyle: {
    flex: 1,
    borderRadius: 16,
    width: "60%",
  },
  leftSectionStyle: {
    width: "25%",
  },
  emptyCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  customQuilStyle: { height: undefined, borderWidth: 0 },
  disabled: {
    opacity: 0.5,
    backgroundColor: colors.white,
    cursor: Platform.OS.toLowerCase() === "web" ? "not-allowed" : "",
  },
});

export default styles;
