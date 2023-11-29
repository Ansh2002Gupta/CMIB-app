import colors from "../../assets/colors";
const style = {
  mainView: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    paddingRight: 16,
    paddingLeft: 16,
  },
  activeStyle: {
    paddingTop: 16,
    borderBottomWidth: 3,
    borderColor: colors.green,
  },
  topTabs: {
    width: "50%",
  },
  inActiveStyle: {
    paddingTop: 16,
  },
  topTabsText: {
    textAlign: "center",
    color: colors.darkGrey,
    fontSize: 14,
    fontFamily: "GeneralSans-Medium",
  },
  activeTopTabsText: {
    textAlign: "center",
    color: colors.black,
    fontSize: 14,
    fontFamily: "GeneralSans-Semibold",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  companyView: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
  },
  forgotPasswordView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rememberMeText: {
    fontSize: 14,
    fontFamily: "GeneralSans-Medium",
    color: colors.black,
    lineHeight: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "GeneralSans-Semibold",
    color: colors.darkBlue,
  },
  loginButtonView: { marginTop: 32 },
  accountView: {
    marginTop: 24,
    justifyContent: "center",
    flexDirection: "row",
  },
  newAccountText: {
    color: colors.darkBlue,
    fontSize: 14,
    fontFamily: "GeneralSans-Semibold",
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
  },
  accountText: {
    color: colors.darkGrey,
    fontSize: 14,
    fontFamily: "GeneralSans-Medium",
  },
};

export default style;
