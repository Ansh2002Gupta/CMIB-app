import colors from "../../assets/colors";
const style = {
  mainView: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
  },
  mobContainer: {
    paddingRight: 16,
    paddingLeft: 16,
  },
  webFontFamily: {
    fontFamily: "General Sans",
  },
  forgotHeaderText: {
    fontSize: 40,
  },
  forgotHeaderContainer: {
    marginTop: 0,
  },
  customSubHeading: {
    fontSize: 16,
    color: colors.subHeadingGray,
  },
  width900pxOrCustomSubHeading: {
    fontSize: 14,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  companyView: {
    backgroundColor: colors.backgroundColor,
    paddingTop: 24,
    paddingRight: 16,
    paddingLeft: 16,
  },
  firstTextInput: { marginTop: 8 },
  width900pxOrWebEmailInput: {
    marginTop: 16,
  },
  webEmailInput: {
    marginTop: 56,
  },
  borderStyle: {
    borderWidth: 1,
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
    color: colors.darkBlue,
  },
  whiteBackground: {
    backgroundColor: colors.white,
  },
  grayBackground: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  webSubmitView: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-end",
  },
  customTextInput: {
    borderRadius: 12,
  },
  customAsteriskStyle: {
    color: colors.red,
  },
  customBtnText: {
    fontSize: 16,
    fontFamily: "General Sans",
    fontWeight: "600",
  },
  footerImage: {
    position: "absolute",
    bottom: 0,
  },
  width900pxOrLessSubmitBtn: {
    height: 44,
  },
  width900pxOrLessForgotHeading: {
    fontSize: 30,
  },
  width1200pxOrLessForgotHeading: {
    fontSize: 34,
  },
  smScreenContainers: {
    width: "60%",
  },
  mdScreenContainers: {
    width: "40%",
  },
  forgotPasswordWebContainer: {
    flex: 0.9
  },
  headerText: {
    fontSize: 28
  }
};
export default style;
