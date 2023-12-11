import colors from "../../assets/colors";

const style = {
  profileContainer: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  initialsContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 200,
    alignItems: "center",
    height: 104,
    width: 104,
  },
  editProfileContainer: {
    alignSelf: "center",
    height: 152,
    width: 152,
    marginTop: 32,
    marginBottom: 32,
  },
  picContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  iconEditStyle: {
    position: "absolute",
    bottom: 0,
    right: 128,
  },
  editButtonContainer: {
    flexDirection: "row",
    flex: 1,
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
  secondButtonStyle: { marginLeft: 16 },
  textStyle: {
    fontSize: 14,
    color: colors.black,
    fontFamily: "GeneralSans-Semibold",
    marginLeft: 2,
  },
  picParentContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: colors.backgroundColor,
  }
};

export default style;
