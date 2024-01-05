import colors from "../../assets/colors";
const style = {
  container: {
    flexDirection: "column",
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    color: colors.gray,
    fontSize: 14,
    lineHeight: 24,
  },
  webLabel: {
    color: colors.black,
  },
  starStyle: {
    color: colors.errorRed,
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontWeight: "500",
  },
  errorMsg: {
    color: colors.errorRed,
    fontSize: 12,
    lineHeight: 18,
  },
};

export default style;
