import colors from "../../assets/colors";

const style = {
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  contentStyle: {
    paddingBottom: 8,
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
    fontSize: 14,
  },
  cardContainer: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: colors.backgroundColor,
  },
  cardStyle: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
  },
  imageContainer: {
    marginBottom: 24,
  },
  headingText: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  valueStyle: {
    marginLeft: 4,
    fontSize: 16,
    color: colors.black,
  },
  badgeContainer: {
    marginBottom: 8,
  },
};

export default style;
