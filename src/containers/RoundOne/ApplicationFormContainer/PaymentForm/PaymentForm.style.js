import {
  StyleSheet,
  Platform,
  Dimensions,
} from "@unthinkable/react-core-components";
import colors from "../../../../assets/colors";
import { baseChipStyle } from "../../../../theme/styles/commonStyles";

const { height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.backgroundGrey,
  },
  customCardStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    borderWidth: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  buttonstyle: {
    width: 140,
    marginBottom: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 24,
  },
  headerText: {
    fontSize: 16,
  },
  downloadText: { color: colors.darkBlue, fontSize: 14, marginLeft: 8 },
  downloadIcon: {
    height: 16,
    width: 16,
  },
  downloadButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  tableCard: {
    marginTop: 24,
  },
  customTableStyle: {
    backgroundColor: colors.white,
    padding: 0,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
  },
  statusStyle: {
    alignItems: "flex-start",
  },
  inProgress: {
    ...baseChipStyle,
    color: colors.skyBlueDark,
  },
  pending: {
    ...baseChipStyle,
    color: colors.orange,
  },
  close: {
    ...baseChipStyle,
    color: colors.darkGreen,
  },
  inProgressWeb: {
    ...baseChipStyle,
    backgroundColor: colors.skyBlueLight,
    color: colors.skyBlueDark,
  },
  pendingWeb: {
    ...baseChipStyle,
    color: colors.orange,
    backgroundColor: colors.lightOrange,
  },
  closeWeb: {
    ...baseChipStyle,
    color: colors.darkGreen,
    backgroundColor: colors.lightGreen,
  },
  actionBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    paddingTop: 24,
    backgroundColor: colors.backgroundColor,
  },
  buttonStyle: { maxHeight: 44, maxWidth: 80 },
  buttonTwoStyle: { maxHeight: 44, maxWidth: 150 },
  backButtonStyle: {
    fontSize: 14,
  },
  customToggleStyle: {
    marginTop: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  customSubOptionsTextStyle: {
    marginTop: 8,
    color: colors.darkGrey,
  },
  customInnerContainerStyle: {
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        maxHeight: deviceHeight / 1.5,
      },
      android: {
        maxHeight: deviceHeight / 2,
      },
      web: {
        height: deviceHeight * 0.7,
      },
    }),
  },
  datePickerContainerStyle: {
    paddingRight: 0,
    paddingLeftt: 0,
    paddingBottom: 0,
    margin: 4,
  },
  toastMessageStyle: {
    alignSelf: "center",
    backgroundColor: colors.black,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 50,
    bottom: undefined,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    zIndex: 1,
  },
  doneButtonStyle: { fontSize: 14, color: colors.white },
});

export default styles;
