import colors from "../../assets/colors";

const style = {
  profileContainer: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  picContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  iconEditStyle: {
    alignSelf: "center",
  },
  editProfileContainer: {
    alignSelf: "center",
    height: 152,
    width: 152,
    marginTop: 32,
    marginBottom: 32,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    left: 10,
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
    marginLeft: 2,
    fontWeight: "600",
  },
  picParentContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
};

export default style;
