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
    lineHeight: 20,
    paddingLeft: 12,
    color: colors.black
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  leftIcon: {
    width: 24,
    height: 24
  },
  arrowIcon: {
    width: 16,
    height: 16
  }
};

export default style;
