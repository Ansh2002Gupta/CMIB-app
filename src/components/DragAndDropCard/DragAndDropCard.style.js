import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  contentContainerStyle: {
    height: 240,
    borderWidth: 1,
    marginBottom: 48,
    borderRadius: 8,
    borderColor: colors.darkGrey,
    borderStyle: "dashed",
    justifyContent: "center",
    backgroundColor: colors.secondaryGrey,
    alignItems: "center",
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
