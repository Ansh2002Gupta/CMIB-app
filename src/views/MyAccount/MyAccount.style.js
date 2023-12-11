import colors from "../../assets/colors";

const style = {
  optionCotainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  profileParentContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
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
    height: 64,
    width: 64,
  },
  detailContainer: {
    marginLeft: 12,
  },
  fullNameStyle: {
    fontSize: 16,
    fontFamily: "GeneralSans-semiBold",
    color: colors.black,
  },
  emailStyle: {
    fontSize: 14,
    fontFamily: "GeneralSans-Medium",
    color: colors.darkGrey,
  },
  titleStyle: {
    fontSize: 14,
    fontFamily: "GeneralSans-Medium",
    lineHeight: 20,
    paddingLeft: 12,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
};

export default style;
