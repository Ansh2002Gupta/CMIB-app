import { Platform } from "@unthinkable/react-core-components";

const commomResetStyle = {
  paddingLeft: 0,
  paddingRight: 0,
  borderBottom: 0,
};

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainView: {
      backgroundColor: colors.white,
      paddingTop: 24,
      paddingBottom: 24,
    },
    containerStyle: {
      marginRight: 16,
      marginLeft: 16,
      width: "30%",
      minWidth: 120,
    },
    webMainView: {
      paddingTop: 26,
      paddingBottom: 24,
      paddingLeft: 72,
      paddingRight: 72,
    },
    headerBorder: {
      ...Platform.select({
        web: {
          borderBottom: `1px solid ${colors.lightGrey}`,
        },
      }),
    },
    smContainerStyle: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    webContainerStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignIems: "center",
    },
    rightIconContainer: {
      flexDirection: "row",
      gap: 16,
    },
    cmibLogo: {
      width: 140,
      height: 54,
    },
    imagesContainer: {
      justifyContent: "flex-start",
    },
    byDefaultPhonePadding: {
      ...commomResetStyle,
    },
    webResetMainView: {
      ...commomResetStyle,
      paddingTop: 0,
      paddingBottom: 0,
    },
    webResetContainerStyle: {
      ...commomResetStyle,
      marginRight: 0,
      marginLeft: 0,
    },
  };
};

export default getStyles;
