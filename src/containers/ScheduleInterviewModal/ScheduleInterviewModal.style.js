import {
  StyleSheet,
  Platform,
  Dimensions,
} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  toggleComponentLabelStyle: {
    color: colors.darkGrey,
    marginBottom: 16,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightGrey,
    marginTop: 24,
    marginBottom: 8,
  },
  customLabelStyle: {},
  customToggleText: {
    fontSize: 14,
  },
  headerText: {
    fontSize: 14,
    paddingBottom: 16,
    paddingTop: 16,
  },
  modalInnerContainer: {
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
  datePickerContainer: {
    justifyContent: "space-between",
  },
  customDatePickerStyle: {
    minWidth: 100,
  },
  customDatePickerStyleWeb: {
    minWidth: 225,
  },
  leftDatePickerStyle: {
    marginRight: 16,
  },
  buttonWebStyle: {
    width: "100%",
    alignItems: "flex-end",
    paddingTop: 32,
  },
});

export default styles;
