import colors from "../../assets/colors";
const style = {
  container: {},
  header: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "GeneralSans-Regular",
    color: colors.black,
  },
  input: {
    flex: 1,
    height: 48,
    alignItems: "center",
    borderColor: colors.lightGrey,
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "GeneralSans-Regular",
    borderRadius: 8,
  },
  textInputView: {
    backgroundColor: colors.white,
    marginTop: 5,
    flexDirection: "row",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
};

export default style;
