import colors from "../../assets/colors";

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
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.backgroundColor,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
  },
  dropdownStyle: { width: 96 },
  secondInput: { marginLeft: 24, flex: 1 },
  buttonContainer: { paddingLeft: 16, paddingRight: 16 },
};

export default style;
