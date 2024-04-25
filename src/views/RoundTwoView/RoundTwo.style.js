const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    header: {
      fontSize: 24,
      marginBottom: 24,
      textAlign: "center",
    },
  };
};

export default getStyles;
