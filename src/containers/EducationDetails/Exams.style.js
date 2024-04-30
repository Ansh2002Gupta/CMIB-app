const getStyles = (theme) => {
  const { colors } = theme;

  return {
    contentContainerStyle: {},

    innerContainerStyle: {
      marginBottom: 16,
    },
    tabContainer: {
      backgroundColor: colors.backgroundGrey,
      flex: 1,
    },
  };
};

export default getStyles;
