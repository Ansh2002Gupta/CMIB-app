import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.white,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  companyView: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 16,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
    marginTop: 24,
  },
  submitView: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
  },
  backToLoginText: {
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
    color: colors.darkBlue,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.lightGrey,
    marginRight: 10,
  },
  bulletText: {
    fontSize: 14,
    color: colors.gray,
  },
  validationText: {
    marginBottom: 8,
    fontSize: 14,
    color: colors.black,
  },
  validationView: {
    flexDirection: "row",
    marginTop: 5,
  },
  scrollViewContainerStyle: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  passwordFieldsErrorContainer: {
    marginTop: 16,
  },
  passwordFieldsErrorText: {
    color: colors.errorRed,
    fontSize: 14,
  },
  // web view related styles
  webView: {
    mainView: {
      margin: 0,
      backgroundColor: colors.white,
    },
    headerTextContainer: {
      marginTop: 0,
    },
    headerText: {
      color: colors.black,
      fontSize: 40,
    },
    headerText1800px: {
      fontSize: 36,
    },
    headerText900px: {
      fontSize: 32,
    },
    headerNameText: {
      color: colors.darkGrey,
      fontSize: 16,
      lineHeight: 24,
    },
    headerNameText900: {
      fontSize: 14,
    },
    inputTextBox: {
      background: colors.white,
      marginTop: 0,
    },
    passwordRequirements: {
      color: colors.gray,
      fontSize: 14,
      lineHeight: 22,
    },
    submitTextContainer: {
      marginBottom: 8,
    },
    companyView: {
      backgroundColor: colors.white,
      marginTop: 40,
    },
    requirementsPoints: (currentBreakpoint) => ({
      display: "grid",
      gridTemplateColumns: currentBreakpoint === "sm" ? "1fr" : "1fr 1fr",
      gridRowGap: 16,
    }),
  },
  ErrorStyle: {
    paddingTop: 4,
  },
  backButtonStyle: {
    justifyContent: "center",
  },
});

export default styles;
