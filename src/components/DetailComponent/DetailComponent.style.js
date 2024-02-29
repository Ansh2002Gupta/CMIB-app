import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
  },
  titleStyle: {
    color: colors.darkGrey,
    fontSize: 12,
    marginBottom: 8,
  },
  inputStyle: {
    paddingBottom: 24,
  },
  headerText: {
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
    marginLeft: 4,
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
  },
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    flexWrap: "wrap",
  },
  divideInputStyle: {
    width: "48%",
  },
  badgeContainer: {
    marginBottom: 8,
  },
  containerGridStyle: (columnCount) => ({
    display: "grid",
    gridTemplateColumns: columnCount || "1fr 1fr 1fr",
  }),
});

export const getRowStyle = (detail) => {
  if (detail.isMajor) {
    return styles.rowStyle;
  }
  if (detail.isMinor) {
    return styles.minorRowStyle;
  }
  if (detail.isRow) {
    return styles.divideInputStyle;
  }
  return styles.innerContainer;
};

export default styles;
