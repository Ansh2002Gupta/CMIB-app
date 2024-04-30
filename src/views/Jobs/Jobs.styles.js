const getStyles = (theme) => {
  const { colors } = theme;

  return {
    headerContainer: {
      paddingBottom: 8,
    },
    titleText: {
      fontSize: 20,
    },
    tabContainer: { backgroundColor: colors.white },
  };
};

export default getStyles;
