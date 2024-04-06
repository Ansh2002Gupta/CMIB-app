import colors from "../../assets/colors";

const styles = {
  otherDetailItemWeb: {
    padding: 24,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 16,
  },
  otherDetailItemMobile: {
    marginBottom: 36,
  },
  otherDetailsStyle: { flex: 0.5 },
  descriptionContainer: { flex: 1 },
  description: {
    marginRight: 32,
  },
  jobDescriptionContainer: {
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 24,
    flex: 2.5,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  aboutSection: { flex: 1 },
  detailSection: {
    backgroundColor: colors.backgroundGrey,
    flexDirection: "row",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  containerViewStyle: {
    backgroundColor: colors.backgroundColor,
  },
  buttonStyleMobile: {
    flex: 1,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonStyleWeb: {
    width: 93,
  },
  saveButtonStyle: {
    marginRight: 16,
  },
  aboutMobile: {
    marginTop: 0,
  },
  otherDetailMobile: {
    width: "100%",
    marginTop: 16,
  },
  container: { flex: 1, backgroundColor: colors.backgroundGrey },
  scrollView: { paddingBottom: 16 },
  actionButtons: { backgroundColor: colors.white, flexDirection: "row" },
};

export default styles;
