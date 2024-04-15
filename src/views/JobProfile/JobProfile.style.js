import colors from "../../assets/colors";

const style = {
  headerContainer: {
    paddingBottom: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.black,
  },
  titleTextMobile: {
    fontSize: 20,
    lineHeight: 28,
    color: colors.black,
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  textStyle: {
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 14,
  },
  cardContainer: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  containerStyle: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  mobileEditContainer: {
    padding: 4,
    borderRadius: 4,
    justifyContent: "center",
  },
  editBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  completionPercentContainer: {
    marginRight: 20,
    backgroundColor: colors.secondaryGrey,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    flexDirection: "row",
    paddingRight: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  completionTextBoldStyle: {
    fontWeight: "700",
  },
  completionTextStyle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
    fontWeight: "500",
  },
  completionValueTextStyle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
    fontWeight: "600",
  },
  completionValueWebTextStyle: {
    marginLeft: 3,
  },
  completionValueMobileTextStyle: {
    marginRight: 3,
  },
  addNewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1,
  },
  addNewText: {
    color: colors.white,
  },
  progressBar: {
    marginRight: 8,
  },
};

export default style;
