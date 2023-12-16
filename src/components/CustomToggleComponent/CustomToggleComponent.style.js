import colors from "../../assets/colors";
const style = {
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
  },
  yesButtonStyle: {
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
  buttonViewStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "transparent",
  },
  activeButtonViewStyle: {
    backgroundColor: colors.green,
  },
  textStyle: {
    fontSize: 14,
    color: colors.black,
    paddingLeft: 8,
    paddingRight: 16,
    fontWeight: "500",
  },
  container: {
    paddingBottom: 32,
  },
  labelContainer: {
    flexDirection: "row",
    gap: 4,
  },
  label: {
    color: colors.darkGrey,
  },
  webLabel: {
    color: colors.black,
  },
  starStyle: { color: colors.errorRed },
};

export default style;
