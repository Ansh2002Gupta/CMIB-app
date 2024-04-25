const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: colors.backgroundGrey,
    },
    innerContainer: {
      padding: 24,
    },
  };
};

export default getStyles;
