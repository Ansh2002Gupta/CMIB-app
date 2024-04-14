import colors from "../../assets/colors";

const style = {
  headerContainer: {
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 32,
    lineHeight: 40,
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
};

export default style;
