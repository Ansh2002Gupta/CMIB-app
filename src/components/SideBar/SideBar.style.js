import colors from "../../assets/colors";

const styles = {
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
  },
  moduleText: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 32,
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
  },
  sessionText: {
    color: colors.darkGrey,
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  selectedItem: {
    color: colors.white,
    fontWeight: "600",
  },
  selectedItemBackground:{
    backgroundColor: colors.offWhite,
  },
  list: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 16,
  },
  listText: {
    fontSize: 14,
    color: colors.lightGrey,
  },
  subList: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 16,
  },
  subListText: {
    color: colors.lightGrey,
    fontSize: 14,
  },
  bottomView: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.offWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageTextView: {
    flexDirection: "row",
  },
  visitWebsiteText: {
    color: colors.lightGrey,
    paddingLeft: 12,
    fontSize: 14,
  },
  globalIcon: {
    width: 18,
    height: 18,
  },
};

export default styles;
