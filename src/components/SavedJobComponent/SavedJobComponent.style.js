import colors from "../../assets/colors";
import { StyleSheet, Platform } from "@unthinkable/react-core-components";

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    paddingLeft: 24,
    paddingBottom: 24,
    backgroundColor: colors.white,
    marginTop: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderTopWidth: 10,
    borderTopColor: colors.darkBlue,
  },
  customSaveButtonContainer: { marginBottom: 16 },
  buttonTwoTextStyle: { fontSize: 14, fontWeight: 500 },
  urgentText: {
    backgroundColor: colors.darkBlue,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 10,
    borderWidth: 1,
    marginTop: -1,
    borderColor: colors.darkBlue,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 2,
    borderTopLeftRadius: -16,
  },
  urgentTextStyles: {
    color: colors.white,
    fontSize: 14,
  },
  companyLogoStyle: {
    height: 56,
    width: 56,
  },
  mobileComponyLogo: {
    height: 40,
    width: 40,
  },
  companyNameStyle: {
    fontSize: 16,
    fontWeight: "600",
  },
  jobPositionText: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "600",
    color: colors.darkBlue,
  },
  center: {
    alignItems: "center",
  },
  normalText: { fontSize: 14 },
  blackText: { fontSize: 12, colors: colors.black },
  greyText: { fontSize: 12, color: colors.gray },
  marginRightText: { marginRight: 8 },
  mobileContainer: {
    gap: 8,
    paddingRight: 24,
  },
  buttonStyle: {
    borderWidth: 0,
    padding: 0,
  },
  actionPairButtonStyle: {
    maxHeight: 44,
    maxWidth: 96,
  },
  disableActionPairButton: {
    maxHeight: 44,
    maxWidth: 96,
    backgroundColor: colors.secondaryGrey,
  },
  customButtonTextStyle: {
    fontSize: 12,
    color: colors.darkBlue,
  },
  customButtonApplyStyle: {
    fontSize: 12,
    color: colors.green,
    marginRight: 20,
  },
  buttonContainerStyle: { alignItems: "center" },
  buttonTextStyle: { fontWeight: "500", fontSize: 14 },
  iconView: { alignItems: "center", gap: 8 },
  iconStyle: {
    height: 16,
    widht: 16,
  },
  chipStyle: {
    paddingRight: 16,
  },
  mobileChipStyle: {
    paddingRight: 12,
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderColor: colors.lightGrey,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderColor: colors.lightGrey,
  },
  evenPadding: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  mobileEvenPadding: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  mobileIconStyle: {
    marginRight: 8,
    height: 16,
    widht: 16,
  },
  customContainerStyle: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.lightGray,
  },
  mobileMargin4: {
    marginTop: 4,
  },
  mobileMargin8: {
    marginTop: 8,
  },
  mobileActionHandle: {
    marginTop: 16,
    alignItems: "center",
  },
  webContainer: { paddingRight: 24 },
  topCurveSection: { backgroundColor: colors.darkBlue, marginRight: -1 },
  whiteCurveSection: {
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    flex: 1,
  },
  backgroundWhite: { backgroundColor: colors.white },
  customToastStyle: {
    top: 50,
    bottom: "50%",
  },
  breakWordStyle: {
    ...Platform.select({
      web: {
        wordBreak: "break-word",
        paddingTop: 8,
      },
    }),
  },
  detailStyle: {
    marginTop: 24,
  },
  webJobLocation: {
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: 200,
      },
    }),
  },
  disableRightStyle: { backgroundColor: colors.secondaryGrey },
  customQuilStyle: { height: undefined, borderWidth: 0 },
  chipContainerStyle: { gap: 8, marginBottom: 16 },
  disabledStyle: { backgroundColor: colors.white },
  disableButtonText: { fontSize: 12, color: colors.black, marginRight: 20 },
});

export default style;
