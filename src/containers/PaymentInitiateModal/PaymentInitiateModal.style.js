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
    justifyContent: "flex-end",
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 24,
    justifyContent: "space-between",
    paddingRight: 10,
    ...Platform.select({
      web: {
        maxHeight: "60vh",
      },
    }),
  },
  fourthSectionStyle: { paddingBottom: 16 },
  notMatchingError: {
    paddingTop: 24,
  },
  buttonWebStyle: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 16,
  },
  webContentContainerStyle: {
    height: "60vh",
    paddingRight: 10,
  },
  buttonStyle: { maxHeight: 44, maxWidth: 80 },
  requirementsPoints: {
    marginBottom: 0,
  },
  subContainerStyle: {
    width: "50%",
  },
  subscriptionCostContainer: {
    marginTop: 24,
    marginBottom: 24,
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
  amountHeading: {
    fontSize: 12,
    color: colors.darkGrey,
  },
  amountValueText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
    marginTop: 8,
  },
  loaderStyle: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    height: '60vh'
  },
};

export default style;
