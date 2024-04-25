import {
  StyleSheet,
  Platform,
  Dimensions,
} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { height: deviceHeight } = Dimensions.get("window");

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    toggleComponentLabelStyle: {
      color: colors.darkGrey,
      marginBottom: 16,
    },
    customLabelStyle: {},
    customToggleText: {
      fontSize: 14,
    },
    toggleContainerStyle: {
      paddingBottom: 16,
    },
    headerText: {
      fontSize: 14,
      paddingBottom: 16,
    },
    modalContainer: {
      height: deviceHeight * 0.5,
    },
    loaderViewStyle: {
      height: deviceHeight * 0.4,
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
    overflowStyle: {},
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
  };
};

export default getStyles;
