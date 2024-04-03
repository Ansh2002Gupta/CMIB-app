import colors from "../../assets/colors";

const style = {
  mainContainer: {
    justifyContent: "center",
    paddingLeft: 24,
    paddingBottom: 24,
    backgroundColor: colors.white,
    marginTop: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderTopWidth: 10,
    borderTopColor: colors.darkBlue,
  },
  customSaveButtonContainer: { marginBottom: 16 },
  buttonTwoTextStyle: { fontSize: 14, fontWeight: 500 },
  urgentText: {
    backgroundColor: colors.darkBlue,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 10,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: -16,
  },
  urgentTextStyles: {
    color: colors.white,
    fontSize: 14,
    // fontWeight: 600,
  },
};

export default style;
