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
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.backgroundColor,
    flex: 1,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
  },
  dividerStyle: {
    height: 1,
    backgroundColor: colors.lightGrey,
    marginBottom: 24,
  },
  dropdownStyle: { minWidth: 96 },
  secondInput: { marginLeft: 24, flex: 1 },
  buttonContainer: { paddingLeft: 16, paddingRight: 16 },
};

export default style;
