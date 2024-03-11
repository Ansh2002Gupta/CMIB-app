import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  row: (isWebView) => ({
    flexDirection: isWebView ? "row" : "column",
  }),
  disablityPreferenceStyle: (isWebView) => ({
    flex: 1,
    marginRight: isWebView ? 24 : 0,
  }),
  flexDirectionRow: {
    flexDirection: "row",
  },
  flexDirectionColumn: {
    flexDirection: "column",
  },
  textInputStyle: {
    flex: 1,
    marginRight: 24,
  },
  textInputStyleColumn: {
    flex: 1,
    marginRight: 0,
  },
  toggleComponentContainerStyle: {
    marginTop: 6,
    flex: 1,
    marginRight: 24,
  },
  toggleComponentContainerStyleColumn: {
    marginTop: 6,
    flex: 1,
    marginRight: 0,
  },
  toggleComponentStyle: {
    marginTop: 23,
    marginBottom: 32,
  },
  labelStyle: {
    color: colors.darkGrey,
  },
  noteTextStyle: {
    fontSize: 14,
    color: colors.darkGrey,
    fontFamily: "General Sans",
    fontStyle: "italic",
  },
  marginBottom24: {
    flex: 1,
    marginBottom: 24,
  },
  spacer: {
    flex: 1,
  },
});

export default styles;
