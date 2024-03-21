import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";
import { fontFamily } from "../../theme/styles/commonStyles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 4,
    borderRadius: Platform.OS === "web" ? 12 : 8,
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  focusedStyle: {
    borderColor: colors.lightBlue,
  },
  iconArrow: {
    marginLeft: 6,
    height: 14,
    width: 14,
    tintColor: colors.lightGray,
  },
  prefixContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  prefixStyle: {
    marginLeft: 5,
    marginRight: 5,
  },
  valueText: {
    fontFamily,
    fontSize: 14,
  },
  textButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    flex: 1,
    zindex: 999,
  },
  datePickerContainer: {
    flex: 1,
    height: 48,
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.1,
  },
  datePickerStyle: {
    backgroundColor: colors.white,
    border: "1px solid #d0d0d0",
  },
  datePickerContainerStyle: {
    position: "absolute",
    bottom: 48,
    zIndex: 2,
  },
  mobileTouchableStyle: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textViewStyles: {
    flex: 0.85,
    height: 48,
    justifyContent: "center",
  },
  mobileTextStyle: {
    flex: 0.9,
    justifyContent: "center",
    height: 48,
  },
  imageContainer: {
    flexDirection: "row",
    flex: 0.1,
    alignItems: "center",
  },
  invalidInput: {
    borderColor: colors.errorRed,
  },
});

export default styles;
