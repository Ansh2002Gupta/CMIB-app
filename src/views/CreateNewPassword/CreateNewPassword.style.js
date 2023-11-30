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
    marginTop: "16px",
    paddingLeft: "16px",
  },
  passwordFieldsErrorText: {
    fontFamily: "General sans",
    color: "red",
    fontSize: "14px",
    fontWeight: "600",
  },
  // web view related styles
  webView: {
    mainView: {
      margin: "0px",
      backgroundColor: colors.white,
    },
    headerTextContainer: {
      marginTop: "0px",
    },
    headerText: {
      color: colors.black,
      fontFamily: "General Sans",
      fontSize: "40px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal",
      letterSpacing: "-2px",
    },
    headerText1800px: {
      fontSize: "36px",
    },
    headerText900px: {
      fontSize: "32px",
    },
    headerNameText: {
      color: "#616C82",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "24px",
    },
    headerNameText900: { fontSize: "14px" },
    inputLabelText: {
      color: colors.black,
      fontFamily: "General Sans",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "24px",
      textTransform: "capitalize",
    },
    inputTextBox: {
      background: "#FFF",
      fontFamily: "General Sans",
      marginTop: "0px",
    },
    passwordRequirements: {
      color: "#5A5A5A",
      fontFamily: "General Sans",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "22px",
    },
    passwordRequirementsContainer: {
      display: "grid",
      columnGap: "16px",
      rowGap: "16px",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr",
    },
    submitText: {
      fontFamily: "General sans",
      fontWeight: "500",
      cursor: "pointer",
    },
    submitTextContainer: {
      marginBottom: "8px",
    },
    backBtnText: {
      fontFamily: "General sans",
      fontWeight: "600",
      cursor: "pointer",
    },
    companyView: {
      backgroundColor: colors.white,
      marginTop: "40px",
    },
    requirementsPoints: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridRowGap: "16px",
      marginBottom: "32px",
    },
  },
};
export default style;
