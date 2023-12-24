import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  contentContainerStyle: {
    height: 240,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.darkGrey,
    borderStyle: "dashed",
    justifyContent: "center",
    backgroundColor: colors.secondaryGrey,
    alignItems: "center",
  },
  loaderBox: {
    position: "relative",
  },
  percentageBox: {
    position: "absolute",
    left: "50%",
    top: "35%",
  },
  percentageBoxTwoDigitNumber: {
    left: "45%",
  },
  percentageText: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    color: colors.darkGrey,
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkBlack,
    marginRight: 4,
  },
  browseStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.green,
    textDecorationLine: "underline",
    cursor: Platform.OS.toLowerCase() === "web" ? "pointer" : "",
  },
  infoStyle: {
    color: colors.darkGrey,
    lineHeight: 18,
  },
  hideRawInputField: {
    display: "none",
  },
  error: {
    marginTop: 10,
  },
});

export default styles;
