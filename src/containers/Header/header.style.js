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
      marinTop: 16,
      marinBottom: 16,
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
      borderBottomWidth: 1,
      borderColor: colors.lightGrey,
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
      width: 166,
      height: 54,
    },
  };
};

export default getStyles;
