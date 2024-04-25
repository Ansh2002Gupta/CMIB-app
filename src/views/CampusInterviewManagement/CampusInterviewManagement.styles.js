import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    webHeaderContainer: {
      paddingTop: 24,
      paddingLeft: 24,
      paddingRight: 24,
      borderBottomColor: colors.white,
      borderTopColor: colors.white,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      backgroundColor: colors.white,
    },
    headerText: (isWebView) => ({
      fontSize: isWebView ? 32 : 20,
    }),
    row: { flex: 1 },
    mainContainer: {
      flex: 1,
    },
    headerContainer: {
      borderBottomColor: colors.white,
      borderBottomWidth: 1,
      ...Platform.select({
        web: {
          borderTopColor: colors.white,
          borderTopWidth: 1,
          paddingTop: 24,
        },
      }),
      paddingLeft: 24,
      paddingRight: 24,
      marginBottom: 16,
    },
    containerStyle: {
      borderBottomColor: colors.lightGray,
      borderBottomWidth: 1,
      ...Platform.select({
        web: {
          borderTopWidth: 0,
          paddingTop: 24,
        },
      }),
      paddingLeft: 24,
      paddingRight: 24,
      backgroundColor: colors.white,
    },
    sortingIcon: {
      height: 16,
      width: 16,
      marginLeft: 2,
    },
  };
};

export default getStyles;
