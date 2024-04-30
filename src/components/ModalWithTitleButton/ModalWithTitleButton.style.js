import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    containerStyle: {
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    leftButtonStyle: {
      backgroundColor: colors.white,
    },
    leftTextStyle: {
      fontSize: 14,
      color: colors.black,
    },
    rightButtonStyle: {
      backgroundColor: colors.green,
    },
    rightButtonDisableStyle: {
      backgroundColor: colors.disabledGrey,
    },
    rightTextStyle: {
      color: colors.white,
      fontSize: 14,
    },
    bottomStyle: {
      ...Platform.select({
        ios: {
          marginBottom: 30,
        },
      }),
    },
  };
};

export default getStyles;
