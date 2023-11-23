import colors from "../../assets/colors";

const style = {
  buttonStyle: {
    height: 56,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    flex: 1,
  },
  disableButtonStyle: {
    height: 56,
    backgroundColor: colors.white,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    flex: 1,
  },
  secondButotnStyle: {
    marginLeft: 8,
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: "GeneralSans-Semibold",
    color: colors.white,
    margin: 8,
  },
  disableTextStyle: {
    fontSize: 16,
    fontFamily: "GeneralSans-Semibold",
    color: colors.black,
    margin: 8,
  },
};

export default style;
