import colors from "../../assets/colors";
const style = {
  mainView: { flex: 1, backgroundColor: colors.white },
  container: {
    marginRight: 16,
    marginLeft: 16,
    marinTop: 16,
    marinBottom: 16,
    backgroundColor: colors.white,
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
  borderStyle: {
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
    marginTop: 24,
  },
  submitView: { padding: 16 },
  backToLoginText: {
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
    fontFamily: "GeneralSans-Semibold",
    color: colors.darkBlue,
  },
  errorMessage: {
    color: colors.red,
    fontSize: 12,
    fontFamily: "GeneralSans-Medium",
    marginTop: 2,
  },
};
export default style;
