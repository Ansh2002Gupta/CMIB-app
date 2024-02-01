import colors from "../../assets/colors";
const styles = {
  modalProfileImage: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  editProfileContainer: {
    alignSelf: "center",
    height: 152,
    width: 152,
    marginTop: 32,
    marginBottom: 32,
  },
  editButtonContainer: {
    flexDirection: "row",
    flex: 1,
    paddingBottom: 16,
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: 14,
    flex: 1,
  },
  textStyle: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 8,
  },
  saveButtonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: 14,
    flex: 1,
    backgroundColor: colors.green,
  },
  secondButtonStyle: {
    marginLeft: 16,
  },
  saveTextStyle: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 8,
  },
};
export default styles;
