import colors from "../../assets/colors";
const style = {
  mainView: { flex: 1, backgroundColor: colors.backgroundColor },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.errorRed,
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
    fontFamily: "GeneralSans-Bold",
    color: colors.darkBlue,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.lightGrey,
    marginRight: 10,
  },
  bulletText: {
    fontSize: 14,
    fontFamily: "GeneralSans-Medium",
    color: colors.gray,
  },
  validationText: {
    marginBottom: 8,
    fontSize: 14,
    fontFamily: "GeneralSans-Medium",
    color: colors.black,
  },
  validationView: { flexDirection: "row", marginTop: 5 },
};
export default style;
