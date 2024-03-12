import { Platform, StyleSheet } from "@unthinkable/react-core-components";

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
    ...Platform.select({
      web: {
        wordBreak: "break-word",
      },
    }),
    fontSize: 14,
    color: colors.black,
    marginBottom: 24,
  },
  capitalizeValue: {
    textTransform: "capitalize",
  },
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  labelStyle: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 24,
  },
  switchContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
  },
  iconStyle: {
    alignItems: "start",
  },
  buttonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.lightGray,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 24,
  },
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
