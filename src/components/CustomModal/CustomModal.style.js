import colors from "../../assets/colors";

const style = {
  containerStyle: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.7)",
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignContent: "center",
    bottom: 0,
    justifyContent: "center",
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
  },
  infoText: {
    fontFamily: "GeneralSans-Medium",
    fontSize: 14,
    lineHeight: 22,
    color: colors.darkGrey,
    paddingBottom: 24,
  },
};

export default style;
