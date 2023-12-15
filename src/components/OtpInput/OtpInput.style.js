import colors from "../../assets/colors";
const style = {
  container: {
    flexDirection: "column",
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom:4,
  },
  label: {
    color: colors.gray,
    fontSize: 14,
    fontWeight:"500",
    lineHeight:24,
  },
  webLabel: {
    fontFamily: "General Sans",
    color: colors.black,
  },
  starStyle: { 
    color: colors.errorRed 
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  activeOtpBox: {
    borderColor: colors.green, 
  },
  otpBox: {
    width: 74,
    height: 56,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight:"500",
    lineHeight: 28,
  },
  errorMsg: {
    color: colors.errorRed,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
  },
};

export default style;
