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
    backgroundColor: colors.secondaryGrey,
    padding: 4,
    borderRadius: 4,
    justifyContent: "center",
  },
};

export default style;
