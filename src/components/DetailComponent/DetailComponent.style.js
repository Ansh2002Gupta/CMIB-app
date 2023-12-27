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
  inputStyle: {
    paddingBottom: 24,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 16,
    paddingBottom: 24,
  },
  innerContainer: {
    width: "100%",
    marginRight: 24,
  },
  rowStyle: {
    width: "60%",
  },
  minorRowStyle: {
    width: "30%",
  },
  starStyle: {
    color: colors.errorRed,
  },
  webContainer: {
    marginRight: 24,
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
  },
  containerGridStyle: (columnCount) => ({
    display: "grid",
    gridTemplateColumns: columnCount || "1fr 1fr 1fr",
  }),
};

export default style;
