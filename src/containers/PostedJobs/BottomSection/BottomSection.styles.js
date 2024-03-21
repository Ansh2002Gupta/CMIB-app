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
  bottomContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
  },
  flexOneRow: {
    flexDirection: "row",
    flex: 1,
  },
  flex1MarginLeft8: {
    flex: 1,
    marginLeft: 8,
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  flexDirectionColumn: {
    flexDirection: "column",
  },
  contractualPeriodViewStyle: {
    marginTop: 6,
    marginLeft: 0,
    flex: 1,
    overflow: "hidden",
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
  flex1marginBottom48: {
    flex: 1,
    marginBottom: 60,
  },
  spacer: {
    flex: 1,
  },
});

export default styles;
