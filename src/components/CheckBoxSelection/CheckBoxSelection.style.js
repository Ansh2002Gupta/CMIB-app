import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    iconStyle: {
      height: 20,
      width: 20,
    },
    titleStyle: {
      marginLeft: 8,
      marginBottom: 16,
      fontSize: 14,
      lineHeight: 20,
    },
    disabledText: {
      color: colors.disabledGrey,
    },
    columnStyle: {
      ...Platform.select({
        web: {
          flexShrink: "unset",
        },
      }),
    },
    levelColor: (color) => ({
      color: color,
      fontWeight: "bold",
    }),
    row: {
      flexDirection: "row",
    },
  };
};

export default getStyles;
