import colors from "../../../assets/colors";

const styles = {
  headerContainer: {
    paddingBottom: 24,
    alignItems: "center",
    flexDirection: "row",
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
  webProfileImageStyle: {
    height: 108,
    width: 108,
    borderWidth: 0,
  },
  mobileProfileImageStyle: {
    height: 52,
    borderWidth: 0,
    width: 52,
  },
  companyLogo: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 12,
    alignSelf: "flex-start",
    overflow: "hidden",
    marginRight: 24,
  },
  centreView: {
    flexDirection: "row",
  },
  centreText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "500",
    color: colors.darkGrey,
  },
  centreValue: {
    fontWeight: "600",
    marginLeft: 3,
    color: colors.black,
  },
  companyName: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "600",
    color: colors.black,
    marginTop: 13,
  },
};

export default styles;
