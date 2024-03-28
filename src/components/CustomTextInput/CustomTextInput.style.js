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
  customToggleStyle: {
    paddingTop: 20,
    marginBottom: 12,
    paddingBottom: 12,
    marginRight: 24,
  },
  textInputStyle: {
    fontWeight: "500",
    flex: 1,
    fontFamily,
    fontSize: 14,
    height: 48,
    width: "100%",
    textAlign: "auto",
  },
  errorMsg: {
    ...Platform.select({
      web: {
        wordBreak: "break-word",
      },
    }),
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
  sendButtonContainer: {
    flex: 1,
    padding: 2,
    height: 48,
    justifyContent: "center",
  },
  sendButtonWithFiles: {
    flex: 1,
    padding: 2,
    height: 180,
    justifyContent: "center",
  },
  iconAttachment: {
    padding: 0,
    borderWidth: 0,
    marginRight: 0,
  },
  imageUploadStyle: {
    height: 100,
    width: 150,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
  },
  uploadRightSection: {
    flexDirection: "row",
  },
  sendEnabled: {
    borderRadius: 8,
    backgroundColor: colors.green,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
  sendDisabled: {
    borderRadius: 8,
    backgroundColor: colors.disabledGrey,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
  imageUploadStyleContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "flex-start",
    height: 100,
    width: 150,
    marginBottom: 10,
  },
  iconCrossContainer: {
    position: "absolute",
    top: -8,
    right: -8,
  },
  iconCross: {
    height: 20,
    width: 20,
    backgroundColor: colors.secondaryGrey,
    borderRadius: 10,
    marginLeft: 5,
  },
  disabledStyle: {
    backgroundColor: colors.disabledTextFieldColor,
  },
  limitStyle: {
    color: colors.darkGrey,
    paddingTop: 2,
  },
  errorAndCountLimitBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  onlyCountLimitBox: {
    justifyContent: "flex-end",
  },
  CheckBoxSelection: {
    paddingRight: 16,
    marginTop: 4,
    flexDirection: 'row',
    flex: 1
  },
};

export default style;
