import colors from "../../assets/colors";

const style = {
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
    // fontWeight: 600,
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
  multiColumnstyles: {
    alignItems: "center",
    gap: 32,
  },
  normalText: { fontSize: 14 },
  blackText: { fontSize: 12, colors: colors.black },
  greyText: { fontSize: 12, color: colors.gray },
  marginRightText: { marginRight: 8 },
  mobileContainer: {
    gap: 8,
  },
  buttonStyle: {
    borderWidth: 0,
    padding: 0,
  },
  actionPairButtonStyle: {
    maxHeight: 44,
    maxWidth: 96,
  },
  customButtonTextStyle: {
    fontSize: 12,
    color: colors.darkBlue,
  },
  buttonContainerStyle: { paddingRight: 24, alignItems: "center" },
  buttonTextStyle: { fontWeight: "500", fontSize: 14 },
};

export default style;
