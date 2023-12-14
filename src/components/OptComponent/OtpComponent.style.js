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
    fontFamily: "General Sans",
    marginHorizontal:10,
    marginVertical:5,
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
    fontFamily: "General Sans",
    color: colors.black,
  },
  starStyle: { color: colors.errorRed },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeOtpBox: {
    borderColor: colors.green, 
  },
  otpBox: {
    width: 74,
    height: 56,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
    marginHorizontal: 10,
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
