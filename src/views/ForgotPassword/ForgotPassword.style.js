import colors from "../../assets/colors";
const style = {
  mainView: { flex: 1, backgroundColor: colors.white },
  container: {
    marginRight: 16,
    marginLeft: 16,
    backgroundColor: colors.white,
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
    padding: 16,
  },
  firstTextInput: { marginTop: 8 },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
    marginTop: 24,
  },
  submitView: { paddingLeft: 16, paddingRight: 16 },
  backToLoginText: {
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
    fontFamily: "GeneralSans-Semibold",
    color: colors.darkBlue,
  },
};
export default style;
