import colors from "../../assets/colors";
const style = {
  mainView: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  noButtonStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  activeButtonStyle: {
    borderColor: colors.green,
  },
  viewStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "transparent",
  },
  activeViewStyle: {
    backgroundColor: colors.green,
  },
  textStyle: {
    fontSize: 14,
    color: colors.black,
    paddingLeft: 8,
    paddingRight: 16,
  },
};

export default style;
