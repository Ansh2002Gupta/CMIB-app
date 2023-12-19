import colors from "../../assets/colors";

const styles = {
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingLeft: 70,
    paddingRight: 70,
    paddingBottom: 24,
  },
  newQualifiedText: {
    color: colors.backgroundColor,
    fontSize: 14,
    paddingTop: 3,
    cursor: "pointer",
  },
  moduleText: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 32,
    cursor: "pointer",
  },
  leftArrow: {
    height: 25,
    width: 25,
    paddingTop: 16,
    paddingLeft: 16,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.offWhite,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.slateGray,
  },
  changeText: {
    color: colors.backgroundColor,
    fontSize: 12,
    backgroundColor: colors.offWhite,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 24,
    cursor: "pointer",
  },
  sessionText: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 16,
    cursor: "pointer",
  },
  selectedItem: {
    color: colors.white,
    fontWeight: "600",
  },
  selectedItemBackground: {
    backgroundColor: colors.offWhite,
  },
  list: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 16,
    cursor: "pointer",
  },
  listText: {
    fontSize: 14,
    color: colors.lightGrey,
    fontWeight: "500",
  },
  subList: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 16,
    cursor: "pointer",
  },
  subListText: {
    color: colors.lightGrey,
    fontSize: 14,
    fontWeight: "500",
  },
  bottomView: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.offWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    cursor: "pointer",
  },
  imageTextView: {
    flexDirection: "row",
  },
  visitWebsiteText: {
    color: colors.lightGrey,
    paddingLeft: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  globalIcon: {
    width: 18,
    height: 18,
  },
};

export default styles;
