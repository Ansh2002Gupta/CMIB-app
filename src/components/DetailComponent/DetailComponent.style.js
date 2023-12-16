import colors from "../../assets/colors";

const style = {
  titleContainer: {
    flexDirection: "row",
  },
  titleStyle: {
    color: colors.darkGrey,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 16,
    paddingBottom: 24,
  },
  innerContainer: { width: "100%" },
  rowStyle: { width: "50%" },

  starStyle: {
    color: colors.errorRed,
  },
  linkStyle: {
    color: colors.darkBlue,
    textDecorationLine: "underline",
  },
  valueStyle: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 24,
    fontWeight: "500",
  },
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    flexWrap: "wrap",
    marginRight: 24,
    flex: 1,
  },
  containerGridStyle: (columnCount) => ({
    display: "grid",
    gridTemplateColumns: columnCount || "1fr 1fr 1fr",
  }),
};

export default style;
