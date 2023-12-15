import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";
const style = {
  containerParent: {
    alignItems: 'center',
  },
  container: {
    flexDirection: "column",
  },
  labelContainer: {
    flexDirection: "row",
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    marginBottom:5,
    gap: 4,
  },
  label: {
    color: colors.darkGrey,
    fontSize: 12,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
  },
  webLabel: {
    fontFamily:
    Platform.OS.toLowerCase() === "web"
      ? "General sans"
      : "GeneralSans-Medium",
    color: colors.black,
  },
  starStyle: { 
    color: colors.errorRed 
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:8,
  },
  activeOtpBox: {
    borderColor: colors.green, 
  },
  otpBox: {
    width: 74,
    height: 56,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
    marginLeft: 10,
    marginRight:10,
   
  },
  errorMsg: {
    color: colors.errorRed,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General sans"
        : "GeneralSans-Medium",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
  },

};

export default style;
