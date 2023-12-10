import colors from "../../assets/colors";

const style = {
  activeStyleDashboard: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
    marginLeft: 10,
  },
  activeStyle: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  inActiveStyle: {
    borderColor: colors.white,
    borderBottomWidth: 1,
  },
  buttonStyle: {
    alignItems: "center",
    padding: 16,
  },
  inActiveTextStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.darkGrey,
  },
  activeTextStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.darkBlue,
  },
};

export default style;
