import { Platform } from "@unthinkable/react-core-components";

const getTheme = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flexDirection: "row",
    },
    enabled: {
      fontSize: 14,
    },
    disabled: {
      fontSize: 14,
      color: colors.darkGrey,
      ...Platform.select({
        web: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 200,
        },
      }),
    },
    slashStyles: {
      marginLeft: 5,
      marginRight: 5,
    },
  };
};

export default getTheme;
