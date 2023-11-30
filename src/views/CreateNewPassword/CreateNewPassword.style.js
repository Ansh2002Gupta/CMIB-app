import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";

const style = {
  mainView: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    height: "100%",
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
  submitView: { paddingLeft: 16, paddingRight: 16 },
  backToLoginText: {
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web" ? "General sans" : "GeneralSans-Bold",
    fontWeight: "600",
    color: colors.darkBlue,
    cursor: "pointer",
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
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    color: colors.gray,
  },
  validationText: {
    marginBottom: 8,
    fontSize: 14,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    color: colors.black,
  },
  validationView: { flexDirection: "row", marginTop: 5 },
  passwordFieldsErrorContainer: {
    marginTop: 16,
    paddingLeft: 16,
  },
  passwordFieldsErrorText: {
    fontFamily: "General sans",
    color: colors.errorRed,
    fontSize: 14,
    fontWeight: "600",
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
      fontFamily: "General Sans",
      fontSize: 40,
      fontStyle: "normal",
      fontWeight: "600",
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
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: 24,
    },
    headerNameText900: { fontSize: 14 },
    inputLabelText: {
      color: colors.black,
      fontFamily: "General Sans",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: 24,
      textTransform: "capitalize",
    },
    inputTextBox: {
      background: "#FFF",
      fontFamily: "General Sans",
      marginTop: 0,
    },
    passwordRequirements: {
      color: colors.gray,
      fontFamily: "General Sans",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: 22,
    },
    passwordRequirementsContainer: {
      display: "grid",
      columnGap: 16,
      rowGap: 16,
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr",
    },
    submitText: {
      fontFamily: "General sans",
      fontWeight: "500",
      cursor: "pointer",
    },
    submitTextContainer: {
      marginBottom: 8,
    },
    backBtnText: {
      fontFamily: "General sans",
      fontWeight: "600",
      cursor: "pointer",
    },
    companyView: {
      backgroundColor: colors.white,
      marginTop: 40,
    },
    requirementsPoints: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridRowGap: 16,
      marginBottom: 32,
    },
  },
};
export default style;
