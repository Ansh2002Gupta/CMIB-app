import colors from "../../../assets/colors";

const style = {
  headerText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "GeneralSans-Semibold",
    lineHeight: 24,
    marginBottom: 24,
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
  seperator: {
    height: 1,
    backgroundColor: colors.lightGrey,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
  },
  infoStyle: {
    marginTop: -24,
    marginBottom: 24,
    color: colors.darkGrey,
    fontFamily: "GeneralSans-Medium",
    fontSize: 14,
    lineHeight: 24,
  },
  secondInput: { marginLeft: 24, flex: 1 },
};

export default style;
