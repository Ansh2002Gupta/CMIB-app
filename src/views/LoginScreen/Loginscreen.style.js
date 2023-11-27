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
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  activeStyle: {
    paddingTop: 16,
    borderBottomWidth: 2,
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
    fontSIze: 14,
    fontWeight: "500",
  },
  headerTextView: { marginTop: 24 },
  headerNameView: { marginTop: 10 },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  companyView: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 16,
  },
  firstTextInput: { marginTop: 8 },
  secoundTextInput: { marginTop: 16 },
  forgotPasswordView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  rememberMeText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "GeneralSans-Medium",
    color: colors.black,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "GeneralSans-Regular",
    color: colors.darkBlue,
  },
  loginButtonView: { marginTop: 32 },
  accountView: {
    marginTop: 24,
    justifyContent: "center",
    flexDirection: "row",
  },
  newAccountText: {
    color: "#00137E",
    fontSize: 14,
    fontWeight: "600",
  },
  accountText: {},
  borderStyle: {
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
    marginTop: -1,
  },
  errorMessage: {
    color: colors.red,
    fontSize: 12,
    fontFamily: "GeneralSans-Medium",
    marginTop: 2,
  },
  followUsImageView: {
    marginHorizontal: 30,
  },
};

export default style;
