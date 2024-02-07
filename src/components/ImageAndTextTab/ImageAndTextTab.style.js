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
    backgroundColor:colors.white,
    alignItems: "center",
    padding:10,
  },
  inActiveTextStyle: {
    fontSize: 12,
    color: colors.darkGrey,
  },
  activeTextStyle: {
    fontSize: 12,
    color: colors.darkBlue,
  },
};

export default style;
