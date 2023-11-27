import colors from "../../assets/colors";
const style = {
  mainView: { flex: 1, backgroundColor: colors.white, marginTop: 20 },
  container: {
    marginRight: 16,
    marginLeft: 16,
    marinTop: 16,
    marinBottom: 16,
    backgroundColor: colors.white,
  },
  webContainer: {
    backgroundColor: colors.white,
  },
  webFontFamily: {
    fontFamily: "General Sans"
  },
  headerTextView: { marginTop: 24 },
  headerNameView: { marginTop: 10 },
  forgotHeaderText: {
    fontSize: 40,
  },
  customSubHeading: {
    fontSize: 16,
    color: colors.subHeadingGray,
  },
  width900pxOrCustomSubHeading: {
    fontSize: 14
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  companyView: {
    backgroundColor: colors.backgroundColor,
    padding: 16,
  },
  firstTextInput: { marginTop: 8 },
  width900pxOrWebEmailInput: {
    marginTop: 16
  },
  webEmailInput: {
    marginTop: 56,
  },
  borderStyle: {
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
    marginTop: 24,
  },
  submitView: { padding: 16, flex: 1, justifyContent: "flex-end" },
  backToLoginText: {
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
    fontFamily: "GeneralSans-Bold",
    fontWeight: "600",
    color: colors.darkBlue,
  },
  errorMessage: {
    color: colors.red,
    fontSize: 12,
    fontFamily: "GeneralSans-Medium",
    marginTop: 2,
  },
  whiteBackground: {
    backgroundColor: colors.white,
  },
  grayBackground: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  forgotPasswordWebContainer: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    flex: 0.9,
    padding: 40,
    width: "32%",
    alignSelf: "center",
    marginTop: 48,
    zIndex: 1,
    boxShadow: "0px 4px 32px 0px rgba(97, 108, 130, 0.04)",
  },
  webSubmitView: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-end",
  },
  customTextInputLabel: {
    fontSize: 14,
    color: colors.black
  },
  customTextInput: {
    borderRadius: 12,
  },
  customAsteriskStyle: {
    color: colors.red
  },
  customBtnText: {
    fontSize: 16,
    fontFamily: "General Sans",
    fontWeight: '600'
  },
  footerImage: {
    position: "absolute",
    bottom: 0,
  },
  width900pxOrLessSubmitBtn: {
    height: 44
  },
  width900pxOrLessForgotHeading: {
    fontSize: 30
  },
  width1200pxOrLessForgotHeading: {
    fontSize: 34
  },
  mdScreenContainers: {
    width: '60%'
  },
  largeScreenContainers: {
    width: '40%'
  },
};
export default style;
