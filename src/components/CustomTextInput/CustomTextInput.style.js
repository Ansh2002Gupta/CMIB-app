import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  container: {
    paddingBottom: 32,
  },
  labelContainer: {
    flexDirection: "row",
  },
  dropdown: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 16,
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    marginTop: 4,
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  labelStyle: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: colors.darkGrey,
    fontFamily: "GeneralSans-Medium",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  prefixContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: colors.darkGrey,
    fontSize: 12,
    fontFamily: "GeneralSans-Medium",
  },
  webLabel: {
    fontFamily: "General Sans",
    color: colors.black,
  },
  prefixStyle: {
    marginRight: 8,
    color: colors.black,
    fontSize: 14,
    fontFamily: "GeneralSans-Medium",
  },
  iconStyle: {
    marginRight: 8,
  },
  borderStyle: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    borderColor: colors.darkGrey,
  },
  focusedStyle: { borderColor: colors.lightBlue },
  invalidInput: {
    borderColor: colors.errorRed,
  },
  starStyle: { color: colors.errorRed },
  inputContainer: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 4,
    borderRadius: Platform.OS === 'web' ? 12 : 8,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? 0 : 14,
    paddingBottom: Platform.OS === "android" ? 0 : 14,
  },
  textInputStyle: {
    flex: 1,
    fontFamily: "GeneralSans-Medium",
    fontSize: 14,
  },
  errorMsg: {
    color: colors.errorRed,
    fontFamily: "GeneralSans-Medium",
    fontSize: 12,
    lineHeight: 18,
  },
  textAlignStyle: {
    textAlignVertical: "top",
  },
  secondInputStyle: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 16,
    paddingLeft: 16,
    marginLeft: 24,
    marginTop: 4,
    borderRadius: 8,
  },
  eyeIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
};

export default style;
