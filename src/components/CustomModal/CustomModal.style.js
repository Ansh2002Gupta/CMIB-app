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
    fontSize: 20,
    color: colors.black,
    paddingBottom: 8,
  },
  textStyle: {
    marginTop: 20,
    fontSize: 20,
    color: colors.black,
    paddingBottom: 8,
  },
  headerTextStyle: {
    marginBottom: 24,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    paddingBottom: 36,
    fontSize: 14,
    lineHeight: 22,
    color: colors.darkGrey,
  },
};

export default style;
