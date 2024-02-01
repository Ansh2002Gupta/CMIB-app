import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  containerStyle: { paddingBottom: 24 },
  errorText: {
    fontSize: 14,
    color: colors.errorRed,
  },
  passwordMatchStyle: {
    fontSize: 14,
    color: colors.errorRed,
    bottom: 16,
  },
  saveAndCancelButtonView: {
    paddingBottom: 21,
    paddingTop: 24,
  },
  customContainerStyle: {
    paddingBottom: Platform.OS === "android" ? 0 : 22,
    maxHeight: Platform.OS === "web" ? 44 : "auto",
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 24,
    justifyContent: "space-between",
    paddingRight: 10,
  },
  fourthSectionStyle: { paddingBottom: 16 },
  notMatchingError: {
    paddingTop: 24,
  },
  buttonWebStyle: {
    width: "100%",
    alignItems: "flex-end",
  },
  leftButtonStyle: { alignItems: "flex-end" },
  rightButtonStyle: { maxHeight: 44, maxWidth: 80 },
  webContentContainerStyle: {
    maxHeight: "60vh",
    paddingRight: 10,
  },
  buttonStyle: { height: 44, width: 80 },
  requirementsPoints: {
    marginBottom: 0,
  },
  subContainerStyle: {
    width: "50%",
  },
  webView: {
    requirementsPoints: (currentBreakpoint) => ({
      display: "grid",
      gridTemplateColumns: currentBreakpoint === "sm" ? "1fr" : "1fr 1fr",
      gridRowGap: currentBreakpoint === "sm" ? 0 : 16,
    }),
  },
  erroInputStyleWeb: {
    paddingBottom: 6,
  },
  erroInputStyle: {
    paddingBottom: 0,
  },
  inputStyle: {
    paddingBottom: 36,
  },
};

export default style;
