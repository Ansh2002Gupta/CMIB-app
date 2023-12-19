import colors from "../../assets/colors";

const style = {
  webContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  containerStyle: { paddingBottom: 16 },
  innerContainerStyle: {
    backgroundColor: colors.secondaryGrey,
    justifyContent: "center",
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  webInnerContainer: { marginRight: 8 },
  badgeStyle: {
    fontSize: 14,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },
};

export default style;
