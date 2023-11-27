import colors from "../../assets/colors";
const style = {
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
    marginRight: 16,
    marginLeft: 16,
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
    paddingTop: 24,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
    marginTop: 24,
  },
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
