import colors from "../../assets/colors";

const style = {
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
  },
  innerContainerStyle: {
    marginBottom: 16,
  },
  textContainer: {
    flexDirection: "row",
    paddingBottom: 24,
    alignItems: "center",
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: "600",
    fontSize: 14,
  },
  cardContainer: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  cardStyle: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
  },
  headingText: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  valueStyle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "600",
  },
  badgeContainer: {
    marginBottom: 8,
  },
};

export default style;
