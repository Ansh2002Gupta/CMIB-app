import { Platform } from "@unthinkable/react-core-components";
import { fontFamily } from "../../theme/styles/commonStyles";
import colors from "../../assets/colors";

const style = {
  container: {
    paddingBottom: 32,
  },
  labelContainer: {
    flexDirection: "row",
    fontFamily: "General Sans",
    gap: 4,
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
    fontFamily,
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
  },
  webLabel: {
    fontFamily: "General Sans",
    color: colors.black,
  },
  prefixStyle: {
    marginRight: 8,
    color: colors.black,
    fontSize: 14,
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
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 4,
    borderRadius: Platform.OS === "web" ? 12 : 8,
    flexDirection: "row",
  },
  textInputStyle: {
    flex: 1,
    fontFamily,
    fontSize: 14,
    height: 48,
    width: "100%",
    textAlign: "auto",
  },
  errorMsg: {
    color: colors.errorRed,
    lineHeight: 18,
  },
  eyeIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
  },
  counterMainView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "space-between",
    marginTop: 4,
  },
  counterView: {
    justifyContent: "center",
  },
  counterText: {
    color: colors.black,
    fontSize: 14,
  },
  buttonsView: {
    marginLeft: 8,
    alignItems: "center",
  },
  searchStyle: {
    fontSize: 14,
    fontFamily,
    color: colors.black,
    fontWeight: "500",
    borderRadius: 4,
  },
  valueStyle: {
    paddingRight: 12,
  },
  sendButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
  },
  iconAttachement: {
    padding: 0,
    borderWidth: 0,
    marginRight: 0,
    height: 48,
    width: 48,
  },
};

export default style;
