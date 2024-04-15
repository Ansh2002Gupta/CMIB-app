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
    minWidth: 280,
  },
  focusedStyle: {
    borderColor: colors.lightBlue,
  },
  valueStyle: {
    fontFamily,
    fontSize: 14,
    color: colors.black,
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
  placeholderTextStyle: {
    fontFamily,
    fontSize: 14,
    color: colors.lightGray,
  },
  textButtonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    flex: 1,
    zindex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  datePickerContainer: {
    flex: 1,
    height: 48,
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  datePickerStyle: {
    backgroundColor: colors.white,
    border: "1px solid #d0d0d0",
  },
  datePickerContainerStyle: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
  },
  mobileTouchableStyle: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textViewStyles: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    padding: 16,
  },
  mobileTextStyle: {
    flex: 1,
    justifyContent: "center",
    height: 48,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  invalidInput: {
    borderColor: colors.errorRed,
  },
});

export default styles;
