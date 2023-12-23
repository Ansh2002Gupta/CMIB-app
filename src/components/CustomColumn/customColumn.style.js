import colors from "../../assets/colors";

const styles = {
  buttonContainer: {
    borderRadius: 8,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    minWidth: 100,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledStyle: {
    opacity: 0.5,
  },
};

export default styles;
