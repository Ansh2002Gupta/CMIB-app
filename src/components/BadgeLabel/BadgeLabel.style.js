const getStyles = (theme) => {
  const { colors } = theme;

  return {
    webContainerStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    containerStyle: {
      paddingBottom: 16,
    },
    innerContainerStyle: {
      backgroundColor: colors.secondaryGrey,
      justifyContent: "center",
      borderRadius: 16,
      alignSelf: "flex-start",
      marginBottom: 4,
    },
    webInnerContainer: {
      marginRight: 8,
    },
    badgeStyle: {
      fontSize: 14,
      paddingRight: 16,
      paddingLeft: 16,
      paddingTop: 4,
      paddingBottom: 4,
    },
  };
};

export default getStyles;
