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
  containerStyle: { flexDirection: "row", bottom: 16 },
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
  disableStyle: {
    opacity: 0.5,
  },
  secondButotnStyle: {
    marginLeft: 8,
  },
  titleStyle: {
    fontSize: 16,
    color: colors.white,
    margin: 8,
  },
  disableTextStyle: {
    fontSize: 16,
    color: colors.black,
    margin: 8,
  },
};

export default style;
