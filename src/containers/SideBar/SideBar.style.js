import colors from "../../assets/colors";

const styles = {
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkBlueShade,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 70,
    paddingRight: 70,
    paddingBottom: 24,
  },
  imageViewStyles: {
    paddingTop: 24,
  },
  imgViewStyle: {
    paddingTop: 40,
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
  },
  leftArrow: {
    height: 25,
    width: 25,
  },
  leftArrowButton: {
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
    opacity: 0.6,
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 16,
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
  },
  globalIcon: {
    width: 18,
    height: 18,
  },
};

export default styles;
