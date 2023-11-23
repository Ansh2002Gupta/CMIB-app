import colors from "../../assets/colors";
const style = {
  mainView: { flex: 1, backgroundColor: colors.white, marginTop: 20 },
  container: {
    marginRight: 16,
    marginLeft: 16,
    marinTop: 16,
    marinBottom: 16,
    backgroundColor: colors.white,
  },
  headerTextView: { marginTop: 24 },
  headerNameView: { marginTop: 10 },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  companyView: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 16,
  },
  firstTextInput: { marginTop: 8 },
  borderStyle: {
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
    marginTop: 24,
  },
  submitView: { padding: 16 },
  backToLoginText: {
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
    fontFamily: "GeneralSans-Bold",
    fontWeight: "600",
    color: colors.darkBlue,
  },
  secoundTextInput: { marginTop: 16 },
  bulletPointContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Spacing between items
  },
  bullet: {
    width: 6, // Bullet width
    height: 6, // Bullet height
    borderRadius: 3, // Half of the width/height to make it circular
    backgroundColor: colors.lightGrey, // Bullet color
    marginRight: 10, // Spacing
  },
  bulletText: {
    fontSize: 14,
    fontFamily: "GeneralSans-Regular",
    fontWeight: "600",
    color: colors.gray,
  },
  validationText: {
    marginBottom: 8,
    fontSize: 14,
    fontFamily: "GeneralSans-Regular",
    fontWeight: "600",
    color: colors.black,
  },
  requirmentView: { marginTop: 32 },
  validationView: { flexDirection: "row", marginTop: 5 },
};
export default style;
