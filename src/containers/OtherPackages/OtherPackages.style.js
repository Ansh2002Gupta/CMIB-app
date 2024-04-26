const getStyles = (theme) => {
  const { colors } = theme;

  return {
    componentStyle: {
      padding: 24,
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      marginTop: 16,
      marginBottom: 16,
    },
    subscriptionHistoryHeadingText: {
      fontSize: 16,
      color: colors.darkGrey,
      lineHeight: 16,
      marginTop: 12,
    },
    subscriptionHistoryBlackText: {
      color: colors.black,
      lineHeight: 20,
      marginTop: 16,
      fontSize: 14,
    },
    loaderStyle: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
    },
    container: {
      flex: 1,
    },
  };
};

export default getStyles;
