import colors from "../../../assets/colors";

const style = {
  headerText: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    fontWeight: "600",
  },
  contentContainerStyle: {
    flex: 1,
    paddingTop: 24,
  },
  containerStyle: { paddingBottom: 16 },
  mainContainerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundColor,
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
    marginTop: -16,
    marginBottom: 24,
    color: colors.darkGrey,
    fontFamily: "GeneralSans-Medium",
    fontSize: 14,
    lineHeight: 24,
  },
  secondInput: { marginLeft: 24, flex: 1 },
};

export default style;
