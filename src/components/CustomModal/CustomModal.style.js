import colors from "../../assets/colors";

const style = {
  containerStyle: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  innerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerText: {
    fontFamily: "GeneralSans-Semibold",
    fontSize: 20,
    color: colors.black,
    paddingTop: 20,
    paddingBottom: 8,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    fontFamily: "GeneralSans-Medium",
    fontSize: 14,
    lineHeight: 22,
    color: colors.darkGrey,
    paddingBottom: 36,
  },
};

export default style;
