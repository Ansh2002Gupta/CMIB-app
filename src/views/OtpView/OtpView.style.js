import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
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
    marginTop: 0
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
    fontWeight: "600",
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
  textlabel:{
    color: colors.subHeadingGray,
    fontSize: 14,
    fontFamily: "General Sans",
    lineHeight: 20,
    fontWeight: "500",
  },
  textlabelTimer: {
    color: colors.voilet,
    fontSize: 14,
    fontFamily: "General Sans",
    lineHeight: 20,
    fontWeight: "600",
    marginLeft: 4,
  },
  textlabelReset:{
    color: colors.darkBlue,
    fontSize: 14,
    fontFamily: "General Sans",
    lineHeight: 20,
    fontWeight: "600",
    marginLeft: 4,
  },

  textLabelParent: {
    flexDirection: "row",
    fontFamily: "General Sans",
    marginTop: 16,
    justifyContent: 'center',
  },

  textLabelAfterParent: {
    flexDirection: "column",
    fontFamily: "General Sans",
    marginTop: 16,
    alignItems:"center"
  },
};

export default style;
