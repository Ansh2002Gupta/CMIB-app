import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    iconStyle: {
      height: 20,
      width: 20,
    },
    disabledIconStyle: {
      height: 20,
      width: 20,
      cursor: "not-allowed",
    },
    titleStyle: {
      marginLeft: 8,
      fontSize: 14,
      lineHeight: 20,
    },
    disabledText: {
      color: colors.disabledGrey,
    },
    containerStyle: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    alignJustifyCenter: {
      alignItems: "center",
      justifyContent: "center",
      maxWidth: "90%",
    },
    columnStyle: {
      maxWidth: "100%",
      ...Platform.select({
        web: {
          flexShrink: 1,
          flexWrap: "wrap",
          wordBreak: "break-word",
        },
      }),
    },
    customTouchableOpacity: { alignItems: "center" },
  };
};

export default getStyles;
